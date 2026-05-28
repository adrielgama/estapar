'use client'

import { useState } from 'react'
import type { GaragePlan } from '@/types/garage'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

type GaragePlanDialogProps = {
  mode: 'create' | 'edit'
  open: boolean
  plan: GaragePlan | null
  onOpenChange: (open: boolean) => void
  onSubmit: (plan: GaragePlan) => void
}

type GaragePlanFormState = {
  description: string
  status: GaragePlan['status']
  vehicleType: string
  spots: string
  value: string
  cancellationValue: string
  startsAt: string
  endsAt: string
}

type GaragePlanFormErrors = Partial<
  Record<'spots' | 'value' | 'cancellationValue', string>
>

const defaultFormState: GaragePlanFormState = {
  description: '',
  status: 'Ativo',
  vehicleType: 'car',
  spots: '1',
  value: '0',
  cancellationValue: '0',
  startsAt: '2025-06-20',
  endsAt: '',
}

function getInitialFormState(plan: GaragePlan | null): GaragePlanFormState {
  if (!plan) {
    return defaultFormState
  }

  return {
    description: plan.description,
    status: plan.status,
    vehicleType: 'car',
    spots: String(plan.spots),
    value: plan.value.replace('R$ ', ''),
    cancellationValue: '0',
    startsAt: '2025-06-20',
    endsAt: '',
  }
}

function formatCurrency(value: string) {
  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return 'R$ 0,00'
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numericValue)
}

function getOnlyDigits(value: string) {
  return value.replace(/\D/g, '')
}

