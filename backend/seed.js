// Carga datos de ejemplo en la base: npm run seed
// Borra los servicios existentes y crea los de ejemplo.
import mongoose from "mongoose";
import "dotenv/config";
import Servicio from "./models/Servicio.js";

const servicios = [
  { titulo: "Diseño de sitio web profesional", categoria: "Diseño", especialidad: "Sitios web", descripcion: "Diseño completo de tu sitio en Figma, listo para desarrollar.", precio: 150, plazoEntrega: "7 días" },
  { titulo: "Logo y manual de marca", categoria: "Diseño", especialidad: "Branding", descripcion: "Logo, paleta de colores y tipografías para tu marca.", precio: 90, plazoEntrega: "5 días" },
  { titulo: "Landing page en React", categoria: "Desarrollo Web", especialidad: "Frontend", descripcion: "Página de aterrizaje responsive con React y Vite.", precio: 200, plazoEntrega: "10 días" },
  { titulo: "API REST con Express y MongoDB", categoria: "Desarrollo Web", especialidad: "Backend", descripcion: "API con autenticación, base de datos y documentación.", precio: 300, plazoEntrega: "14 días" },
  { titulo: "Gestión de redes sociales", categoria: "Marketing", especialidad: "Social Media", descripcion: "Planificación y publicación de contenido durante un mes.", precio: 120, plazoEntrega: "30 días" },
  { titulo: "Posicionamiento SEO", categoria: "Marketing", especialidad: "SEO", descripcion: "Auditoría y mejoras para aparecer mejor en Google.", precio: 180, plazoEntrega: "15 días" },
  { titulo: "Edición de videos para YouTube", categoria: "Edición", especialidad: "Video", descripcion: "Edición, cortes, música y subtítulos de hasta 15 minutos.", precio: 60, plazoEntrega: "3 días" },
  { titulo: "Artículos para blog", categoria: "Redacción", especialidad: "Copywriting", descripcion: "Cuatro artículos optimizados para SEO de 800 palabras.", precio: 80, plazoEntrega: "7 días" },
  { titulo: "Chatbot para WhatsApp", categoria: "IA", especialidad: "Automatizaciones", descripcion: "Chatbot que responde preguntas frecuentes de tus clientes.", precio: 250, plazoEntrega: "10 días" },
];

await mongoose.connect(process.env.MONGO_URI);
await Servicio.deleteMany({});
await Servicio.insertMany(servicios);
console.log(`Se cargaron ${servicios.length} servicios`);
await mongoose.disconnect();
