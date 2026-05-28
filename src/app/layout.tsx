import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { QueryProvider } from '@/components/query-provider'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Portal Estapar B2B',
  description:
    'Gerencie seus serviços de estacionamento, acesse relatórios, configure credenciados e contrate planos de mensalidade em um só lugar.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">
        <QueryProvider>{children}</QueryProvider>
        <Toaster richColors theme="light" position="top-right" />
      </body>
    </html>
  )
}
