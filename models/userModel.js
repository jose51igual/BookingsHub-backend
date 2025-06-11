const { prisma } = require('../config/prisma');
const bcrypt = require('bcryptjs');

class UserModel {
  static async findById(userId) {
    return await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true
      }
    });
  }
  
  static async findByEmail(email) {
    return await prisma.users.findUnique({
      where: { email: email }
    });
  }
  
  static async emailInUseByOtherUser(email, userId) {
    const user = await prisma.users.findFirst({
      where: {
        email: email,
        id: { not: userId }
      },
      select: { id: true }
    });
    return user !== null;
  }
  
  static async getUserPassword(userId) {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { password: true }
    });
    return user ? user.password : null;
  }
  
  static async updateProfile(userId, updateData) {
    try {
      await prisma.users.update({
        where: { id: userId },
        data: updateData
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  
  static async deleteAccount(userId) {
    try {
      await prisma.users.delete({
        where: { id: userId }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
  
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
  
  static async comparePasswords(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = UserModel;