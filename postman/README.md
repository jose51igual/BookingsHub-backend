# Bookings Hub API Postman Collection

Esta colección de Postman está diseñada para probar todos los endpoints de la API de Bookings Hub.

## Instrucciones de uso

1. Importar la colección (`bookings-hub-api.json`) en Postman.
2. Importar el archivo de entorno (`environment.json`) en Postman.
3. Seleccionar el entorno "Bookings Hub Local" en el selector de entornos de Postman.

## Flujo de trabajo recomendado

1. **Registrar usuarios**:
   - Usar la solicitud "Register" para crear un usuario cliente
   - Usar la solicitud "Register Business" para crear un usuario de negocio

2. **Iniciar sesión**:
   - Para probar como cliente: usar "Login" con las credenciales de cliente
   - Para probar como negocio: usar "Login" con las credenciales de negocio
   - El token JWT se guardará automáticamente en la variable de entorno

3. **Gestión de negocios** (como usuario de negocio):
   - Crear un negocio con "Create Business"
   - Establecer disponibilidad con "Set Business Availability"
   - Crear servicios con "Create Service"

4. **Reservas** (como cliente):
   - Ver negocios disponibles con "Get All Businesses"
   - Ver servicios de un negocio con "Get Services by Business"
   - Comprobar disponibilidad con "Check Service Availability"
   - Crear una reserva con "Create Booking"

5. **Gestión de reservas**:
   - Como cliente: ver "Get My Bookings" y cancelar con "Update Booking Status (Client)"
   - Como negocio: ver "Get Business Bookings" y confirmar/cancelar con "Update Booking Status (Business)"

## Variables de entorno

- `baseUrl`: URL base de la API (por defecto: http://localhost:3000)
- `token`: Token JWT para autenticación (se guarda automáticamente al iniciar sesión)
- `userId`: ID del usuario actual (se guarda automáticamente al iniciar sesión)
- `userRole`: Rol del usuario actual (se guarda automáticamente al iniciar sesión)
- `businessId`: ID del negocio creado (se guarda automáticamente al crear un negocio)
- `serviceId`: ID del servicio creado (se guarda automáticamente al crear un servicio)
- `bookingId`: ID de la reserva creada (se guarda automáticamente al crear una reserva)
- `userEmail`: Correo electrónico del usuario cliente para iniciar sesión
- `userPassword`: Contraseña del usuario cliente para iniciar sesión
- `businessEmail`: Correo electrónico del usuario de negocio para iniciar sesión
- `businessPassword`: Contraseña del usuario de negocio para iniciar sesión

## Notas

- Los test scripts están configurados para guardar automáticamente IDs y tokens importantes en las variables de entorno.
- Para probar escenarios diferentes, puedes modificar manualmente las variables de entorno en cualquier momento.
