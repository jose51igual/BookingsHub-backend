# 📋 Log de Pasos de Despliegue Backend - Bookings Hub

**Fecha:** 7 de Junio, 2025  
**Servidor:** VPS Piensa Solutions (213.165.93.50)  
**SO:** Debian 12  
**Usuario:** root  

## ✅ Pasos Completados

### 1. Configuración inicial del servidor
- [x] Conexión SSH al servidor (root@213.165.93.50)
- [x] Verificación del sistema: Debian 12 (Pretty Name: Debian GNU/Linux 12)
- [x] Actualización del sistema: `apt update && apt upgrade -y`
- [x] Instalación de herramientas básicas: `apt install -y curl wget git unzip software-properties-common gnupg lsb-release`

### 2. Instalación de Node.js
- [x] Añadir repositorio de Node.js: `curl -fsSL https://deb.nodesource.com/setup_18.x | bash -`
- [x] Instalación de Node.js: `apt-get install -y nodejs`
- [x] Verificación: Node.js v18.x y npm instalados correctamente

### 3. Instalación de PM2
- [x] Instalación global: `npm install -g pm2`
- [x] Verificación: PM2 instalado y funcionando

### 4. Instalación de Nginx
- [x] Instalación: `apt install -y nginx`
- [x] Verificación: Nginx active (running)

### 5. Instalación de MariaDB
- [x] Instalación: `apt install -y mariadb-server mariadb-client`
- [x] Verificación: MariaDB instalado correctamente

## 🔄 Próximos Pasos

### 6. Configuración de MariaDB
- [x] Configurar seguridad de MariaDB (completado)
- [x] Crear base de datos `bookings_hub` con charset utf8mb4
- [x] Crear usuario `bookings_user` con contraseña segura
- [x] Configurar permisos para el usuario
- [x] Importar esquema desde `reservas.sql` (7 tablas creadas)

### 7. Configuración de estructura de directorios
- [x] Crear `/var/www/bookings-hub/`
- [x] Crear subdirectorios (releases, shared, logs, etc.)
- [x] Configurar permisos básicos

### 8. Configuración de usuario deploy
- [x] Crear usuario `deploy` (uid=1000)
- [x] Añadir al grupo sudo
- [x] Configurar directorio .ssh
- [x] Configurar permisos sudo sin contraseña
- [x] Dar permisos sobre /var/www/bookings-hub
- [x] Generar claves SSH para GitHub Actions (privada y pública generadas)

### 9. Configuración de Nginx
- [x] Crear vhost para el backend
- [x] Configurar proxy al puerto 3000
- [x] Habilitar sitio

### 10. Configuración de SSL
- [x] Instalar Certbot
- [x] Configurar certificados SSL

### 11. GitHub Actions
- [ ] Configurar secrets en GitHub
- [ ] Realizar primer despliegue
- [ ] Verificar funcionamiento

## 📝 Notas importantes

- **IP del servidor:** 213.165.93.50
- **Dominio:** bookingshub.es
- **Base de datos:** MariaDB (compatible con MySQL)
- **Esquema:** Se importará desde `backend/reservas.sql`
- **Puerto backend:** 3000
- **Usuario despliegue:** deploy

## 🔧 Comandos ejecutados

```bash
# Actualización del sistema
apt update && apt upgrade -y

# Herramientas básicas
apt install -y curl wget git unzip software-properties-common gnupg lsb-release

# Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# PM2
npm install -g pm2

# Nginx
apt install -y nginx

# MariaDB
apt install -y mariadb-server mariadb-client
```

## ⚠️ Pendientes de configurar

- Dominio y DNS
- Contraseñas de base de datos
- Claves SSH para despliegue
- Variables de entorno
- Secrets de GitHub Actions


deploy@my-vps:~$ cat ~/.ssh/github_actions_key
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACAorx7gGbEvKTH+y5NOGZAXL/Ef0LKaLDTVGOl/5svjYQAAAKA/eTtNP3k7
TQAAAAtzc2gtZWQyNTUxOQAAACAorx7gGbEvKTH+y5NOGZAXL/Ef0LKaLDTVGOl/5svjYQ
AAAEBmCwwwcRF2i6oXrvU6YwlWpcZHbRjBeZ2cOhdiZ5vh1yivHuAZsS8pMf7Lk04ZkBcv
8R/QsposNNUY6X/my+NhAAAAG2dpdGh1Yi1hY3Rpb25zQGJvb2tpbmdzLWh1YgEC
-----END OPENSSH PRIVATE KEY-----
deploy@my-vps:~$ cat ~/.ssh/github_actions_key.pub
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAICivHuAZsS8pMf7Lk04ZkBcv8R/QsposNNUY6X/my+Nh github-actions@bookings-hub

GitHub Copilot: Estupendo. Pasamos al **Paso 11: GitHub Actions**.

Este paso es crucial para automatizar tus despliegues. Implica configurar la información sensible (secrets) en tu repositorio de GitHub y luego ejecutar tu flujo de trabajo de despliegue.

