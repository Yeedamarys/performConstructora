/**
 * Technical-drawing primitives for the home page: a measuring rule that draws itself as a section
 * arrives, and framed photographs that turn in perspective with the scroll like a plate under a lamp.
 * Both respect prefers-reduced-motion (static, fully visible).
 */
import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { EASE_MASK, EASE_OUT, Stagger, StaggerItem, staggerChild, useReducedMotionSafe } from './motion';

/**
 * Page opening shared by the inner pages: sheet title + measuring rule, the H1 and its intro side by
 * side, and an optional spec line. Copy is passed in unchanged so each page keeps its SEO text.
 */
export function PageIntro({
  label,
  title,
  intro,
  specs,
}: {
  label?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  specs?: [ReactNode, ReactNode][];
}) {
  return (
    <section className="relative border-b border-brand-border">
      <div aria-hidden="true" className="drafting-grid pointer-events-none absolute inset-0 [--grid-fade:linear-gradient(to_bottom,transparent,var(--color-brand-bg))]" />
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:pt-16 lg:pb-20">
        <SectionRule label={label} className="mb-10" />
        <Stagger onMount delay={0.05} stagger={0.1} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 lg:items-end">
          <motion.h1
            variants={staggerChild}
            className="lg:col-span-7 font-display text-4xl sm:text-5xl xl:text-6xl font-bold leading-[0.98] tracking-[-0.02em] text-brand-deep [font-stretch:86%]"
          >
            {title}
          </motion.h1>
          {intro && (
            <motion.p variants={staggerChild} className="lg:col-span-5 max-w-[58ch] font-sans text-lg leading-relaxed text-brand-muted">
              {intro}
            </motion.p>
          )}
          {specs && specs.length > 0 && (
            <StaggerItem className="lg:col-span-12">
              <SpecList items={specs} />
            </StaggerItem>
          )}
        </Stagger>
      </div>
    </section>
  );
}

/** A row of labelled measurements: display-caps label, Plex Mono value with tabular figures. */
export function SpecList({ items, className }: { items: [ReactNode, ReactNode][]; className?: string }) {
  return (
    <dl className={`grid grid-cols-2 lg:grid-cols-4 gap-y-5 border-t border-brand-border pt-5 lg:divide-x lg:divide-brand-border ${className ?? ''}`}>
      {items.map(([label, value], i) => (
        <div key={i} className="pr-4 lg:px-5 lg:first:pl-0">
          <dt className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-muted">{label}</dt>
          <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-brand-text">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Section transition: a hairline rule with 8px / 64px ticks that draws left to right on entry,
 * with optional measurement labels at either end.
 */
export function SectionRule({
  start,
  end,
  label,
  className,
}: {
  start?: ReactNode;
  end?: ReactNode;
  /** Sheet title above the rule, like a drawing's title block (replaces eyebrow labels over headings). */
  label?: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotionSafe();
  return (
    <div className={`text-brand-primary/45 ${className ?? ''}`}>
      {label && (
        <motion.p
          className="mb-3 font-display text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted [font-stretch:90%]"
          initial={reduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          {label}
        </motion.p>
      )}
      <motion.div
        aria-hidden="true"
        className="measure-rule"
        initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
        whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 1.4, ease: EASE_MASK }}
      />
      {(start || end) && (
        <motion.div
          aria-hidden="true"
          className="mt-2 flex justify-between font-mono text-xs tabular-nums text-brand-muted"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.9 }}
        >
          <span>{start}</span>
          <span>{end}</span>
        </motion.div>
      )}
    </div>
  );
}

/**
 * A photograph inside registration marks. It wipes in from the bottom once, then, while it crosses
 * the viewport, the plate tips back in 3D (rotateX) and the photo drifts inside it (parallax).
 */
export function DepthImage({
  src,
  srcSet,
  sizes,
  alt,
  className,
  caption,
  priority = false,
  reveal = !priority,
}: {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  /** Sizing of the frame, e.g. an aspect ratio class. */
  className?: string;
  /** Overlay bar along the bottom edge (labels, measurements). */
  caption?: ReactNode;
  priority?: boolean;
  /** Wipe-in on first view. Off for photos visible on load, so the wipe never delays LCP. */
  reveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -8]);
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.06, 1.14]);

  return (
    <div ref={ref} className="frame-marks text-brand-primary/50 [perspective:1400px]">
      <motion.div
        className={`relative overflow-hidden rounded-md bg-gray-200 shadow-[0_24px_48px_-28px_rgba(0,77,98,0.45)] ${className ?? ''}`}
        style={reduce ? undefined : { rotateX, transformOrigin: '50% 100%' }}
        initial={reduce || !reveal ? false : { clipPath: 'inset(100% 0 0 0)' }}
        whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.2, ease: EASE_MASK }}
      >
        <motion.img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? undefined : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          className="absolute inset-0 h-full w-full object-cover"
          style={reduce ? undefined : { y, scale }}
        />
        {caption && (
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-brand-text/75 via-brand-text/25 to-transparent px-5 pb-4 pt-12 text-white">
            {caption}
          </div>
        )}
      </motion.div>
    </div>
  );
}
