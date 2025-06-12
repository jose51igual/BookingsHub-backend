/**
 * Archivo central de rutas
 * Registra todas las rutas de la API con sus respectivos enrutadores
 */

const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const businessRoutes = require('./businesses');
const bookingRoutes = require('./bookings');
const serviceRoutes = require('./services');
const employeeRoutes = require('./employees');
const userRoutes = require('./users');
const reviewRoutes = require('./reviews');
const analyticsRoutes = require('./analytics');

router.use('/auth', authRoutes);
router.use('/businesses', businessRoutes);
router.use('/bookings', bookingRoutes);
router.use('/services', serviceRoutes);
router.use('/employees', employeeRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;