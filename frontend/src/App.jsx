import { useState } from "react";
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
      <button onClick={() => setPantalla("Inicio")}>Inicio</button>
      <button onClick={() => setPantalla("Soporte")}>Soporte</button>
      <button onClick={() => setPantalla("Login")}>Login</button>
      <button onClick={() => setPantalla("MiCuenta")}>MiCuenta</button>
      <button onClick={() => setPantalla("MisServicios")}>MisServicios</button>
      <button onClick={() => setPantalla("Contrataciones")}>Contrataciones</button>
      <button onClick={() => setPantalla("PerfilAna")}>PerfilAna</button>

      {pantalla === "Inicio" && <Inicio />}
      {pantalla === "Soporte" && <Soporte />}
      {pantalla === "Login" && <Login />}
      {pantalla === "MiCuenta" && <MiCuenta />}
      {pantalla === "MisServicios" && <MisServicios />}
      {pantalla === "Contrataciones" && <Contrataciones />}
      {pantalla === "PerfilAna" && <PerfilAna />}
    </>
  );
}

export default App;
