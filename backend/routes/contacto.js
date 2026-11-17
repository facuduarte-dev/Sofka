import { Router } from "express";
import Mensaje from "../models/Mensaje.js";
import { verificarToken, soloAdmin } from "../middleware/auth.js";

const router = Router();

// POST /contacto -> guarda un mensaje del formulario de Soporte
router.post("/", async (req, res) => {
  const { tema, mensaje, email } = req.body;
  await Mensaje.create({ tema, mensaje, email });
  res.status(201).json({ mensaje: "¡Gracias! Recibimos tu mensaje y te responderemos pronto." });
});

// GET /contacto -> lista de mensajes recibidos (solo admin, para su panel)
router.get("/", verificarToken, soloAdmin, async (req, res) => {
  const mensajes = await Mensaje.find().sort({ createdAt: -1 });
  res.json(mensajes);
});

export default router;
