const { prisma } = require('../config/prisma');
const logger = require('../utils/logger');
const { apiResponse } = require('../utils/apiResponse');

class AnalyticsController {
  
  /**
   * Obtener analíticas del negocio
   */
  static async getBusinessAnalytics(req, res) {
    try {
      const userId = req.user.id;
      const { period = '3months' } = req.query;

      logger.info('Getting business analytics', {
        userId,
        period,
        timestamp: new Date().toISOString()
      });

      // Verificar que el usuario sea propietario de un negocio
      const business = await prisma.businesses.findFirst({
        where: { user_id: parseInt(userId) }
      });

      if (!business) {
        logger.warn('User has no business registered', { userId });
        return apiResponse(res, 404, {
          success: false,
          message: 'No tienes un negocio registrado',
          data: null
        });
      }

      const businessId = business.id;

      // Calcular fechas según el período
      const periodDates = AnalyticsController.getPeriodDates(period);

      logger.info('Calculating analytics for business', {
        businessId,
        period,
        periodDates,
        timestamp: new Date().toISOString()
      });

      // Obtener estadísticas principales en paralelo para mejor rendimiento
      const [
        totalBookings,
        totalRevenue,
        averageRating,
        totalServices,
        bookingsByMonth,
        popularServices,
        revenueByService,
        customerRetention
      ] = await Promise.all([
        AnalyticsController.getTotalBookings(businessId, periodDates),
        AnalyticsController.getTotalRevenue(businessId, periodDates),
        AnalyticsController.getAverageRating(businessId, periodDates),
        AnalyticsController.getTotalServices(businessId),
        AnalyticsController.getBookingsByMonth(businessId, periodDates),
        AnalyticsController.getPopularServices(businessId, periodDates),
        AnalyticsController.getRevenueByService(businessId, periodDates),
        AnalyticsController.getCustomerRetention(businessId, periodDates)
      ]);

      const analyticsData = {
        totalBookings,
        totalRevenue,
        averageRating,
        totalServices,
        bookingsByMonth,
        popularServices,
        revenueByService,
        customerRetention,
        period,
        businessId
      };

      logger.info('Analytics calculated successfully', {
        businessId,
        period,
        analyticsData,
        timestamp: new Date().toISOString()
      });

      return apiResponse(res, 200, {
        success: true,
        message: 'Analíticas obtenidas exitosamente',
        data: analyticsData
      });

    } catch (error) {
      logger.error('Error getting business analytics', {
        error: error.message,
        stack: error.stack,
        userId: req.user?.id,
        period: req.query?.period,
        timestamp: new Date().toISOString()
      });

      return apiResponse(res, 500, {
        success: false,
        message: 'Error interno del servidor',
        data: null
      });
    }
  }

  /**
   * Calcular fechas según el período
   */
  static getPeriodDates(period) {
    const now = new Date();
    const startDate = new Date();

    switch (period) {
      case '1month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 3);
    }

    return {
      startDate,
      endDate: now
    };
  }

  /**
   * Obtener total de reservas
   */
  static async getTotalBookings(businessId, periodDates) {
    try {
      const count = await prisma.bookings.count({
        where: {
          services: {
            business_id: businessId
          },
          booking_date: {
            gte: periodDates.startDate,
            lte: periodDates.endDate
          }
        }
      });

      return count;
    } catch (error) {
      logger.error('Error getting total bookings', { error: error.message, businessId });
      return 0;
    }
  }

  /**
   * Obtener ingresos totales
   */
  static async getTotalRevenue(businessId, periodDates) {
    try {
      const bookings = await prisma.bookings.findMany({
        where: {
          services: {
            business_id: businessId
          },
          booking_date: {
            gte: periodDates.startDate,
            lte: periodDates.endDate
          },
          status: 'confirmada'
        },
        include: {
          services: {
            select: {
              price: true
            }
          }
        }
      });

      const totalRevenue = bookings.reduce((sum, booking) => {
        return sum + (parseFloat(booking.services.price) || 0);
      }, 0);

      return totalRevenue;
    } catch (error) {
      logger.error('Error getting total revenue', { error: error.message, businessId });
      return 0;
    }
  }

  /**
   * Obtener calificación promedio
   */
  static async getAverageRating(businessId, periodDates) {
    try {
      // Obtener todas las reseñas del negocio (sin filtro de fecha para tener el promedio real)
      const reviews = await prisma.reviews.findMany({
        where: {
          business_id: businessId
        },
        select: {
          rating: true
        }
      });

      if (reviews.length === 0) {
        return 0.0;
      }

      const totalRating = reviews.reduce((sum, review) => {
        return sum + parseFloat(review.rating);
      }, 0);

      const averageRating = totalRating / reviews.length;

      logger.info('Average rating calculated', {
        businessId,
        reviewsCount: reviews.length,
        totalRating,
        averageRating: averageRating.toFixed(1)
      });

      return parseFloat(averageRating.toFixed(1));
    } catch (error) {
      logger.error('Error getting average rating', { error: error.message, businessId });
      return 0.0;
    }
  }

