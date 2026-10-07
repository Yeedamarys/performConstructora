import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/motion';
import { DepthImage, PageIntro } from '../components/frame';
import { serviceHref, servicesData } from '../data/services';
import { cld, cldSrcSet } from '../seo/cloudinary';

const services = servicesData;

export default function Services() {
  return (
    // App already renders the page's <main>; this is the page body.
    <div className="bg-brand-bg">
      <PageIntro
        title="SERVICIOS DE PILOTAJE, ANCLAJES Y ESTABILIZACIÓN DE TALUDES"
        intro="Soluciones técnicas para cimentaciones, contención y estabilización, ejecutadas con parámetros definidos y normativa aplicable."
      />

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-16 lg:gap-y-24">
          {services.map((service, i) => {
            const href = serviceHref(service.slug);
            // An odd last plate sits centred under the pair above it instead of alone on the left.
            const lone = services.length % 2 === 1 && i === services.length - 1;
            return (
              <article key={service.slug} className={`flex flex-col ${lone ? 'md:col-span-2 md:w-[calc(50%-1.25rem)] lg:w-[calc(50%-2rem)] md:justify-self-center' : ''} ${i % 2 === 1 ? 'md:mt-16' : ''}`}>
                <Link to={href} tabIndex={-1} aria-hidden="true" className="block">
                  <DepthImage
                    src={cld(service.image, { w: 1200 })}
                    srcSet={cldSrcSet(service.image)}
                    sizes="(min-width: 1440px) 672px, (min-width: 768px) 50vw, 100vw"
                    alt={service.alt}
                    className="aspect-[16/10]"
                    priority={i < 2}
                    caption={
                      <>
                        <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] [font-stretch:88%]">{service.category}</span>
                        <span className="shrink-0 font-mono text-sm tabular-nums">{service.menu.spec}</span>
                      </>
                    }
                  />
                </Link>

                <Reveal delay={0.1} className="mt-6 flex flex-grow flex-col">
                  <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight tracking-[-0.01em] text-brand-text [font-stretch:90%]">
                    <Link to={href} className="transition-colors hover:text-brand-primary">
                      {service.title}
                    </Link>
                  </h2>
                  {service.description && (
                    <p className="mt-3 max-w-[62ch] font-sans text-brand-muted leading-relaxed">{service.description}</p>
                  )}
                  <dl className="mt-5 divide-y divide-brand-border border-y border-brand-border text-sm">
                    {service.details.map(([label, detail]) => (
                      <div key={label} className="flex items-baseline justify-between gap-6 py-2.5">
                        <dt className="shrink-0 font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">{label}</dt>
                        <dd className="text-right font-mono tabular-nums text-brand-text">{detail}</dd>
                      </div>
                    ))}
                  </dl>
                  {/* mt-auto pins the link to the bottom so neighbouring plates line up */}
                  <Link
                    to={href}
                    className="group mt-auto pt-6 inline-flex items-center gap-2 self-start font-display text-sm font-bold uppercase tracking-[0.12em] text-brand-primary transition-colors hover:text-brand-amber"
                    aria-label={`Ver servicio: ${service.title}`}
                  >
                    Ver servicio
                    <ArrowRight size={16} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
