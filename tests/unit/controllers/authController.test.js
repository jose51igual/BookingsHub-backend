/**
 * Tests unitarios para authController
 */

const authController = require('@controllers/authController');
const AuthModel = require('@models/authModel');
const UserModel = require('@models/userModel');
const { generateAccessToken } = require('@middlewares/auth');
const bcrypt = require('bcryptjs');
const { apiResponse, apiError } = require('@utils/apiResponse');
const { validUser, invalidUsers, userLoginCredentials } = require('@tests/fixtures/users');

// Mock de las dependencias
jest.mock('@models/authModel');
jest.mock('@models/userModel');
jest.mock('@middlewares/auth');
jest.mock('bcryptjs');
jest.mock('@utils/apiResponse');
jest.mock('@utils/logger');

describe('AuthController', () => {
  let req, res;
  beforeEach(() => {
    req = {
      body: {},
      user: { id: 1, email: 'test@example.com', role: 'cliente' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    // Configurar mocks para apiResponse y apiError
    apiResponse.mockImplementation((res, statusCode, data) => {
      res.status(statusCode).json(data);
    });
    
    apiError.mockImplementation((res, statusCode, message, error) => {
      res.status(statusCode).json({
        success: false,
        message,
        data: null
      });
    });

    // Limpiar mocks
    jest.clearAllMocks();
  });

  describe('register', () => {    test('debería registrar un usuario exitosamente', async () => {
      // Arrange
      req.body = validUser;
      const hashedPassword = 'hashedPassword123';
      const userId = 1;
      const createdUser = { id: userId, ...validUser };
      const accessToken = 'jwt-token-123';

      AuthModel.findByEmail.mockResolvedValue(null);
      AuthModel.createUser.mockResolvedValue(userId);
      UserModel.findById.mockResolvedValue(createdUser);
      generateAccessToken.mockReturnValue(accessToken);      // Act
      await authController.register(req, res);

      // Assert
      expect(AuthModel.findByEmail).toHaveBeenCalledWith(validUser.email.toLowerCase().trim());
      expect(AuthModel.createUser).toHaveBeenCalledWith(
        validUser.name.trim(),
        validUser.email.toLowerCase().trim(),
        validUser.password,
        validUser.role,
        undefined
      );
      expect(apiResponse).toHaveBeenCalledWith(res, 201, {
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            role: 'cliente',
            created_at: undefined,
            businessId: null
          },
          token: accessToken
        }
      });
    });

    test('debería fallar si el email ya existe', async () => {
      // Arrange
      req.body = validUser;
      const existingUser = { id: 1, email: validUser.email };

      AuthModel.findByEmail.mockResolvedValue(existingUser);      // Act
      await authController.register(req, res);

      // Assert
      expect(apiError).toHaveBeenCalledWith(res, 400, 'Email already exists', expect.any(Object));
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(AuthModel.createUser).not.toHaveBeenCalled();
    });

    test('debería manejar errores de base de datos', async () => {
      // Arrange
      req.body = validUser;
      const dbError = new Error('Database connection failed');

      AuthModel.findByEmail.mockRejectedValue(dbError);      // Act
      await authController.register(req, res);      // Assert
      expect(apiError).toHaveBeenCalledWith(res, 500, 'Internal server error during registration');
    });
  });

  describe('login', () => {
    test('debería hacer login exitosamente', async () => {
      // Arrange
      req.body = userLoginCredentials.valid;
      const user = {
        id: 1,
        email: userLoginCredentials.valid.email,
        password: 'hashedPassword',
        role: 'cliente'
      };
      const accessToken = 'jwt-token-123';

      AuthModel.findByEmail.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      generateAccessToken.mockReturnValue(accessToken);

      // Act
      await authController.login(req, res);      // Assert
      expect(AuthModel.findByEmail).toHaveBeenCalledWith(userLoginCredentials.valid.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(userLoginCredentials.valid.password, user.password);
      expect(generateAccessToken).toHaveBeenCalledWith(user.id, user.email, user.role);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          },
          token: accessToken
        }
      });
    });

    test('debería fallar con email inexistente', async () => {
      // Arrange
      req.body = userLoginCredentials.invalidEmail;

      AuthModel.findByEmail.mockResolvedValue(null);      // Act
      await authController.login(req, res);      // Assert
      expect(apiError).toHaveBeenCalledWith(res, 401, 'Invalid credentials', {
        details: ['Email or password is incorrect']
      });
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    test('debería fallar con contraseña incorrecta', async () => {
      // Arrange
      req.body = userLoginCredentials.invalidPassword;
      const user = {
        id: 1,
        email: userLoginCredentials.invalidPassword.email,
        password: 'hashedPassword',
        role: 'cliente'
      };

      AuthModel.findByEmail.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);      // Act
      await authController.login(req, res);      // Assert
      expect(apiError).toHaveBeenCalledWith(res, 401, 'Invalid credentials', {
        details: ['Email or password is incorrect']
      });
      expect(generateAccessToken).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    test('debería hacer logout exitosamente', async () => {      // Act
      await authController.logout(req, res);

      // Assert
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        message: 'Logout successful'
      });
    });

    test('debería manejar errores durante logout', async () => {
      // Arrange - mock logger para lanzar una excepción
      const logger = require('@utils/logger');
      logger.info.mockImplementation(() => {
        throw new Error('Logger error');
      });      // Act
      await authController.logout(req, res);      // Assert - debería manejar el error y retornar 500
      expect(apiError).toHaveBeenCalledWith(res, 500, 'Internal server error during logout');
    });
  });
});
