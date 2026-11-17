import { useState } from "react";
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

const pasos = [
  {
    id: 1,
    icono: "fa-solid fa-magnifying-glass",
    titulo: "Buscar",
    descripcion: "Encuentra tu servicio ideal.",
  },
  {
    id: 2,
    icono: "fa-solid fa-code-compare",
    titulo: "Comparar",
    descripcion: "Revisa perfiles, experiencia y valoraciones.",
  },
  {
    id: 3,
    icono: "fa-regular fa-comments",
    titulo: "Contactar",
    descripcion: "Habla directamente con el profesional.",
  },
  {
    id: 4,
    icono: "fa-solid fa-handshake",
    titulo: "Contratar",
    descripcion: "Comienza tu proyecto de forma rápida y segura.",
  },
];

const resenas = [
  {
    id: 1,
    texto: "Encontré un diseñador excelente en menos de una hora.",
    autor: "Ana Gómez",
  },
  {
    id: 2,
    texto: "Excelente plataforma para encontrar desarrolladores.",
    autor: "Carlos Fernández",
  },
  {
    id: 3,
    texto: "Muy fácil de usar y con profesionales de calidad.",
    autor: "Lucía Rodríguez",
  },
];

function Inicio({ setPantalla, irACatalogo }) {
  // Texto del buscador del hero (input controlado por React)
  const [busqueda, setBusqueda] = useState("");

  // Al enviar el buscador vamos al catálogo con ese texto como filtro
  function buscar(e) {
    e.preventDefault(); // evita que el form recargue la página
    irACatalogo({ texto: busqueda, categoria: "" });
  }

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

          <form className="divHeroNav" onSubmit={buscar}>
            <label htmlFor="buscarServicio" className="sr-only">
              Buscar servicio
            </label>
            <input
              id="buscarServicio"
              type="search"
              placeholder="¿Qué servicio estás buscando?"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />

            <div>
              <button type="submit" id="aHero1" className="link">
                Explorar Servicios
              </button>
              <button
                type="button"
                id="aHero2"
                className="link"
                onClick={() => setPantalla("Login")}
              >
                Publicar Servicios
              </button>
            </div>
          </form>
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
              onClick={() => irACatalogo({ texto: "", categoria: cat.titulo })}
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
              onVerPerfil={() => setPantalla("PerfilAna")}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 id="titleComoFunciona">¿Cómo funciona?</h2>
        <div className="ComoFuncionaContainer">
          {pasos.map((paso) => (
            <div className="ComoFunciona" key={paso.id}>
              <i className={paso.icono} aria-hidden="true"></i>
              <h2>{paso.titulo}</h2>
              <p>{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reseñas" id="resenas">
        <h2 id="titleResenas">Lo que dicen nuestros usuarios</h2>
        <div className="reseñasCardContainer">
          {resenas.map((resena) => (
            <div className="cardReseña" key={resena.id}>
              <p>"{resena.texto}"</p>
              <p>⭐⭐⭐⭐⭐</p>
              <p>{resena.autor}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Inicio;
