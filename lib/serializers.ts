import type { CategoryDocument } from '@/models/Category'
import type { EnquiryDocument } from '@/models/Enquiry'
import type { MaterialDocument } from '@/models/Material'
import type { PartnerDocument } from '@/models/Partner'
import type { ProductDocument } from '@/models/Product'
import type mongoose from 'mongoose'

export type CategoryDto = {
  id: string
  slug: string
  title: string
  img: string
  heroImg: string
  description: string
  headline: string
  paragraphs: string[]
  productSlugs: string[]
  sortOrder: number
  showOnHomepage: boolean
  createdAt: string
  updatedAt: string
}

export type MaterialDto = {
  id: string
  slug: string
  title: string
  description: string
  img: string
  sortOrder: number
  categoryIds: string[]
  categorySlugs: string[]
  createdAt: string
  updatedAt: string
}

export type PartnerDto = {
  id: string
  name: string
  img: string
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export type EnquiryDto = {
  id: string
  name: string
  email: string
  phone: string | null
  type: string
  subject: string | null
  message: string
  productSku: string | null
  cvUrl: string | null
  cvPublicId: string | null
  cvFilename: string | null
  cvMimeType: string | null
  status: string
  createdAt: string
  updatedAt: string
}

export type ProductDto = {
  id: string
  slug: string
  title: string
  sku: string
  category: string
  categoryId: string | null
  img: string
  images: string[]
  shortDescription: string
  description: string
  features: string[]
  material: string
  dimensions: string
  standard: string
  thickness: string
  warranty: string
  badge: string
  price: string
  rating: string
  reviewCount: number
  inStock: boolean
  showInFooter: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

type PopulatedCategoryRef = {
  _id: mongoose.Types.ObjectId
  slug: string
}

export function serializeCategory(category: CategoryDocument): CategoryDto {
  return {
    id: category._id.toString(),
    slug: category.slug,
    title: category.title,
    img: category.img,
    heroImg: category.heroImg || '',
    description: category.description || '',
    headline: category.headline || '',
    paragraphs: category.paragraphs || [],
    productSlugs: category.productSlugs || [],
    sortOrder: category.sortOrder ?? 0,
    showOnHomepage: category.showOnHomepage === true,
    createdAt: category.createdAt.toISOString(),
    updatedAt: category.updatedAt.toISOString(),
  }
}

export function serializeMaterial(
  material: MaterialDocument & { categoryIds?: Array<PopulatedCategoryRef | mongoose.Types.ObjectId> },
): MaterialDto {
  const populated: PopulatedCategoryRef[] = []

  for (const item of material.categoryIds || []) {
    if (typeof item === 'object' && item !== null && 'slug' in item) {
      populated.push(item as PopulatedCategoryRef)
    }
  }

  const rawIds = (material.categoryIds || []).map((item) =>
    typeof item === 'object' && item !== null && '_id' in item
      ? item._id.toString()
      : String(item),
  )

  return {
    id: material._id.toString(),
    slug: material.slug,
    title: material.title,
    description: material.description || '',
    img: material.img,
    sortOrder: material.sortOrder ?? 0,
    categoryIds: populated.length > 0 ? populated.map((item) => item._id.toString()) : rawIds,
    categorySlugs: populated.map((item) => item.slug),
    createdAt: material.createdAt.toISOString(),
    updatedAt: material.updatedAt.toISOString(),
  }
}

export function serializeEnquiry(enquiry: EnquiryDocument): EnquiryDto {
  return {
    id: enquiry._id.toString(),
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone || null,
    type: enquiry.type || 'general',
    subject: enquiry.subject || null,
    message: enquiry.message,
    productSku: enquiry.productSku || null,
    cvUrl: enquiry.cvUrl || null,
    cvPublicId: enquiry.cvPublicId || null,
    cvFilename: enquiry.cvFilename || null,
    cvMimeType: enquiry.cvMimeType || null,
    status: enquiry.status || 'new',
    createdAt: enquiry.createdAt.toISOString(),
    updatedAt: enquiry.updatedAt.toISOString(),
  }
}

export function serializePartner(partner: PartnerDocument): PartnerDto {
  return {
    id: partner._id.toString(),
    name: partner.name,
    img: partner.img || '',
    sortOrder: partner.sortOrder ?? 0,
    createdAt: partner.createdAt.toISOString(),
    updatedAt: partner.updatedAt.toISOString(),
  }
}

export function serializeProduct(product: ProductDocument): ProductDto {
  return {
    id: product._id.toString(),
    slug: product.slug,
    title: product.title,
    sku: product.sku,
    category: product.category,
    categoryId: product.categoryId ? product.categoryId.toString() : null,
    img: product.img,
    images: product.images || [],
    shortDescription: product.shortDescription || '',
    description: product.description || '',
    features: product.features || [],
    material: product.material || '',
    dimensions: product.dimensions || '',
    standard: product.standard || '',
    thickness: product.thickness || '',
    warranty: product.warranty || '',
    badge: product.badge || '',
    price: product.price || '',
    rating: product.rating || '4.8',
    reviewCount: product.reviewCount ?? 0,
    inStock: product.inStock !== false,
    showInFooter: product.showInFooter === true,
    sortOrder: product.sortOrder ?? 0,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  }
}
