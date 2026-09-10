import { CheckCircle2, Award, Shield, FileCheck, Hammer, Activity, Target, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import nosotrosImage from '../images/nosotros.png';

export default function About() {
  return (
    <div className="bg-brand-bg w-full">
      {/* Header */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-6 h-[2px] bg-brand-primary"></span>
          <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">Ingeniería Estructural Subterránea</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-brand-text mb-6">¿QUIÉNES SOMOS?</h1>
        <p className="text-lg text-brand-muted font-sans max-w-3xl">
          Más de una década ejecutando soluciones de perforación profunda, estabilización de taludes críticos y cimentación especial con rigor analítico y respaldo instrumental en el territorio ecuatoriano.
        </p>
      </section>

      {/* Main Intro */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-brand-border shadow-sm p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                 <span className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest">Propósito Fundacional</span>
              </div>
             <h2 className="font-display font text-[15] text-brand-text mb-6 leading-relaxed">
             Perfo Construcciones fue creada para desarrollar y ejecutar proyectos de pilotaje, estabilización de taludes y construcciones de obra civil, satisfaciendo la necesidad de nuestros clientes con soluciones técnicas confiables, innovación y cumplimiento de plazos establecidos. Aportando experiencia y conocimiento técnico que generan confianza, valor y bienestar para nuestros clientes, colaboradores y la comunidad, impulsando el crecimiento del país a través de obras de excelencia.</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-4 border-t border-brand-border pt-8">
              <div>
                <div className="w-8 h-8 rounded bg-brand-bg flex items-center justify-center text-brand-primary mb-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                </div>
                <div className="font-display font-bold text-2xl text-brand-text">350+</div>
                <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mt-1">Sondeos y Pilotes<br/>Ejecutados</div>
              </div>
              <div>
                <div className="w-8 h-8 rounded bg-brand-bg flex items-center justify-center text-brand-amber mb-3">
                  <Activity size={16} />
                </div>
                <div className="font-display font-bold text-2xl text-brand-text">100%</div>
                <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mt-1">Flota Mecánica<br/>Continua</div>
              </div>
              <div>
                <div className="w-8 h-8 rounded bg-brand-bg flex items-center justify-center text-brand-success mb-3">
                  <Shield size={16} />
                </div>
                <div className="font-display font-bold text-2xl text-brand-text">0 NO</div>
                <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mt-1">Conformidades<br/>Estructurales</div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-brand-border overflow-hidden relative aspect-square lg:aspect-auto min-h-[320px]">
             <img
               src={nosotrosImage}
               alt="Equipo de Perfo Construcciones en obra"
               className="absolute inset-0 h-full w-full object-cover"
             />
             
          </div>
        </div>
        
        {/* Sub Banner */}
        <div className="bg-brand-deep rounded-b-xl px-8 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-brand-border/20 text-white shadow-md">
           <div className="flex items-center gap-3">
             <Award size={18} className="text-brand-amber" />
             <span className="text-[10px] font-display font-bold uppercase tracking-widest">Estratigrafía Típica de Operación en Suelos Andinos y Costa</span>
           </div>
          
        </div>
      </section>

      

      {/* Mission & Vision */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-brand-primary"></span>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">Identidad Corporativa</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-3xl font-display font-bold text-brand-text">Misión y Visión</h2>
            
          </div>
          <p className="font-sans text-brand-muted mt-4 max-w-2xl">
            Nuestros principios fundamentales guían cada proyecto que ejecutamos, definiendo quiénes somos hoy y hacia dónde nos proyectamos como empresa líder en construcción especializada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Mission */}
           <div className="bg-white rounded-xl border border-brand-border shadow-sm p-8">
             <div className="flex items-start justify-between mb-8">
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 bg-brand-bg rounded-full overflow-hidden border border-brand-border flex items-center justify-center text-brand-primary">
                   <Target size={28} />
                 </div>
                 <div>
                   <div className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest mb-1">Propósito Corporativo</div>
                   <h3 className="font-display font-bold text-xl text-brand-text">Misión</h3>
                   <div className="text-xs text-brand-muted font-sans mt-1">Perfo Construcciones</div>
                 </div>
               </div>
               <div className="w-8 h-8 rounded bg-brand-bg flex items-center justify-center text-brand-primary border border-brand-border">
                 <Award size={16} />
               </div>
             </div>
             <div className="bg-brand-bg rounded p-6 border border-brand-border mb-6">
               <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-2">Nuestro Compromiso</div>
               <p className="font-sans text-sm text-brand-text font-semibold mb-3">
                 En Perfo Construcciones brindamos soluciones especializadas en pilotaje, estabilización de taludes y construcciones de obra civil, ejecutando cada proyecto con calidad, seguridad y responsabilidad.
               </p>
               <p className="font-sans text-sm text-brand-muted">
                 Comprometidos en satisfacer las necesidades de nuestros clientes, contamos con un grupo capacitado, maquinaria especializada en el área de ejecución y experiencia para cumplir con los plazos establecidos.
               </p>
             </div>
             <div className="flex flex-wrap gap-2 mb-6">
               <span className="bg-white border border-brand-border text-brand-muted text-[10px] px-3 py-1.5 rounded font-display font-bold uppercase">Calidad</span>
               <span className="bg-white border border-brand-border text-brand-muted text-[10px] px-3 py-1.5 rounded font-display font-bold uppercase">Seguridad</span>
               <span className="bg-white border border-brand-border text-brand-muted text-[10px] px-3 py-1.5 rounded font-display font-bold uppercase">Responsabilidad</span>
             </div>
             <div className="flex items-center justify-between border-t border-brand-border pt-4">
               <span className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest">Grupo Capacitado & Maquinaria Especializada</span>
               <span className="flex items-center gap-1 text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest"><CheckCircle2 size={12} /> Cumplimiento de Plazos</span>
             </div>
           </div>

           {/* Vision */}
           <div className="bg-white rounded-xl border border-brand-border shadow-sm p-8">
             <div className="flex items-start justify-between mb-8">
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 bg-brand-bg rounded-full overflow-hidden border border-brand-border flex items-center justify-center text-brand-primary">
                   <Eye size={28} />
                 </div>
                 <div>
                   <div className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest mb-1">Proyección Estratégica</div>
                   <h3 className="font-display font-bold text-xl text-brand-text">Visión</h3>
                   <div className="text-xs text-brand-muted font-sans mt-1">Horizonte 2030</div>
                 </div>
               </div>
               <div className="w-8 h-8 rounded bg-brand-bg flex items-center justify-center text-brand-primary border border-brand-border">
                 <Shield size={16} />
               </div>
             </div>
             <div className="bg-brand-bg rounded p-6 border border-brand-border mb-6">
               <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-2">Nuestra Meta</div>
               <p className="font-sans text-sm text-brand-text font-semibold mb-3">
                 Ser una empresa líder y reconocida a nivel nacional en el sector de la construcción especializada en pilotaje, estabilización de taludes y construcciones de obra civil, destacándonos por la excelencia técnica, innovación, seguridad y confianza de nuestros clientes.
               </p>
               <p className="font-sans text-sm text-brand-muted">
                 Buscamos un crecimiento sostenible que nos permita participar en los principales proyectos de infraestructura del país, generando valor para nuestros colaboradores y clientes.
               </p>
             </div>
             <div className="flex flex-wrap gap-2 mb-6">
               <span className="bg-white border border-brand-border text-brand-muted text-[10px] px-3 py-1.5 rounded font-display font-bold uppercase">Excelencia Técnica</span>
               <span className="bg-white border border-brand-border text-brand-muted text-[10px] px-3 py-1.5 rounded font-display font-bold uppercase">Innovación</span>
               <span className="bg-white border border-brand-border text-brand-muted text-[10px] px-3 py-1.5 rounded font-display font-bold uppercase">Confianza</span>
             </div>
             <div className="flex items-center justify-between border-t border-brand-border pt-4">
               <span className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest">Liderazgo Nacional en Construcción Especializada</span>
               <span className="flex items-center gap-1 text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest"><CheckCircle2 size={12} /> Crecimiento Sostenible</span>
             </div>
           </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-white border-t border-brand-border py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-brand-primary"></span>
              <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">Diferenciales Técnicos en Terreno</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-brand-text max-w-2xl">Ventajas Competitivas Certificadas</h2>
            <p className="font-sans text-brand-muted mt-4 max-w-3xl">
              Nuestra infraestructura elimina intermediarios y asegura que cada ensayo, pilote y perforación responda con precisión matemática ante las auditorías de fiscalización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-brand-bg border border-brand-border rounded-xl p-8 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-white rounded border border-brand-border flex items-center justify-center text-brand-primary mb-6">
                 <Hammer size={24} />
               </div>
               <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-3">Equipamiento Industrial</div>
               <h3 className="font-display font-bold text-xl text-brand-text mb-4">Maquinaria propia de perforación continua</h3>
               <p className="font-sans text-sm text-brand-muted mb-6">Disponibilidad inmediata sin dependencia de subarrendamientos. Contamos con torres de perforación de hélice continua (CFA), martillos de fondo y equipos de inyección de alta presión propios.</p>
               <ul className="space-y-2 mb-8">
                 <li className="flex items-start gap-2 text-sm text-brand-text font-sans"><span className="w-1.5 h-1.5 bg-brand-primary rounded-sm mt-1.5 shrink-0"></span> Torres hidráulicas de orugas autopropulsadas</li>
                 <li className="flex items-start gap-2 text-sm text-brand-text font-sans"><span className="w-1.5 h-1.5 bg-brand-primary rounded-sm mt-1.5 shrink-0"></span> Cero retrasos por flete o intermediación</li>
               </ul>
               <div className="bg-white border border-brand-border rounded p-3 flex justify-between items-center">
                 <span className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest">Disponibilidad</span>
                 <span className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest">100% Flota Activa</span>
               </div>
             </div>

             <div className="bg-brand-bg border border-brand-border rounded-xl p-8 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-white rounded border border-brand-border flex items-center justify-center text-brand-primary mb-6">
                 <Activity size={24} />
               </div>
               <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-3">Metodología y Calidad</div>
               <h3 className="font-display font-bold text-xl text-brand-text mb-4">Certificación y ensayos de carga</h3>
               <p className="font-sans text-sm text-brand-muted mb-6">Validación empírica en laboratorio y campo. Ensayos PIT (Pile Integrity Test), pruebas de carga estática y ensayos de tracción en anclajes para garantizar solvencia.</p>
               <ul className="space-y-2 mb-8">
                 <li className="flex items-start gap-2 text-sm text-brand-text font-sans"><span className="w-1.5 h-1.5 bg-brand-primary rounded-sm mt-1.5 shrink-0"></span> Ensayos PIT de integridad sónica no destructiva</li>
                 <li className="flex items-start gap-2 text-sm text-brand-text font-sans"><span className="w-1.5 h-1.5 bg-brand-primary rounded-sm mt-1.5 shrink-0"></span> Informes geotécnicos con curvas deformación</li>
               </ul>
               <div className="bg-white border border-brand-border rounded p-3 flex justify-between items-center">
                 <span className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest">Protocolos ASTM</span>
                 <span className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest">ASTM D1143 / D5882</span>
               </div>
             </div>

             <div className="bg-brand-bg border border-brand-border rounded-xl p-8 hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-white rounded border border-brand-border flex items-center justify-center text-brand-primary mb-6">
                 <Shield size={24} />
               </div>
               <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-3">Marco Legal Vinculante</div>
               <h3 className="font-display font-bold text-xl text-brand-text mb-4">Cumplimiento estricto de cronogramas y normativa NEC-SE-DS</h3>
               <p className="font-sans text-sm text-brand-muted mb-6">Diseño sismorresistente acorde a la Norma Ecuatoriana de la Construcción. Compromiso de penalización cero por desfase de cronograma de ruta crítica.</p>
               <ul className="space-y-2 mb-8">
                 <li className="flex items-start gap-2 text-sm text-brand-text font-sans"><span className="w-1.5 h-1.5 bg-brand-primary rounded-sm mt-1.5 shrink-0"></span> Zonificación de aceleración espectral</li>
                 <li className="flex items-start gap-2 text-sm text-brand-text font-sans"><span className="w-1.5 h-1.5 bg-brand-primary rounded-sm mt-1.5 shrink-0"></span> Monitoreo continuo de bermas y asentamientos</li>
               </ul>
               <div className="bg-white border border-brand-border rounded p-3 flex justify-between items-center">
                 <span className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest">Estándar Vial</span>
                 <span className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest">100% Auditable</span>
               </div>
             </div>
          </div>
        </div>
      </section>
      
      {/* Footer Banner CTA */}
      
    </div>
  );
}
