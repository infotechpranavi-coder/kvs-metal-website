import type { Metadata } from 'next'
import KvsBrochurePage from './KvsBrochurePage'

export const metadata: Metadata = {
  title: 'Product Brochure | KVS Metals — Download Steel Catalog',
  description:
    'Download the KVS Metals product brochure with specifications, grades, dimensions, and material standards for construction, fabrication, marine, and industrial steel requirements in Dubai, UAE.',
}

export default function Page() {
  return <KvsBrochurePage />
}
