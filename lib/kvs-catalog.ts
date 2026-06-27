export type KvsDemoProduct = {
  id: string
  slug: string
  title: string
  price: string
  rating: string
  img: string
  images: string[]
  category: string
  badge?: string
  shortDescription: string
  description: string
  features: string[]
  material?: string
  dimensions?: string
  sku: string
  reviewCount: number
  inStock: boolean
}

export type KvsProductCategory = {
  slug: string
  title: string
  img: string
  heroImg: string
  description: string
  headline: string
  paragraphs: string[]
  productSlugs: string[]
}

import {
  getKvsProductGallery,
  getKvsProductImage,
  kvsCategoryImageBySlug,
} from './product-images'

export const kvsProductCategories: KvsProductCategory[] = [
  {
    slug: 'hr-cr-coils-sheets-plates',
    title: 'HR/CR Coils, Sheets & Plates',
    img: kvsCategoryImageBySlug['hr-cr-coils-sheets-plates'].img,
    heroImg: kvsCategoryImageBySlug['hr-cr-coils-sheets-plates'].heroImg,
    description: 'Hot & cold rolled flat products',
    headline: 'SUPPLY HR/CR COILS, SHEETS AND PLATES FOR FABRICATION AND INDUSTRIAL APPLICATIONS.',
    paragraphs: [
      'Hot-rolled and cold-rolled coils, sheets, and plates form the core of steel fabrication across construction, manufacturing, and engineering projects.',
      'KVS Metals supplies multiple grades and thicknesses with cut-to-length service, mill certificates, and dependable coordination for contractors and fabricators in Dubai and the UAE.',
    ],
    productSlugs: ['hr-coils', 'ms-hr-sheets', 'ms-hr-plates'],
  },
  {
    slug: 'aluminium-coils-sheets-plates',
    title: 'Aluminium Coils, Sheets & Plates',
    img: kvsCategoryImageBySlug['aluminium-coils-sheets-plates'].img,
    heroImg: kvsCategoryImageBySlug['aluminium-coils-sheets-plates'].heroImg,
    description: 'Aluminium flat products',
    headline: 'ALUMINIUM COILS, SHEETS AND PLATES FOR CLADDING, FABRICATION AND INDUSTRIAL USE.',
    paragraphs: [
      'Aluminium flat products offer lightweight strength and corrosion resistance for cladding, transport, marine, and precision fabrication applications.',
      'We source aluminium coils, sheets, and plates in common alloys and tempers to support project-specific finishing and forming requirements.',
    ],
    productSlugs: ['aluminium-coils', 'aluminium-sheets'],
  },
  {
    slug: 'gi-ppgi-coils-sheets',
    title: 'GI/PPGI Coils & Sheets',
    img: kvsCategoryImageBySlug['gi-ppgi-coils-sheets'].img,
    heroImg: kvsCategoryImageBySlug['gi-ppgi-coils-sheets'].heroImg,
    description: 'Galvanized & pre-painted coils',
    headline: 'GI AND PPGI COILS AND SHEETS FOR ROOFING, CLADDING AND CORROSION-RESISTANT APPLICATIONS.',
    paragraphs: [
      'Galvanized and pre-painted steel coils and sheets protect structures from weather while enabling efficient installation for roofing and wall cladding.',
      'KVS Metals supplies corrugated profiles, plain sheets, and color-coated options with consistent coating quality and project-based dispatch.',
    ],
    productSlugs: ['gi-corrugated-roofing-sheets', 'ppgi-profile-sheets', 'gi-plain-sheets'],
  },
  {
    slug: 'precast-foundation-materials',
    title: 'Precast Foundation Materials',
    img: kvsCategoryImageBySlug['precast-foundation-materials'].img,
    heroImg: kvsCategoryImageBySlug['precast-foundation-materials'].heroImg,
    description: 'Foundation & precast supplies',
    headline: 'PRECAST AND FOUNDATION MATERIALS FOR DEMANDING CONSTRUCTION ENVIRONMENTS.',
    paragraphs: [
      'Foundation engineering and precast systems require materials with dimensional accuracy, tensile capability, and long-term structural stability.',
      'We supply PC strand, spacers, and related steel materials suited to heavy construction and precast concrete applications across the UAE.',
    ],
    productSlugs: ['pc-strand-coils', 'precast-spacers'],
  },
  {
    slug: 'angles',
    title: 'Angles',
    img: kvsCategoryImageBySlug.angles.img,
    heroImg: kvsCategoryImageBySlug.angles.heroImg,
    description: 'Equal & unequal angles',
    headline: 'STRUCTURAL ANGLES FOR FRAMES, BRACKETS AND FABRICATION WORK.',
    paragraphs: [
      'Steel angles provide versatile support for frames, brackets, towers, and welded assemblies in construction and industrial fabrication.',
      'Available in equal and unequal leg sizes with standard lengths and project-based cutting to meet load and compliance requirements.',
    ],
    productSlugs: ['ms-equal-angles', 'ms-angle-channels'],
  },
  {
    slug: 'bars',
    title: 'Bars',
    img: kvsCategoryImageBySlug.bars.img,
    heroImg: kvsCategoryImageBySlug.bars.heroImg,
    description: 'TMT & round bars',
    headline: 'REINFORCEMENT AND LONG BAR PRODUCTS FOR CONSTRUCTION AND INDUSTRIAL USE.',
    paragraphs: [
      'From TMT reinforcement bars to round bars for machining and fabrication, we supply certified bar products for RCC and industrial applications.',
      'KVS Metals supports contractors and stockists with consistent quality, accurate bundling, and responsive delivery coordination.',
    ],
    productSlugs: ['fe-500d-tmt-bars', 'ms-round-bars'],
  },
  {
    slug: 'channels',
    title: 'Channels',
    img: kvsCategoryImageBySlug.channels.img,
    heroImg: kvsCategoryImageBySlug.channels.heroImg,
    description: 'C & U channels',
    headline: 'MS CHANNELS FOR STRUCTURAL FRAMING, SUPPORTS AND FABRICATION.',
    paragraphs: [
      'Mild steel channels deliver reliable load-bearing performance for structural frames, equipment supports, and fabrication projects.',
      'Supplied in standard sizes and lengths with cut-to-length options for construction, infrastructure, and industrial clients.',
    ],
    productSlugs: ['ms-c-channels', 'ms-u-channels'],
  },
  {
    slug: 'structural-sections-beams',
    title: 'Structural Sections & Beams',
    img: kvsCategoryImageBySlug['structural-sections-beams'].img,
    heroImg: kvsCategoryImageBySlug['structural-sections-beams'].heroImg,
    description: 'H-beams, I-beams & sections',
    headline: 'STRUCTURAL SECTIONS AND BEAMS FOR HEAVY CONSTRUCTION AND ENGINEERING.',
    paragraphs: [
      'Structural sections and beams provide the primary strength for buildings, bridges, warehouses, and industrial structures.',
      'We supply H-beams, I-beams, and related sections from certified sources with documentation for EPC and structural contractors.',
    ],
    productSlugs: ['ms-h-beams', 'universal-beams'],
  },
  {
    slug: 'mesh-gi-gratings',
    title: 'Mesh & GI Gratings',
    img: kvsCategoryImageBySlug['mesh-gi-gratings'].img,
    heroImg: kvsCategoryImageBySlug['mesh-gi-gratings'].heroImg,
    description: 'Welded mesh & gratings',
    headline: 'MESH AND GI GRATINGS FOR FLOORING, FENCING AND INDUSTRIAL PLATFORMS.',
    paragraphs: [
      'Welded wire mesh and galvanized gratings serve flooring, drainage covers, fencing, and platform applications in industrial environments.',
      'Available in multiple mesh sizes, bar spacings, and finishes to suit site safety and load requirements.',
    ],
    productSlugs: ['gi-gratings', 'welded-wire-mesh'],
  },
]

