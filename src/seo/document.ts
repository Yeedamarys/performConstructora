import { renderHead, routeMeta } from './meta';
import { fontPreloads, routePreloads, type Manifest } from './preload';

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const ROOT = '<div id="root"></div>';

/**
 * The full HTML for a route: index.html with that route's title, meta, canonical, JSON-LD and
 * chunk preloads, and (when prerendering) the rendered app inside #root.
 * Used by scripts/prerender.mjs at build time and by server.ts for URLs that were not prerendered.
 */
export function renderDocument(template: string, url: string, manifest: Manifest | null, appHtml = '') {
  const pathname = new URL(url, 'http://localhost').pathname;
  const meta = routeMeta(pathname);
  const head = [renderHead(meta, pathname), fontPreloads(manifest), routePreloads(manifest, pathname, meta.status)].filter(Boolean).join('\n    ');
  const html = template
    .replace(SEO_BLOCK, () => `<!--seo:start-->\n    ${head}\n    <!--seo:end-->`)
    .replace(ROOT, () => `<div id="root">${appHtml}</div>`);
  return { status: meta.status, html };
}
