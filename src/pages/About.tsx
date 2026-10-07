import { CheckCircle2, Hammer, Activity, Shield, Target, Eye } from 'lucide-react';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Counter, EASE_OUT, Reveal } from '../components/motion';
import { DepthImage, PageIntro, SectionRule } from '../components/frame';
import { cld, cldSrcSet } from '../seo/cloudinary';

const ABOUT_PHOTO = 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979976/p1f1.png';

/** Purpose figures, read as a spec sheet rather than a hero-metric block. */
const purposeFigures: { label: string; value: ReactNode }[] = [
  { label: 'Sondeos y pilotes ejecutados', value: <Counter value={350} suffix="+" /> },
  { label: 'Flota mecánica continua', value: <Counter value={100} suffix="%" /> },
  { label: 'Conformidades estructurales', value: '0 NO' },
];

const statements = [
  {
    icon: Target,
    title: 'Misión',
    note: 'Perfor Construcciones',
    role: 'Propósito Corporativo',
    lead: 'Nuestro Compromiso',
    strong:
      'En Perfor Construcciones brindamos soluciones especializadas en pilotaje, estabilización de taludes y construcciones de obra civil, ejecutando cada proyecto con calidad, seguridad y responsabilidad.',
    body: 'Comprometidos en satisfacer las necesidades de nuestros clientes, contamos con un grupo capacitado, maquinaria especializada en el área de ejecución y experiencia para cumplir con los plazos establecidos.',
    values: ['Calidad', 'Seguridad', 'Responsabilidad'],
    footer: ['Grupo Capacitado & Maquinaria Especializada', 'Cumplimiento de Plazos'],
    from: -1,
  },
  {
    icon: Eye,
    title: 'Visión',
    note: 'Horizonte 2030',
    role: 'Proyección Estratégica',
    lead: 'Nuestra Meta',
    strong:
      'Ser una empresa líder y reconocida a nivel nacional en el sector de la construcción especializada en pilotaje, estabilización de taludes y construcciones de obra civil, destacándonos por la excelencia técnica, innovación, seguridad y confianza de nuestros clientes.',
    body: 'Buscamos un crecimiento sostenible que nos permita participar en los principales proyectos de infraestructura del país, generando valor para nuestros colaboradores y clientes.',
    values: ['Excelencia Técnica', 'Innovación', 'Confianza'],
    footer: ['Liderazgo Nacional en Construcción Especializada', 'Crecimiento Sostenible'],
    from: 1,
  },
];

const advantages = [
  {
    icon: Hammer,
    area: 'Equipamiento Industrial',
    title: 'Maquinaria propia de perforación continua',
    text: 'Disponibilidad inmediata sin dependencia de subarrendamientos. Contamos con torres de perforación de hélice continua (CFA), martillos de fondo y equipos de inyección de alta presión propios.',
    points: ['Torres hidráulicas de orugas autopropulsadas', 'Cero retrasos por flete o intermediación'],
    spec: ['Disponibilidad', '100% Flota Activa'],
  },
  {
    icon: Activity,
    area: 'Metodología y Calidad',
    title: 'Certificación y ensayos de carga',
    text: 'Validación empírica en laboratorio y campo. Ensayos PIT (Pile Integrity Test), pruebas de carga estática y ensayos de tracción en anclajes para garantizar solvencia.',
    points: ['Ensayos PIT de integridad sónica no destructiva', 'Informes geotécnicos con curvas deformación'],
    spec: ['Protocolos ASTM', 'ASTM D1143 / D5882'],
  },
  {
    icon: Shield,
    area: 'Marco Legal Vinculante',
    title: 'Cumplimiento estricto de cronogramas y normativa NEC-SE-DS',
    text: 'Diseño sismorresistente acorde a la Norma Ecuatoriana de la Construcción. Compromiso de penalización cero por desfase de cronograma de ruta crítica.',
    points: ['Zonificación de aceleración espectral', 'Monitoreo continuo de bermas y asentamientos'],
    spec: ['Estándar Vial', '100% Auditable'],
  },
];

