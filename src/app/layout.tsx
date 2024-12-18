import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

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
      <html lang="pt-BR">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
