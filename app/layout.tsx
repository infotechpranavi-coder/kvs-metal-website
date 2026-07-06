import type { Metadata, Viewport } from 'next'
import { dmSans, syne } from '@/lib/fonts'
import { KVS_LOGO_SRC } from '@/components/KvsLogo'
import { SiteSettingsProvider } from '@/components/SiteSettingsProvider'
import { getSiteSettings } from '@/lib/db/site-settings'
import './globals.css'
import './uni.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'KVS Metals | Premium Steel Supplier in Dubai, UAE',
  description:
    'Build smart with KVS Metals — structural and industrial steel supply in Dubai, UAE. Coils, sheets, pipes, beams, bars, and foundation materials with speed, reliability, and ASTM · EN · JIS · BS standards.',
  keywords: [
    'steel supplier Dubai',
    'KVS Metals',
    'structural steel UAE',
    'industrial steel trading',
    'steel coils sheets pipes',
  ],
  icons: {
    icon: [{ url: KVS_LOGO_SRC, type: 'image/png' }],
    apple: KVS_LOGO_SRC,
    shortcut: KVS_LOGO_SRC,
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body className={dmSans.className} suppressHydrationWarning>
        <SiteSettingsProvider settings={settings}>{children}</SiteSettingsProvider>
      </body>
    </html>
  )
}
