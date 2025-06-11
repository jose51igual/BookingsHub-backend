const ServiceController = require('@controllers/serviceController');
const ServiceModel = require('@models/serviceModel');
const { apiResponse, apiError } = require('@utils/apiResponse');
const { validService, validServiceUpdate } = require('@tests/fixtures/services');

// Mock dependencies
jest.mock('@models/serviceModel');
jest.mock('@utils/logger');
jest.mock('@utils/apiResponse', () => ({
  apiResponse: jest.fn(),
  apiError: jest.fn()
}));

describe('ServiceController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: {},
      query: {},
      body: {},
      user: { id: 1, role: 'business' }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    jest.clearAllMocks();
  });

  describe('getBusinessServices', () => {
    it('should return business services successfully', async () => {
      const businessId = 1;
      const mockServices = [
        { id: 1, name: 'Corte de Cabello', price: 25.00, duration: 30, business_id: businessId },
        { id: 2, name: 'Manicura', price: 20.00, duration: 45, business_id: businessId }
      ];

      req.params = { businessId: businessId.toString() };
      ServiceModel.getBusinessServices.mockResolvedValue(mockServices);

      await ServiceController.getBusinessServices(req, res);

      expect(ServiceModel.getBusinessServices).toHaveBeenCalledWith(businessId);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        count: mockServices.length,
        data: mockServices,
        message: 'Servicios obtenidos exitosamente'
      });
    });

    it('should handle database error', async () => {
      const businessId = 1;
      req.params = { businessId: businessId.toString() };
      const error = new Error('Database connection failed');
      ServiceModel.getBusinessServices.mockRejectedValue(error);

      await ServiceController.getBusinessServices(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });

  describe('getServiceById', () => {
    it('should return service by id successfully', async () => {
      const serviceId = 1;
      const mockService = { id: serviceId, name: 'Corte de Cabello', price: 25.00, duration: 30, business_id: 1 };
      req.params = { id: serviceId.toString() };
      ServiceModel.getServiceById.mockResolvedValue(mockService);

      await ServiceController.getServiceById(req, res);

      expect(ServiceModel.getServiceById).toHaveBeenCalledWith(serviceId);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: mockService,
        message: 'Servicio obtenido exitosamente'
      });
    });

    it('should return 404 when service not found', async () => {
      const serviceId = 999;
      req.params = { id: serviceId.toString() };
      ServiceModel.getServiceById.mockResolvedValue(null);

      await ServiceController.getServiceById(req, res);

      expect(ServiceModel.getServiceById).toHaveBeenCalledWith(serviceId);
      expect(apiError).toHaveBeenCalledWith(res, 404, 'Servicio no encontrado');
    });

    it('should handle database error', async () => {
      const serviceId = 1;
      req.params = { id: serviceId.toString() };
      const error = new Error('Database connection failed');
      ServiceModel.getServiceById.mockRejectedValue(error);

      await ServiceController.getServiceById(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });

  describe('createService', () => {
    it('should create service successfully when user is business owner', async () => {
      req.body = { ...validService };
      req.user = { id: 1, role: 'business' };
      const mockServiceId = 123;
      
      ServiceModel.isBusinessOwner.mockResolvedValue(true);
      ServiceModel.createService.mockResolvedValue(mockServiceId);

      await ServiceController.createService(req, res);

      expect(ServiceModel.isBusinessOwner).toHaveBeenCalledWith(validService.business_id, req.user.id);
      expect(ServiceModel.createService).toHaveBeenCalledWith(
        validService.business_id,
        validService.name,
        validService.description,
        validService.duration,
        validService.price,
        validService.category
      );
      expect(apiResponse).toHaveBeenCalledWith(res, 201, {
        success: true,
        data: { serviceId: mockServiceId },
        message: 'Servicio creado exitosamente'
      });
    });

    it('should return 403 when user is not business owner', async () => {
      req.body = { ...validService };
      req.user = { id: 2, role: 'business' };
      
      ServiceModel.isBusinessOwner.mockResolvedValue(false);

      await ServiceController.createService(req, res);

      expect(ServiceModel.isBusinessOwner).toHaveBeenCalledWith(validService.business_id, req.user.id);
      expect(ServiceModel.createService).not.toHaveBeenCalled();
      expect(apiError).toHaveBeenCalledWith(res, 403, 'No tienes autorización para añadir servicios a este negocio');
    });

    it('should handle database error during creation', async () => {
      req.body = { ...validService };
      req.user = { id: 1, role: 'business' };
      const error = new Error('Database connection failed');
      
      ServiceModel.isBusinessOwner.mockResolvedValue(true);
      ServiceModel.createService.mockRejectedValue(error);

      await ServiceController.createService(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });

    it('should handle database error during ownership check', async () => {
      req.body = { ...validService };
      req.user = { id: 1, role: 'business' };
      const error = new Error('Database connection failed');
      
      ServiceModel.isBusinessOwner.mockRejectedValue(error);

      await ServiceController.createService(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });

  describe('updateService', () => {
    it('should update service successfully when user is service owner', async () => {
      const serviceId = 1;
      req.params = { id: serviceId.toString() };
      req.body = { ...validServiceUpdate };
      req.user = { id: 1, role: 'business' };
      
      ServiceModel.isServiceOwner.mockResolvedValue(true);
      ServiceModel.updateService.mockResolvedValue(true);

      await ServiceController.updateService(req, res);

      expect(ServiceModel.isServiceOwner).toHaveBeenCalledWith(serviceId, req.user.id);
      expect(ServiceModel.updateService).toHaveBeenCalledWith(
        serviceId,
        validServiceUpdate.name,
        validServiceUpdate.description,
        validServiceUpdate.duration,
        validServiceUpdate.price,
        '' // category not provided in validServiceUpdate, so it becomes empty string
      );
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: null,
        message: 'Servicio actualizado exitosamente'
      });
    });

    it('should return 403 when user is not service owner', async () => {
      const serviceId = 1;
      req.params = { id: serviceId.toString() };
      req.body = { ...validServiceUpdate };
      req.user = { id: 2, role: 'business' };
      
      ServiceModel.isServiceOwner.mockResolvedValue(false);

      await ServiceController.updateService(req, res);

      expect(ServiceModel.isServiceOwner).toHaveBeenCalledWith(serviceId, req.user.id);
      expect(ServiceModel.updateService).not.toHaveBeenCalled();
      expect(apiError).toHaveBeenCalledWith(res, 403, 'No tienes autorización para modificar este servicio');
    });

    it('should handle database error during update', async () => {
      const serviceId = 1;
      req.params = { id: serviceId.toString() };
      req.body = { ...validServiceUpdate };
      req.user = { id: 1, role: 'business' };
      const error = new Error('Database connection failed');
      
      ServiceModel.isServiceOwner.mockResolvedValue(true);
      ServiceModel.updateService.mockRejectedValue(error);

      await ServiceController.updateService(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });

    it('should handle database error during ownership check', async () => {
      const serviceId = 1;
      req.params = { id: serviceId.toString() };
      req.body = { ...validServiceUpdate };
      req.user = { id: 1, role: 'business' };
      const error = new Error('Database connection failed');
      
      ServiceModel.isServiceOwner.mockRejectedValue(error);

      await ServiceController.updateService(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });

  describe('deleteService', () => {
    it('should delete service successfully when user is service owner', async () => {
      const serviceId = 1;
      req.params = { id: serviceId.toString() };
      req.user = { id: 1, role: 'business' };
      
      ServiceModel.isServiceOwner.mockResolvedValue(true);
      ServiceModel.deleteService.mockResolvedValue(true);

      await ServiceController.deleteService(req, res);

      expect(ServiceModel.isServiceOwner).toHaveBeenCalledWith(serviceId, req.user.id);
      expect(ServiceModel.deleteService).toHaveBeenCalledWith(serviceId);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: null,
        message: 'Servicio eliminado exitosamente'
      });
    });

    it('should return 403 when user is not service owner', async () => {
      const serviceId = 1;
      req.params = { id: serviceId.toString() };
      req.user = { id: 2, role: 'business' };
      
      ServiceModel.isServiceOwner.mockResolvedValue(false);

      await ServiceController.deleteService(req, res);

      expect(ServiceModel.isServiceOwner).toHaveBeenCalledWith(serviceId, req.user.id);
      expect(ServiceModel.deleteService).not.toHaveBeenCalled();
      expect(apiError).toHaveBeenCalledWith(res, 403, 'No tienes autorización para eliminar este servicio');
    });

    it('should handle database error during deletion', async () => {
      const serviceId = 1;
      req.params = { id: serviceId.toString() };
      req.user = { id: 1, role: 'business' };
      const error = new Error('Database connection failed');
      
      ServiceModel.isServiceOwner.mockResolvedValue(true);
      ServiceModel.deleteService.mockRejectedValue(error);

      await ServiceController.deleteService(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });

    it('should handle database error during ownership check', async () => {
      const serviceId = 1;
      req.params = { id: serviceId.toString() };
      req.user = { id: 1, role: 'business' };
      const error = new Error('Database connection failed');
      
      ServiceModel.isServiceOwner.mockRejectedValue(error);

      await ServiceController.deleteService(req, res);

      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });
});
