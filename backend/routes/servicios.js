import { Router } from "express";
import Servicio from "../models/Servicio.js";
import { verificarToken, soloAdmin } from "../middleware/auth.js";

const router = Router();

// GET /servicios -> catálogo completo (opcional: ?categoria=Diseño)
router.get("/", async (req, res) => {
  const filtro = {};
  if (req.query.categoria) {
    filtro.categoria = req.query.categoria;
  }
  // sort: los más nuevos primero
  const servicios = await Servicio.find(filtro).sort({ createdAt: -1 });
  res.json(servicios);
});

// GET /servicios/:id -> un servicio
router.get("/:id", async (req, res) => {
  const servicio = await Servicio.findById(req.params.id);
  if (!servicio) {
    return res.status(404).json({ error: "Servicio no encontrado" });
  }
  res.json(servicio);
});

// POST /servicios -> publicar un servicio nuevo (solo admin)
router.post("/", verificarToken, soloAdmin, async (req, res) => {
  const { titulo, categoria, especialidad, descripcion, precio, plazoEntrega } = req.body;
  // Solo tomamos los campos permitidos (no guardamos cualquier cosa que llegue en el body)
  const servicio = await Servicio.create({
    titulo,
    categoria,
    especialidad,
    descripcion,
    precio,
    plazoEntrega,
  });
  res.status(201).json(servicio);
});

// DELETE /servicios/:id -> eliminar un servicio (solo admin)
router.delete("/:id", verificarToken, soloAdmin, async (req, res) => {
  const servicio = await Servicio.findByIdAndDelete(req.params.id);
  if (!servicio) {
    return res.status(404).json({ error: "Servicio no encontrado" });
  }
  res.json({ mensaje: "Servicio eliminado" });
});

export default router;
