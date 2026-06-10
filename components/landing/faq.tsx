const faqs = [
  {
    question: '¿Necesito instalar algo para usar SYSIUM TECH?',
    answer:
      'No. SYSIUM TECH funciona completamente desde el navegador, en computadora o celular. Solo necesitas una cuenta y conexión a internet. Sin instalaciones, sin configuraciones complejas.',
  },
  {
    question: '¿Funciona sin conexión a internet en la obra?',
    answer:
      'Actualmente la plataforma requiere conexión a internet para sincronizar datos en tiempo real. Estamos trabajando en un modo offline para zonas con señal limitada. Por ahora, los datos se actualizan automáticamente en cuanto hay conexión disponible.',
  },
  {
    question: '¿Puedo importar mis proyectos y presupuestos desde Excel?',
    answer:
      'Sí. Puedes importar presupuestos y listas de materiales desde archivos Excel (.xlsx) y CSV. El proceso toma pocos minutos y nuestro equipo de soporte te acompaña durante la migración inicial sin costo adicional.',
  },
  {
    question: '¿Cuántos usuarios puede tener mi equipo?',
    answer:
      'Depende del plan. El plan Starter incluye hasta 3 usuarios, Pro hasta 8, Business hasta 30 y Enterprise es ilimitado. Puedes asignar roles distintos: administrador, supervisor de obra, jefe de bodega o cliente con vista de solo lectura.',
  },
  {
    question: '¿Tienen aplicación móvil para Android e iOS?',
    answer:
      'La plataforma web está completamente optimizada para móvil y funciona como una PWA (Progressive Web App), lo que significa que puedes agregarla a tu pantalla de inicio como si fuera una app nativa. Una app dedicada para iOS y Android está en nuestro roadmap.',
  },
  {
    question: '¿Qué pasa con mis datos si decido cancelar?',
    answer:
      'Tus datos son tuyos. Si cancelas, puedes exportar toda tu información (proyectos, presupuestos, inventario, reportes) en formatos estándar como PDF, Excel y CSV antes de cerrar tu cuenta. Conservamos tus datos por 30 días adicionales tras la cancelación.',
  },
  {
    question: '¿Los precios incluyen IVA?',
    answer:
      'No. Los precios mostrados son antes de IVA. Para clientes en México se aplicará el 16% de IVA correspondiente. Para otros países de LATAM aplicarán los impuestos locales de cada nación.',
  },
  {
    question: '¿Cómo es el soporte técnico?',
    answer:
      'Todos los planes incluyen soporte por email en español. El plan Pro incluye soporte prioritario con respuesta en menos de 24 horas. Business incluye onboarding personalizado. Enterprise cuenta con un ejecutivo de cuenta dedicado y soporte 24/7.',
  },
]

export default function FAQ() {
  return (
    <section
      id="faq"
      className="bg-white py-24"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sysium-600 text-sm font-bold uppercase tracking-widest">
            Preguntas frecuentes
          </span>
          <h2
            id="faq-heading"
            className="mt-3 text-4xl font-black text-slate-900"
          >
            Todo lo que necesitas
            <br />
            <span className="text-sysium-600">saber antes de empezar</span>
          </h2>
        </div>

        <dl className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border border-slate-200 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-slate-900 hover:bg-slate-50 transition-colors">
                <dt className="text-sm sm:text-base">{faq.question}</dt>
                {/* Chevron */}
                <svg
                  className="w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <dd className="px-6 pb-5 pt-0 text-sm text-slate-500 leading-relaxed border-t border-slate-100">
                {faq.answer}
              </dd>
            </details>
          ))}
        </dl>

        <p className="text-center text-slate-400 text-sm mt-12">
          ¿Tienes otra pregunta?{' '}
          <a
            href="/contact"
            className="text-sysium-600 hover:text-sysium-500 font-medium transition-colors"
          >
            Escríbenos
          </a>
          {' '}y te respondemos en menos de 24 horas.
        </p>
      </div>
    </section>
  )
}
