import {
  FolderOpen,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getOrCreateConstructora } from '@/lib/supabase/constructora'
import { formatCurrencyCompact } from '@/lib/format'

const statusLabel: Record<string, string> = {
  activa: 'Activa',
  pausada: 'Pausada',
  terminada: 'Terminada',
  cancelada: 'Cancelada',
}

const statusStyle: Record<string, string> = {
  activa: 'bg-green-500/10 text-green-400',
  pausada: 'bg-orange-500/10 text-orange-400',
  terminada: 'bg-sysium-500/10 text-sysium-400',
  cancelada: 'bg-red-500/10 text-red-400',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const constructora = await getOrCreateConstructora(supabase, user)

  const { data: obras } = await supabase
    .from('obras')
    .select('id, nombre, nombre_cliente, presupuesto_total, abonado_total, avance_pct, status, updated_at')
    .eq('constructora_id', constructora.id)
    .order('updated_at', { ascending: false })

  const { data: retrasos } = await supabase
    .from('actualizaciones')
    .select('id, obra_id, comentario, motivo_retraso, created_at')
    .eq('hubo_retraso', true)
    .order('created_at', { ascending: false })
    .limit(5)

  const obraIdsConRetraso = [...new Set((retrasos ?? []).map((r) => r.obra_id))]
  const { data: obrasConRetraso } = obraIdsConRetraso.length
    ? await supabase.from('obras').select('id, nombre').in('id', obraIdsConRetraso)
    : { data: [] as { id: string; nombre: string }[] }
  const nombreObraPorId = new Map((obrasConRetraso ?? []).map((o) => [o.id, o.nombre]))

  const todasObras = obras ?? []
  const obrasActivas = todasObras.filter((o) => o.status === 'activa')
  const presupuestoTotal = todasObras.reduce((sum, o) => sum + Number(o.presupuesto_total ?? 0), 0)
  const abonadoTotal = todasObras.reduce((sum, o) => sum + Number(o.abonado_total ?? 0), 0)
  const pctEjecutado = presupuestoTotal > 0 ? Math.round((abonadoTotal / presupuestoTotal) * 100) : 0

  const obrasParaAvance = todasObras.filter((o) => o.status !== 'cancelada')
  const avancePromedio = obrasParaAvance.length
    ? Math.round(
        obrasParaAvance.reduce((sum, o) => sum + Number(o.avance_pct ?? 0), 0) / obrasParaAvance.length
      )
    : 0

  const stats = [
    {
      label: 'Obras activas',
      value: String(obrasActivas.length),
      change: `${todasObras.length} en total`,
      positive: true,
      icon: FolderOpen,
      color: 'text-sysium-400',
      bg: 'bg-sysium-500/10',
    },
    {
      label: 'Presupuesto ejecutado',
      value: `${pctEjecutado}%`,
      change: `${formatCurrencyCompact(presupuestoTotal)} presupuestados`,
      positive: true,
      icon: DollarSign,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      label: 'Alertas de retraso',
      value: String(retrasos?.length ?? 0),
      change: 'Últimos reportes',
      positive: (retrasos?.length ?? 0) === 0,
      icon: AlertTriangle,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
    },
    {
      label: 'Avance promedio',
      value: `${avancePromedio}%`,
      change: `${obrasParaAvance.length} obras consideradas`,
      positive: true,
      icon: TrendingUp,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
    },
  ]

  const proyectosRecientes = todasObras.slice(0, 5)

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white">Resumen general</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {constructora.nombre} · Aquí está el estado de tus obras.
          </p>
        </div>
        <Link
          href="/dashboard/obras"
          className="inline-flex items-center gap-2 bg-sysium-600 hover:bg-sysium-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
        >
          Ver todas las obras
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[#161b27] border border-white/5 rounded-2xl p-5">
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
            <h2 className="text-sm font-bold text-white">Obras recientes</h2>
            <Link href="/dashboard/obras" className="text-xs text-sysium-400 hover:text-sysium-300 flex items-center gap-1 transition-colors">
              Ver todas <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {proyectosRecientes.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-slate-500">
              Aún no tienes obras registradas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {['Obra', 'Avance', 'Presupuesto', 'Cliente', 'Estado'].map((h) => (
                      <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {proyectosRecientes.map((obra) => (
                    <tr key={obra.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-white">{obra.nombre}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-white/5 rounded-full h-1.5">
                            <div
                              className="h-1.5 rounded-full bg-gradient-to-r from-sysium-500 to-sysium-300"
                              style={{ width: `${obra.avance_pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400">{obra.avance_pct}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300">
                        {formatCurrencyCompact(Number(obra.presupuesto_total ?? 0))}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{obra.nombre_cliente ?? '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[obra.status]}`}>
                          {statusLabel[obra.status]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Alerts */}
        <div className="bg-[#161b27] border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="text-sm font-bold text-white">Alertas recientes</h2>
          </div>
          {!retrasos || retrasos.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-slate-500">
              Sin alertas de retraso por ahora.
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {retrasos.map((alerta) => (
                <div key={alerta.id} className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0 bg-red-500" />
                    <div>
                      <p className="text-sm text-slate-300 leading-snug">
                        {alerta.motivo_retraso || alerta.comentario}
                        {nombreObraPorId.get(alerta.obra_id) ? (
                          <span className="text-slate-500"> · {nombreObraPorId.get(alerta.obra_id)}</span>
                        ) : null}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        {new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' }).format(
                          new Date(alerta.created_at)
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
