import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { EASE_OUT, MaskReveal, Reveal, Stagger, StaggerItem, TiltCard, TiltLayer, staggerChild } from '../components/motion';
import DrillHero from '../components/hero/DrillHero';
import { serviceHref } from '../data/services';
import { cld, cldSrcSet } from '../seo/cloudinary';

const services = [
  {
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/cimentaci%C3%B3nPrimaria.png',
    slug: 'pilotaje-barrenado',
    alt: 'Cimentación primaria con pilotaje prebarrenado CFA',
    tag: 'Cimentación Primaria',
    title: 'Pilotaje Prebarrenado CFA',
    text: 'Ejecución continua de pilotes de gran diámetro para edificaciones de altura y viaductos. Perforación con inyección simultánea de hormigón que minimiza la descompresión del suelo andino.',
  },
  {
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/hincado.png',
    slug: 'hincado-vibrohincado-pilotes',
    alt: 'Hincado y vibrohincado de pilotes y tablestacas',
    tag: 'Refuerzo Estructural',
    title: 'Hincado y Vibrohincado de pilotes y tablestacas',
    text: 'Soluciones de soporte en espacios confinados, submuraciones de edificios patrimoniales e inyecciones de lechada a alta presión para mejorar la capacidad portante del estrato base.',
  },
  {
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979975/anclajes.png',
    slug: 'anclajes-muros-pantalla',
    alt: 'Anclajes para muros pantalla de hormigón',
    tag: 'Contención Profunda',
    title: 'Anclajes para muros pantalla de hormigón',
    text: 'Sistemas integrales de contención perimetral para sótanos de gran profundidad en áreas urbanas densas, previniendo asentamientos en predios e infraestructura vecina.',
  },
  {
    image: 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979978/taludes.png',
    slug: 'estabilizacion-taludes',
    alt: 'Estabilización de taludes',
    tag: 'Mitigación de Riesgo',
    title: 'Estabilización de Taludes',
    text: 'Blindaje geotécnico en laderas y cortes viales mediante hormigón lanzado por vía húmeda (shotcrete), colocación de malla electrosoldada, colocación de geomanto y malla triple torsión. Especialistas en perforación en suelo, perforación en roca y drenes californianos subhorizontales.',
  },
];

export default function Home() {
  return (
    <div className="bg-brand-bg w-full">
      {/* Hero Section: text column; DrillHero supplies the section, pinning and visual */}
      <DrillHero>
          <Stagger onMount stagger={0.1} delay={0.1} className="space-y-8 lg:col-span-7 xl:col-span-6 break-words">
            <StaggerItem className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-brand-border rounded-full shadow-sm">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-brand-amber animate-ping opacity-60" />
                <span className="relative w-2 h-2 rounded-full bg-brand-amber" />
              </span>
              <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">Ingeniería Geotécnica & Cimentaciones Profundas - Ecuador</span>
            </StaggerItem>
            <motion.h1 variants={staggerChild} className="text-3xl sm:text-4xl lg:text-4xl font-display font-bold text-brand-text leading-[1.15] tracking-tight">
              Perfor Construcciones<br/>
              <span className="text-brand-primary text-2xl sm:text-3xl lg:text-3xl font-semibold">Pilotaje, Anclajes y Estabilización de Taludes en Quito, Ecuador</span>
            </motion.h1>

            <motion.p variants={staggerChild} className="text-lg text-brand-muted font-sans max-w-xl text-justify">
              Soluciones de perforación, pilotaje y estabilización de taludes con experiencia técnica comprobada en proyectos de infraestructura civil en todo el Ecuador.
            </motion.p>

            <StaggerItem className="flex flex-col sm:flex-row gap-4">
              <Link to="/contacto" className="btn-press group inline-flex items-center justify-center gap-2 bg-brand-amber hover:bg-brand-amber-dark text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded shadow-[0_2px_4px_rgba(42,107,130,0.04)] hover:shadow-[0_14px_28px_-12px_rgba(141,75,0,0.55)]">
                <MessageCircle size={20} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12 group-hover:scale-110" />
                Cotiza tu proyecto
              </Link>
              <Link to="/servicios" className="btn-press group inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-brand-border hover:border-brand-primary/40 text-brand-deep font-display font-bold uppercase tracking-wider px-6 py-4 rounded">
                Ver nuestros servicios
                <ArrowRight size={20} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
              </Link>
            </StaggerItem>
          </Stagger>
      </DrillHero>

      {/* Services Section */}
      <section className="bg-white border-t border-brand-border py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
            <Reveal>
              <div className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest mb-3">Capacidades Operativas Especializadas</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#006781] max-w-xl">PILOTAJE, ANCLAJES Y PERFORACIÓN EN SUELO Y ROCA</h2>
            </Reveal>
            <Reveal delay={0.1} as="p" className="font-sans text-brand-muted max-w-md lg:text-right text-justify">
              Equipamiento de alto rendimiento operado bajo rigurosos protocolos geotécnicos para garantizar la estabilidad de superestructuras.
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8" stagger={0.12}>
            {services.map((service, i) => (
              <StaggerItem key={service.title} className="h-full">
                <TiltCard className="h-full bg-brand-bg rounded-lg border border-brand-border overflow-hidden group">
                <Link to={serviceHref(service.slug)} className="flex h-full flex-col">
                <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                  <MaskReveal delay={(i % 2) * 0.12}>
                    <TiltLayer depth={-9} className="absolute -inset-3">
                      <img
                        src={cld(service.image, { w: 1200 })}
                        srcSet={cldSrcSet(service.image)}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        alt={service.alt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </TiltLayer>
                  </MaskReveal>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <TiltLayer depth={7}>
                    <motion.span
                      className="font-display font-bold text-[10px] bg-white text-brand-text px-3 py-1 uppercase tracking-widest rounded"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.7 + (i % 2) * 0.12 }}
                    >
                      {service.tag}
                    </motion.span>
                    </TiltLayer>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-display font-bold text-2xl text-brand-text mb-3 transition-colors duration-300 group-hover:text-brand-primary">{service.title}</h3>
                  <p className="font-sans text-sm text-brand-muted mb-6 text-justify">{service.text}</p>
                  <span className="inline-flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-widest text-brand-primary transition-colors group-hover:text-brand-amber">
                    Ver servicio
                    <ArrowRight size={16} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                  </span>
                </div>
                </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
