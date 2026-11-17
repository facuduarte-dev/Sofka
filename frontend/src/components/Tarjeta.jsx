// Tarjeta de categoría. Es un <button> para que se pueda usar con teclado:
// al hacer clic lleva al catálogo filtrado por esa categoría.
function Tarjeta({ icono, titulo, descripcion, onClick }) {
  return (
    <button type="button" className="card" onClick={onClick}>
      <i className={"fa-solid " + icono}></i>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </button>
  );
}

export default Tarjeta;
