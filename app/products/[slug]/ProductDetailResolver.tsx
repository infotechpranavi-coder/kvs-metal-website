'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { getCustomProductBySlug, subscribeDashboardStore } from '@/lib/dashboard-store'
import { getKvsProductSlugs, getProductBySlug, type Product } from '@/lib/products'
import KvsProductDetailPage from './KvsProductDetailPage'
import ProductDetailPage from './ProductDetailPage'

const kvsSlugs = new Set(getKvsProductSlugs())

export function ProductDetailResolver({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined)

  useEffect(() => {
    const resolve = () => {
      const catalogProduct = getProductBySlug(slug)
      if (catalogProduct) {
        setProduct(catalogProduct)
        return
      }

      const customProduct = getCustomProductBySlug(slug)
      setProduct(customProduct ?? null)
    }

    resolve()
    return subscribeDashboardStore(resolve)
  }, [slug])

  if (product === undefined) return null
  if (!product) notFound()

  if (kvsSlugs.has(product.slug) || product.id.startsWith('custom-')) {
    return <KvsProductDetailPage product={product} />
  }

  return <ProductDetailPage product={product} />
}
