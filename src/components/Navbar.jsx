import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/profile.js';

const links = [
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== '/') {
      setActive('');
      return;
    }
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="navbar navbar-expand-md container" aria-label="Navegación principal">
        <Link to="/" className="brand" aria-label={`${profile.name}, inicio`}>
          <img src="/icons/sme-white.svg" alt="" className="brand-logo" width="84" height="32" />
          <span className="brand-text">
            {profile.shortName}
            <small>{profile.role}</small>
          </span>
        </Link>

        <button
          className={`nav-toggle d-md-none ${open ? 'is-open' : ''}`}
          type="button"
          aria-controls="menu-principal"
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div id="menu-principal" className={`nav-menu ${open ? 'is-open' : ''}`}>
          <ul className="nav-list">
            {links.map((l) => (
              <li key={l.id}>
                <Link
                  to={`/#${l.id}`}
                  className={`nav-link-item ${active === l.id ? 'is-active' : ''}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={profile.cv} className="btn-neon btn-sm-neon" download>
            <i className="bi bi-download" aria-hidden="true" /> CV
          </a>
        </div>
      </nav>
    </header>
  );
}
