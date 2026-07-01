import type { Metadata } from 'next'
import KvsCareersPage from './KvsCareersPage'

export const metadata: Metadata = {
  title: 'Careers - KVS Metals',
  description:
    'Explore career opportunities at KVS Metals. Submit your CV and join a workplace built on professionalism, commitment, and integrity.',
}

export default function Page() {
  return <KvsCareersPage />
}
