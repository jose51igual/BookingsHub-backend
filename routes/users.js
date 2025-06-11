const express = require('express');
const router = express.Router();
const { authenticateToken } = require('@middlewares/auth');
const { validateBody, schemas } = require('@middlewares/joiValidation');
const userController = require('@controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de perfiles de usuario
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Obtener perfil del usuario actual
 *     description: Obtiene la información del perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                       format: email
 *                     role:
 *                       type: string
 *                       enum: [cliente, negocio]
 *                     phone:
 *                       type: string
 *                     profile_image:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Token de autenticación requerido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/profile', authenticateToken, userController.getUserProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Actualizar perfil del usuario
 *     description: Actualiza la información del perfil del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: Nombre del usuario
 *               phone:
 *                 type: string
 *                 pattern: '^[+]?[1-9][\d\s\-\(\)]{7,15}$'
 *                 description: Teléfono del usuario
 *               profile_image:
 *                 type: string
 *                 format: uri
 *                 description: URL de la imagen de perfil
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     profile_image:
 *                       type: string
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Token de autenticación requerido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/profile', 
  authenticateToken, 
  validateBody(schemas.user.updateProfile),
  userController.updateUserProfile
);

/**
 * @swagger
 * /api/users/profile:
 *   delete:
 *     summary: Eliminar cuenta de usuario
 *     description: Elimina permanentemente la cuenta del usuario autenticado
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cuenta eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cuenta eliminada exitosamente"
 *                 data:
 *                   type: null
 *       401:
 *         description: Token de autenticación requerido
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/profile', authenticateToken, userController.deleteUserAccount);

module.exports = router;
