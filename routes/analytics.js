const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/analyticsController');
const { authenticateToken } = require('../middlewares/auth');

/**
 * @swagger
 * /api/analytics/business:
 *   get:
 *     summary: Obtener analíticas del negocio
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [1month, 3months, 6months, 1year]
 *         description: Período de tiempo para las analíticas
 *     responses:
 *       200:
 *         description: Analíticas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalBookings:
 *                       type: number
 *                     totalRevenue:
 *                       type: number
 *                     averageRating:
 *                       type: number
 *                     totalServices:
 *                       type: number
 *                     bookingsByMonth:
 *                       type: array
 *                     popularServices:
 *                       type: array
 *                     revenueByService:
 *                       type: array
 *                     customerRetention:
 *                       type: number
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Negocio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/business', authenticateToken, AnalyticsController.getBusinessAnalytics);

module.exports = router;
