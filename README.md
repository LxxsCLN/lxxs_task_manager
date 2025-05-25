# 🗂️ NEXT Task Manager

Aplicación web completa para la gestión de tareas entre usuarios, con autenticación, roles y filtrado dinámico de tareas. Desarrollada con **React (Vite + TypeScript + Tailwind + shadcn)** en el frontend y **Node.js + Express + PostgreSQL** en el backend.

## 🌐 Demo

🔗 [Ver aplicación en Render](https://lxxs-task-manager.onrender.com)

---

## ✨ Características principales

-   🧑‍💻 Registro e inicio de sesión con autenticación JWT
-   🗃️ Vista en grid con tareas asignadas y filtrado por estado/usuario (servidor)
-   🌗 Soporte para modo claro / oscuro
-   🌍 Internacionalización: Español / Inglés
-   🧩 Modales dinámicos según el estado y rol del usuario
-   🔐 Rutas protegidas por autenticación y roles
-   ✅ Validación de formularios
-   ☁️ Despliegue en Render.com

---

## 📁 Estructura del Proyecto

### Frontend (`/client`)

-   **Vite + React + TypeScript**
-   **TailwindCSS** + **shadcn/ui** para los componentes UI
-   **Zod** para validaciones de formularios
-   **React Router DOM** para manejo de rutas protegidas
-   **Axios custom instance** para autenticación con JWT

### Backend (`/server`)

-   **Node.js + Express**
-   **PostgreSQL** como base de datos
-   **Zod** para validaciones de entrada
-   **bcrypt** para hasheo de contraseñas
-   **JWT** para autenticación
-   Middlewares de:
    -   **authMiddleware**: Verifica JWT
    -   **roleMiddleware**: Protege rutas exclusivas para administradores

---

## 🔐 Roles y Permisos

| Rol     | Permisos                                                   |
| ------- | ---------------------------------------------------------- |
| `user`  | Ver solo tareas asignadas, cambiar estado y agregar notas  |
| `admin` | Ver todas las tareas, crear tareas, editar cualquier tarea |

---

## 🧠 Lógica de los Modales

-   Tarea `completed`: muestra notas del usuario asignado
-   Tarea en otro estado:
    -   `user`: formulario para cambiar estado y agregar nota
    -   `admin`: formulario completo de edición (título, descripción, usuario, prioridad, estado), exluyendo notas.

---

## 📦 Instalación y ejecución local

### 🔧 Requisitos previos

-   Node.js v18+
-   PostgreSQL
-   (Opcional) Docker y Docker Compose

### ⚙️ Configuración

#### 1. Clona el repositorio:

```bash
git clone https://github.com/LxxsCLN/lxxs_task_manager.git
cd task-manager-app
```

#### 2. Configura las variables de entorno:

Backend (/backend/.env)

```bash
DATABASE_URL=postgres://usuario:contraseña@host:puerto/nombre_de_base
JWT_SECRET=YOUR_JWT_SECRET
```

Frontend (/frontend/.env)

```bash
VITE_APP_SERVER_URL='http://localhost:5000'
```

#### 3. Instala dependencias y ejecuta:

```bash
# Backend
cd backend
npm install
node index.js

# Frontend
cd frontend
npm install
npm run dev
```

-   El frontend se sirve en el puerto 5173.

-   El backend corre en Node.js en el puerto 5000.

#### 4. (Opcional) Ejecuta en un contenedor con Docker:

```
sudo docker-compose up --build
```

-   El frontend se sirve con Nginx en el puerto 3000.

-   El backend corre en Node.js en el puerto 5000.

-   Si necesitas parar los contenedores usa `docker-compose down`.

## 🗃️ Base de Datos

-   **Tablas**: users, tasks
-   **Scripts SQL** incluidos en backend/db/init.sql

## 🚀 Despliegue

La aplicación está desplegada en Render.com. Puedes seguir estos pasos para desplegarla:

-   Crea un nuevo servicio web en Render para el backend.

-   Crea un servicio estático para el frontend.

-   Configura las variables de entorno en cada servicio.

-   Sube los scripts de migración o configura Prisma.

## 🧪 Endpoints API (resumen)

| Método | Ruta               | Descripción                 |
| ------ | ------------------ | --------------------------- |
| POST   | /api/auth/login    | Iniciar sesión              |
| POST   | /api/auth/register | Registro de usuario         |
| GET    | /api/tasks         | Listar tareas (con filtros) |
| POST   | /api/tasks         | Crear nueva tarea           |
| PUT    | /api/tasks/\:id    | Editar tarea                |
| DELETE | /api/tasks/\:id    | Eliminar tarea              |
| GET    | /api/users         | Listar usuarios             |

-   Puedes importar la colección de Postman desde /server/docs/postman_collection.json.
-   Agregar Header Authorization = "Bearer <token>".
-   El token lo puedes obtener iniciando sesión con el endpoint '/api/auth/login'
-   Algunos endpoints protegidos requieren un token de un usuario con rol de admin

## 🧑‍💻 Tecnologías Usadas

-   Frontend: React, Vite, TailwindCSS, shadcn/ui, React Router, Zod, Axios

-   Backend: Node.js, Express, PostgreSQL, JWT, bcrypt, Zod

-   Infraestructura: Render.com

## ✅ To-do (Mejoras futuras)

-   Tests automatizados
-   Vista de Tabla
-   Estadísticas con gráficas de tareas y usuarios
-   Gestión de usuarios desde el frontend (solo admin)
-   Registro con rol 'admin'
-   **Workspaces**: Crear espacios de trabajos para gestionar tareas y usuarios de proyectos diferentes.

## 📄 Licencia

MIT

## 📄 Autor

Desarrollado por [Luis Espino](https://luiseseberre.com)
