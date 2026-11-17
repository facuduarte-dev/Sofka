import { useState } from "react";
import "../styles/contrataciones.css";

// Proyectos de ejemplo (en el original también eran fijos en el HTML)
const proyectos = {
  profesional: [
    { id: 1, titulo: "Diseño de Sitio Web", entrega: "20 Septiembre", estado: "EN CURSO" },
    { id: 2, titulo: "Logo para cafetería", entrega: "2 Octubre", estado: "EN CURSO" },
    { id: 3, titulo: "Landing page", entrega: "15 Agosto", estado: "FINALIZADO" },
  ],
  cliente: [
    { id: 4, titulo: "Edición de video", entrega: "30 Septiembre", estado: "EN CURSO" },
    { id: 5, titulo: "Artículos para blog", entrega: "10 Agosto", estado: "FINALIZADO" },
  ],
};

function Contrataciones() {
  // Qué lista se ve: "profesional" o "cliente"
  const [rol, setRol] = useState("profesional");

  return (
    <div className="page-contrataciones">
      <h1>Mis Contrataciones</h1>
      <p>Consulta tus proyectos y su estado</p>

      <div>
        <button
          type="button"
          className={rol === "profesional" ? "activo" : ""}
          onClick={() => setRol("profesional")}
        >
          Como profesional
        </button>
        <button
          type="button"
          className={rol === "cliente" ? "activo" : ""}
          onClick={() => setRol("cliente")}
        >
          Como cliente
        </button>
      </div>

      <h2>Tus proyectos</h2>

      {proyectos[rol].map((proyecto) => (
        <div className="proyecto" key={proyecto.id}>
          <img src="img/clker-free-vector-images-avatar-294480.svg" alt="Foto de perfil" />
          <p>{proyecto.titulo}</p>
          <p>Entrega {proyecto.entrega}</p>
          <p>{proyecto.estado}</p>
          <button type="button">Ver Detalles</button>
        </div>
      ))}

      <p>Cada proyecto es una nueva oportunidad para conectar.</p>
    </div>
  );
}

export default Contrataciones;
