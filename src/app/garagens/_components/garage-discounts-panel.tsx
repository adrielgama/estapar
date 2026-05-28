import type { Garage } from '@/types/garage'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type GarageDiscountsPanelProps = {
  garage: Garage
}

export function GarageDiscountsPanel({ garage }: GarageDiscountsPanelProps) {
  return (
    <div>
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Descontos Disponíveis
      </h2>
      <div className="border-border overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-12 px-4">Descrição</TableHead>
              <TableHead className="h-12 px-4">Percentual</TableHead>
              <TableHead className="h-12 px-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {garage.discounts.map((discount) => (
              <TableRow key={discount.id} className="hover:bg-gray-50">
                <TableCell className="h-14 px-4 font-medium text-gray-600">
                  {discount.description}
                </TableCell>
                <TableCell className="h-14 px-4 text-gray-600">
                  {discount.percentage}%
                </TableCell>
                <TableCell className="h-14 px-4">
                  <Badge variant="outline">{discount.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
