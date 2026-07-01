import { cookies } from 'next/headers'
import { SESSION_COOKIE, verifySessionToken } from './auth'

export function requireDashboardAuth():
  | { ok: true }
  | { ok: false; status: number; error: string } {
  const token = cookies().get(SESSION_COOKIE)?.value
  if (!verifySessionToken(token)) {
    return { ok: false, status: 401, error: 'Unauthorized' }
  }
  return { ok: true }
}
