export type BulkImportType = 'categories' | 'products' | 'materials'

export type BulkImportResult = {
  added: number
  updated: number
  skipped: number
  errors: string[]
}

export const BULK_IMPORT_MAX_BYTES = 5 * 1024 * 1024
export const BULK_IMPORT_MAX_ERRORS = 20
export const BULK_IMPORT_PLACEHOLDER_IMG = '/logo/kvs_logo.png'
