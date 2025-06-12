const { PrismaClient } = require('../generated/prisma');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Configuración faker en español
faker.locale = 'es';

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

// Función para generar un hash de contraseña
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Limpiar base de datos
async function clearDatabase() {
  console.log('🗑️  Limpiando base de datos...');
  
  // Orden de eliminación para respetar las relaciones
  await prisma.reviews.deleteMany();
  await prisma.bookings.deleteMany();
  await prisma.employees.deleteMany();
  await prisma.services.deleteMany();
  await prisma.businesses.deleteMany();
  await prisma.users.deleteMany();
  
  console.log('✅ Base de datos limpiada correctamente.');
}

// Generar usuarios
async function generateUsers(count = 20) {
  console.log(`👥 Generando ${count} usuarios...`);
  
  const users = [];
  const defaultPassword = await hashPassword('password123');
  
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const role = i < count / 2 ? 'cliente' : 'negocio';
    
    const user = {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: defaultPassword,
      phone: parseInt(faker.string.numeric(9)),
      role: role,
      created_at: faker.date.past({ years: 1 })
    };
    
    users.push(user);
  }
  
  // Crear usuarios en lotes para mejor rendimiento
  const batchSize = 20;
  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize);
    await prisma.users.createMany({
      data: batch
    });
  }
  
  console.log(`✅ ${count} usuarios generados correctamente.`);
  return users;
}

// Generar negocios
async function generateBusinesses(count = 10) {
  console.log(`🏢 Generando ${count} negocios...`);
  
  // Obtener usuarios con rol 'negocio'
  const businessOwners = await prisma.users.findMany({
    where: { role: 'negocio' },
    take: count
  });
  
  const businesses = [];
  
  for (let i = 0; i < Math.min(count, businessOwners.length); i++) {
    const owner = businessOwners[i];
    const category = faker.helpers.arrayElement(businessCategories);
    const openHour = faker.helpers.arrayElement(openingHours);
    const closeHour = faker.helpers.arrayElement(closingHours);
    const isOpen = faker.datatype.boolean(0.8);
    
    const business = {
      user_id: owner.id,
      name: faker.company.name(),
      description: faker.company.catchPhrase(),
      address: faker.location.streetAddress(),
      phone: faker.string.numeric(9),
      email: faker.internet.email().toLowerCase(),
      category: category,
      opening_hours: `${openHour}:00 - ${closeHour}:00`,
      image: faker.image.url(),
      is_open: isOpen,
      is_featured: faker.datatype.boolean(0.3),
      created_at: faker.date.past({ years: 1 })
    };
    
    businesses.push(business);
  }
  
  // Crear negocios en lotes
  const batchSize = 10;
  for (let i = 0; i < businesses.length; i += batchSize) {
    const batch = businesses.slice(i, i + batchSize);
    await prisma.businesses.createMany({
      data: batch
    });
  }
  
  console.log(`✅ ${businesses.length} negocios generados correctamente.`);
  return businesses;
}

// Generar empleados
async function generateEmployees() {
  console.log('👨‍💼 Generando empleados...');
  
  const businesses = await prisma.businesses.findMany();
  const employees = [];
  
  for (const business of businesses) {
    // Generar entre 1 y 3 empleados por negocio
    const numEmployees = faker.number.int({ min: 1, max: 3 });
    
    for (let i = 0; i < numEmployees; i++) {
      const specialties = faker.helpers.arrayElements([
        'Cortes', 'Coloración', 'Peinados', 'Tratamientos', 'Manicura', 
        'Pedicura', 'Masajes', 'Depilación', 'Maquillaje'
      ], { min: 1, max: 3 });
      
      const employee = {
        business_id: business.id,
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        position: faker.person.jobTitle(),
        specialties: JSON.stringify(specialties),
        profile_image: faker.image.avatar(),
        created_at: faker.date.past({ years: 1 })
      };
      
      employees.push(employee);
    }
  }
  
  // Crear empleados en lotes
  const batchSize = 50;
  for (let i = 0; i < employees.length; i += batchSize) {
    const batch = employees.slice(i, i + batchSize);
    await prisma.employees.createMany({
      data: batch
    });
  }
  
  console.log(`✅ ${employees.length} empleados generados correctamente.`);
  return employees;
}

