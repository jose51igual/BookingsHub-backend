const { faker } = require('@faker-js/faker/locale/es');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Importar logger
const logger = require('./utils/logger');

// Cargar variables de entorno
dotenv.config();

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'reservas',
};

// Categorías de negocios para selección aleatoria
const businessCategories = [
  'Peluquería', 
  'Spa', 
  'Barbería', 
  'Salón de uñas', 
  'Estética', 
  'Masajes', 
  'Fisioterapia',
  'Dentista',
  'Médico',
  'Entrenador personal',
  'Nutricionista',
  'Psicólogo',
  'Tatuador'
];

// Duración posible de servicios en minutos
const serviceDurations = [30, 45, 60, 90, 120];

// Horas de apertura y cierre
const openingHours = [8, 9, 10];
const closingHours = [17, 18, 19, 20, 21];

// Función para establecer conexión a la BD
async function connectDB() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexión a la base de datos establecida correctamente.');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
}

// Función para generar un hash de contraseña
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Generar usuarios (50% clientes, 50% dueños de negocios)
async function generateUsers(connection, count = 100) { // Aumentado para más datos de prueba
  console.log(`Generando ${count} usuarios...`);
  
  const users = [];
  const defaultPassword = await hashPassword('password123');  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const role = i < count / 2 ? 'cliente' : 'negocio';
    
    // Generar número de teléfono de 9 dígitos sin formato especial
    const phoneNumber = faker.string.numeric(9);
    
    const user = {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: defaultPassword,
      phone: phoneNumber,
      role: role,
      created_at: faker.date.past({ years: 1 }).toISOString().slice(0, 19).replace('T', ' ')
    };
    
    users.push(user);
  }
    // Insertar usuarios en la base de datos
  try {
    const query = 'INSERT INTO users (name, email, password, phone, role, created_at) VALUES ?';
    const values = users.map(user => [user.name, user.email, user.password,user.phone, user.role, user.created_at]);
    await connection.query(query, [values]);
    console.log(`✅ ${count} usuarios generados correctamente.`);
    return users;
  } catch (error) {
    console.error('Error al generar usuarios:', error);
    throw error;
  }
}

// Obtener todos los usuarios por rol
async function getUsersByRole(connection, role) {
  try {
    const [users] = await connection.query('SELECT * FROM users WHERE role = ?', [role]);
    return users;
  } catch (error) {
    console.error(`Error al obtener usuarios con rol ${role}:`, error);
    throw error;
  }
}

// Generar negocios
async function generateBusinesses(connection, businessOwners, count = 25) { // Aumentado de 15 a 25
  console.log(`Generando ${count} negocios...`);
  
  const businesses = [];
  const numOwners = businessOwners.length;
  
  // Asegurarse de que no intentamos generar más negocios que dueños
  const actualCount = Math.min(count, numOwners);
    for (let i = 0; i < actualCount; i++) {
    const owner = businessOwners[i];
    const category = faker.helpers.arrayElement(businessCategories);
    const openHour = faker.helpers.arrayElement(openingHours);
    const closeHour = faker.helpers.arrayElement(closingHours);
    const isOpen = faker.datatype.boolean(0.8); // 80% de probabilidad de estar abierto
      // Generar número de teléfono de 9 dígitos sin formato especial
    const phoneNumber = faker.string.numeric(9);
    
    const business = {
      user_id: owner.id, // Cambiar owner_id por user_id para que coincida con la estructura de la tabla
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      phone: phoneNumber,
      email: faker.internet.email().toLowerCase(),
      category: category,
      opening_hours: `${openHour}:00 - ${closeHour}:00`,
      image: faker.image.url(),
      is_open: isOpen ? 1 : 0,
      is_featured: faker.datatype.boolean(0.3) ? 1 : 0, // 30% de probabilidad de ser destacado
      created_at: faker.date.past({ years: 1 }).toISOString().slice(0, 19).replace('T', ' ')
    };
    
    businesses.push(business);
  }
  
  // Insertar negocios en la base de datos
  try {
    const query = `
      INSERT INTO businesses 
      (user_id, name, description, address, phone, email, category, opening_hours, image, is_open, is_featured, created_at) 
      VALUES ?
    `;    
    const values = businesses.map(business => [
      business.user_id, business.name, business.description, business.address, 
      business.phone, business.email, business.category,
      business.opening_hours, business.image, business.is_open, business.is_featured, business.created_at
    ]);
    
    const [result] = await connection.query(query, [values]);
    
    // Obtener los IDs generados y asignarlos a los objetos de negocio
    const firstInsertId = result.insertId;
    businesses.forEach((business, index) => {
      business.id = firstInsertId + index;
    });
    
    console.log(`✅ ${businesses.length} negocios generados correctamente.`);
    return businesses;
  } catch (error) {
    console.error('Error al generar negocios:', error);
    throw error;
  }
}

