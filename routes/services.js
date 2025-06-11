const express = require('express');
const router = express.Router();
const { authenticateToken } = require('@middlewares/auth');
const { validateBody, validateParams, validateQuery, schemas } = require('@middlewares/joiValidation');
const serviceController = require('@controllers/serviceController');
const employeeController = require('@controllers/employeeController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del servicio
 *         business_id:
 *           type: integer
 *           description: ID del negocio que ofrece el servicio
 *         name:
 *           type: string
 *           description: Nombre del servicio
 *         description:
 *           type: string
 *           description: Descripción del servicio
 *         duration:
 *           type: integer
 *           description: Duración del servicio en minutos
 *         price:
 *           type: number
 *           format: float
 *           description: Precio del servicio
 *         category:
 *           type: string
 *           description: Categoría del servicio
 *         active:
 *           type: boolean
 *           description: Estado activo del servicio
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
 *         business_id: 123
 *         name: "Corte de cabello"
 *         description: "Corte de cabello con estilo moderno"
 *         duration: 30
 *         price: 25.00
 *         category: "Belleza"
 *         active: true
 *         created_at: "2024-12-01T10:00:00Z"
 *         updated_at: "2024-12-01T10:00:00Z"
 *
 *     CreateServiceRequest:
 *       type: object
 *       required:
 *         - business_id
 *         - name
 *         - duration
 *         - price
 *       properties:
 *         business_id:
 *           type: integer
 *           description: ID del negocio
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *           description: Nombre del servicio
 *         description:
 *           type: string
 *           maxLength: 500
 *           description: Descripción del servicio
 *         duration:
 *           type: integer
 *           minimum: 1
 *           maximum: 600
 *           description: Duración en minutos
 *         price:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: Precio del servicio
 *         category:
 *           type: string
 *           maxLength: 50
 *           description: Categoría del servicio
 *       example:
 *         business_id: 123
 *         name: "Corte de cabello"
 *         description: "Corte de cabello con estilo moderno"
 *         duration: 30
 *         price: 25.00
 *         category: "Belleza"
 *
 *     UpdateServiceRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 1
 *           maxLength: 100
 *           description: Nombre del servicio
 *         description:
 *           type: string
 *           maxLength: 500
 *           description: Descripción del servicio
 *         duration:
 *           type: integer
 *           minimum: 1
 *           maximum: 600
 *           description: Duración en minutos
 *         price:
 *           type: number
 *           format: float
 *           minimum: 0
 *           description: Precio del servicio
 *         category:
 *           type: string
 *           maxLength: 50
 *           description: Categoría del servicio
 *       example:
 *         name: "Corte de cabello premium"
 *         description: "Corte de cabello con tratamiento especial"
 *         duration: 45
 *         price: 35.00
 *         category: "Belleza Premium"
 */

/**
 * @swagger
 * /api/services/{id}/employees:
 *   get:
 *     summary: Obtener empleados de un servicio
 *     description: Obtiene la lista de empleados que pueden realizar un servicio específico
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: ID de servicio inválido
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id/employees', 
  validateParams(schemas.common.idParam),
  employeeController.getEmployeesByService
);

/**
 * @swagger
 * /api/services/business/{businessId}:
 *   get:
 *     summary: Obtener servicios de un negocio
 *     description: Obtiene todos los servicios ofrecidos por un negocio específico
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del negocio
 *     responses:
 *       200:
 *         description: Lista de servicios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               count: 3
 *               data:
 *                 - id: 1
 *                   name: "Corte de cabello"
 *                   description: "Corte de cabello con estilo moderno"
 *                   duration: 30
 *                   price: 25.00
 *                   category: "Belleza"
 *                 - id: 2
 *                   name: "Barba"
 *                   description: "Arreglo y diseño de barba"
 *                   duration: 20
 *                   price: 15.00
 *                   category: "Belleza"
 *               message: "Servicios obtenidos exitosamente"
 *       400:
 *         description: ID de negocio inválido
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/business/:businessId', 
  validateParams(schemas.common.businessIdParam),
  serviceController.getBusinessServices
);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Obtener servicio por ID
 *     description: Obtiene los detalles de un servicio específico
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio
 *     responses:
 *       200:
 *         description: Servicio obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 business_id: 123
 *                 name: "Corte de cabello"
 *                 description: "Corte de cabello con estilo moderno"
 *                 duration: 30
 *                 price: 25.00
 *                 category: "Belleza"
 *                 business_name: "Barbería El Corte"
 *               message: "Servicio obtenido exitosamente"
 *       400:
 *         description: ID de servicio inválido
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', 
  validateParams(schemas.common.idParam),
  serviceController.getServiceById
);

/**
 * @swagger
 * /api/services/{serviceId}/availability:
 *   get:
 *     summary: Obtener disponibilidad de un servicio
 *     description: Obtiene la disponibilidad de un servicio para un mes específico
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: serviceId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *         description: Mes (1-12)
 *       - in: query
 *         name: employeeId
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID del empleado (opcional)
 *     responses:
 *       200:
 *         description: Disponibilidad obtenida exitosamente
 *       400:
 *         description: Parámetros inválidos
 *       404:
 *         description: Servicio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:serviceId/availability',
  validateParams(schemas.common.serviceIdParam),
  validateQuery(schemas.availability.getAvailability),
  serviceController.getServiceAvailability
);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Crear un nuevo servicio
 *     description: Crea un nuevo servicio para un negocio (solo propietarios)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateServiceRequest'
 *     responses:
 *       201:
 *         description: Servicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data:
 *                 service_id: 123
 *               message: "Servicio creado exitosamente"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: No autorizado para añadir servicios a este negocio
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "No tienes autorización para añadir servicios a este negocio"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', 
  authenticateToken, 
  validateBody(schemas.service.create), 
  serviceController.createService
);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Actualizar un servicio
 *     description: Actualiza un servicio existente (solo propietarios del negocio)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateServiceRequest'
 *     responses:
 *       200:
 *         description: Servicio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data: null
 *               message: "Servicio actualizado exitosamente"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: No autorizado para modificar este servicio
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "No tienes autorización para modificar este servicio"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id', 
  authenticateToken, 
  validateParams(schemas.common.idParam),
  validateBody(schemas.service.update), 
  serviceController.updateService
);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Eliminar un servicio
 *     description: Elimina un servicio existente (solo propietarios del negocio)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio
 *     responses:
 *       200:
 *         description: Servicio eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               success: true
 *               data: null
 *               message: "Servicio eliminado exitosamente"
 *       400:
 *         description: ID de servicio inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "ID de servicio inválido"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: No autorizado para eliminar este servicio
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "No tienes autorización para eliminar este servicio"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', 
  authenticateToken, 
  validateParams(schemas.common.idParam),
  serviceController.deleteService
);

module.exports = router;
