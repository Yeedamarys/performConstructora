
import { motion } from 'motion/react';
import { EASE_OUT, MaskReveal, Reveal, Stagger, StaggerItem, TiltCard, TiltLayer } from '../components/motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceHref, servicesData } from '../data/services';
import { cld, cldSrcSet } from '../seo/cloudinary';

const detailList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } },
};
const detailItem = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

const services = servicesData;

export default function Services() {
  return (
    <main className="bg-brand-bg">
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
          <Reveal>
            <div className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest mb-3">
              Capacidades Operativas Especializadas
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-brand-text max-w-2xl">
               <span className="text-brand-primary font-semibold">SERVICIOS DE PILOTAJE, ANCLAJES Y ESTABILIZACIÓN DE TALUDES</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} as="p" className="font-sans text-brand-muted max-w-md lg:text-right text-justify">
            Soluciones técnicas para cimentaciones, contención y estabilización, ejecutadas con parámetros definidos y normativa aplicable.
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8" stagger={0.12}>
          {services.map((service, i) => (
            <StaggerItem key={service.title} className="h-full">
            <TiltCard className="h-full bg-white rounded-lg border border-brand-border overflow-hidden group">
            <Link to={serviceHref(service.slug)} className="flex h-full flex-col">
              <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                <MaskReveal delay={(i % 2) * 0.12}>
                  <TiltLayer depth={-9} className="absolute -inset-3">
                    <img
                      src={cld(service.image, { w: 1200 })}
                      srcSet={cldSrcSet(service.image)}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      alt={service.alt}
                      loading={i < 2 ? 'eager' : 'lazy'}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </TiltLayer>
                </MaskReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <TiltLayer depth={7}>
                    <motion.span
                      className="inline-block font-display font-bold text-[10px] bg-white text-brand-text px-3 py-1 uppercase tracking-widest rounded"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.7 + (i % 2) * 0.12 }}
                    >
                      {service.category}
                    </motion.span>
                  </TiltLayer>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <h2 className="font-display font-bold text-2xl text-brand-text mb-4 transition-colors duration-300 group-hover:text-brand-primary">{service.title}</h2>
                {service.description && (
                  <p className="font-sans text-sm text-brand-muted leading-relaxed mb-5 text-justify">{service.description}</p>
                )}
                <motion.dl
                  className="space-y-2.5 font-sans text-sm text-brand-muted leading-relaxed"
                  variants={detailList}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  {service.details.map(([label, detail]) => (
                    <motion.div key={label} variants={detailItem}>
                      <dt className="inline font-bold text-brand-text">{label}: </dt>
                      <dd className="inline">{detail}</dd>
                    </motion.div>
                  ))}
                </motion.dl>

                <span className="mt-6 inline-flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-widest text-brand-primary transition-colors group-hover:text-brand-amber">
                  Ver servicio
                  <ArrowRight size={16} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </main>
  );
}
