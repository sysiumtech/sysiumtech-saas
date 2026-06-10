import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'SYSIUM TECH — Gestión de Obras para PYMES en LATAM'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0d1117 0%, #1a1f3c 50%, #0d1117 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1, #f97316)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
            }}
          >
            ⚡
          </div>
          <span style={{ color: 'white', fontSize: '36px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
            SYSIUM TECH
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            color: 'white',
            fontSize: '72px',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '28px',
          }}
        >
          Digitaliza tu obra.
        </div>
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '36px',
            color: '#6366f1',
          }}
        >
          Elimina el caos.
        </div>

        {/* Subtitle */}
        <p
          style={{
            color: '#94a3b8',
            fontSize: '26px',
            textAlign: 'center',
            margin: 0,
            maxWidth: '700px',
          }}
        >
          Gestión de proyectos de construcción para PYMES en Latinoamérica
        </p>
      </div>
    ),
    { ...size },
  )
}
