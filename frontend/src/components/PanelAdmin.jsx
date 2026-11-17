import { useEffect, useState } from "react";
import { obtenerServicios, eliminarServicio, obtenerMensajes } from "../api.js";
import { Cargando, MensajeError, SinResultados } from "./Estado.jsx";

// Panel privado del administrador: gestiona servicios y lee los mensajes de contacto.
// Las rutas del backend que usa (DELETE /servicios, GET /contacto) exigen token de admin.
function PanelAdmin({ token, setPantalla }) {
  const [pestana, setPestana] = useState("servicios"); // "servicios" | "mensajes"
  const [servicios, setServicios] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [intento, setIntento] = useState(0); // cambia al tocar "Reintentar"

  useEffect(() => {
    async function cargarDatos() {
      try {
        // Promise.all hace los dos pedidos a la vez y espera a que terminen ambos
        const [listaServicios, listaMensajes] = await Promise.all([
          obtenerServicios(),
          obtenerMensajes(token),
        ]);
        setServicios(listaServicios);
        setMensajes(listaMensajes);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargarDatos();
  }, [token, intento]);

  function reintentar() {
    setCargando(true);
    setError("");
    setIntento(intento + 1);
  }

  async function borrar(servicio) {
    // confirm() pide confirmación antes de una acción que no se puede deshacer
    if (!confirm(`¿Eliminar "${servicio.titulo}"?`)) return;
    try {
      await eliminarServicio(servicio._id, token);
      // Lo sacamos de la lista sin volver a pedir todo al servidor
      setServicios(servicios.filter((s) => s._id !== servicio._id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <section className="panelAdmin">
      <div className="panelEncabezado">
        <h2>
          <i className="fa-solid fa-gauge"></i> Panel de administrador
        </h2>
        <button className="btn-panel" onClick={() => setPantalla("MisServicios")}>
          <i className="fa-solid fa-plus"></i> Publicar servicio
        </button>
      </div>

      <div className="pestanas" role="tablist">
        <button
          role="tab"
          aria-selected={pestana === "servicios"}
          className={pestana === "servicios" ? "pestana activa" : "pestana"}
          onClick={() => setPestana("servicios")}
        >
          Servicios ({servicios.length})
        </button>
        <button
          role="tab"
          aria-selected={pestana === "mensajes"}
          className={pestana === "mensajes" ? "pestana activa" : "pestana"}
          onClick={() => setPestana("mensajes")}
        >
          Mensajes ({mensajes.length})
        </button>
      </div>

      {cargando && <Cargando texto="Cargando panel..." />}
      {!cargando && error && <MensajeError texto={error} onReintentar={reintentar} />}

      {!cargando && !error && pestana === "servicios" && (
        servicios.length === 0 ? (
          <SinResultados texto="Todavía no hay servicios publicados." />
        ) : (
          <ul className="listaAdmin">
            {servicios.map((servicio) => (
              <li key={servicio._id}>
                <div>
                  <strong>{servicio.titulo}</strong>
                  <span>
                    {servicio.categoria} · USD {servicio.precio}
                  </span>
                </div>
                <button className="btn-panel btn-peligro" onClick={() => borrar(servicio)}>
                  <i className="fa-regular fa-trash-can"></i> Eliminar
                </button>
              </li>
            ))}
          </ul>
        )
      )}

      {!cargando && !error && pestana === "mensajes" && (
        mensajes.length === 0 ? (
          <SinResultados texto="No hay mensajes de contacto." />
        ) : (
          <ul className="listaAdmin">
            {mensajes.map((m) => (
              <li key={m._id} className="mensajeAdmin">
                <div>
                  <strong>{m.tema}</strong>
                  <p>{m.mensaje}</p>
                  <span>
                    <a href={`mailto:${m.email}`}>{m.email}</a> ·{" "}
                    {new Date(m.createdAt).toLocaleString("es-UY")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )
      )}
    </section>
  );
}

export default PanelAdmin;
