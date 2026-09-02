'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatNumberInput, parseNumberInput } from '@/lib/format'
import { isValidEmail, isValidWhatsapp } from '@/lib/validation'

type Cliente = { id: string; nombre: string; whatsapp: string }

const inputClass =
  'w-full bg-[#0d1117] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-sysium-500 focus:ring-1 focus:ring-sysium-500 transition-colors'
const labelClass = 'block text-sm font-medium text-slate-300 mb-1.5'

export default function NuevaObraForm({
  constructoraId,
  clientes,
}: {
  constructoraId: string
  clientes: Cliente[]
}) {
  const router = useRouter()

  const [clienteMode, setClienteMode] = useState<'existente' | 'nuevo'>(
    clientes.length > 0 ? 'existente' : 'nuevo'
  )
  const [clienteId, setClienteId] = useState(clientes[0]?.id ?? '')
  const [clienteNombre, setClienteNombre] = useState('')
  const [clienteWhatsapp, setClienteWhatsapp] = useState('')
  const [clienteEmail, setClienteEmail] = useState('')

  const [nombre, setNombre] = useState('')
  const [direccion, setDireccion] = useState('')
  const [presupuestoTotal, setPresupuestoTotal] = useState('')
  const [abonadoTotal, setAbonadoTotal] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!nombre.trim()) {
      setError('El nombre de la obra es obligatorio.')
      return
    }
    if (clienteMode === 'existente' && !clienteId) {
      setError('Selecciona un cliente.')
      return
    }
    if (clienteMode === 'nuevo') {
      if (!clienteNombre.trim() || !clienteWhatsapp.trim()) {
        setError('Nombre y WhatsApp del cliente son obligatorios.')
        return
      }
      if (!isValidWhatsapp(clienteWhatsapp)) {
        setError('El WhatsApp debe tener entre 10 y 15 dígitos (puede incluir lada, espacios o guiones).')
        return
      }
      if (clienteEmail.trim() && !isValidEmail(clienteEmail.trim())) {
        setError('El correo del cliente no tiene un formato válido.')
        return
      }
    }
    if (fechaInicio && fechaFin && fechaFin < fechaInicio) {
      setError('La fecha de fin estimado no puede ser anterior a la fecha de inicio.')
      return
    }

    setLoading(true)
    const supabase = createClient()

    let finalClienteId = clienteId
    let finalNombreCliente = clientes.find((c) => c.id === clienteId)?.nombre ?? ''

    if (clienteMode === 'nuevo') {
      const { data: nuevoCliente, error: clienteError } = await supabase
        .from('clientes')
        .insert({
          constructora_id: constructoraId,
          nombre: clienteNombre.trim(),
          whatsapp: clienteWhatsapp.trim(),
          email: clienteEmail.trim() || null,
        })
        .select('id, nombre')
        .single()

      if (clienteError || !nuevoCliente) {
        setError('No se pudo crear el cliente: ' + (clienteError?.message ?? 'error desconocido'))
        setLoading(false)
        return
      }
      finalClienteId = nuevoCliente.id
      finalNombreCliente = nuevoCliente.nombre
    }

    const { error: obraError } = await supabase.from('obras').insert({
      constructora_id: constructoraId,
      cliente_id: finalClienteId,
      nombre: nombre.trim(),
      nombre_cliente: finalNombreCliente,
      direccion: direccion.trim() || null,
      presupuesto_total: parseNumberInput(presupuestoTotal),
      abonado_total: parseNumberInput(abonadoTotal),
      fecha_inicio: fechaInicio || null,
      fecha_estimada_fin: fechaFin || null,
    })

    if (obraError) {
      setError('No se pudo crear la obra: ' + obraError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard/obras')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Datos de la obra */}
      <div className="bg-[#161b27] border border-white/5 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white">Datos de la obra</h2>

        <div>
          <label className={labelClass}>Nombre de la obra</label>
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Residencial Las Palmas"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Dirección</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Av. Siempre Viva 123, Guadalajara"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Presupuesto total</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
              <input
                type="text"
                inputMode="decimal"
                required
                value={presupuestoTotal}
                onChange={(e) => setPresupuestoTotal(formatNumberInput(e.target.value))}
                placeholder="850,000"
                className={`${inputClass} pl-7`}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Abonado</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
              <input
                type="text"
                inputMode="decimal"
                value={abonadoTotal}
                onChange={(e) => setAbonadoTotal(formatNumberInput(e.target.value))}
                placeholder="0"
                className={`${inputClass} pl-7`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Fecha de inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => {
                setFechaInicio(e.target.value)
                if (fechaFin && e.target.value && fechaFin < e.target.value) {
                  setFechaFin('')
                }
              }}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Fin estimado</label>
            <input
              type="date"
              value={fechaFin}
              min={fechaInicio || undefined}
              onChange={(e) => setFechaFin(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Cliente */}
      <div className="bg-[#161b27] border border-white/5 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Cliente</h2>
          {clientes.length > 0 && (
            <div className="flex bg-[#0d1117] border border-white/10 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setClienteMode('existente')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  clienteMode === 'existente' ? 'bg-sysium-600 text-white' : 'text-slate-400'
                }`}
              >
                Existente
              </button>
              <button
                type="button"
                onClick={() => setClienteMode('nuevo')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  clienteMode === 'nuevo' ? 'bg-sysium-600 text-white' : 'text-slate-400'
                }`}
              >
                Nuevo
              </button>
            </div>
          )}
        </div>

        {clienteMode === 'existente' ? (
          <div>
            <label className={labelClass}>Selecciona un cliente</label>
            <select
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
              className={inputClass}
            >
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre} · {c.whatsapp}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <div>
              <label className={labelClass}>Nombre del cliente</label>
              <input
                type="text"
                value={clienteNombre}
                onChange={(e) => setClienteNombre(e.target.value)}
                placeholder="Carlos Mendoza"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>WhatsApp</label>
                <input
                  type="tel"
                  inputMode="tel"
                  value={clienteWhatsapp}
                  onChange={(e) => setClienteWhatsapp(e.target.value)}
                  placeholder="+52 33 1234 5678"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Correo (opcional)</label>
                <input
                  type="email"
                  value={clienteEmail}
                  onChange={(e) => setClienteEmail(e.target.value)}
                  placeholder="cliente@correo.com"
                  className={inputClass}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sysium-600 hover:bg-sysium-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? 'Creando obra...' : 'Crear obra'}
      </button>
    </form>
  )
}
