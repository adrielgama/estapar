import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { SESSION_COOKIE_NAME } from '@/lib/session-cookie'

import Logo from '@/components/logo'
import { LogoutButton } from '@/components/logout-button'

import { users } from '@/mocks/users'

export default async function Home() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  const user = users.find((mockedUser) => mockedUser.id === session?.value)

  if (!user) {
    redirect('/login')
  }

  return (
    <main className="flex min-h-dvh flex-1 flex-col bg-zinc-50 px-6 py-8 sm:px-10">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
        <div className="text-neutral-900">
          <Logo />
        </div>
        <LogoutButton />
      </header>
    </main>
  )
}
