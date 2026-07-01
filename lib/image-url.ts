/** Cloudinary URL tuned for catalog hero — no upscale, good quality. */
export function catalogHeroImageUrl(url: string): string {
  if (!url?.includes('res.cloudinary.com')) return url
  if (/\/upload\/[^/]*[wcf]_/.test(url)) return url
  return url.replace('/upload/', '/upload/f_auto,q_auto:good,c_limit,w_1600/')
}

/** Smaller card / thumb delivery for faster listing loads. */
export function catalogCardImageUrl(url: string, width = 480): string {
  if (!url?.includes('res.cloudinary.com')) return url
  if (/\/upload\/[^/]*[wcf]_/.test(url)) return url
  return url.replace('/upload/', `/upload/f_auto,q_auto:good,c_limit,w_${width}/`)
}
