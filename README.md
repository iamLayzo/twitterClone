# 🚀 Proyecto Laravel con MySQL en Docker

Este proyecto utiliza **Laravel**, **MySQL** y **Docker** para un entorno de desarrollo optimizado. Sigue los pasos para instalarlo y configurarlo correctamente.

---

## 📌 Requisitos previos

Asegúrate de tener instalado en tu máquina:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js y yarn](https://nodejs.org/)
- [Composer](https://getcomposer.org/)

---

## 🛠 Instalación del Proyecto

### 1️⃣ Clonar el repositorio
```sh
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
```

### 2️⃣ Crear el archivo `.env`
Copia el archivo de configuración de ejemplo:
```sh
cp .env.example .env
```
Abre `.env` y asegúrate de que la configuración de la base de datos sea:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=secret
```

### 3️⃣ Instalar dependencias PHP y Node.js
```sh
composer install
yarn install
```

---

## 🐳 **Configurar y ejecutar Docker**

### 4️⃣ Levantar los contenedores con Docker
Ejecuta el siguiente comando para iniciar el contenedor de MySQL:
```sh
docker-compose up -d
```
📌 **Esto hará lo siguiente:**
- Crea un contenedor con MySQL.
- Expone el puerto `3306` para conexiones externas.
- Usa un volumen persistente (`dbdata`).

Para verificar que el contenedor está corriendo:
```sh
docker ps
```

---

## 📂 **Base de datos y Migraciones**

### 5️⃣ Ejecutar migraciones de Laravel
Después de que el contenedor de MySQL esté listo, ejecuta:
```sh
php artisan migrate
```
Si quieres cargar datos iniciales (seeders), usa:
```sh
php artisan migrate --seed
```

### 🚀 Configuración de la Base de Datos

#### Ejecutar Migraciones y Seeders

Para configurar la base de datos y poblarla con datos iniciales, sigue estos pasos:

1. **Ejecutar Migraciones**: Esto creará las tablas necesarias en tu base de datos.
   
   ```sh
   php artisan migrate
   ```

2. **Ejecutar Seeders**: Esto llenará la base de datos con datos de ejemplo, incluyendo usuarios con la contraseña `123456`.

   ```sh
   php artisan db:seed
   ```

   Alternativamente, puedes ejecutar ambos comandos juntos para reiniciar la base de datos y poblarla de nuevo:

   ```sh
   php artisan migrate:fresh --seed
   ```

   ⚠️ **Nota**: El comando `migrate:fresh` eliminará todas las tablas de la base de datos antes de volver a crearlas, por lo que se perderán todos los datos existentes.

#### Verificar Usuarios en la Base de Datos

Para ver los usuarios creados y verificar que la contraseña es `123456`, puedes acceder a la base de datos MySQL dentro del contenedor Docker:

1. **Acceder al Contenedor Docker**: Ejecuta el siguiente comando para acceder al contenedor de la base de datos:

   ```sh
   docker exec -it laravel_db mysql -u root -p
   ```

   Cuando se te pida, ingresa la contraseña de MySQL. Si no la has cambiado, la contraseña por defecto es `secrete` o la que hayas configurado en tu archivo Docker.

2. **Seleccionar la Base de Datos**: Una vez dentro de MySQL, selecciona la base de datos de Laravel:

   ```sql
   USE laravel;
   ```

3. **Verificar Usuarios**: Ejecuta el siguiente comando para ver los usuarios:

   ```sql
   SELECT * FROM users;
   ```

   Esto mostrará una lista de usuarios creados por el seeder, todos con la contraseña `123456`.

Con estos pasos, podrás verificar que los usuarios se han creado correctamente y acceder a la base de datos para inspeccionar los datos.

---

## 🔥 **Ejecutar el proyecto**

### 6️⃣ Iniciar el servidor de Laravel
```sh
php artisan serve
```

### 7️⃣ Iniciar Vite (React/Vue con TailwindCSS)
```sh
yarn run dev
```

---

## ⚙️ **Comandos útiles**

✅ **Parar contenedores sin eliminar datos:**
```sh
docker-compose down
```

✅ **Eliminar contenedores y borrar datos (⚠️ Esto eliminará la base de datos):**
```sh
docker-compose down -v
```

✅ **Acceder a MySQL dentro del contenedor:**
```sh
docker exec -it laravel_db mysql -u laravel -p
# Ingresar la contraseña: secret
```

✅ **Reiniciar Laravel y Vite:**
```sh
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
yarn run dev
```

✅ **Actualizar dependencias:**
```sh
composer update
yarn update
```

---

---

### 📢 **Dudas o problemas?**
Si tienes algún error, revisa los logs con:
```sh
docker logs laravel_db
```
Si necesitas más ayuda, ¡avísame! 😃

