import { cld } from '../seo/cloudinary';

export interface Service {
  slug: string;
  category: string;
  title: string;
  image: string;
  alt: string;
  description?: string;
  /** Compact label + key spec for the navbar dropdown. */
  menu: { title: string; spec: string };
  details: [string, string][];
  seo: { title: string; description: string };
  /** Slugs from projectsData that show this service in practice. */
  relatedProjects: string[];
  /**
   * Opening definition under the H1: what the service is, with the company's own figures,
   * readable on its own (it is the passage search and AI answers quote).
   */
  summary: string;
  /** Situations where the technique is the right choice. */
  uses: string[];
  /** Execution steps, in order. */
  process: string[];
  /** Visible FAQ, also published as FAQPage JSON-LD (src/seo/meta.ts). */
  faqs: { q: string; a: string }[];
  /** Other names people search the service by (Service.alternateName). */
  aka: string[];
}

/** Last review of the service content; shown on the page. */
export const CONTENT_UPDATED = '2026-10-06';

/** Cloudinary delivery transform for small previews (menu thumbnails). */
export const thumb = (url: string, width = 160) => cld(url, { w: width });

const QUOTE_FAQ = {
  q: '¿Qué información necesito para pedir una cotización?',
  a: 'El estudio de suelos, los planos o el diseño con las cantidades y dimensiones previstas, y la ubicación de la obra. Con esa información preparamos la cotización. Puede enviarla por el formulario de contacto del sitio o por WhatsApp al (+593) 95 956 4486.',
};

