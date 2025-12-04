import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Buffer Optimizer Playground',
  description: 'Describe your system. We\'ll simulate it for you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

