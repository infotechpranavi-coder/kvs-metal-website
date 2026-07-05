import type { Metadata } from 'next'
import { Suspense } from 'react'
import KvsContactPage from './KvsContactPage'

export const metadata: Metadata = {
  title: 'Contact Us | KVS Metals — Steel Enquiries Dubai, UAE',
  description:
    'Contact KVS Metals for steel product enquiries, bulk supply quotes, and project coordination. Call, email, or send your grade, quantity, and delivery requirements.',
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <KvsContactPage />
    </Suspense>
  )
}
