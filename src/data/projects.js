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
    year: 2026,
    context: 'Proyecto académico · en dupla',
    role: 'Programación de gameplay',
    summary:
      'Videojuego 3D de acción inspirado en la mitología maya, con puzles, obstáculos y enemigos. Jugable en el navegador.',
    description: [
      'Itza: El despertar de la lluvia es un videojuego 3D de acción para un jugador, inspirado en la mitología maya y desarrollado en Unity. La protagonista, Itza, debe superar obstáculos, enemigos y puzles para llegar hasta el dios de la lluvia.',
      'Lo desarrollé junto con Natalia Noguera. Yo me encargué de la programación del juego: mecánicas, lógica de puzles y obstáculos, comportamiento de los enemigos e implementación de assets. Ella se encargó del diseño, la estética y los escenarios.',
      'El juego está publicado en itch.io y se puede jugar directamente en el navegador.',
    ],
    contributions: [
      'Mecánicas de juego',
      'Lógica de puzles',
      'Obstáculos',
      'Comportamiento de enemigos',
      'Implementación de assets',
      'Pruebas',
    ],
    tags: ['Unity', 'C#', 'Videojuego 3D', 'WebGL'],
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
    year: 2026,
    context: 'Proyecto académico · en equipo',
    role: 'Director de cámara',
    summary:
      'Cortometraje sobre el deterioro de un joven tras una ruptura amorosa y cómo esta afecta cada aspecto de su vida.',
    description: [
      'Hasta alcanzarte es un cortometraje grupal que muestra el deterioro de su protagonista después de una ruptura amorosa. La pérdida afecta cada aspecto de su vida: no logra concentrarse en sus estudios, se aleja de sus amigos y se refugia en el alcohol, hasta que se cruza con un ave que, según cree, lo llevará de vuelta a su expareja.',
      'Fui el director de cámara: busqué las locaciones, planeé y compuse las tomas y definí la propuesta visual junto al equipo. También participé como extra.',
    ],
    contributions: ['Dirección de cámara', 'Búsqueda de locaciones', 'Composición de tomas', 'Actuación (extra)'],
    tags: ['Cinematografía', 'Dirección de cámara', 'Premiere Pro', 'DaVinci Resolve'],
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
    context: 'Proyecto por encargo · individual',
    role: 'Diseño y desarrollo completo',
    summary:
      'Invitación web con cuenta regresiva, detalles del evento y confirmación de asistencia guardada en una base de datos.',
    description: [
      'Página web que me encargaron como invitación para una celebración de 15 años, con la temática "La Noche Estrellada". Los invitados consultan los detalles del evento y confirman su asistencia desde la misma página, y quien la encargó puede ver en todo momento quiénes han confirmado.',
      'La diseñé y desarrollé de principio a fin con HTML y React, apoyándome en herramientas de inteligencia artificial. Incluye cuenta regresiva en vivo, código de vestimenta, ubicación con enlaces a Google Maps y Waze, música de fondo y un formulario de confirmación conectado a una base de datos. Está publicada en Vercel.',
    ],
    contributions: [
      'Diseño de la interfaz',
      'Desarrollo con React',
      'Formulario de confirmación',
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
