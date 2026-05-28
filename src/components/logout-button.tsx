'use client'

import { useMutation } from '@tanstack/react-query'
import { Loader2, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { logout } from '@/lib/logout'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

export function LogoutButton({ isMobile = false }: { isMobile?: boolean }) {
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
      size={isMobile ? 'icon' : 'default'}
      className={cn(
        'text-sm text-gray-600 hover:bg-gray-100',
        isMobile ? 'size-9' : 'gap-2'
      )}
      disabled={logoutMutation.isPending}
      onClick={() => logoutMutation.mutate()}
      aria-label={logoutMutation.isPending ? 'Saindo' : 'Sair'}
    >
      {logoutMutation.isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <LogOut className="size-4" />
      )}
      {isMobile ? null : logoutMutation.isPending ? 'Saindo...' : 'Sair'}
    </Button>
  )
}
