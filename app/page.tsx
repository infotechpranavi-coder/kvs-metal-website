'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import { ScrollReveal } from '@/components/ScrollReveal'
import {
  aboutUsHome,
  heroContent,
  procurementCta,
  productsCta,
  sectorsSection,
} from '@/lib/content'
import { sectors } from '@/lib/sectors'
import { testimonials, testimonialsSection } from '@/lib/testimonials'
import { MaterialSuppliesSection } from '@/components/MaterialSuppliesSection'
import { HomeProductsSection } from '@/components/HomeProductsSection'
import { HomePartnersSection } from '@/components/HomePartnersSection'
import { HomeCtaSection } from '@/components/HomeCtaSection'
import {
  CompetitivePricingIcon,
  CustomerServiceIcon,
  GlobalSourcingIcon,
  StarIcon,
  TimelyDeliveryIcon,
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

const HERO_VIDEO = '/hero/Precise-Quality-1080p.mp4'

const heroSlides = [{ video: HERO_VIDEO }]

const heroStats = heroContent.stats

const SLIDE_MS = 6500
/** Playback level when the user turns sound on (0–1). */
const HERO_VIDEO_VOLUME = 0.25

type HeroVideoAudioGraph = {
  ctx: AudioContext
  gain: GainNode
}

const heroVideoAudioGraphs = new WeakMap<HTMLVideoElement, HeroVideoAudioGraph>()

function getHeroVideoAudioGraph(video: HTMLVideoElement): HeroVideoAudioGraph | null {
  const existing = heroVideoAudioGraphs.get(video)
  if (existing) return existing

  try {
    const ctx = new AudioContext()
    const source = ctx.createMediaElementSource(video)
    const gain = ctx.createGain()
    gain.gain.value = HERO_VIDEO_VOLUME
    source.connect(gain)
    gain.connect(ctx.destination)
    const graph = { ctx, gain }
    heroVideoAudioGraphs.set(video, graph)
    return graph
  } catch {
    return null
  }
}

function setHeroVideoMuted(video: HTMLVideoElement, muted: boolean) {
  const graph = getHeroVideoAudioGraph(video)

  if (graph) {
    graph.gain.gain.value = HERO_VIDEO_VOLUME
    if (!muted) void graph.ctx.resume()
  } else {
    video.volume = HERO_VIDEO_VOLUME
  }

  video.muted = muted
  if (muted) {
    video.setAttribute('muted', '')
  } else {
    video.removeAttribute('muted')
  }
}

function HeroVolumeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="m22 9-6 6M16 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function HeroVolumeOnIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" aria-hidden>
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function HeroSection() {
  const progressRef = useRef<HTMLSpanElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.defaultPlaybackRate = 1
    video.playbackRate = 1
    getHeroVideoAudioGraph(video)
    setHeroVideoMuted(video, true)

    const tryPlay = () => {
      void video.play().catch(() => {})
    }

    video.addEventListener('canplay', tryPlay, { once: true })
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) tryPlay()

    return () => {
      video.removeEventListener('canplay', tryPlay)
    }
  }, [])

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !isMuted
    setHeroVideoMuted(video, nextMuted)
    if (!nextMuted) {
      void video.play().catch(() => {})
    }
    setIsMuted(nextMuted)
  }

  useEffect(() => {
    if (heroSlides.length <= 1) return

    const progressEl = progressRef.current
    if (progressEl) progressEl.style.width = '0%'

    const started = performance.now()
    let rafId = 0

    const tick = (now: number) => {
      const elapsed = now - started
      const progress = Math.min(100, (elapsed / SLIDE_MS) * 100)
      if (progressEl) progressEl.style.width = `${progress}%`

      if (elapsed >= SLIDE_MS) {
        setActiveSlide((current) => (current + 1) % heroSlides.length)
        return
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [activeSlide])

  return (
    <div className="uniHeroShell">
      <section className="uniHero" aria-label="Hero banner">
        <div className="uniHeroInner">
          <div className="uniHeroSplit">
            <div className="uniHeroVideoCol">
              <div className="uniHeroSlides" aria-hidden>
                <video
                  ref={videoRef}
                  className="uniHeroSlideVideo"
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  disableRemotePlayback
                >
                  <source src={HERO_VIDEO} type="video/mp4" />
                </video>
              </div>

              <button
                type="button"
                className="uniHeroMuteBtn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute hero video' : 'Mute hero video'}
                aria-pressed={!isMuted}
              >
                {isMuted ? <HeroVolumeOffIcon /> : <HeroVolumeOnIcon />}
              </button>

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
                <span className="uniHeroPanelEdgeBorder" aria-hidden>
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <g transform="translate(-5.5 0)">
                      <path
                        className="uniHeroPanelEdgeBorderOrange"
                        d="M 100,0 L 0,50 L 100,100"
                        vectorEffect="nonScalingStroke"
                      />
                    </g>
                    <g transform="translate(-2.75 0)">
                      <path
                        className="uniHeroPanelEdgeBorderNavy"
                        d="M 100,0 L 0,50 L 100,100"
                        vectorEffect="nonScalingStroke"
                      />
                    </g>
                    <path
                      className="uniHeroPanelEdgeBorderLight"
                      d="M 100,0 L 0,50 L 100,100"
                      vectorEffect="nonScalingStroke"
                    />
                  </svg>
                </span>
                <div className="uniHeroPanelCard">
                  <span className="uniHeroPanelCardShape" aria-hidden />
                  <div className="uniHeroPanelContent">
                    <div className="uniHeroPanelMain">
                      <div className="uniHeroTitleBlock">
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
                        <span ref={progressRef} className="uniHeroSliderProgressFill" />
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
                <Link
                  href={`/sectors/${sector.slug}`}
                  className={`uniSectorsDiamondCard${sector.slug === 'marine' ? ' uniSectorsDiamondCard--marine' : ''}`}
                  aria-label={sector.name}
                >
                  <span className="uniSectorsDiamondVisual">
                    <span className="uniSectorsDiamondAccent" aria-hidden />
                      <span className="uniSectorsDiamondFrame">
                        <span className="uniSectorsDiamondMedia">
                          <img src={sector.img} alt={sector.name} />
                          <span className="uniSectorsDiamondOverlay" aria-hidden />
                        </span>
                        <span className="uniSectorsDiamondLabel uniSectorsDiamondLabel--in" aria-hidden="true">
                          {sector.name}
                        </span>
                      </span>
                    </span>
                    <span className="uniSectorsDiamondLabel uniSectorsDiamondLabel--below">
                      {sector.name}
                    </span>
                </Link>
              </ScrollReveal>
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
                        </div>
                        <div className="uniTestimonialCardQuoteWrap">
                          <span className="uniTestimonialCardMark" aria-hidden>&ldquo;</span>
                          <blockquote className="uniTestimonialCardQuote">{item.quote}</blockquote>
                        </div>
                      </div>
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
              aria-label={`Testimonial ${index + 1}`}
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


export default function KvsMetalPage() {
  return (
    <div className="uniPage">
      <link rel="preload" href={HERO_VIDEO} as="video" type="video/mp4" />
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
          phoneLabel={procurementCta.phoneLabel}
          showPhone
        />
        <MarketSectorsSection />
        <MaterialSuppliesSection />
        <HomePartnersSection />
        <HomeProductsSection />
        <HomeCtaSection
          title={productsCta.title}
          titleEmphasis={productsCta.titleEmphasis}
          ctaLabel={productsCta.ctaLabel}
          ctaHref={productsCta.ctaHref}
          image={productsCta.image}
          imageAlt={productsCta.imageAlt}
          phoneLabel={productsCta.phoneLabel}
          showPhone
        />
        <TestimonialsSection />
      </main>
      <UniFooter />
      <UniWidgets hideUntilPastHero />
    </div>
  )
}
