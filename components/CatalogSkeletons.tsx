'use client'

import { useMaxWidthMedia } from '@/lib/use-compact-layout'

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

export function HomeProductsDiamondSkeleton({ count = 6 }: { count?: number }) {
  const compactGrid = useMaxWidthMedia(1024)

  return (
    <div className="uniProductsDiamondGrid" aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="uniSkeletonDiamondCard"
          style={compactGrid ? undefined : getDiamondPlacement(index)}
        >
          <span className="uniSkeletonDiamondFrame uniSkeleton" />
          <span className="uniSkeleton uniSkeleton--label" />
        </div>
      ))}
    </div>
  )
}

export function ProductCatalogHeroSkeleton() {
  return (
    <section className="sectorDetailHero productCatalogHero" aria-busy="true">
      <div className="uniSkeleton uniSkeleton--catalogHero" />
      <div className="sectorDetailHeroFade" aria-hidden />
      <div className="uniContainer productCatalogHeroContainer sectorDetailHeroContent">
        <div className="productCatalogHeroCopy">
          <div className="uniSkeleton uniSkeleton--title" />
          <div className="uniSkeleton uniSkeleton--line" />
        </div>
      </div>
    </section>
  )
}

export function ProductCatalogSidebarSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="uniSkeletonNavRow">
          <span className="uniSkeleton uniSkeleton--navThumb" />
          <span className="uniSkeleton uniSkeleton--navTitle" />
        </div>
      ))}
    </>
  )
}

export function ProductCatalogCardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="productCatalogCard uniSkeletonCard" aria-hidden>
          <div className="uniSkeleton uniSkeleton--cardMedia" />
          <div className="productCatalogCardBody">
            <div className="uniSkeleton uniSkeleton--cardTitle" />
            <div className="uniSkeleton uniSkeleton--cardLink" />
          </div>
        </div>
      ))}
    </>
  )
}
