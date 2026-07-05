import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { revalidatePublicPages } from '@/lib/revalidate-public'
import { connectDB } from '@/lib/mongodb'
import { PartnerModel } from '@/models/Partner'
import { serializePartner } from '@/lib/serializers'
import { partnerInputSchema } from '@/lib/validation'

export const dynamic = 'force-dynamic'

type RouteContext = { params: { id: string } }

export async function PATCH(request: Request, { params }: RouteContext) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    await connectDB()
    const existing = await PartnerModel.findById(params.id)
    if (!existing) {
      return NextResponse.json({ error: 'Partner logo not found' }, { status: 404 })
    }

    const body = await request.json()
    const parsed = partnerInputSchema.partial().safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data
    if (data.name !== undefined) existing.name = data.name
    if (data.img !== undefined) existing.img = data.img.trim()
    if (data.sortOrder !== undefined) existing.sortOrder = data.sortOrder

    await existing.save()
    revalidatePublicPages()
    return NextResponse.json({ partner: serializePartner(existing) })
  } catch {
    return NextResponse.json({ error: 'Failed to update partner logo' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    await connectDB()
    const existing = await PartnerModel.findById(params.id)
    if (!existing) {
      return NextResponse.json({ error: 'Partner logo not found' }, { status: 404 })
    }

    await existing.deleteOne()
    revalidatePublicPages()
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete partner logo' }, { status: 500 })
  }
}
