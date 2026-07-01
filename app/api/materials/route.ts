import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { getMaterialsForApi } from '@/lib/db/catalog'
import { connectDB } from '@/lib/mongodb'
import { MaterialModel } from '@/models/Material'
import { serializeMaterial } from '@/lib/serializers'
import { slugify } from '@/lib/slug'
import { materialInputSchema } from '@/lib/validation'

export async function GET() {
  try {
    const materials = await getMaterialsForApi()
    return NextResponse.json({ materials })
  } catch {
    return NextResponse.json({ error: 'Failed to load materials' }, { status: 500 })
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
    const parsed = materialInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data
    const slug = data.slug?.trim() || slugify(data.title)
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const existing = await MaterialModel.findOne({ slug })
    if (existing) {
      return NextResponse.json({ error: 'Material slug already exists' }, { status: 409 })
    }

    const material = await MaterialModel.create({
      slug,
      title: data.title,
      description: data.description || '',
      img: data.img,
      sortOrder: data.sortOrder ?? 0,
      categoryIds: data.categoryIds || [],
    })

    await material.populate('categoryIds', 'slug')
    return NextResponse.json({ material: serializeMaterial(material) }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create material' }, { status: 500 })
  }
}
