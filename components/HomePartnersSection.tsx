'use client'

import { useEffect, useMemo, useState } from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { fallbackPartners } from '@/lib/partners-fallback'
import { defaultSiteSettings } from '@/lib/site-settings'
import type { PartnerDto } from '@/lib/serializers'

type MarqueeItem =
  | { key: string; type: 'image'; name: string; img: string }
  | { key: string; type: 'text'; name: string; className?: string }

export function HomePartnersSection() {
  const [partners, setPartners] = useState<PartnerDto[]>([])
  const [sliderEnabled, setSliderEnabled] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const settingsResponse = await fetch('/api/site-settings')
        const settingsData = (await settingsResponse.json()) as {
          settings?: { showHomePartnersSlider?: boolean }
        }
        const enabled =
          settingsData.settings?.showHomePartnersSlider ??
          defaultSiteSettings.showHomePartnersSlider

        if (cancelled) return

        setSliderEnabled(enabled)

        if (!enabled) {
          setReady(true)
          return
        }

        const partnersResponse = await fetch('/api/partners')
        const partnersData = (await partnersResponse.json()) as { partners?: PartnerDto[] }
        if (!cancelled) {
          setPartners(Array.isArray(partnersData.partners) ? partnersData.partners : [])
          setReady(true)
        }
      } catch {
        if (!cancelled) {
          setPartners([])
          setReady(true)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [])

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

  if (!ready || !sliderEnabled) return null

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
