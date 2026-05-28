import { z } from 'zod/v3'

const garagePlanFormFieldsSchema = z
  .object({
    description: z.string().trim().min(1, 'Informe a descrição do plano.'),
    status: z.enum(['Ativo', 'Inativo']),
    vehicleType: z.enum(['car', 'motorcycle', 'truck']),
    spots: z
      .string()
      .regex(/^\d+$/, 'Informe apenas números.')
      .refine(
        (value) => Number(value) > 0,
        'Informe um número maior que zero.'
      ),
    value: z
      .string()
      .regex(/^\d+$/, 'Informe apenas números.')
      .refine((value) => Number(value) > 0, 'Informe um valor maior que zero.'),
    cancellationValue: z.string().regex(/^\d+$/, 'Informe apenas números.'),
    startsAt: z.string().min(1, 'Informe o início da validade.'),
    endsAt: z.string(),
  })

export const garagePlanFormSchema = garagePlanFormFieldsSchema
  .refine((values) => !values.endsAt || values.endsAt >= values.startsAt, {
    path: ['endsAt'],
    message: 'A data final deve ser posterior ao início.',
  })

export const saveGaragePlanSchema = garagePlanFormFieldsSchema
  .extend({
    id: z.string().optional(),
    occupied: z.number().int().min(0),
  })
  .refine((values) => !values.endsAt || values.endsAt >= values.startsAt)

export type GaragePlanFormValues = z.infer<typeof garagePlanFormSchema>
