const { prisma } = require('../config/prisma');
const logger = require('../utils/logger');

class BookingModel {
  // Obtener reservas de un usuario
  static async getUserBookings(userId) {
    logger.debug('BookingModel.getUserBookings - Buscando reservas para userId:', userId);
    
    const bookings = await prisma.bookings.findMany({
      where: {
        user_id: userId
      },
      include: {
        services: {
          select: {
            name: true,
            price: true,
            duration_minutes: true
          }
        },
        businesses: {
          select: {
            name: true
          }
        },
        employees: {
          select: {
            name: true
          }
        }
      },
      orderBy: [
        { booking_date: 'asc' },
        { booking_time: 'asc' }
      ]
    });
    
    logger.debug('Resultados encontrados:', bookings.length);
    if (bookings.length > 0) {
      logger.debug('Primera reserva encontrada:', JSON.stringify(bookings[0], null, 2));
    }
    
    return bookings;
  }
  
  // Verificar si un usuario es propietario de un negocio
  static async isBusinessOwner(businessId, userId) {
    const business = await prisma.businesses.findFirst({
      where: {
        id: businessId,
        user_id: userId
      }
    });
    
    return business !== null;
  }
  
  // Obtener reservas de un negocio
  static async getBusinessBookings(businessId) {
    const bookings = await prisma.bookings.findMany({
      where: {
        services: {
          business_id: businessId
        }
      },
      include: {
        services: {
          select: {
            name: true,
            price: true,
            duration_minutes: true
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
        { booking_date: 'asc' },
        { booking_time: 'asc' }
      ]
    });
    
    return bookings;
  }
  
  static async createBooking(userId, serviceId, bookingDate, bookingTime, employeeId = null, businessId = null, notes = null) {
    const timeDateTime = new Date(`1970-01-01T${bookingTime}:00.000Z`);
    
    const booking = await prisma.bookings.create({
      data: {
        user_id: userId,
        service_id: serviceId,
        booking_date: new Date(bookingDate),
        booking_time: timeDateTime,
        employee_id: employeeId,
        business_id: businessId,
        notes: notes,
        status: 'confirmada'
      }
    });
    
    return booking.id;
  }
  
  // Obtener una reserva por ID
  static async getBookingById(bookingId) {
    return await prisma.bookings.findUnique({
      where: { id: bookingId }
    });
  }
  
  // Verificar si un servicio pertenece a un negocio del usuario
  static async isServiceOwnedByUser(serviceId, userId) {
    const service = await prisma.services.findFirst({
      where: {
        id: serviceId,
        businesses: {
          user_id: userId
        }
      }
    });
    
    return service !== null;
  }
  
  // Actualizar el estado de una reserva
  static async updateBookingStatus(bookingId, status) {
    await prisma.bookings.update({
      where: { id: bookingId },
      data: { status: status }
    });
    return true;
  }
}

module.exports = BookingModel;