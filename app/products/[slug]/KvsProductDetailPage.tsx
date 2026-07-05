'use client'

import { useState, type CSSProperties, type MouseEvent } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import { getProductCategoryForProduct, getProductsPageHref, getRelatedHomepageProducts, toReadableProductText } from '@/lib/products'
import { getProductEnquiryHref } from '@/lib/contact'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'

function BackArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19 12H5M5 12L11 6M5 12L11 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function KvsProductDetailPage({ product }: { product: Product }) {
  const related = getRelatedHomepageProducts(product.slug)
  const parentCategory = getProductCategoryForProduct(product.slug)
  const [activeImage, setActiveImage] = useState(0)
  const [imageZoom, setImageZoom] = useState({ active: false, x: 50, y: 50 })
  const images = product.images.length > 0 ? product.images : [product.img]

  const updateImageZoom = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setImageZoom({ active: true, x, y })
  }

  const galleryZoomStyle = {
    '--gallery-zoom-x': `${imageZoom.x}%`,
    '--gallery-zoom-y': `${imageZoom.y}%`,
  } as CSSProperties

  const specs = [
    { label: 'Category', value: product.category },
    product.material ? { label: 'Type / Grade', value: product.material } : null,
    product.dimensions ? { label: 'Size', value: product.dimensions } : null,
    product.standard ? { label: 'Standard', value: product.standard } : null,
    product.thickness ? { label: 'Thickness', value: product.thickness } : null,
    product.warranty ? { label: 'Warranty', value: product.warranty } : null,
    {
      label: 'Availability',
      value: product.inStock ? 'In stock — ready to supply' : 'Made to order',
    },
  ].filter(Boolean) as { label: string; value: string }[]

  const backHref = parentCategory
    ? getProductsPageHref(parentCategory.slug)
    : '/products'

  return (
    <div className="uniPage">
      <UniNavbar />
      <main className="uniProductDetail">
        <div className="uniProductTopBar">
          <div className="uniContainer uniProductTopBarInner">
            <Link href={backHref} className="uniProductBack" aria-label="Back to category">
              <BackArrowIcon />
            </Link>
          </div>
        </div>

        <section className="uniProductShowcase">
          <div className="uniContainer uniProductShowcaseGrid">
            <div className="uniProductGallery">
              <div
                className={`uniProductGalleryMain${imageZoom.active ? ' uniProductGalleryMain--zoom' : ''}`}
                style={galleryZoomStyle}
                onMouseEnter={updateImageZoom}
                onMouseMove={updateImageZoom}
                onMouseLeave={() => setImageZoom({ active: false, x: 50, y: 50 })}
              >
                {product.badge && (
                  <span className="uniProductBadge">{product.badge}</span>
                )}
                <img
                  key={images[activeImage]}
                  src={images[activeImage]}
                  alt={product.title}
                  className="uniProductGalleryImg"
                />
              </div>
              {images.length > 1 && (
                <div className="uniProductGalleryThumbs" role="tablist" aria-label="Product images">
                  {images.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      role="tab"
                      aria-selected={activeImage === index}
                      aria-label={`View image ${index + 1}`}
                      className={`uniProductGalleryThumb${activeImage === index ? ' uniProductGalleryThumb--active' : ''}`}
                      onClick={() => {
                        setActiveImage(index)
                        setImageZoom({ active: false, x: 50, y: 50 })
                      }}
                    >
                      <img src={src} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="uniProductInfo">
              <p className="uniProductCategory">{product.category}</p>
              <h1 className="uniProductTitle">{product.title}</h1>

              <p className="uniProductLead">{toReadableProductText(product.shortDescription)}</p>

              <div className="uniProductActions">
                <Link href={getProductEnquiryHref(product)} className="uniProductCtaPrimary">
                  Inquire Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {product.features.length > 0 ? (
          <section className="uniProductFeaturesBand">
            <div className="uniContainer">
              <div className="uniProductFeaturesHead">
                <h2 className="uniProductSectionTitle">Key features</h2>
                <p className="uniProductFeaturesSub">
                  Quality and supply you can rely on for {product.title}.
                </p>
              </div>
              <ul className="uniProductFeaturesGrid">
                {product.features.map((feature) => (
                  <li key={feature} className="uniProductFeatureCard">
                    <span className="uniProductFeatureText">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="uniProductDetails">
          <div className="uniContainer uniProductDetailsGrid">
            <div className="uniProductDescription">
              <div className="uniProductOverviewHead">
                <span className="uniProductOverviewEyebrow">Details</span>
                <h2 className="uniProductSectionTitle">Product overview</h2>
              </div>
              <p className="uniProductOverviewLead">
                {product.description.trim() || product.shortDescription}
              </p>
            </div>

            <div className="uniProductSpecsCard">
              <h2 className="uniProductSectionTitle">Specifications</h2>
              <dl className="uniProductSpecsList">
                {specs.map((item) => (
                  <div key={item.label} className="uniProductSpecRow">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="uniProductRelated">
            <div className="uniContainer">
              <div className="uniProductRelatedHeader">
                <div>
                  <p className="uniEyebrow">Explore more</p>
                  <h2>Related metal products</h2>
                </div>
                <Link
                  href={
                    parentCategory
                      ? getProductsPageHref(parentCategory.slug)
                      : '/products'
                  }
                  className="uniProductRelatedLink"
                >
                  View category
                </Link>
              </div>
              <div className="productCatalogGrid uniProductRelatedGrid">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/products/${item.slug}`}
                    className="productCatalogCard"
                    aria-label={`View details for ${item.title}`}
                  >
                    <div className="productCatalogCardMedia">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <div className="productCatalogCardBody">
                      <h4>{item.title}</h4>
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
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <UniFooter />
      <UniWidgets />
    </div>
  )
}