// Obtener todos los negocios
async function getAllBusinesses(connection) {
  try {
    const [businesses] = await connection.query('SELECT * FROM businesses');
    return businesses;
  } catch (error) {
    console.error('Error al obtener negocios:', error);
    throw error;
  }
}

// Generar servicios para cada negocio
async function generateServices(connection, businesses) {
  console.log('Generando servicios para cada negocio...');
  
  const services = [];
  const insertPromises = [];
  
  for (const business of businesses) {
    // Generar entre 5 y 12 servicios por negocio (aumentado)
    const numServices = faker.number.int({ min: 5, max: 12 });
      for (let i = 0; i < numServices; i++) {
      const durationMinutes = faker.helpers.arrayElement(serviceDurations);
      const price = faker.number.float({ min: 15, max: 200, precision: 0.01 });
      
      const service = {
        business_id: business.id,
        name: `${faker.word.adjective()} ${faker.word.noun()}`,
        description: faker.lorem.sentence(),
        duration_minutes: durationMinutes,
        price: price.toFixed(2),
        created_at: faker.date.past({ years: 1 }).toISOString().slice(0, 19).replace('T', ' ')
      };
      
      services.push(service);
      
      // Insertar servicio inmediatamente para obtener su ID
      const query = `
        INSERT INTO services 
        (business_id, name, description, duration_minutes, price, created_at) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const insertPromise = connection.query(query, [
        service.business_id, service.name, service.description, 
        service.duration_minutes, service.price, service.created_at
      ]);
      
      insertPromises.push(insertPromise);
    }
  }
  
  // Esperar a que todos los servicios se inserten
  try {
    await Promise.all(insertPromises);
    console.log(`✅ ${services.length} servicios generados correctamente.`);
    return services;
  } catch (error) {
    console.error('Error al generar servicios:', error);
    throw error;
  }
}

// Obtener todos los servicios
async function getAllServices(connection) {
  try {
    const [services] = await connection.query('SELECT * FROM services');
    return services;
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    throw error;
  }
}

// Generar disponibilidad para cada servicio
async function generateAvailability(connection, services) {
  console.log('Generando disponibilidad para servicios...');
  
  const availabilityRecords = [];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const insertPromises = [];
  
  for (const service of services) {
    // Para cada servicio, generar disponibilidad para días laborables
    for (const day of days) {
      // Algunos servicios no están disponibles todos los días
      if (faker.datatype.boolean(0.8)) { // 80% de probabilidad de tener disponibilidad ese día
        const business = await getBusinessByServiceId(connection, service.id);
        
        if (!business) continue;
        
        // Extraer horas de apertura y cierre del negocio
        const hoursMatch = business.opening_hours.match(/(\d+):00 - (\d+):00/);
        if (!hoursMatch) continue;
        
        const openHour = parseInt(hoursMatch[1], 10);
        const closeHour = parseInt(hoursMatch[2], 10);
          // Generar slots de disponibilidad
        let currentHour = openHour;
        let currentMinutes = 0;
        
        while ((currentHour + (service.duration_minutes / 60)) <= closeHour) {
          // Decidir si usar 0 o 30 minutos
          currentMinutes = [0, 30][Math.floor(Math.random() * 2)];
          
          // Formatear hora de inicio
          const startHourStr = Math.floor(currentHour).toString().padStart(2, '0');
          const startMinutesStr = currentMinutes.toString().padStart(2, '0');
          const startTime = `${startHourStr}:${startMinutesStr}`;
          
          // Calcular hora de fin basado en la duración del servicio
          let totalMinutes = (currentHour * 60) + currentMinutes + service.duration_minutes;
          const endHour = Math.floor(totalMinutes / 60);
          const endMinutes = totalMinutes % 60;
          const endTime = `${endHour.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
          
          const availability = {
            service_id: service.id,
            day_of_week: day,
            start_time: startTime,
            end_time: endTime,
            max_bookings: faker.number.int({ min: 1, max: 3 }),
            created_at: faker.date.past({ years: 1 }).toISOString().slice(0, 19).replace('T', ' ')
          };
          
          availabilityRecords.push(availability);
          
          const query = `
            INSERT INTO availability 
            (service_id, day_of_week, start_time, end_time, max_bookings, created_at) 
            VALUES (?, ?, ?, ?, ?, ?)
          `;
          const insertPromise = connection.query(query, [
            availability.service_id, availability.day_of_week, 
            availability.start_time, availability.end_time, 
            availability.max_bookings, availability.created_at
          ]);
          
          insertPromises.push(insertPromise);
            // Avanzar a la siguiente hora o media hora
          const increment = faker.helpers.arrayElement([0.5, 1]);
          currentHour += increment;
          
          // Asegurar que las horas sean números enteros o .5
          if (currentHour % 1 !== 0 && currentHour % 1 !== 0.5) {
            currentHour = Math.ceil(currentHour);
          }
        }
      }
    }
  }
  
  // Esperar a que toda la disponibilidad se inserte
  try {
    await Promise.all(insertPromises);
    console.log(`✅ ${availabilityRecords.length} registros de disponibilidad generados correctamente.`);
    return availabilityRecords;
  } catch (error) {
    console.error('Error al generar disponibilidad:', error);
    throw error;
  }
}

