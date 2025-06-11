const express = require('express');
const router = express.Router();
const { authenticateToken } = require('@middlewares/auth');
const { validateParams, validateQuery, validateBody, schemas } = require('@middlewares/joiValidation');
const businessController = require('@controllers/businessController');
const employeeController = require('@controllers/employeeController');
const serviceController = require('@controllers/serviceController');
const BookingController = require('@controllers/bookingController');

/**
 * @swagger
 * tags:
 *   name: Businesses
 *   description: Gestión de negocios
 */

/**
 * @swagger
 * /api/businesses:
 *   get:
 *     summary: Obtener todos los negocios
 *     description: Obtiene una lista paginada de todos los negocios disponibles
 *     tags: [Businesses]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Cantidad de resultados por página
 *     responses:
 *       200:
 *         description: Lista de negocios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Business'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', 
  validateQuery(schemas.common.pagination),
  businessController.getAllBusinesses
);

/**
 * @swagger
 * /api/businesses/featured:
 *   get:
 *     summary: Obtener negocios destacados
 *     description: Obtiene una lista de los negocios destacados
 *     tags: [Businesses]
 *     responses:
 *       200:
 *         description: Negocios destacados obtenidos exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/featured', businessController.getFeaturedBusinesses);

/**
 * @swagger
 * /api/businesses/search:
 *   get:
 *     summary: Buscar negocios
 *     description: Busca negocios por término de búsqueda
 *     tags: [Businesses]
 *     parameters:
 *       - in: query
 *         name: term
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *         description: Término de búsqueda
 *     responses:
 *       200:
 *         description: Resultados de búsqueda obtenidos exitosamente
 *       400:
 *         description: Término de búsqueda inválido
 *       500:
 *         description: Error interno del servidor
 */
router.get('/search', 
  validateQuery(schemas.common.search),
  businessController.searchBusinesses
);

/**
 * @swagger
 * /api/businesses/category/{category}:
 *   get:
 *     summary: Obtener negocios por categoría
 *     description: Obtiene todos los negocios de una categoría específica
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Categoría del negocio
 *     responses:
 *       200:
 *         description: Negocios por categoría obtenidos exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get('/category/:category', 
  validateParams(schemas.common.categoryParam),
  businessController.getBusinessesByCategory
);

/**
 * @swagger
 * /api/businesses/{id}/services:
 *   get:
 *     summary: Obtener servicios de un negocio
 *     description: Obtiene todos los servicios ofrecidos por un negocio específico (acceso público)
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Servicios del negocio obtenidos exitosamente
 *       404:
 *         description: Negocio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id/services', 
  validateParams(schemas.common.idParam),
  serviceController.getBusinessServices
);

/**
 * @swagger
 * /api/businesses/{id}/employees:
 *   get:
 *     summary: Obtener empleados de un negocio
 *     description: Obtiene todos los empleados de un negocio específico (requiere autenticación)
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Empleados del negocio obtenidos exitosamente
 *       401:
 *         description: Token de autenticación requerido
 *       404:
 *         description: Negocio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id/employees', 
  authenticateToken, 
  validateParams(schemas.common.idParam),
  employeeController.getEmployeesByBusiness
);

/**
 * @swagger
 * /api/businesses/user:
 *   get:
 *     summary: Obtener negocio del usuario actual
 *     description: Obtiene el negocio asociado al usuario autenticado
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Negocio del usuario obtenido exitosamente
 *       401:
 *         description: Token de autenticación requerido
 *       404:
 *         description: Negocio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/user', authenticateToken, businessController.getBusinessByUserId);

/**
 * @swagger
 * /api/businesses/{id}:
 *   get:
 *     summary: Obtener negocio por ID
 *     description: Obtiene la información detallada de un negocio específico
 *     tags: [Businesses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Negocio obtenido exitosamente
 *       404:
 *         description: Negocio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', 
  validateParams(schemas.common.idParam),
  businessController.getBusinessById
);

/**
 * @swagger
 * /api/businesses:
 *   post:
 *     summary: Crear un nuevo negocio
 *     description: Crea un nuevo negocio (solo usuarios con rol "negocio")
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessCreate'
 *     responses:
 *       201:
 *         description: Negocio creado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Token de autenticación requerido
 *       403:
 *         description: Sin permisos para crear negocios
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', 
  authenticateToken, 
  validateBody(schemas.business.create),
  businessController.createBusiness
);

/**
 * @swagger
 * /api/businesses/{id}:
 *   put:
 *     summary: Actualizar un negocio
 *     description: Actualiza la información de un negocio (solo el propietario)
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del negocio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessUpdate'
 *     responses:
 *       200:
 *         description: Negocio actualizado exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Token de autenticación requerido
 *       403:
 *         description: Sin permisos para actualizar este negocio
 *       404:
 *         description: Negocio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id', 
  authenticateToken, 
  validateParams(schemas.common.idParam),
  validateBody(schemas.business.update),
  businessController.updateBusiness
);

/**
 * @swagger
 * /api/businesses/{id}/bookings:
 *   get:
 *     summary: Obtener reservas de un negocio
 *     description: Obtiene todas las reservas de un negocio específico (solo propietario)
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Reservas del negocio obtenidas exitosamente
 *       401:
 *         description: Token de autenticación requerido
 *       403:
 *         description: Sin permisos para ver las reservas de este negocio
 *       404:
 *         description: Negocio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id/bookings', 
  authenticateToken, 
  validateParams(schemas.common.idParam),
  BookingController.getBusinessBookings
);

/**
 * @swagger
 * /api/businesses/{id}/bookings/recent:
 *   get:
 *     summary: Obtener reservas recientes de un negocio
 *     description: Obtiene las reservas más recientes de un negocio (solo propietario)
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Reservas recientes obtenidas exitosamente
 *       401:
 *         description: Token de autenticación requerido
 *       403:
 *         description: Sin permisos para ver las reservas de este negocio
 *       404:
 *         description: Negocio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id/bookings/recent', 
  authenticateToken, 
  validateParams(schemas.common.idParam),
  businessController.getRecentBookings
);

/**
 * @swagger
 * /api/businesses/{id}/stats/weekly:
 *   get:
 *     summary: Obtener estadísticas semanales de un negocio
 *     description: Obtiene las estadísticas semanales de un negocio (solo propietario)
 *     tags: [Businesses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Estadísticas semanales obtenidas exitosamente
 *       401:
 *         description: Token de autenticación requerido
 *       403:
 *         description: Sin permisos para ver las estadísticas de este negocio
 *       404:
 *         description: Negocio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id/stats/weekly', 
  authenticateToken, 
  validateParams(schemas.common.idParam),
  businessController.getWeeklyStats
);

module.exports = router;
