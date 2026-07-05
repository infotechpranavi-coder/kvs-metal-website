import type { Metadata } from 'next'
import { KvsLegalPage } from '@/components/KvsLegalPage'
import { termsAndConditions } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Terms & Conditions | KVS Metals',
  description:
    'Terms and conditions for using the KVS Metals website, requesting steel quotations, and engaging our structural and industrial steel supply services in Dubai, UAE.',
}

export default function TermsAndConditionsPage() {
  return <KvsLegalPage content={termsAndConditions} />
}
