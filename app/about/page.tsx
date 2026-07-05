import type { Metadata } from 'next'
import KvsAboutPage from './KvsAboutPage'

export const metadata: Metadata = {
  title: 'About Us | KVS Metals — Steel Supplier in Dubai, UAE',
  description:
    'Building strength and delivering trust — KVS Metals supplies structural and industrial steel across grades and specifications for construction, fabrication, marine, and industrial projects in Dubai, UAE.',
}

export default function Page() {
  return <KvsAboutPage />
}
