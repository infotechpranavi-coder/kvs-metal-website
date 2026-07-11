const PRODUCT_IMAGE_BASE = '/products'

/** Local product photos in `public/products` — used across catalog, categories, and detail pages. */
export const kvsProductImageFiles = [
  'IMG-20260505-WA0026.jpg',
  'IMG-20260505-WA0027.jpg',
  'IMG-20260505-WA0028.jpg',
  'IMG-20260505-WA0030.jpg',
  'IMG-20260505-WA0031.jpg',
  'IMG-20260505-WA0033.jpg',
  'IMG-20260505-WA0034.jpg',
  'IMG-20260505-WA0035.jpg',
  'IMG-20260505-WA0036.jpg',
  'IMG-20260505-WA0037.jpg',
  'IMG-20260505-WA0038.jpg',
  'IMG-20260505-WA0039.jpg',
  'IMG-20260505-WA0042.jpg',
  'IMG-20260505-WA0043.jpg',
  'IMG-20260505-WA0044.jpg',
  'IMG-20260505-WA0046.jpg',
  'IMG-20260505-WA0047.jpg',
  'IMG-20260505-WA0048.jpg',
  'IMG-20260610-WA0014.jpg',
  'IMG-20260610-WA0015.jpg',
  'IMG-20260610-WA0016.jpg',
  'IMG-20260610-WA0017.jpg',
  'IMG-20260610-WA0018.jpg',
  'IMG-20260610-WA0019.jpg',
  'IMG-20260610-WA0020.jpg',
  'IMG-20260610-WA0021.jpg',
  'IMG-20260610-WA0022.jpg',
  'IMG-20260610-WA0023.jpg',
  'IMG-20260610-WA0024.jpg',
  'IMG-20260610-WA0025.jpg',
  'IMG-20260610-WA0026.jpg',
  'IMG-20260610-WA0027.jpg',
  'IMG-20260610-WA0028.jpg',
  'IMG-20260610-WA0029.jpg',
  'IMG-20260610-WA0030.jpg',
  'IMG-20260610-WA0031.jpg',
  'IMG-20260610-WA0032.jpg',
  'IMG-20260610-WA0033.jpg',
  'IMG_20260508_041442.jpg',
] as const

export function kvsProductImage(file: (typeof kvsProductImageFiles)[number] | string): string {
  return `${PRODUCT_IMAGE_BASE}/${file}`
}

/** Homepage CTA strip images — diverse picks from the product photo library. */
export const kvsProcurementCtaImage = kvsProductImage('IMG_20260508_041442.jpg')
export const kvsProductsCtaImage = kvsProductImage('IMG-20260610-WA0026.jpg')
export const kvsAboutCtaImage = kvsProductImage('IMG-20260610-WA0027.jpg')
export const kvsAboutStoryImage = kvsProductImage('IMG-20260610-WA0016.jpg')

export const kvsCatalogHeroImage = kvsProductImage('IMG-20260610-WA0020.jpg')

/**
 * Primary image per KVS steel product slug.
 * Files are spread across both photo batches so categories don't all look like coils.
 */
export const kvsProductImageBySlug: Record<string, string> = {
  'hr-coils': kvsProductImage('IMG-20260505-WA0026.jpg'),
  'ms-hr-sheets': kvsProductImage('IMG-20260610-WA0020.jpg'),
  'ms-hr-plates': kvsProductImage('IMG-20260505-WA0038.jpg'),
  'aluminium-coils': kvsProductImage('IMG-20260610-WA0014.jpg'),
  'aluminium-sheets': kvsProductImage('IMG-20260610-WA0015.jpg'),
  'gi-corrugated-roofing-sheets': kvsProductImage('IMG-20260505-WA0030.jpg'),
  'ppgi-profile-sheets': kvsProductImage('IMG-20260610-WA0029.jpg'),
  'gi-plain-sheets': kvsProductImage('IMG-20260505-WA0034.jpg'),
  'pc-strand-coils': kvsProductImage('IMG-20260505-WA0042.jpg'),
  'precast-spacers': kvsProductImage('IMG-20260610-WA0019.jpg'),
  'ms-equal-angles': kvsProductImage('IMG-20260505-WA0046.jpg'),
  'ms-angle-channels': kvsProductImage('IMG-20260505-WA0047.jpg'),
  'fe-500d-tmt-bars': kvsProductImage('IMG-20260610-WA0018.jpg'),
  'ms-round-bars': kvsProductImage('IMG-20260610-WA0022.jpg'),
  'ms-c-channels': kvsProductImage('IMG-20260610-WA0023.jpg'),
  'ms-u-channels': kvsProductImage('IMG-20260505-WA0031.jpg'),
  'ms-h-beams': kvsProductImage('IMG-20260610-WA0026.jpg'),
  'universal-beams': kvsProductImage('IMG-20260610-WA0027.jpg'),
  'gi-gratings': kvsProductImage('IMG-20260610-WA0032.jpg'),
  'welded-wire-mesh': kvsProductImage('IMG-20260610-WA0033.jpg'),
  'stainless-steel-pipes': kvsProductImage('IMG-20260610-WA0016.jpg'),
  'ms-seamless-pipes': kvsProductImage('IMG-20260610-WA0017.jpg'),
  'gi-pipes-tubes': kvsProductImage('IMG-20260610-WA0024.jpg'),
  'carbon-steel-flanges': kvsProductImage('IMG-20260610-WA0025.jpg'),
  'forged-pipe-fittings': kvsProductImage('IMG-20260610-WA0021.jpg'),
  'structural-steel-fabrication': kvsProductImage('IMG-20260505-WA0044.jpg'),
  'custom-sheet-fabrication': kvsProductImage('IMG-20260505-WA0048.jpg'),
}

