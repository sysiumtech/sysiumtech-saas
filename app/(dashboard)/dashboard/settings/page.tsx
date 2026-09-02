import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getOrCreateConstructora } from '@/lib/supabase/constructora'
import SettingsForm from './settings-form'

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const constructora = await getOrCreateConstructora(supabase, user)

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-xl">
      <div>
        <h1 className="text-xl font-black text-white">Configuración</h1>
        <p className="text-slate-500 text-sm mt-0.5">Datos de tu constructora</p>
      </div>

      <SettingsForm constructoraId={constructora.id} nombreInicial={constructora.nombre} email={user.email ?? ''} />
    </div>
  )
}
