import { CheckCircle2, ChevronRight, Award, Shield, FileCheck, Hammer, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="bg-brand-bg w-full">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-brand-border shadow-sm p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                 <span className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest">Propósito Fundacional</span>
                 <span className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest">Doc-ID: MV-M-2024</span>
              </div>
              <h2 className="font-display font-bold text-2xl text-brand-text mb-6 leading-relaxed">
             M&V PERFOR CONSTRUCCIONES fue creada para desarrollar y ejecutar proyectos de pilotaje, estabilización de taludes y construcciones de obra civil, satisfaciendo la necesidad de nuestros clientes con soluciones técnicas confiables, innovación y cumplimiento de plazos establecidos. aportando experiencia y conocimiento técnico que generan confianza, valor y bienestar para nuestros clientes, colaboradores y la comunidad, impulsando el crecimiento del país a través  de obras de excelencia.</h2>
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
          
          <div className="bg-gray-200 rounded-xl border border-brand-border overflow-hidden relative aspect-square lg:aspect-auto">
             <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 to-transparent flex flex-col justify-end p-8">
               <div className="bg-white/10 backdrop-blur rounded p-4 border border-white/20">
                 <div className="flex justify-between items-center mb-2">
                   <div className="flex items-center gap-2 text-xs font-display font-bold text-white uppercase tracking-widest">
                     <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                     Sondeo Dinámico Activo
                   </div>
                   <div className="bg-white text-brand-text text-[10px] px-2 py-1 rounded font-display font-bold uppercase">
                     Torre CFA 32.5m Prof.
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
        
        {/* Sub Banner */}
        <div className="bg-brand-deep rounded-b-xl px-8 py-4 flex flex-col sm:flex-row justify-between items-center border-t border-brand-border/20 text-white shadow-md">
           <div className="flex items-center gap-3">
             <Award size={18} className="text-brand-amber" />
             <span className="text-[10px] font-display font-bold uppercase tracking-widest">Estratigrafía Típica de Operación en Suelos Andinos y Costa</span>
           </div>
           <div className="text-[10px] font-display font-bold uppercase tracking-widest text-brand-primary">
             CFA / Cargas 180-600 Ton
           </div>
        </div>
      </section>

      {/* Quote */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-brand-deep rounded-xl p-8 md:p-12 relative overflow-hidden shadow-lg border border-brand-primary/20">
           <div className="absolute top-0 right-0 opacity-10">
              <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor"><path d="M14.417 19.333c-2.482 0-4.502-1.954-4.502-4.364 0-2.316 1.89-4.226 4.14-4.35l.36-.002V8.667h1.417v2.443h-.028c1.378.13 2.502 1.258 2.502 2.664v5.56H14.417zm-9.334 0C2.6 19.333.58 17.379.58 14.969c0-2.316 1.89-4.226 4.14-4.35l.36-.002V8.667H6.5v2.443h-.028c1.378.13 2.502 1.258 2.502 2.664v5.56H5.083z"/></svg>
           </div>
           <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
             <div className="flex-1">
               <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight mb-6">
                 "Responsabilidad y desempeño logístico en cada proyecto que ejecutamos."
               </h2>
               <div className="flex items-center gap-4 text-brand-primary text-xs font-display font-bold uppercase tracking-widest">
                 <span className="w-8 h-[2px] bg-brand-primary"></span>
                 Compromiso Molina & Villafuerte
               </div>
             </div>
             <div className="shrink-0">
               <a href="#" className="inline-flex items-center justify-center gap-2 bg-brand-amber hover:bg-brand-amber-dark text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded transition-colors shadow-sm">
                 Protocolo de Ejecución
               </a>
             </div>
           </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-brand-primary"></span>
            <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">Cuadro Ejecutivo y Técnico</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-3xl font-display font-bold text-brand-text">Liderazgo Directivo</h2>
            <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest text-right">Dirección Técnica y Operativa</div>
          </div>
          <p className="font-sans text-brand-muted mt-4 max-w-2xl">
            Liderado por profesionales acreditados con trayectoria directa en obras de envergadura nacional, combinando pericia analítica en subsuelo y solvencia logística en frente de trabajo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Leader 1 */}
           <div className="bg-white rounded-xl border border-brand-border shadow-sm p-8">
             <div className="flex items-start justify-between mb-8">
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden border border-brand-border"></div>
                 <div>
                   <div className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest mb-1">Mando Técnico de Suelos</div>
                   <h3 className="font-display font-bold text-xl text-brand-text">Jordy Villafuerte</h3>
                   <div className="text-xs text-brand-muted font-sans mt-1">Gerente Técnico de Proyecto</div>
                 </div>
               </div>
               <div className="w-8 h-8 rounded bg-brand-bg flex items-center justify-center text-brand-primary border border-brand-border">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
               </div>
             </div>
             <div className="bg-brand-bg rounded p-6 border border-brand-border mb-6">
               <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-2">Áreas de Dominio Ingenieril</div>
               <p className="font-sans text-sm text-brand-text font-semibold mb-2">Especialista en Geotecnia, Pilotaje y Perforación profunda.</p>
               <p className="font-sans text-sm text-brand-muted">Supervisión directa de modelación de suelo, verificación de capacidad portante in situ, cálculo y dirección de muros anclados en excavaciones de gran altura.</p>
             </div>
             <div className="flex flex-wrap gap-2 mb-6">
               <span className="bg-white border border-brand-border text-brand-muted text-[10px] px-3 py-1.5 rounded font-display font-bold uppercase">CFA & Kelly Bar</span>
               <span className="bg-white border border-brand-border text-brand-muted text-[10px] px-3 py-1.5 rounded font-display font-bold uppercase">Análisis Sísmico NEC</span>
             </div>
             <div className="flex items-center justify-between border-t border-brand-border pt-4">
               <span className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest">Colegio de Ingenieros Civiles del Ecuador</span>
               <span className="flex items-center gap-1 text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest"><CheckCircle2 size={12} /> Acreditación Profesional</span>
             </div>
           </div>

           {/* Leader 2 */}
           <div className="bg-white rounded-xl border border-brand-border shadow-sm p-8">
             <div className="flex items-start justify-between mb-8">
               <div className="flex items-center gap-4">
                 <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden border border-brand-border"></div>
                 <div>
                   <div className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest mb-1">Dirección General y Operaciones</div>
                   <h3 className="font-display font-bold text-xl text-brand-text">Kleber Daniel Molina Figueroa</h3>
                   <div className="text-xs text-brand-muted font-sans mt-1">Gerente General de Proyecto</div>
                 </div>
               </div>
               <div className="w-8 h-8 rounded bg-brand-bg flex items-center justify-center text-brand-primary border border-brand-border">
                 <FileCheck size={16} />
               </div>
             </div>
             <div className="bg-brand-bg rounded p-6 border border-brand-border mb-6">
               <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-2">Áreas de Dominio Operativo</div>
               <p className="font-sans text-sm text-brand-text font-semibold mb-2">Gestión Estratégica. Cadena de Suministro y Logística de Obra.</p>
               <p className="font-sans text-sm text-brand-muted">Control y optimización de frentes de maquinaria pesada, suministro oportuno de hormigones y acero de anclaje, garantizando cumplimiento de hitos contractuales.</p>
             </div>
             <div className="flex flex-wrap gap-2 mb-6">
               <span className="bg-white border border-brand-border text-brand-muted text-[10px] px-3 py-1.5 rounded font-display font-bold uppercase">Logística Pesada</span>
               <span className="bg-white border border-brand-border text-brand-muted text-[10px] px-3 py-1.5 rounded font-display font-bold uppercase">Gestión Contractual FIDIC</span>
             </div>
             <div className="flex items-center justify-between border-t border-brand-border pt-4">
               <span className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest">Administración y Contratos Civiles</span>
               <span className="flex items-center gap-1 text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest"><CheckCircle2 size={12} /> Garantía de Suministro</span>
             </div>
           </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-white border-t border-brand-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <section className="bg-brand-border py-8 border-t border-brand-border">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-brand-primary rounded flex items-center justify-center text-white shrink-0">
                <FileCheck size={24} />
             </div>
             <div>
               <h3 className="font-display font-bold text-brand-text">¿Necesita incorporar un subcontratista geotécnico a su licitación?</h3>
               <p className="font-sans text-sm text-brand-muted">Revisión inmediata de memorias de cálculo, curvas granulométricas y sondeos SPT en menos de 24 horas laborables.</p>
             </div>
           </div>
           <div className="flex gap-4 shrink-0">
             <Link to="/contacto" className="bg-brand-deep hover:bg-brand-primary text-white font-display font-bold uppercase tracking-wider text-xs px-6 py-3 rounded transition-colors flex items-center gap-2">
               Coordinar Visita Técnica
             </Link>
           </div>
         </div>
      </section>
    </div>
  );
}
