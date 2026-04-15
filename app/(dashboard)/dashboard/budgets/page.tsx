'use client'

import { useState } from 'react'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

const summary = {
  totalBudget: 6390000,
  totalSpent: 3419600,
  totalRemaining: 2970400,
  projectsOverBudget: 0,
  projectsAtRisk: 1,
}

const projects = [
  {
    id: '1',
    name: 'Residencial Las Palmas',
    budget: 850000,
    spent: 663000,
    status: 'A tiempo',
    categories: [
      { name: 'Materiales', budgeted: 510000, spent: 408000 },
      { name: 'Mano de obra', budgeted: 212500, spent: 175000 },
      { name: 'Equipos', budgeted: 85000, spent: 62000 },
      { name: 'Indirectos', budgeted: 42500, spent: 18000 },
    ],
  },
  {
    id: '2',
    name: 'Torre Comercial Monterrey',
    budget: 2100000,
    spent: 945000,
    status: 'En riesgo',
    categories: [
      { name: 'Materiales', budgeted: 1260000, spent: 598000 },
      { name: 'Mano de obra', budgeted: 525000, spent: 245000 },
      { name: 'Equipos', budgeted: 210000, spent: 82000 },
      { name: 'Indirectos', budgeted: 105000, spent: 20000 },
    ],
  },
  {
    id: '3',
    name: 'Bodega Industrial Norte',
    budget: 320000,
    spent: 294400,
    status: 'A tiempo',
    categories: [
      { name: 'Materiales', budgeted: 192000, spent: 180000 },
      { name: 'Mano de obra', budgeted: 80000, spent: 74000 },
      { name: 'Equipos', budgeted: 32000, spent: 30000 },
      { name: 'Indirectos', budgeted: 16000, spent: 10400 },
    ],
  },
  {
    id: '4',
    name: 'Plaza Comercial Centro',
    budget: 1500000,
    spent: 450000,
    status: 'Retrasado',
    categories: [
      { name: 'Materiales', budgeted: 900000, spent: 280000 },
      { name: 'Mano de obra', budgeted: 375000, spent: 110000 },
      { name: 'Equipos', budgeted: 150000, spent: 40000 },
      { name: 'Indirectos', budgeted: 75000, spent: 20000 },
    ],
  },
  {
    id: '5',
    name: 'Conjunto Habitacional Coyoacán',
    budget: 980000,
    spent: 539000,
    status: 'A tiempo',
    categories: [
      { name: 'Materiales', budgeted: 588000, spent: 330000 },
      { name: 'Mano de obra', budgeted: 245000, spent: 135000 },
      { name: 'Equipos', budgeted: 98000, spent: 52000 },
      { name: 'Indirectos', budgeted: 49000, spent: 22000 },
    ],
  },
  {
    id: '6',
    name: 'Centro Logístico Bajío',
    budget: 640000,
    spent: 115200,
    status: 'A tiempo',
    categories: [
      { name: 'Materiales', budgeted: 384000, spent: 72000 },
      { name: 'Mano de obra', budgeted: 160000, spent: 30000 },
      { name: 'Equipos', budgeted: 64000, spent: 10000 },
      { name: 'Indirectos', budgeted: 32000, spent: 3200 },
    ],
  },
]

const statusColor: Record<string, string> = {
  'A tiempo': 'text-green-400',
  'En riesgo': 'text-orange-400',
  'Retrasado': 'text-red-400',
}

function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return `$${n}`
}

