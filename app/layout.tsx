import type { Metadata } from 'next'
import './globals.css'
import './uni.css'

export const metadata: Metadata = {
  title: 'KVS Metal - Premium Metal Products & Steel Solutions',
  description: 'KVS Metal supplies high-quality steel sheets, pipes, structural metal, and custom fabrication for construction and industrial projects.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
