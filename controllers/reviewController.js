const ReviewModel = require('@models/reviewModel');
const { apiResponse, apiError } = require('@utils/apiResponse');
const logger = require('@utils/logger');

/**
 * Review Controller
 * Handles all review-related operations with professional standards
 * All validation is handled by Joi middleware in routes
 * All responses use standardized apiResponse/apiError format
 */
class ReviewController {
  /**
   * Obtener todas las reseñas de un negocio específico
   *
   * @description Obtiene todas las reseñas de un negocio
   * @param {Request} req - Objeto de solicitud Express con id del negocio en parámetros
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Promise<Response>} Respuesta JSON con lista de reseñas
   */
  static async getBusinessReviews(req, res) {
    try {
      const businessId = parseInt(req.params.id);
      const reviews = await ReviewModel.getBusinessReviews(businessId);
      
      logger.info('Business reviews retrieved successfully', {
        businessId,
        reviewsCount: reviews.length,
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 200, {
        success: true,
        count: reviews.length,
        data: reviews,
        message: 'Reseñas del negocio obtenidas exitosamente'
      });
    } catch (error) {
      logger.error('Error retrieving business reviews', {
        error: error.message,
        stack: error.stack,
        businessId: req.params.id,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * Crear una nueva reseña para un negocio
   *
   * @description Crea una nueva reseña para un negocio (solo usuarios autenticados)
   * @param {Request} req - Objeto de solicitud Express con datos de reseña en body
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Promise<Response>} Respuesta JSON con ID de reseña creada
   */
  static async createReview(req, res) {
    try {
      const { business_id, rating, comment } = req.body;
      const userId = req.user.id;
      
      // Verificar si el usuario ya reseñó este negocio
      const hasReviewed = await ReviewModel.userHasReviewed(userId, business_id);
      
      if (hasReviewed) {
        logger.warn('User attempted to create duplicate review', {
          userId,
          businessId: business_id,
          timestamp: new Date().toISOString()
        });
        return apiError(res, 409, 'Ya has dejado una reseña para este negocio. Puedes actualizarla en lugar de crear una nueva');
      }
      
      const reviewId = await ReviewModel.createReview(
        userId,
        business_id,
        rating,
        comment?.trim() || null
      );
      
      logger.info('Review created successfully', {
        reviewId,
        userId,
        businessId: business_id,
        rating,
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 201, {
        success: true,
        data: { reviewId },
        message: 'Reseña creada exitosamente'
      });
    } catch (error) {
      logger.error('Error creating review', {
        error: error.message,
        stack: error.stack,
        userId: req.user?.id,
        requestBody: req.body,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * Actualizar una reseña existente
   *
   * @description Actualiza una reseña existente (solo el autor de la reseña)
   * @param {Request} req - Objeto de solicitud Express con id de reseña en parámetros y datos de actualización en body
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Promise<Response>} Respuesta JSON confirmando actualización
   */
  static async updateReview(req, res) {
    try {
      const reviewId = parseInt(req.params.id);
      const { rating, comment } = req.body;
      const userId = req.user.id;
      
      // Verificar propiedad de la reseña
      const isAuthor = await ReviewModel.isReviewAuthor(reviewId, userId);
      
      if (!isAuthor) {
        logger.warn('Unauthorized review update attempt', {
          userId,
          reviewId,
          timestamp: new Date().toISOString()
        });
        return apiError(res, 403, 'No tienes autorización para actualizar esta reseña');
      }
      
      await ReviewModel.updateReview(reviewId, rating, comment?.trim() || null);
      
      logger.info('Review updated successfully', {
        reviewId,
        userId,
        updatedFields: Object.keys(req.body),
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 200, {
        success: true,
        data: null,
        message: 'Reseña actualizada exitosamente'
      });
    } catch (error) {
      logger.error('Error updating review', {
        error: error.message,
        stack: error.stack,
        reviewId: req.params.id,
        userId: req.user?.id,
        requestBody: req.body,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * Eliminar una reseña existente
   *
   * @description Elimina una reseña existente (solo el autor de la reseña o administrador)
   * @param {Request} req - Objeto de solicitud Express con id de reseña en parámetros
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Promise<Response>} Respuesta JSON confirmando eliminación
   */
  static async deleteReview(req, res) {
    try {
      const reviewId = parseInt(req.params.id);
      const { id: userId, role: userRole } = req.user;
      
      const isAuthor = await ReviewModel.isReviewAuthor(reviewId, userId);
      
      if (!isAuthor && userRole !== 'admin') {
        logger.warn('Unauthorized review deletion attempt', {
          userId,
          userRole,
          reviewId,
          timestamp: new Date().toISOString()
        });
        return apiError(res, 403, 'No tienes autorización para eliminar esta reseña');
      }
      
      await ReviewModel.deleteReview(reviewId);
      
      logger.info('Review deleted successfully', {
        reviewId,
        deletedBy: userId,
        userRole,
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 200, {
        success: true,
        data: null,
        message: 'Reseña eliminada exitosamente'
      });
    } catch (error) {
      logger.error('Error deleting review', {
        error: error.message,
        stack: error.stack,
        reviewId: req.params.id,
        userId: req.user?.id,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * Obtener reseña por ID
   *
   * @description Obtiene una reseña específica por su ID
   * @param {Request} req - Objeto de solicitud Express con id de reseña en parámetros
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Promise<Response>} Respuesta JSON con detalles de la reseña
   */
  static async getReviewById(req, res) {
    try {
      const reviewId = parseInt(req.params.id);
      const review = await ReviewModel.getReviewById(reviewId);
      
      if (!review) {
        logger.warn('Review not found', {
          reviewId,
          timestamp: new Date().toISOString()
        });
        return apiError(res, 404, 'Reseña no encontrada');
      }
      
      logger.info('Review retrieved successfully', {
        reviewId,
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 200, {
        success: true,
        data: review,
        message: 'Reseña obtenida exitosamente'
      });
    } catch (error) {
      logger.error('Error retrieving review by ID', {
        error: error.message,
        stack: error.stack,
        reviewId: req.params.id,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * Obtener reseñas del usuario
   *
   * @description Obtiene todas las reseñas escritas por el usuario autenticado
   * @param {Request} req - Objeto de solicitud Express con usuario autenticado
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Promise<Response>} Respuesta JSON con lista de reseñas del usuario
   */
  static async getUserReviews(req, res) {
    try {
      const userId = req.user.id;
      const reviews = await ReviewModel.getUserReviews(userId);
      
      logger.info('User reviews retrieved successfully', {
        userId,
        reviewsCount: reviews.length,
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 200, {
        success: true,
        count: reviews.length,
        data: reviews,
        message: 'Reseñas del usuario obtenidas exitosamente'
      });
    } catch (error) {
      logger.error('Error retrieving user reviews', {
        error: error.message,
        stack: error.stack,
        userId: req.user?.id,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * Obtener reseñas recientes de un negocio
   *
   * @description Obtiene las reseñas más recientes de un negocio específico
   * @param {Request} req - Objeto de solicitud Express con businessId en parámetros y limit en query
   * @param {Response} res - Objeto de respuesta Express
   * @returns {Promise<Response>} Respuesta JSON con lista de reseñas recientes
   */
  static async getRecentReviews(req, res) {
    try {
      const businessId = parseInt(req.params.id);
      const limit = parseInt(req.query.limit) || 5;
      
      const recentReviews = await ReviewModel.getRecentReviews(businessId, limit);
      
      logger.info('Recent business reviews retrieved successfully', {
        businessId,
        reviewsCount: recentReviews.length,
        limit,
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 200, {
        success: true,
        count: recentReviews.length,
        data: recentReviews,
        message: 'Reseñas recientes obtenidas exitosamente'
      });
    } catch (error) {
      logger.error('Error retrieving recent business reviews', {
        error: error.message,
        stack: error.stack,
        businessId: req.params.id,
        limit: req.query.limit,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }
}

module.exports = ReviewController;
