import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { enrichCategoriesWithMaterial, getCategoriesForApi } from '@/lib/db/catalog'
import { linkCategoryToMaterial } from '@/lib/db/seed'
import { connectDB } from '@/lib/mongodb'
import { CategoryModel } from '@/models/Category'
import { serializeCategory } from '@/lib/serializers'
import { slugify } from '@/lib/slug'
import { categoryInputSchema } from '@/lib/validation'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const categories = await enrichCategoriesWithMaterial(await getCategoriesForApi())
    return NextResponse.json({ categories })
  } catch {
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 })
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
    const parsed = categoryInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data
    const slug = data.slug?.trim() || slugify(data.title)
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const existing = await CategoryModel.findOne({ slug })
    if (existing) {
      return NextResponse.json({ error: 'Category slug already exists' }, { status: 409 })
    }

    const category = await CategoryModel.create({
      slug,
      title: data.title,
      img: data.img,
      heroImg: data.heroImg || data.img,
      description: data.description || '',
      headline: data.headline || '',
      paragraphs: data.paragraphs || [],
      productSlugs: data.productSlugs || [],
      sortOrder: data.sortOrder ?? 0,
      showOnHomepage: data.showOnHomepage ?? false,
    })

    if (data.materialId?.trim()) {
      await linkCategoryToMaterial(data.materialId.trim(), category._id.toString())
    }

    const enriched = await enrichCategoriesWithMaterial([serializeCategory(category)])
    return NextResponse.json({ category: enriched[0] }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'MATERIAL_NOT_FOUND') {
      return NextResponse.json({ error: 'Selected material was not found' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
