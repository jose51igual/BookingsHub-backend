# Bookings Hub Backend

Backend API para la aplicación Bookings Hub. Un sistema de gestión de reservas construido con Node.js, Express y MySQL.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Desarrollo Local](#desarrollo-local)
- [Deployment en Servidor Ubuntu](#deployment-en-servidor-ubuntu)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Logging](#logging)

## ✨ Características

- 🔐 Autenticación JWT con Google OAuth
- 👤 Gestión de usuarios (clientes y propietarios de negocios)
- 🏢 Gestión de negocios y servicios
- 👨‍💼 Gestión de empleados
- 📅 Sistema de reservas y disponibilidad
- ⭐ Sistema de reseñas
- 📝 Validación centralizada con Joi
- 📚 Documentación automática con Swagger
- 🧪 Tests unitarios e integración
- 📊 Logging estructurado con Winston
- 🚀 CI/CD con GitHub Actions

## 🛠 Tecnologías

- **Runtime**: Node.js 20.x
- **Framework**: Express.js
- **Base de datos**: MySQL 8.0
- **Autenticación**: JWT + Google OAuth
- **Validación**: Joi
- **Testing**: Jest + Supertest
- **Documentación**: Swagger/OpenAPI
- **Logging**: Winston
- **Process Manager**: PM2
- **CI/CD**: GitHub Actions

## 💻 Desarrollo Local

### Prerrequisitos

- Node.js 20.x
- MySQL 8.0 (o Docker)
- Git

### Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repo-url>
cd ionic-bookings-hub/backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tu configuración
```

4. **Iniciar base de datos con Docker**
```bash
cd ..
docker-compose up -d
```

5. **Ejecutar migraciones/seeds**
```bash
npm run seed-data
```

6. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

### Scripts Disponibles

```bash
npm start          # Iniciar servidor
npm run dev        # Desarrollo con nodemon
npm test           # Ejecutar todos los tests
npm run test:unit  # Solo tests unitarios
npm run test:watch # Tests en modo watch
npm run seed-data  # Poblar base de datos
```

## 🚀 Deployment en Servidor Ubuntu

### Paso 1: Preparar el Servidor

1. **Ejecutar script de instalación**
```bash
wget https://raw.githubusercontent.com/tu-usuario/ionic-bookings-hub/main/scripts/server-setup.sh
chmod +x server-setup.sh
./server-setup.sh
```

2. **Configurar PM2 startup**
```bash
# Ejecutar el comando que aparece después del script
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

### Paso 2: Configurar GitHub Self-Hosted Runner

1. **En tu repositorio GitHub**:
   - Ve a Settings → Actions → Runners
   - Click "New self-hosted runner"
   - Selecciona "Linux"

2. **En tu servidor**:
```bash
# Ejecutar los comandos que GitHub te proporciona
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz
./config.sh --url https://github.com/tu-usuario/ionic-bookings-hub --token TU_TOKEN
./run.sh
```

3. **Configurar como servicio**:
```bash
sudo ./svc.sh install
sudo ./svc.sh start
```

### Paso 3: Configurar Variables de Entorno

```bash
cd ~/ionic-bookings-hub/backend
cp .env.production.example .env
nano .env  # Editar con tu configuración
```

### Paso 4: Configurar Base de Datos

```bash
# Iniciar MySQL con Docker
cd ~/ionic-bookings-hub
docker-compose up -d

# O configurar MySQL nativo
sudo apt install mysql-server
sudo mysql_secure_installation
```

### Paso 5: Primer Deploy

```bash
git push origin main  # Esto activará el GitHub Action
```

### Scripts PM2

```bash
npm run pm2:start     # Iniciar con PM2
npm run pm2:stop      # Detener aplicación
npm run pm2:restart   # Reiniciar aplicación
npm run pm2:status    # Ver estado
npm run pm2:logs      # Ver logs
```

## 📁 Estructura del Proyecto

```
backend/
├── app.js                    # Punto de entrada
├── ecosystem.config.js       # Configuración PM2
├── package.json             
├── jest.config.json         # Configuración tests
├── swagger.js               # Configuración Swagger
├── config/                  # Configuraciones
│   ├── index.js
│   ├── credentials.js
│   └── db.js
├── controllers/             # Controladores
├── models/                  # Modelos de datos
├── routes/                  # Rutas API
├── middlewares/             # Middlewares
├── utils/                   # Utilidades
├── tests/                   # Tests
│   ├── unit/
│   ├── integration/
│   └── fixtures/
└── logs/                    # Archivos de log
```

## 📚 API Documentation

La documentación interactiva está disponible en:
- **Desarrollo**: http://localhost:3000/api-docs
- **Producción**: http://tu-servidor:3000/api-docs

### Endpoints Principales

- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/businesses` - Listar negocios
- `POST /api/bookings` - Crear reserva
- `GET /api/services` - Listar servicios

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Tests unitarios
npm run test:unit

# Tests con coverage
npm run test:coverage

# Tests en modo watch
npm run test:watch
```

### Cobertura de Tests

- ✅ Controladores (100%)
- ✅ Modelos (100%)
- ✅ Middlewares (100%)
- ✅ Rutas (100%)

## 📊 Logging

El sistema utiliza Winston para logging estructurado:

### Archivos de Log

- `logs/app.log` - Logs generales
- `logs/error.log` - Solo errores
- `logs/access.log` - Logs de acceso
- `logs/pm2-*.log` - Logs de PM2

### Niveles de Log

- `error` - Errores críticos
- `warn` - Advertencias
- `info` - Información general
- `debug` - Información de debug (solo desarrollo)

## 🔧 Configuración Avanzada

### Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `NODE_ENV` | Entorno (development/production) | ✅ |
| `PORT` | Puerto del servidor | ✅ |
| `DB_HOST` | Host de MySQL | ✅ |
| `DB_USER` | Usuario de MySQL | ✅ |
| `DB_PASSWORD` | Contraseña de MySQL | ✅ |
| `JWT_SECRET` | Secreto JWT | ✅ |
| `GOOGLE_CLIENT_ID` | Client ID de Google | ❌ |

### Monitoreo

```bash
# Estado de la aplicación
pm2 status

# Logs en tiempo real
pm2 logs bookings-hub-backend

# Reiniciar si hay problemas
pm2 restart bookings-hub-backend

# Información del sistema
pm2 monit
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs: `npm run pm2:logs`
2. Verifica el estado: `npm run pm2:status`
3. Consulta la documentación: `/api-docs`