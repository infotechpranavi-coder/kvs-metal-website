import { NextResponse } from 'next/server'
import { requireDashboardAuth } from '@/lib/api-auth'
import { getEmailConfigStatus, isEmailConfigured, verifyEmailConnection } from '@/lib/email'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const verify = searchParams.get('verify') === 'true'

  if (verify) {
    const auth = requireDashboardAuth()
    if (!auth.ok) {
      return NextResponse.json({ error: auth.error }, { status: auth.status })
    }

    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          configured: false,
          error:
            'Email is not configured yet. Add RESEND_API_KEY, RESEND_FROM_EMAIL, and ENQUIRY_TO_EMAIL to .env',
        },
        { status: 503 },
      )
    }

    try {
      await verifyEmailConnection()
      return NextResponse.json({
        ...getEmailConfigStatus(),
        verified: true,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Resend verification failed'
      return NextResponse.json({ configured: true, verified: false, error: message }, { status: 500 })
    }
  }

  return NextResponse.json(getEmailConfigStatus())
}
