import '@/globals.css'

import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'Progress Feed',
  description: 'Progress Feed',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Providers>
      <html lang="pt-BR">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </Providers>
  )
}
