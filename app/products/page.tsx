import type { Metadata } from 'next'
import { Suspense } from 'react'
import KvsProductsPage from './KvsProductsPage'

export const metadata: Metadata = {
  title: 'Products - KVS Metal',
  description:
    'Browse KVS Metal products — steel sheets, pipes, structural steel, roofing, TMT bars, and custom fabrication.',
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <KvsProductsPage />
    </Suspense>
  )
}
