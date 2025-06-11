/**
 * Configuration exports
 * Centralizes all configuration files
 */

const credentials = require('./credentials');
const dbConfig = require('./db');

// Configuración de la aplicación
const appConfig = {
  // Roles de usuario
  roles: {
    BUSINESS_OWNER: 'negocio',
    CLIENT: 'cliente'
  },

  // Estados de reserva
  bookingStatus: {
    PENDING: 'pendiente',
    CONFIRMED: 'confirmado',
    COMPLETED: 'completado',
    CANCELLED: 'cancelado'
  },

  // Categorías de negocios
  businessCategories: [
    'belleza',
    'salud',
    'fitness',
    'consultoria',
    'tecnologia',
    'educacion',
    'eventos',
    'otros'
  ],

  // Configuración JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },

  // Configuración del servidor
  server: {
    port: process.env.PORT || 3000,
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:8100'
  },

  // Configuración de paginación por defecto
  pagination: {
    defaultLimit: 10,
    maxLimit: 100
  }
};

module.exports = {
  ...appConfig,
  db: dbConfig,
  credentials,
};
