export type Product = {
  id: string
  slug: string
  title: string
  price: string
  rating: string
  img: string
  images: string[]
  category: string
  badge?: string
  compareAt?: string
  shortDescription: string
  description: string
  features: string[]
  material?: string
  dimensions?: string
  sku: string
  reviewCount: number
  inStock: boolean
  stockCount?: number
  warranty?: string
  isNew?: boolean
  isLimited?: boolean
}

export type Category = {
  title: string
  slug: string
  count: string
  img: string
  size: 'large' | 'medium' | 'wide'
  description: string
}

export type LimitedProduct = {
  slug: string
  title: string
  price: string
  img: string
  units: string
  description: string
}

const homepageProductSlugs = [
  'gi-corrugated-roofing-sheets',
  'ms-angle-channels',
  'stainless-steel-pipes',
  'ms-hr-sheets',
  'gi-plain-sheets',
  'ms-h-beams',
  'ms-seamless-pipes',
  'gi-pipes-tubes',
  'carbon-steel-flanges',
  'forged-pipe-fittings',
  'ppgi-profile-sheets',
  'ms-hr-plates',
  'fe-500d-tmt-bars',
  'structural-steel-fabrication',
  'custom-sheet-fabrication',
] as const

const catalog: Product[] = [
  {
    id: 'kvs-001',
    slug: 'gi-corrugated-roofing-sheets',
    title: 'GI Corrugated Roofing Sheets',
    price: 'On request',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
    ],
    category: 'Roofing',
    badge: 'Popular',
    shortDescription: 'DURABLE GI CORRUGATED SHEETS FOR INDUSTRIAL, COMMERCIAL, AND RESIDENTIAL ROOFING PROJECTS.',
    description:
      'Our galvanized iron corrugated roofing sheets deliver excellent weather resistance, long service life, and consistent profile accuracy. Available in multiple thicknesses for warehouses, factories, farm structures, and modern building envelopes.',
    features: [
      'Hot-dip galvanized coating',
      'Corrosion-resistant finish',
      'Multiple thickness options (0.4–0.8mm)',
      'Cut-to-length supply available',
    ],
    material: 'Galvanized Iron (GI)',
    dimensions: '0.4mm – 0.8mm thickness',
    sku: 'KVS-RS-001',
    reviewCount: 128,
    inStock: true,
  },
  {
    id: 'kvs-002',
    slug: 'ms-angle-channels',
    title: 'MS Angle & Channels',
    price: 'On request',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
      'https://images.unsplash.com/photo-1581094271901-ef2a9a7a8729?w=900&q=80',
    ],
    category: 'Longs',
    badge: 'IS Certified',
    shortDescription: 'HIGH-STRENGTH MS ANGLES AND CHANNELS FOR STRUCTURAL FRAMING AND FABRICATION WORK.',
    description:
      'Manufactured to IS 2062 standards, our mild steel angles and channels provide reliable load-bearing performance for construction, infrastructure, and industrial fabrication. Supplied in standard lengths with custom cutting on request.',
    features: [
      'IS 2062 Grade steel',
      'Uniform dimensional tolerance',
      'Ideal for frames and supports',
      'Bulk and project supply',
    ],
    material: 'Mild Steel (MS)',
    dimensions: 'Standard & custom lengths',
    sku: 'KVS-ST-002',
    reviewCount: 96,
    inStock: true,
  },
  {
    id: 'kvs-003',
    slug: 'stainless-steel-pipes',
    title: 'Stainless Steel Pipes',
    price: 'On request',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=900&q=80',
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80',
    ],
    category: 'Tubulars',
    badge: 'SS 304 / 316',
    shortDescription: 'PREMIUM STAINLESS STEEL PIPES FOR INDUSTRIAL, MARINE, AND PROCESS APPLICATIONS.',
    description:
      'We supply SS 304 and SS 316 stainless steel pipes engineered for corrosion resistance, pressure handling, and long-term reliability. Suitable for chemical processing, marine environments, food-grade lines, and architectural installations.',
    features: [
      'SS 304 and SS 316 grades',
      'Seamless and welded options',
      'Corrosion-resistant performance',
      'Project-based bulk supply',
    ],
    material: 'Stainless Steel',
    dimensions: 'Multiple diameters & schedules',
    sku: 'KVS-PT-003',
    reviewCount: 112,
    inStock: true,
  },
  {
    id: 'kvs-004',
    slug: 'ms-hr-sheets',
    title: 'MS HR Sheets',
    price: 'On request',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80'],
    category: 'Flats',
    shortDescription: 'HOT-ROLLED MILD STEEL SHEETS FOR FABRICATION, FLOORING, AND GENERAL ENGINEERING.',
    description:
      'Our MS hot-rolled sheets offer consistent thickness, clean edges, and dependable formability for fabrication shops, structural cladding, and industrial applications. Supplied in standard widths with cut-to-size options.',
    features: ['IS 2062 grade options', 'Multiple thicknesses', 'Cut-to-size supply', 'Mill test certificates'],
    material: 'Mild Steel (MS)',
    dimensions: '1.6mm – 25mm thickness',
    sku: 'KVS-FL-004',
    reviewCount: 84,
    inStock: true,
  },
  {
    id: 'kvs-005',
    slug: 'gi-plain-sheets',
    title: 'GI Plain Sheets',
    price: 'On request',
    rating: '4.7',
    img: 'https://images.unsplash.com/photo-1581094271901-ef2a9a7a8729?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1581094271901-ef2a9a7a8729?w=900&q=80'],
    category: 'Flats',
    shortDescription: 'GALVANIZED PLAIN SHEETS WITH CORROSION-RESISTANT COATING FOR DURABLE APPLICATIONS.',
    description:
      'GI plain sheets deliver excellent corrosion protection for enclosures, ducting, panels, and light structural work. Available in multiple coating weights and thicknesses for indoor and outdoor use.',
    features: ['Hot-dip galvanized', 'Smooth plain finish', 'Custom lengths', 'Bulk project supply'],
    material: 'Galvanized Iron (GI)',
    dimensions: '0.4mm – 3mm thickness',
    sku: 'KVS-FL-005',
    reviewCount: 71,
    inStock: true,
  },
  {
    id: 'kvs-006',
    slug: 'ms-h-beams',
    title: 'MS H-Beams',
    price: 'On request',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80'],
    category: 'Longs',
    shortDescription: 'HEAVY-SECTION H-BEAMS FOR PRIMARY STRUCTURAL FRAMES AND INDUSTRIAL BUILDINGS.',
    description:
      'Engineered for high load-bearing performance, our MS H-beams support warehouses, bridges, and multi-storey structures. Supplied in standard lengths with project-based cutting and documentation.',
    features: ['IS-certified grades', 'Wide section range', 'Structural framing ready', 'Project supply'],
    material: 'Mild Steel (MS)',
    dimensions: 'Standard & custom lengths',
    sku: 'KVS-LG-006',
    reviewCount: 88,
    inStock: true,
  },
  {
    id: 'kvs-007',
    slug: 'ms-seamless-pipes',
    title: 'MS Seamless Pipes',
    price: 'On request',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80'],
    category: 'Tubulars',
    shortDescription: 'SEAMLESS MS PIPES FOR FLUID TRANSPORT, MACHINING, AND PRESSURE APPLICATIONS.',
    description:
      'Manufactured for strength and uniformity, our seamless MS pipes suit mechanical, hydraulic, and general engineering lines. Available in multiple schedules with bulk supply for project sites.',
    features: ['Seamless construction', 'Multiple schedules', 'Pressure-rated options', 'Cut-to-length service'],
    material: 'Mild Steel (MS)',
    dimensions: 'Multiple diameters',
    sku: 'KVS-TB-007',
    reviewCount: 79,
    inStock: true,
  },
  {
    id: 'kvs-008',
    slug: 'gi-pipes-tubes',
    title: 'GI Pipes & Tubes',
    price: 'On request',
    rating: '4.7',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80'],
    category: 'Tubulars',
    shortDescription: 'GALVANIZED PIPES AND TUBES FOR WATER, FENCING, AND LIGHT STRUCTURAL USE.',
    description:
      'GI pipes and tubes combine corrosion resistance with easy installation for plumbing, fencing, greenhouse structures, and utility projects. Supplied in standard lengths with threaded options.',
    features: ['Hot-dip galvanized', 'Threaded ends available', 'Light structural use', 'Consistent wall thickness'],
    material: 'Galvanized Iron (GI)',
    dimensions: '15mm – 150mm nominal bore',
    sku: 'KVS-TB-008',
    reviewCount: 93,
    inStock: true,
  },
  {
    id: 'kvs-009',
    slug: 'carbon-steel-flanges',
    title: 'Carbon Steel Flanges',
    price: 'On request',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80'],
    category: 'Fittings',
    shortDescription: 'FORGED AND WELDED FLANGES FOR PIPELINE, PROCESS, AND INDUSTRIAL CONNECTIONS.',
    description:
      'Our carbon steel flanges are supplied for welding neck, slip-on, blind, and socket weld configurations. Ideal for oil & gas, chemical, and utility piping systems requiring reliable joints.',
    features: ['Multiple flange types', 'Pressure class options', 'Bore matching', 'Project documentation'],
    material: 'Carbon Steel',
    sku: 'KVS-FT-009',
    reviewCount: 67,
    inStock: true,
  },
  {
    id: 'kvs-010',
    slug: 'forged-pipe-fittings',
    title: 'Forged Pipe Fittings',
    price: 'On request',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=900&q=80'],
    category: 'Fittings',
    shortDescription: 'ELBOWS, TEES, REDUCERS, AND COUPLINGS FOR HIGH-INTEGRITY PIPELINE SYSTEMS.',
    description:
      'Forged fittings deliver superior mechanical strength for demanding process lines. We stock common sizes in carbon and alloy grades with sourcing support for specialty configurations.',
    features: ['Elbows, tees, reducers', 'Threaded & socket weld', 'High-pressure rated', 'Fast project dispatch'],
    material: 'Forged Steel',
    sku: 'KVS-FT-010',
    reviewCount: 74,
    inStock: true,
  },
  {
    id: 'kvs-011',
    slug: 'ppgi-profile-sheets',
    title: 'PPGI Profile Sheets',
    price: 'On request',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80'],
    category: 'Roofing',
    shortDescription: 'PRE-PAINTED GALVANIZED PROFILE SHEETS FOR MODERN ROOFING AND CLADDING.',
    description:
      'PPGI profile sheets combine color-coated aesthetics with galvanized protection for factories, warehouses, and commercial buildings. Available in multiple profiles and color options.',
    features: ['Pre-painted finish', 'Multiple profiles', 'Weather resistant', 'Cut-to-length supply'],
    material: 'Pre-Painted Galvanized Iron',
    dimensions: '0.35mm – 0.8mm thickness',
    sku: 'KVS-RF-011',
    reviewCount: 102,
    inStock: true,
  },
  {
    id: 'kvs-012',
    slug: 'ms-hr-plates',
    title: 'MS HR Plates',
    price: 'On request',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80'],
    category: 'Plates',
    shortDescription: 'HEAVY-DUTY HOT-ROLLED PLATES FOR STRUCTURAL, MACHINING, AND FABRICATION WORK.',
    description:
      'MS HR plates provide the strength and thickness range needed for base plates, machinery beds, tanks, and heavy fabrication. Supplied with mill certificates and cut-to-size service.',
    features: ['Wide thickness range', 'IS grade options', 'Cut-to-size', 'Mill test certificates'],
    material: 'Mild Steel (MS)',
    dimensions: '6mm – 100mm thickness',
    sku: 'KVS-PL-012',
    reviewCount: 81,
    inStock: true,
  },
  {
    id: 'kvs-013',
    slug: 'fe-500d-tmt-bars',
    title: 'FE 500D TMT Bars',
    price: 'On request',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80'],
    category: 'TMT Bars',
    badge: 'IS 1786',
    shortDescription: 'HIGH-DUCTILITY TMT BARS FOR EARTHQUAKE-RESISTANT RCC CONSTRUCTION.',
    description:
      'FE 500D TMT bars offer superior elongation and bendability for residential, commercial, and infrastructure concrete work. Sourced from trusted mills with full test documentation.',
    features: ['IS 1786 compliant', 'Superior ductility', 'Corrosion resistant rib pattern', 'Bulk site delivery'],
    material: 'Thermo-Mechanically Treated Steel',
    dimensions: '8mm – 32mm diameters',
    sku: 'KVS-TM-013',
    reviewCount: 146,
    inStock: true,
  },
  {
    id: 'kvs-014',
    slug: 'structural-steel-fabrication',
    title: 'Structural Steel Fabrication',
    price: 'On request',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=900&q=80'],
    category: 'Fabrication',
    shortDescription: 'CUSTOM FABRICATED STEEL STRUCTURES, FRAMES, AND ASSEMBLIES BUILT TO DRAWING.',
    description:
      'From trusses and platforms to skids and support frames, our fabrication team delivers precision-welded assemblies with quality checks at every stage. Ideal for industrial and construction projects.',
    features: ['Drawing-based fabrication', 'Welding & assembly', 'Surface finishing options', 'Site delivery support'],
    material: 'Mild & Structural Steel',
    sku: 'KVS-FB-014',
    reviewCount: 58,
    inStock: true,
  },
  {
    id: 'kvs-015',
    slug: 'custom-sheet-fabrication',
    title: 'Custom Sheet Fabrication',
    price: 'On request',
    rating: '4.7',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=80'],
    category: 'Fabrication',
    shortDescription: 'LASER-CUT, BENT, AND WELDED SHEET METAL COMPONENTS TO YOUR SPECIFICATIONS.',
    description:
      'We produce brackets, panels, enclosures, and custom sheet parts with accurate cutting and forming. Suitable for OEM, MEP, and industrial equipment manufacturers.',
    features: ['Laser & plasma cutting', 'Bending & rolling', 'Welded assemblies', 'Prototype to batch runs'],
    material: 'MS, GI, SS sheets',
    sku: 'KVS-FB-015',
    reviewCount: 52,
    inStock: true,
  },
  {
    id: 'rx-001',
    slug: 'noir-ceramic-ritual-set',
    title: 'Noir Ceramic Ritual Set',
    price: '$148',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=900&q=80',
      'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=900&q=80',
      'https://images.unsplash.com/photo-1602874801006-1f7b6611c7e3?w=900&q=80',
    ],
    category: 'Home Essentials',
    badge: 'Best Seller',
    shortDescription: 'A matte-black ceramic trio for morning rituals and evening wind-down.',
    description: 'Crafted from high-fired stoneware with a satin matte glaze, the Noir Ceramic Ritual Set brings quiet luxury to your countertop. Includes a lidded jar, pour vessel, and tray — designed to coordinate with modern kitchens and spa-inspired bathrooms alike.',
    features: ['Hand-glazed stoneware', 'Dishwasher safe', 'Gift-ready packaging', 'Coordinates with Noir collection'],
    material: 'High-fired stoneware',
    dimensions: 'Tray 28 × 18 cm',
    sku: 'RX-HE-001',
    reviewCount: 284,
    inStock: true,
    warranty: '1 year craftsmanship guarantee',
  },
  {
    id: 'rx-002',
    slug: 'atelier-leather-carryall',
    title: 'Atelier Leather Carryall',
    price: '$286',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=900&q=80',
    ],
    category: 'Travel Collection',
    badge: 'Top Rated',
    shortDescription: 'Full-grain leather weekender with reinforced handles and interior pockets.',
    description: 'Built for short escapes and daily commutes, the Atelier Leather Carryall combines supple full-grain leather with a structured silhouette. Interior dividers keep essentials organized; exterior zip pocket secures travel documents.',
    features: ['Full-grain vegetable-tanned leather', 'Removable shoulder strap', 'Interior zip pocket', 'Brass hardware'],
    material: 'Full-grain leather',
    dimensions: '42 × 28 × 18 cm',
    sku: 'RX-TC-002',
    reviewCount: 196,
    inStock: true,
    warranty: '2 year leather care guarantee',
  },
  {
    id: 'rx-003',
    slug: 'linen-lounge-throw',
    title: 'Linen Lounge Throw',
    price: '$124',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1583845112203-29329902330b?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1583845112203-29329902330b?w=900&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=900&q=80',
      'https://images.unsplash.com/photo-1615874694520-474822394e73?w=900&q=80',
    ],
    category: 'Home Essentials',
    badge: 'Best Seller',
    shortDescription: 'Stone-washed European linen throw with a relaxed drape and breathable weave.',
    description: 'Woven from Belgian flax and stone-washed for softness from day one. The Linen Lounge Throw layers beautifully on sofas and beds, offering year-round comfort with a naturally textured finish that improves with every wash.',
    features: ['100% European flax linen', 'Pre-washed for softness', 'OEKO-TEX certified dyes', 'Machine washable'],
    material: 'Belgian flax linen',
    dimensions: '150 × 200 cm',
    sku: 'RX-HE-003',
    reviewCount: 312,
    inStock: true,
  },
  {
    id: 'rx-004',
    slug: 'brushed-gold-tray',
    title: 'Brushed Gold Tray',
    price: '$96',
    rating: '5.0',
    img: 'https://images.unsplash.com/photo-1602874801006-1f7b6611c7e3?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1602874801006-1f7b6611c7e3?w=900&q=80',
      'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=900&q=80',
    ],
    category: 'Lifestyle Collection',
    badge: 'New',
    isNew: true,
    shortDescription: 'Brushed brass vanity tray for jewelry, candles, and curated vignettes.',
    description: 'A sculptural accent piece finished in brushed gold-tone brass. Use it to corral everyday objects on a dresser, coffee table, or entryway — the subtle sheen catches light without overpowering your space.',
    features: ['Brushed brass finish', 'Felt base protects surfaces', 'Tarnish-resistant coating', 'Hand-finished edges'],
    material: 'Brass with protective coating',
    dimensions: '32 × 18 × 3 cm',
    sku: 'RX-LC-004',
    reviewCount: 87,
    inStock: true,
  },
  {
    id: 'rx-005',
    slug: 'stonewashed-linen-set',
    title: 'Stonewashed Linen Set',
    price: '$168',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1615874694520-474822394e73?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1615874694520-474822394e73?w=900&q=80',
      'https://images.unsplash.com/photo-1583845112203-29329902330b?w=900&q=80',
    ],
    category: 'Home Essentials',
    badge: 'New Season',
    isNew: true,
    shortDescription: 'Four-piece linen bedding set in a calming neutral palette.',
    description: 'Elevate your bedroom with stonewashed linen that feels lived-in from the first night. Set includes duvet cover, two pillowcases, and a fitted sheet — all designed for breathability and a relaxed, hotel-quality drape.',
    features: ['100% stonewashed linen', 'Envelope closure pillowcases', 'Deep-pocket fitted sheet', 'Gets softer over time'],
    material: 'European linen',
    dimensions: 'Queen size set',
    sku: 'RX-HE-005',
    reviewCount: 143,
    inStock: true,
  },
  {
    id: 'rx-006',
    slug: 'smoked-glass-vessel',
    title: 'Smoked Glass Vessel',
    price: '$82',
    rating: '4.7',
    img: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=900&q=80',
      'https://images.unsplash.com/photo-1603006905004-6a8d7c8f3f0e?w=900&q=80',
    ],
    category: 'Home Essentials',
    badge: 'New Season',
    isNew: true,
    shortDescription: 'Hand-blown smoked glass vase with a tapered silhouette.',
    description: 'Each vessel is mouth-blown by artisans, giving every piece subtle variations in tone and form. The smoked finish adds depth and pairs effortlessly with dried botanicals, fresh stems, or as a standalone sculptural object.',
    features: ['Mouth-blown glass', 'Unique artisan variations', 'Wide stable base', 'Indoor display piece'],
    material: 'Hand-blown glass',
    dimensions: 'H 24 cm × Ø 12 cm',
    sku: 'RX-HE-006',
    reviewCount: 76,
    inStock: true,
  },
  {
    id: 'rx-007',
    slug: 'soft-grain-card-holder',
    title: 'Soft Grain Card Holder',
    price: '$74',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=900&q=80',
    ],
    category: 'Luxury Accessories',
    badge: 'New Season',
    isNew: true,
    shortDescription: 'Slim leather card case with six slots and a central pocket.',
    description: 'Minimalist carry for cards and folded notes. Soft-grain leather develops a rich patina over time, while precise stitching and a reinforced spine keep the profile slim enough for any pocket.',
    features: ['6 card slots + center pocket', 'Develops natural patina', 'RFID lining optional', 'Gift box included'],
    material: 'Soft-grain calfskin leather',
    dimensions: '10 × 7.5 cm',
    sku: 'RX-LA-007',
    reviewCount: 118,
    inStock: true,
  },
  {
    id: 'rx-008',
    slug: 'minimal-desk-object',
    title: 'Minimal Desk Object',
    price: '$118',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=900&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80',
    ],
    category: 'Lifestyle Collection',
    badge: 'New Season',
    isNew: true,
    shortDescription: 'Sculptural concrete and oak desk organizer for pens and small essentials.',
    description: 'A study in balance — cast concrete base meets warm oak dividers. Keeps your workspace intentional without visual clutter. Ideal for pens, phone, keys, and the small objects that deserve a proper home.',
    features: ['Cast concrete + oak', 'Non-slip base pad', 'Three compartment layout', 'Architectural silhouette'],
    material: 'Concrete and European oak',
    dimensions: '22 × 8 × 6 cm',
    sku: 'RX-LC-008',
    reviewCount: 64,
    inStock: true,
  },
  {
    id: 'rx-009',
    slug: 'brushed-brass-tray',
    title: 'Brushed Brass Tray',
    price: '$96',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=900&q=80',
      'https://images.unsplash.com/photo-1602874801006-1f7b6611c7e3?w=900&q=80',
    ],
    category: 'Home Essentials',
    badge: 'Sale',
    compareAt: '$128',
    shortDescription: 'Round brass serving tray with raised lip and brushed finish.',
    description: 'From breakfast in bed to evening aperitifs, this brushed brass tray adds warmth to every ritual. Raised edges keep items secure; the hand-brushed surface resists fingerprints and develops character over time.',
    features: ['Raised edge design', 'Anti-fingerprint finish', 'Food-safe coating', 'Leather handle inserts'],
    material: 'Brushed brass',
    dimensions: 'Ø 38 cm',
    sku: 'RX-HE-009',
    reviewCount: 201,
    inStock: true,
  },
  {
    id: 'rx-010',
    slug: 'woven-throw-blanket',
    title: 'Woven Throw Blanket',
    price: '$142',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=900&q=80',
      'https://images.unsplash.com/photo-1583845112203-29329902330b?w=900&q=80',
    ],
    category: 'Home Essentials',
    shortDescription: 'Cotton-wool blend throw with a textured herringbone weave.',
    description: 'Soft enough for lounging, structured enough to drape with intention. The herringbone weave adds visual interest while the cotton-wool blend regulates temperature through every season.',
    features: ['Cotton-wool blend', 'Herringbone weave', 'Fringed edges', 'Dry clean or gentle wash'],
    material: '80% cotton, 20% wool',
    dimensions: '130 × 170 cm',
    sku: 'RX-HE-010',
    reviewCount: 167,
    inStock: true,
  },
  {
    id: 'rx-011',
    slug: 'wireless-charging-dock',
    title: 'Wireless Charging Dock',
    price: '$89',
    rating: '4.6',
    img: 'https://images.unsplash.com/photo-1591290619762-d2a4a8a2d06e?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1591290619762-d2a4a8a2d06e?w=900&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=80',
    ],
    category: 'Smart Technology',
    shortDescription: 'Dual-device charging stand in matte aluminum with fast-charge support.',
    description: 'Charge your phone and earbuds simultaneously on a single sculpted dock. Matte aluminum construction stays cool under load; weighted base prevents tipping. Compatible with Qi-enabled devices.',
    features: ['15W fast wireless charging', 'Dual-device support', 'Matte aluminum body', 'Cable management channel'],
    material: 'Anodized aluminum',
    dimensions: '12 × 8 × 10 cm',
    sku: 'RX-ST-011',
    reviewCount: 93,
    inStock: true,
    warranty: '1 year electronics warranty',
  },
  {
    id: 'rx-012',
    slug: 'premium-weekender-bag',
    title: 'Premium Weekender Bag',
    price: '$312',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80',
    ],
    category: 'Travel Collection',
    badge: 'New',
    isNew: true,
    shortDescription: 'Water-resistant canvas weekender with leather trim and shoe compartment.',
    description: 'Designed for 48-hour trips, this weekender fits overhead compartments while offering surprising capacity. Dedicated shoe pocket, laptop sleeve, and trolley sleeve make it the most functional bag in our travel edit.',
    features: ['Water-resistant canvas', 'Separate shoe compartment', 'Trolley sleeve', 'Padded laptop sleeve'],
    material: 'Waxed canvas + leather trim',
    dimensions: '50 × 28 × 25 cm',
    sku: 'RX-TC-012',
    reviewCount: 154,
    inStock: true,
    warranty: '2 year craftsmanship guarantee',
  },
  {
    id: 'rx-013',
    slug: 'marble-coaster-set',
    title: 'Marble Coaster Set',
    price: '$58',
    rating: '4.7',
    img: 'https://images.unsplash.com/photo-1602874801006-1f7b6611c7e3?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1602874801006-1f7b6611c7e3?w=900&q=80',
    ],
    category: 'Lifestyle Collection',
    shortDescription: 'Set of four Carrara marble coasters with cork backing.',
    description: 'Each coaster is cut from genuine Carrara marble, so no two sets are exactly alike. Cork backing protects tabletops and silences glass placement — a small detail that makes everyday entertaining feel considered.',
    features: ['Genuine Carrara marble', 'Cork non-slip backing', 'Set of four', 'Natural stone variation'],
    material: 'Carrara marble + cork',
    dimensions: 'Ø 10 cm each',
    sku: 'RX-LC-013',
    reviewCount: 89,
    inStock: true,
  },
  {
    id: 'rx-014',
    slug: 'silk-sleep-mask',
    title: 'Silk Sleep Mask',
    price: '$48',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80',
    ],
    category: 'Luxury Accessories',
    shortDescription: '22-momme mulberry silk mask with adjustable strap.',
    description: 'Gentle on skin and hair, our silk sleep mask blocks light without pressure. Mulberry silk regulates temperature and the wide elastic strap adjusts silently — ideal for travel and deep rest at home.',
    features: ['22-momme mulberry silk', 'Adjustable wide strap', 'Skin and hair friendly', 'Includes travel pouch'],
    material: '100% mulberry silk',
    sku: 'RX-LA-014',
    reviewCount: 234,
    inStock: true,
  },
  {
    id: 'rx-015',
    slug: 'scented-candle-trio',
    title: 'Scented Candle Trio',
    price: '$72',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1603006905004-6a8d7c8f3f0e?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1603006905004-6a8d7c8f3f0e?w=900&q=80',
      'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=900&q=80',
    ],
    category: 'Home Essentials',
    badge: 'Best Seller',
    shortDescription: 'Three hand-poured soy candles in Cedar, Bergamot, and Vetiver.',
    description: 'Each candle is hand-poured with a cotton wick and clean-burning soy wax. The trio covers morning clarity, afternoon calm, and evening warmth — presented in reusable matte glass vessels.',
    features: ['Clean-burning soy wax', '40-hour burn per candle', 'Reusable glass vessels', 'Gift box packaging'],
    material: 'Soy wax, cotton wick',
    dimensions: '3 × 200g candles',
    sku: 'RX-HE-015',
    reviewCount: 278,
    inStock: true,
  },
  {
    id: 'rx-016',
    slug: 'leather-passport-wallet',
    title: 'Leather Passport Wallet',
    price: '$64',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=900&q=80',
    ],
    category: 'Travel Collection',
    shortDescription: 'Bifold passport holder with boarding pass slot and card pockets.',
    description: 'Keep travel documents together in one refined folio. Holds passport, boarding passes, and up to four cards — slim enough for a jacket pocket, durable enough for years of departures.',
    features: ['4 card slots', 'Boarding pass pocket', 'Slim bifold profile', 'Develops leather patina'],
    material: 'Vegetable-tanned leather',
    dimensions: '14 × 10 cm',
    sku: 'RX-TC-016',
    reviewCount: 145,
    inStock: true,
  },
  {
    id: 'rx-017',
    slug: 'cashmere-wrap-scarf',
    title: 'Cashmere Wrap Scarf',
    price: '$198',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1520903920353-86db920bc4a1?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1520903920353-86db920bc4a1?w=900&q=80',
    ],
    category: 'Luxury Accessories',
    badge: 'New',
    isNew: true,
    shortDescription: 'Ultra-fine Grade A cashmere wrap in a versatile oversized cut.',
    description: 'Spun from Grade A Mongolian cashmere, this wrap is featherlight yet insulating. The oversized dimensions allow styling as a scarf, shawl, or travel blanket — a timeless piece that elevates any outfit.',
    features: ['Grade A Mongolian cashmere', 'Oversized wrap cut', 'Hand-finished fringe', 'Comes in gift box'],
    material: '100% cashmere',
    dimensions: '200 × 70 cm',
    sku: 'RX-LA-017',
    reviewCount: 67,
    inStock: true,
  },
  {
    id: 'rx-018',
    slug: 'smart-speaker-hub',
    title: 'Smart Speaker Hub',
    price: '$159',
    rating: '4.5',
    img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=900&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=80',
    ],
    category: 'Smart Technology',
    shortDescription: 'Room-filling speaker with voice assistant and multi-room pairing.',
    description: 'Premium audio meets intelligent home control. The Smart Speaker Hub delivers 360° sound, responds to voice commands, and pairs with additional units for whole-home audio. Fabric-wrapped design blends into any interior.',
    features: ['360° room-filling sound', 'Voice assistant built-in', 'Multi-room pairing', 'Wi-Fi and Bluetooth'],
    material: 'Fabric-wrapped enclosure',
    dimensions: 'Ø 12 × H 18 cm',
    sku: 'RX-ST-018',
    reviewCount: 112,
    inStock: true,
    warranty: '2 year electronics warranty',
  },
  {
    id: 'rx-019',
    slug: 'ceramic-pour-over-set',
    title: 'Ceramic Pour-Over Set',
    price: '$112',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
    ],
    category: 'Home Essentials',
    shortDescription: 'Handmade ceramic dripper, carafe, and scoop for ritual coffee brewing.',
    description: 'Slow mornings deserve better coffee. This pour-over set includes a V60-style dripper, matching carafe, and bamboo scoop — all in a cohesive glaze palette designed for countertop display.',
    features: ['Handmade ceramic', 'Heat-retaining carafe', 'Bamboo scoop included', 'Dishwasher safe dripper'],
    material: 'Glazed ceramic + bamboo',
    dimensions: 'Carafe 600ml capacity',
    sku: 'RX-HE-019',
    reviewCount: 98,
    inStock: true,
  },
  {
    id: 'rx-020',
    slug: 'leather-tech-organizer',
    title: 'Leather Tech Organizer',
    price: '$134',
    rating: '4.7',
    img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=900&q=80',
    ],
    category: 'Smart Technology',
    shortDescription: 'Zippered leather pouch for cables, chargers, and travel tech.',
    description: 'End cable chaos with a leather organizer that feels as good as it functions. Elastic loops, mesh pockets, and a padded main compartment protect your tech essentials in transit.',
    features: ['Elastic cable loops', 'Mesh accessory pockets', 'YKK zip closure', 'Fits in carry-on'],
    material: 'Pebbled leather',
    dimensions: '24 × 16 × 5 cm',
    sku: 'RX-ST-020',
    reviewCount: 81,
    inStock: true,
  },
  {
    id: 'rx-021',
    slug: 'hard-shell-carry-on',
    title: 'Hard Shell Carry-On',
    price: '$348',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=900&q=80',
    ],
    category: 'Travel Collection',
    shortDescription: 'Lightweight polycarbonate carry-on with 360° spinner wheels.',
    description: 'Engineered for frequent flyers — ultralight polycarbonate shell, TSA-approved lock, and whisper-quiet spinner wheels. Interior compression system maximizes packing space within airline carry-on limits.',
    features: ['TSA-approved lock', '360° spinner wheels', 'Interior compression straps', 'Airline carry-on size'],
    material: 'Polycarbonate shell',
    dimensions: '55 × 38 × 23 cm',
    sku: 'RX-TC-021',
    reviewCount: 176,
    inStock: true,
    warranty: '5 year shell warranty',
  },
  {
    id: 'rx-022',
    slug: 'walnut-serving-board',
    title: 'Walnut Serving Board',
    price: '$88',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1607623489235-3b301b9b662b?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1607623489235-3b301b9b662b?w=900&q=80',
    ],
    category: 'Lifestyle Collection',
    shortDescription: 'Single-slab American walnut board with juice groove and handle cutout.',
    description: 'From charcuterie spreads to everyday slicing, this walnut board is a kitchen heirloom in the making. Food-safe oil finish enhances the grain; integrated juice groove keeps countertops clean.',
    features: ['Single-slab American walnut', 'Juice groove channel', 'Food-safe oil finish', 'Handle cutout'],
    material: 'American black walnut',
    dimensions: '45 × 28 × 2 cm',
    sku: 'RX-LC-022',
    reviewCount: 132,
    inStock: true,
  },
  {
    id: 'rx-023',
    slug: 'noise-canceling-earbuds',
    title: 'Noise-Canceling Earbuds',
    price: '$179',
    rating: '4.7',
    img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900&q=80',
    ],
    category: 'Smart Technology',
    badge: 'Top Rated',
    shortDescription: 'True wireless earbuds with adaptive ANC and 32-hour total battery.',
    description: 'Immersive sound with adaptive noise cancellation that adjusts to your environment. Six-hour earbuds battery, 26-hour charging case, and IPX5 water resistance for workouts and commutes.',
    features: ['Adaptive noise cancellation', '32-hour total battery', 'IPX5 water resistant', 'Touch controls'],
    sku: 'RX-ST-023',
    reviewCount: 289,
    inStock: true,
    warranty: '1 year electronics warranty',
  },
  {
    id: 'rx-024',
    slug: 'sterling-cufflinks',
    title: 'Sterling Cufflinks',
    price: '$156',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80',
    ],
    category: 'Luxury Accessories',
    shortDescription: 'Hand-polished sterling silver cufflinks with toggle closure.',
    description: 'Understated elegance for formal occasions and sharp everyday dressing. Each pair is hand-polished to a mirror finish and arrives in a velvet-lined presentation box.',
    features: ['925 sterling silver', 'Toggle-back closure', 'Hand-polished finish', 'Velvet presentation box'],
    material: '925 sterling silver',
    sku: 'RX-LA-024',
    reviewCount: 54,
    inStock: true,
  },
  {
    id: 'rx-025',
    slug: 'packing-cube-set',
    title: 'Packing Cube Set',
    price: '$68',
    rating: '4.6',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80',
    ],
    category: 'Travel Collection',
    shortDescription: 'Set of three compression packing cubes in water-resistant nylon.',
    description: 'Organize your suitcase like a pro. Three graduated sizes with compression zippers fit more while keeping clothes wrinkle-free. Mesh tops let you see contents at a glance.',
    features: ['3 graduated sizes', 'Compression zippers', 'Mesh visibility panels', 'Water-resistant nylon'],
    material: 'Ripstop nylon',
    sku: 'RX-TC-025',
    reviewCount: 203,
    inStock: true,
  },
  {
    id: 'rx-026',
    slug: 'hand-blown-wine-glasses',
    title: 'Hand-Blown Wine Glasses',
    price: '$94',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1510812431400-5747704b07e3?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1510812431400-5747704b07e3?w=900&q=80',
    ],
    category: 'Lifestyle Collection',
    shortDescription: 'Set of four hand-blown crystal wine glasses with fine rim.',
    description: 'Thin, featherlight rims enhance every sip. Hand-blown from lead-free crystal, each glass has subtle variations that speak to artisan craftsmanship. Set of four in a protective gift box.',
    features: ['Lead-free crystal', 'Hand-blown artisan glass', 'Ultra-thin rim', 'Set of four'],
    material: 'Lead-free crystal',
    dimensions: '480ml capacity each',
    sku: 'RX-LC-026',
    reviewCount: 91,
    inStock: true,
  },
  {
    id: 'rx-027',
    slug: 'smart-desk-lamp',
    title: 'Smart Desk Lamp',
    price: '$124',
    rating: '4.7',
    img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=900&q=80',
    ],
    category: 'Smart Technology',
    isNew: true,
    badge: 'New',
    shortDescription: 'Adjustable LED desk lamp with app control and circadian modes.',
    description: 'Light that adapts to your day. Five color temperatures, dimming via touch or app, and a focused beam that reduces eye strain. Minimal aluminum arm with a weighted base for stability.',
    features: ['5 color temperature modes', 'App and touch control', 'Circadian scheduling', 'USB charging port'],
    material: 'Aluminum + steel base',
    sku: 'RX-ST-027',
    reviewCount: 73,
    inStock: true,
    warranty: '2 year electronics warranty',
  },
  {
    id: 'rx-028',
    slug: 'merino-travel-wrap',
    title: 'Merino Travel Wrap',
    price: '$108',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&q=80',
    ],
    category: 'Travel Collection',
    shortDescription: 'Lightweight merino wool wrap that packs small and layers warm.',
    description: 'The ultimate travel companion — breathable merino wool regulates temperature on planes, in hotels, and everywhere between. Packs to the size of a paperback and resists odor naturally.',
    features: ['Australian merino wool', 'Odor-resistant fibers', 'Packs to pocket size', 'Machine washable'],
    material: '100% merino wool',
    dimensions: '180 × 60 cm',
    sku: 'RX-TC-028',
    reviewCount: 119,
    inStock: true,
  },
  {
    id: 'rx-029',
    slug: 'obsidian-signature-box',
    title: 'Obsidian Signature Box',
    price: '$320',
    rating: '5.0',
    img: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=900&q=80',
    ],
    category: 'Exclusive Editions',
    badge: 'Limited',
    isLimited: true,
    shortDescription: 'Limited-edition lacquer gift box with curated home essentials inside.',
    description: 'Numbered edition of 200. The Obsidian Signature Box opens to reveal four hand-selected home essentials — candle, tray, vessel, and linen square — in a deep lacquer presentation case.',
    features: ['Numbered edition of 200', 'Four curated essentials inside', 'Lacquer presentation case', 'Certificate of authenticity'],
    sku: 'RX-EE-029',
    reviewCount: 42,
    inStock: true,
    stockCount: 24,
  },
  {
    id: 'rx-030',
    slug: 'heritage-leather-folio',
    title: 'Heritage Leather Folio',
    price: '$245',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=900&q=80',
    ],
    category: 'Exclusive Editions',
    badge: 'Limited',
    isLimited: true,
    shortDescription: 'Heritage leather document folio with hand-stitched spine.',
    description: 'A collector piece for the discerning professional. Heritage leather, hand-stitched spine, and suede-lined interior protect documents and tablets up to 13 inches. Edition of 150.',
    features: ['Heritage leather exterior', 'Hand-stitched spine', 'Suede-lined interior', 'Edition of 150'],
    material: 'Heritage leather',
    sku: 'RX-EE-030',
    reviewCount: 28,
    inStock: true,
    stockCount: 18,
  },
  {
    id: 'rx-031',
    slug: 'artisan-crystal-decanter',
    title: 'Artisan Crystal Decanter',
    price: '$198',
    rating: '4.9',
    img: 'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=900&q=80',
    ],
    category: 'Exclusive Editions',
    badge: 'Limited',
    isLimited: true,
    shortDescription: 'Hand-cut crystal decanter with matching stopper, edition of 100.',
    description: 'Cut by master glass artisans, each decanter refracts light through precise facets. Includes a fitted stopper and arrives in a wooden presentation crate. A centerpiece for the home bar.',
    features: ['Hand-cut lead-free crystal', 'Matching fitted stopper', 'Wooden presentation crate', 'Edition of 100'],
    material: 'Hand-cut crystal',
    dimensions: '750ml capacity',
    sku: 'RX-EE-031',
    reviewCount: 36,
    inStock: true,
    stockCount: 12,
  },
  {
    id: 'rx-032',
    slug: 'linen-table-runner',
    title: 'Linen Table Runner',
    price: '$54',
    rating: '4.7',
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80',
    ],
    category: 'Home Essentials',
    shortDescription: 'Stonewashed linen runner with mitered corners for dining tables.',
    description: 'Instantly elevates any table setting. Stonewashed for a relaxed texture, with mitered corners that lie flat and a neutral tone that complements any dinnerware collection.',
    features: ['Stonewashed linen', 'Mitered corners', 'Neutral tone palette', 'Machine washable'],
    material: 'European linen',
    dimensions: '45 × 250 cm',
    sku: 'RX-HE-032',
    reviewCount: 58,
    inStock: true,
  },
  {
    id: 'rx-033',
    slug: 'titanium-writing-pen',
    title: 'Titanium Writing Pen',
    price: '$142',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1583485088034-697a5b048cc0?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1583485088034-697a5b048cc0?w=900&q=80',
    ],
    category: 'Luxury Accessories',
    shortDescription: 'Machined titanium rollerball pen with knurled grip.',
    description: 'Precision-machined from grade 5 titanium with a knurled grip section for confident writing. Accepts standard rollerball refills; presented in an aluminum tube case.',
    features: ['Grade 5 titanium body', 'Knurled grip section', 'Standard refill compatible', 'Aluminum tube case'],
    material: 'Grade 5 titanium',
    sku: 'RX-LA-033',
    reviewCount: 47,
    inStock: true,
  },
  {
    id: 'rx-034',
    slug: 'bamboo-bath-caddy',
    title: 'Bamboo Bath Caddy',
    price: '$78',
    rating: '4.6',
    img: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=900&q=80',
    ],
    category: 'Home Essentials',
    shortDescription: 'Expandable bamboo bath tray with book stand and wine holder.',
    description: 'Transform bath time into a ritual. Expandable bamboo caddy spans most tub widths, with slots for a book, wine glass, candle, and phone — all finished with a water-resistant coating.',
    features: ['Expandable 72–95 cm span', 'Integrated wine glass holder', 'Book/tablet stand', 'Water-resistant coating'],
    material: 'Sustainable bamboo',
    sku: 'RX-HE-034',
    reviewCount: 164,
    inStock: true,
  },
  {
    id: 'rx-035',
    slug: 'architect-desk-lamp',
    title: 'Architect Desk Lamp',
    price: '$168',
    rating: '4.8',
    img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=900&q=80',
    ],
    category: 'Lifestyle Collection',
    shortDescription: 'Adjustable brass architect lamp with articulating arm.',
    description: 'Inspired by classic drafting studios, this architect lamp features an articulating brass arm, weighted base, and focused beam. A statement piece that works as hard as it looks.',
    features: ['Articulating brass arm', 'Weighted stable base', 'Focused task beam', 'Inline dimmer switch'],
    material: 'Brass + steel',
    sku: 'RX-LC-035',
    reviewCount: 86,
    inStock: true,
  },
  {
    id: 'rx-036',
    slug: 'midnight-edition-watch-roll',
    title: 'Midnight Edition Watch Roll',
    price: '$275',
    rating: '5.0',
    img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a48?w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a48?w=900&q=80',
    ],
    category: 'Exclusive Editions',
    badge: 'Limited',
    isLimited: true,
    shortDescription: 'Three-slot suede watch roll in midnight navy, numbered edition.',
    description: 'Protect your timepieces in supple suede with individual cushioned slots. The Midnight Edition features contrast stitching, a snap closure, and numbered authenticity card. Edition of 75.',
    features: ['3 cushioned watch slots', 'Supple suede interior', 'Numbered authenticity card', 'Edition of 75'],
    material: 'Navy leather + suede',
    sku: 'RX-EE-036',
    reviewCount: 19,
    inStock: true,
    stockCount: 8,
  },
]

