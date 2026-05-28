'use client'

import { useState } from 'react'
import { Menu, User } from 'lucide-react'
import Link from 'next/link'

import { AppSidebar } from '@/components/app-sidebar'
import { Logo } from '@/components/logo'
import { LogoutButton } from '@/components/logout-button'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type AuthenticatedShellProps = {
  children: React.ReactNode
  userName: string
}

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'estapar:sidebar-collapsed'

export function AuthenticatedShell({
  children,
  userName,
}: AuthenticatedShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return (
      window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true'
    )
  })

  function handleSidebarToggle() {
    setIsCollapsed((currentIsCollapsed) => {
      const nextIsCollapsed = !currentIsCollapsed

      window.localStorage.setItem(
        SIDEBAR_COLLAPSED_STORAGE_KEY,
        String(nextIsCollapsed)
      )

      return nextIsCollapsed
    })
  }

  return (
    <div className="bg-background min-h-dvh md:flex">
      <div className="hidden md:flex md:min-h-dvh">
        <AppSidebar
          isCollapsed={isCollapsed}
          onToggle={handleSidebarToggle}
        />
      </div>

      <div className="flex min-h-dvh flex-1 flex-col md:min-w-0">
        <header className="border-border relative flex h-16 items-center justify-between border-b px-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-80 max-w-[85vw] p-0"
              showCloseButton={false}
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Menu principal</SheetTitle>
              </SheetHeader>
              <AppSidebar isMobile />
            </SheetContent>
          </Sheet>
          <Link
            href="/"
            className="focus-visible:ring-ring/50 absolute left-1/2 flex w-48 -translate-x-1/2 items-center justify-center rounded-sm focus-visible:ring-3 focus-visible:outline-none"
            aria-label="Ir para início"
          >
            <Logo className="h-7 w-full" />
          </Link>
          <LogoutButton isMobile />
        </header>

        <header className="hidden h-24 shrink-0 items-center justify-end gap-6 px-8 md:flex">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <User className="size-5" />
            <span>{userName}</span>
          </div>
          <LogoutButton />
        </header>

        <main className="bg-background container mx-auto flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
