const config = require('../config');

/**
 * Standard API response utility functions
 * Provides consistent response formatting across all endpoints
 */

/**
 * Send a successful API response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {Object} data - Response data
 */
const apiResponse = (res, statusCode, data) => {
  return res.status(statusCode).json(data);
};

/**
 * Send an error API response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Object} error - Error object (optional, only in development)
 */
const apiError = (res, statusCode, message, error = null) => {
  const response = {
    success: false,
    message,
    data: null
  };

  // Incluir detalles del error solo en modo desarrollo
  if (error && config.NODE_ENV === 'development') {
    response.error = error.message;
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send a validation error response (for Joi validation errors)
 * @param {Object} res - Express response object
 * @param {Object} joiError - Joi validation error object
 */
const validationError = (res, joiError) => {
  const errors = joiError.details.map(detail => ({
    field: detail.path.join('.'),
    message: detail.message,
    value: detail.context?.value
  }));

  return res.status(400).json({
    success: false,
    message: 'Errores de validación',
    errors,
    data: null
  });
};

/**
 * Send a successful response with pagination info
 * @param {Object} res - Express response object
 * @param {Object} data - Response data
 * @param {Object} pagination - Pagination info
 */
const paginatedResponse = (res, data, pagination) => {
  return res.status(200).json({
    success: true,
    data,
    pagination,
    message: 'Datos obtenidos exitosamente'
  });
};

module.exports = {
  apiResponse,
  apiError,
  validationError,
  paginatedResponse
};
