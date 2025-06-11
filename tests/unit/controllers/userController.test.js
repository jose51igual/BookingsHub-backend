const UserController = require('@controllers/userController');
const { generateValidToken } = require('@tests/helpers/testHelpers');
const { apiResponse, apiError } = require('@utils/apiResponse');

// Mock de las dependencias
jest.mock('@models/userModel');
jest.mock('@utils/logger');
jest.mock('@utils/apiResponse');

describe('UserController', () => {
  let req, res;
  const UserModel = require('@models/userModel');

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Setup req and res mocks
    req = {
      user: { id: 1, role: 'cliente' },
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Mock apiResponse y apiError
    apiResponse.mockImplementation((res, status, data) => {
      res.status(status);
      return res.json(data);
    });

    apiError.mockImplementation((res, status, message, error) => {
      res.status(status);
      return res.json({
        success: false,
        message,
        data: null
      });
    });

    // Mock UserModel methods
    UserModel.findById = jest.fn();
    UserModel.updateProfile = jest.fn();
    UserModel.deleteUser = jest.fn();
  });

  describe('getUserProfile', () => {
    it('debería obtener el perfil del usuario autenticado', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        phone: '+34 666 777 888',
        role: 'cliente'
      };

      UserModel.findById.mockResolvedValue(mockUser);

      // Act
      await UserController.getUserProfile(req, res);

      // Assert
      expect(UserModel.findById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('debería manejar usuario no encontrado', async () => {
      // Arrange
      UserModel.findById.mockResolvedValue(null);

      // Act
      await UserController.getUserProfile(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
