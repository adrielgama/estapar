import { Users } from 'lucide-react'

type GarageMetricCardProps = {
  title: string
  value: number
  iconClassName: string
}

export function GarageMetricCard({
  title,
  value,
  iconClassName,
}: GarageMetricCardProps) {
  return (
    <div className="border-border rounded-lg border px-6 py-8 shadow-xs">
      <p className="font-semibold text-gray-500">{title}</p>
      <div className="mt-3 flex items-center gap-4">
        <Users className={`size-6 ${iconClassName}`} />
        <span className="text-3xl font-bold text-gray-950">{value}</span>
      </div>
    </div>
  )
}
