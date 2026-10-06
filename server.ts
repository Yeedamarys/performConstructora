import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import { renderHead, routeMeta } from "./src/seo/meta";

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;

/** Put the requested route's title, description, canonical, social and JSON-LD tags in the HTML. */
function renderPage(template: string, url: string) {
  const pathname = new URL(url, "http://localhost").pathname;
  const meta = routeMeta(pathname);
  const html = template.replace(SEO_BLOCK, `<!--seo:start-->\n    ${renderHead(meta, pathname)}\n    <!--seo:end-->`);
  return { status: meta.status, html };
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
        const { status, html } = renderPage(template, req.originalUrl);
        res.status(status).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // index: false so "/" also goes through renderPage instead of the raw file.
    app.use(express.static(distPath, { index: false }));
    const template = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
    // SPA fallback with real per-route meta and a real 404 status for unknown URLs.
    app.get("*", (req, res) => {
      const { status, html } = renderPage(template, req.originalUrl);
      res.status(status).type("html").send(html);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
