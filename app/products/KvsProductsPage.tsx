'use client'

import { useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  getCategoryProducts,
  getHomepageProducts,
  getProductCategoryBySlug,
  getProductsPageHref,
} from '@/lib/products'
import { ProductCatalogView } from '@/components/ProductCatalogView'

export default function KvsProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get('category')

  const category = useMemo(
    () => (categorySlug ? getProductCategoryBySlug(categorySlug) : null),
    [categorySlug],
  )

  const products = useMemo(() => {
    if (category) return getCategoryProducts(category)
    return getHomepageProducts()
  }, [category])

  const onSelectCategory = useCallback(
    (slug: string | null) => {
      router.push(getProductsPageHref(slug ?? undefined), { scroll: false })
    },
    [router],
  )

  return (
    <ProductCatalogView
      category={category ?? null}
      products={products}
      onSelectCategory={onSelectCategory}
    />
  )
}