// Generar servicios
async function generateServices() {
  console.log('🛍️  Generando servicios...');
  
  const businesses = await prisma.businesses.findMany();
  const services = [];
  
  for (const business of businesses) {
    // Generar entre 3 y 6 servicios por negocio
    const numServices = faker.number.int({ min: 3, max: 6 });
    
    for (let i = 0; i < numServices; i++) {
      const durationMinutes = faker.helpers.arrayElement(serviceDurations);
      const price = faker.number.float({ min: 15, max: 200, precision: 0.01 });
      
      const service = {
        business_id: business.id,
        name: `${faker.word.adjective()} ${faker.word.noun()}`,
        description: faker.lorem.sentence(),
        duration_minutes: durationMinutes,
        price: price,
        category: faker.helpers.arrayElement(['Belleza', 'Salud', 'Bienestar', 'Estética']),
        created_at: faker.date.past({ years: 1 })
      };
      
      services.push(service);
    }
  }
  
  // Crear servicios en lotes
  const batchSize = 100;
  for (let i = 0; i < services.length; i += batchSize) {
    const batch = services.slice(i, i + batchSize);
    await prisma.services.createMany({
      data: batch
    });
  }
  
  console.log(`✅ ${services.length} servicios generados correctamente.`);
  return services;
}

// Generar reservas
async function generateBookings() {
  console.log('📝 Generando reservas...');
  
  const clients = await prisma.users.findMany({
    where: { role: 'cliente' }
  });
  
  const services = await prisma.services.findMany({
    include: {
      businesses: true
    }
  });
  
  const employees = await prisma.employees.findMany();
  
  const bookings = [];
  const now = new Date();
  
  // Generar fechas pasadas (6 meses hacia atrás)
  const pastDates = Array.from({ length: 180 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  });
  
  // Generar fechas futuras (60 días hacia adelante)
  const futureDates = Array.from({ length: 60 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + (i + 1));
    return date;
  });
  
  const allDates = [...pastDates, ...futureDates];
  
  // Generar horarios disponibles (de 9:00 a 18:00 cada hora)
  const availableHours = Array.from({ length: 10 }, (_, i) => {
    const hour = 9 + i;
    return `${hour.toString().padStart(2, '0')}:00`;
  });
  
  for (const service of services) {
    // Generar entre 0 y 3 reservas por servicio
    const numBookings = faker.number.int({ min: 0, max: 3 });
    
    for (let i = 0; i < numBookings; i++) {
      const client = faker.helpers.arrayElement(clients);
      const bookingDate = faker.helpers.arrayElement(allDates);
      const bookingTime = faker.helpers.arrayElement(availableHours);
      
      // Determinar estado basado en la fecha
      let status;
      if (bookingDate < now) {
        status = faker.helpers.arrayElement(['completada', 'cancelada']);
      } else {
        status = faker.helpers.arrayElement(['confirmada', 'pendiente']);
      }
      
      // Seleccionar empleado aleatorio del negocio
      const businessEmployees = employees.filter(emp => emp.business_id === service.business_id);
      const selectedEmployee = businessEmployees.length > 0 ? faker.helpers.arrayElement(businessEmployees) : null;
      
      // Convertir bookingTime a DateTime para booking_time
      const [hours, minutes] = bookingTime.split(':');
      const bookingTimeDate = new Date(`1970-01-01T${hours}:${minutes}:00.000Z`);
      
      const booking = {
        user_id: client.id,
        business_id: service.business_id,
        service_id: service.id,
        employee_id: selectedEmployee?.id || null,
        booking_date: bookingDate,
        booking_time: bookingTimeDate,
        status: status,
        notes: faker.datatype.boolean(0.3) ? faker.lorem.sentence() : null,
        created_at: faker.date.past({ years: 1, refDate: bookingDate })
      };
      
      bookings.push(booking);
    }
  }
  
  // Crear reservas en lotes
  const batchSize = 100;
  for (let i = 0; i < bookings.length; i += batchSize) {
    const batch = bookings.slice(i, i + batchSize);
    await prisma.bookings.createMany({
      data: batch
    });
  }
  
  console.log(`✅ ${bookings.length} reservas generadas correctamente.`);
  return bookings;
}

