import { ArrowRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

type NavigationCardProps = {
  icon: LucideIcon
  title: string
  description: string
  url: string
  className?: string
}

export function NavigationCard({
  icon: Icon,
  title,
  description,
  url,
  className,
}: NavigationCardProps) {
  return (
    <Link
      href={url}
      className={cn(
        'border-border group bg-background focus-visible:ring-ring/50 relative flex min-h-45 flex-col rounded-lg border p-8 shadow-xs transition-all duration-200 hover:bg-gray-50 hover:shadow-lg focus-visible:ring-3 focus-visible:outline-none',
        className
      )}
    >
      <ArrowRight className="absolute top-8 right-8 size-6 text-gray-300 transition-colors group-hover:text-gray-500" />
      <Icon className="size-11 text-estapar" strokeWidth={2.25} />
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-gray-950">{title}</h2>
        <p className="text-base leading-7 text-gray-500">{description}</p>
      </div>
    </Link>
  )
}
