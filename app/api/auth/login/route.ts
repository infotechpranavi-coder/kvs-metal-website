import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { checkDashboardCredentials, createSessionToken, sessionCookieOptions } from '@/lib/auth'
import { loginSchema } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    if (!checkDashboardCredentials(parsed.data.username, parsed.data.password)) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 })
    }

    const token = createSessionToken()
    cookies().set(sessionCookieOptions(token))
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
