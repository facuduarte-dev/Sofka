import { useState } from "react";
import { enviarContacto } from "../api.js";
import "../styles/soporte.css";

// Formulario de contacto real: el mensaje se guarda en MongoDB (POST /contacto)
// y el administrador lo ve en su panel.
function Soporte() {
  // Un solo estado con todos los campos del formulario
  const [form, setForm] = useState({ tema: "", mensaje: "", email: "" });
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState(null); // { tipo: "exito" | "error", texto }

  // Sirve para los 3 campos: usa el atributo name para saber cuál cambió
  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function enviar(e) {
    e.preventDefault();

    // Validación en el frontend: avisamos antes de molestar al servidor
    if (!form.tema.trim() || !form.mensaje.trim() || !form.email.trim()) {
      setAviso({ tipo: "error", texto: "Completa todos los campos." });
      return;
    }

    setEnviando(true);
    setAviso(null);
    try {
      const respuesta = await enviarContacto(form);
      setAviso({ tipo: "exito", texto: respuesta.mensaje });
      setForm({ tema: "", mensaje: "", email: "" }); // limpiamos el formulario
    } catch (err) {
      setAviso({ tipo: "error", texto: err.message });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="page-soporte">
      <section className="contacto">
        <span className="etiqueta">
          <i className="fa-solid fa-headset"></i>
          ESTAMOS PARA AYUDARTE
        </span>

        <h1>Contacta con soporte</h1>

        <p className="descripcion">
          ¿Tienes dudas, problemas o sugerencias?
          <br />
          Nuestro equipo está listo para ayudarte.
        </p>

        <form className="formulario" id="support-form" onSubmit={enviar} noValidate>
          <div className="grupo">
            <div className="icono">
              <i className="fa-regular fa-envelope"></i>
            </div>
            <div className="contenido">
              <label htmlFor="support-topic">¿En qué te podemos ayudar?</label>
              <small>Cuéntanos en qué podemos ayudarte.</small>
              <input id="support-topic" name="tema" type="text" value={form.tema} onChange={cambiar} />
            </div>
          </div>

          <div className="grupo">
            <div className="icono">
              <i className="fa-regular fa-file-lines"></i>
            </div>
            <div className="contenido">
              <label htmlFor="support-message">Describe tu consulta</label>
              <small>Cuéntanos más detalles sobre tu consulta o tu problema.</small>
              <textarea
                id="support-message"
                name="mensaje"
                placeholder="Escribe tu mensaje aquí..."
                value={form.mensaje}
                onChange={cambiar}
              ></textarea>
            </div>
          </div>

          <div className="grupo">
            <div className="icono">
              <i className="fa-solid fa-at"></i>
            </div>
            <div className="contenido">
              <label htmlFor="support-email">Correo electrónico</label>
              <small>Te responderemos a este correo.</small>
              <input
                id="support-email"
                name="email"
                type="email"
                placeholder="ejemplo@correo.com"
                value={form.email}
                onChange={cambiar}
              />
            </div>
          </div>
        </form>

        {aviso && (
          <p className={"aviso " + aviso.tipo} role="alert">
            {aviso.texto}
          </p>
        )}

        {/* El botón está fuera del form, por eso usa form="support-form" (igual que el original) */}
        <button className="btn" type="submit" form="support-form" disabled={enviando}>
          <i className="fa-regular fa-paper-plane"></i>
          {enviando ? "Enviando..." : "Enviar un mensaje"}
        </button>

        <p className="seguridad">
          <i className="fa-regular fa-circle-check"></i>
          Tu información está segura con nosotros
        </p>
      </section>
    </div>
  );
}

export default Soporte;
