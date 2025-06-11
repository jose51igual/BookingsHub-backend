const express = require('express');
const router = express.Router();
const EmployeeController = require('@controllers/employeeController');
const { authenticateToken } = require('@middlewares/auth');
const { validateBody, validateParams, validateQuery, schemas } = require('@middlewares/joiValidation');

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del empleado
 *           example: 1
 *         business_id:
 *           type: integer
 *           description: ID del negocio al que pertenece
 *           example: 1
 *         name:
 *           type: string
 *           description: Nombre completo del empleado
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           format: email
 *           description: Email del empleado (opcional)
 *           example: "juan.perez@example.com"
 *         phone:
 *           type: string
 *           description: Teléfono del empleado (opcional)
 *           example: "+34 123 456 789"
 *         position:
 *           type: string
 *           description: Posición o cargo del empleado
 *           example: "Barbero Senior"
 *         specialties:
 *           type: array
 *           items:
 *             type: string
 *           description: Especialidades del empleado
 *           example: ["Corte clásico", "Barba", "Afeitado"]
 *         profile_image:
 *           type: string
 *           description: URL de la imagen de perfil
 *           example: "https://example.com/images/juan.jpg"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *     
 *     EmployeeAvailability:
 *       type: object
 *       properties:
 *         available:
 *           type: boolean
 *           description: Indica si el empleado está disponible
 *           example: true
 *         reason:
 *           type: string
 *           description: Razón por la cual no está disponible (si aplica)
 *           example: "Tiene una cita programada a esa hora"
 *         next_available_slot:
 *           type: string
 *           description: Próximo horario disponible
 *           example: "14:30"
 */

// ====================================
// Rutas públicas (solo para consultar)
// ====================================

/**
 * @swagger
 * /api/employees/business/{id}:
 *   get:
 *     summary: Obtener empleados por negocio
 *     description: Obtiene todos los empleados que trabajan en un negocio específico
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del negocio
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de empleados del negocio obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *                   example: "Empleados obtenidos exitosamente"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/business/:id', 
  validateParams(schemas.idParam),
  EmployeeController.getEmployeesByBusiness
);

/**
 * @swagger
 * /api/employees/service/{id}:
 *   get:
 *     summary: Obtener empleados por servicio
 *     description: Obtiene todos los empleados que pueden realizar un servicio específico
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio
 *         example: 1
 *     responses:
 *       200:
 *         description: Lista de empleados especializados obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *                   example: "Empleados especializados obtenidos exitosamente"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/service/:id', 
  validateParams(schemas.idParam),
  EmployeeController.getEmployeesByService
);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Obtener empleado por ID
 *     description: Obtiene los detalles de un empleado específico
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *         example: 1
 *     responses:
 *       200:
 *         description: Empleado obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *                   example: "Empleado obtenido exitosamente"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', 
  validateParams(schemas.idParam),
  EmployeeController.getEmployeeById
);

/**
 * @swagger
 * /api/employees/{id}/availability:
 *   get:
 *     summary: Verificar disponibilidad de empleado
 *     description: Verifica si un empleado está disponible en una fecha y hora específica
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *         example: 1
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha a verificar (YYYY-MM-DD)
 *         example: "2024-01-15"
 *       - in: query
 *         name: time
 *         required: true
 *         schema:
 *           type: string
 *         description: Hora a verificar (HH:MM)
 *         example: "10:30"
 *     responses:
 *       200:
 *         description: Disponibilidad verificada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/EmployeeAvailability'
 *                 message:
 *                   type: string
 *                   example: "Disponibilidad verificada exitosamente"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id/availability', 
  validateParams(schemas.idParam),
  validateQuery(schemas.availabilityQuery),
  EmployeeController.checkAvailability
);

// ====================================
// Rutas protegidas (requieren autenticación)
// ====================================

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Crear nuevo empleado
 *     description: Crea un nuevo empleado para un negocio (solo propietarios)
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeInput'
 *           examples:
 *             basic:
 *               summary: Empleado básico
 *               value:
 *                 business_id: 1
 *                 name: "María García"
 *                 email: "maria.garcia@example.com"
 *                 phone: "+34 987 654 321"
 *                 position: "Estilista"
 *                 specialties: ["Corte", "Tinte", "Peinados"]
 *                 service_ids: [1, 2, 3]
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *                   example: "Empleado creado exitosamente"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', 
  authenticateToken, 
  validateBody(schemas.employee.create),
  EmployeeController.createEmployee
);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Actualizar empleado
 *     description: Actualiza los datos de un empleado existente (solo propietarios)
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeUpdate'
 *           examples:
 *             partial:
 *               summary: Actualización parcial
 *               value:
 *                 name: "María García Rodríguez"
 *                 phone: "+34 987 654 322"
 *                 specialties: ["Corte", "Tinte", "Peinados", "Mechas"]
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Employee'
 *                 message:
 *                   type: string
 *                   example: "Empleado actualizado exitosamente"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       409:
 *         $ref: '#/components/responses/Conflict'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/:id', 
  authenticateToken, 
  validateParams(schemas.idParam),
  validateBody(schemas.employee.update),
  EmployeeController.updateEmployee
);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Eliminar empleado
 *     description: Elimina un empleado existente (solo propietarios)
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Empleado eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: null
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: "Empleado eliminado exitosamente"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/:id', 
  authenticateToken, 
  validateParams(schemas.idParam),
  EmployeeController.deleteEmployee
);

/**
 * @swagger
 * /api/employees/{id}/services:
 *   post:
 *     summary: Asignar servicios a empleado
 *     description: Asigna servicios específicos que un empleado puede realizar (solo propietarios)
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del empleado
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_ids
 *             properties:
 *               service_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array de IDs de servicios a asignar
 *                 example: [1, 2, 3]
 *           examples:
 *             multiple_services:
 *               summary: Múltiples servicios
 *               value:
 *                 service_ids: [1, 2, 3, 4]
 *     responses:
 *       200:
 *         description: Servicios asignados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: null
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: "Servicios asignados exitosamente al empleado"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/:id/services', 
  authenticateToken, 
  validateParams(schemas.idParam),
  validateBody(schemas.employee.assignServices),
  EmployeeController.assignServices
);

module.exports = router;
