import ComingSoonPage from '@/components/coming-soon-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de uso — SYSIUM TECH',
  description: 'Términos y condiciones de uso de la plataforma SYSIUM TECH.',
}

export default function TermsPage() {
  return (
    <ComingSoonPage
      title="Términos de uso"
      description="Estamos redactando nuestros términos y condiciones. Estarán disponibles antes del lanzamiento oficial."
    />
  )
}
