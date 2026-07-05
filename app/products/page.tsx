import type { Metadata } from 'next'
import { Suspense } from 'react'
import KvsProductsPage from './KvsProductsPage'

export const metadata: Metadata = {
  title: 'Products | KVS Metals — Structural & Industrial Steel Dubai',
  description:
    'Browse KVS Metals steel products — coils, sheets, plates, pipes, structural sections, bars, channels, and foundation materials across grades and international standards in Dubai, UAE.',
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <KvsProductsPage />
    </Suspense>
  )
}
