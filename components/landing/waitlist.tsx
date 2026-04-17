'use client'

import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_URL || 'https://formspree.io/f/YOUR_FORM_ID'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMsg('Ocurrió un error. Intenta de nuevo.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Sin conexión. Intenta de nuevo.')
    }
  }

  return (
    <section
      id="waitlist"
      className="relative bg-gradient-to-br from-[#0d1117] via-[#1a2332] to-[#0d1117] py-24 overflow-hidden"
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sysium-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-sysium-600/20 border border-sysium-500/30 text-sysium-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          <Mail className="w-3.5 h-3.5" />
          Acceso anticipado
        </span>

        <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
          Sé de los primeros en{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
            digitalizar tu constructora
          </span>
        </h2>

        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          Únete a la lista de espera y obtén{' '}
          <strong className="text-white">3 meses gratis</strong> del plan Pro al lanzamiento.
          Sin tarjeta de crédito.
        </p>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4 animate-pulse-once">
            <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-4 rounded-2xl">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <div className="text-left">
                <p className="font-bold text-white">¡Listo! Ya estás en la lista.</p>
                <p className="text-sm text-green-300 mt-0.5">
                  Te avisaremos en cuanto abramos el acceso anticipado.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@constructora.com"
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:border-sysium-500 focus:ring-2 focus:ring-sysium-500/20 transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white font-bold px-6 py-3.5 rounded-xl transition-all disabled:opacity-60 whitespace-nowrap text-sm shadow-lg shadow-orange-500/25"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Unirme gratis
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {errorMsg && (
          <p className="mt-3 text-red-400 text-sm">{errorMsg}</p>
        )}

        {/* Prueba social */}
        <p className="mt-8 text-slate-600 text-xs">
          🔒 Sin spam. Solo te contactamos cuando el acceso esté listo.
        </p>
      </div>
    </section>
  )
}
