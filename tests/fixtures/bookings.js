/**
 * Fixtures for booking tests
 */

const validBooking = {
  user_id: 1,
  business_id: 1,
  service_id: 1,
  employee_id: 1,
  booking_date: '2024-02-15',
  booking_time: '10:00:00',
  notes: 'Regular appointment',
  status: 'pending'
};

const validBookingUpdate = {
  booking_date: '2024-02-16',
  booking_time: '11:00:00',
  status: 'confirmed',
  notes: 'Updated appointment'
};

const invalidBookings = [
  {
    // Missing user_id
    business_id: 1,
    service_id: 1,
    booking_date: '2024-02-15',
    booking_time: '10:00:00'
  },
  {
    user_id: 1,
    business_id: 1,
    service_id: 1,
    // Invalid date format
    booking_date: 'invalid-date',
    booking_time: '10:00:00'
  },
  {
    user_id: 1,
    business_id: 1,
    service_id: 1,
    booking_date: '2024-02-15',
    // Invalid time format
    booking_time: 'invalid-time'
  }
];

const bookingStatuses = [
  'pending',
  'confirmed',
  'cancelled',
  'completed',
  'no-show'
];

const pastBooking = {
  user_id: 1,
  business_id: 1,
  service_id: 1,
  employee_id: 1,
  booking_date: '2023-12-15',
  booking_time: '14:00:00',
  status: 'completed'
};

const futureBooking = {
  user_id: 1,
  business_id: 1,
  service_id: 1,
  employee_id: 1,
  booking_date: '2024-12-15',
  booking_time: '15:00:00',
  status: 'confirmed'
};

module.exports = {
  validBooking,
  validBookingUpdate,
  invalidBookings,
  bookingStatuses,
  pastBooking,
  futureBooking
};
