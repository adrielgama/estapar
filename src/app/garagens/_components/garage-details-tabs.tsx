'use client'

import type { Garage, GaragePlan } from '@/types/garage'
import { useState } from 'react'
import { BadgePercent, CircleDollarSign, Settings } from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { GarageDiscountsPanel } from './garage-discounts-panel'
import { GarageMetricCard } from './garage-metric-card'
import { GaragePlanDialog } from './garage-plan-dialog'
import { GaragePlansPanel } from './garage-plans-panel'
import { GarageQrCode } from './garage-qr-code'
import { GarageSettingsPanel } from './garage-settings-panel'

type GarageDetailsTabsProps = {
  garage: Garage
}

export function GarageDetailsTabs({ garage }: GarageDetailsTabsProps) {
  const [plans, setPlans] = useState(() => garage.plans)
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<GaragePlan | null>(null)
  const isCreatingPlan = selectedPlan === null

  function handleCreatePlanClick() {
    setSelectedPlan(null)
    setIsPlanDialogOpen(true)
  }

  function handleEditPlanClick(plan: GaragePlan) {
    setSelectedPlan(plan)
    setIsPlanDialogOpen(true)
  }

  function handlePlanSubmit(plan: GaragePlan) {
    setPlans((currentPlans) => {
      if (isCreatingPlan) {
        return [...currentPlans, plan]
      }

      return currentPlans.map((currentPlan) =>
        currentPlan.id === plan.id ? plan : currentPlan
      )
    })
    setIsPlanDialogOpen(false)
  }

  return (
    <>
      <Tabs defaultValue="plans" className="gap-6 px-6 pb-8 md:px-8">
        <TabsList
          variant="line"
          className="border-border h-12! w-full justify-start rounded-t-lg! border-b bg-gray-100 px-1.5"
        >
          <TabsTrigger
            value="plans"
            className="data-active:after:bg-estapar-active h-9.5 flex-none rounded-b-none px-6 after:bottom-0 data-active:bg-white! data-active:text-gray-950"
          >
            Mensalista Digital
          </TabsTrigger>
        </TabsList>

        <div className="min-w-0 space-y-6">
          <div className="grid min-w-0 items-center gap-6 xl:grid-cols-[minmax(0,1fr)_8rem]">
            <div className="grid min-w-0 gap-4 md:grid-cols-3">
              <GarageMetricCard
                title="Total de Vagas"
                value={garage.totalSpots}
                iconClassName="text-gray-500"
              />
              <GarageMetricCard
                title="Ocupadas"
                value={garage.occupiedSpots}
                iconClassName="text-orange-400"
              />
              <GarageMetricCard
                title="Disponíveis"
                value={garage.availableSpots}
                iconClassName="text-estapar"
              />
            </div>

            <div className="flex justify-center">
              <GarageQrCode garage={garage} />
            </div>
          </div>

          <Tabs
            defaultValue="plans"
            orientation="vertical"
            className="border-border grid min-w-0 items-start gap-0 rounded-tl-lg border-t lg:grid-cols-[14rem_minmax(0,1fr)]"
          >
            <TabsList
              variant="line"
              className="lg:border-border/30 w-full items-stretch justify-start overflow-x-auto rounded-l-lg! rounded-bl-lg! border-t-0! bg-gray-50 p-0 lg:h-52 lg:flex-col lg:overflow-visible lg:border"
            >
              <TabsTrigger
                value="plans"
                className="before:bg-estapar cursor-pointer justify-start gap-4 px-6 py-2 pl-7 text-base before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-tl-full! before:opacity-0 before:transition-opacity after:hidden data-active:bg-white! data-active:text-gray-950 data-active:before:opacity-100 lg:gap-3 lg:px-5 lg:py-0 lg:pl-6 lg:text-sm"
              >
                <CircleDollarSign className="size-5" />
                Planos
              </TabsTrigger>
              <TabsTrigger
                value="discounts"
                className="before:bg-estapar cursor-pointer justify-start gap-4 rounded-none px-6 py-2 pl-7 text-base before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-none before:opacity-0 before:transition-opacity after:hidden data-active:bg-white! data-active:text-gray-950 data-active:before:opacity-100 lg:gap-3 lg:px-5 lg:py-0 lg:pl-6 lg:text-sm"
              >
                <BadgePercent className="size-5" />
                Descontos
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="before:bg-estapar cursor-pointer justify-start gap-4 rounded-none px-6 py-2 pl-7 text-base before:absolute before:inset-y-0 before:left-0 before:w-1 before:rounded-bl-full before:opacity-0 before:transition-opacity after:hidden data-active:bg-white! data-active:text-gray-950 data-active:before:opacity-100 lg:gap-3 lg:px-5 lg:py-0 lg:pl-6 lg:text-sm"
              >
                <Settings className="size-5" />
                Configurações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="plans" className="min-w-0 p-5 lg:p-8">
              <GaragePlansPanel
                plans={plans}
                onCreatePlan={handleCreatePlanClick}
                onEditPlan={handleEditPlanClick}
              />
            </TabsContent>
            <TabsContent value="discounts" className="min-w-0 p-5 lg:p-8">
              <GarageDiscountsPanel garage={garage} />
            </TabsContent>
            <TabsContent value="settings" className="min-w-0 p-5 lg:p-8">
              <GarageSettingsPanel garage={garage} />
            </TabsContent>
          </Tabs>
        </div>
      </Tabs>

      {isPlanDialogOpen && (
        <GaragePlanDialog
          key={selectedPlan?.id ?? 'new-plan'}
          mode={isCreatingPlan ? 'create' : 'edit'}
          open={isPlanDialogOpen}
          plan={selectedPlan}
          onOpenChange={setIsPlanDialogOpen}
          onSubmit={handlePlanSubmit}
        />
      )}
    </>
  )
}
