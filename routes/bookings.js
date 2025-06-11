const express = require('express');
const router = express.Router();
const { authenticateToken } = require('@middlewares/auth');
const { validateBody, validateParams, validateQuery, schemas } = require('@middlewares/joiValidation');
const BookingController = require('@controllers/bookingController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la reserva
 *         user_id:
 *           type: integer
 *           description: ID del usuario que hizo la reserva
 *         service_id:
 *           type: integer
 *           description: ID del servicio reservado
 *         business_id:
 *           type: integer
 *           description: ID del negocio
 *         employee_id:
 *           type: integer
 *           nullable: true
 *           description: ID del empleado asignado (opcional)
 *         booking_date:
 *           type: string
 *           format: date
 *           description: Fecha de la reserva
 *         booking_time:
 *           type: string
 *           format: time
 *           description: Hora de la reserva
 *         status:
 *           type: string
 *           enum: [pendiente, confirmada, cancelada]
 *           description: Estado de la reserva
 *         notes:
 *           type: string
 *           nullable: true
 *           description: Notas adicionales de la reserva
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *       example:
 *         id: 1
 *         user_id: 123
 *         service_id: 456
 *         business_id: 789
 *         employee_id: 101
 *         booking_date: "2024-12-25"
 *         booking_time: "14:30:00"
 *         status: "confirmada"
 *         notes: "Cliente prefiere ventana"
 *         created_at: "2024-12-01T10:00:00Z"
 *         updated_at: "2024-12-01T10:00:00Z"
 *
 *     CreateBookingRequest:
 *       type: object
 *       required:
 *         - service_id
 *         - business_id
 *         - booking_date
 *         - booking_time
 *       properties:
 *         service_id:
 *           type: integer
 *           description: ID del servicio a reservar
 *         business_id:
 *           type: integer
 *           description: ID del negocio
 *         booking_date:
 *           type: string
 *           format: date
 *           description: Fecha de la reserva (YYYY-MM-DD)
 *         booking_time:
 *           type: string
 *           format: time
 *           description: Hora de la reserva (HH:MM:SS)
 *         employee_id:
 *           type: integer
 *           nullable: true
 *           description: ID del empleado preferido (opcional)
 *         notes:
 *           type: string
 *           maxLength: 500
 *           description: Notas adicionales
 *       example:
 *         service_id: 456
 *         business_id: 789
 *         booking_date: "2024-12-25"
 *         booking_time: "14:30:00"
 *         employee_id: 101
 *         notes: "Cliente prefiere ventana"
 *
 *     UpdateBookingStatusRequest:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [pendiente, confirmada, cancelada]
 *           description: Nuevo estado de la reserva
 *       example:
 *         status: "confirmada"
 */

/**
 * @swagger
 * /api/bookings/user:
 *   get:
 *     summary: Obtener reservas del usuario autenticado
 *     description: Retorna todas las reservas realizadas por el usuario autenticado
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reservas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               count: 2
 *               data:
 *                 - id: 1
 *                   service_name: "Corte de cabello"
 *                   business_name: "Barbería El Corte"
 *                   booking_date: "2024-12-25"
 *                   booking_time: "14:30:00"
 *                   status: "confirmada"
 *                 - id: 2
 *                   service_name: "Manicura"
 *                   business_name: "Spa Relax"
 *                   booking_date: "2024-12-26"
 *                   booking_time: "10:00:00"
 *                   status: "pendiente"
 *               message: "Reservas del usuario obtenidas exitosamente"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/user', authenticateToken, BookingController.getUserBookings);

/**
 * @swagger
 * /api/bookings/business/{business_id}:
 *   get:
 *     summary: Obtener reservas de un negocio
 *     description: Obtiene todas las reservas de un negocio específico. Solo el dueño del negocio puede acceder.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: business_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Reservas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data: []
 *               message: "Reservas del negocio obtenidas exitosamente"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Sin autorización para ver estas reservas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "No tienes autorización para ver las reservas de este negocio"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/business/:business_id', 
  authenticateToken, 
  validateParams(schemas.common.businessIdRouteParam),
  BookingController.getBusinessBookings
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Obtener reserva por ID
 *     description: Obtiene los detalles de una reserva específica. Solo el cliente que hizo la reserva o el dueño del negocio pueden acceder.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 user_id: 123
 *                 service_id: 456
 *                 business_id: 789
 *                 employee_id: 101
 *                 booking_date: "2024-12-25"
 *                 booking_time: "14:30:00"
 *                 status: "confirmada"
 *                 notes: "Cliente prefiere ventana"
 *                 service_name: "Corte de cabello"
 *                 business_name: "Barbería El Corte"
 *                 employee_name: "Juan Pérez"
 *               message: "Reserva obtenida exitosamente"
 *       400:
 *         description: ID de reserva inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "ID de reserva inválido"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Sin autorización para ver esta reserva
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "No tienes autorización para ver esta reserva"
 *       404:
 *         description: Reserva no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Reserva no encontrada"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', 
  authenticateToken, 
  validateParams(schemas.common.idParam),
  BookingController.getBookingById
);

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Crear una nueva reserva
 *     description: Crea una nueva reserva para un servicio. Solo los clientes pueden crear reservas.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingRequest'
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data:
 *                 booking_id: 123
 *               message: "Reserva creada exitosamente"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Solo los clientes pueden hacer reservas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Solo los clientes pueden hacer reservas"
 *       409:
 *         description: Conflicto con disponibilidad
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "No se puede hacer la reserva: El empleado no está disponible en esa fecha y hora"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', 
  authenticateToken, 
  validateBody(schemas.booking.createBooking), 
  BookingController.createBooking
);

/**
 * @swagger
 * /api/bookings/{id}/status:
 *   put:
 *     summary: Actualizar estado de una reserva
 *     description: Actualiza el estado de una reserva. Los clientes solo pueden cancelar sus reservas, los negocios pueden confirmar o cancelar reservas de sus servicios.
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookingStatusRequest'
 *     responses:
 *       200:
 *         description: Estado de reserva actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data: null
 *               message: "Estado de reserva actualizado exitosamente"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Sin autorización para modificar esta reserva
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "No tienes autorización para modificar esta reserva"
 *       404:
 *         description: Reserva no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Reserva no encontrada"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id/status', 
  authenticateToken, 
  validateParams(schemas.common.idParam),
  validateBody(schemas.booking.updateBookingStatus), 
  BookingController.updateBookingStatus
);

module.exports = router;
