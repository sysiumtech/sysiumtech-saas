import ComingSoonPage from '@/components/coming-soon-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acerca de — SYSIUM TECH',
  description: 'Conoce el equipo detrás de SYSIUM TECH y nuestra misión de digitalizar la construcción en Latinoamérica.',
}

export default function AboutPage() {
  return (
    <ComingSoonPage
      title="Acerca de nosotros"
      description="Estamos preparando nuestra historia. Pronto conocerás al equipo detrás de SYSIUM TECH."
    />
  )
}
