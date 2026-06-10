import ComingSoonPage from '@/components/coming-soon-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — SYSIUM TECH',
  description: 'Artículos, guías y recursos sobre gestión de obras y digitalización de constructoras PYME en LATAM.',
}

export default function BlogPage() {
  return (
    <ComingSoonPage
      title="Blog"
      description="Próximamente: guías, casos de uso y consejos para digitalizar tu constructora."
    />
  )
}
