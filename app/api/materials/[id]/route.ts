import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { connectDB } from '@/lib/mongodb'
import { findMaterialDocument } from '@/lib/db/seed'
import { MaterialModel } from '@/models/Material'
import { serializeMaterial } from '@/lib/serializers'
import { slugify } from '@/lib/slug'
import { materialInputSchema } from '@/lib/validation'

type RouteContext = { params: { id: string } }

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const material = await findMaterialDocument(params.id)
    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 })
    }
    return NextResponse.json({ material: serializeMaterial(material) })
  } catch {
    return NextResponse.json({ error: 'Failed to load material' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    const existing = await findMaterialDocument(params.id)
    if (!existing) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 })
    }

    const body = await request.json()
    const parsed = materialInputSchema.partial().safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data
    const slug = data.slug?.trim() || (data.title ? slugify(data.title) : undefined)
    if (slug && slug !== existing.slug) {
      const conflict = await MaterialModel.findOne({ slug })
      if (conflict) {
        return NextResponse.json({ error: 'Material slug already exists' }, { status: 409 })
      }
      existing.slug = slug
    }

    if (data.title !== undefined) existing.title = data.title
    if (data.description !== undefined) existing.description = data.description
    if (data.img !== undefined) existing.img = data.img
    if (data.sortOrder !== undefined) existing.sortOrder = data.sortOrder
    if (data.categoryIds !== undefined) existing.categoryIds = data.categoryIds as never

    await existing.save()
    await existing.populate('categoryIds', 'slug')
    return NextResponse.json({ material: serializeMaterial(existing) })
  } catch {
    return NextResponse.json({ error: 'Failed to update material' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    await connectDB()
    const existing = await findMaterialDocument(params.id)
    if (!existing) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 })
    }

    await MaterialModel.findByIdAndDelete(existing._id)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete material' }, { status: 500 })
  }
}
