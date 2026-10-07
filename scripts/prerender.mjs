/**
 * Static prerender, run after `vite build` and `vite build --ssr` (see the "build" script).
 * Renders every URL in public/sitemap.xml, plus the 404 page, into dist/.prerender/:
 *   /                     -> dist/.prerender/index.html
 *   /servicios/x          -> dist/.prerender/servicios/x/index.html
 *   (unknown URLs)        -> dist/.prerender/404.html
 * Each file carries the route's title, meta, canonical, JSON-LD, chunk preloads and markup.
 * server.ts serves them; the dot folder keeps express.static from exposing them twice.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const out = path.join(dist, '.prerender');

const { render, renderDocument } = await import(pathToFileURL(path.join(dist, '.ssr', 'entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite', 'manifest.json'), 'utf8'));

const sitemap = fs.readFileSync(path.join(root, 'public', 'sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(([, loc]) => new URL(loc).pathname);
if (routes.length === 0) throw new Error('prerender: no <loc> entries in public/sitemap.xml');

fs.rmSync(out, { recursive: true, force: true });

const targets = [...routes.map((route) => [route, route === '/' ? 'index.html' : path.join(route, 'index.html')]), ['/404', '404.html']];

for (const [url, file] of targets) {
  const { status, html } = renderDocument(template, url, manifest, await render(url));
  const expected = url === '/404' ? 404 : 200;
  if (status !== expected) throw new Error(`prerender: ${url} resolved to status ${status}, expected ${expected}`);
  const dest = path.join(out, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  console.log(`prerender  ${url.padEnd(48)} ${(Buffer.byteLength(html) / 1024).toFixed(1)} kB`);
}
console.log(`prerender  ${targets.length} pages -> dist/.prerender`);
