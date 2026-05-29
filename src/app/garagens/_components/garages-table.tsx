'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Garage } from '@/types/garage'
import { useQuery } from '@tanstack/react-query'
import { Eye, Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { GarageDetailsSheet } from './garage-details-sheet'
import { GaragesTableSkeleton } from './garages-table-skeleton'
import { getGarages } from './get-garages'

const FILTER_DELAY_IN_MS = 500

export function GaragesTable() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [onlyDigitalMonthly, setOnlyDigitalMonthly] = useState(true)
  const [appliedOnlyDigitalMonthly, setAppliedOnlyDigitalMonthly] =
    useState(true)
  const [isFiltering, setIsFiltering] = useState(false)
  const [selectedGarage, setSelectedGarage] = useState<Garage | null>(null)
  const didMountRef = useRef(false)

  const garagesQuery = useQuery({
    queryKey: ['garages'],
    queryFn: getGarages,
  })

  const filteredGarages = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase()

    return (garagesQuery.data ?? []).filter((garage) => {
      const matchesDigitalMonthly =
        !appliedOnlyDigitalMonthly || garage.isDigitalMonthly
      const matchesSearch =
        !normalizedSearch ||
        garage.name.toLowerCase().includes(normalizedSearch)

      return matchesDigitalMonthly && matchesSearch
    })
  }, [appliedOnlyDigitalMonthly, debouncedSearch, garagesQuery.data])

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true
      return
    }

    setIsFiltering(true)

    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search)
      setAppliedOnlyDigitalMonthly(onlyDigitalMonthly)
      setIsFiltering(false)
    }, FILTER_DELAY_IN_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [onlyDigitalMonthly, search])

  if (garagesQuery.isPending) {
    return <GaragesTableSkeleton />
  }

  return (
    <>
      <div className="space-y-5">
        <div className="border-border relative grid grid-cols-[1fr_auto] gap-4 rounded-md border p-4 lg:grid-cols-[1fr_15rem] lg:items-center">
          <label className="flex items-center gap-3 font-semibold text-gray-800">
            <Switch
              checked={onlyDigitalMonthly}
              onCheckedChange={setOnlyDigitalMonthly}
              className="data-checked:bg-estapar"
              aria-label="Filtrar mensalista digital"
              size="lg"
            />
            Mensalista Digital
          </label>
          <span
            className="self-center text-sm font-medium text-gray-500 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
            aria-live="polite"
          >
            {isFiltering ? 'Buscando...' : `${filteredGarages.length} registros`}
          </span>
          <div className="relative col-span-2 lg:col-span-1 lg:justify-self-end">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-400" />
            <Input
              value={search}
              aria-label="Buscar garagem por nome"
              placeholder="Buscar por nome"
              className="h-11 bg-transparent! pl-10 shadow-none"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div
          className="border-border overflow-hidden rounded-md border"
          aria-busy={isFiltering}
        >
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-12 px-4 text-gray-500">
                  Código
                </TableHead>
                <TableHead className="h-12 px-4 text-gray-500">Nome</TableHead>
                <TableHead className="h-12 px-4 text-gray-500">
                  Endereço
                </TableHead>
                <TableHead className="h-12 px-4 text-gray-500">
                  Cidade/UF
                </TableHead>
                <TableHead className="h-12 px-4 text-gray-500">
                  Regional
                </TableHead>
                <TableHead className="h-12 px-4 text-right text-gray-500">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFiltering
                ? Array.from({ length: 6 }).map((_, rowIndex) => (
                    <TableRow key={rowIndex} className="hover:bg-transparent">
                      {Array.from({ length: 6 }).map((__, cellIndex) => (
                        <TableCell key={cellIndex} className="h-14 px-4">
                          <div className="h-5 animate-pulse rounded bg-gray-100" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : filteredGarages.map((garage) => (
                    <TableRow
                      key={garage.code}
                      className="hover:bg-transparent"
                    >
                      <TableCell className="h-14 px-4 font-medium text-gray-700">
                        {garage.code}
                      </TableCell>
                      <TableCell className="h-14 px-4 font-medium text-gray-700">
                        {garage.name}
                      </TableCell>
                      <TableCell className="h-14 px-4 font-medium text-gray-700">
                        {garage.address}
                      </TableCell>
                      <TableCell className="h-14 px-4 font-medium text-gray-700">
                        {garage.cityState}
                      </TableCell>
                      <TableCell className="h-14 px-4 font-medium text-gray-700">
                        {garage.regional}
                      </TableCell>
                      <TableCell className="h-14 px-4 text-right text-gray-700">
                        <button
                          type="button"
                          className="focus-visible:ring-ring/50 inline-flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-100 focus-visible:ring-3 focus-visible:outline-none"
                          aria-label={`Visualizar garagem ${garage.name}`}
                          onClick={() => setSelectedGarage(garage)}
                        >
                          <Eye className="size-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {!isFiltering && filteredGarages.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              Nenhuma garagem encontrada.
            </div>
          ) : null}
        </div>
      </div>

      <GarageDetailsSheet
        garage={selectedGarage}
        open={Boolean(selectedGarage)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedGarage(null)
          }
        }}
      />
    </>
  )
}
