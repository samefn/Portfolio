const labels = {
  game: { demo: 'Jugar en itch.io', icon: 'bi-joystick' },
  film: { demo: 'Ver completo', icon: 'bi-play-circle' },
  web: { demo: 'Visitar sitio', icon: 'bi-box-arrow-up-right' },
};

export default function ProjectLinks({ project }) {
  const l = labels[project.type] ?? labels.web;
  return (
    <div className="project-links">
      {project.links?.demo && (
        <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-neon">
          <i className={`bi ${l.icon}`} aria-hidden="true" /> {l.demo}
          <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
        </a>
      )}
      {project.links?.repo && (
        <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="btn-ghost">
          <i className="bi bi-github" aria-hidden="true" /> Repositorio
          <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
        </a>
      )}
    </div>
  );
}
