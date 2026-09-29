import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { typeLabel } from '../data/projects.js';
import ProjectMedia from './ProjectMedia.jsx';
import ProjectLinks from './ProjectLinks.jsx';
import useDialog from '../hooks/useDialog.js';

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useDialog(Boolean(project), onClose);

  if (!project) return null;

  return createPortal(
    <div className="pm-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="pm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pm-title"
        style={{ '--accent': project.accent }}
      >
        <header className="pm-header">
          <div>
            <p className="eyebrow mb-1">
              {[typeLabel[project.type], project.context, project.year].filter(Boolean).join(' · ')}
            </p>
            <h2 id="pm-title" className="pm-title">{project.title}</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </header>

        <div className="pm-body">
          <ProjectMedia project={project} />

          <div className="row g-4 mt-1">
            <div className="col-lg-8">
              <p className="pm-summary">{project.summary}</p>
              <p className="text-muted-2">{project.description[0]}</p>
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
            <div className="col-lg-4">
              <dl className="meta-list">
                <div>
                  <dt>Rol</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>Áreas</dt>
                  <dd>
                    <ul className="tag-list">
                      {project.tags.map((t) => (
                        <li key={t} className="tag">{t}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <footer className="pm-footer">
          <ProjectLinks project={project} />
          <Link to={`/proyectos/${project.slug}`} className="link-arrow" onClick={onClose}>
            Ver caso completo <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </div>,
    document.body
  );
}
