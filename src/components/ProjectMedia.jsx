import GameEmbed from './GameEmbed.jsx';
import VideoPlayer from './VideoPlayer.jsx';
import WebsitePreview from './WebsitePreview.jsx';
import ModelViewer from './ModelViewer.jsx';

export default function ProjectMedia({ project }) {
  switch (project.type) {
    case 'game': {
      const { itch = {}, trailer } = project;
      if (itch.playInPortfolio && itch.embedId) return <GameEmbed project={project} />;
      if (trailer) {
        return (
          <div className="game-media">
            <VideoPlayer video={trailer} title={`Tráiler de ${project.title}`} />
            {itch.url && (
              <a href={itch.url} target="_blank" rel="noopener noreferrer" className="play-callout">
                <span className="play-callout-icon" aria-hidden="true">
                  <i className="bi bi-joystick" />
                </span>
                <span className="play-callout-text">
                  <strong>Jugable en el navegador</strong>
                  <small>Sin descargas · Recomendado en computador con teclado y mouse</small>
                </span>
                <span className="play-callout-cta">
                  Jugar en itch.io <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                </span>
                <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
              </a>
            )}
          </div>
        );
      }
      return <GameEmbed project={project} />;
    }
    case 'film':
      return <VideoPlayer video={project.video} title={project.title} />;
    case '3d':
      return <ModelViewer model={project.model} title={project.title} cover={project.cover} />;
    case 'web':
      return <WebsitePreview website={project.website} title={project.title} />;
    default:
      return <img src={project.cover} alt={project.title} className="img-fluid rounded-3" />;
  }
}