export const allProducts: Product[] = catalog

export const bestSellers: Product[] = catalog.filter((p) =>
  ['Best Seller', 'Top Rated'].includes(p.badge ?? '')
).slice(0, 4)

export const newArrivals: Product[] = catalog.filter((p) => p.isNew).slice(0, 8)

export const limitedProducts: LimitedProduct[] = catalog
  .filter((p) => p.isLimited)
  .map((p) => ({
    slug: p.slug,
    title: p.title,
    price: p.price,
    img: p.img,
    units: p.stockCount ? `Only ${p.stockCount} left` : 'Limited stock',
    description: p.shortDescription,
  }))

function countByCategory(name: string) {
  const count = catalog.filter((p) => p.category === name).length
  return `${count} piece${count !== 1 ? 's' : ''}`
}

export const categories: Category[] = [
  {
    title: 'Luxury Accessories',
    slug: 'luxury-accessories',
    count: countByCategory('Luxury Accessories'),
    img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
    size: 'large',
    description: 'Refined leather goods, silk essentials, and sterling accents for everyday elegance.',
  },
  {
    title: 'Home Essentials',
    slug: 'home-essentials',
    count: countByCategory('Home Essentials'),
    img: 'https://images.unsplash.com/photo-1615874694520-474822394e73?w=700&q=80',
    size: 'medium',
    description: 'Linen bedding, ceramic rituals, candles, and objects that make home feel intentional.',
  },
  {
    title: 'Smart Technology',
    slug: 'smart-technology',
    count: countByCategory('Smart Technology'),
    img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=700&q=80',
    size: 'medium',
    description: 'Thoughtfully designed tech that blends into your space — audio, charging, and lighting.',
  },
  {
    title: 'Travel Collection',
    slug: 'travel-collection',
    count: countByCategory('Travel Collection'),
    img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
    size: 'large',
    description: 'Weekenders, organizers, and carry-on essentials built for departures and returns.',
  },
  {
    title: 'Lifestyle Collection',
    slug: 'lifestyle-collection',
    count: countByCategory('Lifestyle Collection'),
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=700&q=80',
    size: 'medium',
    description: 'Serving boards, glassware, desk objects, and accents for curated living.',
  },
  {
    title: 'Exclusive Editions',
    slug: 'exclusive-editions',
    count: countByCategory('Exclusive Editions'),
    img: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&q=80',
    size: 'wide',
    description: 'Numbered, limited-run pieces for collectors who value rarity and craft.',
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return catalog.find((p) => p.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return catalog
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit)
}

export function getProductsByCategory(category: string): Product[] {
  return catalog.filter((p) => p.category === category)
}

export function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ''))
}

