import { cookies } from 'next/headers'
import {
  SESSION_COOKIE,
  SUPERADMIN_COOKIE,
  verifySessionToken,
  verifySuperAdminSessionToken,
} from './auth'

type AuthResult = { ok: true } | { ok: false; status: number; error: string }

/** Admin or superadmin — gates CMS write APIs and uploads. */
export function requireCmsEditorAuth(): AuthResult {
  const cookieStore = cookies()
  const adminToken = cookieStore.get(SESSION_COOKIE)?.value
  const superToken = cookieStore.get(SUPERADMIN_COOKIE)?.value

  if (verifySessionToken(adminToken) || verifySuperAdminSessionToken(superToken)) {
    return { ok: true }
  }

  return { ok: false, status: 401, error: 'Unauthorized' }
}

/** Superadmin only — gates bulk Excel import and sample downloads. */
export function requireSuperAdminAuth(): AuthResult {
  const token = cookies().get(SUPERADMIN_COOKIE)?.value
  if (!verifySuperAdminSessionToken(token)) {
    return { ok: false, status: 401, error: 'Unauthorized' }
  }
  return { ok: true }
}

/** @deprecated Use requireCmsEditorAuth — kept for existing API routes. */
export const requireDashboardAuth = requireCmsEditorAuth
