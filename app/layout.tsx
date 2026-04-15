import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SYSIUM TECH — Gestión de Obras para PYMES en LATAM',
  description:
    'La plataforma todo-en-uno para gestionar proyectos de construcción en Latinoamérica. Presupuestos, inventario y equipos en un solo lugar.',
  keywords: 'gestión de obras, constructoras, PYME, LATAM, software construcción, presupuestos',
  openGraph: {
    title: 'SYSIUM TECH',
    description: 'Digitaliza tu constructora. Controla cada proyecto.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
