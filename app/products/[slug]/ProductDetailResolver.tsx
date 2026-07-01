'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { fetchProductBySlug } from '@/lib/product-api'
import type { Product } from '@/lib/products'
import KvsProductDetailPage from './KvsProductDetailPage'

export function ProductDetailResolver({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false

    fetchProductBySlug(slug)
      .then((resolved) => {
        if (!cancelled) setProduct(resolved)
      })
      .catch(() => {
        if (!cancelled) setProduct(null)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  if (product === undefined) return null
  if (!product) notFound()

  return <KvsProductDetailPage product={product} />
}