// Generar reseñas
async function generateReviews() {
  console.log('⭐ Generando reseñas...');
  
  // Obtener reservas completadas
  const completedBookings = await prisma.bookings.findMany({
    where: {
      status: 'completada',
      booking_date: {
        lt: new Date()
      }
    },
    include: {
      users: true,
      businesses: true
    }
  });
  
  // Agrupar reservas por negocio y cliente
  const bookingsByBusinessAndClient = {};
  
  for (const booking of completedBookings) {
    const key = `${booking.business_id}_${booking.user_id}`;
    if (!bookingsByBusinessAndClient[key]) {
      bookingsByBusinessAndClient[key] = [];
    }
    bookingsByBusinessAndClient[key].push(booking);
  }
  
  const reviews = [];
  
  // Para cada combinación única de cliente y negocio, generar una reseña
  for (const key in bookingsByBusinessAndClient) {
    // Solo generar reseña con probabilidad del 70%
    if (faker.datatype.boolean(0.7)) {
      const bookings = bookingsByBusinessAndClient[key];
      const firstBooking = bookings[0];
      
      // Calificación (1-5)
      const rating = faker.number.int({ min: 1, max: 5 });
      
      // Contenido de la reseña basado en la calificación
      let comment;
      
      if (rating >= 4) {
        comment = faker.helpers.arrayElement([
          `¡Excelente servicio! ${firstBooking.businesses.name} superó mis expectativas. El personal fue muy amable y profesional.`,
          `Me encantó la experiencia en ${firstBooking.businesses.name}. Todo estaba muy limpio y organizado. Volveré pronto.`,
          `Muy recomendable. El servicio fue puntual y de gran calidad. La atención al cliente es excepcional.`,
          `Una experiencia maravillosa. El personal es muy atento y el lugar es muy acogedor. Excelente relación calidad-precio.`
        ]);
      } else if (rating === 3) {
        comment = faker.helpers.arrayElement([
          `Servicio decente pero podría mejorar. El personal fue amable pero hubo algunos retrasos.`,
          `Una experiencia promedio. Nada especial pero tampoco mala. Quizás pruebe otro lugar la próxima vez.`,
          `El servicio estuvo bien, pero esperaba más basado en las otras reseñas. La ubicación es conveniente.`,
          `Calidad aceptable pero un poco caro para lo que ofrecen. El personal fue profesional.`
        ]);
      } else {
        comment = faker.helpers.arrayElement([
          `Decepcionante. El servicio no fue como esperaba y hubo varios problemas durante mi visita.`,
          `No recomendaría este lugar. La atención fue deficiente y no valió el precio que pagué.`,
          `Mala experiencia. El personal no fue muy amable y el servicio dejó mucho que desear.`,
          `No volveré. La calidad no coincide con lo que prometen y el lugar no estaba muy limpio.`
        ]);
      }
      
      // Fecha de la reseña (entre la fecha de reserva y ahora)
      const bookingDate = new Date(firstBooking.booking_date);
      const now = new Date();
      
      let reviewDate;
      if (bookingDate > now) {
        reviewDate = faker.date.past({ years: 1 });
      } else {
        reviewDate = faker.date.between({
          from: bookingDate,
          to: now
        });
      }
      
      const review = {
        user_id: firstBooking.user_id,
        business_id: firstBooking.business_id,
        rating: rating,
        comment: comment,
        created_at: reviewDate
      };
      
      reviews.push(review);
    }
  }
  
  // Crear reseñas en lotes
  const batchSize = 50;
  for (let i = 0; i < reviews.length; i += batchSize) {
    const batch = reviews.slice(i, i + batchSize);
    await prisma.reviews.createMany({
      data: batch
    });
  }
  
  console.log(`✅ ${reviews.length} reseñas generadas correctamente.`);
  return reviews;
}

// Función principal de seed
async function main() {
  console.log('🌱 Iniciando la generación de datos de prueba con Prisma...');
  
  try {
    // Limpiar base de datos existente
    await clearDatabase();
    
    // Generar datos en orden
    await generateUsers(20);
    await generateBusinesses(10);
    await generateEmployees();
    await generateServices();
    await generateBookings();
    await generateReviews();
    
    console.log('🎉 Base de datos poblada con éxito!');
    
    // Mostrar estadísticas finales
    const stats = {
      users: await prisma.users.count(),
      businesses: await prisma.businesses.count(),
      employees: await prisma.employees.count(),
      services: await prisma.services.count(),
      bookings: await prisma.bookings.count(),
      reviews: await prisma.reviews.count()
    };
    
    console.log('\n📊 Estadísticas finales:');
    Object.entries(stats).forEach(([table, count]) => {
      console.log(`   ${table}: ${count} registros`);
    });
    
  } catch (error) {
    console.error('Error al generar datos de prueba:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar si el archivo se ejecuta directamente
if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

module.exports = { main };
