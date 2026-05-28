import { describe, expect, it, vi } from 'vitest'

import { POST } from './route'

vi.mock('@/lib/mock-api-delay', () => ({
  mockApiDelay: vi.fn(() => Promise.resolve()),
}))

describe('POST /api/garage-plans', () => {
  it('returns a formatted garage plan for valid payloads', async () => {
    const response = await POST(
      new Request('http://localhost/api/garage-plans', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Plano mensal',
          status: 'Ativo',
          vehicleType: 'car',
          spots: '5',
          value: '20000',
          cancellationValue: '3000',
          startsAt: '2025-06-20',
          endsAt: '2026-06-10',
          occupied: 2,
        }),
      })
    )

    expect(response.status).toBe(200)

    const data = await response.json()

    expect(data.plan).toMatchObject({
      description: 'Plano mensal',
      value: 'R$ 200,00',
      spots: 5,
      occupied: 2,
      available: 3,
      status: 'Ativo',
    })
    expect(data.plan.id).toEqual(expect.any(String))
  })

  it('returns 400 for invalid payloads', async () => {
    const response = await POST(
      new Request('http://localhost/api/garage-plans', {
        method: 'POST',
        body: JSON.stringify({
          description: '',
          status: 'Ativo',
          vehicleType: 'car',
          spots: '0',
          value: '0',
          cancellationValue: '0',
          startsAt: '',
          endsAt: '',
          occupied: 0,
        }),
      })
    )

    expect(response.status).toBe(400)
  })
})
