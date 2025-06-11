const jwt = require('jsonwebtoken');
const config = require('@config/index');

/**
 * Genera un token JWT válido para testing
 * @param {Object} payload - Datos del usuario
 * @returns {string} Token JWT
 */
function generateTestToken(payload = {}) {
  const defaultPayload = {
    id: 1,
    email: 'test@example.com',
    role: 'cliente',
    ...payload
  };
  
  return jwt.sign(defaultPayload, process.env.JWT_SECRET || config.JWT_SECRET, {
    expiresIn: '1h'
  });
}

/**
 * Genera headers de autorización para testing
 * @param {Object} userPayload - Datos del usuario
 * @returns {Object} Headers con Authorization
 */
function getAuthHeaders(userPayload = {}) {
  const token = generateTestToken(userPayload);
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}

/**
 * Simula un usuario administrador
 * @returns {Object} Headers de admin
 */
function getAdminHeaders() {
  return getAuthHeaders({
    id: 999,
    email: 'admin@example.com',
    role: 'admin'
  });
}

/**
 * Simula un usuario propietario de negocio
 * @returns {Object} Headers de negocio
 */
function getBusinessHeaders() {
  return getAuthHeaders({
    id: 100,
    email: 'business@example.com',
    role: 'negocio'
  });
}

/**
 * Simula un usuario cliente
 * @returns {Object} Headers de cliente
 */
function getClientHeaders() {
  return getAuthHeaders({
    id: 200,
    email: 'client@example.com',
    role: 'cliente'
  });
}

/**
 * Crea un mock de la base de datos
 * @returns {Object} Mock DB object
 */
function createMockDb() {
  return {
    query: jest.fn(),
    execute: jest.fn(),
    getConnection: jest.fn(),
    end: jest.fn()
  };
}

/**
 * Simula una respuesta exitosa de la base de datos
 * @param {*} data - Datos a retornar
 * @returns {Array} Formato de respuesta de MySQL
 */
function mockDbSuccess(data = []) {
  return [data, {}];
}

/**
 * Simula un error de la base de datos
 * @param {string} message - Mensaje de error
 * @returns {Error} Error simulado
 */
function mockDbError(message = 'Database error') {
  const error = new Error(message);
  error.code = 'ER_TEST_ERROR';
  return error;
}

module.exports = {
  generateTestToken,
  getAuthHeaders,
  getAdminHeaders,
  getBusinessHeaders,
  getClientHeaders,
  createMockDb,
  mockDbSuccess,
  mockDbError
};
