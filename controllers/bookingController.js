const BookingModel = require('@models/bookingModel');
const { apiResponse, apiError } = require('@utils/apiResponse');
const logger = require('@utils/logger');
const EmployeeModel = require('@models/employeeModel');

/**
 * Booking Controller
 */
class BookingController {
  /**
   * @route GET /api/bookings/user
   * @description Obtiene todas las reservas del usuario autenticado
   * @response 200 - Lista de reservas del usuario
   * @response 401 - No autorizado
   * @response 500 - Error interno del servidor
   */
  static async getUserBookings(req, res) {
    try {
      const { id: userId } = req.user;
      
      logger.info('Getting user bookings', { userId, role: req.user.role });
      
      const bookings = await BookingModel.getUserBookings(userId);
      
      logger.info('User bookings retrieved successfully', { 
        userId, 
        count: bookings.length 
      });
      
      return apiResponse(res, 200, {
        success: true,
        count: bookings.length,
        data: bookings,
        message: 'Reservas del usuario obtenidas exitosamente'
      });
    } catch (error) {
      logger.error('Error getting user bookings', { 
        error: error.message, 
        userId: req.user?.id 
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * @route GET /api/businesses/{id}/bookings
   * @description Obtiene todas las reservas de un negocio específico (solo para propietarios)
   * @response 200 - Lista de reservas del negocio
   * @response 400 - ID de negocio inválido
   * @response 403 - No autorizado para ver las reservas de este negocio
   * @response 500 - Error interno del servidor
   */
  static async getBusinessBookings(req, res) {
    try {
      const businessId = parseInt(req.params.business_id);
      
      // Verificar si es el propietario del negocio
      const isOwner = await BookingModel.isBusinessOwner(businessId, req.user.id);
      
      if (!isOwner) {
        logger.warn('Unauthorized business bookings access attempt', {
          userId: req.user.id,
          businessId,
          timestamp: new Date().toISOString()
        });
        return apiError(res, 403, 'No tienes autorización para ver las reservas de este negocio');
      }
      
      const bookings = await BookingModel.getBusinessBookings(businessId);
      
      logger.info('Business bookings retrieved successfully', { 
        businessId, 
        count: bookings.length,
        userId: req.user.id,
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 200, {
        success: true,
        count: bookings.length,
        data: bookings,
        message: 'Reservas del negocio obtenidas exitosamente'
      });
    } catch (error) {
      logger.error('Error getting business bookings', { 
        error: error.message,
        stack: error.stack,
        businessId: req.params.business_id,
        userId: req.user?.id,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * @route POST /api/bookings
   * @description Crea una nueva reserva (solo para clientes)
   * @response 201 - Reserva creada exitosamente
   * @response 400 - Datos de entrada inválidos
   * @response 403 - Solo los clientes pueden hacer reservas
   * @response 409 - Conflicto de disponibilidad
   * @response 500 - Error interno del servidor
   */
  static async createBooking(req, res) {
    try {
      // Verificar que el usuario sea un cliente
      if (req.user.role !== 'cliente') {
        return apiError(res, 403, 'Solo los clientes pueden hacer reservas');
      }
      
      const { 
        service_id, 
        booking_date, 
        booking_time, 
        employee_id, 
        business_id, 
        notes 
      } = req.body;
      
      logger.info('Creating new booking', {
        service_id, 
        booking_date, 
        booking_time, 
        employee_id, 
        business_id, 
        user_id: req.user.id
      });
      
      // Verificar disponibilidad del empleado si se especifica
      if (employee_id) {
        const availability = await EmployeeModel.checkAvailability(
          parseInt(employee_id), 
          booking_date, 
          booking_time
        );
        
        if (!availability.available) {
          return apiError(res, 409, `No se puede hacer la reserva: ${availability.reason}`);
        }
      }
      
      const bookingData = {
        user_id: req.user.id,
        service_id: parseInt(service_id),
        booking_date,
        booking_time,
        employee_id: employee_id ? parseInt(employee_id) : null,
        business_id: parseInt(business_id),
        notes: notes?.trim() || null
      };
      
      const bookingId = await BookingModel.createBooking(
        bookingData.user_id,
        bookingData.service_id,
        bookingData.booking_date,
        bookingData.booking_time,
        bookingData.employee_id,
        bookingData.business_id,
        bookingData.notes
      );
      
      logger.info('Booking created successfully', { 
        bookingId, 
        userId: req.user.id 
      });
      
      return apiResponse(res, 201, {
        success: true,
        data: { booking_id: bookingId },
        message: 'Reserva confirmada exitosamente'
      });
    } catch (error) {
      logger.error('Error creating booking', { 
        error: error.message, 
        userId: req.user?.id 
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * @route PUT /api/bookings/{id}/status
   * @description Actualiza el estado de una reserva (clientes pueden cancelar, negocios pueden confirmar/cancelar)
   * @response 200 - Estado de reserva actualizado exitosamente
   * @response 400 - ID de reserva inválido o estado inválido
   * @response 403 - No autorizado para modificar esta reserva
   * @response 404 - Reserva no encontrada
   * @response 500 - Error interno del servidor
   */
  static async updateBookingStatus(req, res) {
    try {
      const bookingId = parseInt(req.params.id);
      const { status } = req.body;
      
      const booking = await BookingModel.getBookingById(bookingId);
      
      if (!booking) {
        return apiError(res, 404, 'Reserva no encontrada');
      }
      
      // Verificar permisos según el rol del usuario
      if (req.user.role === 'cliente') {
        // El cliente solo puede cancelar sus propias reservas
        if (booking.user_id !== req.user.id) {
          return apiError(res, 403, 'No tienes autorización para modificar esta reserva');
        }
        
        if (status !== 'cancelada') {
          return apiError(res, 403, 'Los clientes solo pueden cancelar reservas');
        }
      } else if (req.user.role === 'negocio') {
        // El negocio puede confirmar/cancelar reservas de sus servicios
        const isServiceOwned = await BookingModel.isServiceOwnedByUser(booking.service_id, req.user.id);
        
        if (!isServiceOwned) {
          return apiError(res, 403, 'No tienes autorización para modificar esta reserva');
        }
      } else {
        return apiError(res, 403, 'Rol no autorizado para esta operación');
      }
      
      await BookingModel.updateBookingStatus(bookingId, status);
      
      logger.info('Booking status updated successfully', { 
        bookingId, 
        status, 
        updatedBy: req.user.id 
      });
      
      return apiResponse(res, 200, {
        success: true,
        data: null,
        message: 'Estado de reserva actualizado exitosamente'
      });
    } catch (error) {
      logger.error('Error updating booking status', { 
        error: error.message, 
        bookingId: req.params.id 
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * @route GET /api/bookings/{id}
   * @description Obtiene una reserva específica por ID (solo propietario de la reserva o dueño del negocio)
   * @response 200 - Reserva obtenida exitosamente
   * @response 400 - ID de reserva inválido
   * @response 403 - No autorizado para ver esta reserva
   * @response 404 - Reserva no encontrada
   * @response 500 - Error interno del servidor
   */
  static async getBookingById(req, res) {
    try {
      const bookingId = parseInt(req.params.id);
      
      const booking = await BookingModel.getBookingById(bookingId);
      
      if (!booking) {
        return apiError(res, 404, 'Reserva no encontrada');
      }

      // Verificar permisos: solo el cliente que hizo la reserva o el dueño del negocio
      let hasPermission = false;
      
      if (req.user.role === 'cliente' && booking.user_id === req.user.id) {
        hasPermission = true;
      } else if (req.user.role === 'negocio') {
        const isServiceOwned = await BookingModel.isServiceOwnedByUser(booking.service_id, req.user.id);
        hasPermission = isServiceOwned;
      }

      if (!hasPermission) {
        return apiError(res, 403, 'No tienes autorización para ver esta reserva');
      }

      logger.info('Booking retrieved successfully', { 
        bookingId, 
        userId: req.user.id 
      });

      return apiResponse(res, 200, {
        success: true,
        data: booking,
        message: 'Reserva obtenida exitosamente'
      });
    } catch (error) {
      logger.error('Error getting booking by ID', { 
        error: error.message, 
        bookingId: req.params.id 
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }
}

module.exports = BookingController;