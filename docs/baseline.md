# Baseline Lighthouse (móvil)

- **Fecha:** 2026-10-06
- **Rama / commit:** `mejora/rediseno-2026` @ `9af79c5`
- **Entorno:** build de producción (`npm run build`), servido con `NODE_ENV=production node dist/server.cjs` en `http://localhost:4173`
- **Herramienta:** Lighthouse 13.4.1 (Chrome DevTools MCP) para SEO/Accesibilidad/Buenas prácticas; Lighthouse CLI 13.5.0 para Performance, LCP, CLS y TBT (la auditoría de DevTools MCP no incluye Performance)
- **Perfil:** móvil por defecto de Lighthouse (Moto G Power emulado, 4G lento simulado, CPU 4×)
- **Método:** 3 pasadas de Performance por URL; se reporta la pasada con la puntuación mediana

| Página | Performance | SEO | Accesibilidad | Buenas prácticas | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 53 | 100 | 100 | 100 | 7.7 s | 0 | 536 ms |
| `/servicios` | 65 | 100 | 98 | 100 | 7.7 s | 0 | 163 ms |
| `/proyectos/anclaje-talud-museo-yaku` | 45 | 100 | 98 | 100 | 7.6 s | 0 | 968 ms |

## Variación entre pasadas

| Página | Performance (3 pasadas) | LCP | TBT |
|---|---|---|---|
| `/` | 53 · 66 · 53 | 5.7 · 7.8 · 7.7 s | 660 · 116 · 536 ms |
| `/servicios` | 65 · 64 · 67 | 7.7 · 7.9 · 7.7 s | 163 · 171 · 73 ms |
| `/proyectos/anclaje-talud-museo-yaku` | 67 · 45 · 45 | 7.7 · 7.7 · 7.6 s | 89 · 973 · 968 ms |

El TBT varía mucho entre pasadas; LCP y CLS son estables.

> **Nota sobre el entorno.** El Express local no comprime: el JS principal viaja con 528 KB sin comprimir. En producción (`perforconstrucciones.com`, detrás del CDN de Hostinger) se sirve con brotli: ~190 KB para el mismo `index-L190lvru.js`. Por eso el LCP real en producción probablemente es menor que el medido aquí. Sí aplican en ambos entornos: `Cache-Control: public, max-age=0` en los assets con hash y el render 100 % en cliente (`<div id="root"></div>` vacío).

## Hallazgos principales

**Performance**
- **LCP ~7.7 s en las tres páginas** (FCP ~3.8 s): este es el principal problema.
- **JavaScript no usado:** ~300 KiB por página. El bundle principal ocupa 540 KB y el chunk `HeroScene` (three.js) 932 KB minificados.
- **Imágenes:** se pueden ahorrar entre 305 y 565 KiB con formatos y tamaños adecuados.
- **Recursos que bloquean el render:** ~300 ms.
- **Trabajo en el hilo principal:** 2.4 s en `/` y 3.6 s en el proyecto.
- **CLS = 0** en todas las páginas.

**Accesibilidad**
- `label-content-name-mismatch` en todas las páginas: el `aria-label` no coincide con el texto visible en el logo (`aria-label="Perfo Construcciones"`) ni en el botón flotante de WhatsApp.
- `heading-order` en `/servicios` y en el proyecto: hay un `<h4>` sin un nivel intermedio antes.

Los reportes completos (JSON/HTML) se generaron en un directorio temporal y no están versionados.

---

# Fase de rendimiento: antes y después

- **Fecha:** 2026-10-06 (sin commit todavía; parte de `9af79c5`)
- **Cambios:**
  - División del código por ruta con precarga del chunk de cada ruta desde el servidor y precarga en reposo del resto.
  - `HeroScene` se carga en diferido, con la foto como respaldo.
  - Logo y favicons redimensionados; `q_auto:eco` y `sizes` ajustados en Cloudinary.
  - Compresión gzip/brotli y `Cache-Control` en `server.ts`.
  - Auditoría: A3, A4, M1, M2 y M3.
