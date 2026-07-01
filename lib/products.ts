export type Product = {
  id: string
  slug: string
  title: string
  price: string
  rating: string
  img: string
  images: string[]
  category: string
  badge?: string
  compareAt?: string
  shortDescription: string
  description: string
  features: string[]
  material?: string
  dimensions?: string
  sku: string
  reviewCount: number
  inStock: boolean
  stockCount?: number
  warranty?: string
  standard?: string
  thickness?: string
  isNew?: boolean
  isLimited?: boolean
  showInFooter?: boolean
}

export type Category = {
  title: string
  slug: string
  count: string
  img: string
  size: 'large' | 'medium' | 'wide'
  description: string
}

export type LimitedProduct = {
  slug: string
  title: string
  price: string
  img: string
  units: string
  description: string
}

import { kvsProductCategories } from './kvs-catalog'

const homepageProductSlugs = kvsProductCategories.flatMap((category) => category.productSlugs)

const catalog: Product[] = []

export const allProducts: Product[] = catalog

export const bestSellers: Product[] = catalog
  .filter((p) => ['Best Seller', 'Top Rated'].includes(p.badge ?? ''))
  .slice(0, 4)

export const newArrivals: Product[] = catalog.filter((p) => p.isNew).slice(0, 8)

export const limitedProducts: LimitedProduct[] = catalog
  .filter((p) => p.isLimited)
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    price: p.price,
    img: p.img,
    units: p.stockCount ? `Only ${p.stockCount} left` : 'Limited stock',
    description: p.shortDescription,
  }))

export const categories: Category[] = []

export function getProductBySlug(slug: string): Product | undefined {
  return catalog.find((p) => p.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return catalog
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit)
}

export function getProductsByCategory(category: string): Product[] {
  return catalog.filter((p) => p.category === category)
}

export function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ''))
}

export type HomepageProductCategory = {
  slug: string
  title: string
  img: string
  heroImg?: string
  description: string
  headline: string
  paragraphs: string[]
  productSlugs: string[]
}

export const homepageProductCategories: HomepageProductCategory[] = kvsProductCategories.map(
  (category) => ({
    slug: category.slug,
    title: category.title,
    img: category.img,
    heroImg: category.heroImg,
    description: category.description,
    headline: category.headline,
    paragraphs: category.paragraphs,
    productSlugs: category.productSlugs,
  }),
)

export const homepageProductRows = [
  homepageProductCategories.slice(0, 3),
  homepageProductCategories.slice(3, 6),
  homepageProductCategories.slice(6, 9),
] as const

export function getAllCatalogProducts(): Product[] {
  return catalog
}

export function getCategoryHref(category: HomepageProductCategory): string {
  return `/products?category=${category.slug}`
}

export function getProductsPageHref(categorySlug?: string, materialSlug?: string): string {
  const params = new URLSearchParams()
  if (materialSlug) params.set('material', materialSlug)
  if (categorySlug) params.set('category', categorySlug)
  const qs = params.toString()
  return qs ? `/products?${qs}` : '/products'
}

export function getProductCategoryBySlug(slug: string): HomepageProductCategory | undefined {
  return homepageProductCategories.find((category) => category.slug === slug)
}

export function getAllProductCategorySlugs(): string[] {
  return homepageProductCategories.map((category) => category.slug)
}

export function getCategoryProducts(category: HomepageProductCategory): Product[] {
  return category.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product))
}

/** Products for sidebar subnav — matches grid filtering by category title. */
export function getProductsForCategory(
  category: HomepageProductCategory,
  catalogProducts: Product[],
): Product[] {
  const byTitle = catalogProducts.filter((product) => product.category === category.title)
  if (byTitle.length > 0) {
    return byTitle.sort((a, b) => a.title.localeCompare(b.title))
  }

  return getCategoryProducts(category)
}

export function searchCatalog(query: string, limit = 8): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  return catalog
    .filter(
      (product) =>
        product.title.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q),
    )
    .slice(0, limit)
}

export function filterProductsByQuery(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase()
  if (!q) return products

  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.sku.toLowerCase().includes(q) ||
      product.shortDescription.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q),
  )
}

export function getProductCategoryForProduct(slug: string): HomepageProductCategory | undefined {
  return homepageProductCategories.find((category) => category.productSlugs.includes(slug))
}

export function getKvsProductSlugs(): string[] {
  return [...homepageProductSlugs]
}

export function getAllSlugs(): string[] {
  return catalog.map((p) => p.slug)
}

export function getHomepageProducts(): Product[] {
  return homepageProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p))
}

export function getRelatedHomepageProducts(slug: string): Product[] {
  const category = getProductCategoryForProduct(slug)
  if (category) {
    return getCategoryProducts(category).filter((product) => product.slug !== slug).slice(0, 4)
  }
  return getHomepageProducts().filter((product) => product.slug !== slug)
}
