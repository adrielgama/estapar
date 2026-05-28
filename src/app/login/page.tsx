import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { SESSION_COOKIE_NAME } from '@/lib/session-cookie'

import { Logo } from '@/components/logo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { users } from '@/mocks/users'

import { LoginForm } from './_components/login-form'

export default async function LoginPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  const user = users.find((mockedUser) => mockedUser.id === session?.value)

  if (user) {
    redirect('/')
  }

  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center bg-gray-50 px-6 py-8 sm:px-10">
      <div className="flex w-full max-w-3xl flex-col items-center gap-20 md:-translate-y-6">
        <Logo className="md:h-20 md:w-64" />

        <Card className="border-border bg-card w-full gap-12 border px-6 py-12 sm:px-10 sm:py-12">
          <CardHeader className="px-0">
            <CardTitle className="text-center text-lg leading-tight font-semibold text-gray-900 md:text-start md:text-xl">
              Entre com suas credenciais para acessar o sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
