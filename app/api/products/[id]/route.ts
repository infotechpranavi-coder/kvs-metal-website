import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { renumberProductSkus } from '@/lib/db/products'
import { connectDB } from '@/lib/mongodb'
import { ProductModel } from '@/models/Product'
import { serializeProduct } from '@/lib/serializers'
import { slugify } from '@/lib/slug'
import { productInputSchema } from '@/lib/validation'

export const dynamic = 'force-dynamic'

type RouteContext = { params: { id: string } }

export async function PUT(request: Request, context: RouteContext) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    await connectDB()
    const existing = await ProductModel.findById(context.params.id)
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const body = await request.json()
    const parsed = productInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data
    const slug = data.slug?.trim() || slugify(data.title) || existing.slug
    const slugTaken = await ProductModel.findOne({ slug, _id: { $ne: existing._id } })
    if (slugTaken) {
      return NextResponse.json({ error: 'Product slug already exists' }, { status: 409 })
    }

    const images = data.images?.filter(Boolean) ?? [data.img]

    existing.slug = slug
    existing.title = data.title
    existing.category = data.category
    existing.categoryId = data.categoryId || null
    existing.img = data.img
    existing.images = images
    existing.shortDescription = data.shortDescription || ''
    existing.description = data.description || data.shortDescription || ''
    existing.features = data.features || []
    existing.material = data.material || ''
    existing.dimensions = data.dimensions || ''
    existing.standard = data.standard || ''
    existing.thickness = data.thickness || ''
    existing.warranty = data.warranty || ''
    existing.badge = data.badge || ''
    existing.price = data.price || ''
    existing.rating = data.rating || existing.rating
    existing.reviewCount = data.reviewCount ?? existing.reviewCount
    existing.inStock = data.inStock ?? existing.inStock
    existing.showInFooter = data.showInFooter ?? existing.showInFooter
    existing.sortOrder = data.sortOrder ?? existing.sortOrder

    await existing.save()
    return NextResponse.json({ product: serializeProduct(existing) })
  } catch {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    await connectDB()
    const existing = await ProductModel.findById(context.params.id)
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    await existing.deleteOne()
    await renumberProductSkus()
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
