// Todas las llamadas al backend viven en este archivo (regla de la guía: fetch en api.js).
// Los componentes nunca usan fetch directamente: llaman a estas funciones.

// La URL del backend sale de la variable de entorno VITE_API_URL (archivo .env).
// Si no está definida, usamos el backend local.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Función base: hace el fetch, agrega el token si hay sesión y unifica los errores.
async function pedir(ruta, { metodo = "GET", datos, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let respuesta;
  try {
    respuesta = await fetch(API_URL + ruta, {
      method: metodo,
      headers,
      body: datos ? JSON.stringify(datos) : undefined,
    });
  } catch {
    // fetch solo falla así cuando no hay conexión con el servidor
    throw new Error("No se pudo conectar con el servidor. Intenta de nuevo más tarde.");
  }

  const json = await respuesta.json().catch(() => ({}));

  // fetch NO lanza error con 400/401/500: hay que revisar respuesta.ok a mano
  if (!respuesta.ok) {
    throw new Error(json.error || "Ocurrió un error inesperado");
  }
  return json;
}

// ---- Servicios (catálogo) ----
export function obtenerServicios() {
  return pedir("/servicios");
}

export function crearServicio(servicio, token) {
  return pedir("/servicios", { metodo: "POST", datos: servicio, token });
}

export function eliminarServicio(id, token) {
  return pedir(`/servicios/${id}`, { metodo: "DELETE", token });
}

// ---- Contacto ----
export function enviarContacto(mensaje) {
  return pedir("/contacto", { metodo: "POST", datos: mensaje });
}

export function obtenerMensajes(token) {
  return pedir("/contacto", { token });
}

// ---- Sesión ----
export function iniciarSesion(email, password) {
  return pedir("/auth/login", { metodo: "POST", datos: { email, password } });
}

export function registrarse(nombre, email, password) {
  return pedir("/auth/registro", { metodo: "POST", datos: { nombre, email, password } });
}
