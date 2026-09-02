'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function NuevaEtapaForm({
  obraId,
  siguienteOrden,
}: {
  obraId: string
  siguienteOrden: number
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [nombre, setNombre] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('El nombre de la etapa es obligatorio.')
      return
    }
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: insertError } = await supabase.from('etapas').insert({
      obra_id: obraId,
      nombre: nombre.trim(),
      nombre_cliente: nombre.trim(),
      orden: siguienteOrden,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    setNombre('')
    setOpen(false)
    setLoading(false)
    router.refresh()
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 border border-dashed border-white/10 hover:border-sysium-500/40 text-slate-400 hover:text-sysium-400 text-sm font-medium py-3 rounded-2xl transition-colors"
      >
        <Plus className="w-4 h-4" />
        Nueva etapa
      </button>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#161b27] border border-white/5 rounded-2xl p-5 space-y-3"
    >
      <label className="block text-sm font-medium text-slate-300">Nombre de la etapa</label>
      <input
        type="text"
        autoFocus
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Cimentación"
        className="w-full bg-[#0d1117] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-sysium-500 focus:ring-1 focus:ring-sysium-500 transition-colors"
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-sysium-600 hover:bg-sysium-500 disabled:opacity-60 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Crear etapa
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false)
            setError(null)
          }}
          className="text-sm text-slate-500 hover:text-slate-300 px-3 py-2 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
