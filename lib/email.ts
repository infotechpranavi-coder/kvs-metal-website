import fs from 'fs'
import { Resend } from 'resend'
import { COMPANY_NAME, EMAIL as COMPANY_EMAIL } from './content'
import { BROCHURE_FILENAME, getBrochureFilePath } from './site'

export type BrochureEmailPayload = {
  to: string
  name: string
}

export type EnquiryEmailPayload = {
  name: string
  email: string
  phone: string
  type: string
  subject: string
  message: string
  productSku?: string
}

export type CareerEmailPayload = {
  firstName: string
  lastName: string
  email: string
  message: string
  cvFilename: string
  cvContent: Buffer
  cvContentType: string
}

export type SendMailOptions = {
  to: string | string[]
  subject: string
  text: string
  html?: string
  replyTo?: string
  attachments?: Array<{
    filename: string
    content: Buffer
    contentType?: string
  }>
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    throw new Error('EMAIL_NOT_CONFIGURED')
  }
  return new Resend(apiKey)
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000'
}

export function isEmailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.RESEND_FROM_EMAIL?.trim() &&
      process.env.ENQUIRY_TO_EMAIL?.trim(),
  )
}

export function getEmailConfigStatus() {
  return {
    configured: isEmailConfigured(),
    notifyTo: process.env.ENQUIRY_TO_EMAIL?.trim() || COMPANY_EMAIL,
    from: process.env.RESEND_FROM_EMAIL?.trim() || null,
    siteUrl: getSiteUrl(),
  }
}

function getNotifyAddress() {
  return process.env.ENQUIRY_TO_EMAIL?.trim() || COMPANY_EMAIL
}

function getFromAddress() {
  return process.env.RESEND_FROM_EMAIL?.trim() as string
}

function normalizeRecipients(to: string | string[]) {
  return Array.isArray(to) ? to : [to]
}

export async function verifyEmailConnection() {
  if (!isEmailConfigured()) {
    throw new Error('EMAIL_NOT_CONFIGURED')
  }

  const resend = getResendClient()
  const { error } = await resend.domains.list()

  if (error) {
    throw new Error(error.message || 'Resend API verification failed')
  }
}

export async function sendMail(options: SendMailOptions) {
  if (!isEmailConfigured()) {
    throw new Error('EMAIL_NOT_CONFIGURED')
  }

  const resend = getResendClient()
  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: normalizeRecipients(options.to),
    replyTo: options.replyTo || options.to,
    subject: options.subject,
    text: options.text,
    html: options.html || options.text.replace(/\n/g, '<br>'),
    attachments: options.attachments?.map((attachment) => ({
      filename: attachment.filename,
      content: attachment.content,
      contentType: attachment.contentType,
    })),
  })

  if (error) {
    throw new Error(error.message || 'Failed to send email')
  }
}

