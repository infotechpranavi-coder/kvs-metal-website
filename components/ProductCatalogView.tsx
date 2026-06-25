'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { HomepageProductCategory, Product } from '@/lib/products'
import {
  getCategoryProducts,
  homepageProductCategories,
} from '@/lib/products'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'

const CATALOG_HERO_IMG =
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85'

type ProductCatalogViewProps = {
  category: HomepageProductCategory | null
  products: Product[]
  searchQuery?: string
  onSelectCategory: (slug: string | null) => void
}

export function ProductCatalogView({
  category,
  products,
  searchQuery = '',
  onSelectCategory,
}: ProductCatalogViewProps) {
  const [expandedSlug, setExpandedSlug] = useState(category?.slug ?? '')

  useEffect(() => {
    setExpandedSlug(category?.slug ?? '')
  }, [category?.slug])

  const toggleExpanded = (slug: string) => {
    setExpandedSlug((current) => (current === slug ? '' : slug))
  }

  const openCategory = (slug: string | null) => {
    if (slug) setExpandedSlug(slug)
    onSelectCategory(slug)
  }

  const heroImg = category?.heroImg ?? category?.img ?? CATALOG_HERO_IMG
  const heroTitle = category?.title ?? 'Our Products'
  const heroEyebrow = category?.description ?? 'Full metal catalog'
  const gridTitle = searchQuery.trim()
    ? `Results for “${searchQuery.trim()}”`
    : category
      ? `Products in ${category.title}`
      : 'All products'

  return (
    <div className="uniPage">
      <UniNavbar lightMode />
      <main className="productCatalogPage">
        <section className="sectorDetailHero productCatalogHero">
          <img src={heroImg} alt="" className="sectorDetailBannerImg" />
          <div className="sectorDetailBannerOverlay" aria-hidden />
          <div className="sectorDetailHeroFade" aria-hidden />

          <div className="uniContainer productCatalogHeroContainer sectorDetailHeroContent">
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
              <h1>{heroTitle}</h1>
            </header>
          </div>
        </section>

        <section className="productCatalogBody">
          <div className="uniContainer productCatalogContainer productCatalogLayout">
            <aside className="productCatalogSidebarCol" aria-label="Product categories">
              <div className="productCatalogSidebar">
                <div className="productCatalogSidebarHead">
                  <p className="productCatalogSidebarLabel">Browse categories</p>
                  <span className="productCatalogSidebarCount">
                    {homepageProductCategories.length} types
                  </span>
                </div>

                <nav className="productCatalogNav">
                <div
                  className={`productCatalogNavGroup productCatalogNavGroup--all${!category ? ' productCatalogNavGroup--active' : ''}`}
                >
                  <button
                    type="button"
                    className="productCatalogNavMain productCatalogNavMain--all"
                    onClick={() => openCategory(null)}
                    aria-current={!category ? 'page' : undefined}
                  >
                    <span className="productCatalogNavThumb productCatalogNavThumb--all">
                      <span>All</span>
                    </span>
                    <span className="productCatalogNavCopy">
                      <span className="productCatalogNavTitle">All products</span>
                      <span className="productCatalogNavMeta">Browse full catalog</span>
                    </span>
                  </button>
                </div>

                {homepageProductCategories.map((item) => {
                  const isActive = category?.slug === item.slug
                  const isExpanded = expandedSlug === item.slug
                  const subProducts = getCategoryProducts(item)

                  return (
                    <div
                      key={item.slug}
                      className={`productCatalogNavGroup${isActive ? ' productCatalogNavGroup--active' : ''}${isExpanded ? ' productCatalogNavGroup--expanded' : ''}`}
                    >
                      <div className="productCatalogNavRow">
                        <button
                          type="button"
                          className="productCatalogNavMain"
                          onClick={() => openCategory(item.slug)}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <span className="productCatalogNavThumb">
                            <img src={item.img} alt="" />
                          </span>
                          <span className="productCatalogNavCopy">
                            <span className="productCatalogNavTitle">{item.title}</span>
                            <span className="productCatalogNavMeta">{item.description}</span>
                          </span>
                        </button>
                        <button
                          type="button"
                          className="productCatalogNavToggle"
                          onClick={() => toggleExpanded(item.slug)}
                          aria-expanded={isExpanded}
                          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.title} products`}
                        >
                          <span aria-hidden />
                        </button>
                      </div>

                      {isExpanded && subProducts.length > 0 && (
                        <ul className="productCatalogSubnav">
                          {subProducts.map((product) => (
                            <li key={product.slug}>
                              <Link href={`/products/${product.slug}`}>{product.title}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                })}
                </nav>
              </div>

              <div className="productCatalogSidebarCta">
                <p>Need pricing or bulk supply for your project?</p>
                <Link href="/contact" className="productCatalogSidebarBtn">
                  Get a Quote
                </Link>
              </div>
            </aside>

            <div className="productCatalogMain">
              <section
                className="productCatalogProducts"
                aria-label={category ? `${category.title} products` : 'All products'}
              >
                <div className="productCatalogProductsHead">
                  <div className="productCatalogProductsHeadCopy">
                    <span className="productCatalogEyebrow">{heroEyebrow}</span>
                    <h3>{gridTitle}</h3>
                    <p className="productCatalogProductsCount">
                      {products.length} product{products.length === 1 ? '' : 's'}
                    </p>
                  </div>
                </div>

                <div className="productCatalogGrid">
                  {products.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="productCatalogCard"
                    >
                      <div className="productCatalogCardMedia">
                        <img src={product.img} alt={product.title} />
                        <span className="productCatalogCardAction">View details</span>
                      </div>
                      <div className="productCatalogCardBody">
                        <h4>{product.title}</h4>
                        {product.material && <p>{product.material}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
      <UniFooter />
      <UniWidgets />
    </div>
  )
}
