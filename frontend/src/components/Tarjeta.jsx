function Tarjeta({ icono, titulo, descripcion }) {
  return (
    <div className="card">
      <i className={"fa-solid " + icono}></i>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </div>
  );
}

export default Tarjeta;
