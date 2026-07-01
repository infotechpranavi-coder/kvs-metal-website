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
      title: 'Product - KVS Metals',
      description: 'View product details from KVS Metals.',
    }
  }
  return {
    title: `${product.title} - KVS Metal`,
    description: product.shortDescription,
  }
}

export default function Page({ params }: Props) {
  return <ProductDetailResolver slug={params.slug} />
}
