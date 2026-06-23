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
  if (!sector) return { title: 'Sector Not Found' }
  return {
    title: `${sector.name} - KVS Metal`,
    description: sector.paragraphs[0],
  }
}

export default function Page({ params }: Props) {
  const sector = getSectorBySlug(params.slug)
  if (!sector) notFound()
  return <SectorDetailPage sector={sector} />
}
