'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { productsHome } from '@/lib/content'
import { categoryToProductCard, fetchHomepageCategories } from '@/lib/category-cards'
import { catalogCardImageUrl } from '@/lib/image-url'
import { HomeProductsDiamondSkeleton } from '@/components/CatalogSkeletons'

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
    <section className="uniProducts" id="products">
      <div className="uniContainer uniProductsInner">
        <div className="uniProductsSplit">
          <div className="uniProductsHeader">
            <h2 className="uniProductsTitle">{productsHome.title}</h2>
            <div className="uniProductsLead">
              {productsHome.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>
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
                  <Link
                    key={card.key}
                    href={card.href}
                    className="uniSectorsDiamondCard"
                    style={getDiamondPlacement(index)}
                  >
                    <span className="uniSectorsDiamondAccent" aria-hidden />
                    <span className="uniSectorsDiamondFrame">
                      <span className="uniSectorsDiamondMedia">
                        <img
                          src={catalogCardImageUrl(card.img)}
                          alt={card.title}
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="uniSectorsDiamondOverlay" aria-hidden />
                      </span>
                      <span className="uniSectorsDiamondLabel">{card.title}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
