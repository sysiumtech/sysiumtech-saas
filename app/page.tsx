import Navbar from '@/components/landing/navbar'
import Hero from '@/components/landing/hero'
import Features from '@/components/landing/features'
import HowItWorks from '@/components/landing/how-it-works'
import Pricing from '@/components/landing/pricing'
import Footer from '@/components/landing/footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />

      {/* CTA final */}
      <section className="bg-gradient-to-br from-sysium-900 to-sysium-950 py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-black text-white mb-4">
            ¿Listo para digitalizar tu constructora?
          </h2>
          <p className="text-sysium-300 text-lg mb-10">
            Únete a las constructoras PYME que ya gestionan sus obras con SYSIUM TECH.
            Empieza gratis hoy.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-sysium-900 hover:bg-slate-100 font-bold px-8 py-4 rounded-xl text-base transition-all shadow-xl"
          >
            Empieza gratis ahora
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
