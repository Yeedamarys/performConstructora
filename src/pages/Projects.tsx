import { useMemo, useRef, useState } from 'react';
import { ShieldCheck, ArrowRight, Expand } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { PROJECT_CATEGORIES, projectsData, type ProjectCategory } from '../data/projects';
import { Counter, EASE_OUT, MaskReveal, Reveal, Stagger, StaggerItem, TiltCard, TiltLayer } from '../components/motion';
import Lightbox, { galleryLayoutId, type LightboxItem } from '../components/Lightbox';
import { cld } from '../seo/cloudinary';

type Filter = 'todos' | ProjectCategory;

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
};

/** Cards rise and turn up into place like sheets being lifted; filtered-out cards fold away. */
const cardMotion = {
  hidden: { opacity: 0, y: 48, rotateX: -24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.85, ease: EASE_OUT, delay: Math.min(i, 5) * 0.08 },
  }),
  exit: {
    opacity: 0,
    rotateY: 70,
    scale: 0.88,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] as const },
  },
};

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('todos');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ratios = useRef(new Map<string, number>());

  const projects = useMemo(
    () => (filter === 'todos' ? projectsData : projectsData.filter((p) => p.categories.includes(filter))),
    [filter],
  );

  // Every visible photo, in reading order, so the lightbox can step through the filtered set.
  const gallery: LightboxItem[] = useMemo(
    () =>
      projects.flatMap((p) =>
        p.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          title: p.title.split(' | ')[0],
          service: p.service,
          href: `/proyectos/${p.slug}`,
        })),
      ),
    [projects],
  );

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'todos', label: 'Todos', count: projectsData.length },
    ...PROJECT_CATEGORIES.map((c) => ({
      id: c.id,
      label: c.label,
      count: projectsData.filter((p) => p.categories.includes(c.id)).length,
    })),
  ];

  const openSrc = openIndex === null ? null : gallery[openIndex]?.src ?? null;
  const open = (src: string) => setOpenIndex(gallery.findIndex((g) => g.src === src));
  const rememberRatio = (src: string, el: HTMLImageElement) => {
    if (el.naturalWidth) ratios.current.set(src, el.naturalWidth / el.naturalHeight);
  };

  return (
    <div className="bg-brand-bg w-full">
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-brand-primary"></span>
          <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">Portafolio Geotécnico Verificado</span>
        </Reveal>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <Stagger onMount delay={0.05}>
            <motion.h1 variants={rise} className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-brand-text mb-4">
              <span className="text-brand-primary font-semibold block sm:inline">RESPALDO Y PROYECTOS DE PILOTAJE, ANCLAJES Y TALUDES</span>
            </motion.h1>
            <motion.p variants={rise} className="text-lg text-brand-muted font-sans max-w-2xl text-justify">
              Cada proyecto que ejecutamos cuenta con certificación oficial y acta de entrega - recepción de nuestros clientes. Obras de infraestructura vial, urbana e hidroeléctrica en todo el Ecuador.
            </motion.p>
          </Stagger>
        </div>

        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12" stagger={0.08}>
          <StaggerItem>
            <div className="card-lift h-full bg-white p-6 rounded border border-brand-border text-center">
              <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Obras Certificadas</div>
              <div className="font-display font-bold text-3xl text-brand-primary"><Counter value={140} suffix="+" /> <span className="text-sm font-sans text-brand-muted">Actas</span></div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="card-lift h-full bg-white p-6 rounded border border-brand-border text-center">
              <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Profundidad Máxima</div>
              <div className="font-display font-bold text-3xl text-brand-primary"><Counter value={35} decimals={1} /> <span className="text-sm font-sans text-brand-muted">Metros</span></div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="card-lift h-full bg-white p-6 rounded border border-brand-border text-center">
              <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Normativa Sísmica</div>
              <div className="font-display font-bold text-3xl text-brand-primary">NEC-15</div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="card-lift h-full bg-white p-6 rounded border border-brand-border text-center">
              <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Cobertura Nacional</div>
              <div className="font-display font-bold text-3xl text-brand-primary"><Counter value={24} /> <span className="text-sm font-sans text-brand-muted">Provincias</span></div>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Filters: the active pill slides between options */}
        <Reveal className="mb-8 border-b border-brand-border pb-6">
          <div role="group" aria-label="Filtrar proyectos por categoría" className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={`btn-press relative rounded-full border px-4 py-2 font-display text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
                    active ? 'border-brand-primary text-white' : 'border-brand-border bg-white text-brand-muted hover:border-brand-primary/40 hover:text-brand-text'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 rounded-full bg-brand-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">
                    {f.label} <span className={`tabular-nums ${active ? 'text-white/75' : 'text-brand-muted/70'}`}>({f.count})</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1400px]">
            <AnimatePresence mode="popLayout">
              {projects.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  custom={i}
                  variants={cardMotion}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  exit="exit"
                  transition={{ layout: { type: 'spring', stiffness: 260, damping: 30 } }}
                  className="h-full"
                >
                  <TiltCard max={4} className="bg-white rounded-xl border border-brand-border overflow-hidden group flex h-full flex-col">
                    <div className="grid grid-cols-2 gap-px bg-brand-border h-48">
                      {p.images.slice(0, 2).map((img, k) => (
                        <button
                          key={img.src}
                          type="button"
                          onClick={() => open(img.src)}
                          aria-label={`Ampliar foto: ${img.alt}`}
                          className={`group/thumb relative overflow-hidden bg-brand-bg ${p.images.length === 1 ? 'col-span-2' : ''}`}
                        >
                          <MaskReveal delay={0.15 + k * 0.12 + Math.min(i, 5) * 0.08}>
                            <TiltLayer depth={-7} className="absolute -inset-3">
                              <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/thumb:scale-[1.08]">
                                {/* While open, the photo lives in the lightbox; its slot waits empty */}
                                {openSrc !== img.src && (
                                  <motion.div
                                    layoutId={galleryLayoutId(img.src)}
                                    className="absolute inset-0 overflow-hidden"
                                    transition={{ type: 'spring', stiffness: 260, damping: 32 }}
                                  >
                                    <motion.img
                                      layout
                                      src={cld(img.src, { w: 700 })}
                                      alt={img.alt}
                                      loading="lazy"
                                      onLoad={(e) => rememberRatio(img.src, e.currentTarget)}
                                      className="absolute inset-0 h-full w-full object-cover"
                                    />
                                  </motion.div>
                                )}
                              </div>
                            </TiltLayer>
                          </MaskReveal>
                          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-deep/0 transition-colors duration-500 group-hover/thumb:bg-brand-deep/35">
                            <Expand size={22} className="text-white opacity-0 scale-75 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/thumb:opacity-100 group-hover/thumb:scale-100" />
                          </span>
                        </button>
                      ))}
                    </div>

                    <Link to={`/proyectos/${p.slug}`} className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary transition-transform duration-500 group-hover:scale-150"></span>
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
                        <ArrowRight size={16} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

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
      </section>
    </div>
  );
}
