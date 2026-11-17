import Tarjeta from "../components/Tarjeta.jsx";

const categorias = [
  {
    id: 1,
    icono: "fa-bullhorn",
    titulo: "Marketing",
    descripcion: "SEO, Ads y Social Media",
  },
  {
    id: 2,
    icono: "fa-code",
    titulo: "Desarrollo Web",
    descripcion: "Frontend, Backend y Full Stack",
  },
  {
    id: 3,
    icono: "fa-palette",
    titulo: "Diseño",
    descripcion: "Logos, Branding y UI/UX.",
  },
  {
    id: 4,
    icono: "fa-video",
    titulo: "Edición",
    descripcion: "Videos de YouTube y Redes",
  },
  {
    id: 5,
    icono: "fa-pen-nib",
    titulo: "Redacción",
    descripcion: "Copywriting y Blogs",
  },
  {
    id: 6,
    icono: "fa-robot",
    titulo: "IA",
    descripcion: "Automatizaciones y Chatbots",
  },
];

function Inicio({ setPantalla }) {
  return (
    <>
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

      <section id="servicios">
        <h2 id="titleCatPopulares">Categorías Populares</h2>
        <div className="cardContainer">
          {categorias.map((cat) => (
            <Tarjeta
              key={cat.id}
              icono={cat.icono}
              titulo={cat.titulo}
              descripcion={cat.descripcion}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Inicio;
