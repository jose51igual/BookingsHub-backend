const AuthModel = require('@models/authModel');
const UserModel = require('@models/userModel');
const BusinessModel = require('@models/businessModel');
const { generateAccessToken } = require('@middlewares/auth');
const config = require('@config/index');
const bcrypt = require('bcryptjs');
const logger = require('@utils/logger');
const { apiResponse, apiError } = require('@utils/apiResponse');

/**
 * User registration controller
 * Creates a new user account with encrypted password
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role = 'cliente', phone, businessData } = req.body;
    
    // Verificar si el email ya existe
    const existingUser = await AuthModel.findByEmail(email);    if (existingUser) {
      return apiError(res, 400, 'Email already exists', {
        details: ['A user with this email already exists']
      });
    }
      // Validar que la contraseña no sea undefined
    if (!password) {
      return apiError(res, 400, 'Password is required', {
        details: ['Password field is missing or empty']
      });
    }
    
    // Crear nuevo usuario
    const userId = await AuthModel.createUser(
      name.trim(),
      email.toLowerCase().trim(),
      password,
      role,
      phone
    );

    const user = await UserModel.findById(userId);

    let business = null;
    if (role === 'negocio' && businessData) {
      try {
        business = await BusinessModel.createBusiness(userId, {
          name: businessData.name,
          address: businessData.address,
          email: email,
          description: businessData.description || '',
          category: businessData.category,
          phone: phone || null
        });
        
      } catch (businessError) {
        logger.error('Error creating business', {
          error: businessError.message,
          userId: userId
        });
      }
    }
      // Generar token de acceso
    const accessToken = generateAccessToken(user.id, user.email, user.role);
    
    return apiResponse(res, 201, {
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.created_at,
          businessId: business?.id || null
        },
        token: accessToken
      }
    });
    
  } catch (error) {
    logger.error('Registration error occurred', {
      error: error.message,
      stack: error.stack
    });
    return apiError(res, 500, 'Internal server error during registration');
  }
};

/**
 * User login controller
 * Authenticates user and returns JWT token
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
      // Buscar usuario por email
    const user = await AuthModel.findByEmail(email);
    if (!user) {
      return apiError(res, 401, 'Invalid credentials', {
        details: ['Email or password is incorrect']
      });
    }
      // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return apiError(res, 401, 'Invalid credentials', {
        details: ['Email or password is incorrect']
      });
    }
    
    // Generate access token
    const accessToken = generateAccessToken(user.id, user.email, user.role);
    
    logger.info('Login successful', {
      userId: user.id,
      email: user.email,
      role: user.role,
      timestamp: new Date().toISOString()
    });
      return apiResponse(res, 200, {
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
    
  } catch (error) {
    logger.error('Login error occurred', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    return apiError(res, 500, 'Internal server error during login');
  }
};

/**
 * Google OAuth authentication controller
 * Handles Google Sign-In integration
 */
const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    
    logger.info('Google authentication attempt initiated', {
      timestamp: new Date().toISOString()
    });
    
    // Verificar token de Google y obtener información del usuario
    const googleUserInfo = await AuthModel.verifyGoogleToken(token);    if (!googleUserInfo) {
      return apiError(res, 400, 'Invalid Google token', {
        details: ['The provided Google token is invalid or expired']
      });
    }
    
    // Verificar si el usuario existe con este email
    let user = await AuthModel.findByEmail(googleUserInfo.email);
    
    if (!user) {
      // Crear nuevo usuario desde información de Google
      const userId = await AuthModel.createUserFromGoogle({
        name: googleUserInfo.name,
        email: googleUserInfo.email.toLowerCase().trim(),
        googleId: googleUserInfo.googleId,
        role: config.roles.USER
      });
      
      user = await UserModel.findById(userId);
    }
    
    // Generate access token
    const accessToken = generateAccessToken(user.id, user.email, user.role);
    
    logger.info('Google authentication successful', {
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString()
    });
      return apiResponse(res, 200, {
      success: true,
      message: 'Google authentication successful',
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
    
  } catch (error) {
    logger.error('Google authentication error occurred', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    return apiError(res, 500, 'Internal server error during Google authentication');
  }
};

/**
 * Token refresh controller
 * Generates new access token from valid refresh token
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
      if (!refreshToken) {
      return apiError(res, 401, 'Refresh token not provided');
    }
    
    // Verificar refresh token (implementación necesaria)
    // Por ahora, solo retornamos un nuevo token de acceso    
    return apiResponse(res, 200, {
      success: true,
      message: 'Token refreshed successfully',
      data: {
        // token: nuevoTokenDeAcceso
      }
    });
    
  } catch (error) {
    logger.error('Token refresh error occurred', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    return apiError(res, 500, 'Internal server error during token refresh');
  }
};

/**
 * Logout controller
 * Invalidates user session (for token blacklisting implementation)
 */
const logout = async (req, res) => {
  try {
    // En una aplicación real, aquí se agregaría el token a una lista negra
    logger.info('User logout initiated', {
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });    
    return apiResponse(res, 200, {
      success: true,
      message: 'Logout successful'
    });
    
  } catch (error) {
    logger.error('Logout error occurred', {
      error: error.message,
      stack: error.stack,
      userId: req.user?.id,
      timestamp: new Date().toISOString()
    });
    return apiError(res, 500, 'Internal server error during logout');
  }
};

module.exports = {
  register,
  login,
  googleAuth,
  refreshToken,
  logout
};