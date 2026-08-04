import { MapPin } from 'lucide-react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getOrCreateConstructora } from '@/lib/supabase/constructora'
import { formatCurrency, formatDate } from '@/lib/format'

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

export default async function ObrasPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const constructora = await getOrCreateConstructora(supabase, user)

  const { data: obras, error } = await supabase
    .from('obras')
    .select(
      'id, nombre, nombre_cliente, direccion, presupuesto_total, abonado_total, avance_pct, status, fecha_inicio, fecha_estimada_fin'
    )
    .eq('constructora_id', constructora.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  const todasObras = obras ?? []

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-xl font-black text-white">Obras</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          {constructora.nombre} · {todasObras.length} {todasObras.length === 1 ? 'obra registrada' : 'obras registradas'}
        </p>
      </div>

      {todasObras.length === 0 ? (
        <div className="bg-[#161b27] border border-white/5 rounded-2xl px-6 py-16 text-center">
          <p className="text-sm text-slate-400">Aún no tienes obras registradas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {todasObras.map((obra) => (
            <div key={obra.id} className="bg-[#161b27] border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-white">{obra.nombre}</p>
                  {obra.nombre_cliente && (
                    <p className="text-xs text-slate-500 mt-0.5">{obra.nombre_cliente}</p>
                  )}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyle[obra.status]}`}>
                  {statusLabel[obra.status]}
                </span>
              </div>

              {obra.direccion && (
                <p className="flex items-start gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  {obra.direccion}
                </p>
              )}

              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                  <span>Avance</span>
                  <span>{obra.avance_pct}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-sysium-500 to-sysium-300"
                    style={{ width: `${obra.avance_pct}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-500">Presupuesto</p>
                  <p className="text-slate-200 font-medium mt-0.5">
                    {formatCurrency(Number(obra.presupuesto_total ?? 0))}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Abonado</p>
                  <p className="text-slate-200 font-medium mt-0.5">
                    {formatCurrency(Number(obra.abonado_total ?? 0))}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Inicio</p>
                  <p className="text-slate-200 font-medium mt-0.5">{formatDate(obra.fecha_inicio)}</p>
                </div>
                <div>
                  <p className="text-slate-500">Fin estimado</p>
                  <p className="text-slate-200 font-medium mt-0.5">{formatDate(obra.fecha_estimada_fin)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
