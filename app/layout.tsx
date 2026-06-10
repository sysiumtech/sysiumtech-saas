import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const BASE_URL = 'https://www.sysiumtech.com'

export const metadata: Metadata = {
  title: 'SYSIUM TECH — Gestión de Obras para PYMES en LATAM',
  description:
    'La plataforma todo-en-uno para gestionar proyectos de construcción en Latinoamérica. Presupuestos, inventario y equipos en un solo lugar.',
  keywords: 'gestión de obras, constructoras, PYME, LATAM, software construcción, presupuestos, software gestión de obras México, control presupuesto construcción Colombia',
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
    languages: {
      'es-MX': BASE_URL,
      'es-CO': BASE_URL,
      'es-AR': BASE_URL,
      'es-PE': BASE_URL,
      'es-CL': BASE_URL,
      'x-default': BASE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'SYSIUM TECH — Gestión de Obras para PYMES en LATAM',
    description: 'Digitaliza tu constructora. Controla cada proyecto desde un solo lugar.',
    type: 'website',
    url: BASE_URL,
    siteName: 'SYSIUM TECH',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SYSIUM TECH — Gestión de Obras para PYMES en LATAM',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SYSIUM TECH — Gestión de Obras para PYMES en LATAM',
    description: 'Digitaliza tu constructora. Controla cada proyecto desde un solo lugar.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.className}>
      <body>
        {/* Skip-to-content: visible solo con foco de teclado */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:text-sysium-600 focus:font-semibold focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sysium-500"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  )
}
