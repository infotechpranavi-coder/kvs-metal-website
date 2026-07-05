import type { Metadata } from 'next'
import { KvsLegalPage } from '@/components/KvsLegalPage'
import { privacyPolicy } from '@/lib/legal'

export const metadata: Metadata = {
  title: 'Privacy Policy | KVS Metals',
  description:
    'Read how KVS Metals collects, uses, and protects your information when you enquire about steel products or use our website and services in Dubai, UAE.',
}

export default function PrivacyPolicyPage() {
  return <KvsLegalPage content={privacyPolicy} />
}
