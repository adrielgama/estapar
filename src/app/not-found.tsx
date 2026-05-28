import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getAuthenticatedUser } from '@/lib/get-authenticated-user'

import { AuthenticatedShell } from '@/components/authenticated-shell'
import { Button } from '@/components/ui/button'

export default async function NotFound() {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <AuthenticatedShell userName={user.name}>
      <section className="flex min-h-[calc(100dvh-6rem)] items-center justify-center p-4 md:p-6">
        <div className="max-w-xl text-center">
          <AlertTriangle className="mx-auto size-12 text-estapar" />
          <p className="mt-6 text-sm font-semibold text-gray-500">404</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Página não encontrada
          </h1>
          <p className="mt-3 text-base leading-7 text-gray-500">
            A rota acessada não existe ou não está disponível no Portal Estapar
            B2B.
          </p>
          <Button asChild variant="estapar" className="mt-8">
            <Link href="/">Voltar ao início</Link>
          </Button>
        </div>
      </section>
    </AuthenticatedShell>
  )
}
