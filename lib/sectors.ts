export type Sector = {
  slug: string
  name: string
  img: string
  tagline: string
  headline: string
  paragraphs: string[]
  bullets: string[]
}

export const sectors: Sector[] = [
  {
    slug: 'construction',
    name: 'Construction',
    img: '/market/conturction.jpg',
    tagline: 'Steel Solutions for Modern Construction & Infrastructure',
    headline: 'Steel Solutions for Modern Construction & Infrastructure',
    paragraphs: [
      'As a leading steel supplier in Dubai, UAE, KVS Metals supplies structural and industrial steel materials for commercial buildings, civil engineering, warehouses, fabrication units, and infrastructure developments.',
      'From steel sections and pipes to coils, sheets, and reinforcement materials, we help businesses maintain continuity with timely material flow and practical procurement coordination.',
    ],
    bullets: [
      'Structural & industrial steel materials',
      'Suitable for civil & commercial projects',
      'International specifications & grades',
      'Smooth material flow for continuity',
    ],
  },
  {
    slug: 'oil-gas',
    name: 'Oil & Gas',
    img: '/market/oil%20andgas.jpg',
    tagline: 'Steel Materials for Critical Oil & Gas Applications',
    headline: 'Steel Materials for Critical Oil & Gas Applications',
    paragraphs: [
      'KVS Metals supplies industrial steel materials for demanding oil and gas environments across Dubai and the UAE.',
      'Our corrosion-resistant and high-tensile steel products are suitable for pipelines, storage systems, processing facilities, and offshore or onshore applications where precision, compliance, and operational performance are essential.',
    ],
    bullets: [
      'Corrosion-resistant steel options',
      'Suitable for onshore & offshore use',
      'Materials aligned with recognised standards',
      'Timely coordination for operations',
    ],
  },
  {
    slug: 'foundation',
    name: 'Foundation',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85',
    tagline: 'Engineered Materials for Foundation Systems',
    headline: 'Engineered Materials for Foundation Systems',
    paragraphs: [
      'KVS Metals supplies steel materials for foundation engineering, precast concrete systems, and heavy construction projects across Dubai, UAE.',
      'From PC strand coils to structural steel products, we cater to applications requiring dimensional accuracy, tensile capability, and long-term structural stability in demanding construction environments.',
    ],
    bullets: [
      'PC strand & foundation materials',
      'Suitable for precast applications',
      'High-tensile steel solutions',
      'Built for heavy construction',
    ],
  },
  {
    slug: 'marine',
    name: 'Marine',
    img: '/market/marines-2.jpeg',
    tagline: 'Built for Demanding Marine Environments',
    headline: 'Built for Demanding Marine Environments',
    paragraphs: [
      'As a steel supplier in UAE serving marine and coastal industries, KVS Metals supplies steel and aluminium materials for shipbuilding, fabrication, coastal infrastructure, and marine engineering requirements.',
      'Our range is suited for challenging environments requiring corrosion resistance, durability, and consistent operational performance.',
    ],
    bullets: [
      'Steel & aluminium for marine use',
      'Suitable for coastal applications',
      'Multiple grades & dimensions available',
      'Marine & offshore material solutions',
    ],
  },
]

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug)
}

export function getAllSectorSlugs(): string[] {
  return sectors.map((s) => s.slug)
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getSearchTokens(value: string): string[] {
  return normalizeSearchText(value)
    .split(' ')
    .filter((token) => token.length > 0)
}

function getEditDistance(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  const dp = Array.from({ length: a.length + 1 }, (_, index) => new Array<number>(b.length + 1).fill(0))

  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      )
    }
  }

  return dp[a.length][b.length]
}

function tokenMatches(queryToken: string, candidateToken: string): boolean {
  if (!queryToken || !candidateToken) return false
  if (candidateToken.includes(queryToken) || queryToken.includes(candidateToken)) return true
  if (queryToken.length < 4 || candidateToken.length < 4) return false
  return getEditDistance(queryToken, candidateToken) <= 1
}

function scoreSearchMatch(query: string, fields: string[]): number {
  const normalizedQuery = normalizeSearchText(query)
  if (!normalizedQuery) return 0

  const normalizedFields = fields.map(normalizeSearchText).filter(Boolean)
  const joined = normalizedFields.join(' ')
  let score = 0

  if (joined.includes(normalizedQuery)) {
    score += normalizedQuery.length >= 5 ? 120 : 90
  }

  const queryTokens = getSearchTokens(normalizedQuery)
  if (queryTokens.length === 0) return score

  const fieldTokens = normalizedFields.flatMap(getSearchTokens)
  for (const token of queryTokens) {
    if (fieldTokens.some((candidate) => tokenMatches(token, candidate))) {
      score += 24
    }
  }

  for (const field of normalizedFields) {
    if (field.startsWith(normalizedQuery)) score += 30
  }

  return score
}

export function searchSectors(query: string, limit = 4): Sector[] {
  const q = query.trim()
  if (!q) return []

  return sectors
    .map((sector) => ({
      sector,
      score: scoreSearchMatch(q, [
        sector.name,
        sector.tagline,
        sector.headline,
        ...sector.paragraphs,
        ...sector.bullets,
      ]),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.sector.name.localeCompare(b.sector.name))
    .slice(0, limit)
    .map((entry) => entry.sector)
}
