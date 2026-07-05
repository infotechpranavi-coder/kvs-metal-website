import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { getPartnersForApi } from '@/lib/db/partners'
import { revalidatePublicPages } from '@/lib/revalidate-public'
import { connectDB } from '@/lib/mongodb'
import { PartnerModel } from '@/models/Partner'
import { serializePartner } from '@/lib/serializers'
import { partnerInputSchema } from '@/lib/validation'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const partners = await getPartnersForApi()
    return NextResponse.json({ partners })
  } catch {
    return NextResponse.json({ error: 'Failed to load partners' }, { status: 500 })
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
    const parsed = partnerInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const data = parsed.data
    const count = await PartnerModel.countDocuments()

    const partner = await PartnerModel.create({
      name: data.name,
      img: data.img?.trim() || '',
      sortOrder: data.sortOrder ?? count,
    })

    revalidatePublicPages()
    return NextResponse.json({ partner: serializePartner(partner) }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create partner logo' }, { status: 500 })
  }
}
