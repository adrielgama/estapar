'use client'

import type { GaragePlan } from '@/types/garage'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

import {
  garagePlanFormSchema,
  type GaragePlanFormValues,
} from '@/lib/garage-plan-schema'
import { cn, getCurrencyInputValue, getOnlyDigits } from '@/lib/utils'

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

type SaveGaragePlanResponse = {
  plan: GaragePlan
}

const defaultFormValues: GaragePlanFormValues = {
  description: '',
  status: 'Ativo',
  vehicleType: 'car',
  spots: '1',
  value: '0',
  cancellationValue: '0',
  startsAt: '2025-06-20',
  endsAt: '',
}

function getInitialFormValues(plan: GaragePlan | null): GaragePlanFormValues {
  if (!plan) {
    return defaultFormValues
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

async function saveGaragePlan(
  payload: GaragePlanFormValues & {
    id?: string
    occupied: number
  }
) {
  const response = await fetch('/api/garage-plans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Não foi possível salvar o plano.')
  }

  const data = (await response.json()) as SaveGaragePlanResponse

  return data.plan
}

export function GaragePlanDialog({
  mode,
  open,
  plan,
  onOpenChange,
  onSubmit,
}: GaragePlanDialogProps) {
  const form = useForm<GaragePlanFormValues>({
    resolver: zodResolver(garagePlanFormSchema),
    defaultValues: getInitialFormValues(plan),
  })

  const isSubmitting = form.formState.isSubmitting

  const handlePlanSubmit: SubmitHandler<GaragePlanFormValues> = async (
    values
  ) => {
    try {
      const savedPlan = await saveGaragePlan({
        ...values,
        id: plan?.id,
        occupied: plan?.occupied ?? 0,
      })

      onSubmit(savedPlan)
      toast.success(
        mode === 'create'
          ? 'Plano criado com sucesso.'
          : 'Plano atualizado com sucesso.'
      )
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Não foi possível salvar o plano.'
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-hidden p-0 sm:max-w-2xl xl:max-w-4xl">
        <form
          onSubmit={form.handleSubmit(handlePlanSubmit)}
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

          <div className="mt-5 grid min-h-0 flex-1 gap-4 overflow-y-auto px-5 pb-5 sm:mt-8 sm:gap-6 sm:px-6 xl:grid-cols-2">
            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <div className="min-w-0 space-y-2 sm:space-y-3">
                  <Label htmlFor={field.name} className="text-sm sm:text-base">
                    Descrição
                  </Label>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Digite a descrição do plano"
                    aria-invalid={fieldState.invalid}
                    className="h-9 w-full max-w-full px-4 text-sm sm:text-base"
                  />
                  {fieldState.invalid ? (
                    <p className="text-destructive text-sm" role="alert">
                      {fieldState.error?.message}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <Controller
              control={form.control}
              name="status"
              render={({ field }) => (
                <div className="min-w-0 space-y-2 sm:space-y-3">
                  <Label htmlFor={field.name} className="text-sm sm:text-base">
                    Status
                  </Label>
                  <div className="flex h-9 items-center gap-3">
                    <Switch
                      id={field.name}
                      size="lg"
                      checked={field.value === 'Ativo'}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? 'Ativo' : 'Inativo')
                      }
                      className="data-checked:bg-estapar"
                    />
                    <span
                      className={cn(
                        'text-base font-semibold',
                        field.value === 'Ativo'
                          ? 'text-estapar-hover'
                          : 'text-gray-800'
                      )}
                    >
                      {field.value}
                    </span>
                  </div>
                </div>
              )}
            />

            <Controller
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <div className="min-w-0 space-y-2 sm:space-y-3">
                  <Label htmlFor={field.name} className="text-sm sm:text-base">
                    Tipo de Veículo
                  </Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      className="h-9 w-full max-w-full px-4"
                    >
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Carro</SelectItem>
                      <SelectItem value="motorcycle">Moto</SelectItem>
                      <SelectItem value="truck">Caminhão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              control={form.control}
              name="spots"
              render={({ field, fieldState }) => (
                <div className="min-w-0 space-y-2 sm:space-y-3">
                  <Label htmlFor={field.name} className="text-sm sm:text-base">
                    Total de Vagas
                  </Label>
                  <Input
                    {...field}
                    id={field.name}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(event) =>
                      field.onChange(getOnlyDigits(event.target.value))
                    }
                    aria-invalid={fieldState.invalid}
                    className="h-9 w-full max-w-full px-4 text-sm sm:text-base"
                  />
                  {fieldState.invalid ? (
                    <p className="text-destructive text-sm" role="alert">
                      {fieldState.error?.message}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <Controller
              control={form.control}
              name="value"
              render={({ field, fieldState }) => (
                <div className="min-w-0 space-y-2 sm:space-y-3">
                  <Label htmlFor={field.name} className="text-sm sm:text-base">
                    Valor (R$)
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    ref={field.ref}
                    inputMode="numeric"
                    value={getCurrencyInputValue(field.value)}
                    onBlur={field.onBlur}
                    onChange={(event) =>
                      field.onChange(getOnlyDigits(event.target.value))
                    }
                    aria-invalid={fieldState.invalid}
                    className="h-9 w-full max-w-full px-4 text-sm sm:text-base"
                  />
                  {fieldState.invalid ? (
                    <p className="text-destructive text-sm" role="alert">
                      {fieldState.error?.message}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <Controller
              control={form.control}
              name="cancellationValue"
              render={({ field, fieldState }) => (
                <div className="min-w-0 space-y-2 sm:space-y-3">
                  <Label htmlFor={field.name} className="text-sm sm:text-base">
                    Valor do Cancelamento (R$)
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    ref={field.ref}
                    inputMode="numeric"
                    value={getCurrencyInputValue(field.value)}
                    onBlur={field.onBlur}
                    onChange={(event) =>
                      field.onChange(getOnlyDigits(event.target.value))
                    }
                    aria-invalid={fieldState.invalid}
                    className="h-9 w-full max-w-full px-4 text-sm sm:text-base"
                  />
                  {fieldState.invalid ? (
                    <p className="text-destructive text-sm" role="alert">
                      {fieldState.error?.message}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <Controller
              control={form.control}
              name="startsAt"
              render={({ field, fieldState }) => (
                <div className="min-w-0 space-y-2 sm:space-y-3">
                  <Label htmlFor={field.name} className="text-sm sm:text-base">
                    Início da Validade
                  </Label>
                  <Input
                    {...field}
                    id={field.name}
                    type="date"
                    aria-invalid={fieldState.invalid}
                    className="h-9 w-full max-w-full min-w-0 appearance-none overflow-hidden px-4 text-left text-sm text-ellipsis sm:text-base [&::-webkit-date-and-time-value]:m-0 [&::-webkit-date-and-time-value]:min-w-0 [&::-webkit-date-and-time-value]:text-left"
                  />
                  {fieldState.invalid ? (
                    <p className="text-destructive text-sm" role="alert">
                      {fieldState.error?.message}
                    </p>
                  ) : null}
                </div>
              )}
            />

            <Controller
              control={form.control}
              name="endsAt"
              render={({ field, fieldState }) => (
                <div className="min-w-0 space-y-2 sm:space-y-3">
                  <Label htmlFor={field.name} className="text-sm sm:text-base">
                    Fim da Validade
                  </Label>
                  <Input
                    {...field}
                    id={field.name}
                    type="date"
                    aria-invalid={fieldState.invalid}
                    className="h-9 w-full max-w-full min-w-0 appearance-none overflow-hidden px-4 text-left text-sm text-ellipsis sm:text-base [&::-webkit-date-and-time-value]:m-0 [&::-webkit-date-and-time-value]:min-w-0 [&::-webkit-date-and-time-value]:text-left"
                  />
                  {fieldState.invalid ? (
                    <p className="text-destructive text-sm" role="alert">
                      {fieldState.error?.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
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
