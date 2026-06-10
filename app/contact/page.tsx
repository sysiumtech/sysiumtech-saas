import ComingSoonPage from '@/components/coming-soon-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto — SYSIUM TECH',
  description: 'Ponte en contacto con el equipo de SYSIUM TECH. Estamos aquí para ayudarte.',
}

export default function ContactPage() {
  return (
    <ComingSoonPage
      title="Contacto"
      description="Próximamente tendremos un formulario de contacto. Por ahora, escríbenos a hola@sysiumtech.com"
    />
  )
}
