import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de Uso — SYSIUM TECH',
  description: 'Términos y condiciones de uso de la plataforma SYSIUM TECH para la gestión de proyectos de construcción.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/logo_sysium_icon_v2.jpg"
            alt="SYSIUM TECH logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-bold text-slate-900 text-lg">SYSIUM TECH</span>
        </Link>
      </header>

      <main id="main-content" className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black text-slate-900 mb-2">Términos de Uso</h1>
        <p className="text-slate-400 text-sm mb-10">Última actualización: 10 de junio de 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Identificación del prestador</h2>
            <p>
              SYSIUM TECH (en adelante, "la Plataforma" o "nosotros") es un servicio de software
              como servicio (SaaS) operado por <strong>SYSIUM TECH S. de R.L. de C.V.</strong>,
              con domicilio en [COMPLETAR: dirección fiscal], Ciudad de México, México.
              Contacto: <a href="mailto:legal@sysiumtech.com" className="text-sysium-600 hover:underline">legal@sysiumtech.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Aceptación de los términos</h2>
            <p>
              Al registrarte, acceder o utilizar SYSIUM TECH, aceptas quedar vinculado por estos
              Términos de Uso. Si no estás de acuerdo con alguna disposición, debes abstenerte de
              utilizar la Plataforma. El uso continuado después de cualquier modificación implica
              la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Descripción del servicio</h2>
            <p>
              SYSIUM TECH es una plataforma de gestión de proyectos de construcción que ofrece
              herramientas para el control de presupuestos, inventario de materiales, gestión de
              equipos, alertas inteligentes y generación de reportes automáticos, dirigida
              principalmente a constructoras PYME en Latinoamérica.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Registro y cuenta de usuario</h2>
            <p>Para utilizar la Plataforma debes:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Ser mayor de 18 años o tener capacidad legal para contratar.</li>
              <li>Proporcionar información verídica y actualizada durante el registro.</li>
              <li>Mantener la confidencialidad de tus credenciales de acceso.</li>
              <li>Notificarnos de inmediato ante cualquier uso no autorizado de tu cuenta.</li>
            </ul>
            <p className="mt-3">
              Eres responsable de todas las actividades que ocurran bajo tu cuenta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Planes y pagos</h2>
            <p>
              SYSIUM TECH ofrece un plan gratuito (Starter) y planes de pago (Pro, Business,
              Enterprise). Los precios se expresan en Pesos Mexicanos (MXN) más el IVA aplicable
              y pueden variar según el país de facturación.
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Los pagos son procesados de forma segura a través de proveedores certificados.</li>
              <li>Las suscripciones se renuevan automáticamente al inicio de cada período.</li>
              <li>Puedes cancelar en cualquier momento desde la configuración de tu cuenta.</li>
              <li>No se realizan reembolsos por períodos parciales ya facturados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Uso aceptable</h2>
            <p>Está prohibido utilizar la Plataforma para:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Actividades ilegales o fraudulentas.</li>
              <li>Transmitir virus, malware o código dañino.</li>
              <li>Intentar acceder a datos de otros usuarios sin autorización.</li>
              <li>Realizar ingeniería inversa o descompilar el software.</li>
              <li>Revender o sublicenciar el servicio sin autorización escrita.</li>
              <li>Sobrecargar o interrumpir la infraestructura de la Plataforma.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Propiedad intelectual</h2>
            <p>
              Todo el contenido, diseño, código fuente, marcas y materiales de la Plataforma son
              propiedad exclusiva de SYSIUM TECH o sus licenciantes y están protegidos por las
              leyes de propiedad intelectual aplicables. Se te otorga una licencia limitada,
              no exclusiva e intransferible para usar la Plataforma conforme a estos términos.
            </p>
            <p className="mt-3">
              Los datos que introduces en la Plataforma (proyectos, presupuestos, documentos)
              son de tu propiedad. SYSIUM TECH no reclama ningún derecho sobre ellos más allá
              del necesario para prestar el servicio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Disponibilidad y soporte</h2>
            <p>
              Nos esforzamos por mantener la Plataforma disponible 24/7. Sin embargo, no
              garantizamos disponibilidad ininterrumpida. Realizamos mantenimientos programados
              con aviso previo siempre que sea posible. El nivel de soporte varía según el plan
              contratado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Limitación de responsabilidad</h2>
            <p>
              En la máxima medida permitida por la ley aplicable, SYSIUM TECH no será responsable
              por daños indirectos, incidentales, especiales o consecuentes derivados del uso o
              imposibilidad de uso de la Plataforma. Nuestra responsabilidad máxima total no
              excederá el importe pagado por el usuario en los últimos 3 meses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Cancelación y terminación</h2>
            <p>
              Puedes cancelar tu cuenta en cualquier momento. SYSIUM TECH puede suspender o
              terminar tu acceso si incumples estos términos. Tras la cancelación, tendrás 30 días
              para exportar tus datos antes de que sean eliminados de nuestros sistemas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">11. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento.
              Te notificaremos por correo electrónico con al menos 15 días de anticipación ante
              cambios materiales. El uso continuado de la Plataforma tras esa fecha implica
              la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">12. Ley aplicable y jurisdicción</h2>
            <p>
              Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para
              cualquier controversia, las partes se someten a la jurisdicción de los tribunales
              competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera
              corresponderles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">13. Contacto</h2>
            <p>
              Para cualquier consulta sobre estos Términos de Uso, escríbenos a{' '}
              <a href="mailto:legal@sysiumtech.com" className="text-sysium-600 hover:underline">
                legal@sysiumtech.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex gap-6 text-sm text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">← Volver al inicio</Link>
          <Link href="/privacy" className="hover:text-slate-600 transition-colors">Política de privacidad</Link>
        </div>
      </main>
    </div>
  )
}
