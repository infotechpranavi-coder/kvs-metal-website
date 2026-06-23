'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import { ScrollReveal } from '@/components/ScrollReveal'
import {
  getCategoryHref,
  homepageProductCategories,
} from '@/lib/products'
import { sectors } from '@/lib/sectors'
import { testimonials } from '@/lib/testimonials'
import {
  EmpoweringIcon,
  InnovativeIcon,
  OnlineCoursesIcon,
  StarIcon,
  TailoredIcon,
  YellowScribble,
} from '@/components/UniIcons'

const features = [
  {
    icon: <OnlineCoursesIcon />,
    title: 'Steel sheets & plates',
    desc: 'High-grade MS, GI, and SS sheets for construction and fabrication.',
  },
  {
    icon: <EmpoweringIcon />,
    title: 'Pipes & tubes',
    desc: 'Durable metal pipes and tubes for industrial and commercial use.',
  },
  {
    icon: <InnovativeIcon />,
    title: 'Structural steel',
    desc: 'Angles, channels, beams, and TMT bars for strong frameworks.',
  },
  {
    icon: <TailoredIcon />,
    title: 'Custom fabrication',
    desc: 'Precision-cut and fabricated metal products built to your specs.',
  },
]

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
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85',
    title: 'Quality metal products, built to last',
    desc: 'Premium steel, pipes, sheets, and custom fabrication for construction, industry, and infrastructure projects across India.',
  },
  {
    img: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=1600&q=85',
    title: 'Marine-grade metals for demanding environments',
    desc: 'Corrosion-resistant plates, pipes, and alloys engineered for shipbuilding, ports, and offshore structures.',
  },
  {
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=85',
    title: 'Powering energy and industrial projects',
    desc: 'Certified pipes, structural steel, and fabricated components for refineries, plants, and heavy industry.',
  },
]

