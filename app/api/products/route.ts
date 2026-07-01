import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { getNextProductSku, getProductsForApi } from '@/lib/db/products'
import { connectDB, parseOptionalObjectId } from '@/lib/mongodb'
import { ProductModel } from '@/models/Product'
import { serializeProduct } from '@/lib/serializers'
import { slugify } from '@/lib/slug'
import { productInputSchema } from '@/lib/validation'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const products = await getProductsForApi()
    return NextResponse.json({ products })
  } catch {
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    await connectDB()
    const body = await request.json()
    const parsed = productInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data
    const slug = data.slug?.trim() || slugify(data.title)
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const existing = await ProductModel.findOne({ slug })
    if (existing) {
      return NextResponse.json({ error: 'Product slug already exists' }, { status: 409 })
    }

    const sku = data.sku?.trim() || (await getNextProductSku())
    const images = data.images?.filter(Boolean) ?? [data.img]

    const product = await ProductModel.create({
      slug,
      title: data.title,
      sku,
      category: data.category,
      categoryId: parseOptionalObjectId(data.categoryId),
      img: data.img,
      images,
      shortDescription: data.shortDescription || '',
      description: data.description || data.shortDescription || '',
      features: data.features || [],
      material: data.material || '',
      dimensions: data.dimensions || '',
      standard: data.standard || '',
      thickness: data.thickness || '',
      warranty: data.warranty || '',
      badge: data.badge || '',
      price: data.price || '',
      rating: data.rating || '4.8',
      reviewCount: data.reviewCount ?? 0,
      inStock: data.inStock ?? true,
      showInFooter: data.showInFooter ?? false,
      sortOrder: data.sortOrder ?? 0,
    })

    return NextResponse.json({ product: serializeProduct(product) }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
