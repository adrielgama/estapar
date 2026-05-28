import type { Garage } from '@/types/garage'

type GarageSettingsPanelProps = {
  garage: Garage
}

export function GarageSettingsPanel({ garage }: GarageSettingsPanelProps) {
  return (
    <div>
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Configurações
      </h2>
      <dl className="border-border grid gap-4 rounded-lg border p-5 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-semibold text-gray-500">Pernoite</dt>
          <dd className="mt-2 text-gray-900">
            {garage.settings.allowsOvernight ? 'Permitido' : 'Bloqueado'}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-500">Aprovação</dt>
          <dd className="mt-2 text-gray-900">
            {garage.settings.requiresApproval ? 'Obrigatória' : 'Automática'}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-gray-500">Dia de cobrança</dt>
          <dd className="mt-2 text-gray-900">
            Dia {garage.settings.billingDay}
          </dd>
        </div>
      </dl>
    </div>
  )
}
