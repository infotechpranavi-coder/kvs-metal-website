export type FallbackPartner = {
  name: string
  className?: string
}

/** Shown on the homepage marquee when no logos exist in the database yet. */
export const fallbackPartners: FallbackPartner[] = [
  { name: 'TATA', className: 'uniPartnerLogo--sny' },
  { name: 'JSW' },
  { name: 'SAIL' },
  { name: 'Jindal', className: 'uniPartnerLogo--moodle' },
  { name: 'Hindalco' },
  { name: 'Essar', className: 'uniPartnerLogo--orfit' },
]
