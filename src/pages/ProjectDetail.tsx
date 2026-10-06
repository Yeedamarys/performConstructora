import { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Expand, ShieldCheck } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { projectsData } from '../data/projects';
import { serviceForProject, serviceHref } from '../data/services';
import { EASE_OUT, MaskReveal, Stagger, StaggerItem, staggerChild } from '../components/motion';
import Lightbox, { galleryLayoutId } from '../components/Lightbox';
import { cld, cldSrcSet } from '../seo/cloudinary';
import NotFound from './NotFound';

const field = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectsData.find(p => p.slug === slug);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ratios = useRef(new Map<string, number>());

  // Head tags come from Seo.tsx (routeMeta); scroll reset from the route transition in App.tsx.
  if (!project) return <NotFound />;

  const name = project.title.split(' | ')[0];
  const service = serviceForProject(project.slug);
  const gallery = project.images.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: name,
    service: project.service,
    href: `/proyectos/${project.slug}`,
  }));
  const openSrc = openIndex === null ? null : gallery[openIndex]?.src;

  return (
    <div className="bg-brand-bg w-full min-h-screen">
      <Stagger onMount stagger={0.1} delay={0.05} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StaggerItem className="mb-8 flex items-center gap-3 sm:gap-4">
          <Link to="/proyectos" className="group inline-flex items-center gap-2 text-brand-primary hover:text-brand-amber font-sans font-semibold leading-none transition-colors">
            <ArrowLeft size={20} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1" />
            Volver a Proyectos
          </Link>

          <div className="inline-flex items-center gap-2 leading-none">
            <span className="w-2 h-2 bg-brand-primary inline-block"></span>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">FICHA TÉCNICA DE OBRA</span>
          </div>
        </StaggerItem>

        <motion.h1 variants={staggerChild} className="text-4xl sm:text-5xl font-display font-bold text-brand-text mb-8 text-center">{project.h1}</motion.h1>

        {/* Site photos: same masked reveal and lightbox as the gallery */}
        <LayoutGroup>
          <StaggerItem className={`mx-auto mb-10 grid max-w-5xl gap-4 ${project.images.length > 1 ? 'sm:grid-cols-2' : ''}`}>
            {project.images.map((img, k) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setOpenIndex(k)}
                aria-label={`Ampliar foto: ${img.alt}`}
                className="group/thumb relative aspect-[4/3] overflow-hidden rounded-xl border border-brand-border bg-gray-200 shadow-[0_16px_32px_rgba(43,47,51,0.08)]"
              >
                <MaskReveal inView={false} delay={0.25 + k * 0.15} duration={1.2}>
                  <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/thumb:scale-[1.04]">
                    {openSrc !== img.src && (
                      <motion.div layoutId={galleryLayoutId(img.src)} className="absolute inset-0 overflow-hidden" transition={{ type: 'spring', stiffness: 260, damping: 32 }}>
                        <motion.img
                          layout
                          src={cld(img.src, { w: 1200 })}
                          srcSet={cldSrcSet(img.src)}
                          sizes={project.images.length > 1 ? '(min-width: 640px) 50vw, 100vw' : '100vw'}
                          alt={img.alt}
                          fetchPriority={k === 0 ? 'high' : undefined}
                          onLoad={(e) => {
                            const el = e.currentTarget;
                            if (el.naturalWidth) ratios.current.set(img.src, el.naturalWidth / el.naturalHeight);
                          }}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </motion.div>
                    )}
                  </div>
                </MaskReveal>
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-deep/0 transition-colors duration-500 group-hover/thumb:bg-brand-deep/35">
                  <Expand size={24} className="text-white opacity-0 scale-75 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/thumb:opacity-100 group-hover/thumb:scale-100" />
                </span>
              </button>
            ))}
          </StaggerItem>
          <AnimatePresence>
            {openIndex !== null && gallery[openIndex] && (
              <Lightbox
                key="lightbox"
                items={gallery}
                index={openIndex}
                ratios={ratios.current}
                onIndex={setOpenIndex}
                onClose={() => setOpenIndex(null)}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>

        <div className="max-w-3xl mx-auto [perspective:1400px]">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40, rotateX: -12 },
              visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: EASE_OUT } },
            }}
            className="origin-top"
          >
            <div className="bg-white rounded-xl border border-brand-border p-8 shadow-sm">
              <h2 className="font-display font-bold text-xl text-brand-text mb-6 border-b border-brand-border pb-4">Detalles del Proyecto</h2>
              
              <motion.dl
                className="space-y-6"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } }}
              >
                <motion.div variants={field}>
                  <dt className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Servicio Aplicado</dt>
                  <dd className="font-sans font-medium text-brand-text">
                    <Link to={service ? serviceHref(service.slug) : '/servicios'} className="text-brand-primary hover:underline flex items-center gap-2">
                      <ShieldCheck size={16} />
                      {project.service}
                    </Link>
                  </dd>
                </motion.div>
                
                <motion.div variants={field}>
                  <dt className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Cliente / Dirección</dt>
                  <dd className="font-sans font-medium text-brand-text">{project.client}</dd>
                </motion.div>
                
                {project.team && (
                  <motion.div variants={field}>
                    <dt className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Equipo Técnico</dt>
                    <dd className="font-sans font-medium text-brand-text">{project.team}</dd>
                  </motion.div>
                )}
                
                <motion.div variants={field}>
                  <dt className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Fecha de Ejecución</dt>
                  <dd className="font-sans font-medium text-brand-text">{project.year}</dd>
                </motion.div>
                
                <motion.div variants={field}>
                  <dt className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Descripción</dt>
                  <dd className="font-sans text-sm text-brand-muted leading-relaxed">{project.desc}</dd>
                </motion.div>
              </motion.dl>
              
              <div className="mt-8 pt-6 border-t border-brand-border">
                <Link to="/contacto" className="btn-press w-full inline-flex items-center justify-center gap-2 bg-brand-amber hover:bg-brand-amber-dark text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded hover:shadow-[0_14px_28px_-12px_rgba(141,75,0,0.55)]">
                  Cotizar Proyecto Similar
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Stagger>
    </div>
  );
}
