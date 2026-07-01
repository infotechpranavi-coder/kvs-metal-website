import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { checkDashboardPassword, createSessionToken, sessionCookieOptions } from '@/lib/auth'
import { loginSchema } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    if (!checkDashboardPassword(parsed.data.password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = createSessionToken()
    cookies().set(sessionCookieOptions(token))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
