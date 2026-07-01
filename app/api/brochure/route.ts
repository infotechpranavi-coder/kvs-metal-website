import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { isEmailConfigured, sendBrochureEmail, sendEnquiryNotification } from '@/lib/email'
import { EnquiryModel } from '@/models/Enquiry'
import { brochureRequestSchema } from '@/lib/validation'

export async function GET() {
  return NextResponse.json({ emailConfigured: isEmailConfigured() })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = brochureRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    const data = parsed.data
    const messageParts = [
      'Brochure download via website form.',
      data.company ? `Company: ${data.company}` : '',
    ].filter(Boolean)

    let enquirySaved = false
    try {
      await connectDB()
      await EnquiryModel.create({
        name: data.name,
        email: data.email?.trim() || '',
        phone: data.phone,
        type: 'brochure',
        subject: 'Product brochure download',
        message: messageParts.join('\n'),
        productSku: '',
      })
      enquirySaved = true
    } catch (error) {
      console.error('Brochure enquiry save failed:', error)
    }

    let emailSent = false
    let adminNotified = false
    const recipient = data.email.trim()

    if (isEmailConfigured()) {
      const mailPayload = {
        name: data.name,
        email: recipient,
        phone: data.phone,
        type: 'brochure',
        subject: 'Product brochure download',
        message: messageParts.join('\n'),
      }

      if (recipient) {
        try {
          await sendBrochureEmail({ to: recipient, name: data.name })
          emailSent = true
        } catch (error) {
          console.error('Brochure email failed:', error)
        }
      }

      try {
        await sendEnquiryNotification(mailPayload)
        adminNotified = true
      } catch (error) {
        console.error('Brochure admin notification failed:', error)
      }
    }

    return NextResponse.json({
      ok: true,
      enquirySaved,
      emailSent,
      adminNotified,
      emailConfigured: isEmailConfigured(),
    })
  } catch (error) {
    console.error('Brochure request failed:', error)
    return NextResponse.json({ error: 'Could not process your request. Please try again.' }, { status: 500 })
  }
}
