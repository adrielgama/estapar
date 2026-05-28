import type { Garage } from '@/types/garage'
import { Building, Building2, MapPin } from 'lucide-react'

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

type GarageDetailsHeaderProps = {
  garage: Garage
}

export function GarageDetailsHeader({ garage }: GarageDetailsHeaderProps) {
  return (
    <SheetHeader className="gap-4 space-y-4 p-6 md:p-8">
      <div className="flex flex-col items-start pr-10">
        <div className="flex items-center gap-4">
          <Building2 className="mt-1 size-9 shrink-0 text-gray-900" />
          <SheetTitle className="text-xl font-bold text-gray-950 md:text-3xl">
            {garage.name}
          </SheetTitle>
        </div>
        <SheetDescription className="mt-3 text-sm font-semibold text-gray-400">
          Código: {garage.code} -
        </SheetDescription>
      </div>

      <div className="space-y-3 text-sm font-medium text-gray-400">
        <div className="flex items-center gap-3">
          <MapPin className="size-5 shrink-0" />
          <span>{garage.fullAddress}</span>
        </div>
        <div className="flex items-center gap-3">
          <Building className="size-5 shrink-0" />
          <span>
            Filial: {garage.branch} · Regional: {garage.regional}
          </span>
        </div>
      </div>
    </SheetHeader>
  )
}
