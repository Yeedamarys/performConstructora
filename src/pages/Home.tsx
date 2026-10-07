import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Reveal, Stagger, StaggerItem, staggerChild } from '../components/motion';
import { DepthImage, SectionRule } from '../components/frame';
import DrillHero from '../components/hero/DrillHero';
import { serviceHref, servicesData } from '../data/services';
import { projectsData } from '../data/projects';
import { cld, cldSrcSet } from '../seo/cloudinary';

/** Home copy and photography per service; specs and links come from servicesData. */
const homeServices: Record<string, { image: string; alt: string; title: string; text: string }> = {
  'pilotaje-barrenado': {
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/cimentaci%C3%B3nPrimaria.png',
    alt: 'Cimentación primaria con pilotaje prebarrenado CFA',
    title: 'Pilotaje Prebarrenado CFA',
    text: 'Ejecución continua de pilotes de gran diámetro para edificaciones de altura y viaductos. Perforación con inyección simultánea de hormigón que minimiza la descompresión del suelo andino.',
  },
  'hincado-vibrohincado-pilotes': {
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/hincado.png',
    alt: 'Hincado y vibrohincado de pilotes y tablestacas',
    title: 'Hincado y Vibrohincado de pilotes y tablestacas',
    text: 'Soluciones de soporte en espacios confinados, submuraciones de edificios patrimoniales e inyecciones de lechada a alta presión para mejorar la capacidad portante del estrato base.',
  },
  'anclajes-muros-pantalla': {
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979975/anclajes.png',
    alt: 'Anclajes para muros pantalla de hormigón',
    title: 'Anclajes para muros pantalla de hormigón',
    text: 'Sistemas integrales de contención perimetral para sótanos de gran profundidad en áreas urbanas densas, previniendo asentamientos en predios e infraestructura vecina.',
  },
  'estabilizacion-taludes': {
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979978/taludes.png',
    alt: 'Estabilización de taludes',
    title: 'Estabilización de Taludes',
    text: 'Blindaje geotécnico en laderas y cortes viales mediante hormigón lanzado por vía húmeda (shotcrete), colocación de malla electrosoldada, colocación de geomanto y malla triple torsión. Especialistas en perforación en suelo, perforación en roca y drenes californianos subhorizontales.',
  },
};

const services = servicesData.map((s) => {
  const home = homeServices[s.slug];
  return {
    slug: s.slug,
    category: s.category,
    spec: s.menu.spec,
    details: s.details.slice(0, 3),
    image: home?.image ?? s.image,
    alt: home?.alt ?? s.alt,
    title: home?.title ?? s.title,
    text: home?.text ?? s.summary,
  };
});

/** Featured work: one of each kind (bridge piling, slope stabilisation, anchoring). */
const FEATURED = ['puente-rio-monjas-pomasqui', 'mitigacion-riesgo-rio-monjas-orquideas', 'anclaje-talud-museo-yaku'];
const featured = FEATURED.map((slug) => projectsData.find((p) => p.slug === slug)).filter(
  (p): p is NonNullable<typeof p> => !!p && p.images.length > 0,
);

/** Figures already published on the service pages, shown as the hero's spec line. */
const heroSpecs: [string, string][] = [
  ['Profundidad', 'hasta 35 m'],
  ['Diámetros', 'Ø 2" a 1.50 m'],
  ['Normas', 'ACI 543 · AASHTO · NEC-SE-GC'],
];

