import type { Metadata } from 'next'
import './globals.css'
import './uni.css'

export const metadata: Metadata = {
  title: 'KVS Metals - Premium Steel Supplier in Dubai, UAE',
  description:
    'KVS Metals supplies structural and industrial steel materials in Dubai, UAE — coils, sheets, pipes, structural sections, bars, and foundation materials.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
