import { NextResponse } from 'next/server'

import { mockApiDelay } from '@/lib/mock-api-delay'
import { SESSION_COOKIE_NAME } from '@/lib/session-cookie'

export async function POST() {
  await mockApiDelay()

  const response = NextResponse.json({ success: true })

  response.cookies.delete(SESSION_COOKIE_NAME)

  return response
}
