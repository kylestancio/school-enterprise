import Providers from '@/components/Providers'
import Headers from './Headers'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EDUKADO | admin',
  description: 'Education Enterprise App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={''}>
        <Providers>
          <Headers />
          {children}
        </Providers>
      </body>
    </html>
  )
}
