/**
 * Configuración de PM2 para Bookings Hub Backend
 * Este archivo define cómo PM2 debe manejar la aplicación
 */

module.exports = {
  apps: [
    {
      name: 'bookings-hub-backend',
      script: 'app.js',
      cwd: '/var/www/bookings-hub/current', // Directorio donde está desplegado el código
      instances: 1, // Puedes usar 'max' para usar todos los cores
      exec_mode: 'fork', // o 'cluster' para múltiples instancias
      watch: false, // No usar watch en producción
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3001
      },
      // Configuración de logs
      log_file: '/var/www/bookings-hub/current/logs/pm2-combined.log',
      out_file: '/var/www/bookings-hub/current/logs/pm2-out.log',
      error_file: '/var/www/bookings-hub/current/logs/pm2-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Configuración de restart
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Variables de entorno adicionales
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      }
    }
  ],

  // Configuración de deploy (opcional, para deploy manual)
  deploy: {
    production: {
      user: 'ubuntu',
      host: '213.165.93.50',
      ref: 'origin/main',
      repo: 'git@github.com:tu-usuario/ionic-bookings-hub.git', // Reemplaza con tu repo
      path: '/home/ubuntu/ionic-bookings-hub',
      'pre-deploy-local': '',
      'post-deploy': 'cd backend && npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
