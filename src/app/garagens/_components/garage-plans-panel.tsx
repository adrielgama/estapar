import type { GaragePlan } from '@/types/garage'
import { Car, Edit, Plus } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type GaragePlansPanelProps = {
  plans: GaragePlan[]
  onCreatePlan: () => void
  onEditPlan: (plan: GaragePlan) => void
}

export function GaragePlansPanel({
  plans,
  onCreatePlan,
  onEditPlan,
}: GaragePlansPanelProps) {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Planos Disponíveis
        </h2>
        <Button
          type="button"
          variant="outline"
          onClick={onCreatePlan}
          className="border-estapar-outline! bg-background! text-estapar-outline hover:bg-estapar/10 hover:border-estapar! hover:text-estapar shadow-none"
        >
          <Plus className="size-4" />
          Novo Plano
        </Button>
      </div>

      <div className="border-border overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-12 px-4">Descrição</TableHead>
              <TableHead className="h-12 px-4">Valor</TableHead>
              <TableHead className="h-12 px-4">Vagas</TableHead>
              <TableHead className="h-12 px-4">Ocupadas</TableHead>
              <TableHead className="h-12 px-4">Disponíveis</TableHead>
              <TableHead className="h-12 px-4">Status</TableHead>
              <TableHead className="h-12 px-4 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id} className="hover:bg-gray-50">
                <TableCell className="h-14 px-4 font-medium text-gray-500">
                  <div className="flex items-center gap-3">
                    <Car className="size-5" />
                    {plan.description}
                  </div>
                </TableCell>
                <TableCell className="h-14 px-4 text-gray-500">
                  {plan.value}
                </TableCell>
                <TableCell className="h-14 px-4 text-gray-500">
                  {plan.spots}
                </TableCell>
                <TableCell className="h-14 px-4 text-gray-500">
                  {plan.occupied}
                </TableCell>
                <TableCell className="h-14 px-4 text-gray-500">
                  {plan.available}
                </TableCell>
                <TableCell className="h-14 px-4">
                  <Badge
                    variant={
                      plan.status.toLocaleLowerCase() === 'ativo'
                        ? 'estapar'
                        : 'secondary'
                    }
                  >
                    {plan.status}
                  </Badge>
                </TableCell>
                <TableCell className="h-14 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => onEditPlan(plan)}
                    className="focus-visible:ring-ring/50 inline-flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-100 focus-visible:ring-3 focus-visible:outline-none"
                    aria-label={`Editar plano ${plan.description}`}
                  >
                    <Edit className="size-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
