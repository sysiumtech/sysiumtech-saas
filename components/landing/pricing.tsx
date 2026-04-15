import Link from 'next/link'
import { Check, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 'Gratis',
    period: 'para siempre',
    description: 'Ideal para comenzar a digitalizar tu primera obra.',
    cta: 'Empieza gratis',
    href: '/register',
    featured: false,
    features: [
      '1 proyecto activo',
      'Hasta 3 usuarios',
      'Gestión de presupuesto básica',
      'Inventario de materiales',
      'Soporte por email',
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'USD / mes',
    description: 'Para constructoras con múltiples proyectos en curso.',
    cta: 'Comenzar prueba gratis',
    href: '/register?plan=pro',
    featured: true,
    features: [
      'Hasta 10 proyectos activos',
      'Hasta 15 usuarios',
      'Reportes automáticos en PDF',
      'Alertas inteligentes',
      'Control de presupuesto avanzado',
      'Soporte prioritario en español',
    ],
  },
  {
    name: 'Enterprise',
    price: '$49',
    period: 'USD / mes',
    description: 'Para empresas con operaciones a gran escala en LATAM.',
    cta: 'Contactar ventas',
    href: '/register?plan=enterprise',
    featured: false,
    features: [
      'Proyectos ilimitados',
      'Usuarios ilimitados',
      'API e integraciones',
      'Panel multi-empresa',
      'Onboarding personalizado',
      'SLA y soporte dedicado',
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.featured
                  ? 'bg-gradient-to-b from-sysium-900 to-sysium-950 text-white shadow-2xl shadow-sysium-900/40 scale-105'
                  : 'bg-white border border-slate-200 text-slate-900'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    <Zap className="w-3 h-3" />
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className={`text-sm font-semibold mb-1 ${plan.featured ? 'text-sysium-300' : 'text-sysium-600'}`}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className={`text-sm ${plan.featured ? 'text-sysium-400' : 'text-slate-400'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`mt-2 text-sm ${plan.featured ? 'text-sysium-300' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.featured ? 'text-sysium-300' : 'text-sysium-500'
                      }`}
                    />
                    <span className={plan.featured ? 'text-slate-200' : 'text-slate-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block text-center font-bold py-3 rounded-xl transition-all text-sm ${
                  plan.featured
                    ? 'bg-white text-sysium-900 hover:bg-slate-100'
                    : 'bg-sysium-600 text-white hover:bg-sysium-500'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
