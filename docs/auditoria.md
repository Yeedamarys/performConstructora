# Auditoría del sitio

- **Fecha:** 2026-10-06
- **Rama / commit:** `mejora/rediseno-2026` @ `9af79c5`
- **Alcance:** SEO (técnico, on-page, contenido), diseño/UX de `src/pages` y `src/components`, bundle y carga inicial
- **Métricas de partida:** ver [`baseline.md`](baseline.md)
- **Palabras clave objetivo:** pilotaje, pilotajes, pilotes, pilotaje barrenado, prebarrenado, vibrohincado, anclajes, inyección lechada, perforaciones, perforación, perforación de suelo, perforación de roca, taludes, taludes en Quito, estabilización taludes, estabilizadores

## Cómo usar esta lista

Cada fase toma los hallazgos por ID, los resuelve y marca la casilla. Si un hallazgo se descarta o cambia de prioridad, se anota junto a él en vez de borrarlo. Al cerrar una fase se repiten las auditorías de `baseline.md` para medir el efecto.

Áreas: **SEO** · **Perf** (rendimiento) · **UX** (diseño/interacción) · **A11y** (accesibilidad) · **Contenido**

---

## Prioridad alta

Bloquean el posicionamiento, la conversión o el LCP.

- [x] **A1 · SEO — El nombre de la marca no es consistente ("Perfo" / "Perfor")**
  - **Evidencia:** `BRAND = 'Perfo Construcciones'` (`src/seo/meta.ts:11`) se usa en todos los `<title>`, en `og:site_name` y en el JSON-LD (`index.html`). Los `title` de `src/data/projects.ts` dicen "Perfo". El H1 de la home, el logo y el dominio dicen "Perfor".
  - **Arreglo:** decidir un único nombre y aplicarlo en `BRAND`, `projects.ts`, el JSON-LD `name` y el `aria-label` del logo (`Navbar.tsx:38`).
  - **Estado:** Hecho 2026-10-06 (fase AI SEO): nombre oficial "Perfor Construcciones" en `BRAND`, títulos, JSON-LD, manifest, About, Navbar y proyectos.

- [x] **A2 · SEO/Perf — El HTML llega vacío y todo el contenido se pinta en el navegador**
  - **Evidencia:** el servidor responde `<body><div id="root"></div></body>` en todas las rutas. Los crawlers que no ejecutan JS (Bing parcialmente, vistas previas sociales, GPTBot, PerplexityBot, ClaudeBot) solo ven los meta. Es la causa principal del LCP de ~7.7 s.
  - **Arreglo:** prerenderizar en el build las 15 rutas conocidas (estáticas + servicios + proyectos), o usar `renderToString` en `server.ts`.
  - **Estado:** Hecho 2026-10-06: `npm run build` hace `vite build --ssr src/entry-server.tsx` y `scripts/prerender.mjs` genera `dist/.prerender/` con las 17 URLs del sitemap + `404.html` (título, meta, canonical, JSON-LD, `modulepreload` y contenido en `#root`). `server.ts` los sirve; el cliente usa `hydrateRoot`. Verificado con curl (sin JS) y sin errores de hidratación en las 7 plantillas de página. Si se añade una ruta, hay que añadirla al sitemap para que se prerenderice.

- [x] **A3 · Perf — El logo de 2780 px se descarga 3 veces (~330 KB)**
  - **Evidencia:** `public/logo-mark.png`, `public/favicon.png` y `public/favicon.ico` son el mismo PNG de 110 KB. Se muestra a 82 px (`Navbar.tsx:10`). El JSON-LD lo declara de 512×512.
  - **Arreglo:** generar `favicon.ico` (16/32/48), `favicon.png` de 32 px, `apple-touch-icon` de 180 px y un logo de ~200 px en WebP/PNG optimizado. Corregir las dimensiones en el JSON-LD.
  - **Estado:** Hecho 2026-10-06: `logo-mark.png` 512×512 (10 KB), `icon-192.png`, `favicon.png` 32 px, `favicon.ico` 16/32/48, `apple-touch-icon` 180 px y `logo-nav.webp` 288 px (11 KB) para la barra de navegación.

