import { describe, expect, it } from 'vitest'

import {
  formatCurrencyFromCents,
  getCurrencyInputValue,
  getOnlyDigits,
} from './utils'

describe('currency utils', () => {
  it('keeps only digits from formatted values', () => {
    expect(getOnlyDigits('R$ 1.003,00')).toBe('100300')
    expect(getOnlyDigits('abc123def')).toBe('123')
  })

  it('formats cent strings as Brazilian Real', () => {
    expect(formatCurrencyFromCents('0')).toBe('R$ 0,00')
    expect(formatCurrencyFromCents('2000')).toBe('R$ 20,00')
    expect(formatCurrencyFromCents('100300')).toBe('R$ 1.003,00')
  })

  it('returns a display value for empty currency inputs', () => {
    expect(getCurrencyInputValue('')).toBe('R$ 0,00')
  })
})
