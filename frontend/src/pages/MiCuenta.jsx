import PanelAdmin from "../components/PanelAdmin.jsx";
import "../styles/mi-cuenta.css";
import "../styles/panel.css";

// Mi cuenta: datos del usuario que inició sesión (vienen del token/login)
function MiCuenta({ sesion, setPantalla, onCerrarSesion }) {
  const { usuario } = sesion;
  const esAdmin = usuario.rol === "admin";

  return (
    <div className="page-micuenta">
      <section className="title">
        <h2>Mi cuenta</h2>
        <p>Analiza tus datos y tu perfil profesional</p>
      </section>

      <section className="porfile">
        <div>
          <img
            id="fotoPerfil"
            src="img/clker-free-vector-images-avatar-294480.svg"
            alt="Foto de perfil"
          />
          <h2>Información personal</h2>
          <ul>
            {esAdmin && (
              <li>
                <button className="link" onClick={() => setPantalla("MisServicios")}>
                  <i className="fa-solid fa-plus"></i> Publicar servicio
                </button>
              </li>
            )}
            <li>
              <button className="link" onClick={() => setPantalla("Contrataciones")}>
                <i className="fa-solid fa-briefcase"></i> Mis Contrataciones
              </button>
            </li>
          </ul>
        </div>

        <div>
          <div className="form">
            <form>
              <label htmlFor="profile-name">Nombre completo</label>
              <input type="text" id="profile-name" value={usuario.nombre} readOnly />

              <label htmlFor="profile-email">Correo electrónico</label>
              <input type="email" id="profile-email" value={usuario.email} readOnly />

              <label htmlFor="profile-rol">Tipo de cuenta</label>
              <input
                type="text"
                id="profile-rol"
                value={esAdmin ? "Administrador" : "Usuario"}
                readOnly
              />
            </form>
          </div>

          <button className="btn-panel btn-secundario" onClick={onCerrarSesion}>
            <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
          </button>
        </div>
      </section>

      {/* El panel solo existe para el admin (y el backend igual valida el rol) */}
      {esAdmin && <PanelAdmin token={sesion.token} setPantalla={setPantalla} />}
    </div>
  );
}

export default MiCuenta;
