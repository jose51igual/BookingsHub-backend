const { PrismaClient } = require('../generated/prisma');

/**
 * Cliente de Prisma configurado para el proyecto
 */
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

/**
 * Probar conexión a la base de datos
 * @returns {Promise<boolean>} Estado de la conexión
 */
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Conexión a la base de datos con Prisma exitosa');
    return true;
  } catch (error) {
    console.error(`Error de conexión a la base de datos con Prisma: ${error.message}`);
    return false;
  }
}

/**
 * Cerrar conexión de Prisma
 */
async function closeConnection() {
  try {
    await prisma.$disconnect();
    console.log('Conexión de Prisma cerrada');
  } catch (error) {
    console.error(`Error al cerrar la conexión de Prisma: ${error.message}`);
  }
}

module.exports = {
  prisma,
  testConnection,
  closeConnection
};
