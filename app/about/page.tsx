import type { Metadata } from 'next'
import KvsAboutPage from './KvsAboutPage'

export const metadata: Metadata = {
  title: 'About Us - KVS Metals',
  description:
    'KVS Metals is a trusted steel supplier and steel trading company in Dubai, UAE — building strength and delivering trust across construction, fabrication, and industrial sectors.',
}

export default function Page() {
  return <KvsAboutPage />
}