export default function Home() {
  return (
    <div className="bg-brand-bg w-full">
      {/* Hero: text column; DrillHero supplies the section, pinning and the 3D drilling visual */}
      <DrillHero>
        <Stagger onMount stagger={0.1} delay={0.1} className="space-y-8 lg:col-span-7 xl:col-span-6 break-words">
          <StaggerItem className="frame-marks inline-flex items-center gap-3 px-3 py-1.5 text-brand-primary/50">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-brand-amber animate-ping opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-brand-amber" />
            </span>
            <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted [font-stretch:88%]">
              Ingeniería Geotécnica & Cimentaciones Profundas - Ecuador
            </span>
          </StaggerItem>

          <motion.h1 variants={staggerChild} className="font-display text-brand-text">
            <span className="block text-5xl sm:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-[-0.025em] [font-stretch:86%]">
              Perfor Construcciones
            </span>
            <span className="mt-4 block text-2xl sm:text-3xl font-medium leading-tight tracking-[-0.005em] text-brand-primary [font-stretch:92%]">
              Pilotaje, Anclajes y Estabilización de Taludes en Quito, Ecuador
            </span>
          </motion.h1>

          <motion.p variants={staggerChild} className="max-w-[58ch] text-lg leading-relaxed text-brand-muted font-sans">
            Soluciones de perforación, pilotaje y estabilización de taludes con experiencia técnica comprobada en proyectos de infraestructura civil en todo el Ecuador.
          </motion.p>

          <StaggerItem className="flex flex-col sm:flex-row gap-4">
            <Link to="/contacto" className="btn-press group inline-flex items-center justify-center gap-2 bg-brand-amber hover:bg-brand-amber-dark text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded-sm shadow-[0_2px_4px_rgba(42,107,130,0.04)] hover:shadow-[0_14px_28px_-12px_rgba(141,75,0,0.55)]">
              <MessageCircle size={20} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12 group-hover:scale-110" />
              Cotiza tu proyecto
            </Link>
            <Link to="/servicios" className="btn-press group inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-brand-border hover:border-brand-primary/40 text-brand-deep font-display font-bold uppercase tracking-wider px-6 py-4 rounded-sm">
              Ver nuestros servicios
              <ArrowRight size={20} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
            </Link>
          </StaggerItem>

          {/* Spec line: the measurements the services are built to */}
          <StaggerItem>
            <dl className="grid grid-cols-1 sm:grid-cols-3 border-t border-brand-border pt-5 gap-y-4 sm:divide-x sm:divide-brand-border">
              {heroSpecs.map(([label, value]) => (
                <div key={label} className="sm:px-5 first:sm:pl-0">
                  <dt className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">{label}</dt>
                  <dd className="mt-1 font-mono text-sm font-medium tabular-nums text-brand-text">{value}</dd>
                </div>
              ))}
            </dl>
          </StaggerItem>
        </Stagger>
      </DrillHero>

      {/* Services: one framed plate per service, alternating sides */}
      <section className="relative bg-white border-t border-brand-border pt-14 pb-20 lg:pb-28">
        <div aria-hidden="true" className="drafting-grid pointer-events-none absolute inset-x-0 top-0 h-[40rem] [--grid-fade:linear-gradient(to_bottom,transparent,white)]" />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionRule start="0 m" end="35 m" className="mb-12" />
          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 mb-16 lg:mb-24">
            <Reveal>
              <h2 className="max-w-2xl font-display text-3xl md:text-5xl font-bold leading-[1] tracking-[-0.015em] text-brand-deep [font-stretch:88%]">
                PILOTAJE, ANCLAJES Y PERFORACIÓN EN SUELO Y ROCA
              </h2>
            </Reveal>
            <Reveal delay={0.1} as="p" className="max-w-md font-sans text-brand-muted leading-relaxed lg:text-right">
              Equipamiento de alto rendimiento operado bajo rigurosos protocolos geotécnicos para garantizar la estabilidad de superestructuras.
            </Reveal>
          </div>

          <div className="space-y-24 lg:space-y-36">
            {services.map((service, i) => {
              const flip = i % 2 === 1;
              return (
                <article key={service.slug} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
                    <DepthImage
                      src={cld(service.image, { w: 1200 })}
                      srcSet={cldSrcSet(service.image)}
                      sizes="(min-width: 1440px) 780px, (min-width: 1024px) 55vw, 100vw"
                      alt={service.alt}
                      className="aspect-[16/10]"
                      caption={
                        <>
                          <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] [font-stretch:88%]">{service.category}</span>
                          <span className="font-mono text-sm tabular-nums">{service.spec}</span>
                        </>
                      }
                    />
                  </div>
                  <Reveal delay={0.15} className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                    <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight tracking-[-0.01em] text-brand-text [font-stretch:90%]">
                      <Link to={serviceHref(service.slug)} className="transition-colors hover:text-brand-primary">
                        {service.title}
                      </Link>
                    </h3>
                    <p className="mt-4 max-w-[60ch] font-sans text-brand-muted leading-relaxed">{service.text}</p>
                    <dl className="mt-6 divide-y divide-brand-border border-y border-brand-border">
                      {service.details.map(([label, value]) => (
                        <div key={label} className="flex items-baseline justify-between gap-6 py-2.5">
                          <dt className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">{label}</dt>
                          <dd className="text-right font-mono text-sm tabular-nums text-brand-text">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <Link
                      to={serviceHref(service.slug)}
                      className="group mt-6 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.12em] text-brand-primary transition-colors hover:text-brand-amber"
                    >
                      Ver servicio
                      <ArrowRight size={16} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                    </Link>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured projects: one large plate, two stacked */}
      {featured.length > 0 && (
        <section className="border-t border-brand-border pt-14 pb-20 lg:pb-28">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionRule className="mb-12" />
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <Reveal>
                <h2 className="font-display text-3xl md:text-5xl font-bold leading-[1] tracking-[-0.015em] text-brand-deep [font-stretch:88%]">
                  Proyectos ejecutados
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <Link to="/proyectos" className="group inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.12em] text-brand-primary transition-colors hover:text-brand-amber">
                  Ver todos los proyectos
                  <ArrowRight size={16} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              {featured.map((p, i) => {
                const lead = i === 0;
                return (
                  <article key={p.slug} className={lead ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'}>
                    <Link to={`/proyectos/${p.slug}`} className="group block">
                      <DepthImage
                        src={cld(p.images[0].src, { w: 1200 })}
                        srcSet={cldSrcSet(p.images[0].src)}
                        sizes={lead ? '(min-width: 1440px) 780px, (min-width: 1024px) 55vw, 100vw' : '(min-width: 1440px) 560px, (min-width: 1024px) 40vw, 100vw'}
                        alt={p.images[0].alt}
                        className={lead ? 'aspect-[4/3] lg:aspect-[5/6]' : 'aspect-[16/10]'}
                        caption={<span className="font-mono text-sm tabular-nums">{p.service}</span>}
                      />
                      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <h3 className="font-display text-xl md:text-2xl font-bold leading-snug tracking-[-0.005em] text-brand-text transition-colors group-hover:text-brand-primary [font-stretch:90%]">
                          {p.title.split(' | ')[0]}
                        </h3>
                        <span className="font-mono text-sm tabular-nums text-brand-muted">{p.year}</span>
                      </div>
                      <p className="mt-1 font-sans text-sm text-brand-muted">{p.client}</p>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Closing: quote request inside a drawing frame */}
      <section className="border-t border-brand-border bg-white py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="frame-marks text-brand-primary/50">
            <div className="relative overflow-hidden rounded-md border border-brand-border bg-brand-bg px-6 py-14 sm:px-12 lg:px-16">
            <div aria-hidden="true" className="drafting-grid pointer-events-none absolute inset-0 [--grid-fade:radial-gradient(ellipse_at_right,transparent,var(--color-brand-bg)_70%)]" />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-7">
                <h2 className="font-display text-3xl md:text-4xl font-bold leading-[1.05] tracking-[-0.015em] text-brand-text [font-stretch:90%]">
                  ¿Tienes un proyecto de pilotaje, anclajes o taludes?
                </h2>
                <p className="mt-4 max-w-[52ch] font-sans text-brand-muted leading-relaxed">
                  Envíanos el estudio de suelos y la ubicación de la obra y preparamos la cotización. Atendemos en Quito y en todo el Ecuador.
                </p>
              </div>
              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row lg:items-end xl:justify-end gap-4 whitespace-nowrap">
                <Link to="/contacto" className="btn-press group inline-flex items-center justify-center gap-2 bg-brand-amber hover:bg-brand-amber-dark text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded-sm hover:shadow-[0_14px_28px_-12px_rgba(141,75,0,0.55)]">
                  <MessageCircle size={20} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12 group-hover:scale-110" />
                  Cotiza tu proyecto
                </Link>
                <a href="tel:+593959564486" className="btn-press inline-flex items-center justify-center gap-2 bg-white border border-brand-border hover:border-brand-primary/40 text-brand-deep font-sans font-semibold tabular-nums px-6 py-4 rounded-sm">
                  <Phone size={18} />
                  (+593) 95 956 4486
                </a>
              </div>
            </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
