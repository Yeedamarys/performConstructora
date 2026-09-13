import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ShieldCheck } from 'lucide-react';
import { projectsData } from '../data/projects';
import Seo from '../components/Seo';
import { useEffect } from 'react';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectsData.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <Navigate to="/proyectos" replace />;
  }

  // Update dynamic SEO inside the component using document logic directly or rely on the Seo component 
  // if it had dynamic props, but since Seo.tsx is static routing, we update it here for this dynamic route.
  useEffect(() => {
    document.title = project.title;
    let meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', project.desc);
    }
  }, [project]);

  return (
    <div className="bg-brand-bg w-full min-h-screen">
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 flex items-center gap-3 sm:gap-4">
          <Link to="/proyectos" className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-amber font-sans font-semibold leading-none transition-colors">
            <ArrowLeft size={20} />
            Volver a Proyectos
          </Link>

          <div className="inline-flex items-center gap-2 leading-none">
            <span className="w-2 h-2 bg-brand-primary inline-block"></span>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">FICHA TÉCNICA DE OBRA</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-bold text-brand-text mb-8">{project.h1}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {project.images.map((img, idx) => (
                <div key={idx} className="rounded-xl border border-brand-border overflow-hidden bg-white">
                  <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-brand-border p-8 sticky top-32">
              <h2 className="font-display font-bold text-xl text-brand-text mb-6 border-b border-brand-border pb-4">Detalles del Proyecto</h2>
              
              <dl className="space-y-6">
                <div>
                  <dt className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Servicio Aplicado</dt>
                  <dd className="font-sans font-medium text-brand-text">
                    <Link to="/servicios" className="text-brand-primary hover:underline flex items-center gap-2">
                      <ShieldCheck size={16} />
                      {project.service}
                    </Link>
                  </dd>
                </div>
                
                <div>
                  <dt className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Cliente / Dirección</dt>
                  <dd className="font-sans font-medium text-brand-text">{project.client}</dd>
                </div>
                
                {project.team && (
                  <div>
                    <dt className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Equipo Técnico</dt>
                    <dd className="font-sans font-medium text-brand-text">{project.team}</dd>
                  </div>
                )}
                
                <div>
                  <dt className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Fecha de Ejecución</dt>
                  <dd className="font-sans font-medium text-brand-text">{project.year}</dd>
                </div>
                
                <div>
                  <dt className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Descripción</dt>
                  <dd className="font-sans text-sm text-brand-muted leading-relaxed">{project.desc}</dd>
                </div>
              </dl>
              
              <div className="mt-8 pt-6 border-t border-brand-border">
                <Link to="/contacto" className="w-full inline-flex items-center justify-center gap-2 bg-brand-amber hover:bg-brand-amber-dark text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded transition-colors">
                  Cotizar Proyecto Similar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
