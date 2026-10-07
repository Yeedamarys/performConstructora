import { Suspense, lazy, useEffect, useRef, useState, useSyncExternalStore, type MutableRefObject, type ReactNode, type RefObject } from 'react';
import { motion, useInView, useMotionValueEvent, useScroll } from 'motion/react';
import { ChevronsDown } from 'lucide-react';
import { EASE_MASK, MaskReveal, useReducedMotionSafe } from '../motion';
import { DEPTH_TICKS, MAX_DEPTH, STRATA } from './strata';
import type { SceneLabels } from './HeroScene';
import { cld, cldSrcSet } from '../../seo/cloudinary';

const HeroScene = lazy(() => import('./HeroScene'));

const HERO_PHOTO = 'https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979975/home.png';

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

/** Decide once, on the client, whether this device gets the live scene. */
type Capability = { webgl: boolean; lowEnd: boolean; coarse: boolean };

/** What the prerendered HTML assumes: the static photo hero. */
const SERVER_CAPABILITY: Capability = { webgl: false, lowEnd: true, coarse: false };
let clientCapability: Capability | undefined;
const noSubscribe = () => () => {};

/**
 * Hydrates with the server's answer (photo), then re-renders with the device's real one, so a
 * capable device swaps to the live scene after hydration instead of failing to hydrate.
 */
function useCapability() {
  return useSyncExternalStore(noSubscribe, () => (clientCapability ??= detectCapability()), () => SERVER_CAPABILITY);
}

function detectCapability(): Capability {
  if (typeof window === 'undefined') return SERVER_CAPABILITY;
  const nav = navigator as Nav;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const lowEnd =
    !!nav.connection?.saveData ||
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 3) ||
    (coarse && (nav.hardwareConcurrency ?? 8) <= 4);
  let webgl = false;
  try {
    const c = document.createElement('canvas');
    webgl = !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    webgl = false;
  }
  return { webgl, lowEnd, coarse };
}

function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && matchMedia(query).matches);
  useEffect(() => {
    const m = matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [query]);
  return match;
}

function useHeaderHeight() {
  const [h, setH] = useState(108);
  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;
    const ro = new ResizeObserver(() => setH(header.getBoundingClientRect().height));
    ro.observe(header);
    return () => ro.disconnect();
  }, []);
  return h;
}

/**
 * True once the 3D scene may download: after the page has loaded and the browser is idle,
 * or as soon as the visitor scrolls or touches the page. Until then the photo is the hero
 * (and the LCP), so the ~250 KB gzip scene never competes with the first paint.
 */
function useDeferredScene() {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (go) return;
    let cancelIdle = () => {};
    const start = () => setGo(true);
    // Safari has no requestIdleCallback; a short timeout after load is close enough.
    const whenIdle = () => {
      if (typeof requestIdleCallback === 'function') {
        const id = requestIdleCallback(start, { timeout: 4000 });
        cancelIdle = () => cancelIdleCallback(id);
      } else {
        const id = setTimeout(start, 2000);
        cancelIdle = () => clearTimeout(id);
      }
    };
    const events = ['scroll', 'pointerdown', 'keydown', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });
    return () => {
      events.forEach((e) => window.removeEventListener(e, start));
      window.removeEventListener('load', whenIdle);
      cancelIdle();
    };
  }, [go]);
  return go;
}

