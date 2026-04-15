'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  MapPin,
  User,
  Calendar,
  DollarSign,
  ChevronRight,
} from 'lucide-react'

const projects = [
  {
    id: '1',
    name: 'Residencial Las Palmas',
    location: 'Guadalajara, México',
    progress: 78,
    status: 'A tiempo',
    budget: 850000,
    spent: 663000,
    engineer: 'Ing. Ramírez',
    startDate: '2024-03-01',
    endDate: '2025-09-30',
    category: 'Residencial',
  },
  {
    id: '2',
    name: 'Torre Comercial Monterrey',
    location: 'Monterrey, México',
    progress: 45,
    status: 'En riesgo',
    budget: 2100000,
    spent: 945000,
    engineer: 'Ing. Torres',
    startDate: '2024-06-15',
    endDate: '2026-01-15',
    category: 'Comercial',
  },
  {
    id: '3',
    name: 'Bodega Industrial Norte',
    location: 'Tijuana, México',
    progress: 92,
    status: 'A tiempo',
    budget: 320000,
    spent: 294400,
    engineer: 'Ing. Castro',
    startDate: '2024-01-10',
    endDate: '2025-05-10',
    category: 'Industrial',
  },
  {
    id: '4',
    name: 'Plaza Comercial Centro',
    location: 'Ciudad de México',
    progress: 30,
    status: 'Retrasado',
    budget: 1500000,
    spent: 450000,
    engineer: 'Ing. Flores',
    startDate: '2024-09-01',
    endDate: '2026-03-01',
    category: 'Comercial',
  },
  {
    id: '5',
    name: 'Conjunto Habitacional Coyoacán',
    location: 'Ciudad de México',
    progress: 55,
    status: 'A tiempo',
    budget: 980000,
    spent: 539000,
    engineer: 'Ing. Medina',
    startDate: '2024-04-20',
    endDate: '2025-12-20',
    category: 'Residencial',
  },
  {
    id: '6',
    name: 'Centro Logístico Bajío',
    location: 'León, Guanajuato',
    progress: 18,
    status: 'A tiempo',
    budget: 640000,
    spent: 115200,
    engineer: 'Ing. Sánchez',
    startDate: '2025-01-05',
    endDate: '2026-06-30',
    category: 'Industrial',
  },
]

const statusStyle: Record<string, string> = {
  'A tiempo': 'bg-green-500/10 text-green-400 border border-green-500/20',
  'En riesgo': 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  'Retrasado': 'bg-red-500/10 text-red-400 border border-red-500/20',
}

const tabs = ['Todos', 'A tiempo', 'En riesgo', 'Retrasado']

export default function ProjectsPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('Todos')

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
    const matchesTab = activeTab === 'Todos' || p.status === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white">Proyectos</h1>
          <p className="text-slate-500 text-sm mt-0.5">{projects.length} proyectos activos</p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 bg-sysium-600 hover:bg-sysium-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo proyecto
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar proyecto o ubicación..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161b27] border border-white/8 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sysium-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1 bg-[#161b27] border border-white/8 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === tab
                  ? 'bg-sysium-600 text-white'
                  : 'text-slate-500 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((project) => {
          const budgetPct = Math.round((project.spent / project.budget) * 100)
          return (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="group bg-[#161b27] border border-white/5 hover:border-sysium-500/30 rounded-2xl p-5 transition-all hover:shadow-lg hover:shadow-sysium-900/20"
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 pr-3">
                  <p className="text-sm font-bold text-white leading-snug group-hover:text-sysium-200 transition-colors">
                    {project.name}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-slate-600 flex-shrink-0" />
                    <p className="text-xs text-slate-500 truncate">{project.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle[project.status]}`}>
                    {project.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-sysium-400 transition-colors" />
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-500">Avance de obra</span>
                  <span className="text-xs font-bold text-white">{project.progress}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-sysium-600 to-sysium-400 transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Budget progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-500">Presupuesto ejecutado</span>
                  <span className="text-xs font-bold text-white">{budgetPct}%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      budgetPct > 90 ? 'bg-red-500' : budgetPct > 75 ? 'bg-orange-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${budgetPct}%` }}
                  />
                </div>
              </div>

              {/* Footer meta */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-xs text-slate-500">{project.engineer}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-xs text-slate-400 font-medium">
                    ${(project.spent / 1000).toFixed(0)}K / ${(project.budget / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500 text-sm">No se encontraron proyectos con ese filtro.</p>
        </div>
      )}
    </div>
  )
}
