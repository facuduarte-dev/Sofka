function Footer({ setPantalla }) {
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
            <a href="#servicios">Servicios</a>
          </li>
          <li>
            <a href="#freelancers">Freelancers</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>
      </div>

      <div>
        <h3>Recursos</h3>
        <ul>
          <li>
            <button onClick={() => setPantalla("Soporte")}>Ayuda</button>
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
