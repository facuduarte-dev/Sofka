import mongoose from "mongoose";

// Schema: define qué campos tiene un servicio y valida los datos antes de guardarlos.
// Son los mismos campos del formulario "Publicar servicios" del Tie-Up original.
const servicioSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    categoria: { type: String, required: true, trim: true },
    especialidad: { type: String, trim: true },
    descripcion: { type: String, required: true, trim: true },
    precio: { type: Number, required: true, min: 0 },
    plazoEntrega: { type: String, trim: true },
  },
  // timestamps agrega createdAt y updatedAt automáticamente
  { timestamps: true }
);

const Servicio = mongoose.model("Servicio", servicioSchema);

export default Servicio;
