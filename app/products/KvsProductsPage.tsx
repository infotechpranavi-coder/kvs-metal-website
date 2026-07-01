'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { categoryDtoToHomepageCategory, fetchProductsCatalog } from '@/lib/category-cards'
import { mergeCatalogWithCustomProducts, subscribeDashboardStore } from '@/lib/dashboard-store'
import type { MaterialSupply } from '@/lib/materials'
import {
  filterProductsByQuery,
  getProductsPageHref,
  type HomepageProductCategory,
} from '@/lib/products'
import { ProductCatalogView } from '@/components/ProductCatalogView'

function materialDtoToSupply(material: {
  slug: string
  title: string
  description: string
  img: string
  categorySlugs: string[]
}): MaterialSupply {
  return {
    slug: material.slug,
    title: material.title,
    description: material.description,
    img: material.img,
    categorySlugs: material.categorySlugs,
  }
}

function categoryBelongsToMaterial(categorySlug: string, material: MaterialSupply) {
  return material.categorySlugs.includes(categorySlug)
}

export default function KvsProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const materialSlug = searchParams.get('material')
  const categorySlug = searchParams.get('category')
  const searchQuery = searchParams.get('q') ?? ''
  const [customVersion, setCustomVersion] = useState(0)
  const [categories, setCategories] = useState<HomepageProductCategory[]>([])
  const [materials, setMaterials] = useState<MaterialSupply[]>([])
  const [catalogReady, setCatalogReady] = useState(false)

  useEffect(() => subscribeDashboardStore(() => setCustomVersion((value) => value + 1)), [])

  useEffect(() => {
    let cancelled = false

    fetchProductsCatalog()
      .then(({ categories: nextCategories, materials: nextMaterials }) => {
        if (cancelled) return
        setCategories(nextCategories.map(categoryDtoToHomepageCategory))
        setMaterials(nextMaterials.map(materialDtoToSupply))
      })
      .catch(() => {
        if (!cancelled) {
          setCategories([])
          setMaterials([])
        }
      })
      .finally(() => {
        if (!cancelled) setCatalogReady(true)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const material = useMemo(
    () => (materialSlug ? materials.find((item) => item.slug === materialSlug) ?? null : null),
    [materialSlug, materials],
  )

  const category = useMemo(() => {
    if (!categorySlug) return null
    const match = categories.find((item) => item.slug === categorySlug)
    if (!match) return null
    if (material && !categoryBelongsToMaterial(match.slug, material)) return null
    return match
  }, [categorySlug, material, categories])

  const sidebarCategories = useMemo(() => {
    if (material) {
      return categories.filter((item) => categoryBelongsToMaterial(item.slug, material))
    }
    return categories
  }, [material, categories])

  const catalogProducts = useMemo(() => {
    const mergeOptions = material
      ? { categoryTitles: sidebarCategories.map((item) => item.title) }
      : undefined

    return mergeCatalogWithCustomProducts([], mergeOptions)
  }, [material, sidebarCategories, customVersion])

  const products = useMemo(() => {
    const scoped = category
      ? catalogProducts.filter((product) => product.category === category.title)
      : catalogProducts

    return filterProductsByQuery(scoped, searchQuery)
  }, [category, catalogProducts, searchQuery])

  const onSelectCategory = useCallback(
    (slug: string | null) => {
      router.push(getProductsPageHref(slug ?? undefined, material?.slug), { scroll: false })
    },
    [material?.slug, router],
  )

  return (
    <ProductCatalogView
      loading={!catalogReady}
      category={category ?? null}
      material={material ?? null}
      sidebarCategories={sidebarCategories}
      catalogProducts={catalogProducts}
      products={products}
      searchQuery={searchQuery}
      onSelectCategory={onSelectCategory}
    />
  )
}
