// Tarjeta de un servicio del catálogo (los datos vienen de MongoDB)
function TarjetaServicio({ servicio, onContactar }) {
  return (
    <article className="cardServicio">
      <span className="badgeCategoria">{servicio.categoria}</span>
      <h3>{servicio.titulo}</h3>
      {servicio.especialidad && <p className="especialidad">{servicio.especialidad}</p>}
      <p className="descripcionServicio">{servicio.descripcion}</p>
      <div className="infoServicio">
        <span className="precio">USD {servicio.precio}</span>
        {servicio.plazoEntrega && (
          <span>
            <i className="fa-regular fa-clock" aria-hidden="true"></i> {servicio.plazoEntrega}
          </span>
        )}
      </div>
      <button type="button" onClick={onContactar}>
        Contactar
      </button>
    </article>
  );
}

export default TarjetaServicio;