- [x] **A4 · Perf — Los assets con hash no se cachean en el navegador**
  - **Evidencia:** en producción (`perforconstrucciones.com`, CDN de Hostinger) `/assets/index-*.js` se sirve con `Cache-Control: public, max-age=0`. Viene de `express.static(distPath, { index: false })` en `server.ts`.
  - **Arreglo:** `Cache-Control: public, max-age=31536000, immutable` para `/assets/*`. Mantener `no-cache` para el HTML.
  - **Estado:** Hecho 2026-10-06: `compression()` (brotli/gzip); `/assets` con `max-age=31536000, immutable` y 404 si no existe; resto de `public/` 1 día; HTML `no-cache`.

- [ ] **A5 · Perf — `motion` pesa 142 KB del bundle inicial (27 %)**
  - **Evidencia:** source-map-explorer sobre `index-*.js`: `motion-dom` 95.7 KB + `framer-motion` 46.7 KB.
  - **Arreglo:** usar `LazyMotion` + `m` + `domAnimation` (ahorro estimado de ~100 KB), o CSS para las entradas simples.

- [ ] **A6 · Contenido/SEO — Poco contenido en servicios y proyectos**
  - **Evidencia:** las páginas de servicio tienen entre 97 y 183 palabras. Las fichas de proyecto tienen 46–50 palabras (una frase en `desc`).
  - **Arreglo:** servicios con 600+ palabras (proceso, maquinaria, tipos de suelo en Quito, normas, FAQ). Proyectos con problema, solución, cantidades y fotos.
  - **Estado:** Parcial 2026-10-06: las 5 páginas de servicio pasan de ~100–180 a 600–750 palabras (definición, cuándo se usa, proceso, FAQ con datos y proyectos reales). Pendiente: fichas de proyecto (~50 palabras).

- [x] **A7 · SEO — No hay página que responda a "perforación de suelo / roca"**
  - **Evidencia:** "perforación de suelo/roca" y "perforaciones" no tienen URL propia.
  - **Arreglo:** crear `/servicios/perforacion-suelo-roca` (con su entrada en `servicesData`, sitemap y menú).
  - **Estado:** Hecho 2026-10-06 (fase AI SEO): nueva `/servicios/perforacion-suelo-roca` (datos, sitemap, menú, footer, prerender, JSON-LD).

- [x] **A8 · SEO — "prebarrenado" no aparece en la página de pilotaje**
  - **Evidencia:** la palabra solo aparece en la home y en el footer ("Pilotaje Prebarrenado CFA"). El H1 y el título de `/servicios/pilotaje-barrenado` no la incluyen.
  - **Arreglo:** título "Pilotaje Barrenado y Prebarrenado CFA en Quito", con un H1 y contenido alineados.
  - **Estado:** Hecho 2026-10-06 (fase AI SEO): título "Pilotaje Barrenado y Prebarrenado CFA en Quito", H1 y definición con "prebarrenado".

- [ ] **A9 · UX/A11y — Botón de usuario sin función**
  - **Evidencia:** `Navbar.tsx:106`. Es un `<button>` con icono `User`, sin `onClick`, sin enlace y sin `aria-label` (visible en escritorio).
  - **Arreglo:** quitarlo, o darle un destino real con una etiqueta accesible.

- [ ] **A10 · UX — El teléfono del header no se puede pulsar**
  - **Evidencia:** `Navbar.tsx:98`. El número es un `<div>`, no un enlace `tel:`.
  - **Arreglo:** `<a href="tel:+593959564486">`.

## Prioridad media

Afectan a la calidad, a la confianza o a métricas secundarias.

