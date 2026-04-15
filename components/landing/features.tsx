import {
  LayoutDashboard,
  DollarSign,
  Package,
  Users,
  Bell,
  BarChart3,
} from 'lucide-react'

const features = [
  {
    icon: LayoutDashboard,
    title: 'Gestión de Proyectos',
    description:
      'Visualiza el avance de cada obra en tiempo real. Asigna responsables, fechas y etapas críticas.',
    color: 'text-sysium-400',
    bg: 'bg-sysium-500/10',
  },
  {
    icon: DollarSign,
    title: 'Control de Presupuesto',
    description:
      'Detecta desvíos antes de que escalen. Compara lo presupuestado vs. lo ejecutado por partida.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Package,
    title: 'Inventario de Materiales',
    description:
      'Nunca te quedes sin material crítico. Controla entradas, salidas y mínimos de inventario por obra.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
  {
    icon: Users,
    title: 'Gestión de Equipos',
    description:
      'Asigna roles, responsabilidades y permisos. Mantén a tu equipo alineado desde la oficina o el campo.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Bell,
    title: 'Alertas Inteligentes',
    description:
      'Recibe notificaciones cuando algo requiere tu atención: materiales críticos, retrasos o desvíos de presupuesto.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  {
    icon: BarChart3,
    title: 'Reportes Automáticos',
    description:
      'Genera informes profesionales listos para clientes y directivos en segundos, no en horas.',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sysium-600 text-sm font-bold uppercase tracking-widest">
            Características
          </span>
          <h2 className="mt-3 text-4xl font-black text-slate-900 leading-tight">
            Todo lo que tu constructora necesita,
            <br />
            <span className="text-sysium-600">en un solo lugar.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Deja atrás las hojas de cálculo y los grupos de WhatsApp. SYSIUM TECH centraliza la operación de tu empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-slate-100 hover:border-sysium-100 bg-white hover:bg-sysium-50/30 transition-all hover:shadow-lg hover:shadow-sysium-100/50"
            >
              <div className={`w-11 h-11 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
