'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/ScrollReveal'
import { homeMaterialCards, materialsSection } from '@/lib/content'
import { getMaterialHref } from '@/lib/materials'

export function MaterialSuppliesSection() {
  return (
    <ScrollReveal as="section" className="uniMaterialSupplies" aria-label="Material supplies">
      <div className="uniContainer uniMaterialSuppliesInner">
        <ScrollReveal direction="up" className="uniMaterialSuppliesHead">
          <h2 className="uniMaterialSuppliesTitle">{materialsSection.title}</h2>
          <p className="uniMaterialSuppliesTagline">{materialsSection.tagline}</p>
        </ScrollReveal>

        <div className="uniMaterialSuppliesGrid">
          {homeMaterialCards.map((material, index) => (
            <ScrollReveal
              key={material.slug}
              delay={0.05 + index * 0.08}
              direction="up"
              className="uniMaterialSuppliesCardWrap"
            >
              <Link href={getMaterialHref(material.slug)} className="uniMaterialSuppliesCard">
                <div className="uniMaterialSuppliesCardVisual">
                  <div className="uniMaterialSuppliesCardRing">
                    <div className="uniMaterialSuppliesCardMedia">
                      <img src={material.img} alt={material.title} loading="lazy" />
                    </div>
                  </div>
                </div>
                <h3 className="uniMaterialSuppliesCardTitle">{material.title}</h3>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