- [x] **M1 · Perf — Todas las páginas van en el bundle inicial (~85 KB)**
  - **Evidencia:** imports estáticos en `src/App.tsx`. About 17.8 KB, Contact 14.7 KB, Projects 8.2 KB, ServiceDetail 7.5 KB…
  - **Arreglo:** `lazy()` por ruta, salvo Home (ahorro estimado de ~60 KB en la carga inicial).
  - **Estado:** Hecho 2026-10-06: `lazy()` por ruta (Home sigue en el bundle principal); el servidor añade `modulepreload` del chunk de la ruta; el resto se precarga en reposo. Bundle principal: 540 → 468 KB (149 KB gzip).

- [x] **M2 · Perf — Imágenes de tarjetas sobredimensionadas**
  - **Evidencia:** la home pide `w_800` (110–165 KB cada una) para huecos de ~380 px. Lighthouse estima un ahorro de 305–565 KiB por página.
  - **Arreglo:** `srcset`/`sizes` con los helpers de `src/seo/cloudinary.ts`. Revisar también `p1f1.png` (274 KB, LCP de la ficha del Museo Yaku).
  - **Estado:** Hecho 2026-10-06: `q_auto:eco` en `cld()` (~14 % menos); paso de 640 px en `cldSrcSet`; `sizes` ajustados en Home, Services, ServiceDetail, Projects y ProjectDetail. Pendiente: `p1f1.png` sigue siendo el LCP de su ficha (~170 KB).

- [x] **M3 · Perf — `HeroScene` pesa 932 KB (~251 KB gzip) en equipos capaces**
  - **Evidencia:** `three` 727 KB + `@react-three/fiber` 164 KB. Se carga en diferido. Lighthouse móvil no lo carga (gama baja simulada), pero escritorio y móviles de gama media/alta sí.
  - **Arreglo:** cargarlo solo tras la primera interacción o en `requestIdleCallback`, y medir el LCP en escritorio.
  - **Estado:** Hecho 2026-10-06: `HeroScene` se descarga después de `load` + reposo (o al primer scroll o toque); la foto real hace de respaldo y de LCP, y se desvanece cuando la escena está lista.

- [ ] **M4 · UX/Confianza — La foto del hero es genérica**
  - **Evidencia:** la imagen de la home (`home.png`) parece de stock o generada: maquinaria y estructuras que no se ven ecuatorianas. Las fichas de proyecto tienen fotos reales de obra.
  - **Arreglo:** usar una foto real de obra propia, por ejemplo la del Museo Yaku.

- [ ] **M5 · UX/A11y — Texto justificado sin guionado**
  - **Evidencia:** 20 usos de `text-justify` (About 11, Home 3, Services 2, Contact 2, ServiceDetail 1, Projects 1). En móvil deja huecos grandes entre palabras.
  - **Arreglo:** `text-left`, o como mínimo `hyphens: auto` con `lang="es"`.

- [ ] **M6 · SEO — Datos de relleno en el schema de la organización**
  - **Evidencia:** en `index.html`, `sameAs` apunta a `https://www.facebook.com/`, `https://www.instagram.com/` y `https://www.linkedin.com/` (raíces, no perfiles).
  - **Arreglo:** poner las URLs reales de los perfiles o quitar `sameAs`. Añadir `geo` (lat/long) y `hasMap`.
  - **Estado:** Parcial 2026-10-06: eliminado `sameAs` con URLs de relleno. Pendiente: URLs reales de perfiles, `geo` y `hasMap`.

- [ ] **M7 · A11y — Texto funcional de 10 px y placeholders con poco contraste**
  - **Evidencia:** etiquetas, "Ver servicio", datos de fichas y cifras de `/proyectos` a 10 px (28 casos en `/proyectos`). Placeholders del formulario de contacto con contraste 3.2:1 (`#888b90` sobre `#f7f9ff`).
  - **Arreglo:** mínimo 11–12 px para texto funcional. Placeholders con contraste ≥ 4.5:1.

