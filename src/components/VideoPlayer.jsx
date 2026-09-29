import { useRef, useState } from 'react';
export default function VideoPlayer({ video = {}, title }) {
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);
  const { provider = 'local', sources = [], id, poster, captions } = video;

  if (provider === 'youtube' || provider === 'vimeo') {
    const src =
      provider === 'youtube'
        ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
        : `https://player.vimeo.com/video/${id}?autoplay=1&dnt=1`;
    return (
      <div className="media-frame ratio ratio-16x9">
        {started ? (
          <iframe
            src={src}
            title={`${title} — cortometraje`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <PlayFacade poster={poster} title={title} onPlay={() => setStarted(true)} />
        )}
      </div>
    );
  }

  if (failed || !sources.length) {
    return (
      <div className="media-frame game-placeholder" style={{ backgroundImage: `url(${poster})` }}>
        <div className="media-overlay">
          <span className="badge-soon">
            <i className="bi bi-film" aria-hidden="true" /> Próximamente
          </span>
          <p className="mb-0">
            El cortometraje <strong>{title}</strong> estará disponible aquí muy pronto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="media-frame ratio ratio-16x9">
      <video
        ref={ref}
        controls={started}
        preload="metadata"
        poster={poster}
        playsInline
        onPlay={() => setStarted(true)}
        aria-label={`${title} — cortometraje`}
      >
        {sources.map((s, i) => (
          <source
            key={s.src}
            src={s.src}
            type={s.type}
            onError={i === sources.length - 1 ? () => setFailed(true) : undefined}
          />
        ))}
        {captions && <track kind="captions" src={captions} srcLang="es" label="Español" default />}
        Tu navegador no soporta video HTML5.
      </video>
      {!started && (
        <PlayFacade
          title={title}
          transparent
          onPlay={() => {
            setStarted(true);
            ref.current?.play().catch(() => setFailed(true));
          }}
        />
      )}
    </div>
  );
}

function PlayFacade({ poster, title, onPlay, transparent = false }) {
  return (
    <button
      type="button"
      className={`media-facade ${transparent ? 'is-transparent' : ''}`}
      style={poster ? { backgroundImage: `url(${poster})` } : undefined}
      onClick={onPlay}
    >
      <span className="facade-play" aria-hidden="true">
        <i className="bi bi-play-fill" />
      </span>
      <span className="facade-label">Reproducir {title}</span>
    </button>
  );
}
