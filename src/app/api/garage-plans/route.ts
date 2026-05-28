import type { GaragePlan } from '@/types/garage'
import { NextResponse } from 'next/server'

import { saveGaragePlanSchema } from '@/lib/garage-plan-schema'
import { mockApiDelay } from '@/lib/mock-api-delay'
import { formatCurrencyFromCents } from '@/lib/utils'

export async function POST(request: Request) {
  await mockApiDelay()

  const body = await request.json()
  const result = saveGaragePlanSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { message: 'Informe dados válidos para salvar o plano.' },
      { status: 400 }
    )
  }

  const spots = Number(result.data.spots)
  const occupied = Math.min(result.data.occupied, spots)

  const plan: GaragePlan = {
    id: result.data.id ?? `plan-${crypto.randomUUID()}`,
    description: result.data.description,
    value: formatCurrencyFromCents(result.data.value),
    spots,
    occupied,
    available: Math.max(spots - occupied, 0),
    status: result.data.status,
  }

  return NextResponse.json({ plan })
}
