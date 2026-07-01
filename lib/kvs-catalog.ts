export type KvsDemoProduct = {
  id: string
  slug: string
  title: string
  price: string
  rating: string
  img: string
  images: string[]
  category: string
  badge?: string
  shortDescription: string
  description: string
  features: string[]
  material?: string
  dimensions?: string
  sku: string
  reviewCount: number
  inStock: boolean
}

export type KvsProductCategory = {
  slug: string
  title: string
  img: string
  heroImg: string
  description: string
  headline: string
  paragraphs: string[]
  productSlugs: string[]
}

export const kvsProductCategories: KvsProductCategory[] = []

export const kvsDemoProducts: KvsDemoProduct[] = []

export function getKvsCategoryHref(slug: string): string {
  return `/products?category=${slug}`
}

export const productHighlights = kvsProductCategories.map((category) => ({
  title: category.title,
  slug: category.slug,
  img: category.img,
  href: getKvsCategoryHref(category.slug),
}))

export const productMarqueeTerms = kvsProductCategories.map((item) =>
  item.title.toUpperCase(),
)
