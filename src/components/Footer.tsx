export default function Footer() {
  return (
    <footer className="bg-white border-t border-brand-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
             <div className="flex flex-col items-center">
              <span className="font-display font-bold text-lg leading-tight text-brand-primary">MV<br/>PERFOR</span>
            </div>
            <p className="text-sm text-brand-muted">Líderes en ingeniería geotécnica, perforación profunda y soluciones estructurales subterráneas de alta precisión para el desarrollo constructivo del Ecuador.</p>
            <div className="flex items-center justify-center gap-2 text-xs font-display font-bold text-brand-deep uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-brand-primary"></span>
              Operatividad Geotécnica Activa
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-brand-text mb-4">Servicios Especializados</h4>
            <ul className="space-y-2 text-sm text-brand-muted">
              <li><a href="#" className="hover:text-brand-primary flex items-center justify-center gap-2"><span className="w-1 h-1 bg-brand-primary block"></span> Pilotaje Prebarrenado CFA</a></li>
              <li><a href="#" className="hover:text-brand-primary flex items-center justify-center gap-2"><span className="w-1 h-1 bg-brand-primary block"></span> Micropilotes e Inyecciones</a></li>
              <li><a href="#" className="hover:text-brand-primary flex items-center justify-center gap-2"><span className="w-1 h-1 bg-brand-primary block"></span> Muros Pantalla & Anclajes</a></li>
              <li><a href="#" className="hover:text-brand-primary flex items-center justify-center gap-2"><span className="w-1 h-1 bg-brand-primary block"></span> Estabilización de Taludes</a></li>
              <li><a href="#" className="hover:text-brand-primary flex items-center justify-center gap-2"><span className="w-1 h-1 bg-brand-primary block"></span> Sondeos y Ensayos SPT</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-brand-text mb-4">Sede Matriz Quito</h4>
            <address className="text-sm text-brand-muted not-italic space-y-2">
              <p>Av. Simón Bolívar y Autopista Rumiñahui, Parque Industrial Geotécnico, Sector La Floresta Sur.</p>
              <p className="flex items-center justify-center gap-2"><span className="text-brand-primary">✆</span> PBX: (+593) 2 299-8700</p>
              <p className="flex items-center justify-center gap-2"><span className="text-brand-primary">✉</span> ingenieria@mvperfor.ec</p>
              <p className="flex items-center justify-center gap-2"><span className="text-brand-primary">⏱</span> Lun - Vie: 07:30 - 18:00</p>
            </address>
          </div>

          
        </div>
        
        <div className="mt-20 pt-8 border-t border-brand-border flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs text-brand-muted">© 2024 PERFOR CONSTRUCCIONES MOLINA & VILLAFUERTE CÍA. LTDA. Todos los derechos reservados. Quito, Ecuador.</p>
          <div className="flex gap-4 text-xs font-display font-bold text-brand-muted uppercase tracking-wider">
            
          </div>
        </div>
      </div>
    </footer>
  );
}
