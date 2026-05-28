import { redirect } from 'next/navigation'

import { getAuthenticatedUser } from '@/lib/get-authenticated-user'

import { AuthenticatedShell } from '@/components/authenticated-shell'

export default async function GaragensPage() {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <AuthenticatedShell userName={user.name}>
      <section className="px-6 py-8 md:px-16 md:py-14">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-semibold tracking-normal text-gray-900">
            Garagens
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-8 text-gray-600">
            Veja a lista de garagens disponíveis e suas configurações.
          </p>
        </div>
      </section>
    </AuthenticatedShell>
  )
}
