import { NextResponse } from 'next/server'

import { mockApiDelay } from '@/lib/mock-api-delay'
import { SESSION_COOKIE_NAME } from '@/lib/session-cookie'

import { users } from '@/mocks/users'

type LoginRequest = {
  email?: unknown
  password?: unknown
}

export async function POST(request: Request) {
  await mockApiDelay()

  const body = (await request.json()) as LoginRequest

  if (typeof body.email !== 'string' || typeof body.password !== 'string') {
    return NextResponse.json(
      { message: 'Informe usuário e senha para acessar.' },
      { status: 400 }
    )
  }

  const user = users.find(
    (mockedUser) =>
      mockedUser.email === body.email && mockedUser.password === body.password
  )

  if (!user) {
    return NextResponse.json(
      { message: 'Usuário ou senha inválidos.' },
      { status: 401 }
    )
  }

  const response = NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  })

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: user.id,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  return response
}
