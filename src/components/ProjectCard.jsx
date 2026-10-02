import { typeLabel } from '../data/projects.js';

const typeIcon = { game: 'bi-controller', film: 'bi-film', web: 'bi-window', '3d': 'bi-box' };
const ytFallback = (e) => {
  const img = e.currentTarget;
  if (img.src.includes('maxresdefault') && (e.type === 'error' || img.naturalWidth <= 120)) {
    img.src = img.src.replace('maxresdefault', 'hqdefault');
  }
};

export default function ProjectCard({ project, onOpen, index = 0 }) {
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <article
      className="project-card"
      style={{ '--accent': project.accent, '--d': `${index * 90}ms` }}
      onMouseMove={handleMove}
      data-reveal
    >
      <button
        type="button"
        className="project-card-hit"
        onClick={() => onOpen(project)}
        aria-label={`Ver vista rápida de ${project.title}`}
      >
        <div className="project-thumb">
          <img
            src={project.cover}
            alt=""
            loading="lazy"
            decoding="async"
            width="800"
            height="500"
            onLoad={ytFallback}
            onError={ytFallback}
          />
          <span className="project-type">
            <i className={`bi ${typeIcon[project.type]}`} aria-hidden="true" /> {typeLabel[project.type]}
          </span>
          <span className="project-play" aria-hidden="true">
            <i className="bi bi-arrows-angle-expand" />
          </span>
        </div>
        <div className="project-body">
          <div className="d-flex justify-content-between align-items-baseline gap-2">
            <h3 className="project-title">{project.title}</h3>
            {project.year && <span className="project-year">{project.year}</span>}
          </div>
          {project.context && <p className="project-context">{project.context}</p>}
          <p className="project-summary">{project.summary}</p>
          <ul className="tag-list" aria-label="Tecnologías">
            {project.tags.slice(0, 3).map((t) => (
              <li key={t} className="tag">{t}</li>
            ))}
          </ul>
        </div>
      </button>
    </article>
  );
}
