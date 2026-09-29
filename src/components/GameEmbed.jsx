import { useState } from 'react';

export default function GameEmbed({ project }) {
  const { itch = {}, title, cover } = project;
  const [loaded, setLoaded] = useState(false);

  if (!itch.published) {
    return (
      <div className="media-frame game-placeholder" style={{ backgroundImage: `url(${cover})` }}>
        <div className="media-overlay">
          <span className="badge-soon">
            <i className="bi bi-hourglass-split" aria-hidden="true" /> Próximamente en itch.io
          </span>
          <p className="mb-0">
            La versión jugable de <strong>{title}</strong> aparecerá aquí cuando se publique.
          </p>
        </div>
      </div>
    );
  }

  if (itch.mode === 'playable') {
    const src = `https://itch.io/embed-upload/${itch.embedId}?color=0b0b12`;
    return (
      <div className="media-frame ratio ratio-16x9">
        {loaded ? (
          <iframe
            src={src}
            title={`${title} — juego jugable`}
            allowFullScreen
            allow="autoplay; fullscreen; gamepad"
          />
        ) : (
          <button
            type="button"
            className="media-facade"
            style={{ backgroundImage: `url(${cover})` }}
            onClick={() => setLoaded(true)}
          >
            <span className="facade-play" aria-hidden="true">
              <i className="bi bi-joystick" />
            </span>
            <span className="facade-label">Jugar {title} aquí</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="itch-widget">
      <img src={cover} alt="" className="itch-widget-cover" loading="lazy" />
      <iframe
        src={`https://itch.io/embed/${itch.embedId}?dark=true&linkback=true`}
        width={itch.width ?? 552}
        height={itch.height ?? 167}
        title={`${title} en itch.io`}
        loading="lazy"
      >
        <a href={itch.url}>{title} en itch.io</a>
      </iframe>
    </div>
  );
}
