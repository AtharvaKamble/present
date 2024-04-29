import { Toaster } from '@/shadcn/ui/toaster'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Present',
  description: 'Create beautiful presentations effortlessly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'inter.className'}>{children}</body>
    </html>
  )
}
