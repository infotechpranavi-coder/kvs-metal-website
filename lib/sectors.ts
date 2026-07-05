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
      'As a leading steel supplier in Dubai, UAE, KVS Metals supplies structural and industrial steel materials for commercial buildings, civil engineering, warehouses, fabrication units, and infrastructure developments. From steel sections and pipes to coils, sheets, and reinforcement materials, we help businesses maintain continuity with timely material flow and practical procurement coordination.',
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
      'KVS Metals supplies industrial steel materials for demanding oil and gas environments across Dubai and the UAE. Our corrosion-resistant and high-tensile steel products are suitable for pipelines, storage systems, processing facilities, and offshore or onshore applications where precision, compliance, and operational performance are essential.',
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
      'KVS Metals supplies steel materials for foundation engineering, precast concrete systems, and heavy construction projects across Dubai, UAE. From PC strand coils to structural steel products, we cater to applications requiring dimensional accuracy, tensile capability, and long-term structural stability in demanding construction environments.',
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
      'As a steel supplier in UAE serving marine and coastal industries, KVS Metals supplies steel and aluminium materials for shipbuilding, fabrication, coastal infrastructure, and marine engineering requirements. Our range is suited for challenging environments requiring corrosion resistance, durability, and consistent operational performance.',
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

export function searchSectors(query: string, limit = 4): Sector[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  return sectors
    .filter(
      (sector) =>
        sector.name.toLowerCase().includes(q) ||
        sector.tagline.toLowerCase().includes(q) ||
        sector.headline.toLowerCase().includes(q) ||
        sector.paragraphs.some((p) => p.toLowerCase().includes(q)) ||
        sector.bullets.some((b) => b.toLowerCase().includes(q)),
    )
    .slice(0, limit)
}
