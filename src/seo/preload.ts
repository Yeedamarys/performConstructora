/**
 * modulepreload tags for a route's lazy page chunk, read from Vite's build manifest.
 * Shared by the prerender step (scripts/prerender.mjs) and the server fallback (server.ts).
 */

/** Page module behind each route; mirrors the lazy routes in src/App.tsx (Home is in the main bundle). */
const ROUTE_MODULES: [RegExp, string][] = [
  [/^\/nosotros$/, 'src/pages/About.tsx'],
  [/^\/servicios$/, 'src/pages/Services.tsx'],
  [/^\/servicios\/[^/]+$/, 'src/pages/ServiceDetail.tsx'],
  [/^\/proyectos$/, 'src/pages/Projects.tsx'],
  [/^\/proyectos\/[^/]+$/, 'src/pages/ProjectDetail.tsx'],
  [/^\/contacto$/, 'src/pages/Contact.tsx'],
];

export type Manifest = Record<string, { file: string; imports?: string[]; isEntry?: boolean; assets?: string[] }>;

/** <link rel="modulepreload"> for a route's chunk and the shared chunks it imports, so it downloads alongside the entry instead of after it. */
export function routePreloads(manifest: Manifest | null, pathname: string, status: number) {
  if (!manifest) return '';
  const p = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  const source = ROUTE_MODULES.find(([re]) => re.test(p))?.[1] ?? (status === 404 ? 'src/pages/NotFound.tsx' : null);
  if (!source) return '';
  const files = new Set<string>();
  const walk = (key: string) => {
    const chunk = manifest[key];
    if (!chunk || chunk.isEntry || files.has(chunk.file)) return;
    files.add(chunk.file);
    chunk.imports?.forEach(walk);
  };
  walk(source);
  return [...files].map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`).join('\n    ');
}

/** The two faces every page paints above the fold: Archivo (headings) and Plex Sans 400 (body), Latin subset. */
const CRITICAL_FONTS = [/\/archivo-latin-wdth-normal-[^/]+\.woff2$/, /\/ibm-plex-sans-latin-400-normal-[^/]+\.woff2$/];

/**
 * <link rel="preload"> for the critical fonts, so they arrive with the CSS instead of after it.
 * Without this the headline repaints late when Archivo lands, which moved LCP by ~0.6 s.
 */
export function fontPreloads(manifest: Manifest | null) {
  if (!manifest) return '';
  const assets = new Set(Object.values(manifest).flatMap((c) => c.assets ?? []));
  return [...assets]
    .filter((a) => CRITICAL_FONTS.some((re) => re.test('/' + a)))
    .map((a) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="/${a}" />`)
    .join('\n    ');
}
