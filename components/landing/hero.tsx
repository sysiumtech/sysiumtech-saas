import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0d1117] flex items-center overflow-hidden pt-16">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-sysium-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(to right, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-sysium-500/10 border border-sysium-500/20 text-sysium-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-sysium-400 animate-pulse" />
          Diseñado para constructoras PYME en Latinoamérica
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
          Digitaliza tu obra.
          <br />
          <span className="bg-gradient-to-r from-sysium-400 via-sysium-300 to-orange-400 bg-clip-text text-transparent">
            Elimina el caos.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed mb-10">
          La plataforma todo-en-uno para gestionar proyectos de construcción.
          Controla presupuestos, inventario y equipos desde cualquier lugar de LATAM.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-sysium-600 to-sysium-500 hover:from-sysium-500 hover:to-sysium-400 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-sysium-900/50 hover:shadow-sysium-800/50 text-base"
          >
            Empieza gratis — sin tarjeta
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-base"
          >
            Ver cómo funciona
          </a>
        </div>

        {/* Trust bullets */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
          {[
            'Implementación en menos de 24 hrs',
            'Soporte en español',
            'Sin contratos de permanencia',
          ].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-sysium-500 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>

        {/* Dashboard preview */}
        <div className="mt-20 relative mx-auto max-w-5xl">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent z-10 pointer-events-none" style={{ top: '60%' }} />
          <div className="rounded-2xl border border-white/10 bg-[#161b27] shadow-2xl shadow-black/50 overflow-hidden glow">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#1a2035]">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-[#0d1117] rounded-md px-3 py-1 text-xs text-slate-500 text-center max-w-xs mx-auto">
                  app.sysiumtech.com/dashboard
                </div>
              </div>
            </div>
            {/* Mock dashboard content */}
            <div className="p-6 grid grid-cols-3 gap-4">
              {[
                { label: 'Proyectos activos', value: '12', color: 'from-sysium-600 to-sysium-400' },
                { label: 'Presupuesto ejecutado', value: '68%', color: 'from-orange-600 to-orange-400' },
                { label: 'Alertas pendientes', value: '3', color: 'from-red-600 to-red-400' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#0d1117] rounded-xl p-4 border border-white/5">
                  <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                  <p className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6">
              <div className="bg-[#0d1117] rounded-xl border border-white/5 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Proyectos recientes</span>
                  <span className="text-xs text-sysium-400">Ver todos</span>
                </div>
                <div className="divide-y divide-white/5">
                  {[
                    { name: 'Residencial Las Palmas', progress: 78, status: 'A tiempo' },
                    { name: 'Torre Comercial Monterrey', progress: 45, status: 'En riesgo' },
                    { name: 'Bodega Industrial Norte', progress: 92, status: 'A tiempo' },
                  ].map((project) => (
                    <div key={project.name} className="flex items-center gap-4 px-4 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-300 truncate">{project.name}</p>
                        <div className="mt-1 w-full bg-white/5 rounded-full h-1">
                          <div
                            className="h-1 rounded-full bg-gradient-to-r from-sysium-500 to-sysium-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                        project.status === 'A tiempo'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-orange-500/10 text-orange-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
