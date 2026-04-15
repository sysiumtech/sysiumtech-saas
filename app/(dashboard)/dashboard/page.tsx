import {
  FolderOpen,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Plus,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    label: 'Proyectos activos',
    value: '12',
    change: '+2 este mes',
    positive: true,
    icon: FolderOpen,
    color: 'text-sysium-400',
    bg: 'bg-sysium-500/10',
  },
  {
    label: 'Presupuesto ejecutado',
    value: '68%',
    change: '$2.4M USD gestionados',
    positive: true,
    icon: DollarSign,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    label: 'Alertas pendientes',
    value: '3',
    change: '1 crítica',
    positive: false,
    icon: AlertTriangle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  {
    label: 'Avance promedio',
    value: '74%',
    change: '+5% vs. mes anterior',
    positive: true,
    icon: TrendingUp,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
]

const projects = [
  {
    name: 'Residencial Las Palmas',
    location: 'Guadalajara, México',
    progress: 78,
    status: 'A tiempo',
    budget: '$850K',
    engineer: 'Ing. Ramírez',
  },
  {
    name: 'Torre Comercial Monterrey',
    location: 'Monterrey, México',
    progress: 45,
    status: 'En riesgo',
    budget: '$2.1M',
    engineer: 'Ing. Torres',
  },
  {
    name: 'Bodega Industrial Norte',
    location: 'Tijuana, México',
    progress: 92,
    status: 'A tiempo',
    budget: '$320K',
    engineer: 'Ing. Castro',
  },
  {
    name: 'Plaza Comercial Centro',
    location: 'Ciudad de México',
    progress: 30,
    status: 'Retrasado',
    budget: '$1.5M',
    engineer: 'Ing. Flores',
  },
]

const alerts = [
  { type: 'critical', message: 'Falta de varilla corrugada en Torre Comercial Monterrey', time: 'Hace 2 hrs' },
  { type: 'warning', message: 'Presupuesto de concreto al 90% en Residencial Las Palmas', time: 'Hace 5 hrs' },
  { type: 'warning', message: 'Retraso en entrega de herramienta en Plaza Comercial', time: 'Hace 1 día' },
]

const statusStyle: Record<string, string> = {
  'A tiempo': 'bg-green-500/10 text-green-400',
  'En riesgo': 'bg-orange-500/10 text-orange-400',
  'Retrasado': 'bg-red-500/10 text-red-400',
}

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white">Resumen general</h1>
          <p className="text-slate-500 text-sm mt-0.5">Bienvenido de vuelta. Aquí está el estado de tus obras.</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 bg-sysium-600 hover:bg-sysium-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo proyecto
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#161b27] border border-white/5 rounded-2xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-medium text-slate-500">{stat.label}</p>
              <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} strokeWidth={2} />
              </div>
            </div>
            <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
            <p className={`text-xs font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Projects table */}
        <div className="xl:col-span-2 bg-[#161b27] border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="text-sm font-bold text-white">Proyectos activos</h2>
            <Link href="/dashboard/projects" className="text-xs text-sysium-400 hover:text-sysium-300 flex items-center gap-1 transition-colors">
              Ver todos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {['Proyecto', 'Avance', 'Presupuesto', 'Residente', 'Estado'].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((project) => (
                  <tr key={project.name} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-white">{project.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{project.location}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-white/5 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-sysium-500 to-sysium-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{project.budget}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{project.engineer}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[project.status]}`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-[#161b27] border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="text-sm font-bold text-white">Alertas recientes</h2>
            <Link href="/dashboard/alerts" className="text-xs text-sysium-400 hover:text-sysium-300 flex items-center gap-1 transition-colors">
              Ver todas <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {alerts.map((alert, i) => (
              <div key={i} className="px-6 py-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                    alert.type === 'critical' ? 'bg-red-500' : 'bg-orange-500'
                  }`} />
                  <div>
                    <p className="text-sm text-slate-300 leading-snug">{alert.message}</p>
                    <p className="text-xs text-slate-600 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-white/5">
            <button className="w-full text-center text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Marcar todas como leídas
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
