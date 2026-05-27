export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  message?: string
  user?: {
    id: string
    name: string
    email: string
  }
}

export async function login(payload: LoginPayload) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as LoginResponse

  if (!response.ok || !data.user) {
    throw new Error(data.message ?? 'Não foi possível acessar o sistema.')
  }

  return data.user
}
