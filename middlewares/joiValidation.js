const Joi = require('joi');
const config = require('@config/index');

/**
 * Middleware para validar requests usando Joi
 * @param {Object} schema - Esquema de validación de Joi
 * @param {string} source - Fuente de datos a validar ('body', 'query', 'params')
 */
const validateRequest = (schema, source = 'body') => {
  return (req, res, next) => {
    const dataToValidate = req[source];
    
    // 🔍 DEBUG: Log para verificar datos de entrada
    console.log(`🔍 [DEBUG] Validando ${source}:`, JSON.stringify(dataToValidate, null, 2));
    
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false, // Retorna todos los errores, no solo el primero
      allowUnknown: false, // No permite campos adicionales
      stripUnknown: true // Remueve campos desconocidos
    });

    if (error) {
      // 🔍 DEBUG: Log para verificar errores de validación
      console.log('❌ [DEBUG] Errores de validación:', error.details);
      
      const errorMessages = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      console.log('❌ [DEBUG] Errores formateados:', errorMessages);

      return res.status(400).json({
        success: false,
        message: 'Errores de validación en los datos enviados',
        errors: errorMessages,
        data: null
      });
    }

    // 🔍 DEBUG: Log para verificar datos validados
    console.log(`✅ [DEBUG] Datos validados ${source}:`, JSON.stringify(value, null, 2));

    // Reemplazar los datos originales con los validados y sanitizados
    req[source] = value;
    next();
  };
};

// Esquemas de validación comunes
const commonSchemas = {
  // Validación de ID de parámetros
  id: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID debe ser un número',
      'number.integer': 'El ID debe ser un número entero',
      'number.positive': 'El ID debe ser un número positivo',
      'any.required': 'El ID es requerido'
    })
  }),

  // Alias para compatibilidad
  idParam: Joi.object({
    id: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID debe ser un número',
      'number.integer': 'El ID debe ser un número entero',
      'number.positive': 'El ID debe ser un número positivo',
      'any.required': 'El ID es requerido'
    })
  }),

  // Validación de business ID
  businessIdParam: Joi.object({
    businessId: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del negocio debe ser un número',
      'number.integer': 'El ID del negocio debe ser un número entero',
      'number.positive': 'El ID del negocio debe ser un número positivo',
      'any.required': 'El ID del negocio es requerido'
    })
  }),

  // Validación de service ID
  serviceIdParam: Joi.object({
    serviceId: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del servicio debe ser un número',
      'number.integer': 'El ID del servicio debe ser un número entero',
      'number.positive': 'El ID del servicio debe ser un número positivo',
      'any.required': 'El ID del servicio es requerido'
    })
  }),

  // Validación de service ID
  serviceIdParam: Joi.object({
    serviceId: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del servicio debe ser un número',
      'number.integer': 'El ID del servicio debe ser un número entero',
      'number.positive': 'El ID del servicio debe ser un número positivo',
      'any.required': 'El ID del servicio es requerido'
    })
  }),

  // Validación de business_id para rutas
  businessIdRouteParam: Joi.object({
    business_id: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del negocio debe ser un número',
      'number.integer': 'El ID del negocio debe ser un número entero',
      'number.positive': 'El ID del negocio debe ser un número positivo',
      'any.required': 'El ID del negocio es requerido'
    })
  }),

  // Validación de paginación
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(config.pagination.defaultLimit),
    sortBy: Joi.string().valid('id', 'name', 'created_at', 'updated_at').default('id'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc')
  }),

  // Validación de búsqueda
  search: Joi.object({
    term: Joi.string().min(2).max(100).required().messages({
      'string.min': 'El término de búsqueda debe tener al menos 2 caracteres',
      'string.max': 'El término de búsqueda no puede exceder 100 caracteres',
      'any.required': 'Se requiere un término de búsqueda'
    })
  }),

  // Validación de disponibilidad
  availabilityQuery: Joi.object({
    date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
      'string.pattern.base': 'La fecha debe tener formato YYYY-MM-DD',
      'any.required': 'La fecha es requerida'
    }),
    time: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).optional().messages({
      'string.pattern.base': 'La hora debe tener formato HH:MM o HH:MM:SS (24 horas)'
    }),
    employeeId: Joi.number().integer().positive().optional().messages({
      'number.base': 'El ID del empleado debe ser un número',
      'number.integer': 'El ID del empleado debe ser un número entero',
      'number.positive': 'El ID del empleado debe ser positivo'
    })
  }),

  // Validación de categoría
  categoryParam: Joi.object({
    category: Joi.string().min(2).max(100).required().messages({
      'string.min': 'La categoría debe tener al menos 2 caracteres',
      'string.max': 'La categoría no puede exceder 100 caracteres',
      'any.required': 'La categoría es requerida'
    })
  })
};