// Obtener negocio por ID de servicio
async function getBusinessByServiceId(connection, serviceId) {
  try {
    const [rows] = await connection.query(`
      SELECT b.* FROM businesses b
      JOIN services s ON b.id = s.business_id
      WHERE s.id = ?
    `, [serviceId]);
    
    return rows[0];
  } catch (error) {
    console.error('Error al obtener negocio por ID de servicio:', error);
    return null;
  }
}

// Obtener toda la disponibilidad
async function getAllAvailability(connection) {
  try {
    const [availability] = await connection.query('SELECT * FROM availability');
    return availability;
  } catch (error) {
    console.error('Error al obtener disponibilidad:', error);
    throw error;
  }
}

// Generar reservas
async function generateBookings(connection, clients, availability) {
  console.log('Generando reservas...');
  
  const bookings = [];
  const insertPromises = [];
  const numClients = clients.length;
  
  // Fecha actual
  const now = new Date();
  
  // Generar muchas más fechas históricas (6 meses hacia atrás)
  const pastDates = Array.from({ length: 180 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i); // Últimos 180 días
    return date;
  });
  
  const futureDates = Array.from({ length: 60 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + (i + 1)); // Próximos 60 días
    return date;
  });
  
  const allDates = [...pastDates, ...futureDates];
  
  // Para cada disponibilidad, generar muchas más reservas
  for (const slot of availability) {
    // Generar múltiples reservas por slot (entre 0 y 3 reservas por disponibilidad)
    const numBookingsForSlot = faker.number.int({ min: 0, max: 3 });
    
    for (let bookingIndex = 0; bookingIndex < numBookingsForSlot; bookingIndex++) {
      // Obtener el servicio asociado con esta disponibilidad
      const [serviceRows] = await connection.query('SELECT * FROM services WHERE id = ?', [slot.service_id]);
      if (!serviceRows.length) continue;
      
      const service = serviceRows[0];
      
      // Obtener el negocio asociado con este servicio
      const [businessRows] = await connection.query('SELECT * FROM businesses WHERE id = ?', [service.business_id]);
      if (!businessRows.length) continue;
      
      const business = businessRows[0];
      
      // Generar 1-3 reservas para este slot
      const numBookings = faker.number.int({ min: 1, max: 3 });
      
      for (let i = 0; i < numBookings; i++) {
        // Escoger un cliente aleatorio
        const client = clients[faker.number.int({ min: 0, max: numClients - 1 })];
        
        // Escoger una fecha aleatoria
        const bookingDate = faker.helpers.arrayElement(allDates);
        
        // Asegurarse de que la fecha corresponde al día de la semana correcto
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][bookingDate.getDay()];
        if (dayOfWeek !== slot.day_of_week) {
          // Ajustar la fecha para que coincida con el día de la semana
          const daysUntilMatchingDay = {
            'Monday': (1 + 7 - bookingDate.getDay()) % 7,
            'Tuesday': (2 + 7 - bookingDate.getDay()) % 7,
            'Wednesday': (3 + 7 - bookingDate.getDay()) % 7,
            'Thursday': (4 + 7 - bookingDate.getDay()) % 7,
            'Friday': (5 + 7 - bookingDate.getDay()) % 7
          }[slot.day_of_week];
          
          bookingDate.setDate(bookingDate.getDate() + daysUntilMatchingDay);
        }
        
        // Formato de fecha para MySQL
        const formattedDate = bookingDate.toISOString().slice(0, 10);        // Estado de reserva y ajuste de fechas según el estado
        let status;
        if (i < numBookings / 2) { // Primera mitad: reservas pasadas
          // Asegurarse de que la fecha sea en el pasado
          if (bookingDate >= now) {
            // Ajustar la fecha para que sea en el pasado
            bookingDate.setMonth(bookingDate.getMonth() - faker.number.int({ min: 1, max: 6 }));
          }
          // Reservas pasadas: completadas o canceladas
          status = faker.helpers.arrayElement(['completada', 'cancelada']);
        } else { // Segunda mitad: reservas futuras
          // Asegurarse de que la fecha sea en el futuro
          if (bookingDate <= now) {
            // Ajustar la fecha para que sea en el futuro
            bookingDate.setMonth(bookingDate.getMonth() + faker.number.int({ min: 1, max: 6 }));
          }
          // Reservas futuras: confirmadas o pendientes
          status = faker.helpers.arrayElement(['confirmada', 'pendiente']);
        }
        
        // Notas adicionales (opcional)
        const notes = faker.datatype.boolean(0.3) ? faker.lorem.sentence() : null;
          const booking = {
          user_id: client.id,
          business_id: business.id,
          service_id: service.id,
          booking_date: formattedDate,
          booking_time: slot.start_time, // Usar booking_time en lugar de start_time
          status: status,
          notes: notes,
          created_at: faker.date.past({ years: 1, refDate: bookingDate }).toISOString().slice(0, 19).replace('T', ' ')
        };
        
        bookings.push(booking);
        
        const query = `
          INSERT INTO bookings 
          (user_id, business_id, service_id, booking_date, booking_time, status, notes) 
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const insertPromise = connection.query(query, [
          booking.user_id, booking.business_id, booking.service_id,
          booking.booking_date, booking.booking_time,
          booking.status, booking.notes
        ]);
        
        insertPromises.push(insertPromise);
      }
    }
  }
  
  // Esperar a que todas las reservas se inserten
  try {
    await Promise.all(insertPromises);
    console.log(`✅ ${bookings.length} reservas generadas correctamente.`);
    return bookings;
  } catch (error) {
    console.error('Error al generar reservas:', error);
    throw error;
  }
}

// Generar reseñas para negocios completados
async function generateReviews(connection, clients, businesses) {
  console.log('Generando reseñas para negocios...');
  
  const reviews = [];
  const insertPromises = [];
  // Obtener todas las reservas completadas con fecha en el pasado
  const [completedBookings] = await connection.query(`
    SELECT b.*, u.id as user_id, u.name as user_name, bs.id as business_id, bs.name as business_name 
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN businesses bs ON b.business_id = bs.id
    WHERE b.status = 'completada'
    AND b.booking_date < CURDATE()
  `);
  
  // Agrupar reservas por negocio y cliente
  const bookingsByBusinessAndClient = {};
  
  for (const booking of completedBookings) {
    const key = `${booking.business_id}_${booking.user_id}`;
    if (!bookingsByBusinessAndClient[key]) {
      bookingsByBusinessAndClient[key] = [];
    }
    bookingsByBusinessAndClient[key].push(booking);
  }
  
  // Para cada combinación única de cliente y negocio, generar una reseña
  for (const key in bookingsByBusinessAndClient) {
    // Solo generar reseña con probabilidad del 70%
    if (faker.datatype.boolean(0.7)) {
      const bookings = bookingsByBusinessAndClient[key];
      const firstBooking = bookings[0];
      
      // Calificación (1-5)
      const rating = faker.number.int({ min: 1, max: 5 });
      
      // Contenido de la reseña basado en la calificación
      let content;
      
      if (rating >= 4) {
        content = faker.helpers.arrayElement([
          `¡Excelente servicio! ${firstBooking.business_name} superó mis expectativas. El personal fue muy amable y profesional.`,
          `Me encantó la experiencia en ${firstBooking.business_name}. Todo estaba muy limpio y organizado. Volveré pronto.`,
          `Muy recomendable. El servicio fue puntual y de gran calidad. La atención al cliente es excepcional.`,
          `Una experiencia maravillosa. El personal es muy atento y el lugar es muy acogedor. Excelente relación calidad-precio.`
        ]);
      } else if (rating === 3) {
        content = faker.helpers.arrayElement([
          `Servicio decente pero podría mejorar. El personal fue amable pero hubo algunos retrasos.`,
          `Una experiencia promedio. Nada especial pero tampoco mala. Quizás pruebe otro lugar la próxima vez.`,
          `El servicio estuvo bien, pero esperaba más basado en las otras reseñas. La ubicación es conveniente.`,
          `Calidad aceptable pero un poco caro para lo que ofrecen. El personal fue profesional.`
        ]);
      } else {
        content = faker.helpers.arrayElement([
          `Decepcionante. El servicio no fue como esperaba y hubo varios problemas durante mi visita.`,
          `No recomendaría este lugar. La atención fue deficiente y no valió el precio que pagué.`,
          `Mala experiencia. El personal no fue muy amable y el servicio dejó mucho que desear.`,
          `No volveré. La calidad no coincide con lo que prometen y el lugar no estaba muy limpio.`
        ]);
      }
        // Asegurarnos de que generamos una fecha válida para la reseña
      let reviewDate;
      const bookingDate = new Date(firstBooking.booking_date);
      const now = new Date();
      
      // Si la fecha de reserva es futura, usamos una fecha aleatoria en el pasado
      // Si la fecha de reserva es pasada, usamos una fecha entre la reserva y ahora
      if (bookingDate > now) {
        // Para reservas futuras, simplemente usar una fecha pasada aleatoria
        reviewDate = faker.date.past({ years: 1 });
      } else {
        // Para reservas pasadas, usar una fecha entre la reserva y ahora
        reviewDate = faker.date.between({
          from: bookingDate,
          to: now
        });
      }
      
      const review = {
        user_id: firstBooking.user_id,
        business_id: firstBooking.business_id,
        rating: rating,
        content: content,
        created_at: reviewDate.toISOString().slice(0, 19).replace('T', ' ')
      };
      
      reviews.push(review);
        const query = `
        INSERT INTO reviews 
        (user_id, business_id, rating, comment, created_at) 
        VALUES (?, ?, ?, ?, ?)
      `;
      const insertPromise = connection.query(query, [
        review.user_id, review.business_id, review.rating, review.content, review.created_at
      ]);
      
      insertPromises.push(insertPromise);
    }
  }
  
  // Esperar a que todas las reseñas se inserten
  try {
    await Promise.all(insertPromises);
    console.log(`✅ ${reviews.length} reseñas generadas correctamente.`);
    return reviews;
  } catch (error) {
    console.error('Error al generar reseñas:', error);
    throw error;
  }
}

// Función principal
async function seedDatabase() {
  console.log('🌱 Iniciando la generación de datos de prueba...');
  
  let connection;
  
  try {
    // Establecer conexión a la base de datos
    connection = await connectDB();
    
    // Generar usuarios
    const users = await generateUsers(connection, 100); // Más usuarios para más datos
      // Separar usuarios por rol
    const clients = await getUsersByRole(connection, 'cliente');
    const businessOwners = await getUsersByRole(connection, 'negocio');
    
    console.log(`Clientes: ${clients.length}`);
    console.log(`Propietarios de negocios: ${businessOwners.length}`);
    
    // Generar negocios para cada propietario
    const businesses = await generateBusinesses(connection, businessOwners);
    
    // Generar servicios para cada negocio
    await generateServices(connection, businesses);
    
    // Obtener todos los servicios
    const services = await getAllServices(connection);
    console.log(`Servicios totales: ${services.length}`);
    
    // Generar disponibilidad para cada servicio
    await generateAvailability(connection, services);
    
    // Obtener toda la disponibilidad
    const availability = await getAllAvailability(connection);
    console.log(`Registros de disponibilidad totales: ${availability.length}`);
    
    // Generar reservas
    await generateBookings(connection, clients, availability);
    
    // Generar reseñas
    await generateReviews(connection, clients, businesses);
    
    console.log('🎉 Base de datos poblada con éxito!');
    
    // Obtener recuento de registros
    const tables = ['users', 'businesses', 'services', 'availability', 'bookings', 'reviews'];
    for (const table of tables) {
      const [rows] = await connection.query(`SELECT COUNT(*) as count FROM ${table}`);
      console.log(`📊 Tabla ${table}: ${rows[0].count} registros`);
    }
    
  } catch (error) {
    console.error('❌ Error al generar datos de prueba:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Conexión a la base de datos cerrada.');
    }
  }
}

// Ejecutar la función de sembrado
seedDatabase();
