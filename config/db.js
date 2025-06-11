const mysql = require('mysql2/promise');
const credentials = require('./credentials');
const logger = require('@utils/logger');

/**
 * Database connection configuration and pool management
 */

// Crear el pool de conexiones
const db = mysql.createPool({
  host: credentials.database.host,
  user: credentials.database.user,
  password: credentials.database.password,
  database: credentials.database.name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  idleTimeout: 60000,
  multipleStatements: false
});

/**
 * Probar conexión a la base de datos
 * @returns {Promise<boolean>} Estado de la conexión
 */
async function testConnection() {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS solution');
    logger.info(`Conexión a la base de datos exitosa. Resultado de prueba: ${rows[0].solution}`);
    return true;
  } catch (error) {
    logger.error(`Error de conexión a la base de datos: ${error.message}`);
    return false;
  }
}

/**
 * Cerrar pool de conexiones de base de datos
 */
async function closeConnection() {
  try {
    await db.end();
    logger.info('Pool de conexiones de base de datos cerrado');
  } catch (error) {
    logger.error(`Error al cerrar la conexión de base de datos: ${error.message}`);
  }
}

module.exports = {
  db,
  testConnection,
  closeConnection
};
