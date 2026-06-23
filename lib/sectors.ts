export type Sector = {
  slug: string
  name: string
  img: string
  headline: string
  paragraphs: string[]
}

export const sectors: Sector[] = [
  {
    slug: 'construction',
    name: 'Construction',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85',
    headline: 'ESTABLISH A ROBUST STEEL FOUNDATION FOR YOUR CONSTRUCTION OR CIVIL PROJECTS.',
    paragraphs: [
      'Steel produced in sophisticated mills is crafted into various forms including bars, beams, and durable plates. These materials are essential for constructing buildings, bridges, and other infrastructure projects.',
      'Our extensive range of products adheres to international standards, ensuring superior quality and performance. We offer a comprehensive selection of steel products tailored to meet the diverse needs of the construction industry.',
      'Through collaborative efforts, we deliver comprehensive steel solutions that cater to the specific requirements of construction projects, ensuring structural integrity and longevity.',
    ],
  },
  {
    slug: 'marine',
    name: 'Marine',
    img: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1400&q=85',
    headline: 'DELIVER CORROSION-RESISTANT METAL SOLUTIONS FOR MARINE AND SHIPBUILDING PROJECTS.',
    paragraphs: [
      'Marine environments demand metals that withstand saltwater, humidity, and extreme weather. We supply stainless steel, coated plates, and specialty alloys engineered for docks, vessels, and offshore structures.',
      'Our marine-grade products meet rigorous industry standards for durability and corrosion resistance. From hull plating to deck fittings, KVS Metal provides materials built to perform in demanding sea conditions.',
      'Partner with us for reliable supply, technical guidance, and metal products that keep marine infrastructure safe, strong, and long-lasting.',
    ],
  },
  {
    slug: 'oil-gas',
    name: 'Oil & Gas',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=85',
    headline: 'POWER CRITICAL ENERGY INFRASTRUCTURE WITH HIGH-PERFORMANCE STEEL AND PIPE SYSTEMS.',
    paragraphs: [
      'The oil and gas sector requires precision-engineered pipes, pressure vessels, and structural steel that meet strict safety and performance standards across refineries, pipelines, and processing plants.',
      'KVS Metal supplies certified pipes, flanges, plates, and fabricated components designed for high-pressure and high-temperature applications in energy production and distribution.',
      'We support energy projects with dependable logistics, quality-assured materials, and a product range tailored to upstream, midstream, and downstream operations.',
    ],
  },
  {
    slug: 'foundation',
    name: 'Foundation',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=85',
    headline: 'BUILD STRONGER FOUNDATIONS WITH STRUCTURAL STEEL FOR DEEP AND CIVIL ENGINEERING WORKS.',
    paragraphs: [
      'Foundation and piling projects depend on high-strength steel sheet piles, H-beams, anchors, and reinforcement that provide stability in challenging soil and load conditions.',
      'Our foundation-grade metals are sourced from trusted mills and tested for consistency, helping engineers and contractors deliver safe, durable substructures for buildings, bridges, and industrial sites.',
      'From sheet piling to heavy structural sections, KVS Metal delivers the materials and support needed to anchor ambitious civil and infrastructure projects with confidence.',
    ],
  },
]

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug)
}

export function getAllSectorSlugs(): string[] {
  return sectors.map((s) => s.slug)
}
