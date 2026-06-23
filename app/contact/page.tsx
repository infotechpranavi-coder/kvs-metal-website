import type { Metadata } from 'next'
import { Suspense } from 'react'
import KvsContactPage from './KvsContactPage'

export const metadata: Metadata = {
  title: 'Contact Us - KVS Metal',
  description:
    'Contact KVS Metal for steel product enquiries, bulk supply, and custom fabrication quotes.',
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <KvsContactPage />
    </Suspense>
  )
}
