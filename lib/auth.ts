import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'kvs-dashboard-session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7

function getSecret() {
  return process.env.DASHBOARD_SECRET || 'dev-secret-change-me'
}

function signPayload(payload: string) {
  return createHmac('sha256', getSecret()).update(payload).digest('hex')
}

export function createSessionToken() {
  const payload = `authenticated:${Date.now()}`
  return `${payload}.${signPayload(payload)}`
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false
  const dot = token.lastIndexOf('.')
  if (dot <= 0) return false
  const payload = token.slice(0, dot)
  const signature = token.slice(dot + 1)
  if (!payload.startsWith('authenticated:')) return false
  const expected = signPayload(payload)
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function isDashboardAuthenticated() {
  const token = cookies().get(SESSION_COOKIE)?.value
  return verifySessionToken(token)
}

export function sessionCookieOptions(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  }
}

export function clearSessionCookieOptions() {
  return {
    name: SESSION_COOKIE,
    value: '',
    path: '/',
    maxAge: 0,
  }
}

export function checkDashboardCredentials(username: string, password: string) {
  const expectedUser = process.env.DASHBOARD_USERNAME || 'admin'
  const expectedPassword = process.env.DASHBOARD_PASSWORD || 'admin123'
  return username === expectedUser && password === expectedPassword
}

export function checkDashboardPassword(password: string) {
  return checkDashboardCredentials(process.env.DASHBOARD_USERNAME || 'admin', password)
}
