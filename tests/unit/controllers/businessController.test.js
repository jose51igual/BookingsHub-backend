const businessController = require('@controllers/businessController');
const BusinessModel = require('@models/businessModel');
const config = require('@config/index');

// Mock del modelo de negocio
jest.mock('@models/businessModel');

// Mock de la configuración
jest.mock('@config/index', () => ({
  NODE_ENV: 'test',
  USER_ROLES: {
    BUSINESS: 'business',
    CLIENT: 'client'
  },
  DEFAULT_PAGINATION_LIMIT: 10
}));

describe('BusinessController', () => {
  let mockRequest;
  let mockResponse;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      query: {},
      user: { id: 1, role: 'business' }
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    // Limpiar todos los mocks antes de cada test
    jest.clearAllMocks();
  });

  describe('getAllBusinesses', () => {
    it('debería obtener todos los negocios exitosamente', async () => {
      const mockBusinesses = [
        { id: 1, name: 'Negocio 1', category: 'Test' },
        { id: 2, name: 'Negocio 2', category: 'Test' }
      ];

      BusinessModel.getAllBusinesses.mockResolvedValue(mockBusinesses);

      await businessController.getAllBusinesses(mockRequest, mockResponse);

      expect(BusinessModel.getAllBusinesses).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        count: 2,
        data: mockBusinesses,
        message: 'Negocios obtenidos exitosamente'
      });
    });
  });

  describe('getFeaturedBusinesses', () => {
    it('debería obtener negocios destacados con límite por defecto', async () => {
      const mockBusinesses = [
        { id: 1, name: 'Negocio Destacado 1', featured: true }
      ];

      BusinessModel.getFeaturedBusinesses.mockResolvedValue(mockBusinesses);

      await businessController.getFeaturedBusinesses(mockRequest, mockResponse);

      expect(BusinessModel.getFeaturedBusinesses).toHaveBeenCalledWith(10);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        count: 1,
        data: mockBusinesses,
        message: 'Negocios destacados obtenidos exitosamente'
      });
    });

    it('debería obtener negocios destacados con límite personalizado', async () => {
      mockRequest.query.limit = '5';
      const mockBusinesses = [];

      BusinessModel.getFeaturedBusinesses.mockResolvedValue(mockBusinesses);

      await businessController.getFeaturedBusinesses(mockRequest, mockResponse);

      expect(BusinessModel.getFeaturedBusinesses).toHaveBeenCalledWith(5);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });

  describe('searchBusinesses', () => {
    it('debería buscar negocios exitosamente', async () => {
      mockRequest.query.term = 'peluquería';
      const mockBusinesses = [
        { id: 1, name: 'Peluquería Test', category: 'Belleza' }
      ];

      BusinessModel.searchBusinesses.mockResolvedValue(mockBusinesses);

      await businessController.searchBusinesses(mockRequest, mockResponse);

      expect(BusinessModel.searchBusinesses).toHaveBeenCalledWith('peluquería');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        count: 1,
        data: mockBusinesses,
        message: 'Búsqueda completada para "peluquería"'
      });
    });

    it('debería rechazar términos de búsqueda vacíos', async () => {
      mockRequest.query.term = '';

      await businessController.searchBusinesses(mockRequest, mockResponse);

      expect(BusinessModel.searchBusinesses).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Se requiere un término de búsqueda válido',
        data: null
      });
    });

    it('debería rechazar términos de búsqueda nulos', async () => {
      mockRequest.query = {};

      await businessController.searchBusinesses(mockRequest, mockResponse);

      expect(BusinessModel.searchBusinesses).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
  });

  describe('getBusinessesByCategory', () => {
    it('debería obtener negocios por categoría exitosamente', async () => {
      mockRequest.params.category = 'belleza';
      const mockBusinesses = [
        { id: 1, name: 'Spa Test', category: 'belleza' }
      ];

      BusinessModel.getBusinessesByCategory.mockResolvedValue(mockBusinesses);

      await businessController.getBusinessesByCategory(mockRequest, mockResponse);

      expect(BusinessModel.getBusinessesByCategory).toHaveBeenCalledWith('belleza');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        count: 1,
        data: mockBusinesses,
        message: 'Negocios obtenidos para la categoría "belleza"'
      });
    });

    it('debería rechazar categorías vacías', async () => {
      mockRequest.params.category = '';

      await businessController.getBusinessesByCategory(mockRequest, mockResponse);

      expect(BusinessModel.getBusinessesByCategory).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Se requiere una categoría válida',
        data: null
      });
    });
  });

  describe('getBusinessById', () => {
    it('debería obtener un negocio por ID exitosamente', async () => {
      mockRequest.params.id = '1';
      const mockBusiness = { id: 1, name: 'Negocio Test', category: 'Test' };

      BusinessModel.getBusinessById.mockResolvedValue(mockBusiness);

      await businessController.getBusinessById(mockRequest, mockResponse);

      expect(BusinessModel.getBusinessById).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockBusiness,
        message: 'Negocio obtenido exitosamente'
      });
    });

    it('debería retornar 404 si el negocio no existe', async () => {
      mockRequest.params.id = '999';
      BusinessModel.getBusinessById.mockResolvedValue(null);

      await businessController.getBusinessById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Negocio no encontrado',
        data: null
      });
    });
  });

  describe('getBusinessByUserId', () => {
    it('debería obtener el negocio del usuario exitosamente', async () => {
      const mockBusiness = { id: 1, name: 'Mi Negocio', user_id: 1 };

      BusinessModel.getBusinessByUserId.mockResolvedValue(mockBusiness);

      await businessController.getBusinessByUserId(mockRequest, mockResponse);

      expect(BusinessModel.getBusinessByUserId).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockBusiness,
        message: 'Negocio obtenido exitosamente'
      });
    });

    it('debería retornar 404 si el usuario no tiene negocio', async () => {
      BusinessModel.getBusinessByUserId.mockResolvedValue(null);

      await businessController.getBusinessByUserId(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'No se encontró un negocio asociado a este usuario',
        data: null
      });
    });
  });

  describe('createBusiness', () => {
    beforeEach(() => {
      mockRequest.body = {
        name: 'Nuevo Negocio',
        description: 'Descripción del negocio',
        category: 'Test',
        phone: '123456789',
        address: 'Dirección test'
      };
    });

    it('debería crear un negocio exitosamente', async () => {
      BusinessModel.userHasBusiness.mockResolvedValue(false);
      BusinessModel.createBusiness.mockResolvedValue(1);

      await businessController.createBusiness(mockRequest, mockResponse);

      expect(BusinessModel.userHasBusiness).toHaveBeenCalledWith(1);
      expect(BusinessModel.createBusiness).toHaveBeenCalledWith(1, {
        name: 'Nuevo Negocio',
        description: 'Descripción del negocio',
        category: 'Test',
        phone: '123456789',
        address: 'Dirección test',
        image: undefined
      });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: { businessId: 1 },
        message: 'Negocio creado exitosamente'
      });
    });

    it('debería rechazar usuarios sin rol business', async () => {
      mockRequest.user.role = 'client';

      await businessController.createBusiness(mockRequest, mockResponse);

      expect(BusinessModel.userHasBusiness).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Solo usuarios con rol de negocio pueden crear un perfil de negocio',
        data: null
      });
    });

    it('debería rechazar si el usuario ya tiene un negocio', async () => {
      BusinessModel.userHasBusiness.mockResolvedValue(true);

      await businessController.createBusiness(mockRequest, mockResponse);

      expect(BusinessModel.createBusiness).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(409);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Este usuario ya tiene un negocio registrado',
        data: null
      });
    });
  });

  describe('updateBusiness', () => {
    beforeEach(() => {
      mockRequest.params.id = '1';
      mockRequest.body = {
        name: 'Negocio Actualizado',
        description: 'Descripción actualizada'
      };
    });

    it('debería actualizar un negocio exitosamente', async () => {
      BusinessModel.isBusinessOwner.mockResolvedValue(true);
      BusinessModel.updateBusiness.mockResolvedValue();

      await businessController.updateBusiness(mockRequest, mockResponse);

      expect(BusinessModel.isBusinessOwner).toHaveBeenCalledWith(1, 1);
      expect(BusinessModel.updateBusiness).toHaveBeenCalledWith(1, {
        name: 'Negocio Actualizado',
        description: 'Descripción actualizada',
        phone: undefined,
        address: undefined,
        category: undefined,
        image: undefined
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: null,
        message: 'Negocio actualizado exitosamente'
      });
    });

    it('debería rechazar actualizaciones de usuarios no autorizados', async () => {
      BusinessModel.isBusinessOwner.mockResolvedValue(false);

      await businessController.updateBusiness(mockRequest, mockResponse);

      expect(BusinessModel.updateBusiness).not.toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'No tienes autorización para actualizar este negocio',
        data: null
      });    });
  });
});
