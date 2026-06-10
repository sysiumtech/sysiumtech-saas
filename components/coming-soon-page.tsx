import Link from 'next/link'
import { Zap } from 'lucide-react'

interface ComingSoonPageProps {
  title: string
  description: string
}

export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center px-4 text-center">
      <Link href="/" className="inline-flex items-center gap-2 mb-12">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sysium-500 to-orange-500 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <span className="text-white font-bold text-lg">SYSIUM TECH</span>
      </Link>

      <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-slate-400 text-lg max-w-md mb-10">{description}</p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sysium-600 hover:bg-sysium-500 text-white font-medium transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
