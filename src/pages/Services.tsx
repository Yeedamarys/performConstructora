import anclajehormigon from '../images/anclajehormigon.png';
import barrenado from '../images/barrenado.png';
import hincadopilotaje from '../images/hincadopilotaje.png';
import taludes from '../images/taludes.png';

const services = [
  {
    category: 'Cimentación primaria',
    title: 'Pilotaje Barrenado y Prebarrenado',
    image: "https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/barrenado.png",
    alt: 'Pilotaje barrenado y prebarrenado',
    details: [
      ['Diámetros', 'de 0.30 m hasta 1.50 m.'],
      ['Profundidad', 'desde 1 m hasta 35 m.'],
      ['Normas', 'ACI 543 · AASHTO.'],
    ],
  },
  {
    category: 'Refuerzo estructural',
    title: 'Hincado y Vibrohincado de Pilotes y Tablestacas',
    image: "https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/hincadopilotaje.png",
    alt: 'Hincado y vibrohincado de pilotes y tablestacas',
    details: [
      ['Diámetros', 'en tubería de 8 pulgadas hasta 60 pulgadas.'],
      ['Profundidad', 'desde 1 m hasta 25 m.'],
      ['Normas', 'ACI 543 · AASHTO.'],
    ],
  },
  {
    category: 'Contención profunda',
    title: 'Anclajes para Muros Pantalla de Hormigón',
    image: "https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979974/anclajehormigon.png",
    alt: 'Anclajes para muros pantalla de hormigón',
    details: [
      ['Diámetros', 'de 2 pulgadas a 6 pulgadas.'],
      ['Profundidad', 'desde 1 m hasta 18 m.'],
      ['Norma', 'NEC-SE-GC.'],
    ],
  },
  {
    category: 'Mitigación de riesgo',
    title: 'Estabilización de Taludes',
    image: "https://res.cloudinary.com/ddegmlh4o/image/upload/v1788979978/taludes.png",
    alt: 'Estabilización de taludes',
    description: 'Ejecutamos soluciones integrales para proteger y estabilizar taludes, desde la preparación de la superficie hasta el refuerzo y revestimiento final. Especialistas en perforación en suelo y perforación en roca para anclajes.',
    details: [
      ['Perfilado de talud', 'de 5 cm a 20 cm.'],
      ['Refuerzo estructural', 'Colocación de malla electrosoldada, geomanto y malla triple torsión.'],
      ['Anclajes', 'diámetro de 2 a 6 pulgadas y profundidad de 1 m a 18 m.'],
      ['Hormigón lanzado', 'espesor de 5 cm a 20 cm.'],
      ['Consolidación', 'Inyección de lechada para consolidación de estratos.'],
      ['Norma', 'CE.020.'],
    ],
  },
];

export default function Services() {
  return (
    <main className="bg-brand-bg">
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
          <div>
            <div className="text-[10px] font-display font-bold text-brand-primary uppercase tracking-widest mb-3">
              Capacidades Operativas Especializadas
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-text max-w-xl">
              SERVICIOS DE INGENIERÍA GEOTÉCNICA
            </h1>
          </div>
          <p className="font-sans text-brand-muted max-w-md lg:text-right text-justify">
            Soluciones técnicas para cimentaciones, contención y estabilización, ejecutadas con parámetros definidos y normativa aplicable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <article key={service.title} className="bg-white rounded-lg border border-brand-border overflow-hidden group">
              <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                  <span className="font-display font-bold text-[10px] bg-white text-brand-text px-3 py-1 uppercase tracking-widest rounded">
                    {service.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h2 className="font-display font-bold text-2xl text-brand-text mb-4">{service.title}</h2>
                {service.description && (
                  <p className="font-sans text-sm text-brand-muted leading-relaxed mb-5 text-justify">{service.description}</p>
                )}
                <dl className="space-y-2.5 font-sans text-sm text-brand-muted leading-relaxed">
                  {service.details.map(([label, detail]) => (
                    <div key={label}>
                      <dt className="inline font-bold text-brand-text">{label}: </dt>
                      <dd className="inline">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
