import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const router = Router();

// Misma regla que el Tie-Up original: 8 a 12 caracteres,
// con mayúscula, minúscula, número y símbolo.
const PASSWORD_VALIDA = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,12}$/;

// Crea el token que el frontend guarda y manda en cada pedido protegido
function crearToken(usuario) {
  return jwt.sign(
    { id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
}

// Datos públicos del usuario (sin la contraseña)
function datosPublicos(usuario) {
  return { id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol };
}

// POST /auth/registro -> crea una cuenta de usuario común
router.post("/registro", async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Completa todos los campos" });
  }
  if (!PASSWORD_VALIDA.test(password)) {
    return res.status(400).json({
      error: "La contraseña debe tener entre 8 y 12 caracteres, con mayúscula, minúscula, número y símbolo",
    });
  }
  const existe = await Usuario.findOne({ email: email.toLowerCase() });
  if (existe) {
    return res.status(409).json({ error: "Ya existe una cuenta con ese correo" });
  }

  // 10 = "rondas" de bcrypt: más rondas, más seguro pero más lento
  const hash = await bcrypt.hash(password, 10);
  const usuario = await Usuario.create({ nombre, email, password: hash });

  res.status(201).json({ token: crearToken(usuario), usuario: datosPublicos(usuario) });
});

// POST /auth/login -> devuelve un token si el correo y la contraseña son correctos
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Completa correo y contraseña" });
  }

  const usuario = await Usuario.findOne({ email: email.toLowerCase() });
  // Mismo mensaje si falla el correo o la contraseña: no le damos pistas a un atacante
  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    return res.status(401).json({ error: "Correo o contraseña incorrectos" });
  }

  res.json({ token: crearToken(usuario), usuario: datosPublicos(usuario) });
});

export default router;
