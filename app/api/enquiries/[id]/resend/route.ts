import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { connectDB } from '@/lib/mongodb'
import {
  isEmailConfigured,
  sendBrochureEmail,
  sendCareerConfirmation,
  sendEnquiryConfirmation,
  sendEnquiryNotification,
} from '@/lib/email'
import { EnquiryModel } from '@/models/Enquiry'
import { serializeEnquiry } from '@/lib/serializers'
import { enquiryResendSchema } from '@/lib/validation'

type RouteContext = { params: { id: string } }

export async function POST(request: Request, { params }: RouteContext) {
  const auth = requireDashboardAuth()
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  if (!isEmailConfigured()) {
    return NextResponse.json({ error: 'Email is not configured. Add Resend settings to .env.' }, { status: 503 })
  }

  try {
    await connectDB()
    const enquiry = await EnquiryModel.findById(params.id)
    if (!enquiry) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
    }

    const body = await request.json()
    const parsed = enquiryResendSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid resend target' }, { status: 400 })
    }

    const payload = {
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone || '',
      type: enquiry.type || 'general',
      subject: enquiry.subject || '',
      message: enquiry.message,
      productSku: enquiry.productSku || undefined,
    }

    if (parsed.data.target === 'admin') {
      await sendEnquiryNotification(payload)
      return NextResponse.json({ ok: true, sentTo: 'admin', enquiry: serializeEnquiry(enquiry) })
    }

    if (!enquiry.email) {
      return NextResponse.json({ error: 'This enquiry has no customer email address' }, { status: 400 })
    }

    if (enquiry.type === 'brochure') {
      await sendBrochureEmail({ to: enquiry.email, name: enquiry.name })
    } else if (enquiry.type === 'careers') {
      const [firstName, ...rest] = enquiry.name.split(' ')
      await sendCareerConfirmation({
        firstName: firstName || enquiry.name,
        lastName: rest.join(' '),
        email: enquiry.email,
        message: enquiry.message,
        cvFilename: enquiry.productSku || 'cv.pdf',
        cvContent: Buffer.alloc(0),
        cvContentType: 'application/pdf',
      })
    } else {
      await sendEnquiryConfirmation(payload)
    }

    return NextResponse.json({ ok: true, sentTo: 'customer', enquiry: serializeEnquiry(enquiry) })
  } catch (error) {
    if (error instanceof Error && error.message === 'BROCHURE_FILE_MISSING') {
      return NextResponse.json({ error: 'Brochure PDF file is missing on the server' }, { status: 503 })
    }
    console.error('Enquiry resend failed:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
