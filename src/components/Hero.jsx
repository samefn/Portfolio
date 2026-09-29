import { Link } from 'react-router-dom';
import { profile, orbitAreas } from '../data/profile.js';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
        <span className="grid-lines" />
      </div>

      <div className="container position-relative">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-lg-7">
            {profile.available && (
              <p className="status-pill fade-up" style={{ '--d': '0ms' }}>
                <span className="status-dot" aria-hidden="true" /> Disponible para proyectos
              </p>
            )}
            <p className="eyebrow fade-up" style={{ '--d': '80ms' }}>
              {profile.role} · {profile.location}
            </p>
            <h1 id="hero-title" className="hero-title fade-up" style={{ '--d': '160ms' }}>
              <span className="hero-hello">Hola, soy</span>
              <span className="text-gradient">{profile.name}</span>
            </h1>
            <p className="hero-sub fade-up" style={{ '--d': '220ms' }}>
              Creo mundos que se <em>juegan</em>, se <em>ven</em> y se <em>navegan</em>.
            </p>
            <p className="hero-lead fade-up" style={{ '--d': '280ms' }}>
              {profile.intro}
            </p>
            <div className="hero-actions fade-up" style={{ '--d': '340ms' }}>
              <Link to="/#proyectos" className="btn-neon">
                Ver proyectos <i className="bi bi-arrow-down-right" aria-hidden="true" />
              </Link>
              <Link to="/#contacto" className="btn-ghost">
                Contactar
              </Link>
            </div>

            <div className="area-marquee d-lg-none fade-up" style={{ '--d': '380ms' }} aria-label="Áreas de trabajo">
              <ul className="area-track">
                {[...orbitAreas, ...orbitAreas].map((a, i) => (
                  <li key={i} aria-hidden={i >= orbitAreas.length ? 'true' : undefined}>
                    <i className={`bi ${a.icon}`} style={{ color: a.color }} aria-hidden="true" /> {a.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-5 d-none d-lg-block">
            <div className="hero-visual fade-up" style={{ '--d': '300ms' }} aria-hidden="true">
              <div className="hv-ring" />
              <div className="hv-ring hv-ring-2" />
              <img src="/icons/sme-white.svg" alt="" className="hv-logo" />
              <ul className="orbit" style={{ '--count': orbitAreas.length }}>
                {orbitAreas.map((a, i) => (
                  <li key={a.label} className="orbit-item" style={{ '--i': i }}>
                    <span className="hv-card" style={{ '--c': a.color }}>
                      <i className={`bi ${a.icon}`} /> <span>{a.label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <dl className="hero-stats fade-up" style={{ '--d': '400ms' }}>
          {profile.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
