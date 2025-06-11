const { prisma } = require('../config/prisma');
const logger = require('../utils/logger')
class EmployeeModel {
  // Obtener todos los empleados de un negocio
  static async getByBusinessId(businessId) {
    try {
      const employees = await prisma.employees.findMany({
        where: { business_id: parseInt(businessId) },
        include: {
          businesses: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: { name: 'asc' }
      });
      
      // Procesar los datos para incluir arrays de especialidades
      return employees.map(employee => ({
        ...employee,
        specialties: employee.specialties ? JSON.parse(employee.specialties) : [],
        // Nota: service_ids no está disponible en el esquema actual
        // Si necesitas asociar empleados con servicios, necesitarás crear esa relación
        service_ids: []
      }));
    } catch (error) {
      logger.error('Error al obtener empleados por negocio:', error);
      throw error;
    }
  }

  // Obtener empleado por ID
  static async getById(id) {
    try {
      const employee = await prisma.employees.findUnique({
        where: { id: parseInt(id) },
        include: {
          businesses: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
      
      if (!employee) {
        return null;
      }

      return {
        ...employee,
        specialties: employee.specialties ? JSON.parse(employee.specialties) : [],
        // Nota: service_ids no está disponible en el esquema actual
        service_ids: []
      };
    } catch (error) {
      logger.error('Error al obtener empleado por ID:', error);
      throw error;
    }
  }

  // Obtener empleados por servicio
  // Nota: Como no hay relación directa entre empleados y servicios en el esquema actual,
  // retornamos todos los empleados del negocio al que pertenece el servicio
  static async getByServiceId(serviceId) {
    try {
      // Primero obtenemos el servicio para conocer el business_id
      const service = await prisma.services.findUnique({
        where: { id: parseInt(serviceId) },
        select: { business_id: true }
      });

      if (!service) {
        return [];
      }

      // Obtenemos todos los empleados de ese negocio
      const employees = await prisma.employees.findMany({
        where: {
          business_id: service.business_id
        },
        orderBy: { name: 'asc' }
      });
      
      return employees.map(employee => ({
        ...employee,
        specialties: employee.specialties ? JSON.parse(employee.specialties) : []
      }));
    } catch (error) {
      logger.error('Error al obtener empleados por servicio:', error);
      throw error;
    }
  }

  // Crear nuevo empleado
  static async create(employeeData) {
    try {
      const {
        business_id,
        name,
        position,
        specialties,
        profile_image,
        service_ids = []
      } = employeeData;

      const employee = await prisma.employees.create({
        data: {
          business_id: parseInt(business_id),
          name,
          position: position || null,
          specialties: JSON.stringify(specialties || []),
          profile_image: profile_image || null
        }
      });

      // Asignar servicios al empleado
      if (service_ids.length > 0) {
        await this.assignServices(employee.id, service_ids);
      }

      return await this.getById(employee.id);
    } catch (error) {
      logger.error('Error al crear empleado:', error);
      throw error;
    }
  }

  // Actualizar empleado
  static async update(id, employeeData) {
    try {
      const {
        name,
        position,
        specialties,
        profile_image,
        service_ids
      } = employeeData;

      await prisma.employees.update({
        where: { id: parseInt(id) },
        data: {
          name,
          position: position || null,
          specialties: JSON.stringify(specialties || []),
          profile_image: profile_image || null,
          updated_at: new Date()
        }
      });

      // Actualizar servicios asignados
      if (service_ids !== undefined) {
        await this.updateServices(id, service_ids);
      }

      return await this.getById(id);
    } catch (error) {
      logger.error('Error al actualizar empleado:', error);
      throw error;
    }
  }

  // Eliminar empleado (eliminación real)
  static async delete(id) {
    try {
      // Nota: Como no hay tabla employee_services, solo eliminamos el empleado
      // Las reservas (bookings) se mantendrán por integridad referencial
      await prisma.employees.delete({
        where: { id: parseInt(id) }
      });
      
      return true;
    } catch (error) {
      logger.error('Error al eliminar empleado:', error);
      throw error;
    }
  }

  // Asignar servicios a empleado
  static async assignServices(employeeId, serviceIds) {
    try {
      logger.info(`assignServices called for employee ${employeeId} with services [${serviceIds.join(', ')}] - No action taken (no employee_services table)`);
      return true;
    } catch (error) {
      logger.error('Error al asignar servicios:', error);
      throw error;
    }
  }

  // Actualizar servicios de empleado
  static async updateServices(employeeId, serviceIds) {
    return await this.assignServices(employeeId, serviceIds);
  }

  // Verificar disponibilidad de empleado (simplificado)
  static async checkAvailability(employeeId, date, time) {
    try {
      // Obtener información del empleado
      const employee = await this.getById(employeeId);
      if (!employee) {
        return { available: false, reason: 'Empleado no encontrado' };
      }

      // Verificar si ya tiene una reserva en esa fecha y hora
      // Convertir booking_time de "HH:MM" a DateTime (usando misma lógica que createBooking)
      const timeDateTime = new Date(`1970-01-01T${time}:00.000Z`);
      
      const existingBooking = await prisma.bookings.findFirst({
        where: {
          employee_id: parseInt(employeeId),
          booking_date: new Date(date),
          booking_time: timeDateTime,
          status: {
            notIn: ['cancelada', 'rechazada']
          }
        }
      });

      if (existingBooking) {
        return { available: false, reason: 'Empleado ya tiene una reserva en este horario' };
      }

      return { available: true };
    } catch (error) {
      logger.error('Error al verificar disponibilidad del empleado:', error);
      throw error;
    }
  }

  // Obtener horarios ocupados de un empleado para una fecha específica
  static async getBusyTimes(employeeId, date) {
    try {
      const bookings = await prisma.bookings.findMany({
        where: {
          employee_id: parseInt(employeeId),
          booking_date: new Date(date),
          status: {
            notIn: ['cancelada', 'rechazada']
          }
        },
        select: {
          booking_time: true,
          services: {
            select: {
              duration_minutes: true
            }
          }
        }
      });

      return bookings.map(booking => ({
        time: booking.booking_time,
        duration: booking.services.duration_minutes
      }));
    } catch (error) {
      logger.error('Error al obtener horarios ocupados:', error);
      throw error;
    }
  }
}

module.exports = EmployeeModel;
