import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOnlyDigits(value: string) {
  return value.replace(/\D/g, '')
}

export function formatCurrencyFromCents(value: string) {
  const numericValue = Number(value) / 100

  if (!Number.isFinite(numericValue)) {
    return 'R$ 0,00'
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericValue)
}

export function getCurrencyInputValue(value: string) {
  return formatCurrencyFromCents(value || '0')
}