export const kvsDemoProducts: KvsDemoProduct[] = [
  {
    id: 'kvs-101',
    slug: 'hr-coils',
    title: 'HR Steel Coils',
    price: 'On request',
    rating: '4.8',
    img: getKvsProductImage('hr-coils')!,
    images: getKvsProductGallery('hr-coils'),
    category: 'HR/CR Coils, Sheets & Plates',
    shortDescription: 'HOT-ROLLED STEEL COILS FOR ROLL-FORMING, FABRICATION AND INDUSTRIAL PROCESSING.',
    description:
      'Hot-rolled coils supplied in commercial and structural grades for roll-forming, pipe making, and general fabrication. Available in multiple widths and thicknesses with mill certificates.',
    features: ['Multiple grades available', 'Cut-to-length on request', 'Mill test certificates', 'Bulk project supply'],
    material: 'Mild Steel (HR)',
    sku: 'KVS-HR-101',
    reviewCount: 64,
    inStock: true,
  },
  {
    id: 'kvs-102',
    slug: 'aluminium-coils',
    title: 'Aluminium Coils',
    price: 'On request',
    rating: '4.7',
    img: getKvsProductImage('aluminium-coils')!,
    images: getKvsProductGallery('aluminium-coils'),
    category: 'Aluminium Coils, Sheets & Plates',
    shortDescription: 'ALUMINIUM COILS FOR CLADDING, TRANSPORT AND PRECISION FABRICATION APPLICATIONS.',
    description:
      'Aluminium coils in common alloys for roofing, cladding, automotive, and fabrication use. Supplied with protective coating and project-based slitting options.',
    features: ['Common alloy grades', 'Slitting service', 'Lightweight & corrosion resistant', 'Export documentation'],
    material: 'Aluminium',
    sku: 'KVS-AL-102',
    reviewCount: 41,
    inStock: true,
  },
  {
    id: 'kvs-103',
    slug: 'aluminium-sheets',
    title: 'Aluminium Sheets & Plates',
    price: 'On request',
    rating: '4.8',
    img: getKvsProductImage('aluminium-sheets')!,
    images: getKvsProductGallery('aluminium-sheets'),
    category: 'Aluminium Coils, Sheets & Plates',
    shortDescription: 'FLAT ALUMINIUM SHEETS AND PLATES FOR INDUSTRIAL AND ARCHITECTURAL PROJECTS.',
    description:
      'Flat aluminium sheets and plates for panels, signs, marine fittings, and machined components. Multiple thicknesses and tempers available on request.',
    features: ['Sheet & plate range', 'Cut-to-size', 'Architectural & industrial grades', 'UAE stock coordination'],
    material: 'Aluminium',
    sku: 'KVS-AL-103',
    reviewCount: 38,
    inStock: true,
  },
  {
    id: 'kvs-104',
    slug: 'pc-strand-coils',
    title: 'PC Strand Coils',
    price: 'On request',
    rating: '4.9',
    img: getKvsProductImage('pc-strand-coils')!,
    images: getKvsProductGallery('pc-strand-coils'),
    category: 'Precast Foundation Materials',
    badge: 'High Tensile',
    shortDescription: 'PRESTRESSED CONCRETE STRAND COILS FOR FOUNDATION AND PRECAST APPLICATIONS.',
    description:
      'PC strand coils for precast concrete, post-tensioning, and foundation systems requiring high tensile strength and dimensional consistency.',
    features: ['High-tensile strand', 'Suitable for precast', 'Coil & cut lengths', 'Project documentation'],
    material: 'Prestressed Steel Strand',
    sku: 'KVS-PC-104',
    reviewCount: 55,
    inStock: true,
  },
  {
    id: 'kvs-105',
    slug: 'precast-spacers',
    title: 'Precast Spacers & Accessories',
    price: 'On request',
    rating: '4.6',
    img: getKvsProductImage('precast-spacers')!,
    images: getKvsProductGallery('precast-spacers'),
    category: 'Precast Foundation Materials',
    shortDescription: 'PRECAST SPACERS AND REINFORCEMENT ACCESSORIES FOR CONCRETE ELEMENT PRODUCTION.',
    description:
      'Plastic and steel spacers, chairs, and accessories supporting reinforcement placement in precast and in-situ concrete work.',
    features: ['Multiple cover depths', 'Precast-friendly', 'Bulk site packs', 'Consistent supply'],
    material: 'Steel & polymer',
    sku: 'KVS-PC-105',
    reviewCount: 29,
    inStock: true,
  },
  {
    id: 'kvs-106',
    slug: 'ms-equal-angles',
    title: 'MS Equal Angles',
    price: 'On request',
    rating: '4.8',
    img: getKvsProductImage('ms-equal-angles')!,
    images: getKvsProductGallery('ms-equal-angles'),
    category: 'Angles',
    shortDescription: 'EQUAL LEG MS ANGLES FOR STRUCTURAL BRACKETS, TOWERS AND FABRICATION.',
    description:
      'Equal-leg mild steel angles manufactured to recognized standards for frames, supports, and welded assemblies across construction and industrial projects.',
    features: ['IS / ASTM grades', 'Standard lengths', 'Cut-to-size', 'Bulk supply'],
    material: 'Mild Steel (MS)',
    sku: 'KVS-AN-106',
    reviewCount: 72,
    inStock: true,
  },
  {
    id: 'kvs-107',
    slug: 'ms-round-bars',
    title: 'MS Round Bars',
    price: 'On request',
    rating: '4.7',
    img: getKvsProductImage('ms-round-bars')!,
    images: getKvsProductGallery('ms-round-bars'),
    category: 'Bars',
    shortDescription: 'MILD STEEL ROUND BARS FOR MACHINING, FABRICATION AND GENERAL ENGINEERING.',
    description:
      'MS round bars in multiple diameters for shafts, pins, fabrication, and general engineering. Supplied in standard lengths with cutting service.',
    features: ['Multiple diameters', 'Machining suitable', 'Standard mill lengths', 'Project dispatch'],
    material: 'Mild Steel (MS)',
    sku: 'KVS-BR-107',
    reviewCount: 48,
    inStock: true,
  },
  {
    id: 'kvs-108',
    slug: 'ms-c-channels',
    title: 'MS C Channels',
    price: 'On request',
    rating: '4.8',
    img: getKvsProductImage('ms-c-channels')!,
    images: getKvsProductGallery('ms-c-channels'),
    category: 'Channels',
    shortDescription: 'C-CHANNEL SECTIONS FOR STRUCTURAL FRAMES, PURLINS AND EQUIPMENT SUPPORTS.',
    description:
      'Mild steel C-channels for purlins, frames, and equipment supports. Available in standard depths and thicknesses with project-based cutting.',
    features: ['Structural grades', 'Standard & custom lengths', 'IS certified options', 'Fast availability'],
    material: 'Mild Steel (MS)',
    sku: 'KVS-CH-108',
    reviewCount: 61,
    inStock: true,
  },
  {
    id: 'kvs-109',
    slug: 'ms-u-channels',
    title: 'MS U Channels',
    price: 'On request',
    rating: '4.7',
    img: getKvsProductImage('ms-u-channels')!,
    images: getKvsProductGallery('ms-u-channels'),
    category: 'Channels',
    shortDescription: 'U-CHANNEL SECTIONS FOR FRAMING, GUIDES AND FABRICATION APPLICATIONS.',
    description:
      'U-channel sections for framing, guides, and light structural applications. Supplied in commercial and structural grades for UAE projects.',
    features: ['Multiple sizes', 'Cut-to-length', 'Fabrication ready', 'Competitive pricing'],
    material: 'Mild Steel (MS)',
    sku: 'KVS-CH-109',
    reviewCount: 44,
    inStock: true,
  },
  {
    id: 'kvs-110',
    slug: 'universal-beams',
    title: 'Universal Beams (I-Beams)',
    price: 'On request',
    rating: '4.9',
    img: getKvsProductImage('universal-beams')!,
    images: getKvsProductGallery('universal-beams'),
    category: 'Structural Sections & Beams',
    shortDescription: 'UNIVERSAL BEAMS FOR HEAVY STRUCTURAL AND INDUSTRIAL CONSTRUCTION PROJECTS.',
    description:
      'Universal beams in standard serial sizes for buildings, warehouses, and bridge components. Sourced with mill certificates and project coordination.',
    features: ['Standard serial sizes', 'Heavy structural grades', 'Mill certificates', 'EPC supply support'],
    material: 'Structural Steel',
    sku: 'KVS-BM-110',
    reviewCount: 83,
    inStock: true,
  },
  {
    id: 'kvs-111',
    slug: 'gi-gratings',
    title: 'GI Gratings',
    price: 'On request',
    rating: '4.8',
    img: getKvsProductImage('gi-gratings')!,
    images: getKvsProductGallery('gi-gratings'),
    category: 'Mesh & GI Gratings',
    shortDescription: 'GALVANIZED GRATINGS FOR PLATFORMS, TRENCH COVERS AND INDUSTRIAL FLOORING.',
    description:
      'Hot-dip galvanized gratings for walkways, platforms, and drainage covers in industrial and marine environments.',
    features: ['Anti-slip options', 'Custom panel sizes', 'Corrosion resistant', 'Site delivery'],
    material: 'Galvanized Steel',
    sku: 'KVS-GR-111',
    reviewCount: 57,
    inStock: true,
  },
  {
    id: 'kvs-112',
    slug: 'welded-wire-mesh',
    title: 'Welded Wire Mesh',
    price: 'On request',
    rating: '4.7',
    img: getKvsProductImage('welded-wire-mesh')!,
    images: getKvsProductGallery('welded-wire-mesh'),
    category: 'Mesh & GI Gratings',
    shortDescription: 'WELDED WIRE MESH FOR REINFORCEMENT, FENCING AND INDUSTRIAL SCREENING.',
    description:
      'Welded wire mesh panels and rolls for concrete reinforcement, fencing, and screening applications with multiple wire diameters and openings.',
    features: ['Roll & panel supply', 'Multiple openings', 'GI & black options', 'Bulk quantities'],
    material: 'Mild Steel Wire',
    sku: 'KVS-MS-112',
    reviewCount: 46,
    inStock: true,
  },
]

export function getKvsCategoryHref(slug: string): string {
  return `/products?category=${slug}`
}

export const productHighlights = kvsProductCategories.map((category) => ({
  title: category.title,
  slug: category.slug,
  img: category.img,
  href: getKvsCategoryHref(category.slug),
}))

export const productMarqueeTerms = kvsProductCategories.map((item) =>
  item.title.toUpperCase(),
)
