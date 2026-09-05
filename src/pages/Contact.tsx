import { FileText, User, Mail, Phone, MapPin, AlignLeft, Send, ShieldCheck, Zap, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-brand-bg w-full">
      {/* Page Header */}
      <section className="bg-brand-deep py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-brand-primary"></span>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-primary">Asistencia Técnica Geotécnica</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">CONTACTO DE OPERACIONES</h1>
          <p className="text-lg text-white/80 font-sans max-w-2xl">
            Despliegue operativo a nivel nacional. Cotizaciones, estudios de suelo, licitaciones de consorcios e intervenciones de estabilización emergente.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Form Column */}
           <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-brand-border p-8 md:p-12">
             <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-border">
               <div className="w-12 h-12 bg-brand-bg rounded-lg flex items-center justify-center text-brand-primary">
                 <FileText size={24} />
               </div>
               <div>
                 <h2 className="font-display font-bold text-2xl text-brand-text">Formulario Geotécnico Especializado</h2>
                 <p className="text-sm text-brand-muted font-sans mt-1">Adjunta detalles estructurales para agilizar el análisis presupuestario.</p>
               </div>
             </div>
             
             <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-display font-bold text-brand-muted uppercase tracking-widest">
                      <User size={14} className="text-brand-primary" /> Nombre / Razón Social
                    </label>
                    <input type="text" className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="Ej. Constructora Andina S.A." />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-display font-bold text-brand-muted uppercase tracking-widest">
                      <Mail size={14} className="text-brand-primary" /> Correo Corporativo
                    </label>
                    <input type="email" className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="ingenieria@empresa.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-display font-bold text-brand-muted uppercase tracking-widest">
                      <Phone size={14} className="text-brand-primary" /> Teléfono Directo
                    </label>
                    <input type="tel" className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="+593 99 999 9999" />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-display font-bold text-brand-muted uppercase tracking-widest">
                      <MapPin size={14} className="text-brand-primary" /> Ubicación del Proyecto
                    </label>
                    <select className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-brand-text">
                      <option value="">Seleccione zona de obra...</option>
                      <option value="quito">Pichincha / Quito</option>
                      <option value="sierra">Resto de Sierra</option>
                      <option value="costa">Costa</option>
                      <option value="amazonia">Amazonía</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-display font-bold text-brand-text uppercase tracking-widest">Requerimiento Técnico Principal</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className="cursor-pointer">
                      <input type="radio" name="service" className="peer sr-only" />
                      <div className="bg-white border border-brand-border rounded p-3 text-center peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition-all">
                        <span className="text-[10px] font-display font-bold text-brand-text uppercase tracking-widest">Pilotes CFA</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="service" className="peer sr-only" />
                      <div className="bg-white border border-brand-border rounded p-3 text-center peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition-all">
                        <span className="text-[10px] font-display font-bold text-brand-text uppercase tracking-widest">Micropilotes</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="service" className="peer sr-only" />
                      <div className="bg-white border border-brand-border rounded p-3 text-center peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition-all">
                        <span className="text-[10px] font-display font-bold text-brand-text uppercase tracking-widest">Anclajes</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="service" className="peer sr-only" />
                      <div className="bg-white border border-brand-border rounded p-3 text-center peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition-all">
                        <span className="text-[10px] font-display font-bold text-brand-text uppercase tracking-widest">Otros</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-display font-bold text-brand-muted uppercase tracking-widest">
                    <AlignLeft size={14} className="text-brand-primary" /> Descripción de Especificaciones (Opcional)
                  </label>
                  <textarea rows={4} className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none" placeholder="Breve descripción del estudio de suelos, cargas estimadas, tipo de talud, etc..."></textarea>
                </div>
                
                <div className="pt-4 border-t border-brand-border">
                   <div className="bg-brand-bg rounded border border-brand-border p-3 flex justify-center items-center gap-2 text-xs text-brand-muted font-display font-bold uppercase tracking-wider mb-6">
                     <ShieldCheck size={16} className="text-brand-primary" />
                     Sus datos están protegidos bajo sigilo técnico comercial.
                   </div>
                   <button type="button" className="w-full bg-brand-deep hover:bg-brand-primary text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded transition-colors flex items-center justify-center gap-2 shadow-md">
                     <Send size={18} /> Enviar Requerimiento a Oficina Técnica
                   </button>
                </div>
             </form>
           </div>
           
           {/* Sidebar Info */}
           <div className="space-y-6">
              {/* Emergency block */}
              <div className="bg-brand-amber rounded-xl p-6 text-white shadow-md relative overflow-hidden">
                 <Zap size={100} className="absolute -bottom-6 -right-6 text-white opacity-10" />
                 <div className="relative z-10">
                   <div className="text-[10px] font-display font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                     Respuesta Inmediata
                   </div>
                   <h3 className="font-display font-bold text-xl mb-3">EMERGENCIA GEOTÉCNICA</h3>
                   <p className="text-sm text-white/90 font-sans mb-6">¿Contención de talud urgente o perforación no planificada? Contacto directo con el Director Técnico de Guardia.</p>
                   <a href="#" className="w-full bg-white text-brand-text hover:bg-gray-50 font-display font-bold uppercase tracking-wider text-xs px-4 py-3 rounded transition-colors flex items-center justify-center gap-2 shadow-sm">
                     <Phone size={16} className="text-brand-amber" /> Llamar Urgencia Geotécnica
                   </a>
                   <p className="text-center text-[10px] font-display font-bold text-white/70 uppercase tracking-widest mt-4">
                     Línea operativa 24/7
                   </p>
                 </div>
              </div>

              {/* HQ Info */}
              <div className="bg-white rounded-xl border border-brand-border p-6 shadow-sm">
                 <h3 className="font-display font-bold text-lg text-brand-text mb-6">Sede Matriz Nacional</h3>
                 
                 <div className="space-y-6">
                   <div className="flex gap-4">
                     <div className="w-10 h-10 bg-brand-bg rounded flex items-center justify-center shrink-0">
                       <MapPin size={18} className="text-brand-primary" />
                     </div>
                     <div>
                        <span className="font-display font-bold text-brand-muted opacity-50 uppercase tracking-widest text-sm">Mapa Base Operativa</span>
                        <p className="font-sans text-sm text-brand-text font-semibold mt-1">Parque Industrial Geotécnico, Sector La Floresta Sur.</p>
                        <p className="font-sans text-sm text-brand-muted mt-1">Av. República del Salvador y Naciones Unidas, Edificio Titanium, Piso 7, Quito - Ecuador.</p>
                     </div>
                   </div>
                   
                   <div className="flex gap-4">
                     <div className="w-10 h-10 bg-brand-bg rounded flex items-center justify-center shrink-0">
                       <Phone size={18} className="text-brand-primary" />
                     </div>
                     <div>
                        <span className="font-display font-bold text-brand-muted opacity-50 uppercase tracking-widest text-sm">Contactos Directos</span>
                        <p className="font-sans text-sm text-brand-muted mt-1 flex flex-col gap-1">
                          <span className="text-brand-text font-semibold flex justify-between"><span>PBX Corporativo:</span> (+593) 2 299-8700</span>
                          <span className="text-brand-text font-semibold flex justify-between"><span>Ingeniería:</span> (+593) 99 876 5432</span>
                        </p>
                     </div>
                   </div>
                 </div>

                 <div className="mt-8 pt-6 border-t border-brand-border">
                    <div className="aspect-[4/3] bg-gray-200 rounded relative overflow-hidden">
                       <div className="absolute inset-0 bg-brand-deep/10"></div>
                       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full border border-brand-border flex items-center gap-2 text-[10px] font-display font-bold text-brand-text uppercase tracking-widest shadow-sm">
                         <span className="w-1.5 h-1.5 rounded-full bg-brand-success"></span> Operaciones Centrales
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="bg-white rounded-xl border border-brand-border p-6 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-bg rounded flex items-center justify-center shrink-0">
                   <ShieldCheck size={18} className="text-brand-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest">Respaldo Operativo Inmediato</span>
                  <h4 className="font-display font-bold text-brand-text text-sm mb-1">Sin Intermediarios</h4>
                  <p className="font-sans text-xs text-brand-muted leading-relaxed">Movilización de perforadoras de gran diámetro y grúas 24/7 a Costa, Sierra y Amazonía sin intermediarios logísticos.</p>
                </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
