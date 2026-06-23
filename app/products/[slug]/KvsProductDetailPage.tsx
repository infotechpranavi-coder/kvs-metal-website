'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import { getProductCategoryForProduct, getProductsPageHref, getRelatedHomepageProducts } from '@/lib/products'
import { getProductEnquiryHref } from '@/lib/contact'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import { ClockIcon, StarIcon } from '@/components/UniIcons'

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
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
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
  const images = product.images.length > 0 ? product.images : [product.img]

  const specs = [
    { label: 'Category', value: product.category },
    product.material ? { label: 'Material', value: product.material } : null,
    product.dimensions ? { label: 'Dimensions', value: product.dimensions } : null,
    { label: 'SKU', value: product.sku },
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
      <UniNavbar lightMode />
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
              <div className="uniProductGalleryMain">
                {product.badge && (
                  <span className="uniProductBadge">{product.badge}</span>
                )}
                <img
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
                      onClick={() => setActiveImage(index)}
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

              <div className="uniProductRating">
                <span className="uniProductRatingStars" aria-hidden>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <StarIcon key={n} />
                  ))}
                </span>
                <span className="uniProductRatingValue">{product.rating}</span>
                <span className="uniProductRatingCount">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <p className="uniProductPrice">{product.price}</p>
              <p className="uniProductLead">{product.shortDescription}</p>

              <dl className="uniProductQuickSpecs">
                {specs.slice(0, 4).map((item) => (
                  <div key={item.label} className="uniProductQuickSpec">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="uniProductActions">
                <Link href={getProductEnquiryHref(product)} className="uniProductCtaPrimary">
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="uniProductFeaturesBand">
          <div className="uniContainer">
            <div className="uniProductFeaturesHead">
              <h2 className="uniProductSectionTitle">Key features</h2>
              <p className="uniProductFeaturesSub">
                Quality and supply you can rely on for {product.title.toLowerCase()}.
              </p>
            </div>
            <ul className="uniProductFeaturesGrid">
              {product.features.map((feature, index) => (
                <li key={feature} className="uniProductFeatureCard">
                  <span className="uniProductFeatureIndex" aria-hidden>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="uniProductFeatureIcon" aria-hidden>
                    <CheckIcon />
                  </span>
                  <span className="uniProductFeatureText">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="uniProductDetails">
          <div className="uniContainer uniProductDetailsGrid">
            <div className="uniProductDescription">
              <h2 className="uniProductSectionTitle">Product overview</h2>
              <p>{product.description}</p>
            </div>

            <div className="uniProductSpecsCard">
              <h2 className="uniProductSectionTitle">Specifications</h2>
              <table className="uniProductSpecsTable">
                <tbody>
                  {specs.map((item) => (
                    <tr key={item.label}>
                      <th scope="row">{item.label}</th>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              <div className="uniProductRelatedGrid">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/products/${item.slug}`}
                    className="uniProductRelatedCard"
                  >
                    <div className="uniProductRelatedImg">
                      <img src={item.img} alt={item.title} />
                    </div>
                    <div className="uniProductRelatedBody">
                      <p className="uniProductRelatedCategory">{item.category}</p>
                      <h3>{item.title}</h3>
                      <div className="uniProductRelatedMeta">
                        <ClockIcon />
                        <span>{item.dimensions ?? item.material ?? item.category}</span>
                      </div>
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
