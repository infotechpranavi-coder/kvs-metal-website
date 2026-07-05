import type { Metadata } from 'next'
import { getAllSlugs, getProductBySlug } from '@/lib/products'
import { ProductDetailResolver } from './ProductDetailResolver'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) {
    return {
      title: 'Product | KVS Metals',
      description: 'View steel product details, specifications, and enquiry options from KVS Metals in Dubai, UAE.',
    }
  }
  return {
    title: `${product.title} | KVS Metals Dubai, UAE`,
    description:
      product.shortDescription ||
      `Supply and enquiry for ${product.title} from KVS Metals — structural and industrial steel in Dubai, UAE.`,
  }
}

export default function Page({ params }: Props) {
  return <ProductDetailResolver slug={params.slug} />
}
