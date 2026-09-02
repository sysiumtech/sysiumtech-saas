'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function NuevoChecklistItemForm({
  etapaId,
  siguienteOrden,
}: {
  etapaId: string
  siguienteOrden: number
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [descripcion, setDescripcion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!descripcion.trim()) {
      setError('Escribe una descripción.')
      return
    }
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: insertError } = await supabase.from('checklist_items').insert({
      etapa_id: etapaId,
      descripcion: descripcion.trim(),
      orden: siguienteOrden,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setDescripcion('')
    setOpen(false)
    setLoading(false)
    router.refresh()
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-sysium-400 hover:text-sysium-300 transition-colors pt-1"
      >
        <Plus className="w-3.5 h-3.5" />
        Agregar tarea
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-2 pt-1">
      <input
        type="text"
        autoFocus
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción de la tarea"
        className="flex-1 bg-[#0d1117] border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-sysium-500 focus:ring-1 focus:ring-sysium-500 transition-colors"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-sysium-600 hover:bg-sysium-500 disabled:opacity-60 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
      >
        {loading && <Loader2 className="w-3 h-3 animate-spin" />}
        Agregar
      </button>
      <button
        type="button"
        onClick={() => {
          setOpen(false)
          setError(null)
        }}
        className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1.5 transition-colors"
      >
        Cancelar
      </button>
      {error && <p className="text-xs text-red-400 basis-full">{error}</p>}
    </form>
  )
}
