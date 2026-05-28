import { Building2, Car } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getAuthenticatedUser } from '@/lib/get-authenticated-user'

import { AuthenticatedShell } from '@/components/authenticated-shell'
import { NavigationCard } from '@/components/navigation-card'

export default async function Home() {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <AuthenticatedShell userName={user.name}>
      <section className="p-4 md:p-6">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-semibold tracking-normal text-gray-800">
            Bem-vindo ao Portal Estapar B2B
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-500">
            Gerencie seus serviços de estacionamento, acesse relatórios,
            configure credenciados e contrate planos de mensalidade em um só
            lugar.
          </p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <NavigationCard
            icon={Building2}
            title="Garagens"
            description="Veja a lista de garagens disponíveis e suas configurações."
            url="/garagens"
          />
          <NavigationCard
            icon={Car}
            title="Mensalistas"
            description="Contrate vagas adicionais para seus funcionários ou visitantes."
            url="/mensalistas"
          />
        </div>
      </section>
    </AuthenticatedShell>
  )
}