// Esquemas específicos para cada entidad
const authSchemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede exceder 100 caracteres',
      'any.required': 'El nombre es requerido'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Debe proporcionar un email válido',
      'any.required': 'El email es requerido'
    }),
    password: Joi.string().min(6).max(128).required().messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres',
      'string.max': 'La contraseña no puede exceder 128 caracteres',
      'any.required': 'La contraseña es requerida'
    }),
    role: Joi.string().valid(...Object.values(config.roles)).default('cliente'),
    phone: Joi.string().pattern(/^[\d]{7,15}$/).allow('', null).messages({
      'string.pattern.base': 'El teléfono debe contener solo dígitos (7-15 caracteres)'
    }),
    businessData: Joi.when('role', {
      is: 'negocio',
      then: Joi.object({
        name: Joi.string().min(2).max(255).required().messages({
          'string.min': 'El nombre del negocio debe tener al menos 2 caracteres',
          'string.max': 'El nombre del negocio no puede exceder 255 caracteres',
          'any.required': 'El nombre del negocio es requerido'
        }),
        address: Joi.string().max(500).allow('', null).messages({
          'string.max': 'La dirección no puede exceder 500 caracteres'
        }),
        city: Joi.string().max(100).allow('', null).messages({
          'string.max': 'La ciudad no puede exceder 100 caracteres'
        }),
        category: Joi.string().max(100).allow('', null).messages({
          'string.max': 'La categoría no puede exceder 100 caracteres'
        }),
        description: Joi.string().max(1000).allow('', null).messages({
          'string.max': 'La descripción no puede exceder 1000 caracteres'
        })
      }).required(),
      otherwise: Joi.forbidden()
    })
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Debe proporcionar un email válido',
      'any.required': 'El email es requerido'
    }),
    password: Joi.string().required().messages({
      'any.required': 'La contraseña es requerida'
    })
  }),

  google: Joi.object({
    token: Joi.string().required().messages({
      'any.required': 'El token de Google es requerido'
    })
  }),

  refresh: Joi.object({
    refreshToken: Joi.string().required().messages({
      'any.required': 'El refresh token es requerido'
    })
  })
};

