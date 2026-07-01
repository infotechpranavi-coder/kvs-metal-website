import type { Metadata } from 'next'
import KvsBrochurePage from './KvsBrochurePage'

export const metadata: Metadata = {
  title: 'Product Brochure - KVS Metals',
  description:
    'Download the KVS Metals product brochure or receive it by email. Structural and industrial steel supply in Dubai, UAE.',
}

export default function Page() {
  return <KvsBrochurePage />
}
