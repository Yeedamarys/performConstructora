import { useEffect, useState } from 'react';
import { Download, ImageIcon, ShieldCheck, X } from 'lucide-react';
const getImg = (name: string) => `https://res.cloudinary.com/ddegmlh4o/image/upload/f_auto,q_auto/${name}`;

const p1f1 = getImg('p1f1.png');
const p2f1 = getImg('p2f1.jpg');
const p2f2 = getImg('p2f2.png');
const p3f1 = getImg('p3f1.png');
const p3f2 = getImg('p3f2.png');
const p4f1 = getImg('p4f1.png');
const p4f2 = getImg('p4f2.png');
const p5f1 = getImg('p5f1.png');
const p5f2 = getImg('p5f2.png');
const p6f1 = getImg('p6f1.png');
const p6f2 = getImg('p6f2.png');
const p7f1 = getImg('p7f1.png');
const p7f2 = getImg('p7f2.png');
const p8f1 = getImg('p8f1.png');
const p8f2 = getImg('p8f2.png');

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const projects = [
    {
      title: "Museo Yaku — Perforación y anclaje en talud",
      service: "Anclajes en talud",
      client: "Ing. Eduardo Lazcano",
      year: "Agosto 2023",
      desc: "Perforación y anclaje en talud del Museo Yaku.",
      images: [p1f1]
    },
    {
      title: "Puente vehicular sobre el río Monjas — Sector Pomasqui",
      service: "Pilotaje Ø 0.80 m",
      client: "Ing. Luis Urgiles",
      year: "Diciembre 2024",
      desc: "Pilotaje de Ø 0.80 m a 12 m de profundidad con camisa perdida.",
      images: [p2f1, p2f2]
    },
    {
      title: "Proyecto Orquídeas — Mitigación de riesgo río Monjas",
      service: "Estabilización de taludes",
      client: "Consorcio Gaviones Quito",
      team: "Ing. Marco Peralta · Ing. Carlos Sánchez · Ing. Steve Burgos",
      year: "2025–2026",
      desc: "Estabilización de taludes para la mitigación de riesgo en el río Monjas.",
      images: [p3f1, p3f2]
    },
    {
      title: "Proyecto Orquídeas — Protección del río Machángara",
      service: "Anclajes y geomanto",
      client: "Ing. Francisco Vaca",
      year: "Septiembre 2025",
      desc: "Anclajes y colocación de geomanto con malla de triple torsión.",
      images: [p4f1, p4f2]
    },
    {
      title: "Construcción de hospital privado — Loja",
      service: "Micropilotaje Ø 0.38 m",
      client: "Ing. Salomón Rosero",
      year: "Junio 2026",
      desc: "Micropilotaje de Ø 0.38 m a 18 m de profundidad con camisa perdida.",
      images: [p5f1, p5f2]
    },
    {
      title: "Protección de talud en río Monjas — Sector La Pampa",
      service: "Tubería hincada Ø 0.30 m",
      client: "Ing. Francisco Vaca",
      year: "Mayo 2025",
      desc: "Tubería hincada de Ø 0.30 m a 8 m de profundidad.",
      images: [p6f1, p6f2]
    },
    {
      title: "Puente vehicular de Majua — Cantón Viche",
      service: "Tubería hincada Ø 0.30 m",
      client: "Ing. Abigail Cedeño",
      year: "Marzo 2024",
      desc: "Tubería hincada de Ø 0.30 m a 12 m de profundidad.",
      images: [p7f1, p7f2]
    },
    {
      title: "Cimentación para el proyecto Acua Shops",
      service: "Pilotaje Ø 0.80 m",
      client: "IFCE Cimentaciones Ecuador",
      year: "Julio 2026",
      desc: "Pilotaje de Ø 0.80 m a 23 m de profundidad para la cimentación del proyecto.",
      images: [p8f1, p8f2]
    }
  ];

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

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
          <button className="bg-brand-primary text-white font-display font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full">Todos (8)</button>
          <button className="bg-white border border-brand-border text-brand-muted hover:text-brand-text font-display font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors">Pilotaje y Cimentación</button>
          <button className="bg-white border border-brand-border text-brand-muted hover:text-brand-text font-display font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors">Estabilización de Taludes</button>
          <button className="bg-white border border-brand-border text-brand-muted hover:text-brand-text font-display font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-colors">Puentes & Viales</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="bg-white rounded-xl border border-brand-border overflow-hidden hover:shadow-md transition-all group">
              <div className="grid grid-cols-2 gap-px bg-brand-border">
                {p.images && p.images[0] ? (
                  <button
                    type="button"
                    onClick={() => setSelectedImage({ src: p.images[0], alt: `Proyecto ${i + 1}: ${p.title}, foto 1` })}
                    className="aspect-square bg-brand-bg overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
                    aria-label={`Ampliar primera imagen del proyecto ${i + 1}`}
                  >
                    <img
                      src={p.images[0]}
                      alt={`Proyecto ${i + 1}: ${p.title}, foto 1`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </button>
                ) : (
                  <div className="aspect-square bg-brand-bg flex flex-col items-center justify-center gap-2 p-3 text-center text-brand-muted">
                    <ImageIcon size={24} strokeWidth={1.5} />
                    <span className="font-display font-bold text-[9px] uppercase tracking-widest">Espacio para foto 1</span>
                  </div>
                )}
                {p.images && p.images[1] ? (
                  <button
                    type="button"
                    onClick={() => setSelectedImage({ src: p.images[1], alt: `Proyecto ${i + 1}: ${p.title}, foto 2` })}
                    className="aspect-square bg-brand-bg overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
                    aria-label={`Ampliar segunda imagen del proyecto ${i + 1}`}
                  >
                    <img
                      src={p.images[1]}
                      alt={`Proyecto ${i + 1}: ${p.title}, foto 2`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </button>
                ) : (
                  <div className="aspect-square bg-brand-bg flex flex-col items-center justify-center gap-2 p-3 text-center text-brand-muted">
                    <ImageIcon size={24} strokeWidth={1.5} />
                    <span className="font-display font-bold text-[9px] uppercase tracking-widest">Espacio para foto 2</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="bg-brand-primary text-white text-[10px] font-display font-bold px-2 py-1 uppercase tracking-widest rounded">Proyecto {i + 1}</span>
                  <span className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest text-right">{p.year}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-brand-text mb-4 leading-snug">{p.title}</h3>
                <div className="bg-brand-bg rounded p-3 border border-brand-border mb-4">
                  <div className="text-[10px] font-display font-bold text-brand-muted uppercase tracking-widest mb-1">Responsable / Cliente:</div>
                  <div className="font-sans font-semibold text-sm text-brand-text">{p.client}</div>
                  {p.team && <div className="font-sans text-xs text-brand-muted mt-2 leading-relaxed">{p.team}</div>}
                </div>
                <p className="font-sans text-sm text-brand-muted">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada del proyecto"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-text shadow-lg transition-colors hover:bg-brand-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Cerrar imagen ampliada"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Trust Section */}
      <section className="bg-brand-deep text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShieldCheck size={48} className="mx-auto #fff mb-6" />
          <div className="text-[10px] font-display font-bold #fff uppercase tracking-widest mb-4">Criterios de Calidad Innegociables</div>
          <h2 className="text-3xl font-display font-bold mb-6">GARANTÍA GEOTÉCNICA CERTIFICADA</h2>
          <p className="font-sans text-white/80">
            Nuestro rigor operativo no depende de promesas; se fundamenta en normativas internacionales, pruebas sónicas in situ y actas suscritas por fiscalizadores certificados.
          </p>
        </div>
      </section>
    </div>
  );
}
