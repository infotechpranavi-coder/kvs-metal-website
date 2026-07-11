import type { HomepageProductCategory, Product } from '@/lib/products'

type CategoryRef = Pick<HomepageProductCategory, 'id' | 'title'>

type ProductCategoryRef = Pick<Product, 'category' | 'categoryId'>

export function productBelongsToCategory(
  product: ProductCategoryRef,
  category: CategoryRef,
): boolean {
  if (product.categoryId && category.id && product.categoryId === category.id) {
    return true
  }

  return product.category === category.title
}

export function productBelongsToAnyCategory(
  product: ProductCategoryRef,
  categories: CategoryRef[],
): boolean {
  return categories.some((category) => productBelongsToCategory(product, category))
}
