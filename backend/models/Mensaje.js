import mongoose from "mongoose";

// Mensajes que llegan desde el formulario de Soporte (contacto real).
// Se guardan en MongoDB y el administrador los ve en su panel.
const mensajeSchema = new mongoose.Schema(
  {
    tema: { type: String, required: true, trim: true },
    mensaje: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/, // validación básica de formato de correo
    },
    leido: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Mensaje = mongoose.model("Mensaje", mensajeSchema);

export default Mensaje;
