import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pages: Record<string, { title: string; description: string; keywords: string }> = {
  '/': {
    title: 'Perfo Construcciones | Pilotaje y Estabilización de Taludes en Quito',
    description: 'Perfo Construcciones ofrece pilotaje barrenado y prebarrenado, hincado de pilotes, anclajes para muros pantalla y estabilización de taludes en Quito y todo el Ecuador.',
    keywords: 'Perfo Construcciones, ingeniería geotécnica Ecuador, pilotaje, pilotaje barrenado, hincado de pilotes, vibrohincado, anclajes, estabilización de taludes, talud, hormigón lanzado, perforación en suelo, colocación de malla electrosoldada, colocación de geomanto, malla triple torsión, inyección de lechada, perforación en roca',
  },
  '/servicios': {
    title: 'Servicios de Pilotaje y Geotecnia en Quito | Perfo Construcciones',
    description: 'Pilotaje barrenado, hincado de pilotes, anclajes para muros pantalla y estabilización de taludes. Normas ACI 543, AASHTO, NEC-SE-GC y CE.020. Servicio en Quito y Ecuador.',
    keywords: 'pilotaje barrenado, pilotaje prebarrenado, pilotes de 0.30 m a 1.50 m, vibrohincado, hincado de pilotes, tablaestacas, anclajes muros pantalla, estabilización de taludes, hormigón lanzado, ACI 543, AASHTO, NEC-SE-GC, CE.020, perforación en suelo, malla electrosoldada, geomanto, malla triple torsión, inyección de lechada para consolidación, perforación en roca',
  },
  '/proyectos': {
    title: 'Proyectos de Pilotaje y Estabilización de Taludes | Perfo Construcciones',
    description: 'Conoce nuestros proyectos ejecutados en Quito y Ecuador: puentes, hospitales, protección de ríos y taludes. Experiencia comprobada desde 2023.',
    keywords: 'proyecto Museo Yaku, puente río Monjas Pomasqui, proyecto Orquídeas, protección río Machángara, hospital privado Loja, río Monjas La Pampa, puente Majua Viche, Acua Shops, micropilotaje, tubería hincada',
  },
  '/nosotros': {
    title: 'Sobre Perfo Construcciones | Experiencia en Geotecnia y Obra Civil',
    description: 'Perfo Construcciones: empresa quiteña especializada en pilotaje, estabilización de taludes y obra civil. Conoce nuestra misión, visión y ventajas competitivas.',
    keywords: 'Perfo Construcciones, empresa geotécnica Ecuador, perforación profunda, cimentaciones especiales',
  },
  '/contacto': {
    title: 'Contacto | Perfo Construcciones — Cotiza tu Proyecto en Quito',
    description: 'Solicita una cotización para tu proyecto de pilotaje, anclajes o estabilización de taludes. Atención en Quito y todo el Ecuador. Respuesta rápida.',
    keywords: 'contacto Perfo Construcciones, pilotaje Quito, anclajes Quito, estabilización de taludes Quito',
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

function updateCanonical(pathname: string) {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  // Ensure we don't have trailing slashes for consistency unless it's just '/'
  const cleanPath = pathname === '/' ? '' : pathname;
  canonical.setAttribute('href', `https://perforconstrucciones.com${cleanPath}`);
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
    
    // Update Canonical URL
    updateCanonical(pathname);
  }, [pathname]);

  return null;
}
