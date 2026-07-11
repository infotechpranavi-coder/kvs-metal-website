import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { enrichCategoriesWithMaterial, syncProductsForCategoryUpdate } from '@/lib/db/catalog'
import { findCategoryDocument, setCategoryMaterial, unlinkCategoryFromMaterials } from '@/lib/db/seed'
import { CategoryModel } from '@/models/Category'
import { getMaterialIdForCategory } from '@/lib/db/catalog'
import { serializeCategory } from '@/lib/serializers'
import { slugify } from '@/lib/slug'
import { categoryInputSchema } from '@/lib/validation'

type RouteContext = { params: { id: string } }

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const category = await findCategoryDocument(params.id)
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    const materialId = await getMaterialIdForCategory(category._id.toString())
    const enriched = await enrichCategoriesWithMaterial([serializeCategory(category)])
    return NextResponse.json({
      category: { ...enriched[0], materialId: materialId ?? enriched[0].materialId },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to load category' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    const existing = await findCategoryDocument(params.id)
    if (!existing) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    const previousMaterialId = await getMaterialIdForCategory(existing._id.toString())

    const body = await request.json()
    const parsed = categoryInputSchema.partial().safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data
    const previousTitle = existing.title
    const slug = data.slug?.trim() || (data.title ? slugify(data.title) : undefined)
    if (slug && slug !== existing.slug) {
      const conflict = await CategoryModel.findOne({ slug })
      if (conflict) {
        return NextResponse.json({ error: 'Category slug already exists' }, { status: 409 })
      }
      existing.slug = slug
    }

    if (data.title !== undefined) existing.title = data.title
    if (data.img !== undefined) existing.img = data.img
    if (data.heroImg !== undefined) existing.heroImg = data.heroImg
    if (data.description !== undefined) existing.description = data.description
    if (data.headline !== undefined) existing.headline = data.headline
    if (data.paragraphs !== undefined) existing.paragraphs = data.paragraphs
    if (data.productSlugs !== undefined) existing.productSlugs = data.productSlugs
    if (data.sortOrder !== undefined) existing.sortOrder = data.sortOrder

    if (data.showOnHomepage !== undefined) {
      existing.showOnHomepage = data.showOnHomepage
      await CategoryModel.updateOne(
        { _id: existing._id },
        { $set: { showOnHomepage: data.showOnHomepage } },
      )
    }

    await existing.save()

    if (data.title !== undefined && data.title !== previousTitle) {
      await syncProductsForCategoryUpdate(existing._id.toString(), existing.title, previousTitle)
    }

    if (data.materialId !== undefined) {
      const nextMaterialId = data.materialId?.trim() ? data.materialId.trim() : null
      await setCategoryMaterial(existing._id.toString(), nextMaterialId, previousMaterialId)
    }

    const enriched = await enrichCategoriesWithMaterial([serializeCategory(existing)])
    return NextResponse.json({ category: enriched[0] })
  } catch (error) {
    if (error instanceof Error && error.message === 'MATERIAL_NOT_FOUND') {
      return NextResponse.json({ error: 'Selected material was not found' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    const result = await findCategoryDocument(params.id)
    if (!result) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    await CategoryModel.findByIdAndDelete(result._id)
    await unlinkCategoryFromMaterials(result._id.toString())
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