/** Alternate gallery shots — different files from the same library. */
const kvsProductGalleryBySlug: Record<string, string[]> = {
  'hr-coils': [
    kvsProductImage('IMG-20260505-WA0027.jpg'),
    kvsProductImage('IMG-20260505-WA0028.jpg'),
  ],
  'ms-hr-sheets': [kvsProductImage('IMG-20260505-WA0036.jpg')],
  'ms-hr-plates': [kvsProductImage('IMG-20260505-WA0039.jpg')],
  'gi-corrugated-roofing-sheets': [kvsProductImage('IMG-20260505-WA0035.jpg')],
  'ppgi-profile-sheets': [kvsProductImage('IMG-20260505-WA0037.jpg')],
  'ms-h-beams': [kvsProductImage('IMG_20260508_041442.jpg')],
  'universal-beams': [kvsProductImage('IMG-20260505-WA0043.jpg')],
  'fe-500d-tmt-bars': [kvsProductImage('IMG-20260610-WA0030.jpg')],
  'stainless-steel-pipes': [kvsProductImage('IMG-20260610-WA0031.jpg')],
  'gi-gratings': [kvsProductImage('IMG-20260505-WA0033.jpg')],
}

/** Category card / hero images — mixed steel types, not only coils. */
export const kvsCategoryImageBySlug: Record<string, { img: string; heroImg: string }> = {
  'hr-cr-coils-sheets-plates': {
    img: kvsProductImageBySlug['ms-hr-sheets'],
    heroImg: kvsProductImage('IMG-20260505-WA0036.jpg'),
  },
  'aluminium-coils-sheets-plates': {
    img: kvsProductImageBySlug['aluminium-coils'],
    heroImg: kvsProductImage('IMG-20260610-WA0015.jpg'),
  },
  'gi-ppgi-coils-sheets': {
    img: kvsProductImageBySlug['gi-corrugated-roofing-sheets'],
    heroImg: kvsProductImage('IMG-20260505-WA0035.jpg'),
  },
  'precast-foundation-materials': {
    img: kvsProductImageBySlug['pc-strand-coils'],
    heroImg: kvsProductImage('IMG-20260505-WA0043.jpg'),
  },
  angles: {
    img: kvsProductImageBySlug['ms-equal-angles'],
    heroImg: kvsProductImage('IMG-20260505-WA0047.jpg'),
  },
  bars: {
    img: kvsProductImageBySlug['fe-500d-tmt-bars'],
    heroImg: kvsProductImage('IMG-20260610-WA0030.jpg'),
  },
  channels: {
    img: kvsProductImageBySlug['ms-c-channels'],
    heroImg: kvsProductImage('IMG-20260505-WA0031.jpg'),
  },
  'structural-sections-beams': {
    img: kvsProductImageBySlug['ms-h-beams'],
    heroImg: kvsProductImage('IMG_20260508_041442.jpg'),
  },
  'mesh-gi-gratings': {
    img: kvsProductImageBySlug['gi-gratings'],
    heroImg: kvsProductImage('IMG-20260505-WA0033.jpg'),
  },
}

export function getKvsProductImage(slug: string): string | undefined {
  return kvsProductImageBySlug[slug]
}

export function getKvsProductGallery(slug: string): string[] {
  const primary = getKvsProductImage(slug)
  if (!primary) return []

  const extras = (kvsProductGalleryBySlug[slug] ?? []).filter((src) => src !== primary)
  return [primary, ...extras]
}

export function applyKvsLocalImages<T extends { slug: string; img: string; images: string[] }>(
  products: T[],
): T[] {
  return products.map((product) => {
    const img = getKvsProductImage(product.slug)
    if (!img) return product

    const images = getKvsProductGallery(product.slug)
    return { ...product, img, images }
  })
}