- **Método:** el mismo que el baseline. Servidor local de producción y Lighthouse CLI 13.5.0, con 3 pasadas por URL y perfil, reportando la pasada mediana. El "antes" de móvil es la tabla de arriba. El "antes" de escritorio se midió en el mismo commit, justo antes de aplicar los cambios.

## Móvil

| Página | Performance | LCP | TBT | CLS | FCP | Peso total | JS transferido |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | 53 → **77** | 7.7 → **3.3 s** | 536 → 597 ms | 0 → 0 | 3.8 → 1.7 s | 1488 → **700 KB** | 528 → **174 KB** |
| `/servicios` | 65 → **94** | 7.7 → **2.7 s** | 163 → **46 ms** | 0 → 0 | 3.8 → 2.1 s | 1617 → **791 KB** | 528 → **174 KB** |
| `/proyectos/anclaje-talud-museo-yaku` | 45 → **84** | 7.6 → **4.1 s** | 968 → **19 ms** | 0 → 0 | 3.8 → 2.2 s | 1189 → **443 KB** | 528 → **174 KB** |

SEO, Accesibilidad y Buenas prácticas no cambian (100 / 98–100 / 100).

## Escritorio

| Página | Performance | LCP | TBT | CLS | Peso total |
|---|---:|---:|---:|---:|---:|
| `/` | 94 → **96** | 1.5 → **0.8 s** | 51 → 154 ms | 0 → 0 | 1488 → **701 KB** |
| `/servicios` | 93 → **100** | 1.7 → **0.6 s** | 0 → 0 ms | 0 → 0 | 1617 → **791 KB** |
| `/proyectos/anclaje-talud-museo-yaku` | 94 → **98** | 1.6 → **1.1 s** | 0 → 0 ms | 0 → 0 | 1356 → **569 KB** |

## Qué queda

- **TBT de la home (móvil):** 582–1309 ms entre pasadas. En otra tanda de 3 pasadas, la home dio 78–87 de Performance. El coste está en ejecutar el bundle principal (React + `motion`) y las animaciones de la home, no en la red → auditoría **A5** (`LazyMotion`).
- **LCP de la ficha de proyecto (móvil, 4.1 s):** el LCP es `p1f1.png`, unos 170 KB a 800 px incluso con `q_auto:eco`. La foto es grande y con mucho detalle. Mejoraría con un recorte o un ancho menor para móvil y, sobre todo, con prerender (auditoría **A2**).
- **Ruta 3D del hero:** Lighthouse no la mide, porque su Chrome headless tiene activado "reducir movimiento". Se verificó a mano en escritorio: el LCP es la foto de respaldo (196 ms en local), y `HeroScene` empieza a descargarse después del evento `load`.
- **Producción:** el CDN de Hostinger ya comprimía con brotli, así que en producción el ahorro de JS es menor que el de esta tabla. Ahí lo que suma es la caché `immutable`, el código dividido por ruta y las imágenes.

---

# Prerender estático (2026-10-06)

Cada URL del sitemap se sirve ya renderizada: el contenido, el título, la meta y el JSON-LD van en el HTML, y React hidrata ese HTML. Comprobación rápida con 1 pasada móvil por URL (orientativa, no es mediana):

| Página | Performance | LCP | TBT | CLS | SEO |
|---|---:|---:|---:|---:|---:|
| `/` | 75 | 2.7 s | 859 ms | 0 | 100 |
| `/servicios` | 91 | 3.1 s | 85 ms | 0 | 100 |
| `/proyectos/anclaje-talud-museo-yaku` | 87 | 3.6 s | 96 ms | 0 | 100 |

No hay regresiones respecto a la fase de rendimiento: CLS sigue en 0 y Performance está en el mismo rango. La ganancia principal es de SEO: el HTML ya lleva el contenido sin ejecutar JS (~220 palabras en `/servicios/pilotaje-barrenado`). El TBT de la home sigue pendiente de **A5**.
