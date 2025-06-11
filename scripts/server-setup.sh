#!/bin/bash

# Script de instalación para servidor Ubuntu
# Este script instala todas las dependencias necesarias para el proyecto

echo "🚀 Instalando dependencias del servidor Ubuntu para Bookings Hub..."

# Actualizar el sistema
echo "📦 Actualizando sistema..."
sudo apt update && sudo apt upgrade -y

# Instalar Node.js y npm
echo "📦 Instalando Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
echo "✅ Versión de Node.js: $(node --version)"
echo "✅ Versión de npm: $(npm --version)"

# Instalar PM2 globalmente
echo "📦 Instalando PM2..."
sudo npm install -g pm2

# Configurar PM2 para iniciarse automáticamente en el boot
echo "⚙️ Configurando PM2 startup..."
pm2 startup
echo "ℹ️  Ejecuta el comando que aparece arriba para completar la configuración de startup"

# Instalar Git (si no está instalado)
echo "📦 Instalando Git..."
sudo apt install -y git

# Instalar Docker y Docker Compose (opcional, para la base de datos)
echo "📦 Instalando Docker..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Instalar Docker Compose
echo "📦 Instalando Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Crear directorio del proyecto
echo "📁 Creando directorio del proyecto..."
mkdir -p ~/ionic-bookings-hub
cd ~/ionic-bookings-hub

echo "✅ Instalación completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Clona tu repositorio: git clone <tu-repo-url> ."
echo "2. Configura el self-hosted runner de GitHub"
echo "3. Configura las variables de entorno"
echo "4. Inicia la base de datos con Docker"
echo "5. Ejecuta el primer deploy"
echo ""
echo "🔗 Comandos útiles:"
echo "  - Verificar PM2: pm2 status"
echo "  - Ver logs de PM2: pm2 logs"
echo "  - Reiniciar aplicación: pm2 restart bookings-hub-backend"
