import type { Metadata } from 'next'
import KvsAboutPage from './KvsAboutPage'

export const metadata: Metadata = {
  title: 'About Us - KVS Metal',
  description:
    'Learn about KVS Metal — trusted supplier of steel, pipes, sheets, and custom fabrication for construction and industry.',
}

export default function Page() {
  return <KvsAboutPage />
}
