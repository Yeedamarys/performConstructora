const getImg = (name: string) => `https://res.cloudinary.com/ddegmlh4o/image/upload/f_auto,q_auto/${name}`;

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  h1: string;
  service: string;
  client: string;
  team?: string;
  year: string;
  desc: string;
  images: ProjectImage[];
}

export const projectsData: Project[] = [
  {
    slug: "anclaje-talud-museo-yaku",
    title: "Anclaje en Talud — Museo Yaku, Quito | Perfo Construcciones",
    h1: "Perforación de Anclaje en Talud — Museo Yaku",
    service: "Anclajes en talud",
    client: "Ing. Eduardo Lazcano",
    year: "Agosto 2023",
    desc: "Perforación y anclaje en talud del Museo Yaku.",
    images: [
      { src: getImg('p1f1.png'), alt: "Anclaje talud Museo Yaku Quito Ecuador" }
    ]
  },
  {
    slug: "puente-rio-monjas-pomasqui",
    title: "Pilotaje para Puente sobre el Río Monjas, Pomasqui | Perfo Construcciones",
    h1: "Puente Vehicular sobre el Río Monjas — Sector Pomasqui",
    service: "Pilotaje Ø 0.80 m",
    client: "Ing. Luis Urgiles",
    year: "Diciembre 2024",
    desc: "Pilotaje de Ø 0.80 m a 12 m de profundidad con camisa perdida.",
    images: [
      { src: getImg('p2f1.jpg'), alt: "Pilotaje 0.80m puente vehicular Río Monjas Pomasqui Quito" },
      { src: getImg('p2f2.png'), alt: "Estructura de pilotaje puente vehicular Río Monjas" }
    ]
  },
  {
    slug: "mitigacion-riesgo-rio-monjas-orquideas",
    title: "Estabilización de Taludes — Mitigación de Riesgo Río Monjas | Perfo Construcciones",
    h1: "Mitigación de Riesgo Río Monjas — Proyecto Orquídeas",
    service: "Estabilización de taludes",
    client: "Consorcio Gaviones Quito",
    team: "Ing. Marco Peralta · Ing. Carlos Sánchez · Ing. Steve Burgos",
    year: "2025–2026",
    desc: "Estabilización de taludes para la mitigación de riesgo en el río Monjas.",
    images: [
      { src: getImg('p3f1.png'), alt: "Estabilización de taludes mitigación riesgo Río Monjas Quito" },
      { src: getImg('p3f2.png'), alt: "Malla de protección para estabilización Río Monjas" }
    ]
  },
  {
    slug: "proteccion-rio-machangara",
    title: "Anclajes y Geomanto — Protección del Río Machángara | Perfo Construcciones",
    h1: "Protección del Río Machángara — Anclajes y Malla Triple Torsión",
    service: "Anclajes y geomanto",
    client: "Ing. Francisco Vaca",
    year: "Septiembre 2025",
    desc: "Anclajes y colocación de geomanto con malla de triple torsión.",
    images: [
      { src: getImg('p4f1.png'), alt: "Anclajes y geomanto protección Río Machángara Quito" },
      { src: getImg('p4f2.png'), alt: "Colocación de malla triple torsión Río Machángara" }
    ]
  },
  {
    slug: "micropilotaje-hospital-loja",
    title: "Micropilotaje para Hospital Privado en Loja | Perfo Construcciones",
    h1: "Micropilotaje — Construcción Hospital Privado, Loja",
    service: "Micropilotaje Ø 0.38 m",
    client: "Ing. Salomón Rosero",
    year: "Junio 2026",
    desc: "Micropilotaje de Ø 0.38 m a 18 m de profundidad con camisa perdida.",
    images: [
      { src: getImg('p5f1.png'), alt: "Micropilotaje 0.38m Hospital Privado Loja Ecuador" },
      { src: getImg('p5f2.png'), alt: "Maquinaria de micropilotaje en obra Hospital Loja" }
    ]
  },
  {
    slug: "tuberia-hincada-rio-monjas-la-pampa",
    title: "Tubería Hincada — Protección de Talud Río Monjas, La Pampa | Perfo Construcciones",
    h1: "Protección del Talud en Río Monjas — Sector La Pampa",
    service: "Tubería hincada Ø 0.30 m",
    client: "Ing. Francisco Vaca",
    year: "Mayo 2025",
    desc: "Tubería hincada de Ø 0.30 m a 8 m de profundidad.",
    images: [
      { src: getImg('p6f1.png'), alt: "Tubería hincada 0.30m protección talud Río Monjas La Pampa" },
      { src: getImg('p6f2.png'), alt: "Obras de protección con tubería hincada La Pampa" }
    ]
  },
  {
    slug: "puente-majua-viche",
    title: "Tubería Hincada — Puente Vehicular de Majúa, Viche | Perfo Construcciones",
    h1: "Puente Vehicular de Majúa — Cantón Viche",
    service: "Tubería hincada Ø 0.30 m",
    client: "Ing. Abigail Cedeño",
    year: "Marzo 2024",
    desc: "Tubería hincada de Ø 0.30 m a 12 m de profundidad.",
    images: [
      { src: getImg('p7f1.png'), alt: "Tubería hincada 0.30m puente vehicular Majúa Viche" },
      { src: getImg('p7f2.png'), alt: "Cimentación puente Majúa Viche Ecuador" }
    ]
  },
  {
    slug: "cimentacion-acua-shops",
    title: "Pilotaje para Cimentación — Proyecto Acua Shops | Perfo Construcciones",
    h1: "Cimentación para el Proyecto Acua Shops",
    service: "Pilotaje Ø 0.80 m",
    client: "IFCE Cimentaciones Ecuador",
    year: "Julio 2026",
    desc: "Pilotaje de Ø 0.80 m a 23 m de profundidad para la cimentación del proyecto.",
    images: [
      { src: getImg('p8f1.png'), alt: "Pilotaje 0.80m cimentación Acua Shops Ecuador" },
      { src: getImg('p8f2.png'), alt: "Maquinaria de pilotaje Acua Shops" }
    ]
  }
];
