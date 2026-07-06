'use client'

import { useEffect, useMemo, useState } from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { useSiteSettings } from '@/components/SiteSettingsProvider'
import { fallbackPartners } from '@/lib/partners-fallback'
import type { PartnerDto } from '@/lib/serializers'

type MarqueeItem =
  | { key: string; type: 'image'; name: string; img: string }
  | { key: string; type: 'text'; name: string; className?: string }

export function HomePartnersSection() {
  const { showHomePartnersSlider } = useSiteSettings()
  const [partners, setPartners] = useState<PartnerDto[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!showHomePartnersSlider) {
      setReady(true)
      return
    }

    let cancelled = false

    fetch('/api/partners')
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) setPartners(Array.isArray(data.partners) ? data.partners : [])
      })
      .catch(() => {
        if (!cancelled) setPartners([])
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })

    return () => {
      cancelled = true
    }
  }, [showHomePartnersSlider])

  const items = useMemo<MarqueeItem[]>(() => {
    const withImages = partners.filter((partner) => partner.img.trim())
    if (withImages.length > 0) {
      return withImages
        .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name))
        .map((partner) => ({
          key: partner.id,
          type: 'image' as const,
          name: partner.name,
          img: partner.img,
        }))
    }

    return fallbackPartners.map((partner, index) => ({
      key: `fallback-${partner.name}-${index}`,
      type: 'text' as const,
      name: partner.name,
      className: partner.className,
    }))
  }, [partners])

  const marqueeItems = [...items, ...items]

  if (!ready || !showHomePartnersSlider) return null

  return (
    <ScrollReveal as="section" className="uniPartners" aria-label="Trusted by leading firms">
      <div className="uniPartnersMarquee">
        <div className="uniPartnersTrack">
          {marqueeItems.map((partner, index) =>
            partner.type === 'image' ? (
              <span key={`${partner.key}-${index}`} className="uniPartnerLogo uniPartnerLogo--image">
                <img
                  src={partner.img}
                  alt={partner.name}
                  className="uniPartnerLogoImg"
                  loading="lazy"
                  decoding="async"
                />
              </span>
            ) : (
              <span
                key={`${partner.key}-${index}`}
                className={`uniPartnerLogo ${partner.className ?? ''}`}
              >
                {partner.name}
              </span>
            ),
          )}
        </div>
      </div>
    </ScrollReveal>
  )
}
