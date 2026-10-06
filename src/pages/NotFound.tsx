import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Home, MessageCircle } from 'lucide-react';
import { serviceHref, servicesData } from '../data/services';
import { Stagger, StaggerItem, staggerChild } from '../components/motion';

/** Shown for unknown URLs; the server answers the same URLs with HTTP 404 and noindex. */
export default function NotFound() {
  return (
    <div className="bg-brand-bg w-full">
      <Stagger onMount stagger={0.08} delay={0.05} className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <motion.h1 variants={staggerChild} className="max-w-2xl text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-brand-text leading-[1.1]">
          Página no encontrada
        </motion.h1>
        <motion.p variants={staggerChild} className="mt-5 max-w-xl text-lg text-brand-muted font-sans">
          La dirección que buscas no existe o fue movida. Estos accesos te llevan a lo que la mayoría de visitantes necesita:
        </motion.p>

        <StaggerItem className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link to="/" className="btn-press group inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-brand-border hover:border-brand-primary/40 text-brand-deep font-display font-bold uppercase tracking-wider px-6 py-4 rounded">
            <Home size={18} />
            Volver al inicio
          </Link>
          <Link to="/contacto" className="btn-press group inline-flex items-center justify-center gap-2 bg-brand-amber hover:bg-brand-amber-dark text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded hover:shadow-[0_14px_28px_-12px_rgba(141,75,0,0.55)]">
            <MessageCircle size={18} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12 group-hover:scale-110" />
            Cotiza tu proyecto
          </Link>
        </StaggerItem>

        <StaggerItem className="mt-14 max-w-3xl">
          <h2 className="font-display font-bold text-lg text-brand-text mb-4">Nuestros servicios</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {servicesData.map((s) => (
              <li key={s.slug}>
                <Link
                  to={serviceHref(s.slug)}
                  className="card-lift group flex items-center justify-between gap-3 rounded-lg border border-brand-border bg-white px-4 py-3 font-sans text-sm font-semibold text-brand-text hover:text-brand-amber"
                >
                  {s.title}
                  <ArrowRight size={16} className="shrink-0 text-brand-primary transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/proyectos"
                className="card-lift group flex items-center justify-between gap-3 rounded-lg border border-brand-border bg-white px-4 py-3 font-sans text-sm font-semibold text-brand-text hover:text-brand-amber"
              >
                Proyectos ejecutados
                <ArrowRight size={16} className="shrink-0 text-brand-primary transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
