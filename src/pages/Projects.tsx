import { Download, MapPin, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Projects() {
  const projects = [
    {
      title: "Mitigación de riesgos y conducción de aguas lluvias – Museo Yaku",
      location: "Quito Centro",
      service: "Drenaje & Shotcrete",
      client: "Superintendencia de Obra",
      desc: "Perforación para anclajes con hormigón proyectado y control integral de drenaje en ladera de alta pendiente, precautelando patrimonio urbano y geotécnico."
    },
    {
      title: "Protección de taludes y puente peatonal",
      location: "Pichincha",
      service: "Pilotaje Prebarrenado",
      client: "Consorcio Talud y Puente",
      desc: "Pilotaje prebarrenado con tubería de recubrimiento perimetral para contención de estribos y estabilización sísmica del paso peatonal interconectado."
    },
    {
      title: "Puente Majua de 50 metros de Luz",
      location: "Costa / Esmeraldas",
      service: "Hincado Ø 35cm",
      client: "Abicer Constructora Cía. Ltda.",
      desc: "Pilotes hincados con tubería de acero Ø 35cm a 12m de profundidad en lecho de arrastre aluvial y estratos de socavación activa fluvial."
    },
    {
      title: "Puente vehicular sobre el Río Monjas",
      location: "Pomasqui",
      service: "Tubería Ø 0.75m",
      client: "Consorcio Monjas",
      desc: "Pilotes con prebarrenado y técnica de vibrohincado profundo, tubería Ø 0.75m, alcanzando 12 metros de penetración en quebrada de alta erosión."
    },
    {
      title: "Puente Sector Puente 8 – Autopista Gral. Rumiñahui",
      location: "Valle Chillos",
      service: "Prof. 20 Metros",
      client: "Ing. Jorge Castillo A.",
      desc: "Pilotes prebarrenados Ø 0.60m - 0.80m alcanzando 20m en estrato vulcanosedimentario denso para soportar tráfico pesado intercantonal continuo."
    },
    {
      title: "Estabilización de taludes – Chillogallo y La Argelia",
      location: "Quito Sur",
      service: "Anclajes & Shotcrete",
      client: "Ing. Byron Suquillo L.",
      desc: "Perforación e inyección de lechada controlada para anclajes pasivos y activos con doble capa de shotcrete armado con fibras estructurales."
    }
  ];

  return (
    <div className="bg-brand-bg w-full">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-brand-primary"></span>
          <span className="font-display font-bold text-xs uppercase tracking-widest text-brand-muted">Portafolio Geotécnico Verificado</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-brand-text mb-4">RESPALDO Y EXPERIENCIA<br/>COMPROBADA</h1>
            <p className="text-lg text-brand-muted font-sans max-w-2xl">
              Cada proyecto que ejecutamos cuenta con certificación oficial y acta de entrega-recepción de nuestros clientes. Obras de infraestructura vial, urbana e hidroeléctrica en todo el Ecuador.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-brand-deep hover:bg-brand-primary text-white font-display font-bold uppercase tracking-wider px-6 py-4 rounded transition-colors shadow-sm shrink-0">
            <Download size={18} /> Solicitar Dossier Completo
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded border border-brand-border text-center">
            <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Obras Certificadas</div>
            <div className="font-display font-bold text-3xl text-brand-primary">140+ <span className="text-sm font-sans text-brand-muted">Actas</span></div>
          </div>
          <div className="bg-white p-6 rounded border border-brand-border text-center">
            <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Profundidad Máxima</div>
            <div className="font-display font-bold text-3xl text-brand-primary">35.0 <span className="text-sm font-sans text-brand-muted">Metros</span></div>
          </div>
          <div className="bg-white p-6 rounded border border-brand-border text-center">
            <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Normativa Sísmica</div>
            <div className="font-display font-bold text-3xl text-brand-primary">NEC-15</div>
          </div>
          <div className="bg-white p-6 rounded border border-brand-border text-center">
            <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Cobertura Nacional</div>
            <div className="font-display font-bold text-3xl text-brand-primary">24 <span className="text-sm font-sans text-brand-muted">Provincias</span></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-brand-border pb-6">
          <button className="bg-brand-primary text-white font-display font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full">Todos (6)</button>
          <button className="bg-white border border-brand-border text-brand-muted hover:text-brand-text font-display font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors">Pilotaje y Cimentación</button>
          <button className="bg-white border border-brand-border text-brand-muted hover:text-brand-text font-display font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors">Estabilización de Taludes</button>
          <button className="bg-white border border-brand-border text-brand-muted hover:text-brand-text font-display font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors">Puentes & Viales</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="bg-white rounded-xl border border-brand-border overflow-hidden hover:shadow-md transition-all group">
              <div className="aspect-[4/3] bg-gray-200 relative">
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-display font-bold text-brand-text uppercase tracking-widest flex items-center gap-1 shadow-sm">
                   <ShieldCheck size={12} className="text-brand-primary" /> Trabajo Certificado
                 </div>
                 <div className="absolute bottom-4 left-4 flex gap-2">
                   <span className="bg-white text-brand-text text-[10px] font-display font-bold px-2 py-1 uppercase tracking-widest rounded shadow-sm">{p.location}</span>
                   <span className="bg-brand-primary text-white text-[10px] font-display font-bold px-2 py-1 uppercase tracking-widest rounded shadow-sm">{p.service}</span>
                 </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-brand-text mb-4 min-h-[56px] leading-snug">{p.title}</h3>
                <div className="bg-brand-bg rounded p-3 border border-brand-border mb-4">
                  <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Mandante Oficial:</div>
                  <div className="font-sans font-semibold text-sm text-brand-text">{p.client}</div>
                </div>
                <p className="font-sans text-sm text-brand-muted mb-6 min-h-[80px]">{p.desc}</p>
                <div className="flex items-center justify-between border-t border-brand-border pt-4">
                  <span className="flex items-center gap-1 text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest">
                    <CheckCircle size={12} className="text-brand-success" /> Acta Definitiva #{1419 + i}
                  </span>
                  <Link to="#" className="flex items-center gap-1 text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest group-hover:text-brand-deep transition-colors">
                    Ficha Técnica <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-brand-deep text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShieldCheck size={48} className="mx-auto text-brand-primary mb-6" />
          <div className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest mb-4">Criterios de Calidad Innegociables</div>
          <h2 className="text-3xl font-display font-bold mb-6">GARANTÍA GEOTÉCNICA CERTIFICADA</h2>
          <p className="font-sans text-white/80">
            Nuestro rigor operativo no depende de promesas; se fundamenta en normativas internacionales, pruebas sónicas in situ y actas suscritas por fiscalizadores certificados.
          </p>
        </div>
      </section>
    </div>
  );
}