const businessSchemas = {
  create: Joi.object({
    name: Joi.string().min(2).max(200).required().messages({
      'string.min': 'El nombre del negocio debe tener al menos 2 caracteres',
      'string.max': 'El nombre del negocio no puede exceder 200 caracteres',
      'any.required': 'El nombre del negocio es requerido'
    }),
    description: Joi.string().min(10).max(1000).required().messages({
      'string.min': 'La descripción debe tener al menos 10 caracteres',
      'string.max': 'La descripción no puede exceder 1000 caracteres',
      'any.required': 'La descripción es requerida'
    }),
    phone: Joi.string().pattern(/^[+]?[1-9][\d\s\-\(\)]{7,15}$/).allow('', null).messages({
      'string.pattern.base': 'El teléfono debe tener un formato válido'
    }),
    address: Joi.string().max(500).allow('', null),
    category: Joi.string().min(2).max(100).required().messages({
      'string.min': 'La categoría debe tener al menos 2 caracteres',
      'string.max': 'La categoría no puede exceder 100 caracteres',
      'any.required': 'La categoría es requerida'
    }),
    image: Joi.string().uri().allow('', null).messages({
      'string.uri': 'La imagen debe ser una URL válida'
    })
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(200).messages({
      'string.min': 'El nombre del negocio debe tener al menos 2 caracteres',
      'string.max': 'El nombre del negocio no puede exceder 200 caracteres'
    }),
    description: Joi.string().max(1000).messages({
      'string.max': 'La descripción no puede exceder 1000 caracteres'
    }),
    phone: Joi.string().pattern(/^[+]?[1-9][\d\s\-\(\)]{7,15}$/).allow('', null).messages({
      'string.pattern.base': 'El teléfono debe tener un formato válido'
    }),
    address: Joi.string().max(500).allow('', null),
    category: Joi.string().min(2).max(100).messages({
      'string.min': 'La categoría debe tener al menos 2 caracteres',
      'string.max': 'La categoría no puede exceder 100 caracteres'
    }),
    image: Joi.string().uri().allow('', null).messages({
      'string.uri': 'La imagen debe ser una URL válida'
    })
  })
};

const serviceSchemas = {
  create: Joi.object({
    business_id: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del negocio debe ser un número',
      'number.integer': 'El ID del negocio debe ser un número entero',
      'number.positive': 'El ID del negocio debe ser positivo',
      'any.required': 'El ID del negocio es requerido'
    }),
    name: Joi.string().min(2).max(200).required().messages({
      'string.min': 'El nombre del servicio debe tener al menos 2 caracteres',
      'string.max': 'El nombre del servicio no puede exceder 200 caracteres',
      'any.required': 'El nombre del servicio es requerido'
    }),
    description: Joi.string().min(10).max(1000).allow('', null).messages({
      'string.min': 'La descripción debe tener al menos 10 caracteres',
      'string.max': 'La descripción no puede exceder 1000 caracteres'
    }),
    duration: Joi.number().integer().min(15).max(480).required().messages({
      'number.base': 'La duración debe ser un número',
      'number.integer': 'La duración debe ser un número entero',
      'number.min': 'La duración mínima es 15 minutos',
      'number.max': 'La duración máxima es 480 minutos (8 horas)',
      'any.required': 'La duración es requerida'
    }),
    price: Joi.number().min(0).precision(2).required().messages({
      'number.base': 'El precio debe ser un número',
      'number.min': 'El precio no puede ser negativo',
      'any.required': 'El precio es requerido'
    }),
    category: Joi.string().max(100).allow('', null)
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(200).messages({
      'string.min': 'El nombre del servicio debe tener al menos 2 caracteres',
      'string.max': 'El nombre del servicio no puede exceder 200 caracteres'
    }),
    description: Joi.string().min(10).max(1000).allow('', null).messages({
      'string.min': 'La descripción debe tener al menos 10 caracteres',
      'string.max': 'La descripción no puede exceder 1000 caracteres'
    }),
    duration: Joi.number().integer().min(15).max(480).messages({
      'number.base': 'La duración debe ser un número',
      'number.integer': 'La duración debe ser un número entero',
      'number.min': 'La duración mínima es 15 minutos',
      'number.max': 'La duración máxima es 480 minutos (8 horas)'
    }),
    price: Joi.number().min(0).precision(2).messages({
      'number.base': 'El precio debe ser un número',
      'number.min': 'El precio no puede ser negativo'
    }),
    category: Joi.string().max(100).allow('', null)
  })
};

