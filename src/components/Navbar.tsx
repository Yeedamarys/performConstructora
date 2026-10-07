import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity, ArrowRight, ChevronDown, ChevronRight, Drill, Layers, MessageCircle, Phone, ShieldCheck, User, Wrench,
  type LucideIcon,
} from 'lucide-react';
import { serviceHref, servicesData, thumb } from '../data/services';
import { AnimatePresence, motion } from 'motion/react';
import { EASE_OUT } from './motion';
// Trimmed mark at 3x its largest rendered width (96 px); /logo-mark.png is the square icon for search and social.
const logoMark = '/logo-nav.webp';

const menuItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  useEffect(() => setIsMobileMenuOpen(false), [location.pathname]);

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Proyectos', path: '/proyectos' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-border shadow-[0_1px_0_rgba(0,103,129,0.06)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[5.75rem] md:min-h-[6.75rem] py-2.5 flex items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="Perfor Construcciones"
        >
          <div className="flex h-[3.5rem] w-[5.125rem] shrink-0 items-center sm:h-[4.125rem] sm:w-[5.875rem] md:h-[4.25rem] md:w-[6rem]">
            <img
              src={logoMark}
              width={288}
              height={195}
              alt="Perfor Construcciones"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>

          <div className="flex h-[3.5rem] sm:h-[4.125rem] md:h-[4.25rem] flex-col justify-center gap-1">
            <div className="flex flex-col leading-[1.15]">
              <span className="font-display font-medium text-sm sm:text-base md:text-lg uppercase tracking-[0.16em] text-brand-muted">
                PERFOR
              </span>
              <span className="font-display font-medium text-sm sm:text-base md:text-lg uppercase tracking-[0.16em] text-brand-muted">
                CONSTRUCCIONES
              </span>
            </div>
            <span className="font-display text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-brand-amber leading-none">
              SOMOS TU MEJOR OPCIÓN
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex gap-1 items-center">
          {links.map((link) => {
            const active = isActive(link.path);
            if (link.path === '/servicios') {
              return <ServicesMenu key={link.name} active={active} pathname={location.pathname} />;
            }
            return (
              <Link
                key={link.name}
                to={link.path}
                aria-current={active ? 'page' : undefined}
                className={`group relative px-4 py-2 rounded font-sans font-medium text-sm transition-colors duration-300 ${
                  active ? 'text-brand-deep' : 'text-brand-text hover:text-brand-primary'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded bg-brand-bg"
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                <span className="relative">{link.name}</span>
                <span
                  aria-hidden="true"
                  className={`absolute left-4 right-4 bottom-1 h-px origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-brand-bg rounded border border-brand-border text-brand-deep">
            <Phone size={16} />
            <span className="font-sans font-semibold text-sm">(+593) 95 956 4486</span>
          </div>
          <Link to="/contacto" className="btn-press group flex items-center gap-2 bg-brand-amber text-white font-display font-semibold text-sm uppercase tracking-wider px-5 py-3 rounded hover:bg-brand-amber-dark hover:shadow-[0_10px_22px_-8px_rgba(141,75,0,0.5)] shadow-[0_2px_4px_rgba(42,107,130,0.04)]">
            <MessageCircle size={18} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-12 group-hover:scale-110" />
            Cotizar <br/> 
          </Link>
          <button className="btn-press w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-deep border border-brand-border hover:bg-gray-100 hover:border-brand-primary/40">
            <User size={18} />
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden relative h-10 w-10 text-brand-text hover:bg-gray-100 rounded transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {/* Hamburger morphs into an X */}
          <span aria-hidden="true" className="absolute left-1/2 top-1/2 block h-4 w-6 -translate-x-1/2 -translate-y-1/2">
            <span className={`absolute left-0 block h-0.5 w-6 rounded bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'top-[7px] rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-[7px] block h-0.5 w-6 rounded bg-current transition-all duration-200 ${isMobileMenuOpen ? 'scale-x-0 opacity-0' : ''}`} />
            <span className={`absolute left-0 block h-0.5 w-6 rounded bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMobileMenuOpen ? 'top-[7px] -rotate-45' : 'top-[14px]'}`} />
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-brand-border absolute top-full left-0 w-full shadow-lg max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain"
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.45, ease: EASE_OUT } }}
          exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
        >
          <motion.nav
            className="flex flex-col p-4 space-y-2"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
          >
            {links.map((link) => link.path === '/servicios' ? (
              <motion.div key={link.name} variants={menuItem}>
                <MobileServices active={isActive(link.path)} pathname={location.pathname} />
              </motion.div>
            ) : (
              <motion.div key={link.name} variants={menuItem}>
              <Link
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded font-sans font-medium text-base transition-colors ${
                  isActive(link.path)
                    ? 'bg-brand-bg text-brand-deep'
                    : 'text-brand-text hover:text-brand-primary hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
              </motion.div>
            ))}
            
            <motion.div variants={menuItem} className="border-t border-brand-border mt-4 pt-4 flex flex-col gap-4">
              <a href="tel:+593959564486" className="flex items-center gap-3 px-4 py-3 bg-brand-bg rounded border border-brand-border text-brand-deep font-sans font-semibold">
                <Phone size={18} className="text-brand-primary" />
                (+593) 95 956 4486
              </a>
              <Link 
                to="/contacto" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-press flex items-center justify-center gap-2 bg-brand-amber text-white font-display font-semibold uppercase tracking-wider px-4 py-4 rounded hover:bg-brand-amber-dark transition-all"
              >
                <MessageCircle size={18} />
                Cotizar Proyecto
              </Link>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}

const panel = {
  hidden: { opacity: 0, y: -10, scale: 0.96, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.42, ease: EASE_OUT, staggerChildren: 0.05, delayChildren: 0.06 },
  },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] as const } },
};
const panelItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

