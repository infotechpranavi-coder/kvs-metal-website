'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DownloadIcon, PhoneIcon } from './Icons'
import { ChevronUpIcon } from './UniIcons'
import { BROCHURE_PAGE_PATH, PHONE_E164, WHATSAPP_URL } from '@/lib/site'

const PHONE = PHONE_E164
const WHATSAPP_LOGO_SRC = '/logo/social.png'

function FloatQuoteIcon() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" aria-hidden>
      <path
        d="M7 4.75h10a3.25 3.25 0 0 1 3.25 3.25v4.5A3.25 3.25 0 0 1 17 15.75H11l-3.5 4V15.75H7A3.25 3.25 0 0 1 3.75 12.5v-4.5A3.25 3.25 0 0 1 7 4.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FloatWhatsAppIcon() {
  return (
    <img
      src={WHATSAPP_LOGO_SRC}
      alt=""
      width={48}
      height={48}
      className="uniFloatWhatsAppLogo"
      aria-hidden
    />
  )
}

type UniWidgetsProps = {
  hideUntilPastHero?: boolean
}

export function UniWidgets({ hideUntilPastHero = false }: UniWidgetsProps) {
  const pathname = usePathname()
  const [showTop, setShowTop] = useState(false)
  const [pastHero, setPastHero] = useState(!hideUntilPastHero)
  const [staggerKey, setStaggerKey] = useState(hideUntilPastHero ? 0 : 1)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!hideUntilPastHero) return

    const hero = document.querySelector('.uniHeroShell')
    if (!hero) {
      setPastHero(true)
      setStaggerKey(1)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isPast = !entry.isIntersecting
        setPastHero(isPast)
        if (isPast) {
          setStaggerKey((current) => current + 1)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [hideUntilPastHero])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const showFloats = !hideUntilPastHero || pastHero

  const handleBrochureClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === BROCHURE_PAGE_PATH) {
      event.preventDefault()
      scrollTop()
    }
  }

  return (
    <>
      <div
        key={staggerKey}
        className={`uniFloatActions${showFloats ? ' uniFloatActions--visible' : ''}`}
        aria-label="Quick contact"
        aria-hidden={!showFloats}
      >
        {showTop && (
          <button
            type="button"
            className="uniFloatIcon uniFloatIcon--backTop"
            onClick={scrollTop}
            aria-label="Back to top"
          >
            <ChevronUpIcon />
          </button>
        )}
        <Link href="/contact" className="uniFloatIcon uniFloatIcon--quote" aria-label="Get a quote — contact form">
          <FloatQuoteIcon />
        </Link>
        <a
          href={WHATSAPP_URL}
          className="uniFloatIcon uniFloatIcon--whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <FloatWhatsAppIcon />
        </a>
        <a href={`tel:${PHONE}`} className="uniFloatIcon uniFloatIcon--call" aria-label="Call us">
          <PhoneIcon size={20} color="currentColor" />
        </a>
        <Link
          href={BROCHURE_PAGE_PATH}
          className="uniFloatIcon uniFloatIcon--brochure"
          aria-label="Download Brochure"
          onClick={handleBrochureClick}
          scroll={pathname !== BROCHURE_PAGE_PATH}
        >
          <DownloadIcon size={20} />
        </Link>
      </div>
    </>
  )
}
