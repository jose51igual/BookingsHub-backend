/**
 * Jest test setup file
 * Configuración global para todos los tests
 */

// Initialize module aliases for tests
require('module-alias/register');

// Configurar timeout global
jest.setTimeout(30000);

// Mock de console durante los tests para evitar ruido
if (process.env.NODE_ENV === 'test') {
  console.log = jest.fn();
  console.info = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
}

// Configurar variables de entorno para testing
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.JWT_SECRET = 'test-jwt-secret';

// Limpiar mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
});

// Configurar handlers para promesas no manejadas
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection during test:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception during test:', error);
});
