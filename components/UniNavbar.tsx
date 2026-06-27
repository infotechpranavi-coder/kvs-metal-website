'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CloseIcon, DownloadIcon, MenuIcon } from './Icons'
import { KvsLogo } from './KvsLogo'
import { UniNavSearch } from './UniNavSearch'
import { BROCHURE_FILENAME, BROCHURE_URL } from '@/lib/site'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

function isNavActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  if (href === '/about') return pathname === '/about'
  if (href === '/contact') return pathname === '/contact'
  if (href === '/products' || href === '/#products') {
    return pathname === '/products' || pathname.startsWith('/products/')
  }
  return false
}

export function UniNavbar({ lightMode = false, glass = false }: { lightMode?: boolean; glass?: boolean }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [navMorph, setNavMorph] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const useHeroMorph = glass && !lightMode
  const showGlass = glass && !scrolled && !lightMode && !useHeroMorph
  const showSolid = lightMode || scrolled
  const isLight = lightMode || scrolled || glass

  useEffect(() => {
    if (lightMode) return

    const updateScrollState = () => {
      if (glass) {
        const hero = document.querySelector('.uniHeroShell')
        if (hero) {
          const heroBottom = hero.getBoundingClientRect().bottom
          const morphStart = 220
          const morphEnd = 56
          const progress = Math.min(
            1,
            Math.max(0, (morphStart - heroBottom) / (morphStart - morphEnd)),
          )
          setNavMorph(progress)
          setScrolled(progress >= 0.98)
          return
        }
      }

      setNavMorph(window.scrollY > 80 ? 1 : 0)
      setScrolled(window.scrollY > 80)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      window.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [lightMode, glass])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`uniNav${useHeroMorph ? ' uniNav--heroMorph' : ''}${!useHeroMorph && showSolid ? ' uniNav--scrolled' : ''}${showGlass ? ' uniNav--glass' : ''}${menuOpen ? ' uniNav--open' : ''}`}
      style={useHeroMorph ? ({ '--nav-morph': navMorph } as CSSProperties) : undefined}
    >
      <div className="uniNavInner">
        <Link href="/" className="uniLogo" onClick={closeMenu}>
          <KvsLogo size="nav" priority />
        </Link>

        <UniNavSearch light={isLight} onNavigate={closeMenu} />

        <div className="uniNavRight">
          <nav className="uniNavLinks" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`uniNavLink${isNavActive(pathname, item.href) ? ' uniNavLink--active' : ''}`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="uniNavEnd">
            <a
              href={BROCHURE_URL}
              className="uniNavBrochure"
              download={BROCHURE_FILENAME}
            >
              <DownloadIcon size={16} />
              Download Product Brochure
            </a>
            <Link href="/contact" className="uniNavCta" onClick={closeMenu}>
              Get in Touch
            </Link>
            <button
              type="button"
              className="uniMenuToggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <nav className={`uniMobileNav${menuOpen ? ' uniMobileNav--open' : ''}`} aria-label="Mobile navigation">
        <UniNavSearch light={isLight} onNavigate={closeMenu} className="uniNavSearchWrap--mobile" />
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`uniNavLink${isNavActive(pathname, item.href) ? ' uniNavLink--active' : ''}`}
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="uniNavCta" onClick={closeMenu}>
          Get in Touch
        </Link>
        <a
          href={BROCHURE_URL}
          className="uniNavBrochure uniNavBrochure--mobile"
          download={BROCHURE_FILENAME}
          onClick={closeMenu}
        >
          <DownloadIcon size={18} />
          Download Product Brochure
        </a>
      </nav>
    </header>
  )
}
