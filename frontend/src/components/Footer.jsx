function Footer({ setPantalla, irASeccion }) {
  return (
    <footer id="contacto">
      <div id="logo-footer">
        <img src="img/logo-tie-up-transparente.png" alt="Logo de Tie-Up" />
        <p>Conectando talento con oportunidades.</p>
      </div>

      <div>
        <h3>Explorar</h3>
        <ul>
          <li>
            <span className="footerText">Sobre nosotros</span>
          </li>
          <li>
            <button className="link" onClick={() => setPantalla("Catalogo")}>
              Servicios
            </button>
          </li>
          <li>
            <button className="link" onClick={() => irASeccion("freelancers")}>
              Freelancers
            </button>
          </li>
          <li>
            <button className="link" onClick={() => setPantalla("Soporte")}>
              Contacto
            </button>
          </li>
        </ul>
      </div>

      <div>
        <h3>Recursos</h3>
        <ul>
          <li>
            <button className="link" onClick={() => setPantalla("Soporte")}>Ayuda</button>
          </li>
          <li>
            <span className="footerText">Preguntas frecuentes</span>
          </li>
          <li>
            <span className="footerText">Política de privacidad</span>
          </li>
          <li>
            <span className="footerText">Términos y condiciones</span>
          </li>
        </ul>
      </div>

      <div>
        <h3>Contacto Directo</h3>
        <p>tieupinfo@gmail.com</p>
        <p>+598 12 345 678</p>
      </div>
    </footer>
  );
}

export default Footer;
