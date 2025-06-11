const jwt = require('jsonwebtoken');
const config = require('@config/index');
const UserModel = require('../models/userModel');
const logger = require('@utils/logger');


/**
 * Middleware de autenticación
 * Valida tokens JWT y asegura que el usuario esté autenticado
 */
const authenticateToken = async (req, res, next) => {
  try {
    logger.info('Authentication check for:', req.method, req.originalUrl);

    const authHeader = req.headers['authorization'];

    // Verificar si se proporcionan headers de autenticación
    if (!authHeader) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Headers de autenticación no proporcionados en la petición.'
        }
      });
    }

    // Verificar si el formato del token bearer es correcto
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Formato de header de autenticación inválido. Esperado: Bearer <token>'
        }
      });
    }

    const token = authHeader.split(' ')[1];

    // Verificar si se proporciona el token
    if (!token) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Token de acceso no proporcionado en la petición.'
        }
      });
    }

    // Verificar token JWT
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Verificar si el usuario existe en la base de datos
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      logger.error('User not found in database:', { decodedId: decoded.id });
      return res.status(403).json({
        status: false,
        error: {
          message: 'Token de acceso inválido proporcionado, por favor inicia sesión nuevamente.'
        }
      });
    }

    // Adjuntar información del usuario a la petición
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    };

    logger.info('User authenticated successfully:', { 
      id: user.id, 
      role: user.role, 
      email: user.email,
      url: req.originalUrl
    });
    next();

  } catch (error) {
    logger.error('Authentication failed:', error.message);

    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({
        status: false,
        error: {
          message: 'Token inválido proporcionado.'
        }
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({
        status: false,
        error: {
          message: 'El token ha expirado, por favor inicia sesión nuevamente.'
        }
      });
    }

    return res.status(500).json({
      status: false,
      error: {
        message: 'Error interno del servidor durante la autenticación.'
      }
    });
  }
};

/**
 * Middleware de autorización basado en roles
 * Verifica si el usuario tiene el/los rol(es) requerido(s)
 */
const hasRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Usuario no autenticado.'
        }
      });
    }

    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        status: false,
        error: {
          message: `Acceso denegado. Rol(es) requerido(s): ${allowedRoles.join(', ')}. Tu rol: ${userRole}`
        }
      });
    }
    logger.info(`User ${req.user.id} authorized with role: ${userRole}`);
    next();
  };
};

/**
 * Autorización de propietario de negocio
 */
const isBusinessOwner = hasRole(config.roles.BUSINESS_OWNER);

/**
 * Autorización de administrador
 */
const isAdmin = hasRole(config.roles.ADMIN);

/**
 * El usuario solo puede acceder a sus propios recursos
 */
const isOwnerOrAdmin = (req, res, next) => {
  const { userId } = req.params;
  const currentUser = req.user;

  if (currentUser.role === config.roles.ADMIN || currentUser.id == userId) {
    return next();
  }

  return res.status(403).json({
    status: false,
    error: {
      message: 'Acceso denegado. Solo puedes acceder a tus propios recursos.'
    }
  });
};

/**
 * Generar token JWT
 */
const generateAccessToken = (userId, email, role) => {
  const payload = {
    id: userId,
    email: email,
    role: role
  };

  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

module.exports = {
  authenticateToken,
  hasRole,
  isBusinessOwner,
  isAdmin,
  isOwnerOrAdmin,
  generateAccessToken
};
