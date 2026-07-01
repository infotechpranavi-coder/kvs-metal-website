import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import {
  isEmailConfigured,
  sendCareerConfirmation,
  sendCareerNotification,
} from '@/lib/email'
import { EnquiryModel } from '@/models/Enquiry'
import { careerApplicationSchema, isAllowedCareerCv } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const cvFile = formData.get('cv')

    if (!(cvFile instanceof File)) {
      return NextResponse.json({ error: 'Please upload your CV.' }, { status: 400 })
    }

    if (!isAllowedCareerCv(cvFile)) {
      return NextResponse.json(
        { error: 'CV must be a PDF, DOC, or DOCX file up to 5 MB.' },
        { status: 400 },
      )
    }

    const parsed = careerApplicationSchema.safeParse({
      firstName: String(formData.get('firstName') || '').trim(),
      lastName: String(formData.get('lastName') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    })

    if (!parsed.success) {
      return NextResponse.json({ error: 'Please check your form details and try again.' }, { status: 400 })
    }

    const data = parsed.data
    const fullName = `${data.firstName} ${data.lastName}`.trim()
    const cvBuffer = Buffer.from(await cvFile.arrayBuffer())
    const messageBody = [
      `CV file: ${cvFile.name}`,
      '',
      data.message ? 'Message:' : '',
      data.message,
    ]
      .filter(Boolean)
      .join('\n')

    await connectDB()
    await EnquiryModel.create({
      name: fullName,
      email: data.email,
      phone: '',
      type: 'careers',
      subject: 'Career application',
      message: messageBody,
      productSku: cvFile.name,
    })

    let emailSent = false
    let adminNotified = false

    if (isEmailConfigured()) {
      const mailPayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        message: data.message,
        cvFilename: cvFile.name,
        cvContent: cvBuffer,
        cvContentType: cvFile.type || 'application/octet-stream',
      }

      try {
        await sendCareerConfirmation(mailPayload)
        emailSent = true
      } catch (error) {
        console.error('Career confirmation email failed:', error)
      }

      try {
        await sendCareerNotification(mailPayload)
        adminNotified = true
      } catch (error) {
        console.error('Career admin notification failed:', error)
      }
    }

    return NextResponse.json({
      ok: true,
      emailSent,
      adminNotified,
      emailConfigured: isEmailConfigured(),
    })
  } catch {
    return NextResponse.json({ error: 'Could not submit your application. Please try again.' }, { status: 500 })
  }
}