export async function sendBrochureEmail({ to, name }: BrochureEmailPayload) {
  const brochurePath = getBrochureFilePath()
  if (!fs.existsSync(brochurePath)) {
    throw new Error('BROCHURE_FILE_MISSING')
  }

  const siteUrl = getSiteUrl()
  const text = [
    `Hi ${name},`,
    '',
    `Thank you for your interest in ${COMPANY_NAME}.`,
    'Please find our product brochure attached to this email.',
    '',
    `You can also visit ${siteUrl}/brochure anytime to request it again.`,
    '',
    `For enquiries, contact us at ${COMPANY_EMAIL}.`,
    '',
    `— ${COMPANY_NAME}`,
  ].join('\n')

  await sendMail({
    to,
    subject: `${COMPANY_NAME} — Product Brochure`,
    text,
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for your interest in <strong>${COMPANY_NAME}</strong>.</p>
      <p>Please find our product brochure attached to this email.</p>
      <p>You can also visit <a href="${siteUrl}/brochure">${siteUrl}/brochure</a> anytime.</p>
      <p>For enquiries, contact us at <a href="mailto:${COMPANY_EMAIL}">${COMPANY_EMAIL}</a>.</p>
      <p>— ${COMPANY_NAME}</p>
    `,
    attachments: [
      {
        filename: BROCHURE_FILENAME,
        content: fs.readFileSync(brochurePath),
        contentType: 'application/pdf',
      },
    ],
  })
}

export async function sendEnquiryNotification(payload: EnquiryEmailPayload) {
  const siteUrl = getSiteUrl()
  const lines = [
    `New ${payload.type || 'general'} enquiry from the website.`,
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email || 'Not provided'}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Type: ${payload.type || 'general'}`,
    `Subject: ${payload.subject || '—'}`,
    payload.productSku ? `Product SKU: ${payload.productSku}` : '',
    '',
    'Message:',
    payload.message,
    '',
    `View enquiries: ${siteUrl}/dashboard/enquiries`,
  ].filter(Boolean)

  const text = lines.join('\n')

  await sendMail({
    to: getNotifyAddress(),
    replyTo: payload.email || undefined,
    subject: `[${COMPANY_NAME}] New enquiry — ${payload.name}`,
    text,
    html: text.replace(/\n/g, '<br>'),
  })
}

export async function sendEnquiryConfirmation(payload: EnquiryEmailPayload) {
  if (!payload.email) return

  const siteUrl = getSiteUrl()
  const text = [
    `Hi ${payload.name},`,
    '',
    `Thank you for contacting ${COMPANY_NAME}. We have received your enquiry and will respond within one business day.`,
    '',
    'Your message:',
    payload.message,
    '',
    `— ${COMPANY_NAME}`,
    COMPANY_EMAIL,
    siteUrl,
  ].join('\n')

  await sendMail({
    to: payload.email,
    subject: `${COMPANY_NAME} — We received your enquiry`,
    text,
    html: `
      <p>Hi ${payload.name},</p>
      <p>Thank you for contacting <strong>${COMPANY_NAME}</strong>. We have received your enquiry and will respond within one business day.</p>
      <p><strong>Your message:</strong><br>${payload.message.replace(/\n/g, '<br>')}</p>
      <p>— ${COMPANY_NAME}<br><a href="mailto:${COMPANY_EMAIL}">${COMPANY_EMAIL}</a><br><a href="${siteUrl}">${siteUrl}</a></p>
    `,
  })
}

export async function sendCareerNotification(payload: CareerEmailPayload) {
  const siteUrl = getSiteUrl()
  const fullName = `${payload.firstName} ${payload.lastName}`.trim()
  const lines = [
    'New career application from the website.',
    '',
    `Name: ${fullName}`,
    `Email: ${payload.email}`,
    `CV file: ${payload.cvFilename}`,
    '',
    'Message:',
    payload.message || '—',
    '',
    `View enquiries: ${siteUrl}/dashboard/enquiries`,
  ]

  const text = lines.join('\n')

  await sendMail({
    to: getNotifyAddress(),
    replyTo: payload.email,
    subject: `[${COMPANY_NAME}] Career application — ${fullName}`,
    text,
    html: text.replace(/\n/g, '<br>'),
    attachments: [
      {
        filename: payload.cvFilename,
        content: payload.cvContent,
        contentType: payload.cvContentType,
      },
    ],
  })
}

export async function sendCareerConfirmation(payload: CareerEmailPayload) {
  const siteUrl = getSiteUrl()
  const fullName = `${payload.firstName} ${payload.lastName}`.trim()
  const text = [
    `Hi ${fullName},`,
    '',
    `Thank you for your interest in joining ${COMPANY_NAME}. We have received your CV and application details.`,
    'Our team will review your profile and contact you if there is a suitable opportunity.',
    '',
    `— ${COMPANY_NAME}`,
    COMPANY_EMAIL,
    siteUrl,
  ].join('\n')

  await sendMail({
    to: payload.email,
    subject: `${COMPANY_NAME} — We received your career application`,
    text,
    html: `
      <p>Hi ${fullName},</p>
      <p>Thank you for your interest in joining <strong>${COMPANY_NAME}</strong>. We have received your CV and application details.</p>
      <p>Our team will review your profile and contact you if there is a suitable opportunity.</p>
      <p>— ${COMPANY_NAME}<br><a href="mailto:${COMPANY_EMAIL}">${COMPANY_EMAIL}</a><br><a href="${siteUrl}">${siteUrl}</a></p>
    `,
  })
}
