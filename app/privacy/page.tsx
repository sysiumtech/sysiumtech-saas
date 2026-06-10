import ComingSoonPage from '@/components/coming-soon-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de privacidad — SYSIUM TECH',
  description: 'Política de privacidad y tratamiento de datos personales de SYSIUM TECH.',
}

export default function PrivacyPage() {
  return (
    <ComingSoonPage
      title="Política de privacidad"
      description="Estamos redactando nuestra política de privacidad. Estarán disponibles antes del lanzamiento oficial."
    />
  )
}
