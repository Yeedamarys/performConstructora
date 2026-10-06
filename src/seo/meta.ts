/**
 * Single source of truth for per-route SEO. Used by the server (to put real tags in the
 * HTML crawlers and link previews receive) and by the client (to keep them in sync on
 * in-app navigation).
 */
import { projectsData } from '../data/projects';
import { servicesData } from '../data/services';
import { cld } from './cloudinary';

export const SITE_URL = 'https://perforconstrucciones.com';
export const BRAND = 'Perfo Construcciones';
export const ORG_ID = `${SITE_URL}/#organization`;
const DEFAULT_IMAGE = `${SITE_URL}/logo-mark.png`;
const MAX_TITLE = 60;
const MAX_DESC = 160;

export interface RouteMeta {
  status: 200 | 404;
  title: string;
  description: string;
  canonical: string | null;
  image: string;
  robots: string;
  jsonLd: object[];
}

/** Appends the brand only when the result still fits in a search result. */
const withBrand = (title: string) => {
  const full = `${title} | ${BRAND}`;
  return full.length <= MAX_TITLE ? full : title;
};

/** Cuts at a word boundary so descriptions never end mid-word. */
const clip = (text: string, max = MAX_DESC) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

const socialImage = (src: string) => cld(src, { w: 1200, h: 630, crop: 'fill' });

const breadcrumbs = (items: [name: string, path: string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: `${SITE_URL}${path}`,
  })),
});

const STATIC: Record<string, { title: string; description: string; crumb?: string }> = {
  '/': {
    title: `Pilotaje y Estabilización de Taludes | ${BRAND}`,
    description:
      'Pilotaje barrenado, hincado de pilotes, anclajes para muros pantalla y estabilización de taludes en Quito y todo el Ecuador. Cotiza tu proyecto.',
  },
  '/servicios': {
    title: withBrand('Servicios de Pilotaje y Geotecnia'),
    description:
      'Pilotaje barrenado, hincado de pilotes, anclajes para muros pantalla y estabilización de taludes. Normas ACI 543, AASHTO, NEC-SE-GC y CE.020.',
    crumb: 'Servicios',
  },
  '/proyectos': {
    title: withBrand('Proyectos de Pilotaje y Taludes'),
    description:
      'Conoce nuestros proyectos ejecutados en Quito y Ecuador: puentes, hospitales, protección de ríos y taludes. Experiencia comprobada desde 2023.',
    crumb: 'Proyectos',
  },
  '/nosotros': {
    title: withBrand('Nosotros: Geotecnia y Obra Civil'),
    description:
      'Perfo Construcciones: empresa quiteña especializada en pilotaje, estabilización de taludes y obra civil. Conoce nuestra misión, visión y ventajas competitivas.',
    crumb: 'Nosotros',
  },
  '/contacto': {
    title: withBrand('Cotiza tu Proyecto en Quito'),
    description:
      'Solicita una cotización para tu proyecto de pilotaje, anclajes o estabilización de taludes. Atención en Quito y todo el Ecuador. Respuesta rápida.',
    crumb: 'Contacto',
  },
};

const page = (path: string, m: Partial<RouteMeta> & Pick<RouteMeta, 'title' | 'description'>): RouteMeta => ({
  status: 200,
  canonical: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`,
  image: DEFAULT_IMAGE,
  robots: 'index, follow',
  jsonLd: [],
  ...m,
  description: clip(m.description),
});

export function routeMeta(pathname: string): RouteMeta {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '').toLowerCase();

  const fixed = STATIC[path];
  if (fixed) {
    return page(path, {
      title: fixed.title,
      description: fixed.description,
      jsonLd: fixed.crumb ? [breadcrumbs([['Inicio', '/'], [fixed.crumb, path]])] : [],
    });
  }

  const serviceSlug = path.match(/^\/servicios\/([^/]+)$/)?.[1];
  const service = serviceSlug && servicesData.find((s) => s.slug === serviceSlug);
  if (service) {
    return page(path, {
      title: withBrand(service.seo.title),
      description: service.seo.description,
      image: socialImage(service.image),
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          serviceType: service.category,
          description: service.seo.description,
          url: `${SITE_URL}${path}`,
          image: cld(service.image, { w: 1200 }),
          provider: { '@id': ORG_ID },
          areaServed: { '@type': 'Country', name: 'Ecuador' },
        },
        breadcrumbs([['Inicio', '/'], ['Servicios', '/servicios'], [service.title, path]]),
      ],
    });
  }

  const projectSlug = path.match(/^\/proyectos\/([^/]+)$/)?.[1];
  const project = projectSlug && projectsData.find((p) => p.slug === projectSlug);
  if (project) {
    const name = project.title.split(' | ')[0];
    return page(path, {
      title: withBrand(name),
      description: `${project.h1}. ${project.desc} Cliente: ${project.client}. ${project.year}.`,
      image: project.images[0] ? socialImage(project.images[0].src) : DEFAULT_IMAGE,
      jsonLd: [breadcrumbs([['Inicio', '/'], ['Proyectos', '/proyectos'], [name, path]])],
    });
  }

  return {
    status: 404,
    title: withBrand('Página no encontrada'),
    description: 'La página que buscas no existe o fue movida. Revisa nuestros servicios de pilotaje, anclajes y estabilización de taludes.',
    canonical: null,
    image: DEFAULT_IMAGE,
    robots: 'noindex, follow',
    jsonLd: [],
  };
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Head tags for server rendering; the client updates the same tags in place. */
export function renderHead(m: RouteMeta, url: string) {
  const ogUrl = m.canonical ?? `${SITE_URL}${url}`;
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${m.robots}" />`,
    m.canonical ? `<link rel="canonical" href="${esc(m.canonical)}" />` : '',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="es_EC" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${esc(ogUrl)}" />`,
    `<meta property="og:image" content="${esc(m.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(m.image)}" />`,
    `<script type="application/ld+json" id="route-jsonld">${JSON.stringify(m.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
}
