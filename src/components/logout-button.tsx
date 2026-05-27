'use client'

import { useMutation } from '@tanstack/react-query'
import { Loader2, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { logout } from '@/lib/utils'

import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const router = useRouter()

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      sessionStorage.removeItem('estapar:user')
      router.replace('/login')
      router.refresh()
    },
  })

  return (
    <Button
      type="button"
      variant="ghost"
      className="gap-2 text-sm text-gray-600 hover:bg-gray-100"
      disabled={logoutMutation.isPending}
      onClick={() => logoutMutation.mutate()}
    >
      {logoutMutation.isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <LogOut className="size-4" />
      )}
      {logoutMutation.isPending ? 'Saindo...' : 'Sair'}
    </Button>
  )
}
