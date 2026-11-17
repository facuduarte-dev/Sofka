// Crea (o actualiza) el usuario administrador con los datos del .env:
//   npm run crear-admin
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import Usuario from "./models/Usuario.js";

const { ADMIN_NOMBRE, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("Faltan ADMIN_EMAIL y ADMIN_PASSWORD en el .env");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);

const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
// upsert: si no existe lo crea, si existe lo actualiza
await Usuario.findOneAndUpdate(
  { email: ADMIN_EMAIL.toLowerCase() },
  { nombre: ADMIN_NOMBRE || "Administrador", password: hash, rol: "admin" },
  { upsert: true }
);

console.log(`Administrador listo: ${ADMIN_EMAIL}`);
await mongoose.disconnect();
