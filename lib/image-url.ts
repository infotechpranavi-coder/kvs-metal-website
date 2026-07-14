/** Cloudinary URL tuned for catalog hero — no upscale, good quality. */
export function catalogHeroImageUrl(url: string): string {
  if (!url?.includes('res.cloudinary.com')) return url
  if (/\/upload\/[^/]*[wcf]_/.test(url)) return url
  return url.replace('/upload/', '/upload/f_auto,q_auto:eco,c_limit,w_1600,dpr_auto/')
}

/** Smaller card / thumb delivery for faster listing loads. */
export function catalogCardImageUrl(url: string, width = 360): string {
  if (!url?.includes('res.cloudinary.com')) return url
  if (/\/upload\/[^/]*[wcf]_/.test(url)) return url
  return url.replace(
    '/upload/',
    `/upload/f_auto,q_auto:eco,c_limit,w_${width},dpr_auto/`,
  )
}

/** Responsive srcset for product cards (desktop/mobile). */
export function catalogCardImageSrcSet(url: string): string | undefined {
  if (!url?.includes('res.cloudinary.com')) return undefined
  if (/\/upload\/[^/]*[wcf]_/.test(url)) return undefined
  return [240, 360, 480]
    .map((width) => `${catalogCardImageUrl(url, width)} ${width}w`)
    .join(', ')
}