- [x] **M8 · A11y — Orden de encabezados roto**
  - **Evidencia:** en el footer, un `<h4>` "Servicios especializados" viene después de un `<h2>` en todas las páginas (Lighthouse `heading-order`).
  - **Arreglo:** cambiarlo por un `<h2>` o un `<p>` con estilo de encabezado.
  - **Estado:** Hecho 2026-10-06 (fase AI SEO): los `<h4>` del footer pasan a `<h2>`.

- [x] **M9 · A11y — El nombre accesible no coincide con el texto visible**
  - **Evidencia:** Lighthouse `label-content-name-mismatch`. El logo tiene `aria-label="Perfo Construcciones"` pero muestra "Perfor". El botón de WhatsApp tiene `aria-label="Cotiza ahora por WhatsApp"` pero muestra "¡Cotiza ahora!".
  - **Arreglo:** que el `aria-label` empiece por el texto visible. Se resuelve en parte con A1.
  - **Estado:** Hecho 2026-10-06 (fase AI SEO): el logo dice "Perfor Construcciones" en `aria-label` y texto. Falta revisar el botón de WhatsApp.

- [ ] **M10 · UX — Header de 156 px de alto**
  - **Evidencia:** el logo apilado con el lema ocupa el 13 % de la altura de una tablet antes del contenido.
  - **Arreglo:** logo horizontal o más compacto al hacer scroll.

## Prioridad baja

Mejoras menores.

- [ ] **B1 · SEO — Variantes de URL responden 200 en vez de 301**
  - **Evidencia:** `/servicios/` y `/Servicios` devuelven 200. El canonical lo mitiga.
  - **Arreglo:** redirección 301 a la URL normalizada en `server.ts`.

- [x] **B2 · SEO — `<meta name="keywords">` sin efecto**
  - **Evidencia:** está en `index.html`. Google lo ignora.
  - **Arreglo:** eliminarlo.
  - **Estado:** Hecho 2026-10-06 (fase AI SEO): eliminado `<meta name="keywords">`.

- [ ] **B3 · SEO — Miniaturas de "Otros servicios" con `alt=""`**
  - **Evidencia:** `ServiceDetail.tsx:184`. Es correcto para accesibilidad (el enlace ya tiene texto).
  - **Arreglo (opcional):** un `alt` descriptivo para posicionar en búsqueda de imágenes.

- [x] **B4 · UX — Nombre del servicio distinto en el footer**
  - **Evidencia:** el footer dice "Pilotaje Prebarrenado CFA" y la página dice "Pilotaje Barrenado y Perforación en Suelo".
  - **Arreglo:** unificar al resolver A8.
  - **Estado:** Hecho 2026-10-06 (fase AI SEO): footer: "Pilotaje barrenado y prebarrenado CFA", igual que la página.

- [ ] **B5 · UX — Enlaces del footer de 20 px de alto**
  - **Evidencia:** los cuatro enlaces de servicios miden 20 px de alto a 375 px de ancho.
  - **Arreglo:** padding vertical para llegar a ≥ 24 px (idealmente 44 px).

- [ ] **B6 · UX — Sin CTA "Cotizar" en el header entre 768 y 1023 px**
  - **Evidencia:** la navegación aparece en `md` pero el bloque de teléfono + CTA solo en `lg` (`Navbar.tsx:97`). Queda el botón flotante de WhatsApp.
  - **Arreglo:** mostrar el CTA compacto desde `md`.

## Pendiente de definir

- [ ] **P2 · Contenido — Norma "CE.020" en estabilización de taludes**
  - **Situación:** las especificaciones de `/servicios/estabilizacion-taludes` citan "Norma CE.020". Por lo que sé, CE.020 ("Suelos y Taludes") es del Reglamento Nacional de Edificaciones de **Perú**, no de Ecuador. No se repite en el contenido nuevo.
  - **Siguiente paso:** confirmar con el cliente qué norma aplica (¿NEC-SE-GC?) y corregir `services.ts` y el menú.

