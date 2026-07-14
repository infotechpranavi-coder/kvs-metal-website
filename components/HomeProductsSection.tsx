'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { productsHome } from '@/lib/content'
import { categoryToProductCard, fetchHomepageCategories } from '@/lib/category-cards'
import { catalogCardImageUrl } from '@/lib/image-url'
import { HomeProductsDiamondSkeleton } from '@/components/CatalogSkeletons'
import { useMaxWidthMedia } from '@/lib/use-compact-layout'

type ProductCard = ReturnType<typeof categoryToProductCard>

function getDiamondPlacement(index: number) {
  const row = Math.floor(index / 3) + 1
  const pos = index % 3
  const offsetRow = row % 2 === 0
  const colStart = (offsetRow ? 2 : 1) + pos * 2

  return {
    gridColumn: `${colStart} / ${colStart + 2}`,
    gridRow: `${row}`,
  }
}

export function HomeProductsSection() {
  const [cards, setCards] = useState<ProductCard[]>([])
  const [loading, setLoading] = useState(true)
  const compactGrid = useMaxWidthMedia(1024)

  useEffect(() => {
    let cancelled = false

    fetchHomepageCategories()
      .then((categories) => {
        if (cancelled) return
        setCards(categories.map(categoryToProductCard))
      })
      .catch(() => {
        if (!cancelled) setCards([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <ScrollReveal as="section" className="uniProducts" id="products">
      <div className="uniContainer uniProductsInner">
        <div className="uniProductsSplit">
          <ScrollReveal direction="up" className="uniProductsHeader">
            <h2 className="uniProductsTitle">{productsHome.title}</h2>
            <div className="uniProductsLead">
              {productsHome.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </ScrollReveal>
          <div className="uniProductsDiamondWrap">
            {loading ? (
              <HomeProductsDiamondSkeleton count={6} />
            ) : cards.length === 0 ? (
              <p className="uniProductsEmpty">
                Featured categories will appear here. Enable &quot;Show on homepage&quot; in the
                dashboard for each category you want displayed.
              </p>
            ) : (
              <div className="uniProductsDiamondGrid">
                {cards.map((card, index) => (
                  <ScrollReveal
                    key={card.key}
                    direction="up"
                    delay={0.05 + index * 0.08}
                    className="uniProductsDiamondReveal"
                    style={compactGrid ? undefined : getDiamondPlacement(index)}
                  >
                    <Link href={card.href} className="uniSectorsDiamondCard" aria-label={card.title}>
                      <span className="uniSectorsDiamondVisual">
                        <span className="uniSectorsDiamondAccent" aria-hidden />
                        <span className="uniSectorsDiamondFrame">
                          <span className="uniSectorsDiamondMedia">
                            <img
                              src={catalogCardImageUrl(card.img, 420)}
                              alt={card.title}
                              loading="lazy"
                              decoding="async"
                            />
                            <span className="uniSectorsDiamondOverlay" aria-hidden />
                          </span>
                          <span className="uniSectorsDiamondLabel uniSectorsDiamondLabel--in" aria-hidden="true">
                            {card.title}
                          </span>
                        </span>
                      </span>
                      <span className="uniSectorsDiamondLabel uniSectorsDiamondLabel--below">
                        {card.title}
                      </span>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}
