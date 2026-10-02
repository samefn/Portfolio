export const categories = [
  { id: 'all', label: 'Todos', icon: 'bi-grid' },
  { id: 'game', label: 'Videojuegos', icon: 'bi-controller' },
  { id: 'film', label: 'Audiovisual', icon: 'bi-film' },
  { id: '3d', label: '3D', icon: 'bi-box' },
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
    slug: 'spider-gwen',
    type: '3d',
    title: 'Spider-Gwen: modelado y rigging',
    year: null,
    context: 'Personaje 3D · trabajo individual',
    role: 'Modelado, rigging y blend shapes',
    summary:
      'Personaje modelado y riggeado por completo en Maya, con 75 huesos y 21 blend shapes faciales. Se puede explorar en 3D.',
    description: [
      'Modelé y riggeé por completo a Spider-Gwen en Maya. El esqueleto tiene 75 huesos, con dedos articulados, ojos, pupilas y mandíbula. El rig incluye controles FK e IK y una interfaz facial para las vocales y los parpadeos.',
      'Para la cara creé 21 blend shapes: las vocales A, E, I, O y U para hablar, parpadeos de ojos y pestañas, y controles independientes para labios y cejas.',
      'El visor muestra el modelo exportado a glTF: puedes girarlo, ver el esqueleto y la malla, animar el rig y mover cada blend shape. Los controles de Maya no se exportan a la web, por eso aquí se manejan con deslizadores.',
    ],
    contributions: [
      'Modelado 3D',
      'Esqueleto de 75 huesos',
      'Skinning',
      'Controles FK / IK',
      'Blend shapes faciales',
      'Exportación a glTF',
    ],
    tags: ['Maya', 'Blender', 'Rigging', 'Blend shapes'],
    cover: '/images/spider-gwen.webp',
    gallery: [
      { src: '/images/spider-gwen.webp', alt: 'Spider-Gwen en vista de tres cuartos, frente y perfil' },
      { src: '/images/spider-gwen-expresiones.webp', alt: 'Blend shapes de Spider-Gwen: neutral, vocales A, E y O, cejas y parpadeo' },
    ],
    accent: '#A78BFA',
    model: {
      src: '/models/spider-gwen.glb',
      size: '4,3 MB',
      note: 'Fan art sin fines comerciales. Spider-Gwen es un personaje de Marvel.',
      cycleTime: 0.6,
      morphs: [
        {
          title: 'Vocales',
          items: [
            { label: 'A', targets: ['Vocal_A'], role: 'cycle' },
            { label: 'E', targets: ['Vocal_E'], role: 'cycle' },
            { label: 'I', targets: ['Vocal_I'], role: 'cycle' },
            { label: 'O', targets: ['Vocal_O'], role: 'cycle' },
            { label: 'U', targets: ['Vocal_U'], role: 'cycle' },
          ],
        },
        {
          title: 'Ojos',
          items: [
            { label: 'Parpadeo izquierdo', targets: ['Parpadeo_ojo_izq', 'Pestaña_parpadeo_ojo_izq'], role: 'blink' },
            { label: 'Parpadeo derecho', targets: ['Parpadeo_ojo_der', 'Pestaña_parpadeo_ojo_der'], role: 'blink' },
          ],
        },
        {
          title: 'Cejas',
          items: [
            { label: 'Interior izquierda', targets: ['Ceja_parte_int_izq'] },
            { label: 'Media izquierda', targets: ['Ceja_parte_media_izq'] },
            { label: 'Exterior izquierda', targets: ['Ceja_parte_ext_izq'] },
            { label: 'Interior derecha', targets: ['Ceja_parte_int_der'] },
            { label: 'Media derecha', targets: ['Ceja_parte_media_der'] },
            { label: 'Exterior derecha', targets: ['Ceja_parte_ext_der'] },
          ],
        },
        {
          title: 'Labios',
          items: [
            { label: 'Superior izquierdo', targets: ['Labio_sup_izq'] },
            { label: 'Superior centro', targets: ['Labio_sup_mitad'] },
            { label: 'Superior derecho', targets: ['Labio_sup_der'] },
            { label: 'Inferior izquierdo', targets: ['Labio_inf_izq'] },
            { label: 'Inferior centro', targets: ['Labio_inf_mitad'] },
            { label: 'Inferior derecho', targets: ['Labio_inf_der'] },
          ],
        },
      ],
    },
    links: { demo: '', repo: '' },
  },
  {
    slug: 'zelda-rig',
    type: '3d',
    title: 'Zelda: rigging y blend shapes',
    year: null,
    context: 'Proyecto académico · modelo base proporcionado en clase',
    role: 'Rigging y blend shapes',
    summary:
      'Rig completo y expresiones faciales para un personaje entregado ya modelado en clase. Se puede explorar en 3D.',
    description: [
      'Para este proyecto de clase recibimos el modelo de Zelda ya terminado. Yo hice todo el rigging: un esqueleto de 75 huesos con dedos, ojos y mandíbula, y el skinning de cada parte del cuerpo y la ropa.',
      'También creé sus blend shapes faciales: sonrisa, tristeza, furia, parpadeo de cada ojo y una ceja levantada al estilo de "La Roca", combinando la deformación de la cara con la de las cejas.',
    ],
    contributions: ['Esqueleto de 75 huesos', 'Skinning', 'Blend shapes faciales', 'Exportación a glTF'],
    tags: ['Maya', 'Rigging', 'Blend shapes'],
    cover: '/images/zelda-rig.webp',
    gallery: [
      { src: '/images/zelda-rig.webp', alt: 'Zelda en vista de tres cuartos, frente y perfil' },
      { src: '/images/zelda-expresiones.webp', alt: 'Blend shapes de Zelda: neutral, sonrisa, tristeza, furia, ceja de La Roca y parpadeo' },
    ],
    accent: '#22C55E',
    model: {
      src: '/models/zelda.glb',
      size: '0,9 MB',
      note: 'Modelo base proporcionado en clase; rigging y blend shapes de Santiago Moreno. Zelda es un personaje de Nintendo; trabajo académico sin fines comerciales.',
      cycleTime: 1.4,
      morphs: [
        {
          title: 'Expresiones',
          items: [
            { label: 'Sonrisa', targets: ['Sonreir'], role: 'cycle' },
            { label: 'Tristeza', targets: ['Triste'], role: 'cycle' },
            { label: 'Furia', targets: ['Furia', 'Furia_cejas'], role: 'cycle' },
            { label: 'Ceja de La Roca', targets: ['LaRoca', 'LaRocaCeja'], role: 'cycle' },
          ],
        },
        {
          title: 'Ojos',
          items: [
            { label: 'Parpadeo izquierdo', targets: ['Parpadeo_izq'], role: 'blink' },
            { label: 'Parpadeo derecho', targets: ['Parpadeo_der'], role: 'blink' },
          ],
        },
      ],
    },
    links: { demo: '', repo: '' },
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
  '3d': 'Modelo 3D',
};
