import Link from 'next/link'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  TrendingUp,
} from 'lucide-react'

// En producción esto vendría de Supabase
const projectData: Record<string, {
  id: string
  name: string
  location: string
  progress: number
  status: string
  budget: number
  spent: number
  engineer: string
  startDate: string
  endDate: string
  category: string
  description: string
  team: { name: string; role: string }[]
  phases: { name: string; progress: number; status: string }[]
  alerts: { type: string; message: string; date: string }[]
  recentActivity: { action: string; user: string; date: string }[]
}> = {
  '1': {
    id: '1',
    name: 'Residencial Las Palmas',
    location: 'Guadalajara, Jalisco, México',
    progress: 78,
    status: 'A tiempo',
    budget: 850000,
    spent: 663000,
    engineer: 'Ing. Carlos Ramírez',
    startDate: '2024-03-01',
    endDate: '2025-09-30',
    category: 'Residencial',
    description: 'Conjunto residencial de 48 viviendas con amenidades completas. Incluye alberca, área de juegos y estacionamiento.',
    team: [
      { name: 'Ing. Carlos Ramírez', role: 'Residente de obra' },
      { name: 'Arq. Sofía Herrera', role: 'Directora de proyecto' },
      { name: 'Téc. Mario López', role: 'Supervisor de calidad' },
      { name: 'Ing. Patricia Vega', role: 'Estructural' },
    ],
    phases: [
      { name: 'Cimentación', progress: 100, status: 'Completada' },
      { name: 'Estructura', progress: 100, status: 'Completada' },
      { name: 'Albañilería', progress: 85, status: 'En proceso' },
      { name: 'Instalaciones', progress: 70, status: 'En proceso' },
      { name: 'Acabados', progress: 30, status: 'En proceso' },
      { name: 'Entrega', progress: 0, status: 'Pendiente' },
    ],
    alerts: [
      { type: 'warning', message: 'Presupuesto de pintura exterior al 85%', date: '2025-04-10' },
      { type: 'info', message: 'Inspección municipal programada para el 20 de abril', date: '2025-04-08' },
    ],
    recentActivity: [
      { action: 'Avance de albañilería actualizado al 85%', user: 'Ing. Ramírez', date: '2025-04-12' },
      { action: 'Orden de compra #234 aprobada — Pintura', user: 'Arq. Herrera', date: '2025-04-10' },
      { action: 'Reporte semanal generado y enviado al cliente', user: 'Sistema', date: '2025-04-07' },
    ],
  },
}

const statusStyle: Record<string, string> = {
  'A tiempo': 'bg-green-500/10 text-green-400 border border-green-500/20',
  'En riesgo': 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  'Retrasado': 'bg-red-500/10 text-red-400 border border-red-500/20',
  'Completada': 'bg-green-500/10 text-green-400',
  'En proceso': 'bg-sysium-500/10 text-sysium-400',
  'Pendiente': 'bg-slate-500/10 text-slate-400',
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projectData[params.id]

  if (!project) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Proyecto no encontrado.</p>
        <Link href="/dashboard/projects" className="text-sysium-400 text-sm mt-2 inline-block">
          Volver a proyectos
        </Link>
      </div>
    )
  }

  const budgetPct = Math.round((project.spent / project.budget) * 100)
  const remaining = project.budget - project.spent

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Back + Header */}
      <div>
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-200 text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a proyectos
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-black text-white">{project.name}</h1>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[project.status]}`}>
                {project.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(project.startDate).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
                {' — '}
                {new Date(project.endDate).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> {project.engineer}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Avance total',
            value: `${project.progress}%`,
            icon: TrendingUp,
            color: 'text-sysium-400',
            bg: 'bg-sysium-500/10',
          },
          {
            label: 'Presupuesto total',
            value: `$${(project.budget / 1000).toFixed(0)}K`,
            icon: DollarSign,
            color: 'text-green-400',
            bg: 'bg-green-500/10',
          },
          {
            label: 'Ejecutado',
            value: `$${(project.spent / 1000).toFixed(0)}K`,
            sub: `${budgetPct}% del total`,
            icon: Package,
            color: 'text-orange-400',
            bg: 'bg-orange-500/10',
          },
          {
            label: 'Disponible',
            value: `$${(remaining / 1000).toFixed(0)}K`,
            sub: `${100 - budgetPct}% restante`,
            icon: CheckCircle,
            color: remaining < 50000 ? 'text-red-400' : 'text-green-400',
            bg: remaining < 50000 ? 'bg-red-500/10' : 'bg-green-500/10',
          },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#161b27] border border-white/5 rounded-2xl p-4">
            <div className="flex items-start justify-between mb-2">
              <p className="text-xs text-slate-500">{kpi.label}</p>
              <div className={`w-7 h-7 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                <kpi.icon className={`w-3.5 h-3.5 ${kpi.color}`} />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{kpi.value}</p>
            {kpi.sub && <p className="text-xs text-slate-500 mt-0.5">{kpi.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Phases */}
        <div className="xl:col-span-2 space-y-5">
          <div className="bg-[#161b27] border border-white/5 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-white mb-5">Fases de la obra</h2>
            <div className="space-y-4">
              {project.phases.map((phase) => (
                <div key={phase.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-300 font-medium">{phase.name}</span>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusStyle[phase.status]}`}>
                        {phase.status}
                      </span>
                      <span className="text-xs font-bold text-white w-8 text-right">{phase.progress}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        phase.progress === 100
                          ? 'bg-green-500'
                          : 'bg-gradient-to-r from-sysium-600 to-sysium-400'
                      }`}
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-[#161b27] border border-white/5 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-white mb-4">Actividad reciente</h2>
            <div className="space-y-4">
              {project.recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-sysium-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-sysium-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">{activity.action}</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {activity.user} · {new Date(activity.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Team */}
          <div className="bg-[#161b27] border border-white/5 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-white mb-4">Equipo del proyecto</h2>
            <div className="space-y-3">
              {project.team.map((member) => (
                <div key={member.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sysium-600 to-sysium-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {member.name.split(' ').pop()?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-[#161b27] border border-white/5 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-white mb-4">Alertas del proyecto</h2>
            {project.alerts.length === 0 ? (
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Sin alertas activas</span>
              </div>
            ) : (
              <div className="space-y-3">
                {project.alerts.map((alert, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${
                    alert.type === 'warning'
                      ? 'bg-orange-500/10 border border-orange-500/15'
                      : 'bg-sky-500/10 border border-sky-500/15'
                  }`}>
                    <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                      alert.type === 'warning' ? 'text-orange-400' : 'text-sky-400'
                    }`} />
                    <div>
                      <p className="text-xs text-slate-300">{alert.message}</p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {new Date(alert.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-[#161b27] border border-white/5 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-white mb-3">Descripción</h2>
            <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
            <div className="mt-3 inline-block bg-sysium-500/10 text-sysium-400 text-xs font-semibold px-2.5 py-1 rounded-full">
              {project.category}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
