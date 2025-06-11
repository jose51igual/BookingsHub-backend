const express = require('express');
const router = express.Router();
const ReviewController = require('@controllers/reviewController');
const { authenticateToken } = require('@middlewares/auth');
const { validateBody, validateParams, validateQuery, schemas } = require('@middlewares/joiValidation');

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único de la reseña
 *         user_id:
 *           type: integer
 *           description: ID del usuario que escribió la reseña
 *         business_id:
 *           type: integer
 *           description: ID del negocio reseñado
 *         booking_id:
 *           type: integer
 *           description: ID de la reserva asociada
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Calificación de 1 a 5 estrellas
 *         comment:
 *           type: string
 *           description: Comentario de la reseña
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
 *         user_id: 1
 *         business_id: 1
 *         booking_id: 1
 *         rating: 5
 *         comment: "Excelente servicio, muy recomendado"
 *         created_at: "2024-01-15T10:30:00Z"
 *         updated_at: "2024-01-15T10:30:00Z"
 */

/**
 * @swagger
 * /api/reviews/business/{id}:
 *   get:
 *     summary: Obtener reseñas de un negocio
 *     description: Obtiene todas las reseñas de un negocio específico
 *     tags: [Reviews]
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
 *         description: Reseñas del negocio obtenidas exitosamente
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
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *                 message:
 *                   type: string
 *                   example: "Reseñas del negocio obtenidas exitosamente"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/business/:id', 
  validateParams(schemas.common.idParam),
  ReviewController.getBusinessReviews
);

/**
 * @swagger
 * /api/reviews/business/{id}/recent:
 *   get:
 *     summary: Obtener reseñas recientes de un negocio
 *     description: Obtiene las reseñas más recientes de un negocio específico
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del negocio
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Número máximo de reseñas a obtener
 *         example: 5
 *     responses:
 *       200:
 *         description: Reseñas recientes obtenidas exitosamente
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
 *                     $ref: '#/components/schemas/Review'
 *                 message:
 *                   type: string
 *                   example: "Reseñas recientes obtenidas exitosamente"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/business/:id/recent', 
  validateParams(schemas.common.idParam),
  ReviewController.getRecentReviews
);

/**
 * @swagger
 * /api/reviews/user:
 *   get:
 *     summary: Obtener reseñas del usuario
 *     description: Obtiene todas las reseñas escritas por el usuario autenticado
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reseñas obtenidas exitosamente
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
 *                     $ref: '#/components/schemas/Review'
 *                 message:
 *                   type: string
 *                   example: "Reseñas obtenidas exitosamente"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/user', authenticateToken, ReviewController.getUserReviews);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Obtener reseña por ID
 *     description: Obtiene una reseña específica por su ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reseña
 *         example: 1
 *     responses:
 *       200:
 *         description: Reseña obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *                 message:
 *                   type: string
 *                   example: "Reseña obtenida exitosamente"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', 
  validateParams(schemas.common.idParam),
  ReviewController.getReviewById
);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Crear nueva reseña
 *     description: Crea una nueva reseña para un negocio
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - business_id
 *               - booking_id
 *               - rating
 *             properties:
 *               business_id:
 *                 type: integer
 *                 description: ID del negocio a reseñar
 *                 example: 1
 *               booking_id:
 *                 type: integer
 *                 description: ID de la reserva asociada
 *                 example: 1
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Calificación de 1 a 5 estrellas
 *                 example: 5
 *               comment:
 *                 type: string
 *                 description: Comentario opcional
 *                 example: "Excelente servicio, muy recomendado"
 *     responses:
 *       201:
 *         description: Reseña creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *                 message:
 *                   type: string
 *                   example: "Reseña creada exitosamente"
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       409:
 *         description: Ya existe una reseña para esta reserva
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', 
  authenticateToken, 
  validateBody(schemas.review.create),
  ReviewController.createReview
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Actualizar reseña
 *     description: Actualiza una reseña existente (solo el autor)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reseña a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Nueva calificación
 *                 example: 4
 *               comment:
 *                 type: string
 *                 description: Nuevo comentario
 *                 example: "Buen servicio, aunque hay espacio para mejorar"
 *     responses:
 *       200:
 *         description: Reseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Review'
 *                 message:
 *                   type: string
 *                   example: "Reseña actualizada exitosamente"
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
router.put('/:id', 
  authenticateToken, 
  validateParams(schemas.common.idParam),
  validateBody(schemas.review.create),
  ReviewController.updateReview
);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Eliminar reseña
 *     description: Elimina una reseña existente (solo el autor o admin)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reseña a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Reseña eliminada exitosamente
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
 *                   example: "Reseña eliminada exitosamente"
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
  validateParams(schemas.common.idParam),
  ReviewController.deleteReview
);

module.exports = router;