const heroStats = [
  { value: '15+', label: 'Years' },
  { value: '98%', label: 'On-time' },
  { value: '2K+', label: 'Clients' },
]

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

  const slide = heroSlides[activeSlide]
  const heroStyle = {
    '--hero-inset': `${shrink * 56}px`,
    '--hero-radius': `${shrink * 28}px`,
    '--hero-height-offset': `${shrink * 140}px`,
    '--hero-inset-bottom': `${shrink * 36}px`,
    '--hero-shrink-progress': shrink,
  } as React.CSSProperties

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
              key={item.img}
              className={`uniHeroSlide${index === activeSlide ? ' uniHeroSlide--active' : ''}`}
              style={{ backgroundImage: `url(${item.img})` }}
            />
          ))}
        </div>

        <div className="uniHeroInner">
          <div className="uniHeroContent">
            <div className="uniHeroLeft">
              <h1 key={slide.title}>{slide.title}</h1>
              <div className="uniHeroActions">
                <Link href="/products" className="uniHeroBtn">Explore Products</Link>
                <Link href="/contact" className="uniHeroBtnGhost">Get a Quote</Link>
              </div>
            </div>
            <div className="uniHeroRight">
              <p key={slide.desc} className="uniHeroDesc">{slide.desc}</p>
            </div>
          </div>

          <div className="uniHeroBottom">
            <div className="uniHeroStats">
              {heroStats.map((stat) => (
                <div key={stat.label} className="uniHeroStat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

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

          <div className="uniHeroScribble">
            <YellowScribble />
          </div>
        </div>
      </section>
    </div>
  )
}

function SkillsSection() {
  return (
    <ScrollReveal as="section" className="uniSkills">
      <svg className="uniSkillsBlob" viewBox="0 0 280 280" aria-hidden>
        <defs>
          <pattern id="blobPattern" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.4)" />
          </pattern>
        </defs>
        <path
          d="M140 20 C200 10, 260 60, 250 140 C240 220, 160 270, 80 250 C0 230, 20 80, 60 40 C90 10, 100 25, 140 20Z"
          fill="url(#blobPattern)"
        />
        <path
          d="M140 20 C200 10, 260 60, 250 140 C240 220, 160 270, 80 250 C0 230, 20 80, 60 40 C90 10, 100 25, 140 20Z"
          fill="#FF8FA0"
          opacity="0.7"
        />
        <path
          d="M160 40 C210 30, 250 80, 240 150 C230 200, 180 240, 120 230 C60 220, 50 100, 90 60 C110 40, 130 45, 160 40Z"
          fill="#FF6B35"
          opacity="0.5"
        />
      </svg>

      <div className="uniContainer">
        <ScrollReveal className="uniSkillsTop">
          <div>
            <div className="uniEyebrow">Trusted metal supplier</div>
            <h2>Strength and precision in every product</h2>
          </div>
          <div className="uniSkillsText">
            <p>
              KVS Metal is a leading supplier of premium metal products for construction, manufacturing, and industrial projects. From steel sheets and roofing to pipes, angles, and custom fabrication, we deliver materials that meet the highest quality standards.
            </p>
            <p>
              With years of industry experience, competitive pricing, and reliable delivery, we help builders, contractors, and businesses get the right metal solutions on time, every time.
            </p>
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
      <div className="uniSectorsDecor" aria-hidden>
        <div className="uniSectorsDecorShape uniSectorsDecorShape--tl" />
        <div className="uniSectorsDecorShape uniSectorsDecorShape--br" />
      </div>
      <div className="uniContainer uniSectorsInner">
        <ScrollReveal direction="left" className="uniSectorsTitleWrap">
          <h2 className="uniSectorsTitle uniSectionTitle">
            Key
            <br />
            Market
            <br />
            Sectors
          </h2>
        </ScrollReveal>
        <ScrollReveal direction="right" delay={0.12} className="uniSectorsGridWrap">
          <div className="uniSectorsGrid">
            {sectors.map((sector) => (
              <Link
                key={sector.slug}
                href={`/sectors/${sector.slug}`}
                className="sectorCard"
              >
                <div className="sectorCardMedia">
                  <img src={sector.img} alt={sector.name} />
                  <div className="sectorCardOverlay" />
                  <h3>{sector.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </ScrollReveal>
  )
}

const aboutParagraphs = [
  'KVS Metal is a trusted name in the metal products industry, supplying high-quality steel, pipes, sheets, and fabricated components to clients across the region. Our mission is to provide durable, certified metal products at competitive prices.',
  'Founded with a commitment to quality and service, KVS Metal has grown into a reliable partner for contractors, builders, and industries. We source from leading mills and maintain strict quality checks on every batch we deliver.',
]

function AboutTextSection() {
  const copyRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const copy = copyRef.current
    if (!copy) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -5% 0px' },
    )

    observer.observe(copy)
    return () => observer.disconnect()
  }, [])

  return (
    <ScrollReveal as="section" className="uniAboutText" id="about">
      <div className="uniContainer">
        <div className="uniAboutSticky">
          <ScrollReveal direction="left" className="uniAboutStickySide">
            <div className="uniEyebrow">Built on trust</div>
            <h2>About us</h2>
            <Link href="/about" className="uniAboutMoreLink">Learn more about KVS</Link>
          </ScrollReveal>
          <div
            ref={copyRef}
            className={`uniAboutCopy${revealed ? ' uniAboutCopy--revealed' : ''}`}
          >
            {aboutParagraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 40)}
                style={{ '--reveal-delay': `${index * 0.18}s` } as React.CSSProperties}
              >
                {paragraph}
              </p>
            ))}
          </div>
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
          <div className="uniEyebrow">Client feedback</div>
          <h2>Trusted by builders and industry professionals</h2>
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
              {testimonials.map((item) => (
                <article
                  key={item.id}
                  className="uniTestimonialsSlide"
                  aria-hidden={testimonials[active].id !== item.id}
                >
                  <div className="uniTestimonialCard">
                    <div className="uniTestimonialCardStars" aria-hidden>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <StarIcon key={n} />
                      ))}
                    </div>
                    <blockquote className="uniTestimonialCardQuote">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                    <footer className="uniTestimonialCardAuthor">
                      <img src={item.image} alt="" className="uniTestimonialCardAvatar" />
                      <div>
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

const productCategoryRows = [
  homepageProductCategories.slice(0, 4),
  homepageProductCategories.slice(4, 8),
]

function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`uniProducts${revealed ? ' uniProducts--revealed' : ''}`}
      id="products"
    >
      <div className="uniSectorsDecor" aria-hidden>
        <div className="uniSectorsDecorShape uniSectorsDecorShape--tl" />
        <div className="uniSectorsDecorShape uniSectorsDecorShape--br" />
      </div>
      <div className="uniContainer uniProductsInner">
        <h2 className="uniProductsTitle uniSectionTitle">
          Our
          <br />
          Products
        </h2>
        <div className="uniProductsCards">
          {productCategoryRows.map((row, rowIndex) => (
            <div
              key={row.map((item) => item.slug).join('-')}
              className={`uniProductsRow uniProductsRow--${rowIndex + 1}`}
            >
              {row.map((category) => (
                <Link
                  key={category.slug}
                  href={getCategoryHref(category)}
                  className="sectorCard"
                >
                  <div className="sectorCardMedia">
                    <img src={category.img} alt={category.title} />
                    <div className="sectorCardOverlay" />
                    <h3>{category.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ))}
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
        <MarketSectorsSection />
        <AboutTextSection />
        <PartnersSection />
        <ProductsSection />
        <TestimonialsSection />
      </main>
      <UniFooter />
      <UniWidgets />
    </div>
  )
}
