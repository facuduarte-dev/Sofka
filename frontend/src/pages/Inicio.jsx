import Tarjeta from "../components/Tarjeta.jsx";
import TarjetaFreelancer from "../components/TarjetaFreelancer.jsx";

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

const freelancers = [
  {
    id: 1,
    foto: "https://images.pexels.com/photos/1604024/pexels-photo-1604024.jpeg",
    nombre: "Ana García",
    profesion: "Diseñadora web",
    rating: 4.9,
  },
  {
    id: 2,
    foto: "https://images.pexels.com/photos/16323580/pexels-photo-16323580.jpeg",
    nombre: "Pedro Sanchez",
    profesion: "Full Stack Developer",
    rating: 4.9,
  },
  {
    id: 3,
    foto: "https://images.pexels.com/photos/9034719/pexels-photo-9034719.jpeg",
    nombre: "Alonso Mazza",
    profesion: "Marketing CN",
    rating: 4.9,
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

      <section id="freelancers">
        <h2 id="titleDestacados">Freelancers Destacados</h2>
        <div className="cardDestacadosContainer">
          {freelancers.map((freelancer) => (
            <TarjetaFreelancer
              key={freelancer.id}
              foto={freelancer.foto}
              nombre={freelancer.nombre}
              profesion={freelancer.profesion}
              rating={freelancer.rating}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Inicio;
