'use server'

import { cookies } from 'next/headers'
import {
  checkSuperAdminCredentials,
  clearSuperAdminCookieOptions,
  createSuperAdminSessionToken,
  isSuperAdminAuthenticated,
  superAdminCookieOptions,
} from '@/lib/auth'
import { importCmsFromExcel } from '@/lib/bulk-import/import-cms'
import { generateSampleWorkbook, sampleFilename } from '@/lib/bulk-import/samples'
import { BULK_IMPORT_MAX_BYTES, type BulkImportType } from '@/lib/bulk-import/types'
import { revalidatePublicPages } from '@/lib/revalidate-public'

export async function loginSuperAdminAction(username: string, password: string) {
  if (!checkSuperAdminCredentials(username, password)) {
    return { ok: false as const, error: 'Invalid username or password' }
  }

  const token = createSuperAdminSessionToken()
  cookies().set(superAdminCookieOptions(token))
  return { ok: true as const }
}

export async function logoutSuperAdminAction() {
  cookies().set(clearSuperAdminCookieOptions())
  return { ok: true as const }
}

export async function downloadSampleExcelAction(type: BulkImportType) {
  if (!(await isSuperAdminAuthenticated())) {
    return { ok: false as const, error: 'Unauthorized' }
  }

  const buffer = generateSampleWorkbook(type)
  return {
    ok: true as const,
    filename: sampleFilename(type),
    data: buffer.toString('base64'),
  }
}

export async function bulkImportAction(type: BulkImportType, formData: FormData) {
  if (!(await isSuperAdminAuthenticated())) {
    return { ok: false as const, error: 'Unauthorized' }
  }

  const file = formData.get('file')
  if (!(file instanceof File)) {
    return { ok: false as const, error: 'No file uploaded' }
  }

  const name = file.name.toLowerCase()
  if (!name.endsWith('.xlsx') && !name.endsWith('.xls')) {
    return { ok: false as const, error: 'Only .xlsx or .xls files are supported' }
  }

  if (file.size > BULK_IMPORT_MAX_BYTES) {
    return { ok: false as const, error: 'File must be 5 MB or smaller' }
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await importCmsFromExcel(type, buffer)
    revalidatePublicPages()
    return { ok: true as const, result }
  } catch (error) {
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : 'Import failed',
    }
  }
}
