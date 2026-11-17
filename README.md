# Tie-Up

Plataforma para conectar clientes con profesionales freelance de diseño, desarrollo, marketing, edición, redacción e IA.

Proyecto final de **Jóvenes creaTIvos 2026 (Sofka) – Ruta avanzada**: migración del Tie-Up original (HTML, CSS, JS, PHP y MySQL) a una app full stack con **React + Vite** en el frontend y **Express + MongoDB** en el backend.

🌐 **Frontend publicado:** https://facuduarte-dev.github.io/Sofka/

> El backend corre en local (`localhost:3000`). Para que el catálogo, el contacto y el login funcionen en la página publicada, el backend y MongoDB tienen que estar encendidos en la misma computadora.

## Funcionalidades

| Requisito | Dónde está |
|---|---|
| Página de inicio con marca propia | `frontend/src/pages/Inicio.jsx` |
| Catálogo de servicios (desde MongoDB) con búsqueda y filtros | `frontend/src/pages/Catalogo.jsx` · `GET /servicios` |
| Formulario de contacto real (se guarda en MongoDB) | `frontend/src/pages/Soporte.jsx` · `POST /contacto` |
| Registro e inicio de sesión | `frontend/src/pages/Login.jsx` · `POST /auth/registro`, `POST /auth/login` |
| Panel de administrador con login | `frontend/src/components/PanelAdmin.jsx` (dentro de *Mi cuenta*) |
| Publicar / eliminar servicios (solo admin) | `frontend/src/pages/MisServicios.jsx` · `POST` y `DELETE /servicios` |
| Responsive (celular y computadora) con menú hamburguesa | `frontend/src/components/NavBar.jsx` |
| Estados de carga y errores claros | `frontend/src/components/Estado.jsx` |

## Tecnologías

- **Frontend:** React 19, Vite, CSS (sin librerías de UI), Font Awesome.
- **Backend:** Node.js, Express 5, Mongoose (MongoDB), bcryptjs (hash de contraseñas), jsonwebtoken (sesiones con JWT), cors, dotenv.
- **Base de datos:** MongoDB 4.4 en Docker.
- **Deploy:** GitHub Pages con GitHub Actions.

## Estructura

```
Sofka/
├── backend/
│   ├── models/          # Schemas de Mongoose: Servicio, Mensaje, Usuario
│   ├── routes/          # Rutas de Express: servicios, contacto, auth
│   ├── middleware/      # verificarToken y soloAdmin
│   ├── server.js        # Arranque del servidor y conexión a MongoDB
│   ├── seed.js          # Carga servicios de ejemplo
│   ├── crearAdmin.js    # Crea el usuario administrador
│   └── .env.example
├── frontend/
│   ├── public/img/      # Imágenes del Tie-Up original
│   └── src/
│       ├── api.js       # Todas las llamadas fetch al backend
│       ├── App.jsx      # Navegación entre pantallas y sesión
│       ├── components/  # Piezas reutilizables (NavBar, Footer, tarjetas...)
│       ├── pages/       # Una pantalla por archivo
│       └── styles/      # CSS del original, uno por pantalla
├── .github/workflows/   # Deploy a GitHub Pages
├── README.md
└── CAMBIOS.md
```

## Cómo correrlo en local

Requisitos: Node.js 22 y Docker.

**1. MongoDB**

```bash
docker run -d --name tieup-mongo -p 27017:27017 -v tieup-mongo-data:/data/db mongo:4.4
```

Si el contenedor ya existe y está apagado: `docker start tieup-mongo`.

> Se usa MongoDB 4.4 porque las versiones 5 o superiores necesitan un procesador con AVX.

**2. Backend**

```bash
cd backend
cp .env.example .env      # completar JWT_SECRET y los datos del admin
npm install
npm run seed              # carga servicios de ejemplo
npm run crear-admin       # crea el administrador definido en el .env
npm run dev               # http://localhost:3000
```

**3. Frontend**

```bash
cd frontend
cp .env.example .env
npm install
npm run dev               # http://localhost:5173/Sofka/
```

## API

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/servicios` | Público | Lista de servicios |
| GET | `/servicios/:id` | Público | Un servicio |
| POST | `/servicios` | Admin | Publica un servicio |
| DELETE | `/servicios/:id` | Admin | Elimina un servicio |
| POST | `/contacto` | Público | Envía un mensaje de contacto |
| GET | `/contacto` | Admin | Lista los mensajes recibidos |
| POST | `/auth/registro` | Público | Crea una cuenta |
| POST | `/auth/login` | Público | Inicia sesión y devuelve un token |

Las rutas de admin necesitan el header `Authorization: Bearer <token>`.

## Scripts

| Carpeta | Comando | Qué hace |
|---|---|---|
| backend | `npm run dev` | Servidor con reinicio automático |
| backend | `npm run seed` | Carga servicios de ejemplo |
| backend | `npm run crear-admin` | Crea o actualiza el admin |
| frontend | `npm run dev` | Servidor de desarrollo de Vite |
| frontend | `npm run build` | Genera la versión de producción |
| frontend | `npm run lint` | Revisa el código con ESLint |
