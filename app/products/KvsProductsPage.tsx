'use client'

import { useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  filterProductsByQuery,
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
  const searchQuery = searchParams.get('q') ?? ''

  const category = useMemo(
    () => (categorySlug ? getProductCategoryBySlug(categorySlug) : null),
    [categorySlug],
  )

  const products = useMemo(() => {
    const base = category ? getCategoryProducts(category) : getHomepageProducts()
    return filterProductsByQuery(base, searchQuery)
  }, [category, searchQuery])

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
      searchQuery={searchQuery}
      onSelectCategory={onSelectCategory}
    />
  )
}
