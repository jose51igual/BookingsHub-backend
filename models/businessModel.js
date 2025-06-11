const { prisma } = require('../config/prisma');
const logger = require('../utils/logger');

class BusinessModel {
  // Obtener todos los negocios con datos adicionales para la UI
  static async getAllBusinesses() {
    const businesses = await prisma.businesses.findMany({
      include: {
        reviews: {
          select: {
            rating: true
          }
        }
      }
    });
    
    // Calcular rating promedio y count de reviews
    return businesses.map(business => ({
      ...business,
      rating: business.reviews.length > 0 
        ? Math.round((business.reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0) / business.reviews.length) * 10) / 10
        : 0,
      reviewCount: business.reviews.length
    }));
  }
  
  // Obtener un negocio por ID con datos adicionales para la UI
  static async getBusinessById(id) {
    const business = await prisma.businesses.findUnique({
      where: { id: parseInt(id) },
      include: {
        reviews: {
          select: {
            rating: true
          }
        }
      }
    });
    
    if (!business) return null;
    
    return {
      ...business,
      rating: business.reviews.length > 0 
        ? Math.round((business.reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0) / business.reviews.length) * 10) / 10
        : 0,
      reviewCount: business.reviews.length
    };
  }
  
  // Obtener un negocio por ID de usuario
  static async getBusinessByUserId(userId) {
    const business = await prisma.businesses.findFirst({
      where: { user_id: parseInt(userId) },
      include: {
        reviews: {
          select: {
            rating: true
          }
        }
      }
    });
    
    if (!business) return null;
    
    return {
      ...business,
      rating: business.reviews.length > 0 
        ? Math.round((business.reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0) / business.reviews.length) * 10) / 10
        : 0,
      reviewCount: business.reviews.length
    };
  }
  
  // Verificar si un usuario ya tiene un negocio
  static async userHasBusiness(userId) {
    const business = await prisma.businesses.findFirst({
      where: { user_id: parseInt(userId) }
    });
    return business !== null;
  }
  
  // Obtener negocios destacados
  static async getFeaturedBusinesses(limit = 5) {
    const businesses = await prisma.businesses.findMany({
      include: {
        reviews: {
          select: {
            rating: true
          }
        }
      },
      take: limit
    });
    
    // Calcular rating y ordenar por mejor rating
    const businessesWithRating = businesses.map(business => ({
      ...business,
      rating: business.reviews.length > 0 
        ? Math.round((business.reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0) / business.reviews.length) * 10) / 10
        : 0,
      reviewCount: business.reviews.length
    }));
    
    return businessesWithRating.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });
  }
  
  // Buscar negocios por término
  static async searchBusinesses(term) {
    const businesses = await prisma.businesses.findMany({
      where: {
        OR: [
          { name: { contains: term } },
          { description: { contains: term } },
          { address: { contains: term } },
          { category: { contains: term } }
        ]
      },
      include: {
        reviews: {
          select: {
            rating: true
          }
        }
      }
    });
    
    return businesses.map(business => ({
      ...business,
      rating: business.reviews.length > 0 
        ? business.reviews.reduce((sum, review) => sum + review.rating, 0) / business.reviews.length 
        : 0,
      reviewCount: business.reviews.length
    }));
  }
  
  // Obtener negocios por categoría
  static async getBusinessesByCategory(category) {
    const businesses = await prisma.businesses.findMany({
      where: { category },
      include: {
        reviews: {
          select: {
            rating: true
          }
        }
      }
    });
    
    return businesses.map(business => ({
      ...business,
      rating: business.reviews.length > 0 
        ? business.reviews.reduce((sum, review) => sum + review.rating, 0) / business.reviews.length 
        : 0,
      reviewCount: business.reviews.length
    }));
  }

  // Crear un nuevo negocio
  static async createBusiness(userId, businessData) {
    const { 
      name, 
      description, 
      phone, 
      address, 
      category,
      image,
      email
    } = businessData;
    
    const business = await prisma.businesses.create({
      data: {
        user_id: parseInt(userId),
        name,
        description,
        phone,
        address,
        email: email || '', // Email es requerido en el esquema
        category: category || null,
        image: image || null
      }
    });
    
    return business;
  }
  
  // Verificar si el usuario es el propietario del negocio
  static async isBusinessOwner(businessId, userId) {
    const business = await prisma.businesses.findFirst({
      where: {
        id: parseInt(businessId),
        user_id: parseInt(userId)
      }
    });
    return business !== null;
  }
  
  // Actualizar un negocio
  static async updateBusiness(businessId, businessData) {
    const { 
      name, 
      description, 
      phone, 
      address, 
      category, 
      image
    } = businessData;
    
    await prisma.businesses.update({
      where: { id: parseInt(businessId) },
      data: {
        name,
        description,
        phone,
        address,
        category,
        image
      }
    });
    
    return true;
  }

  // Obtener las reservas más recientes de un negocio (sin filtro por mes)
  static async getRecentBookings(businessId, limit = 5) {
    logger.info('Obteniendo reservas recientes para el negocio:', { businessId, limit });
    
    const bookings = await prisma.bookings.findMany({
      where: {
        services: {
          business_id: parseInt(businessId)
        }
      },
      include: {
        services: {
          select: {
            name: true
          }
        },
        users: {
          select: {
            name: true,
            email: true
          }
        },
        employees: {
          select: {
            name: true
          }
        }
      },
      orderBy: [
        { booking_date: 'desc' },
        { booking_time: 'desc' }
      ],
      take: parseInt(limit)
    });

    logger.info('Reservas encontradas:', {
      count: bookings.length,
      reservas: bookings.map(b => ({
        id: b.id,
        fecha: b.booking_date,
        hora: b.booking_time,
        cliente: b.users?.name,
        servicio: b.services?.name
      }))
    });

    // Mapear los datos para que coincidan con el formato esperado
    return bookings.map(booking => ({
      id: booking.id,
      customer_name: booking.users.name,
      customer_email: booking.users.email,
      service_name: booking.services.name,
      employee_name: booking.employees?.name || null,
      booking_date: booking.booking_date,
      booking_time: booking.booking_time,
      status: booking.status,
      notes: booking.notes,
      created_at: booking.created_at
    }));
  }
}

module.exports = BusinessModel;