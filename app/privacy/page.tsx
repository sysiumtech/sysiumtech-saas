import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad — SYSIUM TECH',
  description: 'Política de privacidad y tratamiento de datos personales de SYSIUM TECH conforme a la LFPDPPP.',
}

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-black text-slate-900 mb-2">Política de Privacidad</h1>
        <p className="text-slate-400 text-sm mb-10">Última actualización: 10 de junio de 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Responsable del tratamiento</h2>
            <p>
              <strong>SYSIUM TECH S. de R.L. de C.V.</strong> (en adelante "SYSIUM TECH"),
              con domicilio en [COMPLETAR: dirección fiscal], Ciudad de México, México,
              es responsable del tratamiento de sus datos personales en términos de la{' '}
              <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</em>
              {' '}(LFPDPPP) y su Reglamento.
            </p>
            <p className="mt-3">
              Contacto del área de privacidad:{' '}
              <a href="mailto:privacidad@sysiumtech.com" className="text-sysium-600 hover:underline">
                privacidad@sysiumtech.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Datos personales que recopilamos</h2>
            <p>Recopilamos los siguientes datos personales:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Identificación:</strong> nombre, apellidos, correo electrónico.</li>
              <li><strong>Empresa:</strong> nombre de la empresa, cargo, número de empleados.</li>
              <li><strong>Uso de la plataforma:</strong> proyectos, presupuestos, inventarios y otros datos que introduces voluntariamente.</li>
              <li><strong>Técnicos:</strong> dirección IP, tipo de navegador, sistema operativo, páginas visitadas, duración de la sesión.</li>
              <li><strong>Facturación:</strong> RFC, datos de factura (procesados por terceros certificados; no almacenamos datos de tarjeta).</li>
            </ul>
            <p className="mt-3">
              No recopilamos datos personales sensibles (salud, biometría, ideología política, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Finalidades del tratamiento</h2>
            <p><strong>Finalidades primarias (necesarias para el servicio):</strong></p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Crear y gestionar tu cuenta de usuario.</li>
              <li>Prestar y mejorar los servicios de la Plataforma.</li>
              <li>Procesar pagos y emitir facturas.</li>
              <li>Brindarte soporte técnico.</li>
              <li>Enviarte notificaciones relacionadas con el servicio.</li>
              <li>Cumplir con obligaciones legales y fiscales.</li>
            </ul>
            <p className="mt-4"><strong>Finalidades secundarias (puedes oponerte):</strong></p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Enviarte comunicaciones comerciales y noticias del sector.</li>
              <li>Realizar encuestas de satisfacción.</li>
              <li>Análisis estadísticos agregados para mejorar el producto.</li>
            </ul>
            <p className="mt-3">
              Para oponerte a las finalidades secundarias, escríbenos a{' '}
              <a href="mailto:privacidad@sysiumtech.com" className="text-sysium-600 hover:underline">
                privacidad@sysiumtech.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Transferencia de datos</h2>
            <p>
              Tus datos pueden ser compartidos con los siguientes terceros, únicamente en la
              medida necesaria para prestar el servicio:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Supabase Inc.</strong> — almacenamiento de datos e infraestructura.</li>
              <li><strong>Vercel Inc.</strong> — alojamiento y entrega del servicio.</li>
              <li><strong>Formspree</strong> — procesamiento de formularios de contacto.</li>
              <li><strong>Procesadores de pago</strong> — para transacciones seguras.</li>
            </ul>
            <p className="mt-3">
              No vendemos ni cedemos tus datos personales a terceros con fines publicitarios.
              Todos nuestros proveedores operan bajo acuerdos de confidencialidad y políticas
              de privacidad equivalentes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Conservación de datos</h2>
            <p>
              Conservamos tus datos mientras tu cuenta esté activa y durante el período
              adicional necesario para cumplir con obligaciones legales (mínimo 5 años
              para datos fiscales conforme al SAT). Tras la cancelación de tu cuenta,
              eliminaremos tus datos operativos en un plazo de 30 días.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Derechos ARCO</h2>
            <p>
              Conforme a la LFPDPPP, tienes derecho a <strong>Acceder, Rectificar, Cancelar u
              Oponerte</strong> (derechos ARCO) al tratamiento de tus datos personales.
              Para ejercer estos derechos:
            </p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>Envía un correo a <a href="mailto:privacidad@sysiumtech.com" className="text-sysium-600 hover:underline">privacidad@sysiumtech.com</a> con asunto "Derechos ARCO".</li>
              <li>Incluye tu nombre completo, correo registrado y descripción del derecho que deseas ejercer.</li>
              <li>Responderemos en un plazo máximo de 20 días hábiles.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Cookies y tecnologías de seguimiento</h2>
            <p>
              Utilizamos cookies estrictamente necesarias para el funcionamiento de la
              Plataforma (sesión, autenticación). También podemos utilizar cookies analíticas
              anónimas para entender el uso del servicio. Puedes configurar tu navegador
              para rechazar cookies, aunque esto puede afectar la funcionalidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Seguridad</h2>
            <p>
              Implementamos medidas técnicas y organizativas para proteger tus datos:
              cifrado en tránsito (TLS), control de acceso por roles, auditorías de
              seguridad periódicas y copias de seguridad automáticas. Sin embargo,
              ningún sistema es 100% seguro. En caso de brecha de seguridad, te
              notificaremos conforme a la normativa aplicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. Publicaremos
              la versión actualizada en esta página y, ante cambios sustanciales,
              te notificaremos por correo electrónico con al menos 15 días de anticipación.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Autoridad reguladora</h2>
            <p>
              Si consideras que tus derechos han sido vulnerados, puedes presentar una
              queja ante el{' '}
              <strong>Instituto Nacional de Transparencia, Acceso a la Información y
              Protección de Datos Personales (INAI)</strong>:{' '}
              <a
                href="https://www.inai.org.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sysium-600 hover:underline"
              >
                www.inai.org.mx
              </a>.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex gap-6 text-sm text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">← Volver al inicio</Link>
          <Link href="/terms" className="hover:text-slate-600 transition-colors">Términos de uso</Link>
        </div>
      </main>
    </div>
  )
}
