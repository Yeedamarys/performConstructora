import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pages: Record<string, { title: string; description: string; keywords: string }> = {
  '/': {
    title: 'PERFORCONSTRUCCIONES | Ingeniería geotécnica y pilotaje en Ecuador',
    description: 'PERFORCONSTRUCCIONES ofrece pilotaje barrenado y prebarrenado, hincado de pilotes, anclajes para muros pantalla y estabilización de taludes en Ecuador.',
    keywords: 'PERFORCONSTRUCCIONES, ingeniería geotécnica Ecuador, pilotaje, pilotaje barrenado, pilotaje prebarrenado, hincado de pilotes, vibrohincado, anclajes, estabilización de taludes',
  },
  '/servicios': {
    title: 'Servicios geotécnicos | Pilotaje, anclajes y estabilización de taludes | PERFORCONSTRUCCIONES',
    description: 'Servicios de pilotaje barrenado y prebarrenado de 0.30 a 1.50 m, hincado y vibrohincado, anclajes para muros pantalla y estabilización de taludes bajo normas ACI, AASHTO, NEC-SE-GC y CE.020.',
    keywords: 'pilotaje barrenado, pilotaje prebarrenado, pilotes de 0.30 m a 1.50 m, vibrohincado, hincado de pilotes, tablaestacas, anclajes muros pantalla, estabilización de taludes, hormigón lanzado, ACI 543, AASHTO, NEC-SE-GC, CE.020',
  },
  '/proyectos': {
    title: 'Proyectos de pilotaje y estabilización de taludes | PERFORCONSTRUCCIONES',
    description: 'Conozca proyectos de pilotaje, micropilotaje, tubería hincada, anclajes y estabilización de taludes ejecutados por PERFORCONSTRUCCIONES en Ecuador.',
    keywords: 'proyecto Museo Yaku, puente río Monjas Pomasqui, proyecto Orquídeas, protección río Machángara, hospital privado Loja, río Monjas La Pampa, puente Majua Viche, Acua Shops, micropilotaje, tubería hincada',
  },
  '/nosotros': {
    title: 'Nosotros | PERFORCONSTRUCCIONES',
    description: 'Conozca a PERFORCONSTRUCCIONES, especialistas en ingeniería geotécnica, perforación profunda y soluciones estructurales para obras en Ecuador.',
    keywords: 'PERFORCONSTRUCCIONES, empresa geotécnica Ecuador, perforación profunda, cimentaciones especiales',
  },
  '/contacto': {
    title: 'Contacto | PERFORCONSTRUCCIONES Quito',
    description: 'Contacte a PERFORCONSTRUCCIONES para proyectos de pilotaje, anclajes, hincado de pilotes y estabilización de taludes en Ecuador.',
    keywords: 'contacto PERFORCONSTRUCCIONES, pilotaje Quito, anclajes Quito, estabilización de taludes Quito',
  },
};

function updateMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pages[pathname] ?? pages['/'];
    document.title = page.title;
    updateMeta('description', page.description);
    updateMeta('keywords', page.keywords);
    updateProperty('og:title', page.title);
    updateProperty('og:description', page.description);
  }, [pathname]);

  return null;
}
