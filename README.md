# Auditoría SEO - Perfo Construcciones

## 1. Resumen ejecutivo

Este proyecto está orientado a posicionar a una empresa ecuatoriana especializada en ingeniería geotécnica, perforación profunda, pilotaje, anclajes y estabilización de taludes. El sitio ya cuenta con una base sólida de SEO on-page en varias páginas, pero aún existe una oportunidad importante para mejorar consistencia de marca, alcance semántico y claridad de intención de búsqueda.

La configuración SEO se centraliza en [src/components/Seo.tsx](src/components/Seo.tsx), y la portada principal se define en [src/pages/Home.tsx](src/pages/Home.tsx).

---

## 2. Estado actual del SEO

### Fortalezas detectadas

- Se utilizan títulos y descripciones dinámicas por ruta.
- Hay una segmentación clara por páginas: inicio, servicios, proyectos, nosotros e inicio de contacto.
- El contenido aborda servicios técnicos específicos del sector geotécnico.
- Se incluye geolocalización en la marca y en las descripciones: Quito, Ecuador.
- El sitio usa canonical URL para evitar duplicados semánticos.
- El contenido relevante y técnico favorece búsquedas de intención comercial y local.

### Puntos de mejora

- Existe inconsistencia de nombre comercial: "Perfo Construcciones", "Perfor Construcciones", "Perforconstrucciones" y "M&V PERFOR' CONSTRUCCIONES" aparecen en distintos puntos del proyecto. Esto puede diluir el reconocimiento de marca para Google y usuarios.
- La marca debería definirse de forma única y repetirse de forma consistente en títulos, metas, URL, footer, alt text y schema.
- La intención de búsqueda local puede fortalecerse usando más combinaciones geográficas y servicios en descripciones y H1/H2.
- Se recomienda ampliar contenido textual en páginas clave para mejorar relevancia semántica y densidad de palabras clave naturales.
- Debe revisarse la estructura de encabezados para que cada página tenga un H1 claro y H2/H3 asociados a servicios y beneficios reales.

---

## 3. Auditoría por página

### Home
Archivo: [src/pages/Home.tsx](src/pages/Home.tsx)

Lo más relevante:
- Título principal visible: "Perfo Construcciones"
- Subtítulo: "Pilotaje y Estabilización de Taludes en Quito, Ecuador"
- Incluye servicios y promesa clara de valor.

Recomendación:
- Mantener el H1 con marca + servicio + ubicación: "Perfo Construcciones | Pilotaje y Estabilización de Taludes en Quito"
- Reforzar la frase de servicio con términos que coincidan con búsquedas reales:
  - pilotaje barrenado
  - pilotaje prebarrenado
  - estabilización de taludes
  - cimentaciones especiales

### Servicios
Se recomienda ampliar textos de cada servicio con:
- descripción técnica
- beneficios para el cliente
- áreas de cobertura
- palabras clave específicas por especialidad

Ejemplos de servicios a reforzar:
- pilotaje barrenado
- pilotaje prebarrenado
- hincado de pilotes
- vibrohincado
- anclajes para muros pantalla
- estabilización de taludes
- micropilotaje

### Proyectos
El portafolio es una ventaja SEO real porque permite generar contenido contextualizado por obra y ubicación. Cada proyecto puede atraer búsquedas específicas por tipo de obra.

Recomendación:
- Añadir más frases con nombres de proyectos, ubicación y tipo de solución.
- Incluir ubicaciones: Quito, Guayaquil, Loja, Pomasqui, Machángara, etc.

### Nosotros
Es una oportunidad para reforzar autoridad de marca y experiencia técnica.

Recomendación:
- Usar el nombre comercial oficial repetidamente con un patrón constante.
- Incluir frases como: "empresa geotécnica en Ecuador", "cimentaciones especiales", "soluciones de perforación profunda".

### Contacto
Se recomienda reforzar la conversión y la relevancia local con textos como:
- cotización de pilotaje en Quito
- anclajes y muros pantalla en Ecuador
- estabilización de taludes urgente

---

