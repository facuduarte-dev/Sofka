import { useState } from "react";

function NavBar({ setPantalla }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Cambia de pantalla y cierra el menú (en celular)
  function ir(pantalla) {
    setPantalla(pantalla);
    setMenuAbierto(false);
  }

  return (
    <header className="site-header">
      <nav className={menuAbierto ? "navBar menu-abierto" : "navBar"}>
        <div className="logo">
          <img src="img/logo-tie-up-transparente.png" alt="Logo de Tie-Up" />
        </div>

        <div className="navLinks">
          <ul>
            <li><button className="link" onClick={() => ir("Inicio")}>Inicio</button></li>
            <li><a href="#servicios" onClick={() => setMenuAbierto(false)}>Servicios</a></li>
            <li><a href="#freelancers" onClick={() => setMenuAbierto(false)}>Freelancers</a></li>
            <li><a href="#resenas" onClick={() => setMenuAbierto(false)}>Reseñas</a></li>
            <li><button className="link" onClick={() => ir("Soporte")}>Soporte</button></li>
          </ul>
        </div>

        <div className="navSession">
          <button className="link" onClick={() => ir("Login")}>
            Registrarse / Iniciar Sesión
          </button>
        </div>

        <button
          className="menu-hamburguesa"
          type="button"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? "✕" : "☰"}
        </button>
      </nav>
    </header>
  );
}

export default NavBar;
