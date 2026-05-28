import type { GaragePlan } from '@/types/garage'
import { NextResponse } from 'next/server'
import { z } from 'zod/v3'

import { mockApiDelay } from '@/lib/mock-api-delay'
import { formatCurrencyFromCents } from '@/lib/utils'

const saveGaragePlanSchema = z
  .object({
    id: z.string().optional(),
    description: z.string().trim().min(1),
    status: z.enum(['Ativo', 'Inativo']),
    vehicleType: z.enum(['car', 'motorcycle', 'truck']),
    spots: z
      .string()
      .regex(/^\d+$/)
      .refine((value) => Number(value) > 0),
    value: z
      .string()
      .regex(/^\d+$/)
      .refine((value) => Number(value) > 0),
    cancellationValue: z.string().regex(/^\d+$/),
    startsAt: z.string().min(1),
    endsAt: z.string(),
    occupied: z.number().int().min(0),
  })
  .refine((values) => !values.endsAt || values.endsAt >= values.startsAt)

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
