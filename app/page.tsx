'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import { ScrollReveal } from '@/components/ScrollReveal'
import {
  aboutUsHome,
  heroContent,
  PHONE_DISPLAY,
  PHONE_E164,
  procurementCta,
  productHighlights,
  productsCta,
  productsHome,
  sectorsSection,
} from '@/lib/content'
import { sectors } from '@/lib/sectors'
import { testimonials, testimonialsSection } from '@/lib/testimonials'
import {
  CompetitivePricingIcon,
  CustomerServiceIcon,
  GlobalSourcingIcon,
  StarIcon,
  TimelyDeliveryIcon,
  YellowScribble,
} from '@/components/UniIcons'

const features = aboutUsHome.features.map((item, index) => {
  const icons = [
    <CompetitivePricingIcon key="pricing" />,
    <TimelyDeliveryIcon key="delivery" />,
    <GlobalSourcingIcon key="sourcing" />,
    <CustomerServiceIcon key="service" />,
  ]
  return {
    icon: icons[index] ?? icons[0],
    title: item.title,
    desc: item.desc,
  }
})

const partners = [
  { name: 'TATA', className: 'uniPartnerLogo--sny' },
  { name: 'JSW', className: '' },
  { name: 'SAIL', className: '' },
  { name: 'Jindal', className: 'uniPartnerLogo--moodle' },
  { name: 'Hindalco', className: '' },
  { name: 'Essar', className: 'uniPartnerLogo--orfit' },
]

const heroSlides = [
  {
    poster: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85',
    video: '/hero/steel%203.mp4',
  },
  {
    poster: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85',
    video: '/hero/steel_2.mp4',
  },
  {
    poster: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1600&q=85',
    video: '/hero/steel_video.mp4',
  },
]

const heroStats = heroContent.stats