- [x] **P1 · SEO — Palabra clave "estabilizadores"**
  - **Situación:** 0 menciones en el sitio y no está claro a qué servicio corresponde (¿de suelo, de taludes, equipos?).
  - **Siguiente paso:** confirmarlo con el cliente antes de asignarle una página.
  - **Estado:** Resuelto 2026-10-06: "estabilizadores" = estabilización de taludes; se usa en la FAQ y en `alternateName` de esa página.

## Descartados

- **Contenedores que recortan su contenido** (detector de impeccable, entre 16 y 53 por página): son tarjetas de imagen con capas superpuestas a propósito. No es un defecto.

## Mapa de palabras clave → URL

| Palabras clave | URL objetivo | Estado |
|---|---|---|
| pilotaje, pilotajes, pilotes, pilotaje barrenado, prebarrenado | `/servicios/pilotaje-barrenado` | Falta "prebarrenado" (A8) |
| vibrohincado | `/servicios/hincado-vibrohincado-pilotes` | Cubierto |
| anclajes, inyección lechada | `/servicios/anclajes-muros-pantalla` | Contenido escaso (A6) |
| taludes, taludes en Quito, estabilización taludes | `/servicios/estabilizacion-taludes` | Falta contenido local de Quito (A6) |
| perforaciones, perforación, perforación de suelo, perforación de roca | `/servicios/perforacion-suelo-roca` | No existe (A7) |
| estabilizadores | — | Pendiente (P1) |

## Fases propuestas

1. **Arreglos rápidos:** A1, A3, A4, A9, A10, M6, M8, M9, B2
2. **Rendimiento:** A2, A5, M1, M2, M3
3. **Contenido y SEO on-page:** A6, A7, A8, P1, B3, B4
4. **Pulido visual y accesibilidad:** M4, M5, M7, M10, B1, B5, B6

---

## Fase de rediseño y prueba de estrés (2026-10-06)

### Hecho
- **Home rediseñada**, estilo "plano técnico":
  - Tipografía autoalojada: Archivo, IBM Plex Sans e IBM Plex Mono (solo para medidas).
  - Marcas de registro en las esquinas y reglas de medida que se dibujan al entrar cada sección.
  - Fotos con barrido de entrada y giro 3D ligado al scroll.
  - Los 5 servicios con sus medidas, 3 proyectos destacados y un cierre de cotización con enlace `tel:`.
  - H1, H2, textos y alt no cambian.
- **Pulido de `/servicios`:**
  - Eliminado el `<main>` anidado.
  - Anillo de foco visible.
  - "Ver servicio" alineado al pie de cada tarjeta.
  - Texto funcional de 12 px y sin justificar.
  - Medidas en Plex Mono.
- **Rendimiento del rediseño:**
  - La cuadrícula de fondo usa una capa de gradiente en lugar de `mask-image`, que costaba ~500 ms de layout en móvil.
  - `text-wrap` queda solo en los títulos.
  - Preload de las dos fuentes críticas.
- **M5 / M7:** resueltos en la home y en `/servicios`. Quedan pendientes en `/proyectos`, About y Contact.

