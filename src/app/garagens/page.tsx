import { Building2 } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getAuthenticatedUser } from '@/lib/get-authenticated-user'

import { AuthenticatedShell } from '@/components/authenticated-shell'
import { PageHeader } from '@/components/page-header'

import { GaragesTable } from './_components/garages-table'

export default async function GaragensPage() {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <AuthenticatedShell userName={user.name}>
      <section className="p-4 md:p-6">
        <PageHeader
          icon={Building2}
          title="Garagens"
          description="Visualize as garagens habilitadas para mensalistas digitais."
        />

        <GaragesTable />
      </section>
    </AuthenticatedShell>
  )
}
