const { prisma } = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const { SECRET_KEY } = require('../middlewares/auth');
const logger = require('../utils/logger');

// Crear un cliente OAuth2 para verificar tokens de Google
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthModel {
  // Verificar si un email ya existe en la base de datos
  static async emailExists(email) {
    const user = await prisma.users.findUnique({
      where: { email: email }
    });
    return user !== null;
  }
  
  // Crear un nuevo usuario
  static async createUser(name, email, password, role, phone = null) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
        phone: phone
      }
    });
    
    return user.id;
  }
  
  // Buscar usuario por email
  static async findByEmail(email) {
    return await prisma.users.findUnique({
      where: { email: email }
    });
  }
  
  // Buscar usuario por ID
  static async findById(id) {
    return await prisma.users.findUnique({
      where: { id: id }
    });
  }
  
  // Verificar contraseña
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
  
  // Generar token JWT
  static generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
  }
  
  // Verificar token de Google
  static async verifyGoogleToken(token) {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      
      const payload = ticket.getPayload();
      
      return {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      };
    } catch (error) {
      logger.error('Error al verificar token de Google:', error);
      return null;
    }
  }
  
  // Crear usuario desde datos de Google
  static async createUserFromGoogle(name, email, googleId, role) {
    const randomPassword = crypto.randomBytes(16).toString('hex');
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        google_id: googleId,
        role: role
      }
    });
    
    return user.id;
  }

  // Actualizar contraseña del usuario
  static async updatePassword(userId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.users.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });
    
    return true;
  }
  // Intercambiar código de Google por información del usuario
  static async exchangeCodeForUserInfo(code) {
    try {
      logger.info('Exchanging Google authorization code', {
        codeLength: code.length,
        redirectUri: process.env.GOOGLE_REDIRECT_URI
      });

      // Intercambiar código por tokens
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        }),
      });

      const tokens = await response.json();

      if (!response.ok) {
        logger.error('Google token exchange failed:', {
          status: response.status,
          statusText: response.statusText,
          error: tokens
        });
        return null;
      }

      if (!tokens.access_token) {
        logger.error('No access token received from Google:', tokens);
        return null;
      }

      logger.info('Successfully obtained Google access token');

      // Obtener información del usuario con el access token
      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      const userInfo = await userResponse.json();

      if (!userResponse.ok) {
        logger.error('Failed to get user info from Google:', {
          status: userResponse.status,
          statusText: userResponse.statusText,
          error: userInfo
        });
        return null;
      }

      if (!userInfo.id) {
        logger.error('Invalid user info received from Google:', userInfo);
        return null;
      }

      logger.info('Successfully obtained Google user info', {
        userId: userInfo.id,
        email: userInfo.email
      });

      return {
        googleId: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture
      };

    } catch (error) {
      logger.error('Error exchanging code for user info:', error);
      return null;
    }
  }
}

module.exports = AuthModel;