const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('./config');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Bookings Hub API',
    version: '1.0.0',
    description: 'API REST profesional para gestión de reservas de servicios',
    contact: {
      name: 'Bookings Hub Team',
      email: 'support@bookingshub.com'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: `http://localhost:${config.PORT}`,
      description: 'Servidor de desarrollo'
    },
    {
      url: 'https://api.bookingshub.com',
      description: 'Servidor de producción'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT para autenticación'
      }
    },
    schemas: {
      User: {
        type: 'object',
        required: ['name', 'email', 'password', 'role'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único del usuario'
          },
          name: {
            type: 'string',
            description: 'Nombre completo del usuario',
            example: 'Juan Pérez'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email del usuario',
            example: 'juan@example.com'
          },
          role: {
            type: 'string',
            enum: ['cliente', 'negocio', 'admin'],
            description: 'Rol del usuario',
            example: 'cliente'
          },
          phone: {
            type: 'string',
            description: 'Teléfono del usuario',
            example: '+34 666 777 888'
          },
          avatar: {
            type: 'string',
            description: 'URL del avatar del usuario'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación'
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de última actualización'
          }
        }
      },
      Business: {
        type: 'object',
        required: ['name', 'description', 'category'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único del negocio'
          },
          user_id: {
            type: 'integer',
            description: 'ID del usuario propietario'
          },
          name: {
            type: 'string',
            description: 'Nombre del negocio',
            example: 'Peluquería Bella'
          },
          description: {
            type: 'string',
            description: 'Descripción del negocio',
            example: 'Peluquería y centro de belleza con más de 10 años de experiencia'
          },
          phone: {
            type: 'string',
            description: 'Teléfono del negocio',
            example: '+34 666 777 888'
          },
          address: {
            type: 'string',
            description: 'Dirección del negocio',
            example: 'Calle Mayor 123, Madrid'
          },
          category: {
            type: 'string',
            description: 'Categoría del negocio',
            example: 'Belleza y Bienestar'
          },
          image: {
            type: 'string',
            description: 'URL de la imagen del negocio'
          },
          rating: {
            type: 'number',
            format: 'float',
            description: 'Puntuación promedio',
            minimum: 0,
            maximum: 5
          },
          reviewCount: {
            type: 'integer',
            description: 'Número total de reseñas'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación'
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de última actualización'
          }
        }
      },
      Service: {
        type: 'object',
        required: ['business_id', 'name', 'duration', 'price'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único del servicio'
          },
          business_id: {
            type: 'integer',
            description: 'ID del negocio que ofrece el servicio'
          },
          name: {
            type: 'string',
            description: 'Nombre del servicio',
            example: 'Corte de cabello'
          },
          description: {
            type: 'string',
            description: 'Descripción del servicio',
            example: 'Corte de cabello profesional con lavado incluido'
          },
          duration: {
            type: 'integer',
            description: 'Duración del servicio en minutos',
            example: 45
          },
          price: {
            type: 'number',
            format: 'decimal',
            description: 'Precio del servicio',
            example: 25.50
          },
          category: {
            type: 'string',
            description: 'Categoría del servicio',
            example: 'Cortes'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación'
          }
        }
      },
      Employee: {
        type: 'object',
        required: ['business_id', 'name'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único del empleado'
          },
          business_id: {
            type: 'integer',
            description: 'ID del negocio'
          },
          name: {
            type: 'string',
            description: 'Nombre del empleado',
            example: 'Ana García'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email del empleado'
          },
          phone: {
            type: 'string',
            description: 'Teléfono del empleado'
          },
          position: {
            type: 'string',
            description: 'Cargo del empleado',
            example: 'Estilista Senior'
          },
          specialties: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Especialidades del empleado',
            example: ['Cortes', 'Coloración', 'Peinados']
          },
          profile_image: {
            type: 'string',
            description: 'URL de la imagen de perfil'
          },
          service_ids: {
            type: 'array',
            items: {
              type: 'integer'
            },
            description: 'IDs de los servicios que puede realizar'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación'
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de última actualización'
          }
        }
      },
      Booking: {
        type: 'object',
        required: ['service_id', 'booking_date', 'booking_time', 'business_id'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único de la reserva'
          },
          user_id: {
            type: 'integer',
            description: 'ID del usuario que hace la reserva'
          },
          service_id: {
            type: 'integer',
            description: 'ID del servicio reservado'
          },
          employee_id: {
            type: 'integer',
            description: 'ID del empleado asignado (opcional)',
            nullable: true
          },
          business_id: {
            type: 'integer',
            description: 'ID del negocio'
          },
          booking_date: {
            type: 'string',
            format: 'date',
            description: 'Fecha de la reserva',
            example: '2024-12-25'
          },
          booking_time: {
            type: 'string',
            format: 'time',
            description: 'Hora de la reserva',
            example: '10:30'
          },
          status: {
            type: 'string',
            enum: ['pendiente', 'confirmada', 'cancelada'],
            description: 'Estado de la reserva',
            default: 'pendiente'
          },
          notes: {
            type: 'string',
            description: 'Notas adicionales',
            nullable: true
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación'
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de última actualización'
          }
        }
      },
      Review: {
        type: 'object',
        required: ['business_id', 'rating', 'comment'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único de la reseña'
          },
          user_id: {
            type: 'integer',
            description: 'ID del usuario que hace la reseña'
          },
          business_id: {
            type: 'integer',
            description: 'ID del negocio reseñado'
          },
          booking_id: {
            type: 'integer',
            description: 'ID de la reserva asociada',
            nullable: true
          },
          rating: {
            type: 'integer',
            description: 'Puntuación de 1 a 5',
            minimum: 1,
            maximum: 5,
            example: 5
          },
          comment: {
            type: 'string',
            description: 'Comentario de la reseña',
            example: 'Excelente servicio, muy profesionales'
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'Fecha de creación'
          }
        }
      },
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Indica si la operación fue exitosa'
          },
          message: {
            type: 'string',
            description: 'Mensaje descriptivo'
          },
          data: {
            description: 'Datos de respuesta',
            nullable: true
          },
          count: {
            type: 'integer',
            description: 'Número de elementos (para listas)',
            nullable: true
          },
          error: {
            type: 'string',
            description: 'Detalles del error (solo en desarrollo)',
            nullable: true
          }
        }
      },
      AuthRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'Email del usuario',
            example: 'usuario@example.com'
          },
          password: {
            type: 'string',
            minLength: 6,
            description: 'Contraseña del usuario',
            example: 'password123'
          }
        }
      },
      AuthResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true
          },
          message: {
            type: 'string',
            example: 'Login exitoso'
          },
          data: {
            type: 'object',
            properties: {
              user: {
                $ref: '#/components/schemas/User'
              },
              token: {
                type: 'string',
                description: 'JWT token para autenticación',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
              }
            }
          }
        }
      }
    },
    responses: {
      UnauthorizedError: {
        description: 'Token de acceso faltante o inválido',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false
                },
                message: {
                  type: 'string',
                  example: 'Token de acceso requerido'
                }
              }
            }
          }
        }
      },
      ForbiddenError: {
        description: 'Acceso denegado - permisos insuficientes',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false
                },
                message: {
                  type: 'string',
                  example: 'No tienes permisos para realizar esta acción'
                }
              }
            }
          }
        }
      },
      NotFoundError: {
        description: 'Recurso no encontrado',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false
                },
                message: {
                  type: 'string',
                  example: 'Recurso no encontrado'
                }
              }
            }
          }
        }
      },
      ValidationError: {
        description: 'Error de validación en los datos enviados',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false
                },
                message: {
                  type: 'string',
                  example: 'Datos de entrada inválidos'
                },
                errors: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: {
                        type: 'string',
                        example: 'email'
                      },
                      message: {
                        type: 'string',
                        example: 'Email es requerido'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      InternalServerError: {
        description: 'Error interno del servidor',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false
                },
                message: {
                  type: 'string',
                  example: 'Error interno del servidor'
                }
              }
            }
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Auth',
      description: 'Operaciones de autenticación y autorización'
    },
    {
      name: 'Users',
      description: 'Gestión de usuarios'
    },
    {
      name: 'Businesses',
      description: 'Gestión de negocios'
    },
    {
      name: 'Services',
      description: 'Gestión de servicios'
    },
    {
      name: 'Employees',
      description: 'Gestión de empleados'
    },
    {
      name: 'Bookings',
      description: 'Gestión de reservas'
    },
    {
      name: 'Reviews',
      description: 'Gestión de reseñas'
    }
  ]
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
    './routes/*.js',
    './controllers/*.js',
    './middlewares/*.js'
  ]
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerSpec,
  swaggerUi
};