### 11.1. Configurar secrets en GitHub

Necesitarás añadir la siguiente información como "secrets" en la configuración de tu repositorio de GitHub. Ve a tu repositorio en GitHub, luego a `Settings` > `Secrets and variables` > `Actions`. Haz clic en `New repository secret` para cada uno:

1.  **`SSH_PRIVATE_KEY`**:
    *   **Valor:** El contenido completo de tu clave SSH privada que generaste para GitHub Actions. Esta es la clave que se encuentra en el servidor en `~/.ssh/github_actions_key` (la que comienza con `-----BEGIN OPENSSH PRIVATE KEY-----` y termina con `-----END OPENSSH PRIVATE KEY-----`).
        ```
        -----BEGIN OPENSSH PRIVATE KEY-----
        b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
        QyNTUxOQAAACAorx7gGbEvKTH+y5NOGZAXL/Ef0LKaLDTVGOl/5svjYQAAAKA/eTtNP3k7
        TQAAAAtzc2gtZWQyNTUxOQAAACAorx7gGbEvKTH+y5NOGZAXL/Ef0LKaLDTVGOl/5svjYQ
        AAAEBmCwwwcRF2i6oXrvU6YwlWpcZHbRjBeZ2cOhdiZ5vh1yivHuAZsS8pMf7Lk04ZkBcv
        8R/QsposNNUY6X/my+NhAAAAG2dpdGh1Yi1hY3Rpb25zQGJvb2tpbmdzLWh1YgEC
        -----END OPENSSH PRIVATE KEY-----
        ```
    *   **Importante:** Copia la clave completa, incluyendo las líneas de inicio y fin.

2.  **`SSH_HOST`**:
    *   **Valor:** La dirección IP de tu servidor.
        ```
        213.165.93.50
        ```

3.  **`SSH_USER`**:
    *   **Valor:** El nombre de usuario que usarás para el despliegue (el que creaste en el paso 8).
        ```
        deploy
        ```

4.  **`SSH_KNOWN_HOSTS`** (Opcional, pero recomendado para seguridad):
    *   **Valor:** Para obtener este valor, ejecuta en tu máquina local (o cualquier máquina que pueda conectarse a tu servidor por primera vez):
        ```bash
        ssh-keyscan -H 213.165.93.50
        ```
        Copia la salida de este comando y pégala como valor del secret. Esto ayuda a verificar la autenticidad del host al que se conecta la GitHub Action.

5.  **Otros secrets específicos de tu aplicación (si los necesitas en el proceso de build/deploy):**
    *   `DB_HOST`: `localhost` (o la IP/host de tu base de datos si es remota)
    *   `DB_USER`: `bookings_user`
    *   `DB_PASSWORD`: La contraseña segura que creaste para `bookings_user`.
    *   `DB_NAME`: `bookings_hub`
    *   `PORT`: `3000` (si tu aplicación lo necesita como variable de entorno)
    *   Cualquier otra API key o variable de entorno que tu aplicación necesite para construirse o ejecutarse. Estas se usarían para crear un archivo `.env` en el servidor durante el despliegue.

Una vez que hayas configurado estos secrets, tu workflow de GitHub Actions debería poder usarlos para conectarse a tu servidor y realizar las tareas de despliegue.

### 11.2. Realizar primer despliegue

Ahora que los secrets están configurados:

1.  Asegúrate de que tu archivo de workflow de GitHub Actions (generalmente en `.github/workflows/deploy.yml` o similar en tu repositorio) esté correctamente configurado para usar estos secrets y para realizar los pasos de despliegue (ej: clonar el repo, instalar dependencias, construir el proyecto si es necesario, reiniciar la aplicación con PM2).
2.  Puedes disparar el workflow manualmente desde la pestaña "Actions" de tu repositorio de GitHub, o se disparará automáticamente si lo tienes configurado para que se ejecute en un `push` a una rama específica (ej: `main` o `master`).

### 11.3. Verificar funcionamiento

Después de que el workflow de GitHub Actions se complete (esperemos que con éxito):

1.  **Revisa los logs del workflow** en GitHub para cualquier error.
2.  **Conéctate a tu servidor** y verifica que los archivos de la aplicación se hayan actualizado en `/var/www/bookings-hub/releases/` (o la estructura que uses) y que el enlace simbólico `current` apunte a la nueva release.
3.  **Verifica que tu aplicación esté corriendo** con PM2:
    ```bash
    pm2 list
    ```
    Y revisa los logs de PM2 si es necesario:
    ```bash
    pm2 logs [app_name_or_id]
    ```
4.  **Accede a tu aplicación** a través del navegador (`https://bookingshub.es`) para confirmar que todo funciona como se espera.

Una vez que hayas completado estos pasos y verificado que el despliegue automático funciona, puedes marcar todo el Paso 11 como completado en tu DEPLOYMENT_LOG.md.