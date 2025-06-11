/**
 * Datos de prueba para negocios
 */

const validBusiness = {
  name: 'Peluquería Bella Vista',
  description: 'La mejor peluquería de la ciudad con servicios profesionales',
  address: 'Calle Principal 123, Madrid',
  phone: '+34 666 777 888',
  email: 'info@bellavista.com',
  category: 'Belleza y Cuidado Personal',
  website: 'https://bellavista.com',
  latitude: 40.4168,
  longitude: -3.7038
};

const validBusinessUpdate = {
  name: 'Peluquería Bella Vista - Actualizada',
  description: 'Descripción actualizada de la peluquería',
  phone: '+34 666 777 999'
};

const invalidBusinesses = {
  missingName: {
    description: 'Descripción sin nombre',
    address: 'Calle Test 123',
    category: 'Belleza y Cuidado Personal'
  },
  missingDescription: {
    name: 'Negocio Test',
    address: 'Calle Test 123',
    category: 'Belleza y Cuidado Personal'
  },
  invalidCategory: {
    name: 'Negocio Test',
    description: 'Descripción test',
    address: 'Calle Test 123',
    category: 'Categoría Inválida'
  },
  invalidEmail: {
    name: 'Negocio Test',
    description: 'Descripción test',
    address: 'Calle Test 123',
    category: 'Belleza y Cuidado Personal',
    email: 'email-invalido'
  }
};

const businessCategories = [
  'Belleza y Cuidado Personal',
  'Salud y Bienestar',
  'Deportes y Fitness',
  'Educación y Formación',
  'Hogar y Jardinería',
  'Automoción',
  'Tecnología',
  'Mascotas',
  'Alimentación',
  'Otros'
];

module.exports = {
  validBusiness,
  validBusinessUpdate,
  invalidBusinesses,
  businessCategories
};
