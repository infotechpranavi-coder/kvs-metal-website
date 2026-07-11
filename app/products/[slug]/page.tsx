import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getProductBySlugForApi } from '@/lib/db/products'
import { productDtoToProduct } from '@/lib/product-api'
import KvsProductDetailPage from './KvsProductDetailPage'

export const dynamic = 'force-dynamic'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dto = await getProductBySlugForApi(params.slug).catch(() => null)
  if (!dto) {
    return {
      title: 'Product | KVS Metals',
      description:
        'View steel product details, specifications, and enquiry options from KVS Metals in Dubai, UAE.',
    }
  }
  return {
    title: `${dto.title} | KVS Metals Dubai, UAE`,
    description:
      dto.shortDescription ||
      `Supply and enquiry for ${dto.title} from KVS Metals — structural and industrial steel in Dubai, UAE.`,
  }
}

export default async function Page({ params }: Props) {
  const dto = await getProductBySlugForApi(params.slug).catch(() => null)
  if (!dto) notFound()

  return (
    <Suspense fallback={null}>
      <KvsProductDetailPage product={productDtoToProduct(dto)} />
    </Suspense>
  )
}
