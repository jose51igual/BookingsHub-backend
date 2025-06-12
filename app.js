require('module-alias/register');
const logger = require('@utils/logger');
const { apiError, validationError } = require('./utils/apiResponse');

/**
 * Archivo principal de la aplicación
 * Configuración de la aplicación Express.js y middleware
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const credentialsUtil = require('./config/credentials');
const { swaggerSpec, swaggerUi } = require('./swagger');

// Importar rutas centralizadas
const apiRoutes = require('./routes/index');

// Crear aplicación Express
const app = express();

/**
 * Configuración de Middleware
 */

// Configuración CORS
const corsOptions = {
  origin: credentialsUtil.server.corsOrigin,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging de peticiones (solo desarrollo)
if (credentialsUtil.server.environment === 'development') {
  app.use((req, res, next) => {
    logger.info(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

/**
 * Configuración de Rutas
 */

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Bookings Hub API Documentation"
}));

// Rutas de la API
app.use('/api', apiRoutes);

/**
 * Error Handling Middleware
 */

// 404 handler
app.use('*', (req, res) => {
  apiError(res, 404, `La ruta ${req.originalUrl} no existe`);
});

// Manejador global de errores
app.use((error, req, res, next) => {
  logger.error('Server Error:', error);
  // Error específico de validación de Joi
  if (error.isJoi) {
    return validationError(res, error);
  }
    // Error de sintaxis JSON
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return apiError(res, 400, 'JSON mal formateado en el cuerpo de la petición');
  }
    // Error genérico
  const statusCode = error.status || error.statusCode || 500;
  const message = credentialsUtil.server.environment === 'production' 
    ? (statusCode === 500 ? 'Error interno del servidor' : error.message)
    : error.message;
  
  return apiError(res, statusCode, message, error);
});


if (require.main === module) {
  const PORT = credentialsUtil.server.port || 3000;
  
  app.listen(PORT, () => {
    logger.info(`Servidor ejecutándose en puerto: ${PORT}`);
    logger.info(`Documentación API: http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
