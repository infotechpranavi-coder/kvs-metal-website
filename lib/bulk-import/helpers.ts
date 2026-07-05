import { BULK_IMPORT_PLACEHOLDER_IMG } from './types'

export function normalizeHeader(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\w]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

export function normalizeRow(row: Record<string, unknown>): Record<string, unknown> {
  const normalized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(row)) {
    normalized[normalizeHeader(key)] = value
  }
  return normalized
}

export function cellStr(value: unknown): string {
  if (value === null || value === undefined) return ''
  return String(value).trim()
}

export function parseBool(value: unknown, fallback = false): boolean {
  const raw = cellStr(value).toLowerCase()
  if (!raw) return fallback
  return ['yes', 'true', '1', 'y', 'on'].includes(raw)
}

export function parseList(value: unknown): string[] {
  const raw = cellStr(value)
  if (!raw) return []
  return raw
    .split('|')
    .map((part) => part.trim())
    .filter(Boolean)
}

export function parseOptionalNumber(value: unknown, fallback = 0): number {
  const raw = cellStr(value)
  if (!raw) return fallback
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function imageOrPlaceholder(value: unknown): string {
  const raw = cellStr(value)
  return raw || BULK_IMPORT_PLACEHOLDER_IMG
}

export function rowIsEmpty(row: Record<string, unknown>): boolean {
  return Object.values(row).every((value) => !cellStr(value))
}
