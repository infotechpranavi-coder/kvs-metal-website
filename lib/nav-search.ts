import type { Product } from '@/lib/products'
import type { Sector } from '@/lib/sectors'

export type NavSearchCategory = {
  slug: string
  title: string
  description?: string
  headline?: string
}

export type NavSearchSuggestion = {
  id: string
  type: 'product' | 'category' | 'industry'
  title: string
  meta: string
  href: string
  score: number
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
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
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

export function buildNavSearchSuggestions(
  query: string,
  data: {
    products: Product[]
    categories: NavSearchCategory[]
    sectors: Sector[]
  },
  limit = 3,
): NavSearchSuggestion[] {
  const q = query.trim()
  if (!q) return []

  const suggestions: NavSearchSuggestion[] = []

  for (const product of data.products) {
    const score = scoreSearchMatch(q, [
      product.title,
      product.category,
      product.sku,
      product.shortDescription,
      product.description,
      product.material ?? '',
      product.dimensions ?? '',
      product.standard ?? '',
    ])
    if (score <= 0) continue
    suggestions.push({
      id: `product-${product.slug}`,
      type: 'product',
      title: product.title,
      meta: product.category,
      href: `/products/${product.slug}`,
      score,
    })
  }

  for (const category of data.categories) {
    const score = scoreSearchMatch(q, [
      category.title,
      category.description ?? '',
      category.headline ?? '',
      category.slug.replace(/-/g, ' '),
    ])
    if (score <= 0) continue
    suggestions.push({
      id: `category-${category.slug}`,
      type: 'category',
      title: category.title,
      meta: category.description?.trim() || 'Browse products in this category',
      href: `/products?category=${category.slug}`,
      score,
    })
  }

  for (const sector of data.sectors) {
    const score = scoreSearchMatch(q, [
      sector.name,
      sector.tagline,
      sector.headline,
      ...sector.paragraphs,
      ...sector.bullets,
    ])
    if (score <= 0) continue
    suggestions.push({
      id: `industry-${sector.slug}`,
      type: 'industry',
      title: sector.name,
      meta: sector.tagline,
      href: `/sectors/${sector.slug}`,
      score,
    })
  }

  return suggestions
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit)
}
