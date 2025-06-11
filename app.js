require('module-alias/register');
const logger = require('@utils/logger');

/**
 * Main application file
 * Express.js application configuration and middleware setup
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const credentials = require('./config/credentials');
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
  origin: credentials.server.corsOrigin,
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
if (credentials.server.environment === 'development') {
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

// Endpoint raíz
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Bookings Hub API',
    version: '1.0.0',
    status: 'Running',
    environment: credentials.server.environment,
    timestamp: new Date().toISOString(),
    endpoints: {
      api: '/api',
      documentation: '/api-docs'
    }
  });
});

/**
 * Error Handling Middleware
 */

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `La ruta ${req.originalUrl} no existe`,
    data: null,
    timestamp: new Date().toISOString()
  });
});

// Manejador global de errores
app.use((error, req, res, next) => {
  logger.error('Server Error:', error);

  // Error específico de validación de Joi
  if (error.isJoi) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación en los datos enviados',
      errors: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      })),
      data: null
    });
  }
  
  // Error de sintaxis JSON
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({
      success: false,
      message: 'JSON mal formateado en el cuerpo de la petición',
      data: null
    });
  }
  
  // Error genérico
  const statusCode = error.status || error.statusCode || 500;
  const message = credentials.server.environment === 'production' 
    ? (statusCode === 500 ? 'Error interno del servidor' : error.message)
    : error.message;
  
  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    timestamp: new Date().toISOString(),
    ...(credentials.server.environment === 'development' && { 
      stack: error.stack,
      details: error.toString()
    })
  });
});


if (require.main === module) {
  const PORT = credentials.server.port || 3000;
  
  app.listen(PORT, () => {
    logger.info(`Servidor ejecutándose en puerto: ${PORT}`);
    logger.info(`Documentación API: http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
