import type { Product } from '@/lib/products'
import type { ProductCatalogCardDto, ProductDto } from '@/lib/serializers'

export function productDtoToProduct(dto: ProductDto | ProductCatalogCardDto): Product {
  const images = 'images' in dto && Array.isArray(dto.images) && dto.images.length > 0
    ? dto.images
    : [dto.img]

  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    price: 'price' in dto ? dto.price : '',
    rating: 'rating' in dto ? dto.rating : '4.8',
    img: dto.img,
    images,
    category: dto.category,
    categoryId: dto.categoryId,
    badge: dto.badge || undefined,
    shortDescription: dto.shortDescription || '',
    description: 'description' in dto ? dto.description || dto.shortDescription : dto.shortDescription || '',
    features: 'features' in dto ? dto.features : [],
    material: 'material' in dto ? dto.material || undefined : undefined,
    dimensions: 'dimensions' in dto ? dto.dimensions || undefined : undefined,
    standard: 'standard' in dto ? dto.standard || undefined : undefined,
    schedule: 'schedule' in dto ? dto.schedule || undefined : undefined,
    thickness: 'thickness' in dto ? dto.thickness || undefined : undefined,
    colors: 'colors' in dto ? dto.colors || undefined : undefined,
    sku: dto.sku,
    reviewCount: 'reviewCount' in dto ? dto.reviewCount : 0,
    inStock: 'inStock' in dto ? dto.inStock : true,
    warranty: 'warranty' in dto ? dto.warranty || undefined : undefined,
    showInFooter: dto.showInFooter,
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products?view=catalog')
  if (!response.ok) return []
  const data = (await response.json()) as { products?: Array<ProductDto | ProductCatalogCardDto> }
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
