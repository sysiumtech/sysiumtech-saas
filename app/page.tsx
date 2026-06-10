import Navbar from '@/components/landing/navbar'
import Hero from '@/components/landing/hero'
import Features from '@/components/landing/features'
import HowItWorks from '@/components/landing/how-it-works'
import Pricing from '@/components/landing/pricing'
import Testimonials from '@/components/landing/testimonials'
import FAQ from '@/components/landing/faq'
import Waitlist from '@/components/landing/waitlist'
import Footer from '@/components/landing/footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.sysiumtech.com/#organization',
      name: 'SYSIUM TECH',
      url: 'https://www.sysiumtech.com',
      logo: 'https://www.sysiumtech.com/logo.png',
      description:
        'Plataforma de gestión de proyectos de construcción para PYMES en Latinoamérica.',
      areaServed: ['MX', 'CO', 'AR', 'PE', 'CL'],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://www.sysiumtech.com/#software',
      name: 'SYSIUM TECH',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      url: 'https://www.sysiumtech.com',
      description:
        'Plataforma todo-en-uno para gestionar proyectos de construcción: presupuestos, inventario y equipos.',
      offers: [
        {
          '@type': 'Offer',
          name: 'Starter',
          price: '0',
          priceCurrency: 'MXN',
          description: 'Plan gratuito para siempre. 1 proyecto, hasta 3 usuarios.',
        },
        {
          '@type': 'Offer',
          name: 'Pro',
          price: '1990',
          priceCurrency: 'MXN',
          description: 'Hasta 3 proyectos, 8 usuarios, reportes automáticos y alertas inteligentes.',
        },
        {
          '@type': 'Offer',
          name: 'Business',
          price: '4900',
          priceCurrency: 'MXN',
          description: 'Hasta 20 proyectos, 30 usuarios, API e integraciones, dashboard ejecutivo.',
        },
        {
          '@type': 'Offer',
          name: 'Enterprise',
          price: '9900',
          priceCurrency: 'MXN',
          description: 'Proyectos y usuarios ilimitados, panel multi-empresa, SLA garantizado.',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.sysiumtech.com/#website',
      url: 'https://www.sysiumtech.com',
      name: 'SYSIUM TECH',
      publisher: { '@id': 'https://www.sysiumtech.com/#organization' },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.sysiumtech.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Necesito instalar algo para usar SYSIUM TECH?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. SYSIUM TECH funciona completamente desde el navegador, en computadora o celular. Solo necesitas una cuenta y conexión a internet.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Funciona sin conexión a internet en la obra?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Actualmente la plataforma requiere conexión a internet para sincronizar datos en tiempo real. Estamos trabajando en un modo offline para zonas con señal limitada.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Puedo importar mis proyectos y presupuestos desde Excel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Puedes importar presupuestos y listas de materiales desde archivos Excel (.xlsx) y CSV. El proceso toma pocos minutos.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuántos usuarios puede tener mi equipo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Depende del plan. El plan Starter incluye hasta 3 usuarios, Pro hasta 8, Business hasta 30 y Enterprise es ilimitado.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Tienen aplicación móvil para Android e iOS?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'La plataforma web está completamente optimizada para móvil y funciona como una PWA. Una app dedicada está en nuestro roadmap.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué pasa con mis datos si decido cancelar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tus datos son tuyos. Puedes exportar toda tu información en formatos PDF, Excel y CSV antes de cerrar tu cuenta.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Los precios incluyen IVA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Los precios mostrados son antes de IVA. Para clientes en México se aplicará el 16% de IVA. Para otros países de LATAM aplicarán los impuestos locales.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cómo es el soporte técnico?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Todos los planes incluyen soporte por email en español. Pro incluye soporte prioritario, Business onboarding personalizado, y Enterprise soporte dedicado 24/7.',
          },
        },
      ],
    },
  ],
}

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Waitlist />
        <Footer />
      </main>
    </>
  )
}
