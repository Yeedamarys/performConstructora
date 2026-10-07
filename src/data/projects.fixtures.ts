/**
 * Dev-only stress fixtures for the project cards (break-ui). Selected with ?data=worst|empty|one|many
 * through DevDataToggle; never reaches production: projects.ts only calls this under import.meta.env.DEV,
 * so the build drops the module.
 *
 * Every worst-case value is something a real Quito works contract could carry. The real slugs are kept
 * so Home's featured list and the service pages' related projects pick the variants up.
 */
import type { Project } from './projects';

export type DataMode = 'demo' | 'worst' | 'empty' | 'one' | 'many';

const IMG = (name: string) => `https://res.cloudinary.com/ddegmlh4o/image/upload/f_auto,q_auto/${name}`;

/** One failure per row, spread across the first cards on screen (break-ui rule 3). */
const variants: Partial<Project>[] = [
  // Long everything: public-works naming, a full public entity as client, an open-ended date range.
  {
    title: 'Estabilización de Taludes y Muros Anclados — Ampliación de la Av. Simón Bolívar, Tramo Intercambiador de Carcelén – Distribuidor de Tráfico Ruta Viva | Perfor Construcciones',
    h1: 'Estabilización de Taludes y Muros Anclados — Ampliación de la Av. Simón Bolívar, Tramo Intercambiador de Carcelén – Distribuidor de Tráfico Ruta Viva',
    service: 'Anclajes Ø 4" a 18 m + hormigón lanzado 15 cm + drenes californianos',
    client: 'Empresa Pública Metropolitana de Movilidad y Obras Públicas (EPMMOP)',
    year: 'Enero 2025 – Marzo 2026 (en ejecución)',
    desc: 'Perfilado de 4.200 m² de talud, 312 anclajes de Ø 4" entre 12 y 18 m con inyección de lechada, malla electrosoldada, hormigón lanzado por vía húmeda de 15 cm y 46 drenes californianos subhorizontales, ejecutados por etapas sin cierre total del tráfico en el distribuidor.',
  },
  // Shortest realistic: one-word title, generic client, single photo.
  {
    title: 'Puente | Perfor Construcciones',
    h1: 'Puente',
    service: 'Pilotaje',
    client: 'Particular',
    year: '2026',
    desc: 'Pilotaje.',
    images: [{ src: IMG('p2f1.jpg'), alt: 'Puente' }],
  },
  // Unbreakable strings: hyphen-joined names, a spec with no spaces, a client with its tax ID.
  {
    title: 'Cimentación Torre-Cumbayá-Residencial-Panorámico-Etapa-II | Perfor Construcciones',
    service: 'Micropilotaje/Ø0.38m/L=18m/camisa-perdida',
    client: 'IFCE-Cimentaciones-Ecuador-S.A.S.-RUC-1792345678001',
    year: 'Jun 2026',
  },
  // No photos yet (the contract started last week) and no description.
  {
    title: 'Protección del Río Machángara — Fase 2 | Perfor Construcciones',
    images: [],
    desc: '',
  },
  // A pipe inside the name: the title split on " | " cuts the real name short.
  {
    title: 'Hospital | Bloque B — Micropilotaje de Ampliación | Perfor Construcciones',
    images: Array.from({ length: 5 }, (_, i) => ({ src: IMG(i % 2 ? 'p5f1.jpg' : 'p2f1.jpg'), alt: `Micropilotaje bloque B, frente ${i + 1}` })),
  },
  // Characters that need escaping, and a newline pasted from a contract.
  {
    client: 'Constructora Vial & Asociados <S.A.>',
    desc: 'Tubería hincada de Ø 0.30 m.\nSegunda línea copiada del acta de entrega – recepción.',
  },
  // Long municipal client name with accents.
  {
    client: 'Gobierno Autónomo Descentralizado Municipal del Cantón San Miguel de los Bancos',
    year: 'Diciembre 2024',
  },
];

export function devProjects(real: Project[]): Project[] {
  const mode = (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('data')) as DataMode | null;
  switch (mode) {
    case 'worst':
      return real.map((p, i) => ({ ...p, ...variants[i % variants.length] }));
    case 'empty':
      return [];
    case 'one':
      return real.slice(0, 1);
    case 'many':
      // Realistic upper bound for an unpaginated portfolio after a few years: 64 works.
      return Array.from({ length: 8 }, (_, n) => real.map((p) => ({ ...p, slug: `${p.slug}-${n + 1}` }))).flat();
    default:
      return real;
  }
}
