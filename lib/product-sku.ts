function parseProductSku(sku: string): number {
  const parsed = Number.parseInt(sku.trim(), 10)
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER
}

export function compareProductSku(a: string, b: string): number {
  const diff = parseProductSku(a) - parseProductSku(b)
  return diff !== 0 ? diff : a.localeCompare(b)
}

export function sortProductsBySku<T extends { sku: string }>(products: T[]): T[] {
  return [...products].sort((a, b) => compareProductSku(a.sku, b.sku))
}
