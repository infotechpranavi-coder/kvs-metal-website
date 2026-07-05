import type { Metadata } from 'next'
import KvsCareersPage from './KvsCareersPage'

export const metadata: Metadata = {
  title: 'Careers | KVS Metals — Join Our Steel Trading Team',
  description:
    'Explore career opportunities at KVS Metals in Dubai, UAE. Submit your CV to join a steel trading team built on professionalism, commitment, and integrity.',
}

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href="/images/career.avif" type="image/avif" />
      <KvsCareersPage />
    </>
  )
}
