const testimonials = [
  {
    quote:
      'Antes llevaba todo en Excel y WhatsApp. Con SYSIUM pasé a tener mis 4 obras bajo control desde el celular. Se acabaron las llamadas a las 11 de la noche preguntando cuánto material queda.',
    name: 'Carlos Mendoza',
    role: 'Director de obras',
    company: 'Constructora Mendoza e Hijos',
    location: 'Monterrey, México',
    avatar: 'CM',
  },
  {
    quote:
      'Lo que más me convenció fue que en dos horas ya tenía mi primer proyecto cargado. No necesité capacitar a mi equipo, es muy intuitivo. Y el soporte en español hace toda la diferencia.',
    name: 'Valentina Rojas',
    role: 'Gerente de proyectos',
    company: 'VR Construcciones',
    location: 'Bogotá, Colombia',
    avatar: 'VR',
  },
  {
    quote:
      'Las alertas de presupuesto me salvaron en un proyecto que iba a tener sobrecosto del 20%. Ahora mis clientes reciben reportes automáticos y la confianza en nuestra empresa cambió por completo.',
    name: 'Alejandro Torres',
    role: 'Fundador',
    company: 'Torres Edificaciones',
    location: 'Guadalajara, México',
    avatar: 'AT',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-24" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sysium-600 text-sm font-bold uppercase tracking-widest">
            Testimonios
          </span>
          <h2
            id="testimonials-heading"
            className="mt-3 text-4xl font-black text-slate-900"
          >
            Lo que dicen nuestros
            <br />
            <span className="text-sysium-600">primeros usuarios</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Constructoras PYME de México y Colombia ya están digitalizando sus obras con SYSIUM TECH.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5" aria-label="5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-orange-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-sysium-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-slate-900 font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">
                    {t.role} · {t.company}
                  </p>
                  <p className="text-slate-400 text-xs">{t.location}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
