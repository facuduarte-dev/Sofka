import { useEffect, useState } from "react";
import { obtenerServicios } from "../api.js";
import TarjetaServicio from "../components/TarjetaServicio.jsx";
import { Cargando, MensajeError, SinResultados } from "../components/Estado.jsx";

// Catálogo: pide los servicios al backend y los filtra por texto y categoría.
// "filtroInicial" llega desde Inicio (buscador del hero o clic en una categoría).
function Catalogo({ filtroInicial, setPantalla }) {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [texto, setTexto] = useState(filtroInicial.texto);
  const [categoria, setCategoria] = useState(filtroInicial.categoria);

  async function cargarServicios() {
    setCargando(true);
    setError("");
    try {
      const datos = await obtenerServicios();
      setServicios(datos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  // useEffect con [] se ejecuta una sola vez, cuando la pantalla aparece
  useEffect(() => {
    cargarServicios();
  }, []);

  // Categorías sin repetir, sacadas de los servicios que existen (Set elimina duplicados)
  const categorias = [...new Set(servicios.map((s) => s.categoria))];

  // El filtrado se hace en el navegador: no hace falta volver a pedir datos al backend
  const busqueda = texto.trim().toLowerCase();
  const filtrados = servicios.filter((s) => {
    const coincideCategoria = !categoria || s.categoria === categoria;
    const coincideTexto =
      !busqueda ||
      [s.titulo, s.descripcion, s.categoria, s.especialidad]
        .join(" ")
        .toLowerCase()
        .includes(busqueda);
    return coincideCategoria && coincideTexto;
  });

  return (
    <main className="catalogo">
      <section className="catalogoTitulo">
        <h1>Catálogo de servicios</h1>
        <p>Encuentra el servicio ideal para tu proyecto</p>
      </section>

      <div className="filtros">
        <label htmlFor="buscar-catalogo" className="sr-only">
          Buscar servicio
        </label>
        <input
          id="buscar-catalogo"
          type="search"
          placeholder="¿Qué servicio estás buscando?"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <div className="chips">
          <button
            type="button"
            className={categoria === "" ? "chip activo" : "chip"}
            onClick={() => setCategoria("")}
          >
            Todas
          </button>
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              className={categoria === cat ? "chip activo" : "chip"}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {cargando && <Cargando texto="Cargando servicios..." />}

      {!cargando && error && <MensajeError texto={error} onReintentar={cargarServicios} />}

      {!cargando && !error && filtrados.length === 0 && (
        <SinResultados texto="No encontramos servicios con esa búsqueda." />
      )}

      {!cargando && !error && filtrados.length > 0 && (
        <div className="gridServicios">
          {filtrados.map((servicio) => (
            <TarjetaServicio
              key={servicio._id}
              servicio={servicio}
              onContactar={() => setPantalla("Soporte")}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Catalogo;
