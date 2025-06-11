/**
 * Centralized routes configuration
 * Registers all API routes with their respective routers
 */

const express = require('express');
const router = express.Router();

// Importar módulos de rutas
const authRoutes = require('./auth');
const businessRoutes = require('./businesses');
const bookingRoutes = require('./bookings');
const serviceRoutes = require('./services');
const employeeRoutes = require('./employees');
const userRoutes = require('./users');
const reviewRoutes = require('./reviews');
const analyticsRoutes = require('./analytics');

/**
 * Route registration
 * All routes are prefixed with /api (handled in app.js)
 */

// Authentication routes
router.use('/auth', authRoutes);

// Rutas de negocios
router.use('/businesses', businessRoutes);

// Rutas de reservas
router.use('/bookings', bookingRoutes);

// Rutas de servicios
router.use('/services', serviceRoutes);

// Rutas de empleados
router.use('/employees', employeeRoutes);

// Rutas de usuarios
router.use('/users', userRoutes);

// Rutas de reseñas
router.use('/reviews', reviewRoutes);

// Rutas de analíticas
router.use('/analytics', analyticsRoutes);

module.exports = router;
