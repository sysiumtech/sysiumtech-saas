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

export function formatDate(value: string | null) {
  if (!value) return '—'
  // Columnas `date` (sin hora): se parsean como UTC medianoche, así que
  // formateamos también en UTC para no perder/ganar un día según la
  // zona horaria local de quien lo ve.
  return new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeZone: 'UTC' }).format(
    new Date(value)
  )
}