const employeeSchemas = {
  create: Joi.object({
    business_id: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del negocio debe ser un número',
      'number.integer': 'El ID del negocio debe ser un número entero',
      'number.positive': 'El ID del negocio debe ser positivo',
      'any.required': 'El ID del negocio es requerido'
    }),
    name: Joi.string().min(2).max(100).required().messages({
      'string.min': 'El nombre del empleado debe tener al menos 2 caracteres',
      'string.max': 'El nombre del empleado no puede exceder 100 caracteres',
      'any.required': 'El nombre del empleado es requerido'
    }),
    position: Joi.string().max(100).allow('', null),
    specialties: Joi.array().items(Joi.string().max(100)).default([]),
    profile_image: Joi.string().uri().allow('', null).messages({
      'string.uri': 'La imagen debe ser una URL válida'
    }),
    service_ids: Joi.array().items(Joi.number().integer().positive()).default([])
  }),

  update: Joi.object({
    name: Joi.string().min(2).max(100).messages({
      'string.min': 'El nombre del empleado debe tener al menos 2 caracteres',
      'string.max': 'El nombre del empleado no puede exceder 100 caracteres'
    }),
    position: Joi.string().max(100).allow('', null),
    specialties: Joi.array().items(Joi.string().max(100)),
    profile_image: Joi.string().uri().allow('', null).messages({
      'string.uri': 'La imagen debe ser una URL válida'
    }),
    service_ids: Joi.array().items(Joi.number().integer().positive())
  }),

  checkAvailability: Joi.object({
    date: Joi.date().min('now').required().messages({
      'date.base': 'La fecha debe ser válida',
      'date.min': 'La fecha no puede ser en el pasado',
      'any.required': 'La fecha es requerida'
    }),
    time: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).required().messages({
      'string.pattern.base': 'La hora debe tener formato HH:MM o HH:MM:SS (24 horas)',
      'any.required': 'La hora es requerida'
    })
  }),

  assignServices: Joi.object({
    service_ids: Joi.array().items(Joi.number().integer().positive()).min(1).required().messages({
      'array.base': 'service_ids debe ser un array',
      'array.min': 'Debe proporcionar al menos un ID de servicio',
      'number.base': 'Cada ID de servicio debe ser un número',
      'number.integer': 'Cada ID de servicio debe ser un número entero',
      'number.positive': 'Cada ID de servicio debe ser positivo',
      'any.required': 'service_ids es requerido'
    })
  })
};

const bookingSchemas = {
  createBooking: Joi.object({
    service_id: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del servicio debe ser un número',
      'number.integer': 'El ID del servicio debe ser un número entero',
      'number.positive': 'El ID del servicio debe ser positivo',
      'any.required': 'El ID del servicio es requerido'
    }),
    business_id: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del negocio debe ser un número',
      'number.integer': 'El ID del negocio debe ser un número entero',
      'number.positive': 'El ID del negocio debe ser positivo',
      'any.required': 'El ID del negocio es requerido'
    }),
    employee_id: Joi.number().integer().positive().allow(null).messages({
      'number.base': 'El ID del empleado debe ser un número',
      'number.integer': 'El ID del empleado debe ser un número entero',
      'number.positive': 'El ID del empleado debe ser positivo'
    }),
    booking_date: Joi.date().min('now').required().messages({
      'date.base': 'La fecha debe ser válida',
      'date.min': 'La fecha no puede ser en el pasado',
      'any.required': 'La fecha de reserva es requerida'
    }),
    booking_time: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).required().messages({
      'string.pattern.base': 'La hora debe tener formato HH:MM o HH:MM:SS (24 horas)',
      'any.required': 'La hora de reserva es requerida'
    }),
    notes: Joi.string().max(500).allow('', null).messages({
      'string.max': 'Las notas no pueden exceder 500 caracteres'
    })
  }),

  updateBookingStatus: Joi.object({
    status: Joi.string().valid('pendiente', 'confirmada', 'cancelada').required().messages({
      'any.only': 'El estado debe ser: pendiente, confirmada o cancelada',
      'any.required': 'El estado es requerido'
    })
  })
};

