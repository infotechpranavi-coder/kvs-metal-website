import type { Metadata } from 'next'
import { KvsLegalPage } from '@/components/KvsLegalPage'
import { privacyPolicy } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Privacy Policy - KVS Metals',
  description: 'Privacy Policy for KVS Metals website and steel supply services in Dubai, UAE.',
}

export default function PrivacyPolicyPage() {
  return <KvsLegalPage content={privacyPolicy} />
}
