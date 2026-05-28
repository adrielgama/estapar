import { redirect } from 'next/navigation'

import { getAuthenticatedUser } from '@/lib/get-authenticated-user'

import { AuthenticatedShell } from '@/components/authenticated-shell'

export default async function MensalistasPage() {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <AuthenticatedShell userName={user.name}>
      <section className="p-4 md:p-6">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-semibold tracking-normal text-gray-900">
            Mensalistas
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-8 text-gray-600">
            Consulte e administre clientes mensalistas vinculados às garagens.
          </p>
        </div>
      </section>
    </AuthenticatedShell>
  )
}
