const UserModel = require('@models/userModel');
const logger = require('@utils/logger');
const { apiResponse, apiError } = require('@utils/apiResponse');

/**
 * Get user profile
 * Returns current user's profile information
 */
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    logger.info(`Getting user profile for ID: ${userId}`);
    
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return apiError(res, 404, 'Usuario no encontrado');
    }
    
    const userProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      profile_image: user.profile_image,
      created_at: user.created_at
    };
    
    return apiResponse(res, 200, {
      success: true,
      data: userProfile,
      message: 'Perfil de usuario obtenido exitosamente'
    });
    
  } catch (error) {
    logger.error('Error getting user profile:', error);
    return apiError(res, 500, 'Error al obtener el perfil del usuario', error);
  }
};

/**
 * Update user profile
 * Updates current user's profile information
 */
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;
    
    logger.info(`Updating user profile for ID: ${userId}`);
    
    // Verificar que el usuario existe
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return apiError(res, 404, 'Usuario no encontrado');
    }
    
    // Actualizar el perfil
    const updated = await UserModel.updateProfile(userId, updateData);
    
    if (!updated) {
      return apiError(res, 500, 'Error al actualizar el perfil del usuario');
    }
    
    // Obtener los datos actualizados
    const updatedUser = await UserModel.findById(userId);
    
    const userProfile = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      profile_image: updatedUser.profile_image,
      updated_at: updatedUser.updated_at
    };
    
    logger.info(`User profile updated successfully for ID: ${userId}`);
    return apiResponse(res, 200, {
      success: true,
      data: userProfile,
      message: 'Perfil actualizado exitosamente'
    });
    
  } catch (error) {
    logger.error('Error updating user profile:', error);
    return apiError(res, 500, 'Error al actualizar el perfil del usuario', error);
  }
};

/**
 * Delete user account
 * Permanently deletes current user's account
 */
const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    
    logger.info(`Deleting user account for ID: ${userId}`);
    
    // Verificar que el usuario existe
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return apiError(res, 404, 'Usuario no encontrado');
    }
    
    // Eliminar la cuenta del usuario
    await UserModel.deleteAccount(userId);
    
    logger.info(`User account deleted successfully for ID: ${userId}`);
    return apiResponse(res, 200, {
      success: true,
      data: null,
      message: 'Cuenta eliminada exitosamente'
    });
    
  } catch (error) {
    logger.error('Error deleting user account:', error);
    return apiError(res, 500, 'Error al eliminar la cuenta del usuario', error);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount
};