import { profile } from '../data/profile.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <div className="footer-brand">
          <img src="/icons/sme-white.svg" alt="SME" width="64" height="24" />
          <p className="mb-0">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
        <ul className="footer-social" aria-label="Redes y contacto">
          <li>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="bi bi-linkedin" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="bi bi-github" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href={profile.social.itch} target="_blank" rel="noopener noreferrer" aria-label="itch.io">
              <i className="bi bi-controller" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href={`https://wa.me/${profile.phoneRaw}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <i className="bi bi-whatsapp" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} aria-label="Correo electrónico">
              <i className="bi bi-envelope" aria-hidden="true" />
            </a>
          </li>
        </ul>
        <a href="#main" className="to-top">
          Volver arriba <i className="bi bi-arrow-up" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
