'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { categoryDtoToHomepageCategory, fetchProductsCatalog } from '@/lib/category-cards'
import { fetchProducts } from '@/lib/product-api'
import type { MaterialSupply } from '@/lib/materials'
import { filterProductsByQuery, getProductsPageHref, type HomepageProductCategory, type Product } from '@/lib/products'
import { productBelongsToAnyCategory, productBelongsToCategory } from '@/lib/product-category'
import { sortProductsBySku } from '@/lib/product-sku'
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
  const [categories, setCategories] = useState<HomepageProductCategory[]>([])
  const [materials, setMaterials] = useState<MaterialSupply[]>([])
  const [catalogProducts, setCatalogProducts] = useState<Product[]>([])
  const [catalogReady, setCatalogReady] = useState(false)

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

  useEffect(() => {
    let cancelled = false

    fetchProducts()
      .then((products) => {
        if (!cancelled) setCatalogProducts(products)
      })
      .catch(() => {
        if (!cancelled) setCatalogProducts([])
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

  useEffect(() => {
    if (!catalogReady || categorySlug || searchQuery.trim() || sidebarCategories.length === 0) return

    if (!window.matchMedia('(max-width: 1024px)').matches) return

    const first = sidebarCategories[0]
    if (!first) return
    router.replace(getProductsPageHref(first.slug, material?.slug), { scroll: false })
  }, [catalogReady, categorySlug, searchQuery, sidebarCategories, material?.slug, router])

  const scopedCatalogProducts = useMemo(() => {
    if (!material) return catalogProducts
    return catalogProducts.filter((product) => productBelongsToAnyCategory(product, sidebarCategories))
  }, [catalogProducts, material, sidebarCategories])

  const products = useMemo(() => {
    const scoped = category
      ? scopedCatalogProducts.filter((product) => productBelongsToCategory(product, category))
      : scopedCatalogProducts

    return sortProductsBySku(filterProductsByQuery(scoped, searchQuery))
  }, [category, scopedCatalogProducts, searchQuery])

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
      catalogProducts={scopedCatalogProducts}
      products={products}
      searchQuery={searchQuery}
      onSelectCategory={onSelectCategory}
    />
  )
}
