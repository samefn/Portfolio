import { useState } from 'react';
import { skills } from '../data/profile.js';
import ToolBadge from './ToolBadge.jsx';
import SkillModal from './SkillModal.jsx';
import Carousel from './Carousel.jsx';

export default function Skills() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="habilidades" className="section" aria-labelledby="skills-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">03 — Herramientas</p>
          <h2 id="skills-title" className="section-title">Habilidades y tecnologías</h2>
          <p className="section-lead">Toca un área para ver los programas y las competencias que manejo.</p>
        </header>
        <Carousel label="Habilidades" mobileOnly className="carousel-skills">
          {skills.map((s, i) => (
            <div key={s.id} className="skill-slide">
              <div className="skill-reveal" data-reveal style={{ '--d': `${(i % 4) * 80}ms` }}>
                <button
                  type="button"
                  className="skill-card"
                  style={{ '--accent': s.accent }}
                  onClick={() => setSelected(s)}
                  aria-haspopup="dialog"
                >
                  <span className="skill-icon" aria-hidden="true">
                    <i className={`bi ${s.icon}`} />
                  </span>
                  <h3 className="skill-title">{s.group}</h3>
                  <p className="skill-summary">{s.summary}</p>

                  {s.tools.length > 0 && (
                    <span className="skill-tools" aria-hidden="true">
                      {s.tools.slice(0, 4).map((t) => (
                        <ToolBadge key={t.name} tool={t} size="sm" />
                      ))}
                      {s.tools.length > 4 && <span className="tool-more">+{s.tools.length - 4}</span>}
                    </span>
                  )}

                  <span className="skill-more">
                    {s.tools.length > 0 ? `Ver ${s.tools.length} herramienta${s.tools.length > 1 ? 's' : ''}` : 'Ver detalles'}
                    <i className="bi bi-arrow-right" aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <SkillModal skill={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
