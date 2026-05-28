import { Car } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getAuthenticatedUser } from '@/lib/get-authenticated-user'

import { AuthenticatedShell } from '@/components/authenticated-shell'
import { PageHeader } from '@/components/page-header'

export default async function MensalistasPage() {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <AuthenticatedShell userName={user.name}>
      <section className="p-4 md:p-6">
        <PageHeader
          icon={Car}
          title="Mensalistas"
          description="Consulte e administre clientes mensalistas vinculados às garagens."
        />
      </section>
    </AuthenticatedShell>
  )
}