  /**
   * Obtener total de servicios
   */
  static async getTotalServices(businessId) {
    try {
      const count = await prisma.services.count({
        where: {
          business_id: businessId
        }
      });

      return count;
    } catch (error) {
      logger.error('Error getting total services', { error: error.message, businessId });
      return 0;
    }
  }

  /**
   * Obtener reservas por mes
   */
  static async getBookingsByMonth(businessId, periodDates) {
    try {
      const bookings = await prisma.bookings.findMany({
        where: {
          services: {
            business_id: businessId
          },
          booking_date: {
            gte: periodDates.startDate,
            lte: periodDates.endDate
          }
        },
        select: {
          booking_date: true
        }
      });

      // Agrupar por mes
      const monthlyData = {};
      bookings.forEach(booking => {
        const month = booking.booking_date.toISOString().substring(0, 7); // YYYY-MM
        monthlyData[month] = (monthlyData[month] || 0) + 1;
      });

      // Convertir nombres de mes a español
      const monthNames = {
        '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
        '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
        '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
      };

      return Object.entries(monthlyData).map(([month, count]) => ({
        month: monthNames[month.split('-')[1]] || month,
        count
      }));
    } catch (error) {
      logger.error('Error getting bookings by month', { error: error.message, businessId });
      return [];
    }
  }

  /**
   * Obtener servicios populares
   */
  static async getPopularServices(businessId, periodDates) {
    try {
      const services = await prisma.services.findMany({
        where: {
          business_id: businessId
        },
        include: {
          bookings: {
            where: {
              booking_date: {
                gte: periodDates.startDate,
                lte: periodDates.endDate
              }
            }
          }
        }
      });

      const popularServices = services.map(service => ({
        id: service.id,
        name: service.name,
        bookings: service.bookings.length,
        price: parseFloat(service.price)
      }))
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 5);

      return popularServices;
    } catch (error) {
      logger.error('Error getting popular services', { error: error.message, businessId });
      return [];
    }
  }

  /**
   * Obtener ingresos por servicio
   */
  static async getRevenueByService(businessId, periodDates) {
    try {
      const services = await prisma.services.findMany({
        where: {
          business_id: businessId
        },
        include: {
          bookings: {
            where: {
              booking_date: {
                gte: periodDates.startDate,
                lte: periodDates.endDate
              },
              status: 'confirmada'
            }
          }
        }
      });

      const revenueByService = services.map(service => ({
        id: service.id,
        name: service.name,
        revenue: service.bookings.length * parseFloat(service.price),
        bookings: service.bookings.length
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

      return revenueByService;
    } catch (error) {
      logger.error('Error getting revenue by service', { error: error.message, businessId });
      return [];
    }
  }

  /**
   * Obtener retención de clientes
   */
  static async getCustomerRetention(businessId, periodDates) {
    try {
      // Obtener clientes únicos en el período anterior
      const previousPeriodStart = new Date(periodDates.startDate);
      previousPeriodStart.setMonth(previousPeriodStart.getMonth() - 1);

      const [currentPeriodCustomers, previousPeriodCustomers] = await Promise.all([
        prisma.bookings.findMany({
          where: {
            services: {
              business_id: businessId
            },
            booking_date: {
              gte: periodDates.startDate,
              lte: periodDates.endDate
            }
          },
          select: {
            user_id: true
          },
          distinct: ['user_id']
        }),
        prisma.bookings.findMany({
          where: {
            services: {
              business_id: businessId
            },
            booking_date: {
              gte: previousPeriodStart,
              lt: periodDates.startDate
            }
          },
          select: {
            user_id: true
          },
          distinct: ['user_id']
        })
      ]);

      const currentCustomerIds = new Set(currentPeriodCustomers.map(b => b.user_id));
      const previousCustomerIds = new Set(previousPeriodCustomers.map(b => b.user_id));

      // Calcular clientes que repitieron
      const repeatingCustomers = [...currentCustomerIds].filter(id => 
        previousCustomerIds.has(id)
      );

      const retentionRate = previousCustomerIds.size > 0 
        ? Math.round((repeatingCustomers.length / previousCustomerIds.size) * 100)
        : 0;

      return retentionRate;
    } catch (error) {
      logger.error('Error getting customer retention', { error: error.message, businessId });
      return 0;
    }
  }
}

module.exports = AnalyticsController;
