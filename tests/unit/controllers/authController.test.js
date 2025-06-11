/**
 * Tests unitarios para authController
 */

const authController = require('@controllers/authController');
const AuthModel = require('@models/authModel');
const UserModel = require('@models/userModel');
const { generateAccessToken } = require('@middlewares/auth');
const bcrypt = require('bcryptjs');
const { validUser, invalidUsers, userLoginCredentials } = require('@tests/fixtures/users');

// Mock de las dependencias
jest.mock('@models/authModel');
jest.mock('@models/userModel');
jest.mock('@middlewares/auth');
jest.mock('bcryptjs');
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

    // Limpiar mocks
    jest.clearAllMocks();
  });

  describe('register', () => {
    test('debería registrar un usuario exitosamente', async () => {
      // Arrange
      req.body = validUser;
      const hashedPassword = 'hashedPassword123';
      const userId = 1;
      const createdUser = { id: userId, ...validUser };
      const accessToken = 'jwt-token-123';

      AuthModel.findByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue(hashedPassword);
      AuthModel.createUser.mockResolvedValue(userId);
      UserModel.findById.mockResolvedValue(createdUser);
      generateAccessToken.mockReturnValue(accessToken);

      // Act
      await authController.register(req, res);

      // Assert
      expect(AuthModel.findByEmail).toHaveBeenCalledWith(validUser.email.toLowerCase().trim());
      expect(bcrypt.hash).toHaveBeenCalledWith(validUser.password, 10);
      expect(AuthModel.createUser).toHaveBeenCalledWith({
        name: validUser.name.trim(),
        email: validUser.email.toLowerCase().trim(),
        password: hashedPassword,
        role: validUser.role
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: 1,
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            role: 'cliente',
            created_at: undefined
          },
          token: accessToken
        }
      });
    });

    test('debería fallar si el email ya existe', async () => {
      // Arrange
      req.body = validUser;
      const existingUser = { id: 1, email: validUser.email };

      AuthModel.findByEmail.mockResolvedValue(existingUser);

      // Act
      await authController.register(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Email already exists',
          details: ['A user with this email already exists']
        }
      });
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(AuthModel.createUser).not.toHaveBeenCalled();
    });

    test('debería manejar errores de base de datos', async () => {
      // Arrange
      req.body = validUser;
      const dbError = new Error('Database connection failed');

      AuthModel.findByEmail.mockRejectedValue(dbError);

      // Act
      await authController.register(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Internal server error during registration'
        }
      });
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
      await authController.login(req, res);

      // Assert
      expect(AuthModel.findByEmail).toHaveBeenCalledWith(userLoginCredentials.valid.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(userLoginCredentials.valid.password, user.password);
      expect(generateAccessToken).toHaveBeenCalledWith(user.id, user.email, user.role);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
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

      AuthModel.findByEmail.mockResolvedValue(null);

      // Act
      await authController.login(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Invalid credentials',
          details: ['Email or password is incorrect']
        }
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
      bcrypt.compare.mockResolvedValue(false);

      // Act
      await authController.login(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Invalid credentials',
          details: ['Email or password is incorrect']
        }
      });
      expect(generateAccessToken).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    test('debería hacer logout exitosamente', async () => {
      // Act
      await authController.logout(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Logout successful'
      });
    });

    test('debería manejar errores durante logout', async () => {
      // Arrange - mock logger para lanzar una excepción
      const logger = require('@utils/logger');
      logger.info.mockImplementation(() => {
        throw new Error('Logger error');
      });

      // Act
      await authController.logout(req, res);

      // Assert - debería manejar el error y retornar 500
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          message: 'Internal server error during logout'
        }
      });
    });
  });
});
