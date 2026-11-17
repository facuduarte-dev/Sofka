import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import serviciosRouter from "./routes/servicios.js";
import contactoRouter from "./routes/contacto.js";

const app = express();

// Middlewares: se ejecutan en cada pedido antes de llegar a las rutas
app.use(cors()); // permite que el frontend (otro puerto/dominio) consuma la API
app.use(express.json()); // convierte el body JSON en req.body

app.get("/", (req, res) => {
  res.json({ mensaje: "API de Tie-Up funcionando" });
});

// Cada grupo de rutas vive en su propio archivo dentro de routes/
app.use("/servicios", serviciosRouter);
app.use("/contacto", contactoRouter);

// Manejo de errores: Express 5 manda acá los errores de las rutas async.
// Los errores de validación de Mongoose se devuelven como 400 (datos inválidos).
app.use((error, req, res, next) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ error: "Datos inválidos: revisa los campos" });
  }
  console.error(error);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Primero conectamos a MongoDB y recién después aceptamos pedidos
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor en http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => console.error("Error conectando a MongoDB:", error));
