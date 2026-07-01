'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'
import { materialsSection } from '@/lib/content'
import { getMaterialHref, type MaterialSupply } from '@/lib/materials'

export function MaterialSuppliesSection() {
  const [materials, setMaterials] = useState<MaterialSupply[]>([])

  useEffect(() => {
    fetch('/api/materials')
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data.materials) || data.materials.length === 0) return
        setMaterials(
          data.materials.map((material: {
            slug: string
            title: string
            description: string
            img: string
            categorySlugs: string[]
          }) => ({
            slug: material.slug,
            title: material.title,
            description: material.description,
            img: material.img,
            categorySlugs: material.categorySlugs,
          })),
        )
      })
      .catch(() => undefined)
  }, [])

  return (
    <ScrollReveal as="section" className="uniMaterialSupplies" aria-label="Material supplies">
      <div className="uniContainer uniMaterialSuppliesInner">
        <ScrollReveal direction="up" className="uniMaterialSuppliesHead">
          <h2 className="uniMaterialSuppliesTitle">{materialsSection.title}</h2>
          <p className="uniMaterialSuppliesTagline">{materialsSection.tagline}</p>
        </ScrollReveal>

        <div className="uniMaterialSuppliesGrid">
          {materials.map((material, index) => (
            <ScrollReveal
              key={material.slug}
              delay={0.05 + index * 0.08}
              direction="up"
              className="uniMaterialSuppliesCardWrap"
            >
              <Link href={getMaterialHref(material.slug)} className="uniMaterialSuppliesCard">
                <div className="uniMaterialSuppliesCardVisual">
                  <span className="uniMaterialSuppliesCardHalo" aria-hidden />
                  <div className="uniMaterialSuppliesCardRing">
                    <div className="uniMaterialSuppliesCardMedia">
                      <img src={material.img} alt={material.title} loading="lazy" />
                    </div>
                  </div>
                </div>

                <div className="uniMaterialSuppliesCardFooter">
                  <span className="uniMaterialSuppliesCardDivider" aria-hidden />
                  <h3>{material.title}</h3>
                  <span className="uniMaterialSuppliesCardAction">
                    View range
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