export type HomepageProductCategory = {
  slug: string
  title: string
  img: string
  heroImg?: string
  description: string
  headline: string
  paragraphs: string[]
  icon: 'flats' | 'longs' | 'tubulars' | 'fittings' | 'roofing' | 'plates' | 'tmt' | 'fabrication'
  productSlugs: string[]
}

export const homepageProductCategories: HomepageProductCategory[] = [
  {
    slug: 'flats',
    title: 'Flats',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80',
    heroImg: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=85',
    description: 'MS, GI & SS sheets',
    headline: 'SUPPLY FLAT STEEL SHEETS FOR FABRICATION, CLADDING, AND INDUSTRIAL APPLICATIONS.',
    paragraphs: [
      'Flat products form the backbone of metal fabrication — from MS hot-rolled sheets to galvanized and stainless options for corrosion-prone environments.',
      'KVS Metal stocks a wide thickness range with cut-to-size service, mill certificates, and dependable logistics for contractors, fabricators, and OEM clients.',
      'Whether you need plain sheets for ducting or heavy plate for machining, we help you select the right grade and finish for your project.',
    ],
    icon: 'flats',
    productSlugs: ['ms-hr-sheets', 'gi-plain-sheets'],
  },
  {
    slug: 'longs',
    title: 'Longs',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80',
    heroImg: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85',
    description: 'Angles, channels & beams',
    headline: 'DELIVER STRUCTURAL LONG PRODUCTS FOR FRAMES, SUPPORTS, AND HEAVY CONSTRUCTION.',
    paragraphs: [
      'Long steel sections — angles, channels, beams, and columns — provide the skeletal strength for buildings, bridges, and industrial structures.',
      'Our long products are sourced from certified mills and supplied in standard lengths with project-based cutting, helping engineers meet load and compliance requirements.',
      'From light angles to heavy H-beams, KVS Metal supports structural contractors with consistent quality and responsive supply.',
    ],
    icon: 'longs',
    productSlugs: ['ms-angle-channels', 'ms-h-beams'],
  },
  {
    slug: 'tubulars',
    title: 'Tubulars',
    img: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=700&q=80',
    heroImg: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1400&q=85',
    description: 'MS, GI & SS pipes',
    headline: 'PROVIDE PIPES AND TUBES FOR FLUID, PROCESS, AND STRUCTURAL APPLICATIONS.',
    paragraphs: [
      'Tubular products serve plumbing, process piping, fencing, and precision engineering needs across MS, GI, and stainless grades.',
      'We supply seamless and welded options in multiple diameters and schedules, with documentation for industrial and infrastructure projects.',
      'Partner with KVS Metal for corrosion-resistant stainless lines, utility GI pipes, and dependable MS tubular supply.',
    ],
    icon: 'tubulars',
    productSlugs: ['stainless-steel-pipes', 'ms-seamless-pipes', 'gi-pipes-tubes'],
  },
  {
    slug: 'fittings',
    title: 'Fittings',
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=80',
    heroImg: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=85',
    description: 'Flanges, elbows & joints',
    headline: 'CONNECT PIPELINE SYSTEMS WITH RELIABLE FLANGES, ELBOWS, AND FORGED FITTINGS.',
    paragraphs: [
      'Pipe fittings and flanges are critical for safe, leak-free connections in process plants, utilities, and industrial piping networks.',
      'KVS Metal supplies forged fittings, weld neck and slip-on flanges, and common joint configurations with grade matching and project documentation.',
      'Our team helps you source the right pressure class and bore size to keep installations compliant and on schedule.',
    ],
    icon: 'fittings',
    productSlugs: ['carbon-steel-flanges', 'forged-pipe-fittings'],
  },
  {
    slug: 'roofing',
    title: 'Roofing',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80',
    heroImg: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=85',
    description: 'GI corrugated sheets',
    headline: 'PROTECT BUILDINGS WITH DURABLE GI AND PRE-PAINTED ROOFING SOLUTIONS.',
    paragraphs: [
      'Roofing sheets shield warehouses, factories, and commercial structures from weather while keeping installation efficient and cost-effective.',
      'We offer galvanized corrugated profiles and pre-painted options with consistent coating quality, cut lengths, and bulk dispatch for site teams.',
      'From industrial sheds to modern cladding, KVS Metal delivers roofing materials built for long service life.',
    ],
    icon: 'roofing',
    productSlugs: ['gi-corrugated-roofing-sheets', 'ppgi-profile-sheets'],
  },
  {
    slug: 'plates',
    title: 'Plates',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=80',
    heroImg: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=85',
    description: 'Heavy-duty steel plates',
    headline: 'SUPPLY HEAVY PLATES FOR STRUCTURAL BASES, TANKS, AND FABRICATION PROJECTS.',
    paragraphs: [
      'Steel plates provide the thickness and strength required for machinery beds, base plates, storage tanks, and heavy welded assemblies.',
      'Our HR plates are available in a wide thickness range with cut-to-size service and mill test certificates for quality assurance.',
      'KVS Metal supports fabricators and EPC contractors with dependable plate supply and technical coordination.',
    ],
    icon: 'plates',
    productSlugs: ['ms-hr-plates'],
  },
  {
    slug: 'tmt-bars',
    title: 'TMT Bars',
    img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&q=80',
    heroImg: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=85',
    description: 'Construction reinforcement',
    headline: 'REINFORCE CONCRETE STRUCTURES WITH CERTIFIED TMT BAR SUPPLY.',
    paragraphs: [
      'TMT bars are essential for RCC foundations, columns, and slabs in residential, commercial, and infrastructure construction.',
      'We supply FE 500D and higher grades with superior ductility, test certificates, and site delivery for contractors and builders.',
      'Count on KVS Metal for consistent bar quality, accurate bundling, and responsive logistics to keep projects moving.',
    ],
    icon: 'tmt',
    productSlugs: ['fe-500d-tmt-bars'],
  },
  {
    slug: 'fabrication',
    title: 'Fabrication',
    img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=700&q=80',
    heroImg: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1400&q=85',
    description: 'Custom metal works',
    headline: 'BUILD CUSTOM STEEL ASSEMBLIES WITH PRECISION FABRICATION SERVICES.',
    paragraphs: [
      'When standard catalog items are not enough, our fabrication team delivers cut, bent, welded, and assembled metal components to your drawings.',
      'From structural frames to sheet metal parts, we combine material supply with shop-floor capability for faster project turnaround.',
      'KVS Metal is your partner for prototypes, batch production, and site-ready fabricated deliverables.',
    ],
    icon: 'fabrication',
    productSlugs: ['structural-steel-fabrication', 'custom-sheet-fabrication'],
  },
]

