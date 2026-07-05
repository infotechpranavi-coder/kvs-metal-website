import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE, SUPERADMIN_COOKIE } from '@/lib/session'

function hasSessionToken(token: string | undefined) {
  return Boolean(token && token.includes('.'))
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/superadmin')) {
    if (pathname === '/superadmin/login') {
      return NextResponse.next()
    }

    const token = request.cookies.get(SUPERADMIN_COOKIE)?.value
    if (!hasSessionToken(token)) {
      return NextResponse.redirect(new URL('/superadmin/login', request.url))
    }

    return NextResponse.next()
  }

  if (pathname.startsWith('/dashboard')) {
    if (pathname === '/dashboard/login') {
      return NextResponse.next()
    }

    const token = request.cookies.get(SESSION_COOKIE)?.value
    if (!hasSessionToken(token)) {
      return NextResponse.redirect(new URL('/dashboard/login', request.url))
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/superadmin/:path*'],
}
