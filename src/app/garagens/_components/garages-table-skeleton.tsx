export function GaragesTableSkeleton() {
  return (
    <div className="space-y-5">
      <div className="border-border grid gap-4 rounded-lg border p-4 md:grid-cols-[1fr_auto_15rem] md:items-center">
        <div className="h-8 w-48 animate-pulse rounded-md bg-gray-100" />
        <div className="h-5 w-24 animate-pulse rounded-md bg-gray-100 md:justify-self-center" />
        <div className="h-10 w-full animate-pulse rounded-md bg-gray-100" />
      </div>
      <div className="border-border overflow-hidden rounded-lg border">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="border-border grid grid-cols-5 gap-6 border-b p-4 last:border-b-0"
          >
            <div className="h-5 animate-pulse rounded bg-gray-100" />
            <div className="h-5 animate-pulse rounded bg-gray-100" />
            <div className="h-5 animate-pulse rounded bg-gray-100" />
            <div className="h-5 animate-pulse rounded bg-gray-100" />
            <div className="h-5 animate-pulse rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  )
}
