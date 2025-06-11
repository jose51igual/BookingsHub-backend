const { prisma } = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const { SECRET_KEY } = require('../middlewares/auth');

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
    
    // Convertir phone a entero si es un string
    const phoneInt = phone ? parseInt(phone, 10) : null;
    
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
        phone: phoneInt
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
    // Generar una contraseña aleatoria que no será usada
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
}

module.exports = AuthModel;