/**
 * Fixtures for employee tests
 */

const validEmployee = {
  name: 'John Doe',
  email: 'john.employee@example.com',
  phone: '1234567890',
  business_id: 1,
  position: 'Stylist',
  hire_date: '2024-01-15',
  salary: 3000.00,
  status: 'active'
};

const validEmployeeUpdate = {
  name: 'John Updated',
  position: 'Senior Stylist',
  salary: 3500.00
};

const invalidEmployees = [
  {
    // Missing name
    email: 'invalid@example.com',
    phone: '1234567890',
    business_id: 1,
    position: 'Stylist'
  },
  {
    name: 'Invalid Employee',
    // Invalid email format
    email: 'invalid-email',
    phone: '1234567890',
    business_id: 1,
    position: 'Stylist'
  },
  {
    name: 'Invalid Employee',
    email: 'invalid@example.com',
    // Missing business_id
    position: 'Stylist'
  }
];

const employeePositions = [
  'Stylist',
  'Manager',
  'Receptionist',
  'Barber',
  'Technician',
  'Assistant'
];

const employeeAvailability = [
  {
    day_of_week: 1, // Monday
    start_time: '09:00:00',
    end_time: '17:00:00',
    is_available: true
  },
  {
    day_of_week: 2, // Tuesday
    start_time: '10:00:00',
    end_time: '16:00:00',
    is_available: true
  },
  {
    day_of_week: 3, // Wednesday
    start_time: '09:00:00',
    end_time: '17:00:00',
    is_available: false
  }
];

module.exports = {
  validEmployee,
  validEmployeeUpdate,
  invalidEmployees,
  employeePositions,
  employeeAvailability
};
