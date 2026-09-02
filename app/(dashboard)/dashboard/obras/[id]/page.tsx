import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getOrCreateConstructora } from '@/lib/supabase/constructora'
import { formatCurrency, formatDate } from '@/lib/format'
import ChecklistItem from './checklist-item'
import NuevoChecklistItemForm from './nuevo-checklist-item-form'
import NuevaEtapaForm from './nueva-etapa-form'

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

const etapaStatusLabel: Record<string, string> = {
  pendiente: 'Pendiente',
  activa: 'En proceso',
  completada: 'Completada',
}

const etapaStatusStyle: Record<string, string> = {
  pendiente: 'bg-white/5 text-slate-400',
  activa: 'bg-sysium-500/10 text-sysium-400',
  completada: 'bg-green-500/10 text-green-400',
}

type ChecklistItemRow = {
  id: string
  etapa_id: string
  descripcion: string
  completado: boolean
  orden: number
}

export default async function ObraDetallePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const constructora = await getOrCreateConstructora(supabase, user)

  const { data: obra, error: obraError } = await supabase
    .from('obras')
    .select(
      'id, nombre, nombre_cliente, direccion, presupuesto_total, abonado_total, avance_pct, status, fecha_inicio, fecha_estimada_fin'
    )
    .eq('id', id)
    .eq('constructora_id', constructora.id)
    .maybeSingle()

  if (obraError) throw obraError
  if (!obra) redirect('/dashboard/obras')

  const { data: etapas, error: etapasError } = await supabase
    .from('etapas')
    .select('id, nombre, orden, avance_pct, status, peso_pct')
    .eq('obra_id', obra.id)
    .order('orden', { ascending: true })

  if (etapasError) throw etapasError

  const etapaIds = (etapas ?? []).map((e) => e.id)
  const { data: checklistItems, error: checklistError } = etapaIds.length
    ? await supabase
        .from('checklist_items')
        .select('id, etapa_id, descripcion, completado, orden')
        .in('etapa_id', etapaIds)
        .order('orden', { ascending: true })
    : { data: [] as ChecklistItemRow[], error: null }

  if (checklistError) throw checklistError

  const itemsPorEtapa = new Map<string, ChecklistItemRow[]>()
  for (const item of checklistItems ?? []) {
    const lista = itemsPorEtapa.get(item.etapa_id) ?? []
    lista.push(item)
    itemsPorEtapa.set(item.etapa_id, lista)
  }

  const siguienteOrdenEtapa = (etapas?.length ?? 0) + 1

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-3xl">
      <Link
        href="/dashboard/obras"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver a obras
      </Link>

      {/* Resumen de la obra */}
      <div className="bg-[#161b27] border border-white/5 rounded-2xl p-6 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-black text-white">{obra.nombre}</h1>
            {obra.nombre_cliente && (
              <p className="text-sm text-slate-500 mt-0.5">{obra.nombre_cliente}</p>
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
            <span>Avance general</span>
            <span>{obra.avance_pct}%</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-sysium-500 to-sysium-300"
              style={{ width: `${obra.avance_pct}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
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

      {/* Etapas */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white">Etapas</h2>

        {(etapas ?? []).length === 0 && (
          <div className="bg-[#161b27] border border-white/5 rounded-2xl px-6 py-10 text-center">
            <p className="text-sm text-slate-400">Esta obra todavía no tiene etapas.</p>
          </div>
        )}

        {(etapas ?? []).map((etapa) => {
          const items = itemsPorEtapa.get(etapa.id) ?? []
          const siguienteOrdenItem = items.length + 1

          return (
            <div key={etapa.id} className="bg-[#161b27] border border-white/5 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold text-white">{etapa.nombre}</p>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${etapaStatusStyle[etapa.status]}`}>
                  {etapaStatusLabel[etapa.status]}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span>Avance de la etapa</span>
                  <span>{etapa.avance_pct}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1">
                  <div
                    className="h-1 rounded-full bg-gradient-to-r from-sysium-500 to-sysium-300"
                    style={{ width: `${etapa.avance_pct}%` }}
                  />
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {items.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    id={item.id}
                    descripcion={item.descripcion}
                    completado={item.completado}
                    userId={user.id}
                  />
                ))}
              </div>

              <NuevoChecklistItemForm etapaId={etapa.id} siguienteOrden={siguienteOrdenItem} />
            </div>
          )
        })}

        <NuevaEtapaForm obraId={obra.id} siguienteOrden={siguienteOrdenEtapa} />
      </div>
    </div>
  )
}
