function NavBar({ setPantalla }) {
  return (
    <nav>
      <button onClick={() => setPantalla("Inicio")}>Inicio</button>
      <button onClick={() => setPantalla("Soporte")}>Soporte</button>
      <button onClick={() => setPantalla("Login")}>Login</button>
      <button onClick={() => setPantalla("MiCuenta")}>MiCuenta</button>
      <button onClick={() => setPantalla("MisServicios")}>MisServicios</button>
      <button onClick={() => setPantalla("Contrataciones")}>
        Contrataciones
      </button>
      <button onClick={() => setPantalla("PerfilAna")}>PerfilAna</button>
    </nav>
  );
}

export default NavBar;
