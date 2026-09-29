export const categories = [
  { id: 'all', label: 'Todos', icon: 'bi-grid' },
  { id: 'game', label: 'Videojuegos', icon: 'bi-controller' },
  { id: 'film', label: 'Audiovisual', icon: 'bi-film' },
  { id: 'web', label: 'Web', icon: 'bi-window' },
];

const yt = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export const projects = [
  {
    slug: 'itza-el-despertar-de-la-lluvia',
    type: 'game',
    title: 'Itza: El despertar de la lluvia',
    year: null,
    context: 'Proyecto académico · en dupla',
    role: 'Desarrollo de juego',
    summary: 'Videojuego 3D de acción inspirado en la mitología y la cultura azteca. Jugable en el navegador.',
    description: [
      'Itza: El despertar de la lluvia es un videojuego 3D inspirado en la mitología y la cultura azteca, desarrollado en Unity como proyecto académico junto con una compañera.',
      'Participé en el desarrollo del juego: implementación de mecánicas e interacciones, integración de assets, diseño de niveles y pruebas. El juego está publicado en itch.io y se puede jugar directamente en el navegador.',
    ],
    contributions: [
      'Implementación de mecánicas',
      'Interacciones',
      'Implementación de assets',
      'Diseño de niveles',
      'Pruebas',
    ],
    tags: ['Unity', 'Videojuego 3D', 'WebGL', 'Diseño de niveles'],
    cover: yt('SLjbb3fHpCk'),
    gallery: [],
    accent: '#F37321',
    trailer: { provider: 'youtube', id: 'SLjbb3fHpCk', poster: yt('SLjbb3fHpCk') },
    itch: {
      published: true,
      playInPortfolio: false,
      mode: 'playable',
      embedId: '',
      url: 'https://samefn.itch.io/itza-el-despertar-de-la-lluvia',
    },
    links: {
      demo: 'https://samefn.itch.io/itza-el-despertar-de-la-lluvia',
      repo: 'https://github.com/samefn/Itza-el-despertar-de-la-lluvia',
    },
  },
  {
    slug: 'hasta-alcanzarte',
    type: 'film',
    title: 'Hasta alcanzarte',
    year: null,
    context: 'Trabajo en equipo',
    role: 'Cámara, cinematografía, edición y animación',
    summary:
      'Cortometraje sobre la dificultad de superar una relación pasada y el deterioro progresivo de su protagonista.',
    description: [
      'Hasta alcanzarte es un cortometraje desarrollado en equipo. La historia se centra en la dificultad de superar una relación pasada y en el deterioro progresivo del protagonista.',
      'Participé en la dirección de cámara, la cinematografía, la edición y la animación.',
    ],
    contributions: ['Dirección de cámara', 'Cinematografía', 'Edición', 'Animación'],
    tags: ['Cinematografía', 'Dirección de cámara', 'Edición', 'Animación'],
    cover: yt('4yPrIC1MTJ8'),
    gallery: [],
    accent: '#8B5CF6',
    video: {
      provider: 'youtube',
      id: '4yPrIC1MTJ8',
      poster: yt('4yPrIC1MTJ8'),
    },
    links: {
      demo: 'https://www.youtube.com/watch?v=4yPrIC1MTJ8',
      repo: '',
    },
  },
  {
    slug: 'invitacion-xv',
    type: 'web',
    title: 'Invitación de 15 años',
    year: null,
    context: 'Página web · Proyecto real',
    role: 'Diseño y desarrollo',
    summary:
      'Invitación web con cuenta regresiva, ubicación del evento y confirmación de asistencia conectada a una base de datos.',
    description: [
      'Página web creada como invitación para una celebración de 15 años, con la temática "La Noche Estrellada". Los invitados consultan los detalles del evento y confirman su asistencia desde la misma página.',
      'Incluye cuenta regresiva en vivo, código de vestimenta, ubicación con enlaces a Google Maps y Waze, música de fondo y un formulario de confirmación que guarda las respuestas en una base de datos. Diseñada y desarrollada con HTML y React, y publicada en Vercel.',
    ],
    contributions: [
      'Diseño de la interfaz',
      'Desarrollo con React',
      'Confirmación de asistencia',
      'Base de datos',
      'Cuenta regresiva',
      'Publicación en Vercel',
    ],
    tags: ['React', 'HTML', 'CSS', 'Base de datos', 'Vercel'],
    cover: '/images/invitacion-xv.svg',
    gallery: [],
    accent: '#22C55E',
    website: {
      url: 'https://luciana15yearsinvitation.vercel.app/',
      screenshot: '/images/invitacion-xv.svg',
    },
    links: {
      demo: 'https://luciana15yearsinvitation.vercel.app/',
      repo: 'https://github.com/samefn/Party_Invitation',
    },
  },
  {
    slug: 'soccerdb',
    type: 'web',
    title: 'SoccerDB: gestor de bases SQL y NoSQL',
    year: null,
    context: 'Proyecto académico · equipo de 3',
    role: 'Frontend y backend: cifrado, ETL, rutas SQL y Firebase',
    summary:
      'Aplicación web para registrar, consultar y migrar datos de fútbol entre MySQL y Firebase, con API REST en Node.js.',
    description: [
      'SoccerDB es una aplicación web que trabaja al mismo tiempo con una base de datos relacional (MySQL) y una NoSQL (Firebase Firestore). Permite registrar clubes, jugadores y partidos, consultarlos con paginación y migrar jugadores de Firebase a MySQL mediante un proceso ETL (extracción, transformación y carga).',
      'El backend es una API REST en Node.js y Express. Incluye inicio de sesión con contraseñas cifradas por sustitución, subida de foto de perfil y subcolecciones en Firestore (estadísticas por jugador y clubes por partido).',
      'La versión en línea funciona en modo demostración: usa bases de datos en memoria con datos de ejemplo, así que se puede probar todo sin exponer credenciales ni tocar las bases reales.',
    ],
    contributions: [
      'Frontend',
      'Rutas SQL (MySQL)',
      'Rutas NoSQL (Firebase)',
      'Migración ETL',
      'Cifrado de contraseñas',
      'Modo demostración',
    ],
    tags: ['Node.js', 'Express', 'MySQL', 'Firebase', 'ETL'],
    cover: '/images/soccerdb.svg',
    gallery: [
      { src: '/images/soccerdb-er.webp', alt: 'Modelo entidad-relación de la base de datos MySQL', fit: 'contain' },
    ],
    accent: '#22C55E',
    website: {
      url: 'https://soccerdb-demo.onrender.com/login.html',
      screenshot: '/images/soccerdb.svg',
      note: 'Modo demostración con datos de ejemplo · usuario demo / contraseña demo1234. La primera carga puede tardar hasta un minuto (servidor gratuito).',
    },
    links: {
      demo: 'https://soccerdb-demo.onrender.com/login.html',
      repo: 'https://github.com/samefn/ProyectDB3',
    },
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

export const typeLabel = {
  game: 'Videojuego',
  film: 'Cortometraje',
  web: 'Página web',
};
