import { useState } from "react";
import { crearServicio } from "../api.js";
import "../styles/mis-servicios.css";

const CATEGORIAS = ["Marketing", "Desarrollo Web", "Diseño", "Edición", "Redacción", "IA"];
const FORM_VACIO = {
  titulo: "",
  categoria: "",
  especialidad: "",
  descripcion: "",
  precio: "",
  plazoEntrega: "",
};

// Publicar servicios (solo admin): manda el formulario a POST /servicios con el token
function MisServicios({ sesion, setPantalla }) {
  const [form, setForm] = useState(FORM_VACIO);
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState(null);

  if (sesion.usuario.rol !== "admin") {
    return (
      <div className="page-misservicios">
        <h2>Publicar servicios</h2>
        <p>Solo el administrador puede publicar servicios por ahora.</p>
      </div>
    );
  }

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function publicar(e) {
    e.preventDefault();
    setEnviando(true);
    setAviso(null);
    try {
      // El input number devuelve texto: lo convertimos a número antes de enviarlo
      await crearServicio({ ...form, precio: Number(form.precio) }, sesion.token);
      setAviso({ tipo: "exito", texto: "¡Servicio publicado! Ya aparece en el catálogo." });
      setForm(FORM_VACIO);
    } catch (err) {
      setAviso({ tipo: "error", texto: err.message });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="page-misservicios">
      <h2>Publicar servicios</h2>
      <p>Comparte tu talento y conecta con nuevos clientes</p>

      <form onSubmit={publicar}>
        <label htmlFor="service-title">Título del servicio</label>
        <input
          id="service-title"
          name="titulo"
          type="text"
          placeholder="Ej.: Diseño de sitio web profesional"
          required
          value={form.titulo}
          onChange={cambiar}
        />

        <label htmlFor="service-category">Categoría</label>
        <select id="service-category" name="categoria" required value={form.categoria} onChange={cambiar}>
          <option value="">Seleccione una categoría</option>
          {CATEGORIAS.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label htmlFor="service-specialty">Especialidad</label>
        <input
          id="service-specialty"
          name="especialidad"
          type="text"
          placeholder="Ej.: Sitios web"
          value={form.especialidad}
          onChange={cambiar}
        />

        <label htmlFor="service-description">Descripción</label>
        <textarea
          id="service-description"
          name="descripcion"
          placeholder="Describe qué ofreces y qué incluye el servicio..."
          required
          value={form.descripcion}
          onChange={cambiar}
        ></textarea>

        <div>
          <label htmlFor="service-price">Precio (USD)</label>
          <input
            id="service-price"
            name="precio"
            type="number"
            min="0"
            placeholder="Ej.: 150"
            required
            value={form.precio}
            onChange={cambiar}
          />
          <label htmlFor="delivery-time">Plazo de entrega</label>
          <input
            id="delivery-time"
            name="plazoEntrega"
            type="text"
            placeholder="Ej.: 7 días"
            value={form.plazoEntrega}
            onChange={cambiar}
          />
        </div>

        {aviso && (
          <p className={"aviso " + aviso.tipo} role="alert">
            {aviso.texto}
          </p>
        )}

        <button type="submit" disabled={enviando}>
          {enviando ? "Publicando..." : "Publicar servicio"}
        </button>
        <button type="button" className="btn-volver" onClick={() => setPantalla("MiCuenta")}>
          Volver a mi cuenta
        </button>
      </form>
    </div>
  );
}

export default MisServicios;
