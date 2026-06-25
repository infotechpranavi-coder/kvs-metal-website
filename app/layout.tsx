import type { Metadata } from 'next'
import { dmSans, syne } from '@/lib/fonts'
import { KVS_LOGO_SRC } from '@/components/KvsLogo'
import './globals.css'
import './uni.css'

export const metadata: Metadata = {
  title: 'KVS Metals - Premium Steel Supplier in Dubai, UAE',
  description:
    'KVS Metals supplies structural and industrial steel materials in Dubai, UAE — coils, sheets, pipes, structural sections, bars, and foundation materials.',
  icons: {
    icon: [{ url: KVS_LOGO_SRC, type: 'image/png' }],
    apple: KVS_LOGO_SRC,
    shortcut: KVS_LOGO_SRC,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body className={dmSans.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
