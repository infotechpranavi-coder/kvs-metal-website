export type Product = {
  id: string
  slug: string
  title: string
  price: string
  rating: string
  img: string
  images: string[]
  category: string
  categoryId?: string | null
  materialId?: string | null
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
  schedule?: string
  thickness?: string
  colors?: string
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
import { productBelongsToCategory } from './product-category'
import { sortProductsBySku } from './product-sku'

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
  id?: string
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

export function getProductDetailHref(
  productSlug: string,
  options?: { categorySlug?: string; materialSlug?: string },
): string {
  const params = new URLSearchParams()
  if (options?.categorySlug) params.set('category', options.categorySlug)
  if (options?.materialSlug) params.set('material', options.materialSlug)
  const qs = params.toString()
  return qs ? `/products/${productSlug}?${qs}` : `/products/${productSlug}`
}

export function resolveProductCategorySlug(
  product: Pick<Product, 'slug' | 'category' | 'categoryId'>,
  categories: Array<Pick<HomepageProductCategory, 'id' | 'slug' | 'title'>> = homepageProductCategories,
): string | undefined {
  if (product.categoryId) {
    const byId = categories.find((item) => item.id === product.categoryId)
    if (byId) return byId.slug
  }

  const fromCatalog = getProductCategoryForProduct(product.slug)
  if (fromCatalog) return fromCatalog.slug

  return categories.find((item) => item.title === product.category)?.slug
}

export function getProductDetailBackHref(options: {
  categorySlug?: string | null
  materialSlug?: string | null
  product: Pick<Product, 'slug' | 'category'>
}): string {
  const categorySlug = options.categorySlug || resolveProductCategorySlug(options.product)
  if (categorySlug) {
    return getProductsPageHref(categorySlug, options.materialSlug ?? undefined)
  }
  return '/products'
}

export function getProductCategoryBySlug(slug: string): HomepageProductCategory | undefined {
  return homepageProductCategories.find((category) => category.slug === slug)
}

export function getAllProductCategorySlugs(): string[] {
  return homepageProductCategories.map((category) => category.slug)
}

export function getCategoryProducts(category: HomepageProductCategory): Product[] {
  return sortProductsBySku(
    category.productSlugs
      .map((slug) => getProductBySlug(slug))
      .filter((product): product is Product => Boolean(product)),
  )
}

/** Products for sidebar subnav — matches grid filtering by category id/title. */
export function getProductsForCategory(
  category: HomepageProductCategory,
  catalogProducts: Product[],
): Product[] {
  const matched = catalogProducts.filter((product) => productBelongsToCategory(product, category))
  if (matched.length > 0) {
    return sortProductsBySku(matched)
  }

  return getCategoryProducts(category)
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getSearchTokens(value: string): string[] {
  return normalizeSearchText(value)
    .split(' ')
    .filter((token) => token.length > 0)
}

function getEditDistance(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  const dp = Array.from({ length: a.length + 1 }, (_, index) => new Array<number>(b.length + 1).fill(0))

  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      )
    }
  }

  return dp[a.length][b.length]
}

function tokenMatches(queryToken: string, candidateToken: string): boolean {
  if (!queryToken || !candidateToken) return false
  if (candidateToken.includes(queryToken) || queryToken.includes(candidateToken)) return true
  if (queryToken.length < 4 || candidateToken.length < 4) return false
  return getEditDistance(queryToken, candidateToken) <= 1
}

function scoreSearchMatch(query: string, fields: string[]): number {
  const normalizedQuery = normalizeSearchText(query)
  if (!normalizedQuery) return 0

  const normalizedFields = fields.map(normalizeSearchText).filter(Boolean)
  const joined = normalizedFields.join(' ')

  let score = 0

  if (joined.includes(normalizedQuery)) {
    score += normalizedQuery.length >= 5 ? 120 : 90
  }

  const queryTokens = getSearchTokens(normalizedQuery)
  if (queryTokens.length === 0) return score

  const fieldTokens = normalizedFields.flatMap(getSearchTokens)

  for (const token of queryTokens) {
    if (fieldTokens.some((candidate) => tokenMatches(token, candidate))) {
      score += 24
    }
  }

  for (const field of normalizedFields) {
    if (field.startsWith(normalizedQuery)) score += 30
  }

  return score
}

export function searchCatalog(query: string, limit = 8): Product[] {
  const q = query.trim()
  if (!q) return []

  return catalog
    .map((product) => ({
      product,
      score: scoreSearchMatch(q, [
        product.title,
        product.category,
        product.sku,
        product.shortDescription,
        product.description,
        product.material ?? '',
        product.dimensions ?? '',
        product.standard ?? '',
      ]),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.product.title.localeCompare(b.product.title))
    .slice(0, limit)
    .map((entry) => entry.product)
}

export function filterProductsByQuery(products: Product[], query: string): Product[] {
  const q = query.trim()
  if (!q) return products

  return products
    .map((product) => ({
      product,
      score: scoreSearchMatch(q, [
        product.title,
        product.category,
        product.sku,
        product.shortDescription,
        product.description,
        product.material ?? '',
        product.dimensions ?? '',
        product.standard ?? '',
      ]),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.product.title.localeCompare(b.product.title))
    .map((entry) => entry.product)
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
    return sortProductsBySku(getCategoryProducts(category).filter((product) => product.slug !== slug)).slice(
      0,
      4,
    )
  }
  return sortProductsBySku(getHomepageProducts().filter((product) => product.slug !== slug)).slice(0, 4)
}

const PRODUCT_TEXT_ACRONYMS = [
  'KVS',
  'HR',
  'CR',
  'UAE',
  'EPC',
  'JIS',
  'ASTM',
  'EN',
  'BS',
  'API',
  'IS',
  'DIN',
  'SAE',
  'SS',
  'MS',
] as const

export function toReadableProductText(text: string): string {
  const trimmed = text.trim()
  if (!trimmed) return trimmed

  const lettersOnly = trimmed.replace(/[^A-Za-z]/g, '')
  const isAllCaps = lettersOnly.length > 3 && trimmed === trimmed.toUpperCase()
  if (!isAllCaps) return trimmed

  let result = trimmed.toLowerCase()
  result = result.replace(/(^|[.!?]\s+)([a-z])/g, (_, prefix, letter) => prefix + letter.toUpperCase())

  for (const acronym of PRODUCT_TEXT_ACRONYMS) {
    const pattern = new RegExp(`\\b${acronym.toLowerCase()}\\b`, 'gi')
    result = result.replace(pattern, acronym)
  }

  return result
}
