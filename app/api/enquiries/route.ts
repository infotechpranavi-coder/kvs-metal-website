import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { connectDB } from '@/lib/mongodb'
import { isEmailConfigured, sendEnquiryConfirmation, sendEnquiryNotification } from '@/lib/email'
import { EnquiryModel } from '@/models/Enquiry'
import { serializeEnquiry } from '@/lib/serializers'
import { enquiryInputSchema } from '@/lib/validation'

export async function GET(request: Request) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const filter = type ? { type } : {}

    const enquiries = await EnquiryModel.find(filter).sort({ createdAt: -1 })
    return NextResponse.json({ enquiries: enquiries.map(serializeEnquiry) })
  } catch {
    return NextResponse.json({ error: 'Failed to load enquiries' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const parsed = enquiryInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid enquiry data' }, { status: 400 })
    }

    const data = parsed.data
    const enquiry = await EnquiryModel.create({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      type: data.type || 'general',
      subject: data.subject || '',
      message: data.message,
      productSku: data.productSku || '',
    })

    let emailSent = false
    if (isEmailConfigured()) {
      const mailPayload = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        type: data.type || 'general',
        subject: data.subject || '',
        message: data.message,
        productSku: data.productSku,
      }

      try {
        await sendEnquiryNotification(mailPayload)
        await sendEnquiryConfirmation(mailPayload)
        emailSent = true
      } catch (error) {
        console.error('Enquiry email failed:', error)
      }
    }

    return NextResponse.json({ enquiry: serializeEnquiry(enquiry), emailSent }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 })
  }
}
