export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/**
 * Acepta números con o sin lada de país, con espacios/guiones/paréntesis
 * (p.ej. "+52 33 1234 5678"), validando solo la cantidad de dígitos reales.
 */
export function isValidWhatsapp(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}
