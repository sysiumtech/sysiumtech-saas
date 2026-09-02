'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function ChecklistItem({
  id,
  descripcion,
  completado,
  userId,
}: {
  id: string
  descripcion: string
  completado: boolean
  userId: string
}) {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function toggle() {
    setPending(true)
    const supabase = createClient()
    const nuevoEstado = !completado

    const { error } = await supabase
      .from('checklist_items')
      .update({
        completado: nuevoEstado,
        completado_at: nuevoEstado ? new Date().toISOString() : null,
        completado_by: nuevoEstado ? userId : null,
      })
      .eq('id', id)

    if (!error) {
      router.refresh()
    }
    setPending(false)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      className="w-full flex items-center gap-3 py-2 text-left disabled:opacity-60"
    >
      <span
        className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-colors ${
          completado
            ? 'bg-sysium-600 border-sysium-600'
            : 'border-white/15 bg-transparent'
        }`}
      >
        {pending ? (
          <Loader2 className="w-3 h-3 text-white animate-spin" />
        ) : (
          completado && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        )}
      </span>
      <span
        className={`text-sm transition-colors ${
          completado ? 'text-slate-500 line-through' : 'text-slate-300'
        }`}
      >
        {descripcion}
      </span>
    </button>
  )
}
