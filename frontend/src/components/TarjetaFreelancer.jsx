function TarjetaFreelancer({ foto, nombre, profesion, rating, onVerPerfil }) {
  return (
    <div className="cardDestacado">
      <img src={foto} alt="Foto de perfil" />
      <h2>{nombre}</h2>
      <p>{profesion}</p>
      <p>⭐⭐⭐⭐⭐ {rating}</p>
      <button onClick={onVerPerfil}>Ver Perfil</button>
    </div>
  );
}

export default TarjetaFreelancer;
