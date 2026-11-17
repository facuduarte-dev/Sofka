import { useState } from "react";
import { iniciarSesion, registrarse } from "../api.js";
import "../styles/login.css";

// Campo de contraseña con el "ojito" para mostrar/ocultar (en el original lo hacía auth.js)
function CampoPassword({ id, value, onChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="input-icon">
      <i className="fa-solid fa-lock"></i>
      <input
        type={visible ? "text" : "password"}
        id={id}
        name="password"
        placeholder="********"
        minLength={8}
        maxLength={12}
        required
        value={value}
        onChange={onChange}
      />
      <i
        className={visible ? "fa-regular fa-eye ojo" : "fa-regular fa-eye-slash ojo"}
        role="button"
        tabIndex={0}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        onClick={() => setVisible(!visible)}
        onKeyDown={(e) => e.key === "Enter" && setVisible(!visible)}
      ></i>
    </div>
  );
}

// Login y registro. Si sale bien, App guarda la sesión (onLogin) y va a "Mi cuenta".
function Login({ onLogin }) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [registro, setRegistro] = useState({ nombre: "", email: "", password: "" });
  const [recordar, setRecordar] = useState(false);
  const [avisoLogin, setAvisoLogin] = useState("");
  const [avisoRegistro, setAvisoRegistro] = useState("");
  const [cargando, setCargando] = useState(""); // "login" | "registro" | ""

  async function enviarLogin(e) {
    e.preventDefault();
    setCargando("login");
    setAvisoLogin("");
    try {
      const datos = await iniciarSesion(login.email, login.password);
      onLogin(datos, recordar);
    } catch (err) {
      setAvisoLogin(err.message);
    } finally {
      setCargando("");
    }
  }

  async function enviarRegistro(e) {
    e.preventDefault();
    setCargando("registro");
    setAvisoRegistro("");
    try {
      const datos = await registrarse(registro.nombre, registro.email, registro.password);
      onLogin(datos, false);
    } catch (err) {
      setAvisoRegistro(err.message);
    } finally {
      setCargando("");
    }
  }

  return (
    <div className="page-login">
      <section className="titulo">
        <h1>
          Bienvenido a <img src="img/logo-tie-up-transparente.png" alt="Tie-Up" />
        </h1>
        <p>Inicia sesión o crea tu cuenta para comenzar</p>
      </section>

      <main className="login">
        <section className="contenedor-login">
          <div className="card login-card">
            <div className="icono-principal">
              <i className="fa-regular fa-user"></i>
            </div>
            <h2>Iniciar sesión</h2>
            <p>Accede a tu cuenta para continuar</p>

            <form onSubmit={enviarLogin}>
              <div className="campo">
                <label htmlFor="login-email">Correo electrónico</label>
                <div className="input-icon">
                  <i className="fa-regular fa-envelope"></i>
                  <input
                    type="email"
                    id="login-email"
                    placeholder="tu@email.com"
                    required
                    value={login.email}
                    onChange={(e) => setLogin({ ...login, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="campo">
                <label htmlFor="login-password">Contraseña</label>
                <CampoPassword
                  id="login-password"
                  value={login.password}
                  onChange={(e) => setLogin({ ...login, password: e.target.value })}
                />
              </div>

              {avisoLogin && (
                <div className="feedback error" role="alert">
                  {avisoLogin}
                </div>
              )}

              <div className="extras">
                <label>
                  <input
                    type="checkbox"
                    checked={recordar}
                    onChange={(e) => setRecordar(e.target.checked)}
                  />
                  Recordarme
                </label>
              </div>

              <button type="submit" disabled={cargando === "login"}>
                {cargando === "login" ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </form>
          </div>

          <div className="card registro-card">
            <div className="icono-principal">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <h2>Crear cuenta</h2>
            <p>Únete a Tie-Up y consigue más oportunidades</p>

            <form onSubmit={enviarRegistro}>
              <div className="campo">
                <label htmlFor="register-name">Nombre completo</label>
                <div className="input-icon">
                  <i className="fa-regular fa-user"></i>
                  <input
                    type="text"
                    id="register-name"
                    placeholder="Tu nombre completo"
                    required
                    value={registro.nombre}
                    onChange={(e) => setRegistro({ ...registro, nombre: e.target.value })}
                  />
                </div>
              </div>

              <div className="campo">
                <label htmlFor="register-email">Correo electrónico</label>
                <div className="input-icon">
                  <i className="fa-regular fa-envelope"></i>
                  <input
                    type="email"
                    id="register-email"
                    placeholder="tu@email.com"
                    required
                    value={registro.email}
                    onChange={(e) => setRegistro({ ...registro, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="campo">
                <label htmlFor="register-password">Contraseña</label>
                <CampoPassword
                  id="register-password"
                  value={registro.password}
                  onChange={(e) => setRegistro({ ...registro, password: e.target.value })}
                />
                <small>
                  <i className="fa-regular fa-circle-check"></i>
                  Entre 8 y 12 caracteres, con mayúscula, minúscula, número y símbolo
                </small>
              </div>

              {avisoRegistro && (
                <div className="feedback error" role="alert">
                  {avisoRegistro}
                </div>
              )}

              <button type="submit" disabled={cargando === "registro"}>
                {cargando === "registro" ? "Creando cuenta..." : "Registrarse"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <p className="seguridad">
        <i className="fa-solid fa-shield-halved"></i>
        Tu información está segura con nosotros.
      </p>
    </div>
  );
}

export default Login;
