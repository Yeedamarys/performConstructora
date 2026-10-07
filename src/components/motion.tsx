import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type PointerEvent, type ReactNode } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * prefers-reduced-motion that is safe to hydrate. motion's useReducedMotion reads the device on the
 * client's first render, which differs from the prerendered HTML; this one hydrates with the server's
 * answer (no preference) and re-renders with the real one right after.
 */
export function useReducedMotionSafe() {
  return useSyncExternalStore(
    (onChange) => {
      const m = matchMedia(REDUCED_MOTION);
      m.addEventListener('change', onChange);
      return () => m.removeEventListener('change', onChange);
    },
    () => matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/** Confident deceleration used across the site. */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
/** Heavier curve for masks and large surfaces. */
export const EASE_MASK = [0.76, 0, 0.24, 1] as const;

const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Single block that rises into place when it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = 'div',
}: {
  children: ReactNode;
  key?: string | number;
  className?: string;
  delay?: number;
  y?: number;
  as?: 'div' | 'section' | 'article' | 'li' | 'p' | 'h1' | 'h2';
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    >
      {children}
    </Tag>
  );
}

const staggerParent = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_OUT } },
};

/** Parent that cascades its `StaggerItem` children on scroll (or on mount with `onMount`). */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  onMount = false,
}: {
  children: ReactNode;
  key?: string | number;
  className?: string;
  stagger?: number;
  delay?: number;
  onMount?: boolean;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent(stagger, delay)}
      initial="hidden"
      {...(onMount ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT })}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  key?: string | number;
  className?: string;
  as?: 'div' | 'article' | 'li';
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={staggerChild}>
      {children}
    </Tag>
  );
}

/**
 * Bore reveal: a window descends over the image like a drill going down,
 * while the image counter-moves so it appears fixed in place and settles from a slight zoom.
 * Pure transforms on two layers, so it stays on the compositor.
 * Must sit inside a positioned, overflow-hidden box.
 */
export function MaskReveal({
  children,
  delay = 0,
  duration = 1.1,
  inView = true,
  className = 'absolute inset-0',
}: {
  children: ReactNode;
  key?: string | number;
  delay?: number;
  duration?: number;
  inView?: boolean;
  className?: string;
}) {
  const transition = { duration, ease: EASE_MASK, delay };
  const trigger = inView
    ? { whileInView: 'shown', viewport: { once: true, amount: 0.25 } }
    : { animate: 'shown' };
  // The observed element must stay untransformed: a layer translated out of an
  // overflow-hidden parent is fully clipped and never reports as intersecting.
  return (
    <motion.div className={`${className} overflow-hidden`} initial="hidden" {...trigger}>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={{ hidden: { y: '-100%' }, shown: { y: '0%', transition } }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: { y: '100%', scale: 1.18 },
            shown: {
              y: '0%',
              scale: 1,
              transition: { ...transition, scale: { duration: duration + 0.5, ease: EASE_OUT, delay } },
            },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Number ticker that counts up once in view. Screen readers get the final value;
 * reduced-motion users see it immediately. Tabular numerals keep the width steady.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.8,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotionSafe();
  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;
  const [text, setText] = useState(() => format(reduce ? value : 0));

  useEffect(() => {
    if (reduce) {
      setText(format(value));
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setText(format(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`}>
      <span className="sr-only">{format(value)}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}

/* ---------- 3D tilt + parallax for cards ---------- */

const TiltContext = createContext<{ x: MotionValue<number>; y: MotionValue<number> } | null>(null);
const TILT_SPRING = { stiffness: 220, damping: 22, mass: 0.6 };

/**
 * Card that leans toward a mouse pointer (max ~5deg) and lifts. Touch and reduced-motion
 * users get the static card; children wrapped in `TiltLayer` drift at their own depth.
 */
export function TiltCard({
  children,
  className,
  max = 5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotionSafe();
  const px = useMotionValue(0); // -0.5 … 0.5
  const py = useMotionValue(0);
  const sx = useSpring(px, TILT_SPRING);
  const sy = useSpring(py, TILT_SPRING);
  const rotateY = useTransform(sx, (v) => v * max * 2);
  const rotateX = useTransform(sy, (v) => -v * max * 2);
  const glareX = useTransform(sx, (v) => (v + 0.5) * 100);
  const glareY = useTransform(sy, (v) => (v + 0.5) * 100);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 55%)`;
  const [hover, setHover] = useState(false);

  const move = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => {
    px.set(0);
    py.set(0);
    setHover(false);
  };

  return (
    <TiltContext.Provider value={{ x: sx, y: sy }}>
      <motion.article
        className={`card-tilt relative ${className ?? ''}`}
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onPointerMove={move}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
        onPointerLeave={leave}
      >
        {children}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-500"
            style={{ background: glare, opacity: hover ? 1 : 0 }}
          />
        )}
      </motion.article>
    </TiltContext.Provider>
  );
}

/** Layer inside a TiltCard that shifts opposite (negative depth) or with (positive) the tilt, in px. */
export function TiltLayer({
  children,
  depth,
  className,
}: {
  children: ReactNode;
  depth: number;
  className?: string;
}) {
  const ctx = useContext(TiltContext);
  const zero = useMotionValue(0);
  const x = useTransform(ctx?.x ?? zero, (v: number) => v * depth * 2);
  const y = useTransform(ctx?.y ?? zero, (v: number) => v * depth * 2);
  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
