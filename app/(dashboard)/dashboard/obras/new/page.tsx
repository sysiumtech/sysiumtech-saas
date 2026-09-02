import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getOrCreateConstructora } from '@/lib/supabase/constructora'
import NuevaObraForm from './nueva-obra-form'

export default async function NuevaObraPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const constructora = await getOrCreateConstructora(supabase, user)

  const { data: clientes } = await supabase
    .from('clientes')
    .select('id, nombre, whatsapp')
    .eq('constructora_id', constructora.id)
    .order('nombre', { ascending: true })

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-2xl">
      <div>
        <Link
          href="/dashboard/obras"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver a obras
        </Link>
        <h1 className="text-xl font-black text-white">Nueva obra</h1>
        <p className="text-slate-500 text-sm mt-0.5">{constructora.nombre}</p>
      </div>

      <NuevaObraForm constructoraId={constructora.id} clientes={clientes ?? []} />
    </div>
  )
}
