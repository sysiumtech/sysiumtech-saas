const compactMXN = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const fullMXN = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

export function formatCurrencyCompact(value: number) {
  return compactMXN.format(value)
}

export function formatCurrency(value: number) {
  return fullMXN.format(value)
}

/**
 * Formatea lo que el usuario va tecleando en un input de dinero:
 * agrega comas de miles en vivo, permite hasta 2 decimales.
 * Usar junto con `parseNumberInput` para recuperar el número real al enviar.
 */
export function formatNumberInput(raw: string): string {
  const cleaned = raw.replace(/[^\d.]/g, '')
  const dotIndex = cleaned.indexOf('.')

  const integerPartRaw = dotIndex === -1 ? cleaned : cleaned.slice(0, dotIndex)
  const integerPart = integerPartRaw.replace(/^0+(?=\d)/, '')

  const decimalPart =
    dotIndex === -1 ? '' : '.' + cleaned.slice(dotIndex + 1).replace(/\./g, '').slice(0, 2)

  const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return withCommas + decimalPart
}

export function parseNumberInput(formatted: string): number {
  const cleaned = formatted.replace(/,/g, '')
  return cleaned ? Number(cleaned) : 0
}

export function formatDate(value: string | null) {
  if (!value) return '—'
  // Columnas `date` (sin hora): se parsean como UTC medianoche, así que
  // formateamos también en UTC para no perder/ganar un día según la
  // zona horaria local de quien lo ve.
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeZone: 'UTC' }).format(
    new Date(value)
  )
}
