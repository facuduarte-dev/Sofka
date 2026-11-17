import { useState } from "react";

function NavBar({ setPantalla, irASeccion, sesion }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Cambia de pantalla y cierra el menú (en celular)
  function ir(pantalla) {
    setPantalla(pantalla);
    setMenuAbierto(false);
  }

  function irA(seccion) {
    irASeccion(seccion);
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
            <li><button className="link" onClick={() => ir("Catalogo")}>Servicios</button></li>
            <li><button className="link" onClick={() => irA("freelancers")}>Freelancers</button></li>
            <li><button className="link" onClick={() => irA("resenas")}>Reseñas</button></li>
            <li><button className="link" onClick={() => ir("Soporte")}>Soporte</button></li>
          </ul>
        </div>

        <div className="navSession">
          {/* Si hay sesión mostramos "Mi cuenta"; si no, el acceso al login */}
          {sesion ? (
            <button className="link" onClick={() => ir("MiCuenta")}>
              <i className="fa-regular fa-user"></i> {sesion.usuario.nombre}
            </button>
          ) : (
            <button className="link" onClick={() => ir("Login")}>
              Registrarse / Iniciar Sesión
            </button>
          )}
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
