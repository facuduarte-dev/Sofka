# Cambios: de Tie-Up vanilla a React + Express

Resumen de qué cambió en la migración y por qué.

## Estructura

| Antes | Ahora | Por qué |
|---|---|---|
| Archivos HTML sueltos en `html/` | Componentes de React en `frontend/src` | Las partes repetidas (navbar, footer, tarjetas) se escriben una sola vez y se reutilizan. |
| PHP + MySQL (`php/`, `sql/`) | Express + MongoDB en `backend/` | Lo pide la guía de migración. Frontend y backend quedan separados. |
| Un `.css` enlazado en cada HTML | Un `.css` por pantalla importado desde su componente | En React todo el CSS es global; cada archivo se limitó a su pantalla (`.page-login`, `.page-soporte`...) para que no se pisen entre sí. |

## Navegación

- **Antes:** cada página era un archivo y se navegaba con `<a href="login.html">`.
- **Ahora:** es una sola página. La pantalla actual es un estado (`useState("Inicio")`) en `App.jsx`, y los botones lo cambian con `setPantalla`. No se usa React Router (regla de la guía).
- Las pantallas privadas (*Mi cuenta*, *Publicar servicios*, *Mis contrataciones*) muestran el Login si no hay sesión.

## De DOM a estado

- **Antes:** `navbar.js` usaba `querySelector` y `classList.toggle` para abrir el menú en celular.
- **Ahora:** `const [menuAbierto, setMenuAbierto] = useState(false)` y la clase se calcula a partir del estado. React actualiza la pantalla, nosotros no tocamos el HTML.
- Los formularios son **controlados**: cada input lee su valor del estado y lo actualiza con `onChange`.

## Datos

- Las tarjetas de categorías, freelancers, pasos y reseñas pasaron de HTML repetido a **arrays + `.map()`**.
- El **catálogo** ya no es fijo: los servicios se piden a MongoDB con `fetch` (en `api.js`) dentro de un `useEffect`.
- El **formulario de soporte** antes no hacía nada; ahora guarda el mensaje en MongoDB y el admin lo ve en su panel.
- El **formulario "Publicar servicios"** ahora guarda de verdad, pero solo para el administrador.

## Sesiones y seguridad

- **Antes:** sesión de PHP (`$_SESSION`).
- **Ahora:** al iniciar sesión el backend devuelve un **token JWT** que el frontend guarda (en `localStorage` si se marca *Recordarme*, si no en `sessionStorage`) y manda en el header `Authorization`.
- Las contraseñas se guardan con **hash bcrypt**, nunca en texto plano. Se mantuvo la regla del original: de 8 a 12 caracteres, con mayúscula, minúscula, número y símbolo.
- Las rutas que modifican datos o leen mensajes pasan por los middlewares `verificarToken` y `soloAdmin`.
- Los datos secretos (URL de la base, clave JWT, admin) van en `.env`, que no se sube a GitHub. Se sube `.env.example` como plantilla.

## Lo que se dejó afuera

- **Traducción (i18n.js):** el sitio quedó solo en español.
- **Subir archivos** en "Publicar servicios" y **cambiar foto / editar perfil** en *Mi cuenta*: no había backend para eso en el original.
- **Funcionalidad con IA:** no es obligatoria según lo indicado por los docentes.

## Problemas conocidos

- El backend corre en local: en la versión publicada en GitHub Pages, el catálogo, el contacto y el login solo funcionan en una computadora que tenga el backend y MongoDB encendidos.
- *Mis contrataciones* y el *Perfil de Ana* siguen siendo contenido de ejemplo (en el original también eran fijos).
- Los links "Sobre nosotros", "Preguntas frecuentes", "Política de privacidad" y "Términos" del footer no llevan a ninguna página (igual que en el original).
