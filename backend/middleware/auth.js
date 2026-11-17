import jwt from "jsonwebtoken";

// Verifica que el pedido traiga un token válido en el header:
//   Authorization: Bearer <token>
// Si es válido, guarda los datos del usuario en req.usuario y deja pasar.
export function verificarToken(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "Debes iniciar sesión" });
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Sesión vencida o inválida, inicia sesión de nuevo" });
  }
}

// Se usa después de verificarToken: solo deja pasar a administradores.
export function soloAdmin(req, res, next) {
  if (req.usuario.rol !== "admin") {
    return res.status(403).json({ error: "Solo el administrador puede hacer esto" });
  }
  next();
}
