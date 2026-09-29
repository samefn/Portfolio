import { createPortal } from 'react-dom';
import useDialog from '../hooks/useDialog.js';
import ToolBadge from './ToolBadge.jsx';

export default function SkillModal({ skill, onClose }) {
  const dialogRef = useDialog(Boolean(skill), onClose);
  if (!skill) return null;

  return createPortal(
    <div className="pm-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="pm-dialog sm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sm-title"
        style={{ '--accent': skill.accent }}
      >
        <header className="pm-header">
          <div className="d-flex align-items-center gap-3">
            <span className="skill-icon mb-0" aria-hidden="true">
              <i className={`bi ${skill.icon}`} />
            </span>
            <div>
              <p className="eyebrow mb-1">Área</p>
              <h2 id="sm-title" className="pm-title">{skill.group}</h2>
            </div>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
            <i className="bi bi-x-lg" aria-hidden="true" />
          </button>
        </header>

        <div className="pm-body">
          <p className="pm-summary">{skill.summary}</p>

          {skill.tools.length > 0 && (
            <>
              <h3 className="contrib-title">Programas y tecnologías</h3>
              <ul className="tool-grid">
                {skill.tools.map((t, i) => (
                  <li key={t.name} style={{ '--i': i }}>
                    <ToolBadge tool={t} size="lg" />
                    <span className="tool-name">{t.name}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h3 className="contrib-title">Competencias</h3>
          <ul className="contrib-list">
            {skill.items.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
}
