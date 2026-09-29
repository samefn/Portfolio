import { useMemo, useState } from 'react';
import { categories, projects } from '../data/projects.js';
import ProjectCard from './ProjectCard.jsx';
import ProjectModal from './ProjectModal.jsx';
import Carousel from './Carousel.jsx';
import useReveal from '../hooks/useReveal.js';

export default function ProjectGallery() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.type === filter)),
    [filter]
  );

  useReveal([filter]);

  const count = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.type === id).length);

  return (
    <section id="proyectos" className="section" aria-labelledby="proyectos-title">
      <div className="container">
        <header className="section-head" data-reveal>
          <p className="eyebrow">01 — Trabajo seleccionado</p>
          <h2 id="proyectos-title" className="section-title">Proyectos</h2>
          <p className="section-lead">
            Proyectos que muestran cómo trabajo en disciplinas distintas. Usa las flechas para recorrerlos y
            abre cualquiera para ver la vista rápida o el caso completo.
          </p>
        </header>

        <div className="filter-bar" role="toolbar" aria-label="Filtrar proyectos por categoría">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`filter-btn ${filter === c.id ? 'is-active' : ''}`}
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
            >
              <i className={`bi ${c.icon}`} aria-hidden="true" /> {c.label}
              <span className="filter-count">{count(c.id)}</span>
            </button>
          ))}
        </div>

        <p className="visually-hidden" aria-live="polite">
          {visible.length} proyecto{visible.length !== 1 ? 's' : ''} mostrado{visible.length !== 1 ? 's' : ''}
        </p>

        <Carousel key={filter} label="Proyectos" className="carousel-projects">
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} onOpen={setSelected} />
          ))}
        </Carousel>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
