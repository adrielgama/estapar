'use client'

import { useState } from 'react'
import type { GaragePlan } from '@/types/garage'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod/v3'

import {
  cn,
  formatCurrencyFromCents,
  getCurrencyInputValue,
  getOnlyDigits,
} from '@/lib/utils'

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
  Record<keyof GaragePlanFormState, string>
>

const garagePlanFormSchema = z
  .object({
    description: z.string().trim().min(1, 'Informe a descrição do plano.'),
    status: z.enum(['Ativo', 'Inativo']),
    vehicleType: z.enum(['car', 'motorcycle', 'truck']),
    spots: z
      .string()
      .regex(/^\d+$/, 'Informe apenas números.')
      .refine((value) => Number(value) > 0, 'Informe um número maior que zero.'),
    value: z
      .string()
      .regex(/^\d+$/, 'Informe apenas números.')
      .refine((value) => Number(value) > 0, 'Informe um valor maior que zero.'),
    cancellationValue: z
      .string()
      .regex(/^\d+$/, 'Informe apenas números.'),
    startsAt: z.string().min(1, 'Informe o início da validade.'),
    endsAt: z.string(),
  })
  .refine(
    (values) => !values.endsAt || values.endsAt >= values.startsAt,
    {
      path: ['endsAt'],
      message: 'A data final deve ser posterior ao início.',
    }
  )

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
    value: getOnlyDigits(plan.value),
    cancellationValue: '0',
    startsAt: '2025-06-20',
    endsAt: '',
  }
}

function getGaragePlanFormErrors(
  formState: GaragePlanFormState
): GaragePlanFormErrors {
  const result = garagePlanFormSchema.safeParse(formState)

  if (result.success) {
    return {}
  }

  const fieldErrors = result.error.flatten().fieldErrors

  return Object.fromEntries(
    Object.entries(fieldErrors)
      .map(([field, messages]) => [field, messages?.[0]])
      .filter(([, message]) => Boolean(message))
  ) as GaragePlanFormErrors
}

function waitForPlanSave() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 900)
  })
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
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateFormState<Key extends keyof GaragePlanFormState>(
    key: Key,
    value: GaragePlanFormState[Key]
  ) {
    setFormState((currentFormState) => ({
      ...currentFormState,
      [key]: value,
    }))
    setFormErrors((currentFormErrors) => ({
      ...currentFormErrors,
      [key]: undefined,
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextFormErrors = getGaragePlanFormErrors(formState)

    if (Object.keys(nextFormErrors).length > 0) {
      setFormErrors(nextFormErrors)
      return
    }

    setIsSubmitting(true)
    await waitForPlanSave()

    const spots = Number(formState.spots)
    const occupied = plan?.occupied ?? 0

    onSubmit({
      id: plan?.id ?? `plan-${crypto.randomUUID()}`,
      description: formState.description.trim() || 'Novo plano',
      value: formatCurrencyFromCents(formState.value),
      spots,
      occupied,
      available: Math.max(spots - occupied, 0),
      status: formState.status,
    })
    toast.success(
      mode === 'create'
        ? 'Plano criado com sucesso.'
        : 'Plano atualizado com sucesso.'
    )
    setIsSubmitting(false)
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
                aria-invalid={Boolean(formErrors.description)}
                className="h-9 px-4 text-sm sm:text-base"
              />
              {formErrors.description && (
                <p className="text-destructive text-sm" role="alert">
                  {formErrors.description}
                </p>
              )}
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
                value={getCurrencyInputValue(formState.value)}
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
                value={getCurrencyInputValue(formState.cancellationValue)}
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
                aria-invalid={Boolean(formErrors.startsAt)}
                className="h-9 px-4 text-sm sm:text-base"
              />
              {formErrors.startsAt && (
                <p className="text-destructive text-sm" role="alert">
                  {formErrors.startsAt}
                </p>
              )}
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
                aria-invalid={Boolean(formErrors.endsAt)}
                className="h-9 px-4 text-sm sm:text-base"
              />
              {formErrors.endsAt && (
                <p className="text-destructive text-sm" role="alert">
                  {formErrors.endsAt}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="bg-popover shrink-0 px-5 pt-4 pb-5 sm:px-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                className="h-11 px-8 sm:h-12"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant="estapar"
              disabled={isSubmitting}
              className="h-11 px-8 sm:h-12"
            >
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              {isSubmitting
                ? 'Salvando...'
                : mode === 'create'
                  ? 'Criar'
                  : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
