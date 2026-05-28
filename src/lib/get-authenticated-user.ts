import { cookies } from 'next/headers'

import { users } from '@/mocks/users'

import { SESSION_COOKIE_NAME } from './session-cookie'

export async function getAuthenticatedUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)

  return users.find((mockedUser) => mockedUser.id === session?.value)
}
