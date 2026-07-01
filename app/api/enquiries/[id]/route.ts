import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { connectDB } from '@/lib/mongodb'
import { EnquiryModel } from '@/models/Enquiry'
import { serializeEnquiry } from '@/lib/serializers'
import { enquiryStatusSchema } from '@/lib/validation'

type RouteContext = { params: { id: string } }

export async function PATCH(request: Request, { params }: RouteContext) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    await connectDB()
    const body = await request.json()
    const parsed = enquiryStatusSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const enquiry = await EnquiryModel.findByIdAndUpdate(
      params.id,
      { status: parsed.data.status },
      { new: true },
    )

    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
    }

    return NextResponse.json({ enquiry: serializeEnquiry(enquiry) })
  } catch {
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 404 })
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    await connectDB()
    const result = await EnquiryModel.findByIdAndDelete(params.id)
    if (!result) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 404 })
  }
}