export default function About() {
  return (
    <div className="bg-brand-bg w-full">
      <PageIntro
        label="Ingeniería Estructural Subterránea"
        title={
          <>
            ¿QUIÉNES SOMOS?{' '}
            <span className="mt-3 block text-2xl sm:text-3xl font-medium leading-tight tracking-[-0.01em] text-brand-primary [font-stretch:92%]">
              — Expertos en Pilotaje y Geotecnia
            </span>
          </>
        }
        intro="Más de una década ejecutando soluciones de perforación profunda, estabilización de taludes críticos y cimentación especial con rigor analítico y respaldo instrumental en el territorio ecuatoriano."
      />

      {/* Founding purpose: framed site photo beside the statement and its figures */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <DepthImage
              src={cld(ABOUT_PHOTO, { w: 1200 })}
              srcSet={cldSrcSet(ABOUT_PHOTO)}
              sizes="(min-width: 1440px) 780px, (min-width: 1024px) 55vw, 100vw"
              alt="Equipo de Perfor Construcciones en obra"
              className="aspect-[4/3]"
              // Visible on load on phones: it is the LCP, so no lazy load and no wipe.
              priority
              caption={
                <span className="font-display text-xs font-semibold uppercase tracking-[0.14em] [font-stretch:88%]">
                  Estratigrafía Típica de Operación en Suelos Andinos y Costa
                </span>
              }
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <SectionRule label="Propósito Fundacional" className="mb-6" />
            <p className="max-w-[60ch] font-sans text-lg leading-relaxed text-brand-text">
              Perfor Construcciones fue creada para desarrollar y ejecutar proyectos de pilotaje, estabilización de taludes y construcciones de obra civil, satisfaciendo la necesidad de nuestros clientes con soluciones técnicas confiables, innovación y cumplimiento de plazos establecidos. Aportando experiencia y conocimiento técnico que generan confianza, valor y bienestar para nuestros clientes, colaboradores y la comunidad, impulsando el crecimiento del país a través de obras de excelencia.
            </p>
            <dl className="mt-8 divide-y divide-brand-border border-y border-brand-border">
              {purposeFigures.map(({ label, value }) => (
                <div key={label} className="flex items-baseline justify-between gap-6 py-3">
                  <dt className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">{label}</dt>
                  <dd className="font-mono text-2xl font-medium tabular-nums text-brand-deep">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Mission & vision: two plates that swing in from their outer edges */}
      <section className="bg-white border-y border-brand-border py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionRule label="Identidad Corporativa" className="mb-10" />
          <Reveal className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-end">
            <h2 className="lg:col-span-7 font-display text-3xl md:text-4xl font-bold leading-[1.02] tracking-[-0.015em] text-brand-deep [font-stretch:88%]">
              Misión y Visión en Obras de Pilotaje y Contención
            </h2>
            <p className="lg:col-span-5 max-w-[58ch] font-sans text-brand-muted leading-relaxed">
              Nuestros principios fundamentales guían cada proyecto que ejecutamos, definiendo quiénes somos hoy y hacia dónde nos proyectamos como empresa líder en construcción especializada.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 [perspective:1600px]">
            {statements.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.title}
                  className={`frame-marks text-brand-primary/50 ${s.from < 0 ? 'origin-left' : 'origin-right'}`}
                  initial={{ opacity: 0, x: 36 * s.from, rotateY: -14 * s.from }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: EASE_OUT, delay: i * 0.1 }}
                >
                  <div className="h-full rounded-md border border-brand-border bg-brand-bg p-8 lg:p-10">
                    <header className="flex items-start justify-between gap-6 border-b border-brand-border pb-6">
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-brand-border bg-white text-brand-primary">
                          <Icon size={24} strokeWidth={1.75} />
                        </span>
                        <div>
                          <h3 className="font-display text-3xl font-bold leading-none tracking-[-0.015em] text-brand-text [font-stretch:88%]">{s.title}</h3>
                          <p className="mt-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary">{s.role}</p>
                        </div>
                      </div>
                      <span className="shrink-0 font-mono text-sm tabular-nums text-brand-muted">{s.note}</span>
                    </header>

                    <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">{s.lead}</p>
                    <p className="mt-2 max-w-[62ch] font-sans font-semibold leading-relaxed text-brand-text">{s.strong}</p>
                    <p className="mt-3 max-w-[62ch] font-sans text-brand-muted leading-relaxed">{s.body}</p>

                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Valores">
                      {s.values.map((v) => (
                        <li key={v} className="rounded-sm border border-brand-border bg-white px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.1em] text-brand-muted">
                          {v}
                        </li>
                      ))}
                    </ul>

                    <footer className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-brand-border pt-4">
                      <span className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">{s.footer[0]}</span>
                      <span className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary">
                        <CheckCircle2 size={14} className="shrink-0" /> {s.footer[1]}
                      </span>
                    </footer>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advantages: a datasheet, one row per advantage, with its standard in the margin */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionRule label="Diferenciales Técnicos en Terreno" className="mb-10" />
          <Reveal className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-end">
            <h2 className="lg:col-span-7 font-display text-3xl md:text-4xl font-bold leading-[1.02] tracking-[-0.015em] text-brand-deep [font-stretch:88%]">
              Ventajas Competitivas en Anclajes, Taludes y Perforación
            </h2>
            <p className="lg:col-span-5 max-w-[58ch] font-sans text-brand-muted leading-relaxed">
              Nuestra infraestructura elimina intermediarios y asegura que cada ensayo, pilote y perforación responda con precisión matemática ante las auditorías de fiscalización.
            </p>
          </Reveal>

          <div className="border-t border-brand-border">
            {advantages.map((a, i) => {
              const Icon = a.icon;
              return (
                <Reveal key={a.title} delay={i * 0.08} as="article" className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 border-b border-brand-border py-10">
                  <div className="lg:col-span-4 flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-brand-border bg-white text-brand-primary transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">{a.area}</p>
                      <h3 className="mt-1.5 font-display text-xl md:text-2xl font-bold leading-tight tracking-[-0.01em] text-brand-text [font-stretch:90%]">{a.title}</h3>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="max-w-[62ch] font-sans text-brand-muted leading-relaxed">{a.text}</p>
                    <ul className="mt-4 space-y-2">
                      {a.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 font-sans text-brand-text">
                          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brand-primary" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <dl className="lg:col-span-3 self-start lg:border-l lg:border-brand-border lg:pl-8">
                    <dt className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">{a.spec[0]}</dt>
                    <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-brand-deep">{a.spec[1]}</dd>
                  </dl>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
