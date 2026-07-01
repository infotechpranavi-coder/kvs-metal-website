import type { Product } from './products'

export type DashboardCustomProduct = Product & { showInFooter: boolean }

export type DashboardStore = {
  footerFlags: Record<string, boolean>
  customProducts: DashboardCustomProduct[]
}

export function getNextCustomProductSku(store = readDashboardStore()) {
  return String(store.customProducts.length + 1)
}

function renumberCustomProductSkus(products: DashboardCustomProduct[]) {
  return products.map((product, index) => ({
    ...product,
    sku: String(index + 1),
  }))
}

const STORAGE_KEY = 'kvs-dashboard-v2'
const STORAGE_EVENT = 'kvs-dashboard-change'

export function getDefaultDashboardStore(): DashboardStore {
  return { footerFlags: {}, customProducts: [] }
}

export function resetDashboardStore() {
  writeDashboardStore(getDefaultDashboardStore())
}

export function readDashboardStore(): DashboardStore {
  if (typeof window === 'undefined') return getDefaultDashboardStore()

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultDashboardStore()
    const parsed = JSON.parse(raw) as DashboardStore
    return {
      footerFlags: parsed.footerFlags ?? {},
      customProducts: parsed.customProducts ?? [],
    }
  } catch {
    return getDefaultDashboardStore()
  }
}

export function writeDashboardStore(store: DashboardStore) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  window.dispatchEvent(new Event(STORAGE_EVENT))
}

export function subscribeDashboardStore(onChange: () => void) {
  if (typeof window === 'undefined') return () => {}

  const handler = () => onChange()
  window.addEventListener('storage', handler)
  window.addEventListener(STORAGE_EVENT, handler)
  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener(STORAGE_EVENT, handler)
  }
}

export function isCatalogProductInFooter(slug: string, store = readDashboardStore()) {
  return store.footerFlags[slug] === true
}

export function setCatalogProductFooterVisibility(slug: string, showInFooter: boolean) {
  const store = readDashboardStore()
  store.footerFlags[slug] = showInFooter
  writeDashboardStore(store)
}

export function addCustomDashboardProduct(product: DashboardCustomProduct) {
  const store = readDashboardStore()
  const sku = String(store.customProducts.length + 1)
  store.customProducts = [
    ...store.customProducts.filter((item) => item.slug !== product.slug),
    { ...product, sku },
  ]
  writeDashboardStore(store)
}

export function updateCustomDashboardProduct(
  slug: string,
  updates: Partial<DashboardCustomProduct>,
) {
  const store = readDashboardStore()
  store.customProducts = store.customProducts.map((product) =>
    product.slug === slug ? { ...product, ...updates } : product,
  )
  writeDashboardStore(store)
}

export function removeCustomDashboardProduct(slug: string) {
  const store = readDashboardStore()
  store.customProducts = renumberCustomProductSkus(
    store.customProducts.filter((item) => item.slug !== slug),
  )
  writeDashboardStore(store)
}

export function getCustomProductBySlug(slug: string, store = readDashboardStore()) {
  return store.customProducts.find((product) => product.slug === slug)
}

export function mergeCatalogWithCustomProducts(
  products: Product[],
  options?: { categoryTitle?: string; categoryTitles?: string[] },
  store = readDashboardStore(),
) {
  let custom = store.customProducts

  if (options?.categoryTitle) {
    custom = custom.filter((product) => product.category === options.categoryTitle)
  } else if (options?.categoryTitles?.length) {
    const allowed = new Set(options.categoryTitles)
    custom = custom.filter((product) => allowed.has(product.category))
  }

  const customSlugs = new Set(custom.map((product) => product.slug))
  const catalogOnly = products.filter((product) => !customSlugs.has(product.slug))
  return [...custom, ...catalogOnly]
}

export function buildHomepageProductCards(
  highlights: Array<{ title: string; slug: string; img: string; href: string }>,
  store = readDashboardStore(),
  limit = 9,
) {
  const customCards = store.customProducts.slice(0, limit).map((product) => ({
    key: `product-${product.slug}`,
    title: product.title,
    img: product.img,
    href: `/products/${product.slug}`,
  }))

  const remaining = Math.max(0, limit - customCards.length)
  const categoryCards = highlights.slice(0, remaining).map((category) => ({
    key: `category-${category.slug}`,
    title: category.title,
    img: category.img,
    href: category.href,
  }))

  return [...customCards, ...categoryCards]
}

export function setCustomProductFooterVisibility(slug: string, showInFooter: boolean) {
  const store = readDashboardStore()
  store.customProducts = store.customProducts.map((product) =>
    product.slug === slug ? { ...product, showInFooter } : product,
  )
  writeDashboardStore(store)
}

export function getFooterProducts(catalogProducts: Product[]): Product[] {
  const store = readDashboardStore()
  const fromCatalog = catalogProducts.filter((product) => store.footerFlags[product.slug] === true)
  const fromCustom = store.customProducts.filter((product) => product.showInFooter)
  return [...fromCatalog, ...fromCustom]
}

export function slugifyProductTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
