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
}

/** Cloudinary delivery transform for small previews (menu thumbnails). */
export const thumb = (url: string, width = 160) => cld(url, { w: width });

export const servicesData: Service[] = [
  {
    slug: 'pilotaje-barrenado',
    category: 'Cimentación primaria',
    title: 'Pilotaje Barrenado y Perforación en Suelo',
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/barrenado.png',
    alt: 'Pilotaje barrenado y perforación en suelo',
    menu: { title: 'Pilotaje Barrenado', spec: 'Ø 0.30 m a 1.50 m' },
    details: [
      ['Diámetros', 'de 0.30 m hasta 1.50 m.'],
      ['Profundidad', 'desde 1 m hasta 35 m.'],
      ['Normas', 'ACI 543 · AASHTO.'],
    ],
    seo: {
      title: 'Pilotaje Barrenado en Quito',
      description: 'Pilotaje barrenado de 0.30 m a 1.50 m de diámetro y hasta 35 m de profundidad, bajo normas ACI 543 y AASHTO. Servicio en Quito y todo el Ecuador.',
    },
    relatedProjects: ['puente-rio-monjas-pomasqui', 'micropilotaje-hospital-loja', 'cimentacion-acua-shops'],
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
      title: 'Hincado y Vibrohincado de Pilotes',
      description: 'Hincado y vibrohincado de pilotes y tablestacas en tubería de 8 a 60 pulgadas, hasta 25 m de profundidad. Normas ACI 543 y AASHTO.',
    },
    relatedProjects: ['tuberia-hincada-rio-monjas-la-pampa', 'puente-majua-viche'],
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
      title: 'Anclajes para Muros Pantalla',
      description: 'Anclajes de 2 a 6 pulgadas de diámetro y hasta 18 m de profundidad para muros pantalla, con inyección de lechada. Norma NEC-SE-GC.',
    },
    relatedProjects: ['anclaje-talud-museo-yaku', 'proteccion-rio-machangara'],
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
      description: 'Estabilización de taludes con hormigón lanzado, anclajes, malla electrosoldada, geomanto y malla triple torsión. Norma CE.020. Quito y Ecuador.',
    },
    relatedProjects: ['mitigacion-riesgo-rio-monjas-orquideas', 'proteccion-rio-machangara', 'anclaje-talud-museo-yaku'],
  },
];

export const serviceHref = (slug: string) => `/servicios/${slug}`;

/** The service a project showcases (first match in service order), for linking a project to its service page. */
export const serviceForProject = (projectSlug: string) =>
  servicesData.find((s) => s.relatedProjects.includes(projectSlug));
