'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Zap } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sysium-500 to-orange-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            SYSIUM <span className="text-sysium-400">TECH</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Características', href: '#features' },
            { label: 'Cómo funciona', href: '#how-it-works' },
            { label: 'Precios', href: '#pricing' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-slate-300 hover:text-white text-sm font-medium transition-colors px-4 py-2"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/register"
            className="bg-sysium-600 hover:bg-sysium-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Empieza gratis
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0d1117] border-t border-white/5 px-4 pb-4 pt-2 space-y-1">
          {[
            { label: 'Características', href: '#features' },
            { label: 'Cómo funciona', href: '#how-it-works' },
            { label: 'Precios', href: '#pricing' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-slate-400 hover:text-white py-2 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link href="/login" className="text-center text-slate-300 py-2 text-sm font-medium border border-white/10 rounded-lg">
              Iniciar sesión
            </Link>
            <Link href="/register" className="text-center bg-sysium-600 text-white py-2 text-sm font-semibold rounded-lg">
              Empieza gratis
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
