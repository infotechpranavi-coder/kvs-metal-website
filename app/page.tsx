'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import { KvsSkillsBrandMark } from '@/components/KvsSkillsBrandMark'
import { ScrollReveal } from '@/components/ScrollReveal'
import {
  aboutHomeBlocks,
  aboutUsHome,
  heroContent,
  PHONE_DISPLAY,
  PHONE_E164,
  procurementCta,
  productHighlights,
  productMarqueeTerms,
  productsCta,
  productsHome,
  sectorsSection,
} from '@/lib/content'
import { sectors } from '@/lib/sectors'
import { testimonials, testimonialsSection } from '@/lib/testimonials'
import {
  MetalPipeIcon,
  PrecisionFabricationIcon,
  StarIcon,
  SteelSheetIcon,
  StructuralSteelIcon,
  YellowScribble,
} from '@/components/UniIcons'

const features = aboutUsHome.features.map((item, index) => {
  const icons = [
    <SteelSheetIcon key="steel" />,
    <MetalPipeIcon key="pipe" />,
    <StructuralSteelIcon key="structural" />,
    <PrecisionFabricationIcon key="fab" />,
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

        <div className="uniHeroInner">
          <div className="uniHeroLayout">
            <div className="uniHeroMediaZone">
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

            <div className="uniHeroGeoStack" aria-hidden>
              <span className="uniHeroGeoHex" />
            </div>

            <div className="uniHeroPanelWrap">
              <div className="uniHeroPanelShape">
                <div className="uniHeroPanelContent">
                  <p className="uniHeroEyebrow">{heroContent.eyebrow}</p>
                  <div className="uniHeroTitleBlock">
                    <span className="uniHeroGhostTitle" aria-hidden>
                      {heroContent.title}
                    </span>
                    <h1>{heroContent.title}</h1>
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

                  <Link href="/about" className="uniHeroReadMore">
                    <span className="uniHeroReadMoreDots" aria-hidden>
                      <span />
                      <span />
                      <span />
                    </span>
                    Read more
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/products" className="uniHeroSideTab">
              Product Catalog
            </Link>

            <div className="uniHeroLayoutFoot">
              <div className="uniHeroSliderUi">
                <span className="uniHeroSliderCount">
                  {String(activeSlide + 1).padStart(2, '0')}
                  {' / '}
                  {String(heroSlides.length).padStart(2, '0')}
                </span>
                <div className="uniHeroSliderProgress" aria-hidden>
                  <span style={{ width: `${slideProgress}%` }} />
                </div>
              </div>
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
      <KvsSkillsBrandMark />

      <div className="uniContainer uniSkillsInner">
        <ScrollReveal className="uniSkillsTop">
          <div className="uniSkillsHeadingCol">
            <p className="uniSkillsEyebrow">{aboutUsHome.eyebrow}</p>
            <h2 className="uniSkillsTitle">{aboutUsHome.title}</h2>
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
        <div className="uniSectorsGridWrap">
          <div className="uniSectorsGrid">
            {sectors.map((sector, index) => (
              <ScrollReveal
                key={sector.slug}
                direction="up"
                delay={0.06 + index * 0.11}
                className={`uniSectorsCardReveal uniSectorsCard--${index + 1}`}
              >
                <Link href={`/sectors/${sector.slug}`} className="sectorCard uniSectorsCard">
                  <div className="sectorCardMedia">
                    <img src={sector.img} alt={sector.name} />
                    <div className="sectorCardOverlay" />
                    <h3>{sector.name}</h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

const steelMarqueeTerms = productMarqueeTerms

function SteelMarqueeSection() {
  const marqueeItems = [...steelMarqueeTerms, ...steelMarqueeTerms]

  return (
    <section className="uniSteelMarquee" aria-label="Steel product highlights">
      <div className="uniSteelMarqueeViewport">
        <div className="uniSteelMarqueeTrack">
          {marqueeItems.map((term, index) => (
            <span key={`${term}-${index}`} className="uniSteelMarqueeItem">
              {term}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

const aboutBlocks = aboutHomeBlocks

function AboutTextSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [scrollLinked, setScrollLinked] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const pin = pinRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section) return

    const STICKY_TOP = 112
    let raf = 0

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          revealObserver.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    revealObserver.observe(section)

    const update = () => {
      if (!pin || !viewport || !track) return

      const enabled =
        window.matchMedia('(min-width: 1025px)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
        aboutBlocks.length > 1

      setScrollLinked(enabled)
      section.classList.toggle('uniAboutText--scroll', enabled)

      if (!enabled) {
        section.style.removeProperty('height')
        track.style.removeProperty('transform')
        viewport.style.removeProperty('--about-slide-width')
        return
      }

      const slideWidth = viewport.clientWidth
      viewport.style.setProperty('--about-slide-width', `${slideWidth}px`)

      const scrollRange = Math.max(0, (aboutBlocks.length - 1) * slideWidth)
      const pinHeight = window.innerHeight - STICKY_TOP

      section.style.height = `${pinHeight + scrollRange}px`

      const sectionTop = section.getBoundingClientRect().top
      const progress =
        scrollRange > 0
          ? Math.min(1, Math.max(0, (-sectionTop + STICKY_TOP) / scrollRange))
          : 0

      track.style.transform = `translate3d(-${progress * scrollRange}px, 0, 0)`
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    const resizeObserver = new ResizeObserver(onScroll)
    ;[section, pin, viewport, track].forEach((node) => {
      if (node) resizeObserver.observe(node)
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()

    return () => {
      cancelAnimationFrame(raf)
      revealObserver.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`uniAboutText${revealed ? ' uniAboutText--revealed' : ''}${scrollLinked ? ' uniAboutText--scroll' : ''}`}
      id="about"
    >
      <div className="uniAboutDecor" aria-hidden>
        <span className="uniAboutDecorRing" />
        <span className="uniAboutDecorLine" />
      </div>
      <div ref={pinRef} className="uniAboutPin">
        <div className="uniAboutInner">
          <div className="uniAboutGrid">
            <div className="uniAboutIntro">
              <div className="uniEyebrow uniAboutRevealItem">{aboutUsHome.eyebrow}</div>
              <h2 className="uniAboutRevealItem">{aboutUsHome.title}</h2>
              <p className="uniAboutIntroLead uniAboutRevealItem">
                {aboutUsHome.paragraphs[0]}
              </p>
              <Link href="/about" className="uniAboutMoreLink uniAboutRevealItem">
                Learn more about KVS
              </Link>
            </div>

            <div ref={viewportRef} className="uniAboutCardsViewport">
              <div ref={trackRef} className="uniAboutCardsTrack">
                {aboutBlocks.map((block, index) => (
                  <article
                    key={block.id}
                    className="uniAboutCard uniAboutRevealItem"
                    style={{ '--reveal-delay': `${0.15 + index * 0.12}s` } as CSSProperties}
                  >
                    <div className="uniAboutCardBody">
                      <span className="uniAboutCardLabel">{block.label}</span>
                      <div className="uniAboutCardRule" aria-hidden />
                      <p className="uniAboutCardText">{block.text}</p>
                    </div>
                    <div className="uniAboutCardMedia">
                      <img src={block.image} alt={block.alt} loading="lazy" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
                    </div>
                    <footer className="uniTestimonialCardFooter">
                      <div className="uniTestimonialCardPortrait">
                        <img src={item.image} alt="" className="uniTestimonialCardAvatar" />
                      </div>
                      <div className="uniTestimonialCardAuthor">
                        <strong>{item.name}</strong>
                        <span>{item.role}</span>
                      </div>
                    </footer>
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
  text,
  ctaLabel,
  ctaHref,
  showPhone = false,
}: {
  title: string
  text: string
  ctaLabel: string
  ctaHref: string
  showPhone?: boolean
}) {
  return (
    <ScrollReveal as="section" className="uniHomeCta">
      <div className="uniContainer">
        <div className="uniHomeCtaInner">
          <div>
            <h2>{title}</h2>
            <p className="uniSectionText">{text}</p>
            {showPhone && (
              <p className="uniHomeCtaPhone">
                {procurementCta.phoneLabel}:{' '}
                <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
              </p>
            )}
          </div>
          <Link href={ctaHref} className="uniHeroBtn">
            {ctaLabel}
          </Link>
        </div>
      </div>
    </ScrollReveal>
  )
}

function ProductsSection() {
  return (
    <section className="uniProducts" id="products">
      <div className="uniContainer uniProductsInner">
        <div className="uniProductsSplit">
          <div className="uniProductsStickyCol">
            <div className="uniProductsSticky">
              <p className="uniProductsEyebrow">{productsHome.eyebrow}</p>
              <h2 className="uniProductsTitle">{productsHome.title}</h2>
              <p className="uniProductsLead">{productsHome.lead}</p>
              <div className="uniProductsScribble">
                <YellowScribble />
              </div>
            </div>
          </div>
          <div className="uniProductsCardsTrack">
            {productHighlights.map((category) => (
              <Link
                key={category.slug}
                href={category.href}
                className="sectorCard uniProductsCard"
              >
                <div className="sectorCardMedia">
                  <img src={category.img} alt={category.title} />
                  <div className="sectorCardOverlay" />
                  <h3>{category.title}</h3>
                </div>
              </Link>
            ))}
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
          text={procurementCta.text}
          ctaLabel={procurementCta.ctaLabel}
          ctaHref={procurementCta.ctaHref}
          showPhone
        />
        <MarketSectorsSection />
        <SteelMarqueeSection />
        <AboutTextSection />
        <PartnersSection />
        <ProductsSection />
        <HomeCtaSection
          title={productsCta.title}
          text={productsCta.text}
          ctaLabel={productsCta.ctaLabel}
          ctaHref={productsCta.ctaHref}
        />
        <TestimonialsSection />
      </main>
      <UniFooter />
      <UniWidgets hideUntilPastHero />
    </div>
  )
}
