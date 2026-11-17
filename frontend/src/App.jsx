import { useState } from "react";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import Inicio from "./pages/Inicio.jsx";
import Soporte from "./pages/Soporte.jsx";
import Login from "./pages/Login.jsx";
import MiCuenta from "./pages/MiCuenta.jsx";
import MisServicios from "./pages/MisServicios.jsx";
import Contrataciones from "./pages/Contrataciones.jsx";
import PerfilAna from "./pages/PerfilAna.jsx";

function App() {
  const [pantalla, setPantalla] = useState("Inicio");
  return (
    <>
      <NavBar setPantalla={setPantalla} />

      {pantalla === "Inicio" && <Inicio setPantalla={setPantalla} />}
      {pantalla === "Soporte" && <Soporte />}
      {pantalla === "Login" && <Login />}
      {pantalla === "MiCuenta" && <MiCuenta />}
      {pantalla === "MisServicios" && <MisServicios />}
      {pantalla === "Contrataciones" && <Contrataciones />}
      {pantalla === "PerfilAna" && <PerfilAna />}

      <Footer setPantalla={setPantalla} />
    </>
  );
}

export default App;