const serviceIcons: Record<string, LucideIcon> = {
  'pilotaje-barrenado': Layers,
  'hincado-vibrohincado-pilotes': Wrench,
  'anclajes-muros-pantalla': ShieldCheck,
  'estabilizacion-taludes': Activity,
  'perforacion-suelo-roca': Drill,
};

/** Desktop "Servicios": a click-to-open menu that drops from its trigger. */
function ServicesMenu({ active, pathname }: { active: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const focusItem = (i: number) => {
    const items = itemsRef.current.filter(Boolean) as HTMLAnchorElement[];
    items[(i + items.length) % items.length]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
      buttonRef.current?.focus();
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    if (!open) {
      setOpen(true);
      requestAnimationFrame(() => focusItem(0));
      return;
    }
    const items = itemsRef.current.filter(Boolean);
    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    focusItem(current + (e.key === 'ArrowDown' ? 1 : -1));
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onKeyDown={onKeyDown}
      onBlur={(e) => {
        if (open && !wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="services-menu"
        onClick={() => setOpen((o) => !o)}
        className={`group relative flex items-center gap-1 px-4 py-2 rounded font-sans font-medium text-sm transition-colors duration-300 ${
          active || open ? 'text-brand-deep' : 'text-brand-text hover:text-brand-primary'
        }`}
      >
        {active && (
          <motion.span
            layoutId="nav-active"
            className="absolute inset-0 rounded bg-brand-bg"
            transition={{ type: 'spring', stiffness: 420, damping: 36 }}
          />
        )}
        <span className="relative">Servicios</span>
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={`relative transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'rotate-180' : ''}`}
        />
        <span
          aria-hidden="true"
          className={`absolute left-4 right-4 bottom-1 h-px origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active || open ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <div className="absolute left-0 top-full z-50 pt-3 [perspective:1200px]">
            <motion.div
              id="services-menu"
              variants={panel}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ transformOrigin: 'top center' }}
              className="relative w-[min(390px,calc(100vw-2rem))] overflow-hidden rounded-xl border border-brand-border bg-white shadow-[0_24px_48px_-18px_rgba(0,77,98,0.35)]"
            >
              <motion.div variants={panelItem} className="flex items-center justify-between border-b border-brand-border bg-brand-bg/60 px-4 py-3">
                <span className="font-display text-[11px] font-bold uppercase tracking-widest text-brand-muted">Servicios especializados</span>
                <span className="rounded border border-brand-border bg-white px-2 py-0.5 font-sans text-[11px] font-semibold text-brand-primary">
                  {servicesData.length} Opciones
                </span>
              </motion.div>
              <ul className="flex flex-col gap-1.5 p-2">
                {servicesData.map((s, i) => {
                  const current = pathname === serviceHref(s.slug);
                  const Icon = serviceIcons[s.slug] ?? Layers;
                  return (
                    <motion.li key={s.slug} variants={panelItem}>
                      <Link
                        ref={(el) => { itemsRef.current[i] = el; }}
                        to={serviceHref(s.slug)}
                        aria-current={current ? 'page' : undefined}
                        className={`group/item flex items-center gap-3.5 rounded-lg border px-3 py-3 transition-colors duration-300 ${
                          current
                            ? 'border-brand-primary/40 bg-brand-bg'
                            : 'border-transparent hover:border-brand-border hover:bg-brand-bg'
                        }`}
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-brand-border bg-white text-brand-deep transition-colors duration-300 group-hover/item:border-brand-primary/40 group-hover/item:text-brand-primary">
                          <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block font-display text-[15px] font-bold leading-snug transition-colors ${current ? 'text-brand-deep' : 'text-brand-text group-hover/item:text-brand-deep'}`}>
                            {s.menu.title}
                          </span>
                          <span className="mt-0.5 flex flex-wrap items-center gap-x-3 font-sans text-xs">
                            <span className="text-brand-muted">{s.category}</span>
                            <span className="font-semibold text-brand-primary">{s.menu.spec}</span>
                          </span>
                        </span>
                        <ChevronRight
                          size={16}
                          aria-hidden="true"
                          className="shrink-0 text-brand-border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:translate-x-0.5 group-hover/item:text-brand-primary"
                        />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div variants={panelItem} className="flex items-center justify-between border-t border-brand-border px-2 py-1.5">
                <Link
                  ref={(el) => { itemsRef.current[servicesData.length] = el; }}
                  to="/servicios"
                  className="group/all flex items-center gap-2 rounded-lg px-2 py-2 font-display text-[11px] font-bold uppercase tracking-widest text-brand-deep transition-colors hover:bg-brand-bg"
                >
                  Ver catálogo completo
                  <ArrowRight size={14} className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/all:translate-x-1" />
                </Link>
                <span className="pr-2 font-sans text-[11px] text-brand-muted">Normas ACI · NEC</span>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Mobile "Servicios": an accordion inside the slide-down menu. */
function MobileServices({ active, pathname }: { active: boolean; pathname: string }) {
  const [open, setOpen] = useState(active);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-services"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between px-4 py-3 rounded font-sans font-medium text-base transition-colors ${
          active ? 'bg-brand-bg text-brand-deep' : 'text-brand-text hover:text-brand-primary hover:bg-gray-50'
        }`}
      >
        Servicios
        <ChevronDown size={18} aria-hidden="true" className={`transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            id="mobile-services"
            className="overflow-hidden pl-3"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.35, ease: EASE_OUT } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
          >
            {servicesData.map((s) => {
              const current = pathname === serviceHref(s.slug);
              return (
                <li key={s.slug}>
                  <Link
                    to={serviceHref(s.slug)}
                    aria-current={current ? 'page' : undefined}
                    className={`mt-1 flex items-center gap-3 rounded px-3 py-2.5 font-sans text-sm transition-colors ${
                      current ? 'bg-brand-bg text-brand-deep font-semibold' : 'text-brand-muted hover:text-brand-primary hover:bg-gray-50'
                    }`}
                  >
                    <img src={thumb(s.image, 96)} alt="" className="h-9 w-11 shrink-0 rounded object-cover" />
                    {s.title}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link to="/servicios" className="mt-1 flex items-center gap-2 px-3 py-2.5 font-display text-[10px] font-bold uppercase tracking-widest text-brand-deep">
                Ver todos los servicios <ArrowRight size={14} />
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
