const EmployeeModel = require('@models/employeeModel');
const { apiResponse, apiError } = require('@utils/apiResponse');
const logger = require('@utils/logger');

/**
  * @route PUT /api/employees/{id}
   * @description Actualiza un empleado específico (solo propietarios de negocio)
   * @response 200 - Empleado actualizado exitosamente
   * @response 400 - Datos de entrada inválidos
   * @response 403 - No autorizado para modificar este empleado
   * @response 404 - Empleado no encontrado
   * @response 409 - Ya existe un empleado con estos datos
   * @response 500 - Error interno del servidor
   */
class EmployeeController {
  /**
   * @route GET /api/businesses/{id}/employees
   * @description Obtiene todos los empleados de un negocio específico
   * @response 200 - Lista de empleados del negocio
   * @response 400 - ID de negocio inválido
   * @response 500 - Error interno del servidor
   */
  static async getEmployeesByBusiness(req, res) {
    try {
      const { id: businessId } = req.params;
      const businessIdInt = parseInt(businessId);
      const employees = await EmployeeModel.getByBusinessId(businessIdInt);
      
      logger.info('Business employees retrieved successfully', {
        businessId: businessIdInt,
        count: employees.length
      });
      
      return apiResponse(res, 200, {
        success: true,
        count: employees.length,
        data: employees,
        message: 'Empleados obtenidos exitosamente'
      });
    } catch (error) {
      logger.error('Error getting business employees', {
        error: error.message,
        businessId: req.params.id
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * @route GET /api/employees/{id}
   * @description Obtiene un empleado específico por su ID
   * @response 200 - Empleado obtenido exitosamente
   * @response 400 - ID de empleado inválido
   * @response 404 - Empleado no encontrado
   * @response 500 - Error interno del servidor
   */
  static async getEmployeeById(req, res) {
    try {
      const { id } = req.params;
      const employeeId = parseInt(id);
      const employee = await EmployeeModel.getById(employeeId);
      
      if (!employee) {
        return apiError(res, 404, 'Empleado no encontrado');
      }

      logger.info('Employee retrieved successfully', { employeeId });

      return apiResponse(res, 200, {
        success: true,
        data: employee,
        message: 'Empleado obtenido exitosamente'
      });
    } catch (error) {
      logger.error('Error getting employee by ID', {
        error: error.message,
        employeeId: req.params.id
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * @route GET /api/services/{id}/employees
   * @description Obtiene todos los empleados que pueden realizar un servicio específico
   * @response 200 - Lista de empleados especializados en el servicio
   * @response 400 - ID de servicio inválido
   * @response 500 - Error interno del servidor
   */
  static async getEmployeesByService(req, res) {
    try {
      const { id: serviceId } = req.params;
      const serviceIdInt = parseInt(serviceId);
      const employees = await EmployeeModel.getByServiceId(serviceIdInt);
      
      logger.info('Service employees retrieved successfully', {
        serviceId: serviceIdInt,
        count: employees.length
      });
      
      return apiResponse(res, 200, {
        success: true,
        count: employees.length,
        data: employees,
        message: 'Empleados especializados obtenidos exitosamente'
      });
    } catch (error) {
      logger.error('Error getting service employees', {
        error: error.message,
        serviceId: req.params.id
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * @route POST /api/employees
   * @description Crea un nuevo empleado (solo propietarios de negocio)
   * @response 201 - Empleado creado exitosamente
   * @response 400 - Datos de entrada inválidos
   * @response 403 - No autorizado para agregar empleados a este negocio
   * @response 409 - Ya existe un empleado con estos datos
   * @response 500 - Error interno del servidor
   */
  static async createEmployee(req, res) {
    try {
      const {
        business_id,
        name,
        position,
        specialties,
        profile_image,
        service_ids
      } = req.body;
      
      // TODO: Verificar que el usuario sea propietario del negocio
      // const isOwner = await BusinessModel.isBusinessOwner(parseInt(business_id), req.user.id);
      // if (!isOwner) {
      //   return apiError(res, 403, 'No tienes autorización para agregar empleados a este negocio');
      // }

      const employeeData = {
        business_id: parseInt(business_id),
        name: name.trim(),
        position: position?.trim(),
        specialties: specialties || [],
        profile_image: profile_image?.trim(),
        service_ids: service_ids || []
      };

      const newEmployee = await EmployeeModel.create(employeeData);
      
      logger.info('Employee created successfully', {
        employeeId: newEmployee.id,
        businessId: business_id,
        createdBy: req.user.id
      });
      
      return apiResponse(res, 201, {
        success: true,
        data: newEmployee,
        message: 'Empleado creado exitosamente'
      });
    } catch (error) {
      logger.error('Error creating employee', {
        error: error.message,
        userId: req.user?.id
      });
      
      if (error.code === 'ER_DUP_ENTRY') {
        return apiError(res, 409, 'Ya existe un empleado con estos datos');
      }

      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * @route PUT /api/employees/{id}
   * @description Actualiza un empleado específico (solo propietarios de negocio)
   * @response 200 - Empleado actualizado exitosamente
   * @response 400 - ID de empleado inválido o datos de entrada inválidos
   * @response 403 - No autorizado para modificar este empleado
   * @response 404 - Empleado no encontrado
   * @response 409 - Ya existe un empleado con este email
   * @response 500 - Error interno del servidor
   */
  static async updateEmployee(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        position,
        specialties,
        profile_image,
        service_ids
      } = req.body;
      
      const employeeId = parseInt(id);

      // Verificar que el empleado existe
      const existingEmployee = await EmployeeModel.getById(employeeId);
      if (!existingEmployee) {
        return apiError(res, 404, 'Empleado no encontrado');
      }

      const updateData = {};
      if (name !== undefined) updateData.name = name.trim();
      if (position !== undefined) updateData.position = position?.trim();
      if (specialties !== undefined) updateData.specialties = specialties;
      if (profile_image !== undefined) updateData.profile_image = profile_image?.trim();
      if (service_ids !== undefined) updateData.service_ids = service_ids;
      
      const updatedEmployee = await EmployeeModel.update(employeeId, updateData);
      
      logger.info('Employee updated successfully', {
        employeeId,
        updatedBy: req.user?.id
      });

      return apiResponse(res, 200, {
        success: true,
        data: updatedEmployee,
        message: 'Empleado actualizado exitosamente'
      });
    } catch (error) {
      logger.error('Error updating employee', {
        error: error.message,
        employeeId: req.params.id,
        userId: req.user?.id
      });

      if (error.code === 'ER_DUP_ENTRY') {
        return apiError(res, 409, 'Ya existe un empleado con estos datos');
      }

      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * @route DELETE /api/employees/{id}
   * @description Elimina un empleado específico (solo propietarios de negocio)
   * @response 200 - Empleado eliminado exitosamente
   * @response 400 - ID de empleado inválido
   * @response 403 - No autorizado para eliminar este empleado
   * @response 404 - Empleado no encontrado
   * @response 500 - Error interno del servidor
   */
  static async deleteEmployee(req, res) {
    try {
      const { id } = req.params;
      const employeeId = parseInt(id);

      // Verificar que el empleado existe
      const existingEmployee = await EmployeeModel.getById(employeeId);
      if (!existingEmployee) {
        return apiError(res, 404, 'Empleado no encontrado');
      }

      // TODO: Verificar que el usuario sea propietario del negocio
      // const isOwner = await BusinessModel.isBusinessOwner(existingEmployee.business_id, req.user.id);
      // if (!isOwner) {
      //   return apiError(res, 403, 'No tienes autorización para eliminar este empleado');
      // }

      await EmployeeModel.delete(employeeId);
      
      logger.info('Employee deleted successfully', {
        employeeId,
        deletedBy: req.user?.id
      });

      return apiResponse(res, 200, {
        success: true,
        data: null,
        message: 'Empleado eliminado exitosamente'
      });
    } catch (error) {
      logger.error('Error deleting employee', {
        error: error.message,
        employeeId: req.params.id,
        userId: req.user?.id
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * @route GET /api/employees/{id}/availability
   * @description Verifica la disponibilidad de un empleado en una fecha y hora específica
   * @response 200 - Disponibilidad verificada exitosamente
   * @response 400 - ID de empleado inválido o parámetros faltantes
   * @response 500 - Error interno del servidor
   */
  static async checkAvailability(req, res) {
    try {
      const { id: employeeId } = req.params;
      const { date, time } = req.query;
      
      const availability = await EmployeeModel.checkAvailability(parseInt(employeeId), date, time);
      
      logger.info('Employee availability checked', {
        employeeId: parseInt(employeeId),
        date,
        time,
        available: availability.available
      });

      return apiResponse(res, 200, {
        success: true,
        data: availability,
        message: 'Disponibilidad verificada exitosamente'
      });
    } catch (error) {
      logger.error('Error checking employee availability', {
        error: error.message,
        employeeId: req.params.id,
        date: req.query.date,
        time: req.query.time
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }

  /**
   * @route POST /api/employees/{id}/services
   * @description Asigna servicios específicos a un empleado (solo propietarios de negocio)
   * @response 200 - Servicios asignados exitosamente al empleado
   * @response 400 - ID de empleado inválido o datos de entrada inválidos
   * @response 403 - No autorizado para modificar este empleado
   * @response 404 - Empleado no encontrado
   * @response 500 - Error interno del servidor
   */
  static async assignServices(req, res) {
    try {
      const { id: employeeId } = req.params;
      const { service_ids } = req.body;
      
      // Verificar que el empleado existe
      const existingEmployee = await EmployeeModel.getById(parseInt(employeeId));
      if (!existingEmployee) {
        return apiError(res, 404, 'Empleado no encontrado');
      }

      // TODO: Verificar que el usuario sea propietario del negocio
      // const isOwner = await BusinessModel.isBusinessOwner(existingEmployee.business_id, req.user.id);
      // if (!isOwner) {
      //   return apiError(res, 403, 'No tienes autorización para modificar este empleado');
      // }

      await EmployeeModel.assignServices(parseInt(employeeId), service_ids);
      
      logger.info('Services assigned to employee successfully', {
        employeeId: parseInt(employeeId),
        serviceIds: service_ids,
        assignedBy: req.user?.id
      });

      return apiResponse(res, 200, {
        success: true,
        data: null,
        message: 'Servicios asignados exitosamente al empleado'
      });
    } catch (error) {
      logger.error('Error assigning services to employee', {
        error: error.message,
        employeeId: req.params.id,
        userId: req.user?.id
      });
      return apiError(res, 500, 'Error interno del servidor', error);
    }
  }
}

module.exports = EmployeeController;
