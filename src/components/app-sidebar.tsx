'use client'

import { Building2, Car, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Logo, ShortLogo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { SheetClose } from '@/components/ui/sheet'

const navigationItems = [
  {
    title: 'Garagens',
    href: '/garagens',
    icon: Building2,
  },
  {
    title: 'Mensalistas',
    href: '/mensalistas',
    icon: Car,
  },
]

type AppSidebarProps = {
  isCollapsed?: boolean
  isMobile?: boolean
  onToggle?: () => void
}

export function AppSidebar({
  isCollapsed = false,
  isMobile = false,
  onToggle,
}: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'bg-background relative flex h-full flex-col transition-[width] duration-300',
        isMobile
          ? 'w-full'
          : isCollapsed
            ? 'border-border w-22 border-r'
            : 'border-border w-60 border-r'
      )}
    >
      <div
        className={cn(
          'border-border flex items-center border-b py-8',
          isCollapsed && !isMobile ? 'justify-center px-3' : 'px-9'
        )}
      >
        <Link
          href="/"
          className="focus-visible:ring-ring/50 rounded-sm transition-colors duration-200 hover:opacity-80 focus-visible:ring-3 focus-visible:outline-none"
          aria-label="Ir para início"
        >
          {isCollapsed && !isMobile ? (
            <ShortLogo className="size-8" />
          ) : (
            <Logo className="h-8 w-auto" />
          )}
        </Link>
      </div>

      {!isMobile ? (
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          className="bg-background! absolute top-20 -right-4 z-10 size-8 transform rounded-full"
          aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          onClick={onToggle}
        >
          {isCollapsed ? (
            <ChevronRight className="size-5" />
          ) : (
            <ChevronLeft className="size-5" />
          )}
        </Button>
      ) : null}

      <nav
        className={cn(
          'flex flex-col py-9',
          isCollapsed && !isMobile ? 'items-center px-3' : 'px-0'
        )}
        aria-label="Navegação principal"
      >
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const link = (
            <Link
              href={item.href}
              className={cn(
                'focus-visible:ring-ring/50 flex h-12 items-center text-sm text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-950 focus-visible:ring-3 focus-visible:outline-none',
                isCollapsed && !isMobile
                  ? 'w-12 justify-center'
                  : 'w-full gap-4 px-4',
                isActive && 'bg-gray-100 font-semibold text-gray-950'
              )}
              aria-current={isActive ? 'page' : undefined}
              title={isCollapsed && !isMobile ? item.title : undefined}
            >
              <Icon className="size-5.5 shrink-0" />
              {isCollapsed && !isMobile ? null : (
                <span className="truncate">{item.title}</span>
              )}
            </Link>
          )

          if (isMobile) {
            return (
              <SheetClose key={item.href} asChild>
                {link}
              </SheetClose>
            )
          }

          return <div key={item.href}>{link}</div>
        })}
      </nav>
    </aside>
  )
}
