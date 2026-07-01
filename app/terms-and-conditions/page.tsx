import type { Metadata } from 'next'
import { KvsLegalPage } from '@/components/KvsLegalPage'
import { termsAndConditions } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Terms & Conditions - KVS Metals',
  description: 'Terms and Conditions for using the KVS Metals website and services.',
}

export default function TermsAndConditionsPage() {
  return <KvsLegalPage content={termsAndConditions} />
}
