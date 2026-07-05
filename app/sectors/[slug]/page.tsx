import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSectorSlugs, getSectorBySlug } from '@/lib/sectors'
import SectorDetailPage from './SectorDetailPage'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return getAllSectorSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const sector = getSectorBySlug(params.slug)
  if (!sector) return { title: 'Sector Not Found | KVS Metals' }
  return {
    title: `${sector.name} Steel Supply | KVS Metals Dubai, UAE`,
    description: `${sector.tagline}. KVS Metals supplies structural and industrial steel for ${sector.name.toLowerCase()} projects across Dubai and the UAE.`,
  }
}

export default function Page({ params }: Props) {
  const sector = getSectorBySlug(params.slug)
  if (!sector) notFound()
  return <SectorDetailPage sector={sector} />
}
