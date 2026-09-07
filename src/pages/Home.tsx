import { CheckCircle2, ArrowRight, Clock, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import cimentacionPrimaria from '../images/cimentaciónPrimaria.png';
import homeImage from '../images/home.png';

export default function Home() {
  return (
    <div className="bg-brand-bg w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-brand-border rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-amber"></span>
              <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">Ingeniería Geotécnica & Cimentaciones Profundas - Ecuador</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-brand-text leading-[1.1] tracking-tight">
              PERFOR CONSTRUCCIONES<br/>
              <span className="text-brand-primary">MOLINA & VILLAFUERTE</span>
            </h1>
            
            <p className="text-lg text-brand-muted font-sans max-w-xl">
              Soluciones de perforación, pilotaje y estabilización de taludes con experiencia técnica comprobada en proyectos de infraestructura civil en todo el Ecuador.
            </p>
            
            <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-brand-border shadow-sm max-w-xl">
              <CheckCircle2 className="text-brand-primary shrink-0" size={24} />
              <p className="text-sm text-brand-text font-sans">
                Más de 8 proyectos ejecutados junto a consorcios y constructoras líderes del país, con certificaciones que respaldan cada trabajo entregado bajo norma NEC-SE-GE.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#" className="inline-flex items-center justify-center gap-2 bg-brand-amber hover:bg-brand-amber-dark text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded shadow-[0_2px_4px_rgba(42,107,130,0.04)] transition-colors">
                <MessageCircle size={20} />
                Cotiza tu proyecto
              </a>
              <Link to="/servicios" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-brand-border text-brand-deep font-display font-bold uppercase tracking-wider px-6 py-4 rounded transition-colors">
                Ver nuestros servicios
                <ArrowRight size={20} />
              </Link>
            </div>
            
          </div>
          
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl bg-gray-200 border border-brand-border shadow-[0_16px_32px_rgba(43,47,51,0.08)] overflow-hidden relative">
               <img
                 src={homeImage}
                 alt="Equipo de perforación trabajando en obra"
                 className="absolute inset-0 h-full w-full object-cover"
               />
               
               {/* Floating Badges as per mockup */}
              
               
          
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white border-t border-brand-border py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
            <div>
              <div className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest mb-3">Capacidades Operativas Especializadas</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-text max-w-xl">INGENIERÍA DE SUELOS & PERFORACIÓN PROFUNDA</h2>
            </div>
            <p className="font-sans text-brand-muted max-w-md lg:text-right">
              Equipamiento de alto rendimiento operado bajo rigurosos protocolos geotécnicos para garantizar la estabilidad de superestructuras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Service 1 */}
             <div className="bg-brand-bg rounded-lg border border-brand-border overflow-hidden group">
               <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                 <img
                   src={cimentacionPrimaria}
                   alt="Cimentación primaria con pilotaje prebarrenado CFA"
                   className="absolute inset-0 h-full w-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <span className="font-display font-bold text-[10px] bg-white text-brand-text px-3 py-1 uppercase tracking-widest rounded">Cimentación Primaria</span>
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="font-display font-bold text-2xl text-brand-text mb-3">Pilotaje Prebarrenado CFA</h3>
                 <p className="font-sans text-sm text-brand-muted mb-6">
                   Ejecución continua de pilotes de gran diámetro para edificaciones de altura y viaductos. Perforación con inyección simultánea de hormigón que minimiza la descompresión del suelo andino.
                 </p>
                
                 
               </div>
             </div>

             {/* Service 2 */}
             <div className="bg-brand-bg rounded-lg border border-brand-border overflow-hidden group">
               <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <span className="font-display font-bold text-[10px] bg-white text-brand-text px-3 py-1 uppercase tracking-widest rounded">Refuerzo Estructural</span>
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="font-display font-bold text-2xl text-brand-text mb-3">Micropilotes & Inyecciones</h3>
                 <p className="font-sans text-sm text-brand-muted mb-6">
                   Soluciones de soporte en espacios confinados, submuraciones de edificios patrimoniales e inyecciones de lechada a alta presión para mejorar la capacidad portante del estrato base.
                 </p>
                 
               </div>
             </div>
             
              {/* Service 3 */}
             <div className="bg-brand-bg rounded-lg border border-brand-border overflow-hidden group">
               <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <span className="font-display font-bold text-[10px] bg-white text-brand-text px-3 py-1 uppercase tracking-widest rounded">Contención Profunda</span>
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="font-display font-bold text-2xl text-brand-text mb-3">Muros Pantalla & Anclajes</h3>
                 <p className="font-sans text-sm text-brand-muted mb-6">
                   Sistemas integrales de contención perimetral para sótanos de gran profundidad en áreas urbanas densas, previniendo asentamientos en predios e infraestructura vecina.
                 </p>
                
               </div>
             </div>

              {/* Service 4 */}
             <div className="bg-brand-bg rounded-lg border border-brand-border overflow-hidden group">
               <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <span className="font-display font-bold text-[10px] bg-white text-brand-text px-3 py-1 uppercase tracking-widest rounded">Mitigación de Riesgo</span>
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="font-display font-bold text-2xl text-brand-text mb-3">Estabilización de Taludes</h3>
                 <p className="font-sans text-sm text-brand-muted mb-6">
                   Blindaje geotécnico en laderas y cortes viales mediante hormigón lanzado por vía húmeda (shotcrete), colocación de malla electrosoldada y drenes californianos subhorizontales.
                 </p>
                 
               </div>
             </div>

          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-brand-deep rounded-xl p-8 md:p-16 relative overflow-hidden shadow-[0_16px_32px_rgba(43,47,51,0.08)]">
           {/* Abstract background shapes */}
           <div className="absolute top-0 right-0 w-64 h-64 border border-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-0 right-32 w-48 h-48 border border-white/10 rounded-full translate-y-1/2"></div>
           
           <div className="relative z-10 max-w-2xl">
              <div className="text-[10px] font-display font-bold text-brand-success uppercase tracking-widest mb-4">Asistencia Técnica y Presupuestaria Inmediata</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">¿INICIANDO ESTUDIOS DE CIMENTACIÓN O CON PROBLEMAS DE EMPUJE EN OBRA?</h2>
              <p className="font-sans text-white/80 mb-8 text-lg">
                Nuestro equipo de ingenieros estructurales y geotécnicos evalúa planos geológicos y requerimientos de carga para entregar propuestas técnico-económicas optimizadas en menos de 24 horas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#" className="inline-flex items-center justify-center gap-2 bg-brand-success hover:bg-[#20b858] text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded transition-colors shadow-lg">
                  <MessageCircle size={20} />
                  Hablar con un especialista geotécnico
                </a>
                <a href="#" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded transition-colors">
                  <Phone size={20} />
                  Llamar a PBX Quito: (02) 299-8700
                </a>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm text-white/70 font-sans">
                <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brand-success" /> Visitas técnicas a obra en Pichincha sin costo</div>
                <div className="flex items-center gap-2"><Clock size={16} className="text-brand-success" /> Respuesta técnica garantizada en 24h</div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
