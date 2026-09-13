import { Clock3, MapPin, Phone, Copyright } from 'lucide-react';
const services = [
  'Pilotaje Prebarrenado CFA',
  'Hincado y vibrohincado de pilotes y tablaestacas',
  'Anclajes para muros pantalla de hormigón',
  'Estabilización de taludes',
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="inline-flex flex-col items-center md:items-start">
              <span className="font-display text-lg font-bold tracking-wide text-brand-primary">PERFORCONSTRUCCIONES</span>
              <span className="mt-1 h-0.5 w-12 bg-brand-primary" />
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-muted mx-auto md:mx-0">
              Líderes en ingeniería geotécnica, perforación profunda y soluciones estructurales subterráneas de alta precisión para el desarrollo constructivo del Ecuador.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-bg px-3 py-2 text-[10px] font-display font-bold uppercase tracking-widest text-brand-deep">
              <span className="h-2 w-2 rounded-full bg-brand-success" />
              Operatividad geotécnica activa
            </div>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-display font-bold text-brand-text">Servicios especializados</h4>
            <ul className="mt-5 space-y-3 text-sm text-brand-muted">
              {services.map((service) => (
                <li key={service} className="flex items-start justify-center gap-2 text-left md:justify-start">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display font-bold text-brand-text">Sede matriz · Quito</h4>
            <address className="mt-5 space-y-4 text-sm not-italic text-brand-muted">
              <p className="flex items-start justify-center gap-3 text-left md:justify-start">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand-primary" />
                <span>Cusumasa &amp; Avenida Teniente Hugo Ortiz.</span>
              </p>
              <p className="flex items-center justify-center gap-3 md:justify-start">
                <Phone size={18} className="shrink-0 text-brand-primary" />
                <span>PBX: (+593) 95 956 4486</span>
              </p>
              <p className="flex items-center justify-center gap-3 md:justify-start">
                <Clock3 size={18} className="shrink-0 text-brand-primary" />
                <span>Lun - Vie: 08:00 - 17:00</span>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-xs text-brand-muted flex items-center justify-center gap-2">
            <Copyright size={14} />
        2026 Perfor Construcciones - Quito, Ecuador, todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
