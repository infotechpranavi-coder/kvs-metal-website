import type { CategoryDto, MaterialDto } from '@/lib/serializers'
import type { HomepageProductCategory } from '@/lib/products'

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
  const response = await fetch('/api/categories/homepage')
  if (!response.ok) return []
  const data = await response.json()
  return Array.isArray(data.categories) ? data.categories : []
}

export async function fetchProductsCatalog(): Promise<{
  categories: CategoryDto[]
  materials: MaterialDto[]
}> {
  const response = await fetch('/api/catalog')
  if (!response.ok) return { categories: [], materials: [] }
  const data = await response.json()
  return {
    categories: Array.isArray(data.categories) ? data.categories : [],
    materials: Array.isArray(data.materials) ? data.materials : [],
  }
}
