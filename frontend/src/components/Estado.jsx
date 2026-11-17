// Mensajes reutilizables para los estados de una pantalla que pide datos:
// cargando, error (con botón para reintentar) o lista vacía.
export function Cargando({ texto = "Cargando..." }) {
  return (
    <div className="estado" role="status">
      <span className="spinner" aria-hidden="true"></span>
      <p>{texto}</p>
    </div>
  );
}

export function MensajeError({ texto, onReintentar }) {
  return (
    <div className="estado estado-error" role="alert">
      <i className="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
      <p>{texto}</p>
      {onReintentar && (
        <button type="button" className="btn-estado" onClick={onReintentar}>
          Reintentar
        </button>
      )}
    </div>
  );
}

export function SinResultados({ texto }) {
  return (
    <div className="estado">
      <i className="fa-regular fa-face-meh" aria-hidden="true"></i>
      <p>{texto}</p>
    </div>
  );
}
