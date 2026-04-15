const steps = [
  {
    number: '01',
    title: 'Crea tu cuenta gratis',
    description:
      'Regístrate en menos de 2 minutos. Sin tarjeta de crédito. Configura tu empresa y agrega a tu equipo.',
  },
  {
    number: '02',
    title: 'Carga tus proyectos',
    description:
      'Importa tus proyectos actuales o crea nuevos desde cero. Define presupuestos, fechas y responsables.',
  },
  {
    number: '03',
    title: 'Controla en tiempo real',
    description:
      'Accede desde tu celular o computadora. Recibe alertas, aprueba gastos y comparte reportes con tus clientes.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sysium-600 text-sm font-bold uppercase tracking-widest">
            Cómo funciona
          </span>
          <h2 className="mt-3 text-4xl font-black text-slate-900">
            Empieza en minutos,
            <br />
            <span className="text-sysium-600">no en semanas.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-sysium-200 via-sysium-400 to-orange-300 mx-40" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white border-2 border-sysium-100 shadow-lg shadow-sysium-100/30 mb-6">
                  <span className="text-3xl font-black text-sysium-500">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
