const ReviewController = require('@controllers/reviewController');
const ReviewModel = require('@models/reviewModel');
const { apiResponse, apiError } = require('@utils/apiResponse');
const logger = require('@utils/logger');

// Mock dependencies
jest.mock('@models/reviewModel');
jest.mock('@utils/apiResponse');
jest.mock('@utils/logger');

describe('ReviewController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      user: { id: 1, role: 'client' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    // Reset all mocks
    jest.clearAllMocks();
    
    // Mock logger methods
    logger.info = jest.fn();
    logger.warn = jest.fn();
    logger.error = jest.fn();
    
    // Mock apiResponse and apiError to return the response object
    apiResponse.mockImplementation((res, status, data) => res);
    apiError.mockImplementation((res, status, message, error) => res);
  });

  describe('getBusinessReviews', () => {
    it('should get business reviews successfully', async () => {
      const businessId = 1;
      const mockReviews = [
        {
          id: 1,
          user_id: 1,
          business_id: 1,
          rating: 5,
          comment: 'Great service!',
          user_name: 'John Doe',
          created_at: '2023-01-01T00:00:00Z'
        },
        {
          id: 2,
          user_id: 2,
          business_id: 1,
          rating: 4,
          comment: 'Good service',
          user_name: 'Jane Smith',
          created_at: '2023-01-02T00:00:00Z'
        }
      ];

      req.params.id = businessId.toString();
      ReviewModel.getBusinessReviews.mockResolvedValue(mockReviews);

      await ReviewController.getBusinessReviews(req, res);

      expect(ReviewModel.getBusinessReviews).toHaveBeenCalledWith(businessId);
      expect(logger.info).toHaveBeenCalledWith(
        'Business reviews retrieved successfully',
        expect.objectContaining({
          businessId,
          reviewsCount: mockReviews.length,
          timestamp: expect.any(String)
        })
      );
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        count: mockReviews.length,
        data: mockReviews,
        message: 'Reseñas del negocio obtenidas exitosamente'
      });
    });

    it('should handle errors when getting business reviews', async () => {
      const businessId = 1;
      const error = new Error('Database error');

      req.params.id = businessId.toString();
      ReviewModel.getBusinessReviews.mockRejectedValue(error);

      await ReviewController.getBusinessReviews(req, res);

      expect(logger.error).toHaveBeenCalledWith(
        'Error retrieving business reviews',
        expect.objectContaining({
          error: error.message,
          stack: error.stack,
          businessId: businessId.toString(),
          timestamp: expect.any(String)
        })
      );
      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });

  describe('createReview', () => {
    it('should create a review successfully', async () => {
      const reviewData = {
        business_id: 1,
        rating: 5,
        comment: 'Excellent service!'
      };
      const reviewId = 1;

      req.body = reviewData;
      ReviewModel.userHasReviewed.mockResolvedValue(false);
      ReviewModel.createReview.mockResolvedValue(reviewId);

      await ReviewController.createReview(req, res);

      expect(ReviewModel.userHasReviewed).toHaveBeenCalledWith(req.user.id, reviewData.business_id);
      expect(ReviewModel.createReview).toHaveBeenCalledWith(
        req.user.id,
        reviewData.business_id,
        reviewData.rating,
        reviewData.comment
      );
      expect(logger.info).toHaveBeenCalledWith(
        'Review created successfully',
        expect.objectContaining({
          reviewId,
          userId: req.user.id,
          businessId: reviewData.business_id,
          rating: reviewData.rating,
          timestamp: expect.any(String)
        })
      );
      expect(apiResponse).toHaveBeenCalledWith(res, 201, {
        success: true,
        data: { reviewId },
        message: 'Reseña creada exitosamente'
      });
    });

    it('should not create duplicate review for same business', async () => {
      const reviewData = {
        business_id: 1,
        rating: 5,
        comment: 'Excellent service!'
      };

      req.body = reviewData;
      ReviewModel.userHasReviewed.mockResolvedValue(true);

      await ReviewController.createReview(req, res);

      expect(ReviewModel.userHasReviewed).toHaveBeenCalledWith(req.user.id, reviewData.business_id);
      expect(ReviewModel.createReview).not.toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith(
        'User attempted to create duplicate review',
        expect.objectContaining({
          userId: req.user.id,
          businessId: reviewData.business_id,
          timestamp: expect.any(String)
        })
      );
      expect(apiError).toHaveBeenCalledWith(
        res,
        409,
        'Ya has dejado una reseña para este negocio. Puedes actualizarla en lugar de crear una nueva'
      );
    });

    it('should handle empty comment when creating review', async () => {
      const reviewData = {
        business_id: 1,
        rating: 5,
        comment: '   '  // whitespace only
      };
      const reviewId = 1;

      req.body = reviewData;
      ReviewModel.userHasReviewed.mockResolvedValue(false);
      ReviewModel.createReview.mockResolvedValue(reviewId);

      await ReviewController.createReview(req, res);

      expect(ReviewModel.createReview).toHaveBeenCalledWith(
        req.user.id,
        reviewData.business_id,
        reviewData.rating,
        null  // trimmed empty comment becomes null
      );
    });

    it('should handle errors when creating review', async () => {
      const reviewData = {
        business_id: 1,
        rating: 5,
        comment: 'Great service!'
      };
      const error = new Error('Database error');

      req.body = reviewData;
      ReviewModel.userHasReviewed.mockRejectedValue(error);

      await ReviewController.createReview(req, res);

      expect(logger.error).toHaveBeenCalledWith(
        'Error creating review',
        expect.objectContaining({
          error: error.message,
          stack: error.stack,
          userId: req.user.id,
          requestBody: reviewData,
          timestamp: expect.any(String)
        })
      );
      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });

  describe('updateReview', () => {
    it('should update review successfully', async () => {
      const reviewId = 1;
      const updateData = {
        rating: 4,
        comment: 'Good service, updated review'
      };

      req.params.id = reviewId.toString();
      req.body = updateData;
      ReviewModel.isReviewAuthor.mockResolvedValue(true);
      ReviewModel.updateReview.mockResolvedValue(true);

      await ReviewController.updateReview(req, res);

      expect(ReviewModel.isReviewAuthor).toHaveBeenCalledWith(reviewId, req.user.id);
      expect(ReviewModel.updateReview).toHaveBeenCalledWith(
        reviewId,
        updateData.rating,
        updateData.comment
      );
      expect(logger.info).toHaveBeenCalledWith(
        'Review updated successfully',
        expect.objectContaining({
          reviewId,
          userId: req.user.id,
          updatedFields: Object.keys(updateData),
          timestamp: expect.any(String)
        })
      );
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: null,
        message: 'Reseña actualizada exitosamente'
      });
    });

    it('should not update review if user is not the author', async () => {
      const reviewId = 1;
      const updateData = {
        rating: 4,
        comment: 'Updated review'
      };

      req.params.id = reviewId.toString();
      req.body = updateData;
      ReviewModel.isReviewAuthor.mockResolvedValue(false);

      await ReviewController.updateReview(req, res);

      expect(ReviewModel.isReviewAuthor).toHaveBeenCalledWith(reviewId, req.user.id);
      expect(ReviewModel.updateReview).not.toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith(
        'Unauthorized review update attempt',
        expect.objectContaining({
          userId: req.user.id,
          reviewId,
          timestamp: expect.any(String)
        })
      );
      expect(apiError).toHaveBeenCalledWith(
        res,
        403,
        'No tienes autorización para actualizar esta reseña'
      );
    });

    it('should handle empty comment when updating review', async () => {
      const reviewId = 1;
      const updateData = {
        rating: 4,
        comment: '   '  // whitespace only
      };

      req.params.id = reviewId.toString();
      req.body = updateData;
      ReviewModel.isReviewAuthor.mockResolvedValue(true);
      ReviewModel.updateReview.mockResolvedValue(true);

      await ReviewController.updateReview(req, res);

      expect(ReviewModel.updateReview).toHaveBeenCalledWith(
        reviewId,
        updateData.rating,
        null  // trimmed empty comment becomes null
      );
    });

    it('should handle errors when updating review', async () => {
      const reviewId = 1;
      const updateData = {
        rating: 4,
        comment: 'Updated review'
      };
      const error = new Error('Database error');

      req.params.id = reviewId.toString();
      req.body = updateData;
      ReviewModel.isReviewAuthor.mockRejectedValue(error);

      await ReviewController.updateReview(req, res);

      expect(logger.error).toHaveBeenCalledWith(
        'Error updating review',
        expect.objectContaining({
          error: error.message,
          stack: error.stack,
          reviewId: reviewId.toString(),
          userId: req.user.id,
          requestBody: updateData,
          timestamp: expect.any(String)
        })
      );
      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });

  describe('deleteReview', () => {
    it('should delete review successfully as author', async () => {
      const reviewId = 1;

      req.params.id = reviewId.toString();
      ReviewModel.isReviewAuthor.mockResolvedValue(true);
      ReviewModel.deleteReview.mockResolvedValue(true);

      await ReviewController.deleteReview(req, res);

      expect(ReviewModel.isReviewAuthor).toHaveBeenCalledWith(reviewId, req.user.id);
      expect(ReviewModel.deleteReview).toHaveBeenCalledWith(reviewId);
      expect(logger.info).toHaveBeenCalledWith(
        'Review deleted successfully',
        expect.objectContaining({
          reviewId,
          deletedBy: req.user.id,
          userRole: req.user.role,
          timestamp: expect.any(String)
        })
      );
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: null,
        message: 'Reseña eliminada exitosamente'
      });
    });

    it('should delete review successfully as admin', async () => {
      const reviewId = 1;

      req.params.id = reviewId.toString();
      req.user.role = 'admin';
      ReviewModel.isReviewAuthor.mockResolvedValue(false);
      ReviewModel.deleteReview.mockResolvedValue(true);

      await ReviewController.deleteReview(req, res);

      expect(ReviewModel.isReviewAuthor).toHaveBeenCalledWith(reviewId, req.user.id);
      expect(ReviewModel.deleteReview).toHaveBeenCalledWith(reviewId);
      expect(logger.info).toHaveBeenCalledWith(
        'Review deleted successfully',
        expect.objectContaining({
          reviewId,
          deletedBy: req.user.id,
          userRole: 'admin',
          timestamp: expect.any(String)
        })
      );
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: null,
        message: 'Reseña eliminada exitosamente'
      });
    });

    it('should not delete review if user is not author and not admin', async () => {
      const reviewId = 1;

      req.params.id = reviewId.toString();
      ReviewModel.isReviewAuthor.mockResolvedValue(false);

      await ReviewController.deleteReview(req, res);

      expect(ReviewModel.isReviewAuthor).toHaveBeenCalledWith(reviewId, req.user.id);
      expect(ReviewModel.deleteReview).not.toHaveBeenCalled();
      expect(logger.warn).toHaveBeenCalledWith(
        'Unauthorized review deletion attempt',
        expect.objectContaining({
          userId: req.user.id,
          userRole: req.user.role,
          reviewId,
          timestamp: expect.any(String)
        })
      );
      expect(apiError).toHaveBeenCalledWith(
        res,
        403,
        'No tienes autorización para eliminar esta reseña'
      );
    });

    it('should handle errors when deleting review', async () => {
      const reviewId = 1;
      const error = new Error('Database error');

      req.params.id = reviewId.toString();
      ReviewModel.isReviewAuthor.mockRejectedValue(error);

      await ReviewController.deleteReview(req, res);

      expect(logger.error).toHaveBeenCalledWith(
        'Error deleting review',
        expect.objectContaining({
          error: error.message,
          stack: error.stack,
          reviewId: reviewId.toString(),
          userId: req.user.id,
          timestamp: expect.any(String)
        })
      );
      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });

  describe('getReviewById', () => {
    it('should get review by ID successfully', async () => {
      const reviewId = 1;
      const mockReview = {
        id: 1,
        user_id: 1,
        business_id: 1,
        rating: 5,
        comment: 'Great service!',
        user_name: 'John Doe',
        created_at: '2023-01-01T00:00:00Z'
      };

      req.params.id = reviewId.toString();
      ReviewModel.getReviewById.mockResolvedValue(mockReview);

      await ReviewController.getReviewById(req, res);

      expect(ReviewModel.getReviewById).toHaveBeenCalledWith(reviewId);
      expect(logger.info).toHaveBeenCalledWith(
        'Review retrieved successfully',
        expect.objectContaining({
          reviewId,
          timestamp: expect.any(String)
        })
      );
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: mockReview,
        message: 'Reseña obtenida exitosamente'
      });
    });

    it('should return 404 if review not found', async () => {
      const reviewId = 999;

      req.params.id = reviewId.toString();
      ReviewModel.getReviewById.mockResolvedValue(null);

      await ReviewController.getReviewById(req, res);

      expect(ReviewModel.getReviewById).toHaveBeenCalledWith(reviewId);
      expect(logger.warn).toHaveBeenCalledWith(
        'Review not found',
        expect.objectContaining({
          reviewId,
          timestamp: expect.any(String)
        })
      );
      expect(apiError).toHaveBeenCalledWith(res, 404, 'Reseña no encontrada');
    });

    it('should handle errors when getting review by ID', async () => {
      const reviewId = 1;
      const error = new Error('Database error');

      req.params.id = reviewId.toString();
      ReviewModel.getReviewById.mockRejectedValue(error);

      await ReviewController.getReviewById(req, res);

      expect(logger.error).toHaveBeenCalledWith(
        'Error retrieving review by ID',
        expect.objectContaining({
          error: error.message,
          stack: error.stack,
          reviewId: reviewId.toString(),
          timestamp: expect.any(String)
        })
      );
      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });
});
