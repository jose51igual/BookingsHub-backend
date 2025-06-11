const { prisma } = require('../config/prisma');

class ReviewModel {
  // Obtener todas las reseñas de un negocio
  static async getBusinessReviews(businessId) {
    const reviews = await prisma.reviews.findMany({
      where: { business_id: parseInt(businessId) },
      include: {
        users: {
          select: {
            name: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });
    
    return reviews.map(review => ({
      ...review,
      user_name: review.users.name
    }));
  }
  
  // Obtener una reseña por ID
  static async getReviewById(id) {
    const review = await prisma.reviews.findUnique({
      where: { id: parseInt(id) },
      include: {
        users: {
          select: {
            name: true
          }
        }
      }
    });
    
    if (!review) return null;
    
    return {
      ...review,
      user_name: review.users.name
    };
  }
  
  // Crear una nueva reseña
  static async createReview(userId, businessId, rating, comment) {
    const review = await prisma.reviews.create({
      data: {
        user_id: parseInt(userId),
        business_id: parseInt(businessId),
        rating: parseInt(rating),
        comment
      }
    });
    return review.id;
  }
  
  // Verificar si un usuario ya ha dejado una reseña para un negocio
  static async userHasReviewed(userId, businessId) {
    const review = await prisma.reviews.findFirst({
      where: {
        user_id: parseInt(userId),
        business_id: parseInt(businessId)
      }
    });
    return review !== null;
  }
  
  // Actualizar una reseña
  static async updateReview(reviewId, rating, comment) {
    await prisma.reviews.update({
      where: { id: parseInt(reviewId) },
      data: {
        rating: parseInt(rating),
        comment
      }
    });
    return true;
  }
  
  // Eliminar una reseña
  static async deleteReview(reviewId) {
    await prisma.reviews.delete({
      where: { id: parseInt(reviewId) }
    });
    return true;
  }
  
  // Verificar si el usuario es el autor de una reseña
  static async isReviewAuthor(reviewId, userId) {
    const review = await prisma.reviews.findFirst({
      where: {
        id: parseInt(reviewId),
        user_id: parseInt(userId)
      }
    });
    return review !== null;
  }

  // Obtener reseñas recientes de un negocio
  static async getRecentReviews(businessId, limit = 5) {
    const reviews = await prisma.reviews.findMany({
      where: { business_id: parseInt(businessId) },
      include: {
        users: {
          select: {
            name: true
          }
        }
      },
      orderBy: { created_at: 'desc' },
      take: parseInt(limit)
    });
    
    return reviews.map(review => ({
      ...review,
      user_name: review.users.name
    }));
  }
}

module.exports = ReviewModel;
