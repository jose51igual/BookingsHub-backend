const ServiceModel = require('@models/serviceModel');
const { apiResponse, apiError } = require('@utils/apiResponse');
const logger = require('@utils/logger');

/**
 * Service Controller
 * Handles all service-related operations with professional standards
 * All validation is handled by Joi middleware in routes
 * All responses use standardized apiResponse/apiError format
 */
class ServiceController {
  /**
   * Get all services for a specific business
   * @description Retrieves all services offered by a business
   * @param {Request} req - Express request object with businessId or id in params
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} JSON response with services list
   */
  static async getBusinessServices(req, res) {
    try {
      // Handle both businessId (from /services/business/:businessId) and id (from /businesses/:id/services)
      const businessId = parseInt(req.params.businessId || req.params.id);
      
      logger.info('Getting business services', {
        businessId,
        params: req.params,
        rawBusinessId: req.params.businessId || req.params.id
      });
      
      const services = await ServiceModel.getBusinessServices(businessId);
      
      logger.info('Business services retrieved successfully', {
        businessId,
        count: services.length,
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 200, {
        success: true,
        count: services.length,
        data: services,
        message: 'Servicios obtenidos exitosamente'
      });
    } catch (error) {
      logger.error('Error retrieving business services', {
        error: error.message,
        stack: error.stack,
        businessId: req.params.businessId,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * Get service by ID
   * @description Retrieves a specific service by its ID
   * @param {Request} req - Express request object with service id in params
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} JSON response with service details
   */
  static async getServiceById(req, res) {
    try {
      const serviceId = parseInt(req.params.id);
      const service = await ServiceModel.getServiceById(serviceId);
      
      if (!service) {
        logger.warn('Service not found', { 
          serviceId,
          timestamp: new Date().toISOString()
        });
        return apiError(res, 404, 'Servicio no encontrado');
      }
      
      logger.info('Service retrieved successfully', { 
        serviceId,
        serviceName: service.name,
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 200, {
        success: true,
        data: service,
        message: 'Servicio obtenido exitosamente'
      });
    } catch (error) {
      logger.error('Error retrieving service by ID', {
        error: error.message,
        stack: error.stack,
        serviceId: req.params.id,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * Create a new service
   * @description Creates a new service for a business (business owners only)
   * @param {Request} req - Express request object with service data in body
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} JSON response with created service ID
   */
  static async createService(req, res) {
    try {
      const { business_id, name, description, duration, price, category } = req.body;
      
      // Verificar propiedad del negocio
      const isOwner = await ServiceModel.isBusinessOwner(business_id, req.user.id);
      
      if (!isOwner) {
        logger.warn('Unauthorized service creation attempt', {
          userId: req.user.id,
          businessId: business_id,
          timestamp: new Date().toISOString()
        });
        return apiError(res, 403, 'No tienes autorización para añadir servicios a este negocio');
      }
      
      // Crear servicio
      const serviceId = await ServiceModel.createService(
        business_id,
        name.trim(),
        description?.trim() || '',
        duration,
        price,
        category?.trim() || ''
      );
      
      logger.info('Service created successfully', {
        serviceId,
        businessId: business_id,
        serviceName: name,
        createdBy: req.user.id,
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 201, {
        success: true,
        data: { serviceId },
        message: 'Servicio creado exitosamente'
      });
    } catch (error) {
      logger.error('Error creating service', {
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
   * Update an existing service
   * @description Updates an existing service (business owners only)
   * @param {Request} req - Express request object with service id in params and update data in body
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} JSON response confirming update
   */
  static async updateService(req, res) {
    try {
      const serviceId = parseInt(req.params.id);
      const { name, description, duration, price, category } = req.body;
      
      // Verificar propiedad del servicio
      const isOwner = await ServiceModel.isServiceOwner(serviceId, req.user.id);
      
      if (!isOwner) {
        logger.warn('Unauthorized service update attempt', {
          userId: req.user.id,
          serviceId,
          timestamp: new Date().toISOString()
        });
        return apiError(res, 403, 'No tienes autorización para modificar este servicio');
      }
      
      // Actualizar servicio
      await ServiceModel.updateService(
        serviceId, 
        name?.trim(), 
        description?.trim() || '', 
        duration, 
        price, 
        category?.trim() || ''
      );
      
      logger.info('Service updated successfully', {
        serviceId,
        updatedBy: req.user.id,
        updatedFields: Object.keys(req.body),
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 200, {
        success: true,
        data: null,
        message: 'Servicio actualizado exitosamente'
      });
    } catch (error) {
      logger.error('Error updating service', {
        error: error.message,
        stack: error.stack,
        serviceId: req.params.id,
        userId: req.user?.id,
        requestBody: req.body,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * Delete an existing service
   * @description Deletes an existing service (business owners only)
   * @param {Request} req - Express request object with service id in params
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} JSON response confirming deletion
   */
  static async deleteService(req, res) {
    try {
      const serviceId = parseInt(req.params.id);
      
      // Verificar propiedad del servicio
      const isOwner = await ServiceModel.isServiceOwner(serviceId, req.user.id);
      
      if (!isOwner) {
        logger.warn('Unauthorized service deletion attempt', {
          userId: req.user.id,
          serviceId,
          timestamp: new Date().toISOString()
        });
        return apiError(res, 403, 'No tienes autorización para eliminar este servicio');
      }
      
      // Eliminar servicio
      await ServiceModel.deleteService(serviceId);
      
      logger.info('Service deleted successfully', {
        serviceId,
        deletedBy: req.user.id,
        timestamp: new Date().toISOString()
      });
      
      return apiResponse(res, 200, {
        success: true,
        data: null,
        message: 'Servicio eliminado exitosamente'
      });
    } catch (error) {
      logger.error('Error deleting service', {
        error: error.message,
        stack: error.stack,
        serviceId: req.params.id,
        userId: req.user?.id,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * Get service availability for a specific month
   * @description Calculates service availability based on existing bookings
   * @param {Request} req - Express request object with serviceId, year, month, and optional employeeId
   * @param {Response} res - Express response object
   * @returns {Promise<Response>} JSON response with availability data
   */
  static async getServiceAvailability(req, res) {
    try {
      const serviceId = parseInt(req.params.serviceId);
      const year = parseInt(req.query.year);
      const month = parseInt(req.query.month);
      const employeeId = req.query.employeeId ? parseInt(req.query.employeeId) : null;

      logger.info('Getting service availability', {
        serviceId,
        year,
        month,
        employeeId,
        timestamp: new Date().toISOString()
      });

      // Verificar que el servicio existe
      const service = await ServiceModel.getServiceById(serviceId);
      if (!service) {
        return apiError(res, 404, 'Servicio no encontrado');
      }

      // Calcular el primer y último día del mes
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      
      // Obtener todas las reservas del servicio para ese mes (solo las no canceladas)
      const { prisma } = require('@config/prisma');
      
      const existingBookings = await prisma.bookings.findMany({
        where: {
          service_id: serviceId,
          booking_date: {
            gte: startDate,
            lte: endDate
          },
          status: { not: 'cancelada' },
          ...(employeeId && { employee_id: employeeId })
        },
        select: {
          booking_date: true,
          booking_time: true,
          services: {
            select: {
              duration_minutes: true
            }
          }
        }
      });

      logger.info('Existing bookings found', {
        serviceId,
        year,
        month,
        employeeId,
        bookingsCount: existingBookings.length,
        bookings: existingBookings.map(b => ({
          date: b.booking_date.toISOString().split('T')[0],
          time: b.booking_time.toISOString().substr(11, 5),
          duration: b.services.duration_minutes
        }))
      });

      // Generar disponibilidad para cada día del mes
      const availability = [];
      const currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayOfWeek = currentDate.getDay(); // 0 = domingo, 1 = lunes, etc.
        
        // Skip domingos (puedes modificar esto según las reglas de negocio)
        if (dayOfWeek === 0) {
          availability.push({
            date: dateStr,
            available: false,
            availableSlots: []
          });
          currentDate.setDate(currentDate.getDate() + 1);
          continue;
        }

        // Generar slots de tiempo de 09:00 a 21:00 cada 30 minutos
        const timeSlots = [];
        for (let hour = 9; hour < 21; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            timeSlots.push(timeSlot);
          }
        }

        // Filtrar slots ocupados por reservas existentes
        const occupiedSlots = new Set();
        const dayBookings = existingBookings.filter(booking => {
          const bookingDate = new Date(booking.booking_date);
          return bookingDate.toISOString().split('T')[0] === dateStr;
        });

        // Log para el día específico que estamos probando
        if (dateStr === '2025-06-10') {
          logger.info('Processing day 2025-06-10', {
            serviceId,
            totalBookings: existingBookings.length,
            dayBookings: dayBookings.length,
            dayBookingsDetails: dayBookings.map(b => ({
              time: b.booking_time.toISOString().substr(11, 5),
              duration: b.services.duration_minutes
            }))
          });
        }

        dayBookings.forEach(booking => {
          const bookingTime = new Date(booking.booking_time);
          const startHour = bookingTime.getUTCHours();
          const startMinute = bookingTime.getUTCMinutes();
          const duration = booking.services.duration_minutes;
          
          // Marcar como ocupados todos los slots que se solapan con esta reserva
          const startTimeInMinutes = startHour * 60 + startMinute;
          const endTimeInMinutes = startTimeInMinutes + duration;
          
          timeSlots.forEach(slot => {
            const [slotHour, slotMinute] = slot.split(':').map(Number);
            const slotTimeInMinutes = slotHour * 60 + slotMinute;
            const slotEndTimeInMinutes = slotTimeInMinutes + 30; // Cada slot dura 30 minutos
            
            // Verificar si hay solapamiento
            if (slotTimeInMinutes < endTimeInMinutes && slotEndTimeInMinutes > startTimeInMinutes) {
              occupiedSlots.add(slot);
            }
          });
        });

        // Filtrar slots disponibles
        const availableSlots = timeSlots.filter(slot => !occupiedSlots.has(slot));

        // Log para el día específico que estamos probando
        if (dateStr === '2025-06-10') {
          logger.info('Finished processing day 2025-06-10', {
            serviceId,
            totalSlots: timeSlots.length,
            occupiedSlots: Array.from(occupiedSlots),
            availableSlots: availableSlots.length,
            availableSlotsDetail: availableSlots
          });
        }

        availability.push({
          date: dateStr,
          available: availableSlots.length > 0,
          availableSlots: availableSlots
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      logger.info('Service availability calculated successfully', {
        serviceId,
        year,
        month,
        employeeId,
        totalDays: availability.length,
        availableDays: availability.filter(day => day.available).length,
        timestamp: new Date().toISOString()
      });

      return apiResponse(res, 200, {
        success: true,
        data: availability,
        message: 'Disponibilidad obtenida exitosamente'
      });
    } catch (error) {
      logger.error('Error getting service availability', {
        error: error.message,
        stack: error.stack,
        serviceId: req.params.serviceId,
        query: req.query,
        timestamp: new Date().toISOString()
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }
}

module.exports = ServiceController;