import { CheckCircle2, ArrowRight, Clock, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import anclajes from '../images/anclajes.png';
//import cimentacionPrimaria from '../images/cimentaciónPrimaria.png';
//import hincado from '../images/hincado.png';
//import taludes from '../images/taludes.png';

export default function Home() {
  return (
    <div className="bg-brand-bg w-full">
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="space-y-8 lg:col-span-7 xl:col-span-6 break-words">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-brand-border rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-amber"></span>
              <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">Ingeniería Geotécnica & Cimentaciones Profundas - Ecuador</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl font-display font-bold text-brand-text leading-[1.1] tracking-tight">
              Perfor Construcciones<br/>
              <span className="text-brand-primary text-3xl sm:text-4xl">Pilotaje y Estabilización de Taludes en Quito, Ecuador</span>
            </h1>
            
            <p className="text-lg text-brand-muted font-sans max-w-xl text-justify">
              Soluciones de perforación, pilotaje y estabilización de taludes con experiencia técnica comprobada en proyectos de infraestructura civil en todo el Ecuador.
            </p>
            
           
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contacto" className="inline-flex items-center justify-center gap-2 bg-brand-amber hover:bg-brand-amber-dark text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded shadow-[0_2px_4px_rgba(42,107,130,0.04)] transition-colors">
                <MessageCircle size={20} />
                Cotiza tu proyecto
              </Link>
              <Link to="/servicios" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-brand-border text-brand-deep font-display font-bold uppercase tracking-wider px-6 py-4 rounded transition-colors">
                Ver nuestros servicios
                <ArrowRight size={20} />
              </Link>
            </div>
            
          </div>
          
          <div className="relative lg:col-span-5 xl:col-span-6 mt-8 lg:mt-0">
            <div className="aspect-[4/3] rounded-xl bg-gray-200 border border-brand-border shadow-[0_16px_32px_rgba(43,47,51,0.08)] overflow-hidden relative">
               <img
                 src="https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979975/home.png"
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
            <div>
              <div className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest mb-3">Capacidades Operativas Especializadas</div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-[#006781] max-w-xl">INGENIERÍA DE SUELOS & PERFORACIÓN PROFUNDA</h2>
            </div>
            <p className="font-sans text-brand-muted max-w-md lg:text-right text-justify">
              Equipamiento de alto rendimiento operado bajo rigurosos protocolos geotécnicos para garantizar la estabilidad de superestructuras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {/* Service 1 */}
             <div className="bg-brand-bg rounded-lg border border-brand-border overflow-hidden group">
               <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                 <img
                   src="https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/cimentaci%C3%B3nPrimaria.png"
                   alt="Cimentación primaria con pilotaje prebarrenado CFA"
                   className="absolute inset-0 h-full w-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <span className="font-display font-bold text-[10px] bg-white text-brand-text px-3 py-1 uppercase tracking-widest rounded">Cimentación Primaria</span>
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="font-display font-bold text-2xl text-brand-text mb-3">Pilotaje Prebarrenado CFA</h3>
                 <p className="font-sans text-sm text-brand-muted mb-6 text-justify">
                   Ejecución continua de pilotes de gran diámetro para edificaciones de altura y viaductos. Perforación con inyección simultánea de hormigón que minimiza la descompresión del suelo andino.
                 </p>
                
                 
               </div>
             </div>

             {/* Service 2 */}
             <div className="bg-brand-bg rounded-lg border border-brand-border overflow-hidden group">
               <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                 <img
                   src="https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/hincado.png"
                   alt="Hincado y vibrohincado de pilotes y tablestacas"
                   className="absolute inset-0 h-full w-full object-cover"
                 />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <span className="font-display font-bold text-[10px] bg-white text-brand-text px-3 py-1 uppercase tracking-widest rounded">Refuerzo Estructural</span>
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="font-display font-bold text-2xl text-brand-text mb-3">Hincado y Vibrohincado de pilotes y tablestacas</h3>
                 <p className="font-sans text-sm text-brand-muted mb-6 text-justify">
                   Soluciones de soporte en espacios confinados, submuraciones de edificios patrimoniales e inyecciones de lechada a alta presión para mejorar la capacidad portante del estrato base.
                 </p>
                 
               </div>
             </div>
             
              {/* Service 3 */}
             <div className="bg-brand-bg rounded-lg border border-brand-border overflow-hidden group">
               <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                 <img
                   src="https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979975/anclajes.png"
                   alt="Anclajes para muros pantalla de hormigón"
                   className="absolute inset-0 h-full w-full object-cover"
                 />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <span className="font-display font-bold text-[10px] bg-white text-brand-text px-3 py-1 uppercase tracking-widest rounded">Contención Profunda</span>
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="font-display font-bold text-2xl text-brand-text mb-3">Anclajes para muros pantalla de hormigón</h3>
                 <p className="font-sans text-sm text-brand-muted mb-6 text-justify">
                   Sistemas integrales de contención perimetral para sótanos de gran profundidad en áreas urbanas densas, previniendo asentamientos en predios e infraestructura vecina.
                 </p>
                
               </div>
             </div>

              {/* Service 4 */}
             <div className="bg-brand-bg rounded-lg border border-brand-border overflow-hidden group">
               <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                 <img
                   src="https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979978/taludes.png"
                   alt="Estabilización de taludes"
                   className="absolute inset-0 h-full w-full object-cover"
                 />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <span className="font-display font-bold text-[10px] bg-white text-brand-text px-3 py-1 uppercase tracking-widest rounded">Mitigación de Riesgo</span>
                 </div>
               </div>
               <div className="p-8">
                 <h3 className="font-display font-bold text-2xl text-brand-text mb-3">Estabilización de Taludes</h3>
                 <p className="font-sans text-sm text-brand-muted mb-6 text-justify">
                   Blindaje geotécnico en laderas y cortes viales mediante hormigón lanzado por vía húmeda (shotcrete), colocación de malla electrosoldada, colocación de geomanto y malla triple torsión. Especialistas en perforación en suelo, perforación en roca y drenes californianos subhorizontales.
                 </p>
                 
               </div>
             </div>

          </div>
        </div>
      </section>

      
    </div>
  );
}
