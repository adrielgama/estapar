import { NextResponse } from 'next/server'

import { mockApiDelay } from '@/lib/mock-api-delay'
import { garages } from '@/mocks/garages'

export async function GET() {
  await mockApiDelay()

  return NextResponse.json({ garages })
}
