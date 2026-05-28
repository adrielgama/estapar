import { describe, expect, it } from 'vitest'

import { garagePlanFormSchema } from './garage-plan-schema'

const validPlanPayload = {
  description: 'Plano mensal',
  status: 'Ativo',
  vehicleType: 'car',
  spots: '5',
  value: '20000',
  cancellationValue: '3000',
  startsAt: '2025-06-20',
  endsAt: '2026-06-10',
} as const

describe('garagePlanFormSchema', () => {
  it('accepts a valid plan payload', () => {
    expect(garagePlanFormSchema.safeParse(validPlanPayload).success).toBe(true)
  })

  it('requires description', () => {
    const result = garagePlanFormSchema.safeParse({
      ...validPlanPayload,
      description: '',
    })

    expect(result.success).toBe(false)
  })

  it('rejects zero spots and zero value', () => {
    const result = garagePlanFormSchema.safeParse({
      ...validPlanPayload,
      spots: '0',
      value: '0',
    })

    expect(result.success).toBe(false)
  })

  it('rejects non numeric money values', () => {
    const result = garagePlanFormSchema.safeParse({
      ...validPlanPayload,
      value: 'R$ 20,00',
    })

    expect(result.success).toBe(false)
  })

  it('rejects end date before start date', () => {
    const result = garagePlanFormSchema.safeParse({
      ...validPlanPayload,
      startsAt: '2026-06-10',
      endsAt: '2025-06-20',
    })

    expect(result.success).toBe(false)
  })
})
