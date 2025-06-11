const BusinessModel = require('@models/businessModel');
const config = require('@config/index');
const { apiResponse, apiError } = require('../utils/apiResponse');

/**
 * @desc    Get all businesses
 * @route   GET /api/businesses
 * @access  Public
 */
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await BusinessModel.getAllBusinesses();
    
    res.status(200).json({
      success: true,
      count: businesses.length,
      data: businesses,
      message: 'Negocios obtenidos exitosamente'
    });
  } catch (error) {
    logger.error('Error en getAllBusinesses:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: config.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get featured businesses
 * @route   GET /api/businesses/featured
 * @access  Public
 */
const getFeaturedBusinesses = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || config.DEFAULT_PAGINATION_LIMIT;
    const businesses = await BusinessModel.getFeaturedBusinesses(limit);
    
    res.status(200).json({
      success: true,
      count: businesses.length,
      data: businesses,
      message: 'Negocios destacados obtenidos exitosamente'
    });
  } catch (error) {
    logger.error('Error en getFeaturedBusinesses:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: config.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Search businesses
 * @route   GET /api/businesses/search
 * @access  Public
 */
const searchBusinesses = async (req, res) => {
  try {
    const { term } = req.query;
    
    if (!term || term.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere un término de búsqueda válido',
        data: null
      });
    }
    
    const businesses = await BusinessModel.searchBusinesses(term.trim());
    
    res.status(200).json({
      success: true,
      count: businesses.length,
      data: businesses,
      message: `Búsqueda completada para "${term}"`
    });
  } catch (error) {
    logger.error('Error en searchBusinesses:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: config.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get businesses by category
 * @route   GET /api/businesses/category/:category
 * @access  Public
 */
const getBusinessesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    if (!category || category.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere una categoría válida',
        data: null
      });
    }
    
    const businesses = await BusinessModel.getBusinessesByCategory(category.trim());
    
    res.status(200).json({
      success: true,
      count: businesses.length,
      data: businesses,
      message: `Negocios obtenidos para la categoría "${category}"`
    });
  } catch (error) {
    logger.error('Error en getBusinessesByCategory:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: config.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get current user's business
 * @route   GET /api/businesses/my-business
 * @access  Private (Business owners)
 */
const getBusinessByUserId = async (req, res) => {
  try {
    const business = await BusinessModel.getBusinessByUserId(req.user.id);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró un negocio asociado a este usuario',
        data: null
      });
    }
    
    res.status(200).json({
      success: true,
      data: business,
      message: 'Negocio obtenido exitosamente'
    });
  } catch (error) {
    logger.error('Error en getBusinessByUserId:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: config.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get business by ID
 * @route   GET /api/businesses/:id
 * @access  Public
 */
const getBusinessById = async (req, res) => {
  try {
    const businessId = parseInt(req.params.id);
    const business = await BusinessModel.getBusinessById(businessId);
    
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Negocio no encontrado',
        data: null
      });
    }
    
    res.status(200).json({
      success: true,
      data: business,
      message: 'Negocio obtenido exitosamente'
    });
  } catch (error) {
    logger.error('Error en getBusinessById:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: config.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Create a new business
 * @route   POST /api/businesses
 * @access  Private (Business role only)
 */
const createBusiness = async (req, res) => {
  try {
    // Verificar rol de usuario
    if (req.user.role !== config.USER_ROLES.BUSINESS) {
      return res.status(403).json({
        success: false,
        message: 'Solo usuarios con rol de negocio pueden crear un perfil de negocio',
        data: null
      });
    }
    
    const { 
      name, 
      description, 
      phone, 
      address,
      category,
      image
    } = req.body;
    
    // Validar campos requeridos
    if (!name || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, descripción y categoría son campos requeridos',
        data: null
      });
    }
    
    // Verificar si el usuario ya tiene un negocio
    const hasBusiness = await BusinessModel.userHasBusiness(req.user.id);
    
    if (hasBusiness) {
      return res.status(409).json({
        success: false,
        message: 'Este usuario ya tiene un negocio registrado',
        data: null
      });
    }
    
    // Crear nuevo negocio
    const businessId = await BusinessModel.createBusiness(
      req.user.id, 
      {
        name: name.trim(),
        description: description.trim(),
        phone: phone?.trim(),
        address: address?.trim(),
        category: category.trim(),
        image: image?.trim()
      }
    );
    
    res.status(201).json({
      success: true,
      data: { businessId },
      message: 'Negocio creado exitosamente'
    });
  } catch (error) {
    logger.error('Error en createBusiness:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: config.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Update a business
 * @route   PUT /api/businesses/:id
 * @access  Private (Business owner only)
 */
const updateBusiness = async (req, res) => {
  try {
    const businessId = parseInt(req.params.id);

    const isOwner = await BusinessModel.isBusinessOwner(businessId, req.user.id);

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: 'No tienes autorización para actualizar este negocio',
        data: null
      });
    }
    
    const { 
      name, 
      description, 
      phone, 
      address,
      category,
      image
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y descripción son campos requeridos',
        data: null
      });
    }
    
    await BusinessModel.updateBusiness(
      businessId, 
      {
        name: name.trim(),
        description: description.trim(),
        phone: phone?.trim(),
        address: address?.trim(),
        category: category?.trim(),
        image: image?.trim()
      }
    );
    
    res.status(200).json({
      success: true,
      data: null,
      message: 'Negocio actualizado exitosamente'
    });
  } catch (error) {
    logger.error('Error en updateBusiness:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: config.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get recent bookings for a business
 * @route   GET /api/businesses/:id/bookings/recent
 * @access  Private (Business owner only)
 */
const getRecentBookings = async (req, res) => {
  try {
    const businessId = parseInt(req.params.id);
    const userId = req.user.id;
    
    logger.info('🔍 getRecentBookings called', {
      businessId,
      userId,
      route: req.originalUrl,
      method: req.method
    });
    
    // Verificar que el usuario sea propietario del negocio
    const isOwner = await BusinessModel.isBusinessOwner(businessId, req.user.id);
    
    logger.info('🔍 Business owner check', {
      businessId,
      userId,
      isOwner
    });
    
    if (!isOwner) {
      logger.warn('🚫 Unauthorized access to business bookings', {
        businessId,
        userId
      });
      return res.status(403).json({
        success: false,
        message: 'No tienes autorización para ver las reservas de este negocio',
        data: null
      });
    }

    logger.info('📚 Calling BusinessModel.getRecentBookings', {
      businessId
    });
    
    const recentBookings = await BusinessModel.getRecentBookings(businessId);

    logger.info('✅ Recent bookings retrieved successfully', {
      businessId,
      count: recentBookings.length,
      bookings: recentBookings.slice(0, 2).map(b => ({
        id: b.id,
        customer: b.customer_name,
        service: b.service_name,
        date: b.booking_date
      }))
    });
    
    res.status(200).json({
      success: true,
      count: recentBookings.length,
      data: recentBookings,
      message: 'Reservas recientes obtenidas exitosamente'
    });
  } catch (error) {
    logger.error('Error en getRecentBookings:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: config.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * @desc    Get weekly stats for a business
 * @route   GET /api/businesses/:id/stats/weekly
 * @access  Private (Business owner only)
 */
const getWeeklyStats = async (req, res) => {
  try {
    const businessId = parseInt(req.params.id);
    
    // Verificar que el usuario sea propietario del negocio
    const isOwner = await BusinessModel.isBusinessOwner(businessId, req.user.id);
    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: 'No tienes autorización para ver las estadísticas de este negocio',
        data: null
      });
    }

    // TODO: Implementar método en BusinessModel para obtener estadísticas semanales
    const weeklyStats = await BusinessModel.getWeeklyStats(businessId);

    res.status(200).json({
      success: true,
      data: weeklyStats,
      message: 'Estadísticas semanales obtenidas exitosamente'
    });
  } catch (error) {
    logger.error('Error en getWeeklyStats:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: config.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getAllBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  getBusinessesByCategory,
  searchBusinesses,
  getFeaturedBusinesses,
  getBusinessByUserId,
  getRecentBookings,
  getWeeklyStats
};