## 4. Palabras clave para búsqueda

### Palabras clave principales

1. Perfo Construcciones
2. Perfor Construcciones
3. Perforconstrucciones
4. ingeniería geotécnica Ecuador
5. pilotaje Quito
6. estabilización de taludes Quito
7. pilotaje barrenado
8. pilotaje prebarrenado
9. hincado de pilotes
10. anclajes para muros pantalla
11. cimentaciones especiales Ecuador
12. perforación profunda Ecuador
13. micropilotaje Ecuador
14. vibración y vibrohincado
15. geotecnia Ecuador

### Palabras clave secundarias por servicio

- pilotaje para edificios
- pilotaje para puentes
- estabilización de taludes en Quito
- muros pantalla Quito
- anclajes de suelo
- cimentación especial Ecuador
- cimentación profunda
- perforación continua
- apoyo geotécnico
- excavación y contención
- taludes críticos
- protección de ríos y taludes

### Palabras clave locales

- pilotaje Quito
- estabilización de taludes Quito
- perforación profunda Quito
- geotecnia en Ecuador
- anclajes Quito
- pilotaje Ecuador
- soluciones geotécnicas Ecuador

### Palabras clave de intención comercial

- cotizar pilotaje en Quito
- costos de pilotaje Ecuador
- especialista en anclajes Quito
- empresa geotécnica Ecuador
- estabilización de taludes Ecuador
- perforación profunda para construcción

---

## 5. Recomendación de estrategia SEO

### A. Consistencia de marca
Se recomienda elegir una versión oficial y usarla en todo el proyecto:
- Perfo Construcciones
o
- Perfor Construcciones

La recomendación práctica es usar una única versión para:
- SEO title
- meta description
- OG tags
- breadcrumb
- footer
- alt text
- canonical URL
- schema

### B. Prioridad de contenido
Priorizar páginas y textos con mayor potencial de conversión:
1. Inicio
2. Servicios
3. Proyectos
4. Contacto
5. Nosotros

### C. Estructura recomendada para títulos

- Home: "Perfo Construcciones | Pilotaje y Estabilización de Taludes en Quito"
- Servicios: "Servicios de Pilotaje, Anclajes y Geotecnia | Perfo Construcciones"
- Proyectos: "Proyectos de Pilotaje y Estabilización de Taludes | Perfo Construcciones"
- Contacto: "Cotiza tu Proyecto de Geotecnia y Pilotaje | Perfo Construcciones"

### D. Recomendación técnica
- Revisar la etiqueta canonical en producción.
- Validar que la URL final del dominio coincida con el nombre comercial oficial.
- Confirmar que la página tenga Open Graph y Twitter card consistentes.
- Añadir schema de tipo ProfessionalService con la información real de la empresa.
- Mantener las imágenes con alt text útiles y descriptivos.

---

## 6. Conclusión

El proyecto ya tiene una base SEO sólida y técnica, con un buen enfoque local y una estructura de contenido adecuada para un negocio de ingeniería geotécnica. El mayor punto de mejora es la consolidación de marca y la expansión semántica de palabras clave por servicio y ubicación.

Si se corrige la consistencia del nombre comercial y se fortalecen los textos de servicios, proyectos y contacto, la web tendrá un mayor potencial de posicionamiento orgánico en búsquedas locales y sectoriales en Ecuador.

---

## 7. Archivos relevantes del proyecto

- [src/components/Seo.tsx](src/components/Seo.tsx)
- [src/pages/Home.tsx](src/pages/Home.tsx)
- [src/pages/About.tsx](src/pages/About.tsx)
- [src/pages/Contact.tsx](src/pages/Contact.tsx)
- [src/data/projects.ts](src/data/projects.ts)

---

## 8. Recomendación de implementación inmediata

1. Definir una sola marca oficial.
2. Actualizar títulos y descripciones en todas las rutas.
3. Añadir más contenido técnico por servicio.
4. Reforzar ubicaciones geográficas en textos y metas.
5. Verificar indexación en Google Search Console una vez publicado el sitio.
