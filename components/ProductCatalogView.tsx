'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { MaterialSupply } from '@/lib/materials'
import type { HomepageProductCategory, Product } from '@/lib/products'
import {
  getProductsForCategory,
  getProductDetailHref,
  homepageProductCategories,
} from '@/lib/products'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import {
  ProductCatalogCardSkeleton,
  ProductCatalogHeroSkeleton,
  ProductCatalogSidebarSkeleton,
} from '@/components/CatalogSkeletons'
import { catalogCardImageUrl } from '@/lib/image-url'

type ProductCatalogViewProps = {
  loading?: boolean
  category: HomepageProductCategory | null
  material?: MaterialSupply | null
  sidebarCategories?: HomepageProductCategory[]
  catalogProducts: Product[]
  products: Product[]
  searchQuery?: string
  onSelectCategory: (slug: string | null) => void
}

export function ProductCatalogView({
  loading = false,
  category,
  material = null,
  sidebarCategories,
  catalogProducts,
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

    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches && slug) {
      requestAnimationFrame(() => {
        document.getElementById('productCatalogProducts')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
    }
  }

  const navCategories = sidebarCategories ?? homepageProductCategories

  const heroTitle = category?.title ?? material?.title ?? 'Our Products'
  const heroDescription = category?.description?.trim() || material?.description?.trim() || ''
  const gridTitle = searchQuery.trim()
    ? `Results for “${searchQuery.trim()}”`
    : category
      ? `Products in ${category.title}`
      : material
        ? `${material.title} products`
        : 'All products'

  return (
    <div className="uniPage">
      <UniNavbar />
      <main className="productCatalogPage">
        {loading ? (
          <ProductCatalogHeroSkeleton />
        ) : (
          <section className="sectorDetailHero productCatalogHero productCatalogHero--solid">
            <div className="uniContainer productCatalogHeroContainer sectorDetailHeroContent">
              <header className="sectorDetailPageTitle productCatalogHeroTitleBlock">
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
                <div className="productCatalogHeroMain">
                  <div className="productCatalogHeroHeadRow">
                    <div className="productCatalogHeroCopy">
                      <h1>{heroTitle}</h1>
                      {heroDescription ? (
                        <p className="productCatalogHeroLead">{heroDescription}</p>
                      ) : null}
                    </div>
                    <div className="productCatalogBulkCta">
                      <h4>Bulk pricing</h4>
                      <p>Need pricing or bulk supply for your project?</p>
                      <Link href="/contact" className="productCatalogSidebarBtn">
                        Get a Quote
                      </Link>
                    </div>
                  </div>
                </div>
              </header>
            </div>
          </section>
        )}

        <section className="productCatalogBody">
          <div className="uniContainer productCatalogContainer productCatalogLayout">
            <aside className="productCatalogSidebarCol" aria-label="Product categories">
              <div className="productCatalogSidebar">
                <nav
                  className="productCatalogNav"
                  aria-label={material ? `${material.title} categories` : 'Browse categories'}
                >
                  {loading ? (
                    <ProductCatalogSidebarSkeleton count={6} />
                  ) : (
                    navCategories.map((item) => {
                      const isActive = category?.slug === item.slug
                      const isExpanded = expandedSlug === item.slug
                      const subProducts = getProductsForCategory(item, catalogProducts)

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
                                <img
                                  src={catalogCardImageUrl(item.img, 96)}
                                  alt=""
                                  loading="lazy"
                                  decoding="async"
                                />
                              </span>
                              <span className="productCatalogNavCopy">
                                <span className="productCatalogNavTitle">{item.title}</span>
                              </span>
                            </button>
                            <button
                              type="button"
                              className="productCatalogNavToggle"
                              onClick={() => toggleExpanded(item.slug)}
                              aria-expanded={isExpanded}
                              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.title} products`}
                            >
                              <span className="productCatalogNavToggleIcon" aria-hidden>
                                {isExpanded ? '−' : '+'}
                              </span>
                            </button>
                          </div>

                          {isExpanded ? (
                            subProducts.length > 0 ? (
                              <div className="productCatalogSubnavWrap">
                                <ul className="productCatalogSubnav">
                                {subProducts.map((product) => (
                                  <li key={product.slug}>
                                    <Link
                                      href={getProductDetailHref(product.slug, {
                                        categorySlug: item.slug,
                                        materialSlug: material?.slug,
                                      })}
                                      className="productCatalogSubnavLink"
                                    >
                                      <span className="productCatalogSubnavThumb">
                                        <img
                                          src={catalogCardImageUrl(product.img, 84)}
                                          alt=""
                                          loading="lazy"
                                          decoding="async"
                                        />
                                      </span>
                                      <span className="productCatalogSubnavTitle">{product.title}</span>
                                    </Link>
                                  </li>
                                ))}
                                </ul>
                              </div>
                            ) : (
                              <p className="productCatalogSubnavEmpty">No products listed yet</p>
                            )
                          ) : null}
                        </div>
                      )
                    })
                  )}
                </nav>
              </div>
            </aside>

            <div className="productCatalogMain">
              <section
                id="productCatalogProducts"
                className="productCatalogProducts"
                aria-label={category ? `${category.title} products` : 'All products'}
              >
                <div className="productCatalogProductsHead">
                  {loading ? (
                    <>
                      <div className="uniSkeleton uniSkeleton--gridTitle" />
                      <div className="uniSkeleton uniSkeleton--gridCount" />
                    </>
                  ) : (
                    <>
                      <h3>{gridTitle}</h3>
                      <p className="productCatalogProductsCount">
                        {products.length} product{products.length === 1 ? '' : 's'}
                      </p>
                    </>
                  )}
                </div>

                <div className="productCatalogGrid">
                  {loading ? (
                    <ProductCatalogCardSkeleton count={6} />
                  ) : (
                    products.map((product) => (
                      <Link
                        key={product.slug}
                        href={getProductDetailHref(product.slug, {
                          categorySlug: category?.slug,
                          materialSlug: material?.slug,
                        })}
                        className="productCatalogCard"
                        aria-label={`View details for ${product.title}`}
                      >
                        <div className="productCatalogCardMedia">
                          <img
                            src={catalogCardImageUrl(product.img)}
                            alt={product.title}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="productCatalogCardBody">
                          <h4>{product.title}</h4>
                          <span className="productCatalogCardLink">
                            View details
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <path
                                d="M5 12H19M19 12L13 6M19 12L13 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                      </Link>
                    ))
                  )}
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
