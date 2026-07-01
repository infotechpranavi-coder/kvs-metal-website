'use client'

import Link from 'next/link'
import type { Sector } from '@/lib/sectors'
import { sectors } from '@/lib/sectors'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'

export default function SectorDetailPage({ sector }: { sector: Sector }) {
  const otherSectors = sectors.filter((s) => s.slug !== sector.slug).slice(0, 3)

  return (
    <div className="uniPage">
      <UniNavbar />
      <main className="sectorDetail">
        <section className="sectorDetailHero">
          <img src={sector.img} alt="" className="sectorDetailBannerImg" />
          <div className="sectorDetailBannerOverlay" aria-hidden />
          <div className="sectorDetailHeroFade" aria-hidden />

          <div className="uniContainer sectorDetailHeroContent">
            <header className="sectorDetailPageTitle">
              <div className="sectorDetailAccent" aria-hidden>
                <span className="sectorDetailAccentBadge" />
                <span className="sectorDetailAccentRail">
                  <span className="sectorDetailAccentRailLine sectorDetailAccentRailLine--black" />
                  <span className="sectorDetailAccentRailLine sectorDetailAccentRailLine--orange" />
                </span>
                <span className="sectorDetailAccentFoot">
                  <span className="sectorDetailAccentFootBar" />
                  <span className="sectorDetailAccentFootCap" />
                </span>
              </div>
              <h1>{sector.name}</h1>
            </header>
          </div>
        </section>

        <section className="sectorDetailStatement">
          <div className="uniContainer sectorDetailStatementInner">
            <p className="sectorDetailStatementLabel">Our commitment</p>
            <h2>{sector.headline}</h2>
          </div>
        </section>

        <section className="sectorDetailBody">
          <div className="uniContainer sectorDetailGrid">
            <div className="sectorDetailCopy">
              {sector.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
              {sector.bullets.length > 0 ? (
                <ul className="sectorDetailBullets">
                  {sector.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <aside className="sectorDetailPanel">
              <div className="sectorDetailPanelCard">
                <h3>Work with KVS Metal</h3>
                <p>
                  Get certified steel products, reliable supply, and expert support tailored to your {sector.name.toLowerCase()} project needs.
                </p>
                <Link href="/contact" className="sectorDetailCta">
                  Get in Touch
                </Link>
                <Link href="/#sectors" className="sectorDetailLink">
                  View all industries
                </Link>
              </div>

              <div className="sectorDetailRelated">
                <p className="sectorDetailRelatedLabel">Other industries</p>
                <ul>
                  {otherSectors.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/sectors/${item.slug}`}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <UniFooter />
      <UniWidgets />
    </div>
  )
}
