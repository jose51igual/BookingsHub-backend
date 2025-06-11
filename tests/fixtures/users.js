/**
 * Datos de prueba para usuarios
 */

const validUser = {
  name: 'Juan Pérez',
  email: 'juan.perez@example.com',
  password: 'Password123!',
  role: 'cliente'
};

const validBusinessUser = {
  name: 'María García',
  email: 'maria.garcia@business.com',
  password: 'BusinessPass123!',
  role: 'negocio'
};

const validAdminUser = {
  name: 'Admin User',
  email: 'admin@bookingshub.com',
  password: 'AdminPass123!',
  role: 'admin'
};

const invalidUsers = {
  missingName: {
    email: 'test@example.com',
    password: 'Password123!',
    role: 'cliente'
  },
  invalidEmail: {
    name: 'Test User',
    email: 'invalid-email',
    password: 'Password123!',
    role: 'cliente'
  },
  weakPassword: {
    name: 'Test User',
    email: 'test@example.com',
    password: '123',
    role: 'cliente'
  },
  invalidRole: {
    name: 'Test User',
    email: 'test@example.com',
    password: 'Password123!',
    role: 'invalid-role'
  }
};

const userLoginCredentials = {
  valid: {
    email: 'juan.perez@example.com',
    password: 'Password123!'
  },
  invalidEmail: {
    email: 'nonexistent@example.com',
    password: 'Password123!'
  },
  invalidPassword: {
    email: 'juan.perez@example.com',
    password: 'WrongPassword'
  }
};

module.exports = {
  validUser,
  validBusinessUser,
  validAdminUser,
  invalidUsers,
  userLoginCredentials
};
