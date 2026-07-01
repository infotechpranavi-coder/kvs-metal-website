import {
  getCategoryProducts,
  homepageProductCategories,
  type HomepageProductCategory,
  type Product,
} from './products'

export type MaterialSupply = {
  slug: string
  title: string
  description: string
  img: string
  categorySlugs: string[]
}

export const materialSupplies: MaterialSupply[] = []

export function getMaterialBySlug(slug: string): MaterialSupply | undefined {
  return materialSupplies.find((material) => material.slug === slug)
}

export function getMaterialHref(slug: string): string {
  return `/products?material=${slug}`
}

export function getCategoriesForMaterial(slug: string): HomepageProductCategory[] {
  const material = getMaterialBySlug(slug)
  if (!material) return []

  return homepageProductCategories.filter((category) =>
    material.categorySlugs.includes(category.slug),
  )
}

export function getProductsForMaterial(slug: string): Product[] {
  const categories = getCategoriesForMaterial(slug)
  return categories.flatMap((category) => getCategoryProducts(category))
}

export function categoryBelongsToMaterial(categorySlug: string, materialSlug: string): boolean {
  const material = getMaterialBySlug(materialSlug)
  if (!material) return false
  return material.categorySlugs.includes(categorySlug)
}

export function getMaterialProducts(materialSlug: string): Product[] {
  return getProductsForMaterial(materialSlug)
}
