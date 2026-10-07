import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EASE_OUT } from '../components/motion';
import { PageIntro, SectionRule } from '../components/frame';
import { FileText, User, Mail, Phone, MapPin, AlignLeft, Send, ShieldCheck, Zap, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const sidebarItem = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

const SERVICE_OPTIONS = ['Pilotes CFA', 'Micropilotes', 'Anclajes', 'Otros'];

/** One field style for the whole form: white well, hairline border, brand focus ring, AA placeholder. */
const FIELD =
  'w-full rounded-sm border border-brand-border bg-white px-4 py-3 font-sans text-brand-text placeholder:text-[#62696e] transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/25';
const LABEL = 'flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/administracion199@perforconstrucciones.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-brand-bg w-full">
      <PageIntro
        label="Asistencia Técnica Geotécnica"
        title="COTIZACIÓN DE PILOTAJE, ANCLAJES Y TALUDES"
        intro="Despliegue operativo a nivel nacional. Cotizaciones, estudios de suelo, licitaciones de consorcios e intervenciones de estabilización emergente."
      />

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* Form: a drawing sheet inside registration marks */}
          <motion.div
            className="lg:col-span-8 frame-marks text-brand-primary/50"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT, delay: 0.2 } }}
          >
            <div className="rounded-md border border-brand-border bg-white p-6 sm:p-10 lg:p-12 shadow-[0_24px_48px_-32px_rgba(0,77,98,0.35)]">
              <div className="flex items-start gap-4 mb-8 pb-6 border-b border-brand-border">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-brand-border bg-brand-bg text-brand-primary">
                  <FileText size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight tracking-[-0.01em] text-brand-text [font-stretch:90%]">
                    Formulario de Perforación en Suelo, Roca y Anclajes
                  </h2>
                  <p className="mt-1.5 font-sans text-brand-muted">Adjunta detalles estructurales para agilizar el análisis presupuestario.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_subject" value="Nuevo requerimiento geotécnico desde la web" />
                <input type="hidden" name="_template" value="table" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="c-nombre" className={LABEL}>
                      <User size={14} className="shrink-0 text-brand-primary" /> Nombre / Razón Social
                    </label>
                    <input id="c-nombre" type="text" name="nombre" required autoComplete="organization" className={FIELD} placeholder="Ej. Constructora Andina S.A." />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="c-email" className={LABEL}>
                      <Mail size={14} className="shrink-0 text-brand-primary" /> Correo Corporativo
                    </label>
                    <input id="c-email" type="email" name="email" required autoComplete="email" className={FIELD} placeholder="ingenieria@empresa.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="c-telefono" className={LABEL}>
                      <Phone size={14} className="shrink-0 text-brand-primary" /> Teléfono Directo
                    </label>
                    <input id="c-telefono" type="tel" name="telefono" required autoComplete="tel" className={`${FIELD} tabular-nums`} placeholder="+593 99 999 9999" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="c-ubicacion" className={LABEL}>
                      <MapPin size={14} className="shrink-0 text-brand-primary" /> Ubicación del Proyecto
                    </label>
                    <select id="c-ubicacion" name="ubicacion" required className={FIELD}>
                      <option value="">Seleccione zona de obra...</option>
                      <option value="quito">Pichincha / Quito</option>
                      <option value="sierra">Resto de Sierra</option>
                      <option value="costa">Costa</option>
                      <option value="amazonia">Amazonía</option>
                    </select>
                  </div>
                </div>

                <fieldset className="space-y-3">
                  <legend className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-text">Requerimiento Técnico Principal</legend>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {SERVICE_OPTIONS.map((option, i) => (
                      <label key={option} className="cursor-pointer">
                        <input type="radio" name="servicio" value={option} required={i === 0} className="peer sr-only" />
                        <span className="block rounded-sm border border-brand-border bg-white px-3 py-3.5 text-center font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-text transition-[border-color,background-color,box-shadow,transform] duration-200 hover:border-brand-primary/40 active:scale-[0.97] peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 peer-checked:text-brand-deep peer-checked:shadow-[inset_0_0_0_1px_var(--color-brand-primary)] peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="space-y-2">
                  <label htmlFor="c-descripcion" className={LABEL}>
                    <AlignLeft size={14} className="shrink-0 text-brand-primary" /> Descripción de Especificaciones (Opcional)
                  </label>
                  <textarea id="c-descripcion" name="descripcion" rows={4} className={`${FIELD} resize-y min-h-28`} placeholder="Breve descripción del estudio de suelos, cargas estimadas, tipo de talud, etc..."></textarea>
                </div>

                <div className="pt-6 border-t border-brand-border">
                  <p className="mb-6 flex items-center justify-center gap-2 rounded-sm border border-brand-border bg-brand-bg p-3 text-center font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-muted">
                    <ShieldCheck size={16} className="shrink-0 text-brand-primary" />
                    Sus datos están protegidos bajo sigilo técnico comercial.
                  </p>
                  <AnimatePresence mode="wait">
                    {status === 'success' && (
                      <motion.div
                        key="ok"
                        role="status"
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                        className="mb-4 flex items-center gap-2 rounded-sm border border-green-200 bg-green-50 p-4 font-sans text-green-800"
                      >
                        <CheckCircle size={18} className="shrink-0" />
                        Mensaje enviado con éxito. Nos pondremos en contacto pronto.
                      </motion.div>
                    )}

                    {status === 'error' && (
                      <motion.div
                        key="err"
                        role="alert"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.45 }}
                        className="mb-4 flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 p-4 font-sans text-red-800"
                      >
                        <AlertCircle size={18} className="shrink-0" />
                        Hubo un error al enviar el mensaje. Inténtalo de nuevo o contáctanos por teléfono.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-press group flex w-full items-center justify-center gap-2 rounded-sm bg-brand-deep px-6 py-4 font-display font-bold uppercase tracking-wider text-white hover:bg-brand-primary hover:shadow-[0_14px_28px_-12px_rgba(0,77,98,0.6)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <><Loader2 size={18} className="animate-spin" /> Procesando...</>
                    ) : (
                      <><Send size={18} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-0.5" /> Enviar Requerimiento a Oficina Técnica</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Sidebar: emergency line, head office sheet, map plate */}
          <motion.aside
            className="lg:col-span-4 space-y-8"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }}
          >
            <motion.div variants={sidebarItem} className="relative overflow-hidden rounded-md bg-brand-amber p-6 text-white shadow-[0_20px_40px_-24px_rgba(141,75,0,0.7)]">
              <Zap size={100} aria-hidden="true" className="absolute -bottom-6 -right-6 text-white opacity-10" />
              <div className="relative">
                <p className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.12em]">
                  <span className="h-2 w-2 rounded-full bg-white motion-safe:animate-pulse" aria-hidden="true" />
                  Respuesta Inmediata
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white [font-stretch:90%]">EMERGENCIA GEOTÉCNICA</h3>
                <p className="mt-3 mb-6 font-sans text-white/90">¿Contención de talud urgente o perforación no planificada? Contacto directo con el Director Técnico de Guardia.</p>
                <a href="tel:+593959564486" className="btn-press group flex w-full items-center justify-center gap-2 rounded-sm bg-white px-4 py-3 font-display text-sm font-bold uppercase tracking-wider text-brand-text hover:bg-gray-50 hover:shadow-[0_10px_22px_-10px_rgba(0,0,0,0.35)]">
                  <Phone size={16} className="text-brand-amber transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" /> Llamar Urgencia Geotécnica
                </a>
                <p className="mt-4 text-center font-display text-xs font-semibold uppercase tracking-[0.12em] text-white/80">Línea operativa 24/7</p>
              </div>
            </motion.div>

            <motion.div variants={sidebarItem}>
              <SectionRule label="Sede Matriz" className="mb-5" />
              <dl className="divide-y divide-brand-border border-b border-brand-border">
                <div className="py-4">
                  <dt className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">Ubicación</dt>
                  <dd className="mt-1 font-sans font-semibold text-brand-text">Sector Solanda.</dd>
                  <dd className="font-sans text-brand-muted">Cusumasa & Avenida Teniente Hugo Ortiz</dd>
                </div>
                <div className="py-4">
                  <dt className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">Teléfono</dt>
                  <dd className="mt-1">
                    <a href="tel:+593959564486" className="font-mono font-medium tabular-nums text-brand-text hover:text-brand-primary">(+593) 95 956 4486</a>
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">Email</dt>
                  <dd className="mt-1">
                    <a href="mailto:administracion199@perforconstrucciones.com" className="font-sans text-brand-primary [overflow-wrap:anywhere] hover:underline underline-offset-4">
                      administracion199@perforconstrucciones.com
                    </a>
                  </dd>
                </div>
              </dl>
            </motion.div>

            <motion.figure variants={sidebarItem} className="frame-marks text-brand-primary/50">
              <div className="aspect-[4/3] overflow-hidden rounded-md border border-brand-border bg-gray-200">
                <iframe
                  title="Ubicación de Operaciones Centrales"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4909.29402520863!2d-78.53447322417767!3d-0.2655708353640596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d598faad2727ad%3A0x85a09a8b9f864b29!2sCusumasa%20%26%20Avenida%20Teniente%20Hugo%20Ortiz%2C%20170148%20Quito!5e1!3m2!1ses!2sec!4v1788878221798!5m2!1ses!2sec"
                  className="h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <figcaption className="mt-3 flex justify-between font-mono text-xs tabular-nums text-brand-muted">
                <span>0.2656° S · 78.5345° O</span>
                <span>Quito</span>
              </figcaption>
            </motion.figure>

            <motion.div variants={sidebarItem} className="flex items-start gap-4 border-t border-brand-border pt-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-brand-border bg-white text-brand-primary">
                <ShieldCheck size={18} strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">Respaldo Operativo Inmediato</p>
                <h4 className="mt-1 font-display font-bold text-brand-text">Sin Intermediarios</h4>
                <p className="mt-1 font-sans text-sm leading-relaxed text-brand-muted">Movilización de perforadoras de gran diámetro y grúas 24/7 a Costa, Sierra y Amazonía sin intermediarios logísticos.</p>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </section>
    </div>
  );
}
