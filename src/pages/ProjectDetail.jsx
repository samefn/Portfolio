import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProjectBySlug, projects, typeLabel } from '../data/projects.js';
import ProjectMedia from '../components/ProjectMedia.jsx';
import ProjectLinks from '../components/ProjectLinks.jsx';
import useReveal from '../hooks/useReveal.js';
import { profile } from '../data/profile.js';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  useReveal([slug]);

  useEffect(() => {
    document.title = project
      ? `${project.title} — ${profile.name}`
      : `Proyecto no encontrado — ${profile.name}`;
    return () => {
      document.title = `${profile.name} — ${profile.shortRole}`;
    };
  }, [project]);

  if (!project) {
    return (
      <section className="section detail-page">
        <div className="container text-center">
          <h1 className="section-title">Proyecto no encontrado</h1>
          <Link to="/#proyectos" className="btn-neon mt-3">Volver a proyectos</Link>
        </div>
      </section>
    );
  }

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="detail-page" style={{ '--accent': project.accent }}>
      <div className="container">
        <nav aria-label="Ruta de navegación" className="crumbs">
          <Link to="/#proyectos"><i className="bi bi-arrow-left" aria-hidden="true" /> Proyectos</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <header className="detail-head">
          <p className="eyebrow">
            {[typeLabel[project.type], project.context, project.year].filter(Boolean).join(' · ')}
          </p>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-lead">{project.summary}</p>
          <ProjectLinks project={project} />
        </header>

        <div className="detail-media" data-reveal>
          <ProjectMedia project={project} />
        </div>

        <div className="row g-4 g-lg-5 mt-2">
          <div className="col-lg-8" data-reveal>
            <h2 className="h-section">Sobre el proyecto</h2>
            {project.description.map((p, i) => (
              <p key={i} className="text-muted-2 fs-body">{p}</p>
            ))}
            {project.contributions?.length > 0 && (
              <>
                <h3 className="contrib-title">Mi participación</h3>
                <ul className="contrib-list">
                  {project.contributions.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <aside className="col-lg-4" data-reveal>
            <dl className="meta-list meta-card">
              <div><dt>Rol</dt><dd>{project.role}</dd></div>
              {project.year && <div><dt>Año</dt><dd>{project.year}</dd></div>}
              {project.context && <div><dt>Contexto</dt><dd>{project.context}</dd></div>}
              <div><dt>Categoría</dt><dd>{typeLabel[project.type]}</dd></div>
              <div>
                <dt>Áreas</dt>
                <dd>
                  <ul className="tag-list">
                    {project.tags.map((t) => <li key={t} className="tag">{t}</li>)}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {project.gallery?.length > 0 && (
          <section className="mt-5" aria-labelledby="galeria-title">
            <h2 id="galeria-title" className="h-section" data-reveal>Galería</h2>
            <div className="row g-4">
              {project.gallery.map((item, i) => {
                const img = typeof item === 'string' ? { src: item } : item;
                return (
                  <div key={img.src} className="col-md-6" data-reveal>
                    <img
                      src={img.src}
                      alt={img.alt || `${project.title}, imagen ${i + 1}`}
                      className={`gallery-img ${img.fit === 'contain' ? 'is-contain' : ''}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <Link to={`/proyectos/${next.slug}`} className="next-project" data-reveal style={{ '--accent': next.accent }}>
          <span className="eyebrow">Siguiente proyecto</span>
          <span className="next-title">
            {next.title} <i className="bi bi-arrow-right" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </article>
  );
}
