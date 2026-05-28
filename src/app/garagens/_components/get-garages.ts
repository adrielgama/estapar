import type { Garage } from '@/types/garage'

type GaragesResponse = {
  garages: Garage[]
}

export async function getGarages() {
  const response = await fetch('/api/garages')

  if (!response.ok) {
    throw new Error('Não foi possível carregar as garagens.')
  }

  const data = (await response.json()) as GaragesResponse

  return data.garages
}
