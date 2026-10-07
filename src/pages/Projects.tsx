import { useMemo, useState } from 'react';
import { ArrowRight, Camera, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { PROJECT_CATEGORIES, projectName, projectsData, type Project, type ProjectCategory } from '../data/projects';
import { Counter, EASE_OUT } from '../components/motion';
import { DepthImage, PageIntro, SectionRule } from '../components/frame';
import Lightbox, { type LightboxItem } from '../components/Lightbox';
import { cld, cldSrcSet } from '../seo/cloudinary';

type Filter = 'todos' | ProjectCategory;

/** Cards shown per step; "Cargar más" adds the next batch (keeps a long portfolio fast). */
const PAGE = 9;

/** Alternate plate proportions so the grid reads as a contact sheet, not a row of identical tiles. */
const ASPECTS = ['aspect-[4/3]', 'aspect-[16/11]', 'aspect-[4/3]'];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('todos');
  const [shown, setShown] = useState(PAGE);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const projects = useMemo(
    () => (filter === 'todos' ? projectsData : projectsData.filter((p) => p.categories.includes(filter))),
    [filter],
  );
  const visible = useMemo(() => projects.slice(0, shown), [projects, shown]);

  // Every photo of the visible projects, in reading order, so the lightbox can step through them.
  const gallery: LightboxItem[] = useMemo(
    () =>
      visible.flatMap((p) =>
        p.images.map((img) => ({ src: img.src, alt: img.alt, title: projectName(p), service: p.service, href: `/proyectos/${p.slug}` })),
      ),
    [visible],
  );
  const openProject = (p: Project) => {
    const first = visible.slice(0, visible.indexOf(p)).reduce((n, q) => n + q.images.length, 0);
    setOpenIndex(first);
  };

  // Categories with no projects are hidden: a filter that leads to an empty grid is a dead end.
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'todos' as Filter, label: 'Todos', count: projectsData.length },
    ...PROJECT_CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.label, count: projectsData.filter((p) => p.categories.includes(c.id)).length })),
  ].filter((f) => f.id === 'todos' || f.count > 0);

  const choose = (f: Filter) => {
    setFilter(f);
    setShown(PAGE);
  };

  return (
    <div className="bg-brand-bg w-full">
      <PageIntro
        label="Portafolio Geotécnico Verificado"
        title="RESPALDO Y PROYECTOS DE PILOTAJE, ANCLAJES Y TALUDES"
        intro="Cada proyecto que ejecutamos cuenta con certificación oficial y acta de entrega - recepción de nuestros clientes. Obras de infraestructura vial, urbana e hidroeléctrica en todo el Ecuador."
        specs={[
          ['Obras Certificadas', <><Counter value={140} suffix="+" /> <span className="font-sans text-sm text-brand-muted">Actas</span></>],
          ['Profundidad Máxima', <><Counter value={35} decimals={1} /> <span className="font-sans text-sm text-brand-muted">Metros</span></>],
          ['Normativa Sísmica', 'NEC-15'],
          ['Cobertura Nacional', <><Counter value={24} /> <span className="font-sans text-sm text-brand-muted">Provincias</span></>],
        ]}
      />

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        {/* Filters: square segments with counts */}
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div role="group" aria-label="Filtrar proyectos por categoría" className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(f.id)}
                  className={`btn-press relative rounded-sm border px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                    active ? 'border-brand-deep text-white' : 'border-brand-border bg-white text-brand-muted hover:border-brand-primary/40 hover:text-brand-text'
                  }`}
                >
                  {active && (
                    <motion.span layoutId="project-filter" className="absolute inset-0 rounded-sm bg-brand-deep" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative">
                    {f.label} <span className={`font-mono tabular-nums ${active ? 'text-white/75' : 'text-brand-muted/80'}`}>{f.count}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <p className="font-mono text-sm tabular-nums text-brand-muted" aria-live="polite">
            {Math.min(shown, projects.length)} / {projects.length}
          </p>
        </div>

        {/* The grid re-mounts per filter: one quick rise instead of dozens of cards animating their layout.
            Not wrapped in AnimatePresence: inside a presence boundary the plates never ran their in-view wipe. */}
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } }}
          >
            {visible.length === 0 ? (
              <div className="frame-marks text-brand-primary/50">
                <div className="relative overflow-hidden rounded-md border border-brand-border bg-white px-6 py-16 text-center">
                  <div aria-hidden="true" className="drafting-grid pointer-events-none absolute inset-0" />
                  <p className="relative font-display text-2xl font-bold text-brand-text [font-stretch:90%]">Aún no hay proyectos publicados en esta categoría.</p>
                  {filter !== 'todos' && (
                    <button type="button" onClick={() => choose('todos')} className="relative mt-4 font-display text-sm font-bold uppercase tracking-[0.12em] text-brand-primary hover:text-brand-amber">
                      Ver todos los proyectos
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:[&>*:nth-child(3n+2)]:mt-16">
                {visible.map((p, i) => (
                  <ProjectPlate key={p.slug} project={p} aspect={ASPECTS[i % ASPECTS.length]} onOpen={() => openProject(p)} priority={i === 0} reveal={i >= 3} />
                ))}
              </div>
            )}
          </motion.div>

        {shown < projects.length && (
          <div className="mt-16">
            <SectionRule className="mb-6" />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShown((n) => n + PAGE)}
                className="btn-press inline-flex items-center gap-3 rounded-sm border border-brand-border bg-white px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.12em] text-brand-deep hover:border-brand-primary/40"
              >
                Cargar más proyectos
                <span className="font-mono font-medium tabular-nums text-brand-muted">+{Math.min(PAGE, projects.length - shown)}</span>
              </button>
            </div>
          </div>
        )}

        <AnimatePresence>
          {openIndex !== null && gallery[openIndex] && (
            <Lightbox key="lightbox" items={gallery} index={openIndex} ratios={new Map()} onIndex={setOpenIndex} onClose={() => setOpenIndex(null)} />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

/**
 * One project on the contact sheet. Built for real contracts, not demo ones: no photos yet, several
 * photos, very long public-works names and clients, open-ended dates.
 */
function ProjectPlate({
  project: p,
  aspect,
  onOpen,
  priority,
  reveal,
}: {
  project: Project;
  aspect: string;
  onOpen: () => void;
  /** The first plate can be the LCP on phones: load it eagerly at high priority. */
  priority: boolean;
  /** First row is visible on load on desktop: no wipe there, so it never delays LCP. */
  reveal: boolean;
}) {
  const name = projectName(p);
  const cover = p.images[0];
  const extra = p.images.length - 1;

  return (
    <article className="flex flex-col">
      {cover ? (
        <button type="button" onClick={onOpen} aria-label={`Ver fotos: ${name}`} className="block text-left focus-visible:outline-offset-8">
          <DepthImage
            src={cld(cover.src, { w: 800 })}
            srcSet={cldSrcSet(cover.src, [480, 640, 800, 1200])}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            alt={cover.alt}
            className={aspect}
            priority={priority}
            reveal={reveal}
            caption={
              <>
                <span className="min-w-0 font-mono text-sm leading-snug tabular-nums [overflow-wrap:anywhere]">{p.service}</span>
                {extra > 0 && (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-white/90 px-2 py-1 font-mono text-xs font-medium tabular-nums text-brand-text">
                    <Camera size={14} className="shrink-0" aria-hidden="true" />+{extra}
                  </span>
                )}
              </>
            }
          />
        </button>
      ) : (
        // No photos yet: a framed blank sheet that still carries the service, at the same proportions.
        <div className="frame-marks text-brand-primary/50">
          <div className={`relative flex flex-col justify-between overflow-hidden rounded-md border border-dashed border-brand-primary/40 bg-white p-5 ${aspect}`}>
            <div aria-hidden="true" className="drafting-grid pointer-events-none absolute inset-0" />
            <span className="relative inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">
              <Camera size={14} className="shrink-0" aria-hidden="true" /> Fotos en preparación
            </span>
            <span className="relative font-mono text-sm tabular-nums text-brand-text [overflow-wrap:anywhere]">{p.service}</span>
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-grow flex-col">
        <h2 className="font-display text-xl md:text-2xl font-bold leading-snug tracking-[-0.01em] text-brand-text [font-stretch:90%] [overflow-wrap:anywhere]">
          <Link to={`/proyectos/${p.slug}`} className="transition-colors hover:text-brand-primary">
            {name}
          </Link>
        </h2>
        {p.desc && <p className="mt-2 font-sans text-sm leading-relaxed text-brand-muted line-clamp-2">{p.desc}</p>}

        <dl className="mt-4 flex items-start justify-between gap-4 border-t border-brand-border pt-3">
          <div className="min-w-0 flex-1">
            <dt className="sr-only">Cliente</dt>
            <dd className="flex min-w-0 items-start gap-2 font-sans text-sm font-semibold text-brand-text">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand-primary" aria-hidden="true" />
              <span className="min-w-0 [overflow-wrap:anywhere]">{p.client}</span>
            </dd>
          </div>
          <div className="max-w-[45%] shrink-0 text-right">
            <dt className="sr-only">Fecha</dt>
            <dd className="font-mono text-sm tabular-nums text-brand-muted">{p.year}</dd>
          </div>
        </dl>

        <Link
          to={`/proyectos/${p.slug}`}
          className="group mt-4 inline-flex items-center gap-2 self-start font-display text-sm font-bold uppercase tracking-[0.12em] text-brand-primary transition-colors hover:text-brand-amber"
          aria-label={`Ver ficha: ${name}`}
        >
          Ver ficha
          <ArrowRight size={16} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
