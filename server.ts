import compression from "compression";
import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import { renderDocument } from "./src/seo/document";
import type { Manifest } from "./src/seo/preload";

/** HTML carries per-route meta and points at the current hashes: always revalidate. */
const CACHE_HTML = "no-cache";

/** Same normalisation as routeMeta(): no trailing slash, lowercase. */
const normalize = (pathname: string) => pathname.replace(/\/+$/, "").toLowerCase() || "/";

/** Every page scripts/prerender.mjs wrote, keyed by route ("/", "/servicios/x", …) plus "404". */
function loadPrerendered(dir: string) {
  const pages = new Map<string, string>();
  if (!fs.existsSync(dir)) return pages;
  const walk = (sub: string) => {
    for (const entry of fs.readdirSync(path.join(dir, sub), { withFileTypes: true })) {
      const rel = path.posix.join(sub, entry.name);
      if (entry.isDirectory()) walk(rel);
      else if (rel === "404.html") pages.set("404", fs.readFileSync(path.join(dir, rel), "utf-8"));
      else if (entry.name === "index.html") pages.set(normalize(`/${sub}`), fs.readFileSync(path.join(dir, rel), "utf-8"));
    }
  };
  walk("");
  return pages;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // One canonical host: www → apex (301), so the site is never served twice.
  app.use((req, res, next) => {
    const host = req.headers.host ?? "";
    if (host.startsWith("www.")) {
      return res.redirect(301, `https://${host.slice(4)}${req.originalUrl}`);
    }
    next();
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  if (process.env.NODE_ENV !== "production") {
    // Development: Vite serves assets; we render index.html ourselves to inject route meta.
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      try {
        const raw = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        const template = await vite.transformIndexHtml(req.originalUrl, raw);
        const { status, html } = renderDocument(template, req.originalUrl, null);
        res.status(status).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // gzip/brotli for HTML, JS, CSS, JSON, SVG… (images are already compressed and are skipped).
    app.use(compression());
    // Hashed bundles: cache for a year. fallthrough: false so a stale hash 404s instead of getting HTML.
    app.use("/assets", express.static(path.join(distPath, "assets"), { immutable: true, maxAge: "1y", fallthrough: false }));
    // Icons, robots, sitemap…: unhashed, so a day. index: false so "/" is served by the handler below.
    // Build internals in dot folders (.prerender, .ssr, .vite) are never served as files; those URLs fall through to the 404 page.
    app.use(express.static(distPath, { index: false, maxAge: "1d", dotfiles: "ignore" }));
    const template = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
    const manifestPath = path.join(distPath, ".vite", "manifest.json");
    const manifest: Manifest | null = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf-8")) : null;
    const prerendered = loadPrerendered(path.join(distPath, ".prerender"));
    app.get("*", (req, res) => {
      res.set("Cache-Control", CACHE_HTML).type("html");
      // Prerendered HTML (content, meta and JSON-LD in the markup) for every sitemap route.
      const page = prerendered.get(normalize(req.path));
      if (page) return res.status(200).send(page);
      // Anything else: per-route meta on the empty shell; unknown URLs get the prerendered 404 page.
      const { status, html } = renderDocument(template, req.originalUrl, manifest);
      if (status === 404 && prerendered.has("404")) return res.status(404).send(prerendered.get("404"));
      res.status(status).send(html);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
