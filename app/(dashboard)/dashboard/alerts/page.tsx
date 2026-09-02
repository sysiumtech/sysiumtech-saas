import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getOrCreateConstructora } from '@/lib/supabase/constructora'

export default async function AlertsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const constructora = await getOrCreateConstructora(supabase, user)

  const { data: retrasos, error } = await supabase
    .from('actualizaciones')
    .select('id, obra_id, comentario, motivo_retraso, created_at')
    .eq('hubo_retraso', true)
    .order('created_at', { ascending: false })

  if (error) throw error

  const obraIds = [...new Set((retrasos ?? []).map((r) => r.obra_id))]
  const { data: obras } = obraIds.length
    ? await supabase.from('obras').select('id, nombre').in('id', obraIds)
    : { data: [] as { id: string; nombre: string }[] }
  const nombreObraPorId = new Map((obras ?? []).map((o) => [o.id, o.nombre]))

  const alertas = retrasos ?? []

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-xl font-black text-white">Alertas</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          {constructora.nombre} · {alertas.length} {alertas.length === 1 ? 'alerta de retraso' : 'alertas de retraso'}
        </p>
      </div>

      {alertas.length === 0 ? (
        <div className="bg-[#161b27] border border-white/5 rounded-2xl px-6 py-16 text-center">
          <p className="text-sm text-slate-400">Sin alertas de retraso por ahora.</p>
        </div>
      ) : (
        <div className="bg-[#161b27] border border-white/5 rounded-2xl divide-y divide-white/5">
          {alertas.map((alerta) => (
            <div key={alerta.id} className="px-6 py-4 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-slate-300 leading-snug">
                  {alerta.motivo_retraso || alerta.comentario}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {nombreObraPorId.get(alerta.obra_id) && (
                    <Link
                      href={`/dashboard/obras/${alerta.obra_id}`}
                      className="text-sysium-400 hover:text-sysium-300 transition-colors"
                    >
                      {nombreObraPorId.get(alerta.obra_id)}
                    </Link>
                  )}
                  {nombreObraPorId.get(alerta.obra_id) && ' · '}
                  {new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' }).format(
                    new Date(alerta.created_at)
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