export default function BudgetsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const totalPct = Math.round((summary.totalSpent / summary.totalBudget) * 100)

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-white">Presupuestos</h1>
        <p className="text-slate-500 text-sm mt-0.5">Control financiero de todos tus proyectos</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Presupuesto total',
            value: fmt(summary.totalBudget),
            sub: 'Todos los proyectos',
            icon: DollarSign,
            color: 'text-sysium-400',
            bg: 'bg-sysium-500/10',
          },
          {
            label: 'Total ejecutado',
            value: fmt(summary.totalSpent),
            sub: `${totalPct}% del presupuesto`,
            icon: TrendingUp,
            color: 'text-orange-400',
            bg: 'bg-orange-500/10',
          },
          {
            label: 'Disponible restante',
            value: fmt(summary.totalRemaining),
            sub: `${100 - totalPct}% sin ejecutar`,
            icon: TrendingDown,
            color: 'text-green-400',
            bg: 'bg-green-500/10',
          },
          {
            label: 'Proyectos en riesgo',
            value: String(summary.projectsAtRisk),
            sub: 'Requieren atención',
            icon: AlertTriangle,
            color: 'text-red-400',
            bg: 'bg-red-500/10',
          },
        ].map((card) => (
          <div key={card.label} className="bg-[#161b27] border border-white/5 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs text-slate-500">{card.label}</p>
              <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{card.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Global progress bar */}
      <div className="bg-[#161b27] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-white">Ejecución presupuestal global</span>
          <span className="text-sm font-black text-white">{totalPct}%</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              totalPct > 90 ? 'bg-red-500' : totalPct > 75 ? 'bg-orange-500' : 'bg-gradient-to-r from-sysium-600 to-sysium-400'
            }`}
            style={{ width: `${totalPct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-slate-600">$0</span>
          <span className="text-xs text-slate-600">{fmt(summary.totalBudget)}</span>
        </div>
      </div>

      {/* Per-project breakdown */}
      <div className="bg-[#161b27] border border-white/5 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Desglose por proyecto</h2>
          <p className="text-xs text-slate-500 mt-0.5">Haz clic en un proyecto para ver el desglose por partida</p>
        </div>

        <div className="divide-y divide-white/5">
          {projects.map((project) => {
            const pct = Math.round((project.spent / project.budget) * 100)
            const isExpanded = expandedId === project.id

            return (
              <div key={project.id}>
                {/* Project row */}
                <button
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white/2 transition-colors text-left"
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-white truncate">{project.name}</span>
                      <span className={`text-xs font-semibold flex-shrink-0 ${statusColor[project.status]}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-white/5 rounded-full h-2 max-w-xs">
                        <div
                          className={`h-2 rounded-full ${
                            pct > 90 ? 'bg-red-500' : pct > 75 ? 'bg-orange-500' : 'bg-sysium-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 flex-shrink-0">{pct}% ejecutado</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 hidden sm:block">
                    <p className="text-sm font-bold text-white">{fmt(project.spent)}</p>
                    <p className="text-xs text-slate-500">de {fmt(project.budget)}</p>
                  </div>
                  <div className="flex-shrink-0 text-slate-500">
                    {isExpanded
                      ? <ChevronUp className="w-4 h-4" />
                      : <ChevronDown className="w-4 h-4" />
                    }
                  </div>
                </button>

                {/* Category breakdown */}
                {isExpanded && (
                  <div className="bg-[#0d1117] border-t border-white/5 px-6 py-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                      Desglose por partida
                    </p>
                    <div className="space-y-3">
                      {project.categories.map((cat) => {
                        const catPct = Math.round((cat.spent / cat.budgeted) * 100)
                        const overBudget = cat.spent > cat.budgeted
                        return (
                          <div key={cat.name} className="grid grid-cols-4 items-center gap-4">
                            <span className="text-sm text-slate-300 col-span-1">{cat.name}</span>
                            <div className="col-span-2">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-white/5 rounded-full h-1.5">
                                  <div
                                    className={`h-1.5 rounded-full ${
                                      overBudget ? 'bg-red-500' : catPct > 80 ? 'bg-orange-500' : 'bg-sysium-500'
                                    }`}
                                    style={{ width: `${Math.min(catPct, 100)}%` }}
                                  />
                                </div>
                                <span className={`text-xs w-8 text-right flex-shrink-0 ${
                                  overBudget ? 'text-red-400' : 'text-slate-500'
                                }`}>
                                  {catPct}%
                                </span>
                              </div>
                            </div>
                            <div className="text-right col-span-1">
                              <p className="text-xs font-semibold text-white">{fmt(cat.spent)}</p>
                              <p className="text-xs text-slate-600">/ {fmt(cat.budgeted)}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