export const servicesData: Service[] = [
  {
    slug: 'pilotaje-barrenado',
    category: 'Cimentación primaria',
    title: 'Pilotaje Barrenado y Prebarrenado CFA',
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/barrenado.png',
    alt: 'Equipo de pilotaje barrenado perforando con hélice continua',
    menu: { title: 'Pilotaje Barrenado', spec: 'Ø 0.30 m a 1.50 m' },
    details: [
      ['Diámetros', 'de 0.30 m hasta 1.50 m.'],
      ['Profundidad', 'desde 1 m hasta 35 m.'],
      ['Normas', 'ACI 543 · AASHTO.'],
    ],
    seo: {
      title: 'Pilotaje Barrenado y Prebarrenado CFA en Quito',
      description: 'Pilotaje barrenado y prebarrenado CFA de 0.30 m a 1.50 m de diámetro y hasta 35 m de profundidad, bajo normas ACI 543 y AASHTO. Quito y todo el Ecuador.',
    },
    relatedProjects: ['puente-rio-monjas-pomasqui', 'micropilotaje-hospital-loja', 'cimentacion-acua-shops'],
    summary:
      'El pilotaje barrenado con hélice continua (CFA, también llamado pilotaje prebarrenado) es una cimentación profunda: se perfora el terreno con una hélice y se hormigona el pilote mientras la hélice sale, sin dejar la perforación sin soporte. En Quito y todo el Ecuador ejecutamos pilotes de 0.30 m a 1.50 m de diámetro y hasta 35 m de profundidad.',
    uses: [
      'Edificaciones de altura y viaductos cuyas cargas no puede soportar el suelo superficial.',
      'Puentes vehiculares: cimentación de estribos y pilas.',
      'Obras junto a edificaciones existentes, donde la vibración del hincado no es aceptable.',
      'Suelos poco cohesivos o con agua, en los que la hélice sostiene las paredes de la perforación hasta el hormigonado.',
    ],
    process: [
      'Revisión del estudio de suelos y del diseño estructural de los pilotes.',
      'Replanteo topográfico de cada pilote.',
      'Perforación con hélice continua hasta la cota de diseño.',
      'Hormigonado a través del eje hueco de la hélice mientras se extrae.',
      'Colocación de la armadura de acero en el hormigón fresco.',
      'Descabezado del pilote y registro de perforación y hormigonado de cada uno.',
    ],
    faqs: [
      {
        q: '¿Qué diámetros y profundidades de pilote ejecutan?',
        a: 'Ejecutamos pilotes barrenados de 0.30 m a 1.50 m de diámetro y desde 1 m hasta 35 m de profundidad. El diámetro y la longitud de cada pilote los define el diseño estructural a partir del estudio de suelos del proyecto.',
      },
      {
        q: '¿Qué diferencia hay entre el pilotaje barrenado y el hincado de pilotes?',
        a: 'En el pilotaje barrenado se perfora el terreno y el pilote se hormigona en sitio. En el hincado, un pilote prefabricado o una tubería se introduce en el suelo a golpes o por vibración. El barrenado produce menos vibración, por eso se prefiere junto a edificaciones existentes.',
      },
      {
        q: '¿Bajo qué normas se ejecutan los pilotes?',
        a: 'Bajo la norma ACI 543, que cubre el diseño, la fabricación y la instalación de pilotes de hormigón, y la norma AASHTO para puentes y estructuras viales.',
      },
      {
        q: '¿Dónde han ejecutado pilotaje?',
        a: 'Entre otros, el pilotaje de Ø 0.80 m a 12 m de profundidad del puente vehicular sobre el río Monjas, en Pomasqui (Quito, 2024), el pilotaje de Ø 0.80 m a 23 m del proyecto Acua Shops (2026) y el micropilotaje de un hospital privado en Loja (2026).',
      },
      QUOTE_FAQ,
    ],
    aka: ['Pilotaje prebarrenado', 'Pilotes CFA', 'Pilotaje con hélice continua', 'Pilotes barrenados'],
  },
  {
    slug: 'hincado-vibrohincado-pilotes',
    category: 'Refuerzo estructural',
    title: 'Hincado y Vibrohincado de Pilotes',
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/hincadopilotaje.png',
    alt: 'Hincado y vibrohincado de pilotes y tablestacas',
    menu: { title: 'Hincado y Vibrohincado', spec: 'Ø 8" a 60"' },
    details: [
      ['Diámetros', 'en tubería de 8 pulgadas hasta 60 pulgadas.'],
      ['Profundidad', 'desde 1 m hasta 25 m.'],
      ['Normas', 'ACI 543 · AASHTO.'],
    ],
    seo: {
      title: 'Hincado y Vibrohincado de Pilotes y Tablestacas',
      description: 'Hincado y vibrohincado de pilotes y tablestacas en tubería de 8 a 60 pulgadas, hasta 25 m de profundidad. Normas ACI 543 y AASHTO. Quito y Ecuador.',
    },
    relatedProjects: ['tuberia-hincada-rio-monjas-la-pampa', 'puente-majua-viche'],
    summary:
      'El hincado de pilotes introduce en el terreno pilotes, tuberías de acero o tablestacas sin extraer suelo: a golpes de martillo (hincado) o con un martillo vibratorio (vibrohincado). Desde Quito, para obras en todo el Ecuador, hincamos tubería de 8 a 60 pulgadas de diámetro hasta 25 m de profundidad, bajo normas ACI 543 y AASHTO.',
    uses: [
      'Protección de márgenes y taludes de ríos con tubería hincada.',
      'Cimentación de puentes vehiculares.',
      'Pantallas de tablestacas para contener terreno o agua en excavaciones y cauces.',
      'Soporte en espacios confinados y submuración de edificaciones existentes.',
    ],
    process: [
      'Revisión del estudio de suelos y elección entre hincado por impacto o vibrohincado.',
      'Replanteo y verificación de interferencias con redes y estructuras vecinas.',
      'Posicionamiento y aplomado del pilote, la tubería o la tablestaca.',
      'Hincado o vibrohincado hasta la profundidad de diseño o el rechazo especificado.',
      'Empalmes, corte o relleno de la tubería según el diseño.',
      'Registro de hinca de cada elemento.',
    ],
    faqs: [
      {
        q: '¿Qué diferencia hay entre hincado y vibrohincado?',
        a: 'En el hincado, el pilote entra en el terreno por los golpes de un martillo. En el vibrohincado, un vibrador reduce la fricción del suelo y el elemento penetra por su peso y la vibración. El vibrohincado es más rápido en suelos granulares y es habitual para tubería y tablestacas.',
      },
      {
        q: '¿Qué diámetros y profundidades manejan?',
        a: 'Hincamos tubería de 8 a 60 pulgadas de diámetro, desde 1 m hasta 25 m de profundidad, bajo las normas ACI 543 y AASHTO.',
      },
      {
        q: '¿Qué es una tablestaca y para qué sirve?',
        a: 'Es un perfil metálico que se hinca junto a otros para formar una pantalla continua en el terreno. Sirve para contener suelo o agua en excavaciones, cauces de ríos y obras junto a estructuras existentes.',
      },
      {
        q: '¿Dónde han hincado tubería?',
        a: 'En la protección del talud del río Monjas, sector La Pampa (Quito, 2025), con tubería de Ø 0.30 m a 8 m de profundidad, y en el puente vehicular de Majúa, cantón Viche (2024), con tubería de Ø 0.30 m a 12 m.',
      },
      QUOTE_FAQ,
    ],
    aka: ['Hincado de pilotes', 'Vibrohincado', 'Hincado de tablestacas', 'Tubería hincada'],
  },
  {
    slug: 'anclajes-muros-pantalla',
    category: 'Contención profunda',
    title: 'Anclajes para Muros Pantalla e Inyección de Lechada',
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/anclajehormigon.png',
    alt: 'Anclajes para muros pantalla e inyección de lechada',
    menu: { title: 'Muros Pantalla y Anclajes', spec: 'NEC-SE-GC' },
    details: [
      ['Diámetros', 'de 2 pulgadas a 6 pulgadas.'],
      ['Profundidad', 'desde 1 m hasta 18 m.'],
      ['Norma', 'NEC-SE-GC.'],
    ],
    seo: {
      title: 'Anclajes e Inyección de Lechada en Quito',
      description: 'Anclajes de 2 a 6 pulgadas y hasta 18 m para muros pantalla y taludes, con inyección de lechada. Norma NEC-SE-GC. Quito y todo el Ecuador.',
    },
    relatedProjects: ['anclaje-talud-museo-yaku', 'proteccion-rio-machangara'],
    summary:
      'Un anclaje es una barra o un cable de acero que se instala en una perforación y se fija al terreno con lechada de cemento para sujetar un muro pantalla o un talud. En Quito y todo el Ecuador instalamos anclajes de 2 a 6 pulgadas de diámetro y de 1 m a 18 m de profundidad, según la norma NEC-SE-GC.',
    uses: [
      'Muros pantalla de hormigón en sótanos y excavaciones profundas en zonas urbanas.',
      'Estabilización de taludes y laderas.',
      'Protección de márgenes de ríos junto con malla y geomanto.',
      'Consolidación de estratos con inyección de lechada.',
    ],
    process: [
      'Revisión del diseño geotécnico: longitud, inclinación y carga de cada anclaje.',
      'Perforación con el diámetro y la inclinación de diseño.',
      'Colocación de la barra o el cable de acero con sus centradores.',
      'Inyección de lechada de cemento para formar el bulbo del anclaje.',
      'Tensado y bloqueo contra el muro o la placa, cuando el anclaje es activo.',
      'Registro de perforación, inyección y tensado de cada anclaje.',
    ],
    faqs: [
      {
        q: '¿Qué es la inyección de lechada?',
        a: 'Es el bombeo de una mezcla de cemento y agua, la lechada, en una perforación o en el terreno. En un anclaje forma el bulbo que transmite la carga al suelo. En la consolidación de estratos rellena vacíos y fisuras y mejora la resistencia del terreno.',
      },
      {
        q: '¿Qué diámetros y profundidades de anclaje ejecutan?',
        a: 'Anclajes de 2 a 6 pulgadas de diámetro, desde 1 m hasta 18 m de profundidad. La longitud, la inclinación y la carga de cada anclaje salen del diseño geotécnico de la obra.',
      },
      {
        q: '¿Qué norma aplican?',
        a: 'La NEC-SE-GC, el capítulo de Geotecnia y Cimentaciones de la Norma Ecuatoriana de la Construcción.',
      },
      {
        q: '¿Cuándo se necesita un muro pantalla anclado?',
        a: 'Cuando se excava un sótano o un corte profundo junto a calles o edificios vecinos y el muro no puede apoyarse en puntales. Los anclajes sujetan el muro al terreno que está detrás y dejan libre el espacio de la excavación.',
      },
      {
        q: '¿Dónde han instalado anclajes?',
        a: 'En la perforación y el anclaje del talud del Museo Yaku, en Quito (2023), y en la protección del río Machángara (2025), donde se combinaron anclajes con geomanto y malla de triple torsión.',
      },
      QUOTE_FAQ,
    ],
    aka: ['Anclajes inyectados', 'Muros pantalla anclados', 'Inyección de lechada', 'Anclajes en talud'],
  },
  {
    slug: 'estabilizacion-taludes',
    category: 'Mitigación de riesgo',
    title: 'Estabilización de Taludes con Hormigón Lanzado y Anclajes',
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979978/taludes.png',
    alt: 'Estabilización de taludes con hormigón lanzado y anclajes',
    menu: { title: 'Estabilización de Taludes', spec: 'Norma CE.020' },
    description: 'Ejecutamos soluciones integrales para proteger y estabilizar taludes, desde la preparación de la superficie hasta el refuerzo y revestimiento final. Especialistas en perforación en suelo y perforación en roca para anclajes.',
    details: [
      ['Perfilado de talud', 'de 5 cm a 20 cm.'],
      ['Refuerzo estructural', 'Colocación de malla electrosoldada, geomanto y malla triple torsión.'],
      ['Anclajes', 'diámetro de 2 a 6 pulgadas y profundidad de 1 m a 18 m.'],
      ['Hormigón lanzado', 'espesor de 5 cm a 20 cm.'],
      ['Consolidación', 'Inyección de lechada para consolidación de estratos.'],
      ['Norma', 'CE.020.'],
    ],
    seo: {
      title: 'Estabilización de Taludes en Quito',
      description: 'Estabilización de taludes en Quito: anclajes, hormigón lanzado, malla electrosoldada, geomanto, malla triple torsión y drenes. Proyectos en Quito y Ecuador.',
    },
    relatedProjects: ['mitigacion-riesgo-rio-monjas-orquideas', 'proteccion-rio-machangara', 'anclaje-talud-museo-yaku'],
    summary:
      'La estabilización de taludes reúne los trabajos que evitan que un corte de terreno o una ladera se deslice o se erosione: perfilado, anclajes, malla, hormigón lanzado y drenaje. En Quito, una ciudad de laderas y quebradas, ejecutamos estas soluciones con anclajes de 2 a 6 pulgadas y hormigón lanzado de 5 a 20 cm de espesor.',
    uses: [
      'Cortes de terreno en vías, urbanizaciones y excavaciones.',
      'Laderas y quebradas con riesgo de deslizamiento.',
      'Márgenes de ríos con erosión.',
      'Taludes junto a edificaciones o patrimonio.',
    ],
    process: [
      'Perfilado del talud, de 5 a 20 cm.',
      'Perforación e instalación de anclajes de 2 a 6 pulgadas y 1 a 18 m, con inyección de lechada.',
      'Colocación del refuerzo: malla electrosoldada, geomanto o malla triple torsión.',
      'Hormigón lanzado (shotcrete) por vía húmeda, de 5 a 20 cm de espesor.',
      'Drenes californianos subhorizontales cuando hay agua en el terreno.',
      'Inyección de lechada para consolidar estratos cuando el terreno lo requiere.',
    ],
    faqs: [
      {
        q: '¿Qué elementos estabilizadores se usan en un talud?',
        a: 'Los principales son los anclajes inyectados, la malla (electrosoldada, de triple torsión o geomanto), el hormigón lanzado y los drenes subhorizontales. La combinación depende del tipo de suelo, la altura y la pendiente del talud y la presencia de agua.',
      },
      {
        q: '¿Qué es el hormigón lanzado o shotcrete?',
        a: 'Es hormigón proyectado a presión sobre la superficie del talud que forma un revestimiento continuo. Lo aplicamos por vía húmeda con espesores de 5 a 20 cm, normalmente sobre malla electrosoldada y combinado con anclajes.',
      },
      {
        q: '¿Cuándo se usa geomanto y cuándo malla triple torsión?',
        a: 'El geomanto controla la erosión superficial y deja crecer vegetación. La malla de triple torsión retiene fragmentos de suelo o roca que se desprenden. Se eligen según el material del talud y según se busque un acabado vegetal o un revestimiento más rígido.',
      },
      {
        q: '¿Qué es un dren californiano?',
        a: 'Es un tubo perforado que se instala en una perforación casi horizontal dentro del talud para evacuar el agua del terreno. Bajar la presión del agua es una de las formas más eficaces de evitar deslizamientos.',
      },
      {
        q: '¿Ejecutan estabilización de taludes en Quito?',
        a: 'Sí. Nuestra sede está en Quito. Hemos estabilizado taludes en la mitigación de riesgo del río Monjas, Proyecto Orquídeas (2025–2026), en el talud del Museo Yaku (2023) y en la protección del río Machángara (2025), y trabajamos en todo el Ecuador.',
      },
      QUOTE_FAQ,
    ],
    aka: ['Estabilizadores de taludes', 'Estabilización de laderas', 'Hormigón lanzado en taludes', 'Protección de taludes'],
  },
  {
    slug: 'perforacion-suelo-roca',
    category: 'Perforación geotécnica',
    title: 'Perforación en Suelo y Roca',
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/f_auto,q_auto/p1f1.png',
    alt: 'Perforación de anclaje en talud, Museo Yaku, Quito',
    menu: { title: 'Perforación en Suelo y Roca', spec: 'Ø 2" a 1.50 m' },
    details: [
      ['Perforación para anclajes', 'diámetro de 2 a 6 pulgadas, profundidad de 1 m a 18 m.'],
      ['Perforación para pilotes', 'diámetro de 0.30 m a 1.50 m, profundidad hasta 35 m.'],
      ['Aplicaciones', 'anclajes, micropilotes, pilotes, drenes e inyección de lechada.'],
      ['Norma', 'NEC-SE-GC.'],
    ],
    seo: {
      title: 'Perforación en Suelo y Roca en Quito',
      description: 'Perforación en suelo y roca para anclajes, micropilotes, pilotes y drenes: de 2 pulgadas a 1.50 m de diámetro y hasta 35 m de profundidad. Quito y Ecuador.',
    },
    relatedProjects: ['anclaje-talud-museo-yaku', 'micropilotaje-hospital-loja', 'proteccion-rio-machangara'],
    summary:
      'La perforación geotécnica abre en el terreno, sea suelo o roca, el hueco donde después se instala un anclaje, un micropilote, un pilote o un dren. Desde Quito, para obras en todo el Ecuador, perforamos desde 2 pulgadas de diámetro para anclajes hasta 1.50 m para pilotes, con profundidades de hasta 35 m.',
    uses: [
      'Anclajes para muros pantalla y taludes.',
      'Micropilotes y pilotes de cimentación.',
      'Drenes californianos subhorizontales.',
      'Inyección de lechada para consolidar estratos.',
    ],
    process: [
      'Revisión del estudio geotécnico: estratos, tipo de suelo o roca y nivel de agua.',
      'Elección del método y del diámetro según el elemento que se va a instalar.',
      'Replanteo de cada perforación con su inclinación de diseño.',
      'Perforación hasta la profundidad de diseño, con revestimiento cuando el terreno es inestable.',
      'Limpieza de la perforación e instalación del anclaje, micropilote, armadura o dren.',
      'Registro de cada perforación: profundidad, estratos atravesados y presencia de agua.',
    ],
    faqs: [
      {
        q: '¿Qué diferencia hay entre perforar en suelo y en roca?',
        a: 'En suelo, el reto es que las paredes no se derrumben, por eso se perfora con hélice continua o con tubería de revestimiento. En roca, el reto es la dureza y se usan herramientas de corte o de percusión. Muchas obras atraviesan ambos tipos de terreno en la misma perforación.',
      },
      {
        q: '¿Qué diámetros y profundidades de perforación manejan?',
        a: 'Para anclajes y drenes, de 2 a 6 pulgadas de diámetro y hasta 18 m de profundidad. Para pilotes barrenados, de 0.30 m a 1.50 m de diámetro y hasta 35 m.',
      },
      {
        q: '¿Para qué sirve una perforación geotécnica?',
        a: 'Para alojar elementos que trabajan dentro del terreno: anclajes que sujetan muros y taludes, micropilotes y pilotes que llevan las cargas a estratos firmes, drenes que evacuan el agua y perforaciones de inyección que consolidan el suelo.',
      },
      {
        q: '¿Dónde han realizado perforaciones?',
        a: 'Entre otros, en la perforación de anclajes del talud del Museo Yaku, en Quito (2023), en el micropilotaje de Ø 0.38 m a 18 m de un hospital privado en Loja (2026) y en los anclajes de la protección del río Machángara (2025).',
      },
      QUOTE_FAQ,
    ],
    aka: ['Perforaciones geotécnicas', 'Perforación de suelo', 'Perforación de roca', 'Perforación para anclajes'],
  },
];

export const serviceHref = (slug: string) => `/servicios/${slug}`;

/** The service a project showcases (first match in service order), for linking a project to its service page. */
export const serviceForProject = (projectSlug: string) =>
  servicesData.find((s) => s.relatedProjects.includes(projectSlug));
