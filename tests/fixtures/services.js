/**
 * Datos de prueba para servicios
 */

const validService = {
  business_id: 1,
  name: 'Corte de Cabello',
  description: 'Corte de cabello profesional con las últimas tendencias',
  duration: 45,
  price: 25.00,
  category: 'Corte'
};

const validServiceUpdate = {
  name: 'Corte de Cabello Premium',
  description: 'Corte de cabello premium con consulta de estilo',
  duration: 60,
  price: 35.00
};

const invalidServices = {
  missingName: {
    business_id: 1,
    description: 'Descripción sin nombre',
    duration: 30,
    price: 20.00,
    category: 'Test'
  },
  missingBusinessId: {
    name: 'Servicio Test',
    description: 'Descripción test',
    duration: 30,
    price: 20.00,
    category: 'Test'
  },
  invalidDuration: {
    business_id: 1,
    name: 'Servicio Test',
    description: 'Descripción test',
    duration: -10,
    price: 20.00,
    category: 'Test'
  },
  invalidPrice: {
    business_id: 1,
    name: 'Servicio Test',
    description: 'Descripción test',
    duration: 30,
    price: -5.00,
    category: 'Test'
  }
};

const serviceCategories = [
  'Corte',
  'Coloración',
  'Tratamiento',
  'Peinado',
  'Manicura',
  'Pedicura',
  'Masaje',
  'Facial',
  'Depilación',
  'Otros'
];

module.exports = {
  validService,
  validServiceUpdate,
  invalidServices,
  serviceCategories
};
