'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  Package,
  DollarSign,
  Users,
  Bell,
  Settings,
  Zap,
  LogOut,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const navItems = [
  { label: 'Resumen', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Proyectos', href: '/dashboard/projects', icon: FolderOpen },
  { label: 'Presupuestos', href: '/dashboard/budgets', icon: DollarSign },
  { label: 'Inventario', href: '/dashboard/inventory', icon: Package },
  { label: 'Equipo', href: '/dashboard/team', icon: Users },
  { label: 'Alertas', href: '/dashboard/alerts', icon: Bell },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-[#0d1117] border-r border-white/5 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sysium-500 to-orange-500 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-sm">SYSIUM TECH</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-sysium-600/15 text-sysium-300'
                  : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-4 h-4 ${active ? 'text-sysium-400' : ''}`} strokeWidth={active ? 2.5 : 2} />
              {item.label}
              {item.label === 'Alertas' && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  3
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-white/5 space-y-0.5">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors"
        >
          <Settings className="w-4 h-4" strokeWidth={2} />
          Configuración
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition-colors"
        >
          <LogOut className="w-4 h-4" strokeWidth={2} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
