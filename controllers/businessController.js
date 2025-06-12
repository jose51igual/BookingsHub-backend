const BusinessModel = require('@models/businessModel');
const config = require('@config/index');
const { apiResponse, apiError } = require('../utils/apiResponse');
const logger = require('@utils/logger');

/**
 * @desc    Get all businesses
 * @route   GET /api/businesses
 * @access  Public
 */
const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await BusinessModel.getAllBusinesses();
    
    return apiResponse(res, 200, {
      success: true,
      count: businesses.length,
      data: businesses,
      message: 'Negocios obtenidos exitosamente'
    });
  } catch (error) {
    logger.error('Error en getAllBusinesses:', error);
    return apiError(res, 500, 'Error interno del servidor', error);
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
    
    return apiResponse(res, 200, {
      success: true,
      count: businesses.length,
      data: businesses,
      message: 'Negocios destacados obtenidos exitosamente'
    });
  } catch (error) {
    logger.error('Error en getFeaturedBusinesses:', error);
    return apiError(res, 500, 'Error interno del servidor', error);
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
      return apiError(res, 400, 'Se requiere un término de búsqueda válido');
    }
    
    const businesses = await BusinessModel.searchBusinesses(term.trim());
    
    return apiResponse(res, 200, {
      success: true,
      count: businesses.length,
      data: businesses,
      message: `Búsqueda completada para "${term}"`
    });
  } catch (error) {
    logger.error('Error en searchBusinesses:', error);
    return apiError(res, 500, 'Error interno del servidor', error);
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
      return apiError(res, 400, 'Se requiere una categoría válida');
    }
    
    const businesses = await BusinessModel.getBusinessesByCategory(category.trim());
    
    return apiResponse(res, 200, {
      success: true,
      count: businesses.length,
      data: businesses,
      message: `Negocios obtenidos para la categoría "${category}"`
    });
  } catch (error) {
    logger.error('Error en getBusinessesByCategory:', error);
    return apiError(res, 500, 'Error interno del servidor', error);
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
      return apiError(res, 404, 'No se encontró un negocio asociado a este usuario');
    }
    
    return apiResponse(res, 200, {
      success: true,
      data: business,
      message: 'Negocio obtenido exitosamente'
    });
  } catch (error) {
    logger.error('Error en getBusinessByUserId:', error);
    return apiError(res, 500, 'Error interno del servidor', error);
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
      return apiError(res, 404, 'Negocio no encontrado');
    }
    
    return apiResponse(res, 200, {
      success: true,
      data: business,
      message: 'Negocio obtenido exitosamente'
    });
  } catch (error) {
    logger.error('Error en getBusinessById:', error);
    return apiError(res, 500, 'Error interno del servidor', error);
  }
};

/**
 * @desc    Create a new business
 * @route   POST /api/businesses
 * @access  Private (Business role only)
 */
const createBusiness = async (req, res) => {
  try {    // Verificar rol de usuario
    if (req.user.role !== config.USER_ROLES.BUSINESS) {
      return apiError(res, 403, 'Solo usuarios con rol de negocio pueden crear un perfil de negocio');
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
      return apiError(res, 400, 'Nombre, descripción y categoría son campos requeridos');
    }
    
    // Verificar si el usuario ya tiene un negocio
    const hasBusiness = await BusinessModel.userHasBusiness(req.user.id);
      if (hasBusiness) {
      return apiError(res, 409, 'Este usuario ya tiene un negocio registrado');
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
      }    );
    
    return apiResponse(res, 201, {
      success: true,
      data: { businessId },
      message: 'Negocio creado exitosamente'
    });
  } catch (error) {
    logger.error('Error en createBusiness:', error);
    return apiError(res, 500, 'Error interno del servidor', error);
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

    const isOwner = await BusinessModel.isBusinessOwner(businessId, req.user.id);    if (!isOwner) {
      return apiError(res, 403, 'No tienes autorización para actualizar este negocio');
    }
    
    const { 
      name, 
      description, 
      phone, 
      address,
      category,
      image
    } = req.body;    if (!name || !description) {
      return apiError(res, 400, 'Nombre y descripción son campos requeridos');
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
      }    );
    
    return apiResponse(res, 200, {
      success: true,
      data: null,
      message: 'Negocio actualizado exitosamente'
    });
  } catch (error) {
    logger.error('Error en updateBusiness:', error);
    return apiError(res, 500, 'Error interno del servidor', error);
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
      return apiError(res, 403, 'No tienes autorización para ver las reservas de este negocio');
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
      return apiResponse(res, 200, {
      success: true,
      count: recentBookings.length,
      data: recentBookings,
      message: 'Reservas recientes obtenidas exitosamente'
    });
  } catch (error) {
    logger.error('Error en getRecentBookings:', error);
    return apiError(res, 500, 'Error interno del servidor', error);
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
    const isOwner = await BusinessModel.isBusinessOwner(businessId, req.user.id);    if (!isOwner) {
      return apiError(res, 403, 'No tienes autorización para ver las estadísticas de este negocio');
    }

    // TODO: Implementar método en BusinessModel para obtener estadísticas semanales
    const weeklyStats = await BusinessModel.getWeeklyStats(businessId);

    return apiResponse(res, 200, {
      success: true,
      data: weeklyStats,
      message: 'Estadísticas semanales obtenidas exitosamente'
    });
  } catch (error) {
    logger.error('Error en getWeeklyStats:', error);
    return apiError(res, 500, 'Error interno del servidor', error);
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