const SLIDE_MS = 6500

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [slideProgress, setSlideProgress] = useState(0)
  const [shrink, setShrink] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current
      if (!hero) return
      const scrollY = window.scrollY
      const shrinkDistance = hero.offsetHeight * 0.72
      const progress = Math.min(1, Math.max(0, scrollY / shrinkDistance))
      setShrink(progress)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    setSlideProgress(0)
    const started = Date.now()
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - started
      const progress = Math.min(100, (elapsed / SLIDE_MS) * 100)
      setSlideProgress(progress)
      if (elapsed >= SLIDE_MS) {
        setActiveSlide((current) => (current + 1) % heroSlides.length)
        window.clearInterval(timer)
      }
    }, 40)

    return () => window.clearInterval(timer)
  }, [activeSlide])

  const heroStyle = {
    '--hero-inset': `${shrink * 56}px`,
    '--hero-radius': `${shrink * 28}px`,
    '--hero-height-offset': `${shrink * 140}px`,
    '--hero-inset-bottom': `${shrink * 36}px`,
    '--hero-shrink-progress': shrink,
  } as CSSProperties

  return (
    <div className="uniHeroShell">
      <section
        ref={heroRef}
        className="uniHero"
        style={heroStyle}
        aria-label="Hero banner"
      >
        <div className="uniHeroInner">
          <div className="uniHeroSplit">
            <div className="uniHeroVideoCol">
              <div className="uniHeroSlides" aria-hidden>
                {heroSlides.map((item, index) => (
                  <div
                    key={item.video}
                    className={`uniHeroSlide${index === activeSlide ? ' uniHeroSlide--active' : ''}`}
                  >
                    <video
                      className="uniHeroSlideVideo"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={item.poster}
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                  </div>
                ))}
              </div>

              <div className="uniHeroStatsBar">
                <div className="uniHeroStats">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="uniHeroStat">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="uniHeroContentCol">
              <div className="uniHeroPanelShape">
                <div className="uniHeroPanelCard">
                  <span className="uniHeroPanelCardAccent" aria-hidden />
                  <span className="uniHeroPanelCardShape" aria-hidden />
                  <span className="uniHeroPanelEdgeBorder" aria-hidden>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        className="uniHeroPanelEdgeBorderOrange"
                        d="M 100,0 L 0,50 L 100,100"
                        vectorEffect="non-scaling-stroke"
                      />
                      <path
                        className="uniHeroPanelEdgeBorderLight"
                        d="M 96,4 L 6,50 L 96,96"
                        vectorEffect="non-scaling-stroke"
                      />
                      <path
                        className="uniHeroPanelEdgeBorderNavy"
                        d="M 91,9 L 12,50 L 91,91"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </span>
                  <div className="uniHeroPanelContent">
                    <div className="uniHeroPanelMain">
                      <div className="uniHeroTitleBlock">
                        <span className="uniHeroGhostTitle" aria-hidden>
                          {heroContent.ghostTitle}
                        </span>
                        <h1>
                          <span className="uniHeroTitleLine uniHeroTitleLine--navy">
                            Build Smart.
                          </span>
                          <span className="uniHeroTitleLine uniHeroTitleLine--navy">
                            Build Strong.
                          </span>
                          <span className="uniHeroTitleLine uniHeroTitleLine--orange">
                            Build with KVS.
                          </span>
                        </h1>
                        <span className="uniHeroTitleRule" aria-hidden />
                      </div>
                      <p className="uniHeroDesc">{heroContent.description}</p>

                      <div className="uniHeroActions">
                        <Link href={heroContent.ctaHref} className="uniHeroBtn">
                          {heroContent.ctaLabel}
                        </Link>
                        <Link href={heroContent.secondaryCtaHref} className="uniHeroBtnGhost">
                          {heroContent.secondaryCtaLabel}
                        </Link>
                      </div>
                    </div>

                    <Link href="/about" className="uniHeroReadMore">
                      <span className="uniHeroReadMoreDots" aria-hidden>
                        <span />
                        <span />
                        <span />
                      </span>
                      Read more
                    </Link>
                  </div>

                  <div className="uniHeroSliderUi">
                    <div className="uniHeroSliderMeta">
                      <span className="uniHeroSliderLabel">Featured</span>
                      <span className="uniHeroSliderCount">
                        {String(activeSlide + 1).padStart(2, '0')}
                        <span className="uniHeroSliderSep">/</span>
                        {String(heroSlides.length).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="uniHeroSliderTrack">
                      <div className="uniHeroSliderDots" aria-hidden>
                        {heroSlides.map((_, index) => (
                          <span
                            key={index}
                            className={`uniHeroSliderDot${
                              index === activeSlide ? ' uniHeroSliderDot--active' : ''
                            }`}
                          />
                        ))}
                      </div>
                      <div className="uniHeroSliderProgress" aria-hidden>
                        <span style={{ width: `${slideProgress}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/products" className="uniHeroSideTab">
                Product Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SkillsSection() {
  return (
    <ScrollReveal as="section" className="uniSkills">
      <div className="uniContainer uniSkillsInner">
        <ScrollReveal className="uniSkillsTop">
          <div className="uniSkillsHeadingCol">
            <p className="uniSkillsEyebrow">{aboutUsHome.eyebrow}</p>
            <h2 className="uniSkillsTitle">{`${aboutUsHome.tagline} ${aboutUsHome.title}`}</h2>
          </div>
          <div className="uniSkillsText">
            {aboutUsHome.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </ScrollReveal>

        <div className="uniFeatures">
          {features.map((f, index) => (
            <ScrollReveal key={f.title} className="uniFeature" delay={index * 0.08} direction="up">
              <div className="uniFeatureIcon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}

function MarketSectorsSection() {
  return (
    <ScrollReveal as="section" className="uniSectors" id="sectors">
      <div className="uniContainer uniSectorsInner">
        <ScrollReveal direction="up" className="uniSectorsTitleWrap">
          <h2 className="uniSectorsTitle">{sectorsSection.title}</h2>
          <p className="uniSectorsTagline">{sectorsSection.tagline}</p>
        </ScrollReveal>
        <div className="uniSectorsDiamondGrid">
            {sectors.map((sector, index) => (
              <ScrollReveal
                key={sector.slug}
                direction="up"
                delay={0.05 + index * 0.08}
                className="uniSectorsDiamondReveal"
              >
                <Link href={`/sectors/${sector.slug}`} className="uniSectorsDiamondCard">
                  <span className="uniSectorsDiamondAccent" aria-hidden />
                  <span className="uniSectorsDiamondFrame">
                    <span className="uniSectorsDiamondMedia">
                      <img src={sector.img} alt={sector.name} />
                      <span className="uniSectorsDiamondOverlay" aria-hidden />
                    </span>
                    <span className="uniSectorsDiamondLabel">{sector.name}</span>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
        </div>
      </div>
    </ScrollReveal>
  )
}

function PartnersSection() {
  const marqueeItems = [...partners, ...partners]

  return (
    <ScrollReveal as="section" className="uniPartners" aria-label="Trusted by leading firms">
      <div className="uniPartnersMarquee">
        <div className="uniPartnersTrack">
          {marqueeItems.map((partner, index) => (
            <span
              key={`${partner.name}-${index}`}
              className={`uniPartnerLogo ${partner.className}`}
            >
              {partner.name}
            </span>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}

function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const count = testimonials.length

  const goTo = (index: number) => {
    setActive((index + count) % count)
  }

  useEffect(() => {
    if (isPaused || count <= 1) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % count)
    }, 5500)

    return () => window.clearInterval(timer)
  }, [isPaused, count])

  return (
    <ScrollReveal as="section" className="uniTestimonials" aria-label="Client testimonials">
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsPaused(false)
          }
        }}
      >
      <div className="uniTestimonialsScribble" aria-hidden>
        <YellowScribble />
      </div>

      <div className="uniContainer">
        <header className="uniTestimonialsHeader">
          <div className="uniEyebrow">{testimonialsSection.eyebrow}</div>
          <h2>{testimonialsSection.title}</h2>
        </header>

        <div className="uniTestimonialsSlider">
          <button
            type="button"
            className="uniTestimonialsArrow uniTestimonialsArrow--prev"
            aria-label="Previous testimonial"
            onClick={() => goTo(active - 1)}
          >
            <span aria-hidden>‹</span>
          </button>

          <div className="uniTestimonialsViewport">
            <div
              className="uniTestimonialsTrack"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {testimonials.map((item, index) => (
                <article
                  key={item.id}
                  className="uniTestimonialsSlide"
                  aria-hidden={testimonials[active].id !== item.id}
                >
                  <div className="uniTestimonialCard">
                    <span className="uniTestimonialCardFrameAccent" aria-hidden />
                    <span className="uniTestimonialCardFrameShape" aria-hidden />
                    <div className="uniTestimonialCardInner">
                      <div className="uniTestimonialCardAccent" aria-hidden />
                      <div className="uniTestimonialCardBody">
                        <div className="uniTestimonialCardHead">
                          <div className="uniTestimonialCardRating" aria-label="5 out of 5 stars">
                            <div className="uniTestimonialCardStars" aria-hidden>
                              {[1, 2, 3, 4, 5].map((n) => (
                                <StarIcon key={n} />
                              ))}
                            </div>
                            <span className="uniTestimonialCardRatingLabel">5.0 rating</span>
                          </div>
                          <span className="uniTestimonialCardIndex" aria-hidden>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="uniTestimonialCardQuoteWrap">
                          <span className="uniTestimonialCardMark" aria-hidden>&ldquo;</span>
                          <blockquote className="uniTestimonialCardQuote">{item.quote}</blockquote>
                        </div>
                        <div className="uniTestimonialCardGraphic" aria-hidden>
                          <YellowScribble />
                        </div>
                      </div>
                      <footer className="uniTestimonialCardFooter">
                        <div className="uniTestimonialCardPortrait">
                          <span className="uniTestimonialCardPortraitAccent" aria-hidden />
                          <img src={item.image} alt="" className="uniTestimonialCardAvatar" />
                        </div>
                        <div className="uniTestimonialCardAuthor">
                          <strong>{item.name}</strong>
                          <span>{item.role}</span>
                        </div>
                      </footer>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="uniTestimonialsArrow uniTestimonialsArrow--next"
            aria-label="Next testimonial"
            onClick={() => goTo(active + 1)}
          >
            <span aria-hidden>›</span>
          </button>
        </div>

        <div className="uniTestimonialsNav" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-label={`Testimonial from ${item.name}`}
              className={`uniTestimonialsDot${active === index ? ' uniTestimonialsDot--active' : ''}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
      </div>
    </ScrollReveal>
  )
}

function HomeCtaSection({
  title,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  showPhone = false,
}: {
  title: string
  ctaLabel: string
  ctaHref: string
  image: string
  imageAlt: string
  showPhone?: boolean
}) {
  return (
    <section className="uniHomeCta">
      <div className="uniContainer">
        <div className="uniHomeCtaInner">
          <div className="uniHomeCtaContent">
            <div className="uniHomeCtaRow">
              <h2 className="uniHomeCtaTitle">{title}</h2>
              <div className="uniHomeCtaEnd">
                {showPhone && (
                  <p className="uniHomeCtaPhone">
                    {procurementCta.phoneLabel}:{' '}
                    <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
                  </p>
                )}
                <Link href={ctaHref} className="uniHomeCtaBtn">
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </div>
          <div className="uniHomeCtaMedia">
            <img src={image} alt={imageAlt} loading="lazy" />
            <span className="uniHomeCtaMediaOverlay" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductsSection() {
  return (
    <section className="uniProducts" id="products">
      <div className="uniContainer uniProductsInner">
        <div className="uniProductsSplit">
          <div className="uniProductsHeader">
            <p className="uniProductsEyebrow">{productsHome.eyebrow}</p>
            <h2 className="uniProductsTitle">{productsHome.title}</h2>
            <p className="uniProductsLead">{productsHome.lead}</p>
            <div className="uniProductsScribble">
              <YellowScribble />
            </div>
          </div>
          <div className="uniProductsDiamondWrap">
            <div className="uniProductsDiamondGrid">
              {productHighlights.map((category) => (
                <Link
                  key={category.slug}
                  href={category.href}
                  className="uniSectorsDiamondCard"
                >
                  <span className="uniSectorsDiamondAccent" aria-hidden />
                  <span className="uniSectorsDiamondFrame">
                    <span className="uniSectorsDiamondMedia">
                      <img src={category.img} alt={category.title} />
                      <span className="uniSectorsDiamondOverlay" aria-hidden />
                    </span>
                    <span className="uniSectorsDiamondLabel">{category.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function KvsMetalPage() {
  return (
    <div className="uniPage">
      <UniNavbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <HomeCtaSection
          title={procurementCta.title}
          ctaLabel={procurementCta.ctaLabel}
          ctaHref={procurementCta.ctaHref}
          image={procurementCta.image}
          imageAlt={procurementCta.imageAlt}
          showPhone
        />
        <MarketSectorsSection />
        <PartnersSection />
        <ProductsSection />
        <HomeCtaSection
          title={productsCta.title}
          ctaLabel={productsCta.ctaLabel}
          ctaHref={productsCta.ctaHref}
          image={productsCta.image}
          imageAlt={productsCta.imageAlt}
        />
        <TestimonialsSection />
      </main>
      <UniFooter />
      <UniWidgets hideUntilPastHero />
    </div>
  )
}
