import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, User } from 'lucide-react';
import logoMark from '../images/logo-mark.png';

export default function Navbar() {
  const location = useLocation();

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
          className="group flex shrink-0 items-center gap-2.5 sm:gap-3 py-2"
          aria-label="Perforconstrucciones - Perfo Construcciones"
        >
          <div className="flex h-[3.5rem] w-[5.125rem] shrink-0 items-center sm:h-[4.125rem] sm:w-[5.875rem] md:h-[4.25rem] md:w-[6rem]">
            <img
              src={logoMark}
              alt="Perforconstrucciones - Perfo Construcciones"
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
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-2 rounded font-sans font-medium text-sm transition-colors ${
                location.pathname === link.path
                  ? 'bg-brand-bg text-brand-deep'
                  : 'text-brand-text hover:text-brand-primary hover:bg-gray-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 whitespace-nowrap px-4 py-2 bg-brand-bg rounded border border-brand-border text-brand-deep">
            <Phone size={16} />
            <span className="font-sans font-semibold text-sm">(+593) 95 956 4486</span>
          </div>
          <Link to="/contacto" className="flex items-center gap-2 bg-brand-amber text-white font-display font-semibold text-sm uppercase tracking-wider px-5 py-3 rounded hover:bg-brand-amber-dark transition-all shadow-[0_2px_4px_rgba(42,107,130,0.04)]">
            <MessageCircle size={18} />
            Cotizar <br/> 
          </Link>
          <button className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-deep border border-brand-border hover:bg-gray-100">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
