'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2, Lock, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod/v3'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { login } from './login'

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Informe seu usuário.')
    .email('Informe um usuário válido.'),
  password: z.string().min(1, 'Informe sua senha.'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      sessionStorage.setItem('estapar:user', JSON.stringify(user))
      router.replace('/')
      router.refresh()
    },
    onError: (error) => {
      form.setError('root', {
        message: error.message,
      })
    },
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    form.clearErrors('root')
    loginMutation.mutate(values)
  }

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <div className="space-y-4" data-invalid={fieldState.invalid}>
            <Label htmlFor={field.name} className="font-semibold">
              Usuário
            </Label>
            <div className="relative">
              <User className="text-muted-foreground pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2" />
              <Input
                {...field}
                id={field.name}
                type="email"
                autoComplete="username"
                placeholder="Digite seu usuário"
                aria-invalid={fieldState.invalid}
                className="bg-background! border-2 py-6 pl-14 shadow-none placeholder:text-neutral-400 focus-visible:ring-0"
              />
            </div>
            {fieldState.invalid ? (
              <p className="text-destructive text-xs font-medium" role="alert">
                {fieldState.error?.message}
              </p>
            ) : null}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <div className="space-y-4" data-invalid={fieldState.invalid}>
            <Label htmlFor={field.name} className="font-semibold">
              Senha
            </Label>
            <div className="relative">
              <Lock className="text-muted-foreground pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2" />
              <Input
                {...field}
                id={field.name}
                type="password"
                autoComplete="current-password"
                placeholder="Digite sua senha"
                aria-invalid={fieldState.invalid}
                className="bg-background! border-2 py-6 pl-14 shadow-none placeholder:text-neutral-400 focus-visible:ring-0"
              />
            </div>
            {fieldState.invalid ? (
              <p className="text-destructive text-xs font-medium" role="alert">
                {fieldState.error?.message}
              </p>
            ) : null}
          </div>
        )}
      />

      {form.formState.errors.root?.message ? (
        <p
          className="text-destructive flex flex-col text-xs font-medium"
          role="alert"
        >
          {form.formState.errors.root.message}
          <span className="text-muted-foreground/70 mt-4">
            E-mail: roberto@email.com
          </span>
          <span className="text-muted-foreground/70">Senha: 12345</span>
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        variant="estapar"
        className="w-full py-6 font-semibold"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Entrando...
          </>
        ) : (
          'Entrar'
        )}
      </Button>
    </form>
  )
}
