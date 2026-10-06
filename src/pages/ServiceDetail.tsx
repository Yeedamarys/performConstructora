import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { serviceHref, servicesData, thumb } from '../data/services';
import { projectsData } from '../data/projects';
import { cld, cldSrcSet } from '../seo/cloudinary';
import { EASE_MASK, EASE_OUT, MaskReveal, Reveal, Stagger, StaggerItem, TiltCard, TiltLayer, staggerChild } from '../components/motion';

const specList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};
const specItem = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Related-project cards turn up into place like the gallery cards. */
const turnUp = {
  hidden: { opacity: 0, y: 48, rotateX: -24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.85, ease: EASE_OUT, delay: i * 0.08 },
  }),
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) return <NotFound />;

  const related = service.relatedProjects
    .map((s) => projectsData.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const others = servicesData.filter((s) => s.slug !== service.slug);

  return (
    <div className="bg-brand-bg w-full">
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Stagger onMount stagger={0.08} delay={0.05} className="mb-10">
          {/* Breadcrumb */}
          <StaggerItem>
            <nav aria-label="Ruta de navegación" className="mb-6 flex flex-wrap items-center gap-2 font-sans text-sm">
              <Link to="/servicios" className="group inline-flex items-center gap-2 font-semibold text-brand-primary transition-colors hover:text-brand-amber">
                <ArrowLeft size={18} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1" />
                Servicios
              </Link>
              <ChevronRight size={14} className="text-brand-muted" aria-hidden="true" />
              <span className="text-brand-muted" aria-current="page">{service.category}</span>
            </nav>
          </StaggerItem>
          <StaggerItem className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-brand-primary"></span>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">{service.category}</span>
          </StaggerItem>
          <motion.h1 variants={staggerChild} className="max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-text leading-[1.1]">
            {service.title}
          </motion.h1>
        </Stagger>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Image */}
          <div className="relative lg:col-span-7">
            <div className="aspect-[4/3] rounded-xl bg-gray-200 border border-brand-border shadow-[0_16px_32px_rgba(43,47,51,0.08)] overflow-hidden relative">
              <MaskReveal inView={false} delay={0.2} duration={1.3}>
                <img src={cld(service.image, { w: 1200 })} srcSet={cldSrcSet(service.image)} sizes="(min-width: 1024px) 58vw, 100vw" alt={service.alt} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
              </MaskReveal>
            </div>
            <motion.span
              aria-hidden="true"
              className="absolute -left-3 top-0 hidden h-full w-[3px] origin-top rounded-full bg-brand-amber sm:block"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1, transition: { duration: 1.3, ease: EASE_MASK, delay: 0.2 } }}
            />
          </div>

          {/* Specs */}
          <motion.aside
            className="lg:col-span-5 lg:sticky lg:top-40 bg-white rounded-xl border border-brand-border shadow-sm p-8"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT, delay: 0.35 } }}
          >
            <h2 className="font-display font-bold text-xl text-brand-text mb-6 border-b border-brand-border pb-4">Especificaciones técnicas</h2>
            {service.description && (
              <p className="font-sans text-sm text-brand-muted leading-relaxed mb-6 text-justify">{service.description}</p>
            )}
            <motion.dl className="space-y-5" variants={specList} initial="hidden" animate="visible">
              {service.details.map(([label, detail]) => (
                <motion.div key={label} variants={specItem}>
                  <dt className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">{label}</dt>
                  <dd className="font-sans font-medium text-brand-text">{detail}</dd>
                </motion.div>
              ))}
            </motion.dl>
            <div className="mt-8 pt-6 border-t border-brand-border space-y-3">
              <Link
                to="/contacto"
                className="btn-press group w-full inline-flex items-center justify-center gap-2 bg-brand-amber hover:bg-brand-amber-dark text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded hover:shadow-[0_14px_28px_-12px_rgba(141,75,0,0.55)]"
              >
                <MessageCircle size={20} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12 group-hover:scale-110" />
                Cotiza tu proyecto
              </Link>
              <Link
                to="/servicios"
                className="btn-press group w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-brand-border hover:border-brand-primary/40 text-brand-deep font-display font-bold uppercase tracking-wider px-6 py-4 rounded"
              >
                Ver nuestros servicios
                <ArrowRight size={20} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* Projects that used this service */}
      {related.length > 0 && (
        <section className="bg-white border-t border-brand-border py-16 lg:py-20">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-text">Proyectos ejecutados</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1400px]">
              {related.map((p, i) => (
                <motion.div
                  key={p.slug}
                  custom={i}
                  variants={turnUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="h-full"
                >
                  <Link to={`/proyectos/${p.slug}`} className="block h-full">
                    <TiltCard max={4} className="group h-full bg-brand-bg rounded-xl border border-brand-border overflow-hidden flex flex-col">
                      <div className="relative h-52 overflow-hidden bg-gray-200">
                        <MaskReveal delay={0.15 + i * 0.08}>
                          <TiltLayer depth={-7} className="absolute -inset-3">
                            <img
                              src={cld(p.images[0].src, { w: 800 })}
                              alt={p.images[0].alt}
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                            />
                          </TiltLayer>
                        </MaskReveal>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest mb-2">{p.service}</span>
                        <h3 className="font-display font-bold text-lg text-brand-text leading-tight mb-4 transition-colors group-hover:text-brand-amber">{p.title.split(' | ')[0]}</h3>
                        <div className="mt-auto pt-4 border-t border-brand-border flex items-center justify-between">
                          <span className="flex items-center gap-2 font-sans font-semibold text-xs text-brand-text">
                            <ShieldCheck size={16} className="text-brand-primary" /> {p.client}
                          </span>
                          <span className="font-sans text-xs text-brand-muted">{p.year}</span>
                        </div>
                      </div>
                    </TiltCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other services */}
      <section className="border-t border-brand-border py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-display font-bold text-brand-text">Otros servicios</h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4" stagger={0.08}>
            {others.map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  to={serviceHref(s.slug)}
                  className="card-lift group flex items-center gap-4 rounded-xl border border-brand-border bg-white p-3 pr-5"
                >
                  <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-200">
                    <img src={thumb(s.image, 200)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-display font-bold uppercase tracking-widest text-brand-primary">{s.category}</span>
                    <span className="block font-display font-bold text-sm text-brand-text leading-snug group-hover:text-brand-amber transition-colors">{s.title}</span>
                  </span>
                  <ArrowRight size={18} className="shrink-0 text-brand-primary transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
