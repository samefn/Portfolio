import { profile } from '../data/profile.js';

export default function About() {
  return (
    <section id="sobre-mi" className="section section-alt" aria-labelledby="sobre-title">
      <div className="container">
        <div className="row g-4 g-lg-5 align-items-center">
          <div className="col-lg-5" data-reveal>
            <figure className="about-photo">
              <picture>
                <source srcSet="/images/santiago.webp" type="image/webp" />
                <img
                  src="/images/santiago.jpg"
                  alt={`Retrato de ${profile.name}`}
                  loading="lazy"
                  decoding="async"
                  width="864"
                  height="1080"
                />
              </picture>
              <figcaption>
                <i className="bi bi-geo-alt" aria-hidden="true" /> {profile.location}
              </figcaption>
            </figure>
          </div>
          <div className="col-lg-7" data-reveal>
            <p className="eyebrow">02 — Perfil</p>
            <h2 id="sobre-title" className="section-title">Sobre mí</h2>
            {profile.about.map((p, i) => (
              <p key={i} className={i === 0 ? 'lead-2' : 'text-muted-2'}>{p}</p>
            ))}

            <div className="row g-3 mt-3">
              <div className="col-12">
                <div className="info-card">
                  <h3 className="info-title">
                    <i className="bi bi-mortarboard" aria-hidden="true" /> Formación
                  </h3>
                  <div className="edu-row">
                    <div>
                      <p className="edu-degree">{profile.education.degree}</p>
                      <p className="edu-school">{profile.education.school}</p>
                    </div>
                    <span className="edu-period">{profile.education.period}</span>
                  </div>
                  <ul className="tag-list">
                    {profile.education.focus.map((f) => (
                      <li key={f} className="tag">{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-card">
                  <h3 className="info-title">
                    <i className="bi bi-translate" aria-hidden="true" /> Idiomas
                  </h3>
                  <ul className="lang-list">
                    {profile.languages.map((l) => (
                      <li key={l.name}>
                        <div className="lang-row">
                          <span>{l.name}</span>
                          <span className="lang-level">{l.level}</span>
                        </div>
                        <div
                          className="lang-bar"
                          role="img"
                          aria-label={`${l.name}: nivel ${l.level}`}
                        >
                          <span style={{ width: `${l.percent}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-card">
                  <h3 className="info-title">
                    <i className="bi bi-stars" aria-hidden="true" /> Valores
                  </h3>
                  <ul className="tag-list">
                    {profile.values.map((v) => (
                      <li key={v} className="tag tag-value">{v}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
