'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SettingsForm({
  constructoraId,
  nombreInicial,
  email,
}: {
  constructoraId: string
  nombreInicial: string
  email: string
}) {
  const router = useRouter()
  const [nombre, setNombre] = useState(nombreInicial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaved(false)

    if (!nombre.trim()) {
      setError('El nombre de la constructora es obligatorio.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: updateError } = await supabase
      .from('constructoras')
      .update({ nombre: nombre.trim() })
      .eq('id', constructoraId)

    setLoading(false)
    if (updateError) {
      setError('No se pudo guardar: ' + updateError.message)
      return
    }

    setSaved(true)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#161b27] border border-white/5 rounded-2xl p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Correo de la cuenta</label>
        <input
          type="text"
          disabled
          value={email}
          className="w-full bg-[#0d1117] border border-white/5 rounded-xl px-4 py-2.5 text-slate-500 text-sm cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Nombre de la constructora</label>
        <input
          type="text"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full bg-[#0d1117] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-sysium-500 focus:ring-1 focus:ring-sysium-500 transition-colors"
        />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-sysium-600 hover:bg-sysium-500 disabled:opacity-60 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Guardar cambios
        </button>
        {saved && !loading && (
          <span className="flex items-center gap-1.5 text-sm text-green-400">
            <CheckCircle className="w-4 h-4" />
            Guardado
          </span>
        )}
      </div>
    </form>
  )
}
