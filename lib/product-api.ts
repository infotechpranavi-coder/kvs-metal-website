import type { Product } from '@/lib/products'
import type { ProductDto } from '@/lib/serializers'

export function productDtoToProduct(dto: ProductDto): Product {
  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    price: dto.price,
    rating: dto.rating,
    img: dto.img,
    images: dto.images.length > 0 ? dto.images : [dto.img],
    category: dto.category,
    badge: dto.badge || undefined,
    shortDescription: dto.shortDescription,
    description: dto.description || dto.shortDescription,
    features: dto.features,
    material: dto.material || undefined,
    dimensions: dto.dimensions || undefined,
    standard: dto.standard || undefined,
    thickness: dto.thickness || undefined,
    sku: dto.sku,
    reviewCount: dto.reviewCount,
    inStock: dto.inStock,
    warranty: dto.warranty || undefined,
    showInFooter: dto.showInFooter,
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products')
  if (!response.ok) return []
  const data = (await response.json()) as { products?: ProductDto[] }
  return Array.isArray(data.products) ? data.products.map(productDtoToProduct) : []
}

export async function fetchFooterProducts(): Promise<Product[]> {
  const response = await fetch('/api/products/footer')
  if (!response.ok) return []
  const data = (await response.json()) as { products?: ProductDto[] }
  return Array.isArray(data.products) ? data.products.map(productDtoToProduct) : []
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const response = await fetch(`/api/products/slug/${encodeURIComponent(slug)}`)
  if (!response.ok) return null
  const data = (await response.json()) as { product?: ProductDto }
  return data.product ? productDtoToProduct(data.product) : null
}
