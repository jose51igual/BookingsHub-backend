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
 * Google OAuth
 * Gestiona la autenticación de usuarios a través de Google
 */
const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    
    logger.info('Google authentication attempt initiated', {
      timestamp: new Date().toISOString()
    });
    
    // Verificar token de Google y obtener información del usuario
    const googleUserInfo = await AuthModel.verifyGoogleToken(token);    
    if (!googleUserInfo) {
      return apiError(res, 400, 'Invalid Google token', {
        details: ['The provided Google token is invalid or expired']
      });
    }
    
    // Verificar si el usuario existe con este email
    let user = await AuthModel.findByEmail(googleUserInfo.email);
    
    if (!user) {
      // Crear nuevo usuario desde información de Google
      const userId = await AuthModel.createUserFromGoogle(
        googleUserInfo.name,
        googleUserInfo.email.toLowerCase().trim(),
        googleUserInfo.googleId,
        'cliente'
      );
      
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
 * Google OAuth - Iniciar autenticación
 * Redirige al usuario a Google para autorización
 */
const googleLogin = async (req, res) => {
  try {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&` +
      `response_type=code&` +
      `scope=openid email profile&` +
      `access_type=offline`;

    logger.info('Redirecting to Google OAuth', {
      timestamp: new Date().toISOString()
    });

    res.redirect(googleAuthUrl);
  } catch (error) {
    logger.error('Error initiating Google OAuth:', error);
    return apiError(res, 500, 'Internal server error', {
      details: ['Error al iniciar la autenticación con Google']
    });
  }
};

/**
 * Google OAuth - Callback
 * Procesa el código de autorización de Google
 */
const googleCallback = async (req, res) => {
  try {
    const { code, error } = req.query;

    if (error) {
      logger.error('Google OAuth error:', error);
      return res.redirect(`${process.env.FRONTEND_URL}/auth/error?error=${error}`);
    }

    if (!code) {
      return res.redirect(`${process.env.FRONTEND_URL}/auth/error?error=no_code`);
    }

    logger.info('Processing Google OAuth callback', {
      timestamp: new Date().toISOString()
    });

    // Intercambiar código por tokens
    const googleUserInfo = await AuthModel.exchangeCodeForUserInfo(code);
    
    if (!googleUserInfo) {
      return res.redirect(`${process.env.FRONTEND_URL}/auth/error?error=invalid_code`);
    }

    // Verificar si el usuario existe
    let user = await AuthModel.findByEmail(googleUserInfo.email);
    
    if (!user) {
      // Crear nuevo usuario desde información de Google
      const userId = await AuthModel.createUserFromGoogle(
        googleUserInfo.name,
        googleUserInfo.email.toLowerCase().trim(),
        googleUserInfo.googleId,
        'cliente'
      );
      
      user = await UserModel.findById(userId);
    }

    // Generar token JWT
    const accessToken = generateAccessToken(user.id, user.email, user.role);
    
    logger.info('Google authentication successful via callback', {
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString()
    });

    // Redirigir al frontend con el token
    const frontendUrl = `${process.env.FRONTEND_URL}/auth/success?token=${accessToken}&user=${encodeURIComponent(JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }))}`;

    res.redirect(frontendUrl);

  } catch (error) {
    logger.error('Error in Google OAuth callback:', error);
    res.redirect(`${process.env.FRONTEND_URL}/auth/error?error=server_error`);
  }
};

/**
 * Genera un nuevo token de acceso utilizando el refresh token
 */
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
      if (!refreshToken) {
      return apiError(res, 401, 'Refresh token not provided');
    }

    const nuevoTokenDeAcceso = generateAccessToken(req.user.id, req.user.email, req.user.role);

    return apiResponse(res, 200, {
      success: true,
      message: 'Token refreshed successfully',
      data: {
        token: nuevoTokenDeAcceso
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
 * Cerrar sesión del usuario
 */
const logout = async (req, res) => {
  try {
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
  googleLogin,
  googleCallback,
  refreshToken,
  logout
};