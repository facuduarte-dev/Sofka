function Inicio({ setPantalla }) {
  return (
    <section className="hero">
      <div className="heroTxt">
        <h1>
          Encuentra al profesional perfecto para cualquier proyecto digital.
        </h1>
        <p>
          Diseñadores, programadores, editores, marketers y creadores de
          contenido en un solo lugar.
        </p>

        <div className="divHeroNav">
          <label htmlFor="buscarServicio" className="sr-only">
            Buscar servicio
          </label>
          <input
            id="buscarServicio"
            type="text"
            placeholder="¿Qué servicio estás buscando?"
          />

          <div>
            <a href="#servicios" id="aHero1">
              Explorar Servicios
            </a>
            <button id="aHero2" onClick={() => setPantalla("Login")}>
              Publicar Servicios
            </button>
          </div>
        </div>
      </div>

      <div>
        <img
          className="heroImg"
          src="img/imgHero.png"
          alt="Profesionales trabajando"
        />
      </div>
    </section>
  );
}

export default Inicio;
