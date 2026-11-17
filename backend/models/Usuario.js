import mongoose from "mongoose";

// Usuarios registrados. La contraseña NUNCA se guarda en texto plano:
// se guarda su hash (bcrypt) y al hacer login se compara contra ese hash.
const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    // "admin" puede publicar/borrar servicios y leer los mensajes de contacto
    rol: { type: String, enum: ["usuario", "admin"], default: "usuario" },
  },
  { timestamps: true }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
