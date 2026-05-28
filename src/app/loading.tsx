import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="bg-background flex min-h-dvh items-center justify-center">
      <div className="flex items-center gap-3 text-sm font-medium text-gray-500">
        <Loader2 className="size-5 animate-spin text-estapar" />
        Carregando...
      </div>
    </div>
  )
}
