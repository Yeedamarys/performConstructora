import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useTransform, type PanInfo } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { EASE_OUT } from './motion';
import { cld } from '../seo/cloudinary';

export interface LightboxItem {
  src: string;
  alt: string;
  title: string;
  service: string;
  href: string;
}

/** Shared-element id used by both the gallery thumbnail and the open lightbox image. */
export const galleryLayoutId = (src: string) => `gallery-${src}`;

const SWIPE_DISTANCE = 80;
const SWIPE_VELOCITY = 500;
const DISMISS_DISTANCE = 120;

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: `${dir * 38}%`, rotateY: dir * -48, scale: 0.92 }),
  center: { opacity: 1, x: '0%', rotateY: 0, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
  exit: (dir: number) => ({
    opacity: 0,
    x: `${dir * -38}%`,
    rotateY: dir * 48,
    scale: 0.92,
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] as const },
  }),
};

export default function Lightbox({
  items,
  index,
  ratios,
  onIndex,
  onClose,
}: {
  items: LightboxItem[];
  index: number;
  ratios: Map<string, number>;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const item = items[index];
  const [dir, setDir] = useState(0);
  // The opening image flies in from its thumbnail; once the visitor navigates,
  // later images arrive by 3D rotation and leave with a fade instead.
  const [navigated, setNavigated] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dragY = useMotionValue(0);
  const backdropOpacity = useTransform(dragY, [0, 260], [1, 0.35]);

  const go = useCallback(
    (step: number) => {
      if (items.length < 2) return;
      setDir(step);
      setNavigated(true);
      onIndex((index + step + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  // Keyboard, focus trap and scroll lock.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab' && dialogRef.current) {
        const f = [...dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]')];
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // Runs once per open: move focus in, lock scroll, give focus back on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (Math.abs(offset.y) > Math.abs(offset.x)) {
      if (offset.y > DISMISS_DISTANCE || velocity.y > SWIPE_VELOCITY) onClose();
      return;
    }
    if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) go(1);
    else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) go(-1);
  };

  const ratio = ratios.get(item.src) ?? 4 / 3;

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de proyectos: ${item.title}`}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4 sm:p-10"
    >
      <motion.div
        className="absolute inset-0 bg-[#071a21]/92"
        style={{ opacity: backdropOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        onClick={onClose}
      />

      {/* Stage: perspective gives the 3D turn between images its depth */}
      <div className="relative flex w-full flex-1 items-center justify-center [perspective:1600px]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={item.src}
            custom={dir}
            variants={slide}
            initial={navigated ? 'enter' : false}
            animate="center"
            exit={navigated ? 'exit' : { opacity: 0, transition: { duration: 0.2 } }}
            className="relative"
            style={{ width: `min(92vw, calc(72vh * ${ratio}))`, aspectRatio: ratio }}
          >
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.55}
              onDragEnd={onDragEnd}
              style={{ y: dragY }}
              className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
            >
              <motion.div
                layoutId={navigated ? undefined : galleryLayoutId(item.src)}
                className="relative h-full w-full overflow-hidden rounded-lg shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
                transition={{ type: 'spring', stiffness: 260, damping: 32 }}
              >
                <motion.img
                  layout
                  src={cld(item.src, { w: 1600, crop: 'limit' })}
                  alt={item.alt}
                  draggable={false}
                  className="absolute inset-0 h-full w-full select-none object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Chrome */}
      <motion.div
        className="relative mt-5 flex w-full max-w-3xl items-center justify-between gap-4 text-white"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5, ease: EASE_OUT } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        <div className="min-w-0">
          <div className="text-[10px] font-display font-bold uppercase tracking-widest text-white/60">
            <span className="tabular-nums">{index + 1} / {items.length}</span> · {item.service}
          </div>
          <div className="truncate font-display font-bold text-base sm:text-lg">{item.title}</div>
        </div>
        <Link
          to={item.href}
          onClick={onClose}
          className="btn-press group hidden shrink-0 items-center gap-2 rounded bg-brand-amber px-4 py-2.5 font-display text-[10px] font-bold uppercase tracking-widest hover:bg-brand-amber-dark sm:inline-flex"
        >
          Ver ficha
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <motion.button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Cerrar galería"
        className="btn-press absolute right-4 top-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-brand-amber sm:right-6 sm:top-6"
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0, transition: { delay: 0.15, duration: 0.45, ease: EASE_OUT } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        <X size={22} />
      </motion.button>

      {items.length > 1 && (
        <>
          <motion.button
            type="button"
            onClick={() => go(-1)}
            aria-label="Imagen anterior"
            className="btn-press group absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-6 sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <ChevronLeft size={24} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => go(1)}
            aria-label="Imagen siguiente"
            className="btn-press group absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-6 sm:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            <ChevronRight size={24} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </motion.button>
          <p className="relative mt-3 text-[10px] font-display font-bold uppercase tracking-widest text-white/50 sm:hidden">
            Desliza para navegar · hacia abajo para cerrar
          </p>
        </>
      )}
    </motion.div>
  );
}
