# Auditoría y Análisis SEO - Perforconstrucciones

Este documento detalla la estructura SEO (Search Engine Optimization) implementada en el proyecto web de **Perforconstrucciones**, asegurando el cumplimiento de las mejores prácticas de Google para indexación, rendimiento y relevancia semántica.

---

## 1. Meta Etiquetas y Nomenclatura Oficial (On-Page SEO)

Se ha establecido un estándar de nomenclatura para evitar penalizaciones por inconsistencia. El nombre principal para los motores de búsqueda es **Perforconstrucciones**, respaldado por las variantes **Perfo Construcciones** y **M&V PERFOR' CONSTRUCCIONES**.

### 1.1 Etiquetas Globales (index.html & Seo.tsx)
La página principal (Home) ha sido optimizada con las siguientes etiquetas dinámicas:

- **Etiqueta `<title>`:** 
  `Perforconstrucciones (Perfo Construcciones) | Pilotaje y Estabilización de Taludes en Quito`
  *Análisis:* Tiene la longitud perfecta. Incluye la variante de marca y las dos palabras clave comerciales más fuertes ("Pilotaje" y "Estabilización de Taludes"), geolocalizando inmediatamente el negocio en "Quito".

- **Etiqueta `<meta name="description">`:**
  `Perforconstrucciones ofrece pilotaje barrenado y prebarrenado, hincado de pilotes, anclajes para muros pantalla y estabilización de taludes en Quito y todo el Ecuador.`
  *Análisis:* Redactada como un "Elevator Pitch" técnico. Engloba el catálogo completo de servicios para que Google relacione la marca con búsquedas de alto valor técnico.

- **Datos Estructurados (Schema Markup / JSON-LD):**
  El archivo `index.html` incluye un script oculto de Schema.org configurado como `ProfessionalService`. Esto le "habla" directamente al robot de Google en su propio idioma, indicándole:
  - Nombre oficial.
  - Teléfono directo.
  - Dirección física y país de operación.
  - Catálogo de ofertas (Pilotaje, Hincado, Anclajes).

---

## 2. Jerarquía de Encabezados (H1, H2, H3)

La estructura de encabezados (Headings) guía a los motores de búsqueda sobre la importancia del contenido de cada página. 

### Inicio (`Home.tsx`)
- **H1:** `PERFORCONSTRUCCIONES MOLINA & VILLAFUERTE`
  *Optimizado:* El nombre de la marca es el título absoluto de la portada.
- **H2:** `INGENIERÍA DE SUELOS & PERFORACIÓN PROFUNDA`
  *Optimizado:* Refuerza la especialidad técnica del negocio.
- **H3:** (Asignados a cada servicio en la cuadrícula inferior, ej. "Pilotaje Prebarrenado CFA").

### Servicios (`Services.tsx`)
- **H1:** `SERVICIOS DE INGENIERÍA GEOTÉCNICA`
- **H2:** Múltiples etiquetas H2 dinámicas por cada servicio (`Pilotaje Barrenado`, `Estabilización de Taludes`, etc.)
  *Análisis:* Esta estructura convierte la página de servicios en una "mina de oro" para SEO, ya que cada servicio principal tiene su propio H2, dándole un peso enorme al momento en que un cliente busca ese servicio específico en Google.

### Nosotros (`About.tsx`)
- **H1:** `¿QUIÉNES SOMOS?`
- **H2:** `Perforconstrucciones (M&V PERFOR' CONSTRUCCIONES) fue creada para desarrollar...`
- **H2:** `Misión y Visión`
- **H2:** `Ventajas Competitivas Certificadas`
  *Análisis:* Se insertó orgánicamente la palabra clave del negocio en el primer H2 para aumentar la relevancia semántica de la historia corporativa.

### Proyectos y Contacto
- Utilizan encabezados H1 claros como `RESPALDO Y EXPERIENCIA COMPROBADA` y `CONTACTO DE OPERACIONES`, respectivamente.

---

## 3. Optimización de Imágenes (Alt Texts y Cloudinary)

Google no "ve" imágenes, solo lee código. Por ende:
- **Logo principal:** El atributo `alt` del logotipo en la barra de navegación es estrictamente `alt="Perforconstrucciones - Perfo Construcciones"`.
- **Rendimiento (Core Web Vitals):** Todas las imágenes del portafolio fueron migradas a la nube (**Cloudinary**). Esto no solo vació el peso del servidor local, sino que se inyectaron los parámetros `f_auto,q_auto` en el código. Esto fuerza a la web a entregar imágenes en formato de última generación (WebP/AVIF), lo que disminuye el tiempo de carga drásticamente. Un tiempo de carga veloz es un factor de ranking directo en Google.

---

## 4. Estructura de Enlaces y UX (Factores SEO Indirectos)

El SEO moderno también evalúa cómo interactúan los usuarios con la web:
- **Navegación Responsiva:** Se implementó un menú de "hamburguesa" optimizado para móviles (Mobile-First Indexing). Google castiga severamente las webs que no se adaptan al móvil.
- **Formulario AJAX:** El envío de cotizaciones desde la sección de contacto no recarga la página. Mantiene al usuario en la web, lo cual reduce la Tasa de Rebote (Bounce Rate).
- **Botones Click-to-Call:** Los botones de "Llamar Urgencia Geotécnica" utilizan el protocolo `tel:`, facilitando la conversión inmediata desde celulares.
- **Footer Semántico:** El pie de página repite el nombre oficial, el RUC y la ciudad, inyectando un componente de SEO local en absolutamente todas las URLs del sitio.

---

## Recomendación Final para Despliegue
Para materializar este impecable trabajo de código en visitantes reales, es imperativo que, en cuanto el dominio sea público, se ejecuten estas dos acciones fuera del código:
1. Crear el **Google Business Profile** (Ficha de Google Mi Negocio) con el nombre exacto *"Perforconstrucciones"*.
2. Dar de alta la propiedad en **Google Search Console** y enviar el Sitemap para forzar una indexación exprés.
