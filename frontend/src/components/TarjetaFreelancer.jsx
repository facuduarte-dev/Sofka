function TarjetaFreelancer({ foto, nombre, profesion, rating }) {
  return (
    <div className="cardDestacado">
      <img src={foto} alt="Foto de perfil" />
      <h2>{nombre}</h2>
      <p>{profesion}</p>
      <p>⭐⭐⭐⭐⭐ {rating}</p>
      <button>Ver Perfil</button>
    </div>
  );
}

export default TarjetaFreelancer;
