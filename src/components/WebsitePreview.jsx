import { useState } from 'react';

const devices = [
  { id: 'desktop', label: 'Escritorio', icon: 'bi-display', width: '100%' },
  { id: 'tablet', label: 'Tableta', icon: 'bi-tablet', width: '768px' },
  { id: 'mobile', label: 'Móvil', icon: 'bi-phone', width: '390px' },
];

export default function WebsitePreview({ website = {}, title }) {
  const [live, setLive] = useState(false);
  const [device, setDevice] = useState('desktop');
  const current = devices.find((d) => d.id === device);
  const hasUrl = Boolean(website.url);

  if (!hasUrl) {
    return (
      <div className="media-frame game-placeholder" style={{ backgroundImage: `url(${website.screenshot})` }}>
        <div className="media-overlay">
          <span className="badge-soon">
            <i className="bi bi-window" aria-hidden="true" /> Vista en vivo próximamente
          </span>
          <p className="mb-0">
            La versión publicada de <strong>{title}</strong> se podrá explorar aquí.
          </p>
          {website.note && <p className="mb-0 small-note">{website.note}</p>}
        </div>
      </div>
    );
  }
  const host = (() => {
    try {
      return new URL(website.url).host;
    } catch {
      return website.url;
    }
  })();

  return (
    <div className="browser-frame">
      <div className="browser-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">
          <i className="bi bi-lock-fill" aria-hidden="true" /> {host}
        </span>
        <div className="device-switch" role="group" aria-label="Tamaño de vista previa">
          {devices.map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={device === d.id}
              className={device === d.id ? 'is-active' : ''}
              onClick={() => {
                setDevice(d.id);
                setLive(true);
              }}
              title={d.label}
            >
              <i className={`bi ${d.icon}`} aria-hidden="true" />
              <span className="visually-hidden">{d.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="browser-viewport">
        {live ? (
          <iframe
            src={website.url}
            title={`Vista previa en vivo de ${title}`}
            loading="lazy"
            style={{ width: current.width }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : (
          <button
            type="button"
            className="media-facade"
            style={{ backgroundImage: `url(${website.screenshot})` }}
            onClick={() => setLive(true)}
          >
            <span className="facade-play" aria-hidden="true">
              <i className="bi bi-cursor-fill" />
            </span>
            <span className="facade-label">Cargar vista en vivo</span>
          </button>
        )}
      </div>
      {website.note && <p className="browser-note browser-note-accent">{website.note}</p>}
      <p className="browser-note">
        ¿No carga? Algunos sitios bloquean la vista embebida.{' '}
        <a href={website.url} target="_blank" rel="noopener noreferrer">
          Abrir en una pestaña nueva
        </a>
      </p>
    </div>
  );
}
