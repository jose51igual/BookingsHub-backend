const EmployeeController = require('@controllers/employeeController');
const EmployeeModel = require('@models/employeeModel');
const { apiResponse, apiError } = require('@utils/apiResponse');

// Mock dependencies
jest.mock('@models/employeeModel');
jest.mock('@utils/apiResponse');
jest.mock('@utils/logger');

describe('EmployeeController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      query: {},
      user: { id: 1 }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  describe('getEmployeesByBusiness', () => {
    beforeEach(() => {
      req.params = { id: '1' };
    });

    it('should return employees by business successfully', async () => {
      const mockEmployees = [
        { id: 1, name: 'Employee 1', business_id: 1 },
        { id: 2, name: 'Employee 2', business_id: 1 }
      ];

      EmployeeModel.getByBusinessId.mockResolvedValue(mockEmployees);
      apiResponse.mockImplementation((res, status, data) => {
        res.status(status).json(data);
      });

      await EmployeeController.getEmployeesByBusiness(req, res);

      expect(EmployeeModel.getByBusinessId).toHaveBeenCalledWith(1);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        count: mockEmployees.length,
        data: mockEmployees,
        message: 'Empleados obtenidos exitosamente'
      });
    });

    it('should handle database error', async () => {
      const mockError = new Error('Database error');
      EmployeeModel.getByBusinessId.mockRejectedValue(mockError);
      apiError.mockImplementation((res, status, message, error) => {
        res.status(status).json({ success: false, message, error: error.message });
      });

      await EmployeeController.getEmployeesByBusiness(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', mockError);
    });
  });

  describe('getEmployeeById', () => {
    beforeEach(() => {
      req.params = { id: '1' };
    });

    it('should return employee by id successfully', async () => {
      const mockEmployee = { 
        id: 1, 
        name: 'John Doe', 
        business_id: 1,
        position: 'Stylist'
      };
      
      EmployeeModel.getById.mockResolvedValue(mockEmployee);
      apiResponse.mockImplementation((res, status, data) => {
        res.status(status).json(data);
      });

      await EmployeeController.getEmployeeById(req, res);

      expect(EmployeeModel.getById).toHaveBeenCalledWith(1);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: mockEmployee,
        message: 'Empleado obtenido exitosamente'
      });
    });

    it('should return 404 when employee not found', async () => {
      EmployeeModel.getById.mockResolvedValue(null);
      apiError.mockImplementation((res, status, message) => {
        res.status(status).json({ success: false, message });
      });

      await EmployeeController.getEmployeeById(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 404, 'Empleado no encontrado');
    });

    it('should handle database error', async () => {
      const mockError = new Error('Database error');
      EmployeeModel.getById.mockRejectedValue(mockError);
      apiError.mockImplementation((res, status, message, error) => {
        res.status(status).json({ success: false, message, error: error.message });
      });

      await EmployeeController.getEmployeeById(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', mockError);
    });
  });

  describe('getEmployeesByService', () => {
    beforeEach(() => {
      req.params = { id: '1' };
    });

    it('should return employees by service successfully', async () => {
      const mockEmployees = [
        { id: 1, name: 'Employee 1', service_id: 1 },
        { id: 2, name: 'Employee 2', service_id: 1 }
      ];

      EmployeeModel.getByServiceId.mockResolvedValue(mockEmployees);
      apiResponse.mockImplementation((res, status, data) => {
        res.status(status).json(data);
      });

      await EmployeeController.getEmployeesByService(req, res);

      expect(EmployeeModel.getByServiceId).toHaveBeenCalledWith(1);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        count: mockEmployees.length,
        data: mockEmployees,
        message: 'Empleados especializados obtenidos exitosamente'
      });
    });

    it('should handle database error', async () => {
      const mockError = new Error('Database error');
      EmployeeModel.getByServiceId.mockRejectedValue(mockError);
      apiError.mockImplementation((res, status, message, error) => {
        res.status(status).json({ success: false, message, error: error.message });
      });

      await EmployeeController.getEmployeesByService(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', mockError);
    });
  });

  describe('createEmployee', () => {
    beforeEach(() => {
      req.body = {
        business_id: 1,
        name: 'New Employee',
        position: 'Stylist',
        service_ids: [1, 2]
      };
    });

    it('should create employee successfully', async () => {
      const mockCreatedEmployee = { id: 1, ...req.body };
      
      EmployeeModel.create.mockResolvedValue(mockCreatedEmployee);
      apiResponse.mockImplementation((res, status, data) => {
        res.status(status).json(data);
      });

      await EmployeeController.createEmployee(req, res);

      expect(EmployeeModel.create).toHaveBeenCalledWith({
        business_id: 1,
        name: 'New Employee',
        position: 'Stylist',
        specialties: [],
        profile_image: undefined,
        service_ids: [1, 2]
      });
      expect(apiResponse).toHaveBeenCalledWith(res, 201, {
        success: true,
        data: mockCreatedEmployee,
        message: 'Empleado creado exitosamente'
      });
    });

    it('should handle duplicate email error', async () => {
      const mockError = new Error('Duplicate entry');
      mockError.code = 'ER_DUP_ENTRY';
      EmployeeModel.create.mockRejectedValue(mockError);
      apiError.mockImplementation((res, status, message) => {
        res.status(status).json({ success: false, message });
      });

      await EmployeeController.createEmployee(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 409, 'Ya existe un empleado con estos datos');
    });

    it('should handle database error', async () => {
      const mockError = new Error('Database error');
      EmployeeModel.create.mockRejectedValue(mockError);
      apiError.mockImplementation((res, status, message, error) => {
        res.status(status).json({ success: false, message, error: error.message });
      });

      await EmployeeController.createEmployee(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', mockError);
    });
  });

  describe('updateEmployee', () => {
    beforeEach(() => {
      req.params = { id: '1' };
      req.body = {
        name: 'Updated Employee',
        position: 'Senior Stylist'
      };
    });

    it('should update employee successfully', async () => {
      const mockExistingEmployee = { id: 1, name: 'Original Name', business_id: 1 };
      const mockUpdatedEmployee = { id: 1, ...req.body, business_id: 1 };
      
      EmployeeModel.getById.mockResolvedValue(mockExistingEmployee);
      EmployeeModel.update.mockResolvedValue(mockUpdatedEmployee);
      apiResponse.mockImplementation((res, status, data) => {
        res.status(status).json(data);
      });

      await EmployeeController.updateEmployee(req, res);

      expect(EmployeeModel.getById).toHaveBeenCalledWith(1);
      expect(EmployeeModel.update).toHaveBeenCalledWith(1, {
        name: 'Updated Employee',
        position: 'Senior Stylist'
      });
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: mockUpdatedEmployee,
        message: 'Empleado actualizado exitosamente'
      });
    });

    it('should return 404 when employee not found', async () => {
      EmployeeModel.getById.mockResolvedValue(null);
      apiError.mockImplementation((res, status, message) => {
        res.status(status).json({ success: false, message });
      });

      await EmployeeController.updateEmployee(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 404, 'Empleado no encontrado');
    });

    it('should handle duplicate email error', async () => {
      const mockExistingEmployee = { id: 1, name: 'Original Name', business_id: 1 };
      const mockError = new Error('Duplicate entry');
      mockError.code = 'ER_DUP_ENTRY';
      
      EmployeeModel.getById.mockResolvedValue(mockExistingEmployee);
      EmployeeModel.update.mockRejectedValue(mockError);
      apiError.mockImplementation((res, status, message) => {
        res.status(status).json({ success: false, message });
      });

      await EmployeeController.updateEmployee(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 409, 'Ya existe un empleado con estos datos');
    });
  });

  describe('deleteEmployee', () => {
    beforeEach(() => {
      req.params = { id: '1' };
    });

    it('should delete employee successfully', async () => {
      const mockExistingEmployee = { id: 1, name: 'Employee to delete', business_id: 1 };
      
      EmployeeModel.getById.mockResolvedValue(mockExistingEmployee);
      EmployeeModel.delete.mockResolvedValue(true);
      apiResponse.mockImplementation((res, status, data) => {
        res.status(status).json(data);
      });

      await EmployeeController.deleteEmployee(req, res);

      expect(EmployeeModel.getById).toHaveBeenCalledWith(1);
      expect(EmployeeModel.delete).toHaveBeenCalledWith(1);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: null,
        message: 'Empleado eliminado exitosamente'
      });
    });

    it('should return 404 when employee not found', async () => {
      EmployeeModel.getById.mockResolvedValue(null);
      apiError.mockImplementation((res, status, message) => {
        res.status(status).json({ success: false, message });
      });

      await EmployeeController.deleteEmployee(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 404, 'Empleado no encontrado');
    });

    it('should handle database error', async () => {
      const mockExistingEmployee = { id: 1, name: 'Employee to delete', business_id: 1 };
      const mockError = new Error('Database error');
      
      EmployeeModel.getById.mockResolvedValue(mockExistingEmployee);
      EmployeeModel.delete.mockRejectedValue(mockError);
      apiError.mockImplementation((res, status, message, error) => {
        res.status(status).json({ success: false, message, error: error.message });
      });

      await EmployeeController.deleteEmployee(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', mockError);
    });
  });

  describe('checkAvailability', () => {
    beforeEach(() => {
      req.params = { id: '1' };
      req.query = { date: '2024-01-15', time: '10:00' };
    });

    it('should check employee availability successfully', async () => {
      const mockAvailability = {
        available: true,
        employee_id: 1,
        date: '2024-01-15',
        time: '10:00'
      };

      EmployeeModel.checkAvailability.mockResolvedValue(mockAvailability);
      apiResponse.mockImplementation((res, status, data) => {
        res.status(status).json(data);
      });

      await EmployeeController.checkAvailability(req, res);

      expect(EmployeeModel.checkAvailability).toHaveBeenCalledWith(1, '2024-01-15', '10:00');
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: mockAvailability,
        message: 'Disponibilidad verificada exitosamente'
      });
    });

    it('should handle database error', async () => {
      const mockError = new Error('Database error');
      EmployeeModel.checkAvailability.mockRejectedValue(mockError);
      apiError.mockImplementation((res, status, message, error) => {
        res.status(status).json({ success: false, message, error: error.message });
      });

      await EmployeeController.checkAvailability(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', mockError);
    });
  });

  describe('assignServices', () => {
    beforeEach(() => {
      req.params = { id: '1' };
      req.body = { service_ids: [1, 2, 3] };
    });

    it('should assign services to employee successfully', async () => {
      const mockExistingEmployee = { id: 1, name: 'Employee', business_id: 1 };
      
      EmployeeModel.getById.mockResolvedValue(mockExistingEmployee);
      EmployeeModel.assignServices.mockResolvedValue(true);
      apiResponse.mockImplementation((res, status, data) => {
        res.status(status).json(data);
      });

      await EmployeeController.assignServices(req, res);

      expect(EmployeeModel.getById).toHaveBeenCalledWith(1);
      expect(EmployeeModel.assignServices).toHaveBeenCalledWith(1, [1, 2, 3]);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: null,
        message: 'Servicios asignados exitosamente al empleado'
      });
    });

    it('should return 404 when employee not found', async () => {
      EmployeeModel.getById.mockResolvedValue(null);
      apiError.mockImplementation((res, status, message) => {
        res.status(status).json({ success: false, message });
      });

      await EmployeeController.assignServices(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 404, 'Empleado no encontrado');
    });

    it('should handle database error', async () => {
      const mockExistingEmployee = { id: 1, name: 'Employee', business_id: 1 };
      const mockError = new Error('Database error');
      
      EmployeeModel.getById.mockResolvedValue(mockExistingEmployee);
      EmployeeModel.assignServices.mockRejectedValue(mockError);
      apiError.mockImplementation((res, status, message, error) => {
        res.status(status).json({ success: false, message, error: error.message });
      });

      await EmployeeController.assignServices(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', mockError);
    });
  });
});
