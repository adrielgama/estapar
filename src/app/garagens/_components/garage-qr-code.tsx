import type { Garage } from '@/types/garage'
import { QRCodeSVG } from 'qrcode.react'

type GarageQrCodeProps = {
  garage: Garage
}

export function GarageQrCode({ garage }: GarageQrCodeProps) {
  const qrCodeValue = JSON.stringify({
    code: garage.code,
    name: garage.name,
    address: garage.fullAddress,
  })

  return (
    <QRCodeSVG
      value={qrCodeValue}
      size={112}
      level="M"
      marginSize={1}
      className="size-28"
      aria-label={`QRCode da garagem ${garage.code}`}
      role="img"
    />
  )
}
