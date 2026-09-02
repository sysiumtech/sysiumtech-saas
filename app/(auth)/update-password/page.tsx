'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Zap, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [checkingSession, setCheckingSession] = useState(true)
  const [validSession, setValidSession] = useState(false)

  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setValidSession(!!session)
      setCheckingSession(false)
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError('No se pudo actualizar la contraseña. Intenta de nuevo.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-sysium-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sysium-500 to-orange-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-bold text-xl">SYSIUM TECH</span>
          </Link>
          <h1 className="text-2xl font-black text-white">Crea una nueva contraseña</h1>
        </div>

        <div className="bg-[#161b27] border border-white/8 rounded-2xl p-8 shadow-2xl">
          {checkingSession ? (
            <p className="text-slate-400 text-sm text-center">Verificando enlace...</p>
          ) : !validSession ? (
            <div className="text-center space-y-4">
              <p className="text-slate-400 text-sm">
                Este enlace no es válido o ya expiró. Solicita uno nuevo.
              </p>
              <Link
                href="/forgot-password"
                className="inline-block bg-sysium-600 hover:bg-sysium-500 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm"
              >
                Solicitar nuevo enlace
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full bg-[#0d1117] border border-white/10 rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-sysium-500 focus:ring-1 focus:ring-sysium-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-sysium-600 hover:bg-sysium-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Guardando...' : 'Guardar contraseña'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