const reviewSchemas = {
  create: Joi.object({
    business_id: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del negocio debe ser un número',
      'number.integer': 'El ID del negocio debe ser un número entero',
      'number.positive': 'El ID del negocio debe ser positivo',
      'any.required': 'El ID del negocio es requerido'
    }),
    rating: Joi.number().integer().min(1).max(5).required().messages({
      'number.base': 'La calificación debe ser un número',
      'number.integer': 'La calificación debe ser un número entero',
      'number.min': 'La calificación mínima es 1',
      'number.max': 'La calificación máxima es 5',
      'any.required': 'La calificación es requerida'
    }),
    comment: Joi.string().min(10).max(1000).allow('', null).messages({
      'string.min': 'El comentario debe tener al menos 10 caracteres',
      'string.max': 'El comentario no puede exceder 1000 caracteres'
    })
  })
};

const availabilitySchemas = {
  setAvailability: Joi.object({
    days: Joi.array().items(
      Joi.object({
        day: Joi.string().valid('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday').required().messages({
          'any.only': 'El día debe ser uno de: monday, tuesday, wednesday, thursday, friday, saturday, sunday',
          'any.required': 'El día es requerido'
        }),
        start_time: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).required().messages({
          'string.pattern.base': 'La hora de inicio debe tener formato HH:MM o HH:MM:SS (24 horas)',
          'any.required': 'La hora de inicio es requerida'
        }),
        end_time: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).required().messages({
          'string.pattern.base': 'La hora de fin debe tener formato HH:MM o HH:MM:SS (24 horas)',
          'any.required': 'La hora de fin es requerida'
        }),
        is_open: Joi.boolean().required().messages({
          'any.required': 'El estado de apertura es requerido'
        })
      })
    ).min(1).required().messages({
      'array.min': 'Debe proporcionar al menos un día',
      'any.required': 'Los días son requeridos'
    })
  }),

  getAvailability: Joi.object({
    year: Joi.number().integer().min(2020).max(2030).required().messages({
      'number.base': 'El año debe ser un número',
      'number.integer': 'El año debe ser un número entero',
      'number.min': 'El año debe ser mayor o igual a 2020',
      'number.max': 'El año debe ser menor o igual a 2030',
      'any.required': 'El año es requerido'
    }),
    month: Joi.number().integer().min(1).max(12).required().messages({
      'number.base': 'El mes debe ser un número',
      'number.integer': 'El mes debe ser un número entero',
      'number.min': 'El mes debe ser mayor o igual a 1',
      'number.max': 'El mes debe ser menor o igual a 12',
      'any.required': 'El mes es requerido'
    }),
    employeeId: Joi.number().integer().positive().allow(null).messages({
      'number.base': 'El ID del empleado debe ser un número',
      'number.integer': 'El ID del empleado debe ser un número entero',
      'number.positive': 'El ID del empleado debe ser un número positivo'
    })
  })
};

const userSchemas = {
  updateProfile: Joi.object({
    name: Joi.string().min(2).max(100).messages({
      'string.min': 'El nombre debe tener al menos 2 caracteres',
      'string.max': 'El nombre no puede exceder 100 caracteres'
    }),
    phone: Joi.string().pattern(/^[+]?[1-9][\d\s\-\(\)]{7,15}$/).allow('', null).messages({
      'string.pattern.base': 'El teléfono debe tener un formato válido'
    }),
    profile_image: Joi.string().uri().allow('', null).messages({
      'string.uri': 'La imagen debe ser una URL válida'
    })
  })
};

// Funciones de conveniencia para validación
const validateBody = (schema) => validateRequest(schema, 'body');
const validateParams = (schema) => validateRequest(schema, 'params');
const validateQuery = (schema) => validateRequest(schema, 'query');

module.exports = {
  validateRequest,
  validateBody,
  validateParams,
  validateQuery,
  authSchemas,
  businessSchemas,
  serviceSchemas,
  employeeSchemas,
  bookingSchemas,
  reviewSchemas,
  availabilitySchemas,
  userSchemas,
  schemas: {
    ...commonSchemas,
    common: commonSchemas,
    auth: authSchemas,
    business: businessSchemas,
    service: serviceSchemas,
    employee: employeeSchemas,
    booking: bookingSchemas,
    review: reviewSchemas,
    availability: availabilitySchemas,
    user: userSchemas
  }
};