export function GaragePlanDialog({
  mode,
  open,
  plan,
  onOpenChange,
  onSubmit,
}: GaragePlanDialogProps) {
  const [formState, setFormState] = useState(() => getInitialFormState(plan))
  const [formErrors, setFormErrors] = useState<GaragePlanFormErrors>({})

  function updateFormState<Key extends keyof GaragePlanFormState>(
    key: Key,
    value: GaragePlanFormState[Key]
  ) {
    setFormState((currentFormState) => ({
      ...currentFormState,
      [key]: value,
    }))
  }

  function updateNumericFormState(
    key: keyof GaragePlanFormErrors,
    value: string
  ) {
    updateFormState(key, getOnlyDigits(value))
    setFormErrors((currentFormErrors) => ({
      ...currentFormErrors,
      [key]: undefined,
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextFormErrors: GaragePlanFormErrors = {}

    if (!formState.spots || Number(formState.spots) < 1) {
      nextFormErrors.spots = 'Informe um número maior que zero.'
    }

    if (!formState.value) {
      nextFormErrors.value = 'Informe apenas números.'
    }

    if (!formState.cancellationValue) {
      nextFormErrors.cancellationValue = 'Informe apenas números.'
    }

    if (Object.keys(nextFormErrors).length > 0) {
      setFormErrors(nextFormErrors)
      return
    }

    const spots = Number(formState.spots)
    const occupied = plan?.occupied ?? 0

    onSubmit({
      id: plan?.id ?? `plan-${crypto.randomUUID()}`,
      description: formState.description.trim() || 'Novo plano',
      value: formatCurrency(formState.value),
      spots,
      occupied,
      available: Math.max(spots - occupied, 0),
      status: formState.status,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-hidden p-0 sm:max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="flex max-h-[calc(100dvh-2rem)] min-h-0 flex-col"
        >
          <DialogHeader className="gap-1.5 px-5 pt-5 pr-12 sm:gap-2 sm:px-6 sm:pt-6">
            <DialogTitle className="text-2xl font-bold text-gray-950">
              {mode === 'create' ? 'Novo Plano' : 'Editar Plano'}
            </DialogTitle>
            <DialogDescription className="text-base">
              {mode === 'create'
                ? 'Preencha os dados para criar um novo plano.'
                : 'Atualize os dados do plano selecionado.'}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 grid min-h-0 flex-1 gap-4 overflow-y-auto px-5 pb-5 sm:mt-8 sm:gap-6 sm:px-6 md:grid-cols-2">
            <div className="space-y-2 sm:space-y-3">
              <Label
                htmlFor="plan-description"
                className="text-sm sm:text-base"
              >
                Descrição
              </Label>
              <Input
                id="plan-description"
                value={formState.description}
                onChange={(event) =>
                  updateFormState('description', event.target.value)
                }
                placeholder="Digite a descrição do plano"
                className="h-9 px-4 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="plan-status" className="text-sm sm:text-base">
                Status
              </Label>
              <div className="flex h-9 items-center gap-3">
                <Switch
                  id="plan-status"
                  size="lg"
                  checked={formState.status === 'Ativo'}
                  onCheckedChange={(checked) =>
                    updateFormState('status', checked ? 'Ativo' : 'Inativo')
                  }
                  className="data-checked:bg-estapar"
                />
                <span
                  className={cn(
                    'text-base font-semibold',
                    formState.status === 'Ativo'
                      ? 'text-estapar-hover'
                      : 'text-gray-800'
                  )}
                >
                  {formState.status}
                </span>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="vehicle-type" className="text-sm sm:text-base">
                Tipo de Veículo
              </Label>
              <Select
                value={formState.vehicleType}
                onValueChange={(value) => updateFormState('vehicleType', value)}
              >
                <SelectTrigger id="vehicle-type" className="h-9 w-full px-4">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">Carro</SelectItem>
                  <SelectItem value="motorcycle">Moto</SelectItem>
                  <SelectItem value="truck">Caminhão</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="plan-spots" className="text-sm sm:text-base">
                Total de Vagas
              </Label>
              <Input
                id="plan-spots"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formState.spots}
                onChange={(event) =>
                  updateNumericFormState('spots', event.target.value)
                }
                aria-invalid={Boolean(formErrors.spots)}
                className="h-9 px-4 text-sm sm:text-base"
              />
              {formErrors.spots && (
                <p className="text-destructive text-sm">{formErrors.spots}</p>
              )}
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="plan-value" className="text-sm sm:text-base">
                Valor (R$)
              </Label>
              <Input
                id="plan-value"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formState.value}
                onChange={(event) =>
                  updateNumericFormState('value', event.target.value)
                }
                aria-invalid={Boolean(formErrors.value)}
                className="h-9 px-4 text-sm sm:text-base"
              />
              {formErrors.value && (
                <p className="text-destructive text-sm">{formErrors.value}</p>
              )}
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label
                htmlFor="plan-cancellation-value"
                className="text-sm sm:text-base"
              >
                Valor do Cancelamento (R$)
              </Label>
              <Input
                id="plan-cancellation-value"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formState.cancellationValue}
                onChange={(event) =>
                  updateNumericFormState(
                    'cancellationValue',
                    event.target.value
                  )
                }
                aria-invalid={Boolean(formErrors.cancellationValue)}
                className="h-9 px-4 text-sm sm:text-base"
              />
              {formErrors.cancellationValue && (
                <p className="text-destructive text-sm">
                  {formErrors.cancellationValue}
                </p>
              )}
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="plan-starts-at" className="text-sm sm:text-base">
                Início da Validade
              </Label>
              <Input
                id="plan-starts-at"
                type="date"
                value={formState.startsAt}
                onChange={(event) =>
                  updateFormState('startsAt', event.target.value)
                }
                className="h-9 px-4 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="plan-ends-at" className="text-sm sm:text-base">
                Fim da Validade
              </Label>
              <Input
                id="plan-ends-at"
                type="date"
                value={formState.endsAt}
                onChange={(event) =>
                  updateFormState('endsAt', event.target.value)
                }
                className="h-9 px-4 text-sm sm:text-base"
              />
            </div>
          </div>

          <DialogFooter className="shrink-0 bg-popover px-5 pt-4 pb-5 sm:px-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="h-11 px-8 sm:h-12"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="estapar"
              className="h-11 px-8 sm:h-12"
            >
              {mode === 'create' ? 'Criar' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
