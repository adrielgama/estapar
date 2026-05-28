'use client'

import type { Garage } from '@/types/garage'

import { Sheet, SheetContent } from '@/components/ui/sheet'

import { GarageDetailsHeader } from './garage-details-header'
import { GarageDetailsTabs } from './garage-details-tabs'

type GarageDetailsSheetProps = {
  garage: Garage | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GarageDetailsSheet({
  garage,
  open,
  onOpenChange,
}: GarageDetailsSheetProps) {
  if (!garage) {
    return null
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="max-w-none! gap-0 overflow-x-hidden overflow-y-auto p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-none! md:data-[side=right]:w-[calc(100vw-15rem)] md:data-[side=right]:max-w-[calc(100vw-15rem)]!"
      >
        <GarageDetailsHeader garage={garage} />
        <GarageDetailsTabs key={garage.code} garage={garage} />
      </SheetContent>
    </Sheet>
  )
}
