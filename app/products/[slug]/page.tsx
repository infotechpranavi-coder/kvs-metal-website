import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSlugs, getKvsProductSlugs, getProductBySlug } from '@/lib/products'
import ProductDetailPage from './ProductDetailPage'
import KvsProductDetailPage from './KvsProductDetailPage'

const kvsSlugs = new Set(getKvsProductSlugs())

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.title} - KVS Metal`,
    description: product.shortDescription,
  }
}

export default function Page({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  if (kvsSlugs.has(product.slug)) {
    return <KvsProductDetailPage product={product} />
  }
  return <ProductDetailPage product={product} />
}
