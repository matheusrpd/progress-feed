import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { TanstackQueryProvider } from './query-client-provider'

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
    <ClerkProvider>
      <TanstackQueryProvider>
        <html lang="pt-BR">
          <body className="antialiased">
            {children}
          </body>
        </html>
      </TanstackQueryProvider>
    </ClerkProvider>
  )
}