### Pendiente (prueba de estrés de tarjetas de proyecto; fixture `?data=worst|empty|one|many`, solo en desarrollo)
- [ ] **BU1 · Alta — Un proyecto sin fotos tumba la página de servicio:** `ServiceDetail.tsx:180` lee `p.images[0].src` sin comprobarlo.
- [ ] **BU2 · Alta — El título se corta en el primer `|`:** `split(' | ')[0]` en `meta.ts:148` (también afecta al `<title>` SEO), `Projects.tsx:51,215`, `ProjectDetail.tsx:26` y `Home.tsx:221`.
- [ ] **BU3 · Alta — 64 proyectos: cambiar de filtro bloquea ~31 s** (dev + CPU 4×): animaciones de layout, tilt y revelado en todas las tarjetas a la vez.
- [ ] **BU4 · Media — La misma foto en dos proyectos deja una tarjeta vacía:** `layoutId`/`key` por URL en `Projects.tsx:171,183` y `ProjectDetail.tsx:59,68`.
- [ ] **BU5 · Media — Proyecto sin fotos en `/proyectos`:** franja gris vacía de 192 px, sin mensaje.
- [ ] **BU6 · Media — No hay estado vacío,** y los filtros con (0) se pueden pulsar.
- [ ] **BU7 · Media — Fila cliente/fecha:** el icono se encoge a 9 px, la fecha se parte ("Jun / 2026") y en móvil cliente y fecha se tocan (`Projects.tsx:222-227`, `ServiceDetail.tsx:195-197`).
- [ ] **BU8 · Baja — Con más de 2 fotos no hay indicador "+N"** (`Projects.tsx:169`).
- [ ] **F1 · Decisión — Fuentes y LCP:** en `/servicios` el LCP pasa de ~2.8 s a ~3.6 s por Archivo variable (88 KB), incluso con preload.

---

## Fase de rediseño de páginas interiores (2026-10-06)

### Hecho
- **Nosotros, Servicios, Proyectos y Contacto con el lenguaje "plano técnico" de la home:**
  - `PageIntro` común: rótulo de plano, regla de medida y H1 con su intro al lado.
  - Fotos con marco y giro 3D (`DepthImage`).
  - Fichas de especificaciones en Plex Mono.
  - Las etiquetas decorativas pasan a ser rótulos de la regla de medida, conservando su texto.
  - Ni tarjetas anidadas ni tres columnas iguales.
  - **Sin cambios:** H1, `<title>`, JSON-LD, textos y `alt` (verificado con curl sobre el HTML prerenderizado).
- **Contacto:**
  - Cabecera clara (sin franja oscura).
  - Etiquetas asociadas a sus campos (`htmlFor`).
  - Placeholders con contraste AA.
  - El formulario envía exactamente los mismos campos a FormSubmit.
- **Tarjetas de proyecto (`ProjectPlate`):** resuelven BU3 (en parte), BU5, BU6, BU7 y BU8 dentro de `/proyectos`:
  - placa "Fotos en preparación" y "+N" fotos;
  - la fila cliente/fecha no se rompe;
  - estado vacío y filtros a 0 ocultos;
  - paginación de 9 en 9;
  - `projectName()` conserva los `|` internos.
- **M5 / M7:** resueltos en las cuatro páginas (sin texto justificado ni texto funcional de 10 px).

### Pendiente
- [ ] **BU1 · Alta — Un proyecto sin fotos tumba la página de servicio:** `ServiceDetail.tsx` sigue leyendo `p.images[0].src` sin comprobarlo.
- [ ] **BU2 · Alta — El nombre se corta en el primer `|`:** usar `projectName()` en `meta.ts:148` (`<title>` SEO), `ProjectDetail.tsx:26`, `Home.tsx` y `ServiceDetail.tsx`.
- [ ] **BU3b · Media — 64 proyectos, filtro con CPU 4× (dev):** cambiar de filtro tarda ~3 s (antes ~31 s) y "Cargar más" ~5 s. Opción: desactivar el giro 3D (`useScroll`) a partir de la segunda tanda.
- [ ] **BU9 · Baja — Mensaje vacío sin categoría:** dice "en esta categoría" también cuando no hay ningún proyecto en "Todos".
- [ ] **F2 · Decisión — LCP móvil de 4.2–4.7 s en Nosotros y Proyectos:** lo limita la foto `p1f1.png` (240 KB a 800 px), que compite con las fuentes. Recomprimir o recortar esa foto, o resolver F1 (fuente Archivo estática).
- [ ] **M9 · Baja — `label-content-name-mismatch`:** sigue en todas las páginas por el botón de WhatsApp (`aria-label` distinto del texto visible).
