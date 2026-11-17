import "../styles/perfil-ana.css";

const habilidades = ["Figma", "UI/UX", "Diseño web", "Branding", "Prototipado", "Adobe Creative Suite"];

// Perfil público de una freelancer destacada (contenido del Tie-Up original)
function PerfilAna({ setPantalla }) {
  return (
    <div className="page-perfilana">
      <section className="title">
        <h1>PERFIL PROFESIONAL</h1>
        <p>Conoce más sobre esta freelancer</p>
      </section>

      <section className="perfilContainer">
        <div className="box1-box2">
          <div id="box1">
            <div>
              <img src="img/pexels-ilayda0700-36593089.jpg" alt="Foto de perfil de Ana García" />
            </div>
            <div id="box1txt">
              <h2>Ana García</h2>
              <p>Diseñadora UX/UI</p>
              <p>⭐⭐⭐⭐⭐ 4.9 (28 Reseñas)</p>
              <p>Ciudad de México, México</p>
              <p>Disponible</p>
            </div>
          </div>

          <div id="box2">
            <h2>Contacto</h2>
            {/* Lleva al formulario de contacto real (Soporte) */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPantalla("Soporte");
              }}
            >
              Contactar
            </a>
            <p>Normalmente responde en 2 horas</p>
          </div>
        </div>

        <div className="box3-box4">
          <div id="box3">
            <h2>Sobre Mi</h2>
            <p>
              Diseñadora UX/UI especializada en crear experiencias digitales claras, accesibles y
              centradas en las necesidades de los usuarios. Trabaja en diseño web, prototipos y
              sistemas visuales para productos digitales.
            </p>
            <h2>Habilidades</h2>
            <div id="box3span">
              {habilidades.map((habilidad) => (
                <span key={habilidad} className="skill">
                  {habilidad}
                </span>
              ))}
            </div>
          </div>

          <div id="box4">
            <h2>Portafolio</h2>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PerfilAna;
