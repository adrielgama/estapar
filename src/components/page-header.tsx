import type { LucideIcon } from 'lucide-react'

type PageHeaderProps = {
  icon: LucideIcon
  title: string
  description: string
}

export function PageHeader({ icon: Icon, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col">
      <div className="flex items-center gap-3">
        <Icon className="mt-1 size-10 text-estapar" />
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>
      <p className="mt-1 text-lg leading-7 text-gray-500">{description}</p>
    </div>
  )
}
