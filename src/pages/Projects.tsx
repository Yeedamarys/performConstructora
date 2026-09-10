import { useEffect } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';

export default function Projects() {
  const projects = projectsData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-bg w-full">
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-brand-primary"></span>
          <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">Portafolio Geotécnico Verificado</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-brand-text mb-4">RESPALDO Y EXPERIENCIA<br/>COMPROBADA</h1>
            <p className="text-lg text-brand-muted font-sans max-w-2xl">
              Cada proyecto que ejecutamos cuenta con certificación oficial y acta de entrega-recepción de nuestros clientes. Obras de infraestructura vial, urbana e hidroeléctrica en todo el Ecuador.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded border border-brand-border text-center">
            <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Obras Certificadas</div>
            <div className="font-display font-bold text-3xl text-brand-primary">140+ <span className="text-sm font-sans text-brand-muted">Actas</span></div>
          </div>
          <div className="bg-white p-6 rounded border border-brand-border text-center">
            <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Profundidad Máxima</div>
            <div className="font-display font-bold text-3xl text-brand-primary">35.0 <span className="text-sm font-sans text-brand-muted">Metros</span></div>
          </div>
          <div className="bg-white p-6 rounded border border-brand-border text-center">
            <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Normativa Sísmica</div>
            <div className="font-display font-bold text-3xl text-brand-primary">NEC-15</div>
          </div>
          <div className="bg-white p-6 rounded border border-brand-border text-center">
            <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Cobertura Nacional</div>
            <div className="font-display font-bold text-3xl text-brand-primary">24 <span className="text-sm font-sans text-brand-muted">Provincias</span></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-brand-border pb-6">
          <button className="bg-brand-primary text-white font-display font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full">Todos (8)</button>
          <button className="bg-white border border-brand-border text-brand-muted hover:text-brand-text font-display font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors">Pilotaje y Cimentación</button>
          <button className="bg-white border border-brand-border text-brand-muted hover:text-brand-text font-display font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors">Estabilización de Taludes</button>
          <button className="bg-white border border-brand-border text-brand-muted hover:text-brand-text font-display font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors">Puentes & Viales</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <Link to={`/proyectos/${p.slug}`} key={i} className="bg-white rounded-xl border border-brand-border overflow-hidden hover:shadow-lg transition-all group flex flex-col">
              <div className="grid grid-cols-2 gap-px bg-brand-border h-48">
                {p.images && p.images[0] ? (
                  <div className={`relative overflow-hidden ${!p.images[1] ? 'col-span-2' : ''}`}>
                    <img
                      src={p.images[0].src}
                      alt={p.images[0].alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ) : null}
                {p.images && p.images[1] ? (
                  <div className="relative overflow-hidden">
                    <img
                      src={p.images[1].src}
                      alt={p.images[1].alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ) : null}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                    <span className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest">{p.service}</span>
                  </div>
                  <h2 className="font-display font-bold text-xl text-brand-text leading-tight group-hover:text-brand-amber transition-colors">{p.title.split(' | ')[0]}</h2>
                </div>
                
                <div className="flex-grow">
                  <p className="font-sans text-sm text-brand-muted line-clamp-2">{p.desc}</p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-brand-border flex items-center justify-between">
                   <div className="flex items-center gap-2 text-brand-text">
                     <ShieldCheck size={16} className="text-brand-primary" />
                     <span className="font-sans font-semibold text-xs">{p.client}</span>
                   </div>
                   <span className="font-sans text-xs text-brand-muted font-medium">{p.year}</span>
                </div>
                <div className="mt-4 flex items-center justify-end text-brand-primary group-hover:text-brand-amber transition-colors">
                  <span className="font-display font-bold text-[10px] uppercase tracking-widest mr-2">Ver Ficha</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
