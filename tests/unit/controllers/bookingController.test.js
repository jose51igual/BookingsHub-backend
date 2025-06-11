/**
 * Tests unitarios para bookingController
 */

const BookingController = require('@controllers/bookingController');
const BookingModel = require('@models/bookingModel');
const EmployeeModel = require('@models/employeeModel');
const { apiResponse, apiError } = require('@utils/apiResponse');

// Mock de las dependencias
jest.mock('@models/bookingModel');
jest.mock('@models/employeeModel');
jest.mock('@utils/logger');
jest.mock('@utils/apiResponse');

describe('BookingController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock por defecto de apiResponse y apiError
    apiResponse.mockImplementation((res, status, data) => {
      res.status(status).json(data);
      return res;
    });
    
    apiError.mockImplementation((res, status, message, error) => {
      res.status(status).json({
        success: false,
        message,
        error: error?.message
      });
      return res;
    });
  });

  describe('getUserBookings', () => {
    test('debería obtener reservas del usuario exitosamente', async () => {
      // Arrange
      const req = { user: { id: 1, role: 'cliente' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      const mockBookings = [
        {
          id: 1,
          user_id: 1,
          business_id: 1,
          service_id: 1,
          booking_date: '2024-01-15',
          booking_time: '10:00:00',
          status: 'confirmed'
        },
        {
          id: 2,
          user_id: 1,
          business_id: 2,
          service_id: 3,
          booking_date: '2024-01-20',
          booking_time: '14:30:00',
          status: 'pending'
        }
      ];

      BookingModel.getUserBookings.mockResolvedValue(mockBookings);

      // Act
      await BookingController.getUserBookings(req, res);

      // Assert
      expect(BookingModel.getUserBookings).toHaveBeenCalledWith(1);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        count: 2,
        data: mockBookings,
        message: 'Reservas del usuario obtenidas exitosamente'
      });
    });

    test('debería manejar errores de base de datos', async () => {
      // Arrange
      const req = { user: { id: 1, role: 'cliente' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = new Error('Database connection failed');
      
      BookingModel.getUserBookings.mockRejectedValue(error);

      // Act
      await BookingController.getUserBookings(req, res);

      // Assert
      expect(BookingModel.getUserBookings).toHaveBeenCalledWith(1);
      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });

  describe('getBusinessBookings', () => {
    test('debería obtener reservas del negocio exitosamente para propietario autorizado', async () => {
      // Arrange
      const req = { 
        params: { business_id: '1' },
        user: { id: 1, role: 'negocio' }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      const mockBookings = [
        {
          id: 1,
          user_id: 2,
          business_id: 1,
          service_id: 1,
          booking_date: '2024-01-15',
          booking_time: '10:00:00',
          status: 'confirmed'
        }
      ];

      BookingModel.isBusinessOwner.mockResolvedValue(true);
      BookingModel.getBusinessBookings.mockResolvedValue(mockBookings);

      // Act
      await BookingController.getBusinessBookings(req, res);

      // Assert
      expect(BookingModel.isBusinessOwner).toHaveBeenCalledWith(1, 1);
      expect(BookingModel.getBusinessBookings).toHaveBeenCalledWith(1);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        count: 1,
        data: mockBookings,
        message: 'Reservas del negocio obtenidas exitosamente'
      });
    });

    test('debería rechazar si no es propietario del negocio', async () => {
      // Arrange
      const req = { 
        params: { business_id: '1' },
        user: { id: 2, role: 'negocio' }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      BookingModel.isBusinessOwner.mockResolvedValue(false);

      // Act
      await BookingController.getBusinessBookings(req, res);

      // Assert
      expect(BookingModel.isBusinessOwner).toHaveBeenCalledWith(1, 2);
      expect(BookingModel.getBusinessBookings).not.toHaveBeenCalled();
      expect(apiError).toHaveBeenCalledWith(res, 403, 'No tienes autorización para ver las reservas de este negocio');
    });

    test('debería manejar errores de base de datos', async () => {
      // Arrange
      const req = { 
        params: { id: '1' },
        user: { id: 1, role: 'negocio' }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = new Error('Database connection failed');

      BookingModel.isBusinessOwner.mockRejectedValue(error);

      // Act
      await BookingController.getBusinessBookings(req, res);

      // Assert
      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });

  describe('createBooking', () => {
    test('debería crear reserva exitosamente para cliente', async () => {
      // Arrange
      const req = {
        user: { id: 1, role: 'cliente' },
        body: {
          service_id: 1,
          booking_date: '2024-01-15',
          booking_time: '10:00:00',
          employee_id: 1,
          business_id: 1,
          notes: 'Test booking'
        }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      const mockBookingId = 1;

      // Mock de EmployeeModel para disponibilidad
      EmployeeModel.checkAvailability.mockResolvedValue({ available: true });
      BookingModel.createBooking.mockResolvedValue(mockBookingId);

      // Act
      await BookingController.createBooking(req, res);

      // Assert
      expect(BookingModel.createBooking).toHaveBeenCalledWith(
        1, // user_id
        1, // service_id
        '2024-01-15', // booking_date
        '10:00:00', // booking_time
        1, // employee_id
        1, // business_id
        'Test booking' // notes
      );
      expect(apiResponse).toHaveBeenCalledWith(res, 201, {
        success: true,
        data: { booking_id: mockBookingId },
        message: 'Reserva confirmada exitosamente'
      });
    });

    test('debería rechazar reserva si el usuario no es cliente', async () => {
      // Arrange
      const req = {
        user: { id: 1, role: 'negocio' },
        body: {
          service_id: 1,
          booking_date: '2024-01-15',
          booking_time: '10:00:00'
        }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      // Act
      await BookingController.createBooking(req, res);

      // Assert
      expect(apiError).toHaveBeenCalledWith(res, 403, 'Solo los clientes pueden hacer reservas');
      expect(BookingModel.createBooking).not.toHaveBeenCalled();
    });

    test('debería manejar errores de base de datos', async () => {
      // Arrange
      const req = {
        user: { id: 1, role: 'cliente' },
        body: {
          service_id: 1,
          booking_date: '2024-01-15',
          booking_time: '10:00:00',
          business_id: 1
        }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = new Error('Database connection failed');

      BookingModel.createBooking.mockRejectedValue(error);

      // Act
      await BookingController.createBooking(req, res);

      // Assert
      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });

  describe('updateBookingStatus', () => {
    test('debería permitir al cliente cancelar su propia reserva', async () => {
      // Arrange
      const req = {
        params: { id: '1' },
        user: { id: 1, role: 'cliente' },
        body: { status: 'cancelada' }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      const mockBooking = {
        id: 1,
        user_id: 1,
        service_id: 1,
        status: 'confirmed'
      };

      BookingModel.getBookingById.mockResolvedValue(mockBooking);
      BookingModel.updateBookingStatus.mockResolvedValue(true);

      // Act
      await BookingController.updateBookingStatus(req, res);

      // Assert
      expect(BookingModel.getBookingById).toHaveBeenCalledWith(1);
      expect(BookingModel.updateBookingStatus).toHaveBeenCalledWith(1, 'cancelada');
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: null,
        message: 'Estado de reserva actualizado exitosamente'
      });
    });

    test('debería rechazar si el cliente no es propietario de la reserva', async () => {
      // Arrange
      const req = {
        params: { id: '1' },
        user: { id: 2, role: 'cliente' },
        body: { status: 'cancelada' }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      const mockBooking = {
        id: 1,
        user_id: 1,
        service_id: 1,
        status: 'confirmed'
      };

      BookingModel.getBookingById.mockResolvedValue(mockBooking);

      // Act
      await BookingController.updateBookingStatus(req, res);

      // Assert
      expect(BookingModel.getBookingById).toHaveBeenCalledWith(1);
      expect(BookingModel.updateBookingStatus).not.toHaveBeenCalled();
      expect(apiError).toHaveBeenCalledWith(res, 403, 'No tienes autorización para modificar esta reserva');
    });

    test('debería rechazar si reserva no existe', async () => {
      // Arrange
      const req = {
        params: { id: '999' },
        user: { id: 1, role: 'cliente' },
        body: { status: 'cancelada' }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      BookingModel.getBookingById.mockResolvedValue(null);

      // Act
      await BookingController.updateBookingStatus(req, res);

      // Assert
      expect(BookingModel.getBookingById).toHaveBeenCalledWith(999);
      expect(apiError).toHaveBeenCalledWith(res, 404, 'Reserva no encontrada');
    });

    test('debería permitir al negocio confirmar reservas de sus servicios', async () => {
      // Arrange
      const req = {
        params: { id: '1' },
        user: { id: 2, role: 'negocio' },
        body: { status: 'confirmada' }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      const mockBooking = {
        id: 1,
        user_id: 1,
        service_id: 1,
        status: 'pending'
      };

      BookingModel.getBookingById.mockResolvedValue(mockBooking);
      BookingModel.isServiceOwnedByUser.mockResolvedValue(true);
      BookingModel.updateBookingStatus.mockResolvedValue(true);

      // Act
      await BookingController.updateBookingStatus(req, res);

      // Assert
      expect(BookingModel.isServiceOwnedByUser).toHaveBeenCalledWith(1, 2);
      expect(BookingModel.updateBookingStatus).toHaveBeenCalledWith(1, 'confirmada');
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: null,
        message: 'Estado de reserva actualizado exitosamente'
      });
    });
  });

  describe('getBookingById', () => {
    test('debería obtener reserva por ID para el cliente propietario', async () => {
      // Arrange
      const req = {
        params: { id: '1' },
        user: { id: 1, role: 'cliente' }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      const mockBooking = {
        id: 1,
        user_id: 1,
        service_id: 1,
        booking_date: '2024-01-15',
        booking_time: '10:00:00',
        status: 'confirmed'
      };

      BookingModel.getBookingById.mockResolvedValue(mockBooking);

      // Act
      await BookingController.getBookingById(req, res);

      // Assert
      expect(BookingModel.getBookingById).toHaveBeenCalledWith(1);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: mockBooking,
        message: 'Reserva obtenida exitosamente'
      });
    });

    test('debería obtener reserva por ID para el negocio propietario del servicio', async () => {
      // Arrange
      const req = {
        params: { id: '1' },
        user: { id: 2, role: 'negocio' }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      const mockBooking = {
        id: 1,
        user_id: 1,
        service_id: 1,
        booking_date: '2024-01-15',
        booking_time: '10:00:00',
        status: 'confirmed'
      };

      BookingModel.getBookingById.mockResolvedValue(mockBooking);
      BookingModel.isServiceOwnedByUser.mockResolvedValue(true);

      // Act
      await BookingController.getBookingById(req, res);

      // Assert
      expect(BookingModel.getBookingById).toHaveBeenCalledWith(1);
      expect(BookingModel.isServiceOwnedByUser).toHaveBeenCalledWith(1, 2);
      expect(apiResponse).toHaveBeenCalledWith(res, 200, {
        success: true,
        data: mockBooking,
        message: 'Reserva obtenida exitosamente'
      });
    });

    test('debería rechazar si reserva no existe', async () => {
      // Arrange
      const req = {
        params: { id: '999' },
        user: { id: 1, role: 'cliente' }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      BookingModel.getBookingById.mockResolvedValue(null);

      // Act
      await BookingController.getBookingById(req, res);

      // Assert
      expect(BookingModel.getBookingById).toHaveBeenCalledWith(999);
      expect(apiError).toHaveBeenCalledWith(res, 404, 'Reserva no encontrada');
    });

    test('debería rechazar si usuario no tiene permisos', async () => {
      // Arrange
      const req = {
        params: { id: '1' },
        user: { id: 2, role: 'cliente' }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
      const mockBooking = {
        id: 1,
        user_id: 1,
        service_id: 1,
        status: 'confirmed'
      };

      BookingModel.getBookingById.mockResolvedValue(mockBooking);

      // Act
      await BookingController.getBookingById(req, res);

      // Assert
      expect(BookingModel.getBookingById).toHaveBeenCalledWith(1);
      expect(apiError).toHaveBeenCalledWith(res, 403, 'No tienes autorización para ver esta reserva');
    });

    test('debería manejar errores de base de datos', async () => {
      // Arrange
      const req = {
        params: { id: '1' },
        user: { id: 1, role: 'cliente' }
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const error = new Error('Database connection failed');

      BookingModel.getBookingById.mockRejectedValue(error);

      // Act
      await BookingController.getBookingById(req, res);

      // Assert
      expect(apiError).toHaveBeenCalledWith(res, 500, 'Error interno del servidor', error);
    });
  });
});