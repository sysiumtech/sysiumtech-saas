import Link from 'next/link'
import { Check, Zap, Building2 } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    prefix: '',
    price: 'Gratis',
    period: 'para siempre',
    description: 'Para comenzar a digitalizar tu primera obra sin riesgo.',
    cta: 'Empieza gratis',
    href: '/register',
    featured: false,
    enterprise: false,
    features: [
      '1 proyecto activo',
      'Hasta 3 usuarios',
      'Presupuesto básico',
      'Inventario de materiales',
      'Soporte por email',
    ],
  },
  {
    name: 'Pro',
    prefix: '',
    price: '$1,990',
    period: 'MXN / mes',
    description: 'Entra al siguiente nivel con control real sobre tus obras.',
    cta: 'Comenzar prueba gratis',
    href: '/register?plan=pro',
    featured: false,
    enterprise: false,
    features: [
      'Hasta 3 proyectos activos',
      'Hasta 8 usuarios',
      'Reportes automáticos PDF',
      'Alertas inteligentes',
      'Control de presupuesto avanzado',
      'Soporte prioritario en español',
    ],
  },
  {
    name: 'Business',
    prefix: '',
    price: '$4,900',
    period: 'MXN / mes',
    description: 'La plataforma completa para constructoras PYME en operación.',
    cta: 'Iniciar ahora',
    href: '/register?plan=business',
    featured: true,
    enterprise: false,
    features: [
      'Hasta 20 proyectos activos',
      'Hasta 30 usuarios',
      'Todo lo del plan Pro',
      'API e integraciones',
      'Dashboard ejecutivo',
      'Onboarding personalizado',
    ],
  },
  {
    name: 'Enterprise',
    prefix: 'Desde',
    price: '$9,900',
    period: 'MXN / mes',
    description: 'Para grupos constructores con operaciones a gran escala en LATAM.',
    cta: 'Contactar ventas',
    href: '/register?plan=enterprise',
    featured: false,
    enterprise: true,
    features: [
      'Proyectos ilimitados',
      'Usuarios ilimitados',
      'Todo lo del plan Business',
      'Panel multi-empresa',
      'SLA garantizado',
      'Soporte dedicado 24/7',
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="text-sysium-600 text-sm font-bold uppercase tracking-widest">
            Precios
          </span>
          <h2 className="mt-3 text-4xl font-black text-slate-900">
            Planes transparentes.
            <br />
            <span className="text-sysium-600">Sin sorpresas.</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Comienza gratis y escala cuando lo necesites. Sin contratos de permanencia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.featured
                  ? 'bg-gradient-to-b from-sysium-900 to-sysium-950 text-white shadow-2xl shadow-sysium-900/40 lg:-mt-4 lg:pb-11'
                  : plan.enterprise
                  ? 'bg-[#0d1117] text-white border border-slate-700'
                  : 'bg-white border border-slate-200 text-slate-900'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    <Zap className="w-3 h-3" />
                    Más popular
                  </span>
                </div>
              )}

              {plan.enterprise && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-slate-600 to-slate-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    <Building2 className="w-3 h-3" />
                    A medida
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-5">
                <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${
                  plan.featured ? 'text-sysium-300' : plan.enterprise ? 'text-slate-400' : 'text-sysium-600'
                }`}>
                  {plan.name}
                </p>

                <div className="flex items-baseline gap-1 flex-wrap">
                  {plan.prefix && (
                    <span className={`text-sm font-medium ${
                      plan.enterprise ? 'text-slate-400' : 'text-slate-400'
                    }`}>
                      {plan.prefix}
                    </span>
                  )}
                  <span className="text-3xl font-black leading-none">{plan.price}</span>
                  <span className={`text-xs ${
                    plan.featured ? 'text-sysium-400' : plan.enterprise ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    {plan.period}
                  </span>
                </div>

                <p className={`mt-3 text-xs leading-relaxed ${
                  plan.featured ? 'text-sysium-300' : plan.enterprise ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-7 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-xs">
                    <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                      plan.featured ? 'text-sysium-300' : plan.enterprise ? 'text-slate-400' : 'text-sysium-500'
                    }`} />
                    <span className={
                      plan.featured ? 'text-slate-200' : plan.enterprise ? 'text-slate-300' : 'text-slate-600'
                    }>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.href}
                className={`block text-center font-bold py-3 rounded-xl transition-all text-sm mt-auto ${
                  plan.featured
                    ? 'bg-white text-sysium-900 hover:bg-slate-100'
                    : plan.enterprise
                    ? 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600'
                    : 'bg-sysium-600 text-white hover:bg-sysium-500'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-400 text-xs mt-10">
          Todos los precios en MXN + IVA. Sin contrato de permanencia. Cancela cuando quieras.
        </p>

      </div>
    </section>
  )
}