export const homepageProductRows = [
  homepageProductCategories.slice(0, 3),
  homepageProductCategories.slice(3, 6),
  homepageProductCategories.slice(6, 8),
] as const

export function getCategoryHref(category: HomepageProductCategory): string {
  return `/products?category=${category.slug}`
}

export function getProductsPageHref(categorySlug?: string): string {
  if (!categorySlug) return '/products'
  return `/products?category=${categorySlug}`
}

export function getProductCategoryBySlug(slug: string): HomepageProductCategory | undefined {
  return homepageProductCategories.find((category) => category.slug === slug)
}

export function getAllProductCategorySlugs(): string[] {
  return homepageProductCategories.map((category) => category.slug)
}

export function getCategoryProducts(category: HomepageProductCategory): Product[] {
  return category.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product))
}

export function getProductCategoryForProduct(slug: string): HomepageProductCategory | undefined {
  return homepageProductCategories.find((category) => category.productSlugs.includes(slug))
}

export function getKvsProductSlugs(): string[] {
  return [...homepageProductSlugs]
}

export function getAllSlugs(): string[] {
  return catalog.map((p) => p.slug)
}

export function getHomepageProducts(): Product[] {
  return homepageProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p))
}

export function getRelatedHomepageProducts(slug: string): Product[] {
  const category = getProductCategoryForProduct(slug)
  if (category) {
    return getCategoryProducts(category).filter((product) => product.slug !== slug).slice(0, 4)
  }
  return getHomepageProducts().filter((product) => product.slug !== slug)
}
