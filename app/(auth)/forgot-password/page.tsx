'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Zap, Loader2, CheckCircle } from 'lucide-react'
import { isValidEmail } from '@/lib/validation'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!isValidEmail(email)) {
      setError('Ingresa un correo válido.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/update-password`,
    })

    setLoading(false)
    if (resetError) {
      setError('No se pudo enviar el correo. Intenta de nuevo en unos minutos.')
      return
    }
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Revisa tu correo</h2>
          <p className="text-slate-400 mb-6">
            Si existe una cuenta con <span className="text-white font-medium">{email}</span>, te
            enviamos un enlace para restablecer tu contraseña.
          </p>
          <Link
            href="/login"
            className="inline-block bg-sysium-600 hover:bg-sysium-500 text-white font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Volver a inicio de sesión
          </Link>
        </div>
      </div>
    )
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
          <h1 className="text-2xl font-black text-white">Recupera tu contraseña</h1>
          <p className="text-slate-400 text-sm mt-1">
            Te enviaremos un enlace a tu correo para crear una nueva
          </p>
        </div>

        <div className="bg-[#161b27] border border-white/8 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className="w-full bg-[#0d1117] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-sysium-500 focus:ring-1 focus:ring-sysium-500 transition-colors"
              />
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
              {loading ? 'Enviando...' : 'Enviar enlace'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          <Link href="/login" className="text-sysium-400 hover:text-sysium-300 font-medium transition-colors">
            Volver a inicio de sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
