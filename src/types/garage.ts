export type Garage = {
  code: string
  name: string
  address: string
  fullAddress: string
  cityState: string
  regional: string
  branch: string
  isDigitalMonthly: boolean
  totalSpots: number
  occupiedSpots: number
  availableSpots: number
  plans: GaragePlan[]
  discounts: GarageDiscount[]
  settings: GarageSettings
}

export type GaragePlan = {
  id: string
  description: string
  value: string
  spots: number
  occupied: number
  available: number
  status: 'Ativo' | 'Inativo'
}

export type GarageDiscount = {
  id: string
  description: string
  percentage: number
  status: 'Ativo' | 'Inativo'
}

export type GarageSettings = {
  allowsOvernight: boolean
  requiresApproval: boolean
  billingDay: number
}
