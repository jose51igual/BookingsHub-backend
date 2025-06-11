const { prisma } = require('../config/prisma');

class ServiceModel {
  // Obtener todos los servicios de un negocio
  static async getBusinessServices(businessId) {
    // Validar que businessId esté presente y sea válido
    if (!businessId) {
      throw new Error('businessId es requerido');
    }

    const parsedBusinessId = parseInt(businessId);
    if (isNaN(parsedBusinessId)) {
      throw new Error('businessId debe ser un número válido');
    }

    const services = await prisma.services.findMany({
      where: { 
        business_id: parsedBusinessId
      },
      select: {
        id: true,
        business_id: true,
        name: true,
        description: true,
        duration_minutes: true,
        price: true,
        category: true,
        created_at: true
      },
      orderBy: { 
        name: 'asc' 
      }
    });
    
    // Mapear duration_minutes a duration para mantener compatibilidad
    return services.map(service => ({
      ...service,
      duration: service.duration_minutes
    }));
  }
  
  // Obtener un servicio por ID
  static async getServiceById(id) {
    const service = await prisma.services.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        business_id: true,
        name: true,
        description: true,
        duration_minutes: true,
        price: true,
        category: true,
        created_at: true
      }
    });
    
    if (!service) return null;
    
    return {
      ...service,
      duration: service.duration_minutes
    };
  }
  
  // Verificar si un usuario es dueño de un negocio
  static async isBusinessOwner(businessId, userId) {
    const business = await prisma.businesses.findFirst({
      where: {
        id: parseInt(businessId),
        user_id: parseInt(userId)
      }
    });
    return business !== null;
  }
  
  // Crear un nuevo servicio
  static async createService(businessId, name, description, duration, price, category) {
    const service = await prisma.services.create({
      data: {
        business_id: parseInt(businessId),
        name,
        description,
        duration_minutes: parseInt(duration),
        price: parseFloat(price),
        category
      }
    });
    return service.id;
  }
  
  // Verificar si un usuario es dueño del negocio que posee este servicio
  static async isServiceOwner(serviceId, userId) {
    const service = await prisma.services.findUnique({
      where: { id: parseInt(serviceId) },
      include: {
        businesses: {
          select: {
            user_id: true
          }
        }
      }
    });
    
    return service && service.businesses.user_id === parseInt(userId);
  }
  
  // Actualizar un servicio
  static async updateService(serviceId, name, description, duration, price, category) {
    await prisma.services.update({
      where: { id: parseInt(serviceId) },
      data: {
        name,
        description,
        duration_minutes: parseInt(duration),
        price: parseFloat(price),
        category
      }
    });
    return true;
  }
  
  // Eliminar un servicio
  static async deleteService(serviceId) {
    await prisma.services.delete({
      where: { id: parseInt(serviceId) }
    });
    return true;
  }
}

module.exports = ServiceModel;