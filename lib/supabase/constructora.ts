import type { User } from '@supabase/supabase-js'
import type { createClient } from './server'

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

/**
 * Cada usuario autenticado es owner de una única constructora (ver
 * sysium_constructora.get_constructora_id()). Si aún no la tiene —
 * p.ej. justo después del registro — se crea aquí usando el nombre
 * de empresa capturado en el signup (user_metadata.company).
 */
export async function getOrCreateConstructora(
  supabase: SupabaseServerClient,
  user: User
) {
  const { data: existing, error: selectError } = await supabase
    .from('constructoras')
    .select('*')
    .eq('owner_id', user.id)
    .maybeSingle()

  if (selectError) throw selectError
  if (existing) return existing

  const nombre =
    (user.user_metadata?.company as string | undefined)?.trim() ||
    (user.user_metadata?.full_name as string | undefined)?.trim() ||
    'Mi constructora'

  const { data: created, error: insertError } = await supabase
    .from('constructoras')
    .insert({ owner_id: user.id, nombre })
    .select('*')
    .single()

  if (insertError) {
    // 23505 = unique_violation: otra invocación concurrente (p.ej. doble
    // render de Server Component en dev) ya insertó la fila primero.
    if (insertError.code === '23505') {
      const { data: existingAfterRace, error: retryError } = await supabase
        .from('constructoras')
        .select('*')
        .eq('owner_id', user.id)
        .single()
      if (retryError) throw retryError
      return existingAfterRace
    }
    throw insertError
  }
  return created
}
