import { useEffect, useState } from "react";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Inicio from "./pages/Inicio.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import Soporte from "./pages/Soporte.jsx";
import Login from "./pages/Login.jsx";
import MiCuenta from "./pages/MiCuenta.jsx";
import MisServicios from "./pages/MisServicios.jsx";
import Contrataciones from "./pages/Contrataciones.jsx";
import PerfilAna from "./pages/PerfilAna.jsx";

// Lee la sesión guardada (localStorage si eligió "Recordarme", si no sessionStorage).
// Si el token ya venció, la descartamos.
function leerSesion() {
  try {
    const guardada = localStorage.getItem("sesion") || sessionStorage.getItem("sesion");
    if (!guardada) return null;
    const sesion = JSON.parse(guardada);
    // El token JWT tiene 3 partes separadas por "."; la del medio trae la fecha de vencimiento
    const { exp } = JSON.parse(atob(sesion.token.split(".")[1]));
    return exp * 1000 > Date.now() ? sesion : null;
  } catch {
    return null;
  }
}

// Pantallas que solo se ven con la sesión iniciada
const PANTALLAS_PRIVADAS = ["MiCuenta", "MisServicios", "Contrataciones"];

// Sin React Router (regla de la guía): la pantalla actual es un estado.
// App decide qué página mostrar y les pasa a los hijos funciones para cambiarla.
function App() {
  const [pantalla, setPantalla] = useState("Inicio");
  // Filtro que el Inicio le pasa al Catálogo (buscador o clic en categoría)
  const [filtro, setFiltro] = useState({ texto: "", categoria: "" });
  // Sesión: { token, usuario } o null. Se inicializa leyendo el navegador.
  const [sesion, setSesion] = useState(leerSesion);

  // Cada vez que cambia la pantalla, volvemos arriba (como al cambiar de página)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pantalla]);

  // Para los links a secciones del Inicio (#freelancers, #resenas):
  // primero mostramos Inicio y, cuando ya se dibujó, bajamos hasta la sección.
  function irASeccion(id) {
    setPantalla("Inicio");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function guardarSesion(datos, recordar) {
    const almacen = recordar ? localStorage : sessionStorage;
    almacen.setItem("sesion", JSON.stringify(datos));
    setSesion(datos);
    setPantalla("MiCuenta");
  }

  function cerrarSesion() {
    localStorage.removeItem("sesion");
    sessionStorage.removeItem("sesion");
    setSesion(null);
    setPantalla("Inicio");
  }

  // Si la pantalla es privada y no hay sesión, mostramos el Login en su lugar
  const pantallaVisible = PANTALLAS_PRIVADAS.includes(pantalla) && !sesion ? "Login" : pantalla;

  function irACatalogo(nuevoFiltro) {
    setFiltro(nuevoFiltro);
    setPantalla("Catalogo");
  }

  return (
    <>
      <NavBar setPantalla={setPantalla} irASeccion={irASeccion} sesion={sesion} />

      {pantallaVisible === "Inicio" && (
        <Inicio setPantalla={setPantalla} irACatalogo={irACatalogo} />
      )}
      {pantallaVisible === "Catalogo" && (
        <Catalogo filtroInicial={filtro} setPantalla={setPantalla} />
      )}
      {pantallaVisible === "Soporte" && <Soporte />}
      {pantallaVisible === "Login" && <Login onLogin={guardarSesion} />}
      {pantallaVisible === "MiCuenta" && (
        <MiCuenta sesion={sesion} setPantalla={setPantalla} onCerrarSesion={cerrarSesion} />
      )}
      {pantallaVisible === "MisServicios" && (
        <MisServicios sesion={sesion} setPantalla={setPantalla} />
      )}
      {pantallaVisible === "Contrataciones" && <Contrataciones />}
      {pantallaVisible === "PerfilAna" && <PerfilAna setPantalla={setPantalla} />}

      <Footer setPantalla={setPantalla} irASeccion={irASeccion} />
    </>
  );
}

export default App;
