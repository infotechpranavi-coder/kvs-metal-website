import type { CategoryDto, MaterialDto } from '@/lib/serializers'
import type { HomepageProductCategory } from '@/lib/products'

export function sortCategoriesByOrder<T extends { sortOrder?: number; title: string }>(
  categories: T[],
): T[] {
  return [...categories].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.title.localeCompare(b.title),
  )
}

export function categoryDtoToHomepageCategory(category: CategoryDto): HomepageProductCategory {
  return {
    slug: category.slug,
    title: category.title,
    img: category.img,
    heroImg: category.heroImg || category.img,
    description: category.description,
    headline: category.headline,
    paragraphs: category.paragraphs,
    productSlugs: category.productSlugs,
  }
}

export function categoryToProductCard(category: CategoryDto) {
  return {
    key: `category-${category.id}`,
    title: category.title,
    img: category.img,
    href: `/products?category=${category.slug}`,
  }
}

export async function fetchHomepageCategories(): Promise<CategoryDto[]> {
  const { categories } = await fetchProductsCatalog()
  return sortCategoriesByOrder(categories.filter((category) => category.showOnHomepage))
}

export async function fetchProductsCatalog(): Promise<{
  categories: CategoryDto[]
  materials: MaterialDto[]
}> {
  const response = await fetch('/api/catalog')
  if (!response.ok) return { categories: [], materials: [] }
  const data = await response.json()
  return {
    categories: sortCategoriesByOrder(
      Array.isArray(data.categories) ? data.categories : [],
    ),
    materials: Array.isArray(data.materials) ? data.materials : [],
  }
}
