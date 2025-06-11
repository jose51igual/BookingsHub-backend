const winston = require('winston');
const path = require('path');
const config = require('../config');

/**
 * Configuración del sistema de logging usando Winston
 * Los logs se guardan en archivos y se muestran en consola según el entorno
 */

// Crear el directorio de logs si no existe
const logsDir = path.join(__dirname, '..', 'logs');

// Configurar formato personalizado para los archivos
const fileFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Configurar formato para consola
const consoleFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let metaStr = '';
    if (Object.keys(meta).length > 0) {
      metaStr = ` ${JSON.stringify(meta)}`;
    }
    return `[${timestamp}] ${level}: ${message}${metaStr}`;
  })
);

// Configurar transports (destinos de los logs)
const transports = [
  // Archivo para todos los logs
  new winston.transports.File({
    filename: path.join(logsDir, 'app.log'),
    format: fileFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),
  
  // Archivo solo para errores
  new winston.transports.File({
    filename: path.join(logsDir, 'error.log'),
    level: 'error',
    format: fileFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  }),

  // Archivo para logs de acceso/info
  new winston.transports.File({
    filename: path.join(logsDir, 'access.log'),
    level: 'info',
    format: fileFormat,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  })
];

// Agregar consola solo en desarrollo
if (config.NODE_ENV === 'development') {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat
    })
  );
}

// Crear el logger
const logger = winston.createLogger({
  level: config.NODE_ENV === 'production' ? 'info' : 'debug',
  format: fileFormat,
  transports,
  // Manejar excepciones no capturadas
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'exceptions.log'),
      format: fileFormat
    })
  ],
  // Manejar promesas rechazadas no capturadas
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'rejections.log'),
      format: fileFormat
    })
  ]
});

module.exports = logger;
