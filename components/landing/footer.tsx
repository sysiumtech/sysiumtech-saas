import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0d1117] border-t border-white/5 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sysium-500 to-orange-500 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-white font-bold text-base">SYSIUM TECH</span>
            </Link>
            <p className="text-sm leading-relaxed">
              La plataforma de gestión de obras para constructoras PYME en Latinoamérica.
            </p>
          </div>

          {/* Producto */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">Producto</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Características', href: '#features' },
                { label: 'Precios', href: '#pricing' },
                { label: 'Cómo funciona', href: '#how-it-works' },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">Empresa</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Acerca de', href: '/about' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contacto', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-white text-sm font-semibold mb-4">Legal</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Términos de uso', href: '/terms' },
                { label: 'Privacidad', href: '/privacy' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} SYSIUM TECH. Todos los derechos reservados.</p>
          <p>Hecho con orgullo para Latinoamérica</p>
        </div>
      </div>
    </footer>
  )
}
