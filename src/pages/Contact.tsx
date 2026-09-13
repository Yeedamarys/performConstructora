import { useState } from 'react';
import { FileText, User, Mail, Phone, MapPin, AlignLeft, Send, ShieldCheck, Zap, MessageCircle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/administracion199@perforconstrucciones.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-brand-bg w-full">
      {/* Page Header */}
      <section className="bg-brand-deep py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-brand-primary"></span>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-primary">Asistencia Técnica Geotécnica</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">CONTACTO DE OPERACIONES</h1>
          <p className="text-lg text-white/80 font-sans max-w-2xl text-justify">
            Despliegue operativo a nivel nacional. Cotizaciones, estudios de suelo, licitaciones de consorcios e intervenciones de estabilización emergente.
          </p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Form Column */}
           <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-brand-border p-8 md:p-12">
             <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-border">
               <div className="w-12 h-12 bg-brand-bg rounded-lg flex items-center justify-center text-brand-primary">
                 <FileText size={24} />
               </div>
               <div>
                 <h2 className="font-display font-bold text-2xl text-brand-text">Formulario Geotécnico Especializado</h2>
                 <p className="text-sm text-brand-muted font-sans mt-1 text-justify">Adjunta detalles estructurales para agilizar el análisis presupuestario.</p>
               </div>
             </div>
             
             <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_subject" value="Nuevo requerimiento geotécnico desde la web" />
                <input type="hidden" name="_template" value="table" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-display font-bold text-brand-muted uppercase tracking-widest">
                      <User size={14} className="text-brand-primary" /> Nombre / Razón Social
                    </label>
                    <input type="text" name="nombre" required className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="Ej. Constructora Andina S.A." />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-display font-bold text-brand-muted uppercase tracking-widest">
                      <Mail size={14} className="text-brand-primary" /> Correo Corporativo
                    </label>
                    <input type="email" name="email" required className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="ingenieria@empresa.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-display font-bold text-brand-muted uppercase tracking-widest">
                      <Phone size={14} className="text-brand-primary" /> Teléfono Directo
                    </label>
                    <input type="tel" name="telefono" required className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all" placeholder="+593 99 999 9999" />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-display font-bold text-brand-muted uppercase tracking-widest">
                      <MapPin size={14} className="text-brand-primary" /> Ubicación del Proyecto
                    </label>
                    <select name="ubicacion" required className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all text-brand-text">
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
                      <input type="radio" name="servicio" value="Pilotes CFA" required className="peer sr-only" />
                      <div className="bg-white border border-brand-border rounded p-3 text-center peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition-all">
                        <span className="text-[10px] font-display font-bold text-brand-text uppercase tracking-widest">Pilotes CFA</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="servicio" value="Micropilotes" className="peer sr-only" />
                      <div className="bg-white border border-brand-border rounded p-3 text-center peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition-all">
                        <span className="text-[10px] font-display font-bold text-brand-text uppercase tracking-widest">Micropilotes</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="servicio" value="Anclajes" className="peer sr-only" />
                      <div className="bg-white border border-brand-border rounded p-3 text-center peer-checked:border-brand-primary peer-checked:bg-brand-primary/5 transition-all">
                        <span className="text-[10px] font-display font-bold text-brand-text uppercase tracking-widest">Anclajes</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="servicio" value="Otros" className="peer sr-only" />
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
                  <textarea name="descripcion" rows={4} className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 font-sans text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none" placeholder="Breve descripción del estudio de suelos, cargas estimadas, tipo de talud, etc..."></textarea>
                </div>
                
                <div className="pt-4 border-t border-brand-border">
                   <div className="bg-brand-bg rounded border border-brand-border p-3 flex justify-center items-center gap-2 text-xs text-brand-muted font-display font-bold uppercase tracking-wider mb-6">
                     <ShieldCheck size={16} className="text-brand-primary" />
                     Sus datos están protegidos bajo sigilo técnico comercial.
                   </div>
                   {status === 'success' && (
                     <div className="bg-green-50 text-green-700 p-4 rounded mb-4 flex items-center gap-2 font-sans text-sm">
                       <CheckCircle size={18} />
                       ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
                     </div>
                   )}
                   
                   {status === 'error' && (
                     <div className="bg-red-50 text-red-700 p-4 rounded mb-4 flex items-center gap-2 font-sans text-sm">
                       <AlertCircle size={18} />
                       Hubo un error al enviar el mensaje. Inténtalo de nuevo o contáctanos por teléfono.
                     </div>
                   )}

                   <button type="submit" disabled={status === 'loading'} className="w-full bg-brand-deep hover:bg-brand-primary text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed">
                     {status === 'loading' ? (
                       <><Loader2 size={18} className="animate-spin" /> Procesando...</>
                     ) : (
                       <><Send size={18} /> Enviar Requerimiento a Oficina Técnica</>
                     )}
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
                   <a href="tel:+593959564486" className="w-full bg-white text-brand-text hover:bg-gray-50 font-display font-bold uppercase tracking-wider text-xs px-4 py-3 rounded transition-colors flex items-center justify-center gap-2 shadow-sm">
                     <Phone size={16} className="text-brand-amber" /> Llamar Urgencia Geotécnica
                   </a>
                   <p className="text-center text-[10px] font-display font-bold text-white/70 uppercase tracking-widest mt-4">
                     Línea operativa 24/7
                   </p>
                 </div>
              </div>

              {/* HQ Info */}
              <div className="bg-white rounded-xl border border-brand-border p-6 shadow-sm">
                 <h3 className="font-display font-bold text-lg text-brand-text mb-6">Sede Matriz</h3>
                 
                 <div className="space-y-6">
                   <div>
                     <div>
                        <span className="font-display font-bold text-brand-muted opacity-50 uppercase tracking-widest text-sm">Ubicación</span>
                        <p className="font-sans text-sm text-brand-text font-semibold mt-1">Sector Solanda.</p>
                        <p className="font-sans text-sm text-brand-muted mt-1">Cusumasa & Avenida Teniente Hugo Ortiz</p>
                     </div>
                   </div>
                   
                   <div>
                     <div>
                        <span className="font-display font-bold text-brand-muted opacity-50 uppercase tracking-widest text-sm">Contactos Directos</span>
                        <div className="font-sans text-sm text-brand-muted mt-2 space-y-3 w-full">
                          <div className="text-brand-text">
                            <div className="font-bold mb-0.5">Teléfono:</div>
                            <div className="font-normal">(+593) 95 956 4486</div>
                          </div>
                          <div className="text-brand-text">
                            <div className="font-bold mb-0.5">Email:</div>
                            <a href="mailto:administracion199@perforconstrucciones.com" className="font-normal text-brand-primary hover:underline break-all">
                              administracion199@perforconstrucciones.com
                            </a>
                          </div>
                        </div>
                     </div>
                   </div>
                 </div>

                 <div className="mt-8 pt-6 border-t border-brand-border">
                    <div className="aspect-[4/3] rounded overflow-hidden border border-brand-border">
                      <iframe
                        title="Ubicación de Operaciones Centrales"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4909.29402520863!2d-78.53447322417767!3d-0.2655708353640596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d598faad2727ad%3A0x85a09a8b9f864b29!2sCusumasa%20%26%20Avenida%20Teniente%20Hugo%20Ortiz%2C%20170148%20Quito!5e1!3m2!1ses!2sec!4v1788878221798!5m2!1ses!2sec"
                        className="w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
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
