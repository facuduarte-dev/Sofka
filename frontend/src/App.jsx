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

// Sin React Router (regla de la guía): la pantalla actual es un estado.
// App decide qué página mostrar y les pasa a los hijos funciones para cambiarla.
function App() {
  const [pantalla, setPantalla] = useState("Inicio");
  // Filtro que el Inicio le pasa al Catálogo (buscador o clic en categoría)
  const [filtro, setFiltro] = useState({ texto: "", categoria: "" });

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

  function irACatalogo(nuevoFiltro) {
    setFiltro(nuevoFiltro);
    setPantalla("Catalogo");
  }

  return (
    <>
      <NavBar setPantalla={setPantalla} irASeccion={irASeccion} />

      {pantalla === "Inicio" && <Inicio setPantalla={setPantalla} irACatalogo={irACatalogo} />}
      {pantalla === "Catalogo" && <Catalogo filtroInicial={filtro} setPantalla={setPantalla} />}
      {pantalla === "Soporte" && <Soporte />}
      {pantalla === "Login" && <Login />}
      {pantalla === "MiCuenta" && <MiCuenta />}
      {pantalla === "MisServicios" && <MisServicios />}
      {pantalla === "Contrataciones" && <Contrataciones />}
      {pantalla === "PerfilAna" && <PerfilAna />}

      <Footer setPantalla={setPantalla} irASeccion={irASeccion} />
    </>
  );
}

export default App;
