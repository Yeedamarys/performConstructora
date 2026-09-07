import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, User } from 'lucide-react';
import logo from '../images/logo.png';

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
    <header className="sticky top-0 z-50 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Perfor Construcciones - Inicio">
          <img src={logo} alt="Perfor Construcciones Molina & Villafuerte Cía. Ltda." className="h-16 w-auto object-contain" />
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
          <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-bg rounded border border-brand-border text-brand-deep">
            <Phone size={16} />
            <span className="font-sans font-semibold text-sm">(+593) 2<br/>299-8700</span>
          </div>
          <a href="#" className="flex items-center gap-2 bg-brand-amber text-white font-display font-semibold text-sm uppercase tracking-wider px-5 py-3 rounded hover:bg-brand-amber-dark transition-all shadow-[0_2px_4px_rgba(42,107,130,0.04)]">
            <MessageCircle size={18} />
            Cotizar <br/> 
          </a>
          <button className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-deep border border-brand-border hover:bg-gray-100">
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