/** The site photo stands in for the scene until it is ready, then fades out. */
function HeroPoster({ hidden }: { hidden: boolean }) {
  return (
    <img
      src={cld(HERO_PHOTO, { w: 1200 })}
      srcSet={cldSrcSet(HERO_PHOTO)}
      sizes="(min-width: 1024px) 50vw, 100vw"
      alt=""
      fetchPriority="high"
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hidden ? 'opacity-0' : 'opacity-100'}`}
    />
  );
}

function StaticVisual() {
  return (
    <div className="relative frame-marks text-brand-primary/50">
      <motion.div
        className="aspect-[4/3] rounded-xl bg-gray-200 border border-brand-border shadow-[0_16px_32px_rgba(43,47,51,0.08)] overflow-hidden relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3 } }}
      >
        <MaskReveal inView={false} delay={0.25} duration={1.3}>
          <img
            src={cld(HERO_PHOTO, { w: 1200 })}
            srcSet={cldSrcSet(HERO_PHOTO)}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt="Equipo de perforación trabajando en obra"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        </MaskReveal>
      </motion.div>
      <motion.span
        aria-hidden="true"
        className="absolute -left-3 top-0 hidden h-full w-[3px] origin-top rounded-full bg-brand-amber sm:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1, transition: { duration: 1.3, ease: EASE_MASK, delay: 0.25 } }}
      />
    </div>
  );
}

function LiveVisual({ depthTarget, coarse, sceneRef }: {
  depthTarget: MutableRefObject<number>;
  coarse: boolean;
  sceneRef: RefObject<HTMLDivElement | null>;
}) {
  const labels = useRef<SceneLabels>({ ticks: [], names: [], tip: null, readout: null });
  const [ready, setReady] = useState(false);
  const [hintGone, setHintGone] = useState(false);
  const loadScene = useDeferredScene();
  const inView = useInView(sceneRef, { margin: '120px 0px' });
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const on = () => setPageVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', on);
    return () => document.removeEventListener('visibilitychange', on);
  }, []);
  useEffect(() => {
    if (hintGone) return;
    const id = setInterval(() => depthTarget.current > 1 && setHintGone(true), 250);
    return () => clearInterval(id);
  }, [depthTarget, hintGone]);

  return (
    <div
      ref={sceneRef}
      role="img"
      aria-label={`Ilustración: perfil de suelo con una hélice de pilotaje que perfora hasta ${MAX_DEPTH} m de profundidad`}
      className="relative h-full w-full overflow-hidden rounded-xl border border-brand-border bg-[linear-gradient(180deg,#e6eef3_0%,#f2f6fa_22%,#f7f9ff_100%)] shadow-[0_16px_32px_rgba(43,47,51,0.08)]"
    >
      <HeroPoster hidden={ready} />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {loadScene ? (
          <Suspense fallback={null}>
            <HeroScene
              depthTarget={depthTarget}
              labels={labels}
              active={inView && pageVisible}
              lowPower={coarse}
              onReady={() => setReady(true)}
            />
          </Suspense>
        ) : null}
      </motion.div>

      {/* Depth ruler, strata names and the live readout are DOM, pinned to the scene each frame */}
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
        {DEPTH_TICKS.map((m, i) => (
          <div
            key={m}
            ref={(el) => { labels.current.ticks[i] = el; }}
            className="absolute left-0 top-0 transition-opacity duration-300"
          >
            <div className="-translate-x-full -translate-y-1/2 flex items-center gap-1.5 pr-0.5">
              <span className="font-display text-[10px] font-bold tabular-nums tracking-wider text-brand-deep">{m} m</span>
              <span className="h-px w-3 bg-brand-deep/60" />
            </div>
          </div>
        ))}
        {STRATA.map((s, i) => (
          <div
            key={s.name}
            ref={(el) => { labels.current.names[i] = el; }}
            data-active="false"
            className="group/name absolute left-0 top-0 transition-opacity duration-300"
          >
            <span className="ml-3 block -translate-y-1/2 whitespace-nowrap rounded bg-white/85 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-brand-muted shadow-sm transition-colors duration-300 group-data-[active=true]/name:bg-brand-deep group-data-[active=true]/name:text-white">
              {s.name}
            </span>
          </div>
        ))}
        <div ref={(el) => { labels.current.tip = el; }} className="absolute left-0 top-0">
          <div className="-translate-y-1/2 flex items-center">
            <span className="h-px w-5 bg-brand-amber" />
            <span
              ref={(el) => { labels.current.readout = el; }}
              className="rounded bg-brand-amber px-2 py-1 font-display text-xs font-bold tabular-nums text-white shadow-[0_6px_14px_-6px_rgba(141,75,0,0.7)]"
            >
              0.0 m
            </span>
          </div>
        </div>
      </div>

      <span className={`pointer-events-none absolute left-3 bottom-3 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'} rounded bg-white/85 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-brand-muted`}>
        Perfil ilustrativo · máx. {MAX_DEPTH} m
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-3 top-3 hidden items-center gap-1 rounded bg-white/85 px-2 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-brand-deep transition-opacity duration-500 lg:flex ${hintGone ? 'opacity-0' : 'opacity-100'}`}
      >
        <ChevronsDown size={12} /> Desplázate para perforar
      </span>
    </div>
  );
}

/**
 * Hero with a scroll-driven drilling scene. Desktop pins the hero while the auger drills
 * 0 → 35 m; mobile drills as the scene crosses the viewport. Reduced motion, low-end
 * devices and no-WebGL get the original photo.
 */
export default function DrillHero({ children }: { children: ReactNode }) {
  const reduce = useReducedMotionSafe();
  const cap = useCapability();
  const live = !reduce && cap.webgl && !cap.lowEnd;
  const desktop = useMedia('(min-width: 1024px)');
  const headerH = useHeaderHeight();

  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const depthTarget = useRef(0);

  const pinned = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const flowing = useScroll({ target: sceneRef, offset: ['start 0.85', 'end 0.15'] });
  const progress = desktop ? pinned.scrollYProgress : flowing.scrollYProgress;
  useMotionValueEvent(progress, 'change', (v) => {
    // Reach full depth slightly before the pin releases so the end state is readable.
    depthTarget.current = Math.min(v / 0.88, 1) * MAX_DEPTH;
  });

  if (!live) {
    return (
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {children}
          <div className="relative lg:col-span-5 xl:col-span-6 mt-8 lg:mt-0">
            <StaticVisual />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative lg:h-[200svh]">
      <div
        className="lg:sticky"
        style={desktop ? { top: headerH, height: `calc(100svh - ${headerH}px)` } : undefined}
      >
        <div className="max-w-[1440px] h-full mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-8">
          <div className="grid h-full grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {children}
            <div className="relative frame-marks text-brand-primary/50 lg:col-span-5 xl:col-span-6 mt-8 lg:mt-0 aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:max-h-[760px]">
              <LiveVisual depthTarget={depthTarget} coarse={cap.coarse} sceneRef={sceneRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
