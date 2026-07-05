'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CloseIcon, DownloadIcon, MenuIcon, PhoneIcon } from './Icons'
import { KvsLogo } from './KvsLogo'
import { UniNavSearch } from './UniNavSearch'
import { BROCHURE_DOWNLOAD_HREF, BROCHURE_PAGE_PATH } from '@/lib/site'
import { PHONE_DISPLAY, PHONE_E164 } from '@/lib/content'
import { sectors } from '@/lib/sectors'

type NavLinkItem = {
  type: 'link'
  label: string
  href: string
}

type NavIndustriesItem = {
  type: 'industries'
  label: string
}

type NavItem = NavLinkItem | NavIndustriesItem

const navItems: NavItem[] = [
  { type: 'link', label: 'Home', href: '/' },
  { type: 'link', label: 'About Us', href: '/about' },
  { type: 'link', label: 'Products', href: '/products' },
  { type: 'industries', label: 'Industries We Serve' },
  { type: 'link', label: 'Contact Us', href: '/contact' },
]

function isNavActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  if (href === '/about') return pathname === '/about'
  if (href === '/contact') return pathname === '/contact'
  if (href === '/products') return pathname === '/products' || pathname.startsWith('/products/')
  return false
}

function isIndustriesActive(pathname: string) {
  return pathname.startsWith('/sectors')
}

function IndustriesDropdown({
  label,
  pathname,
  onNavigate,
  light,
}: {
  label: string
  pathname: string
  onNavigate?: () => void
  light: boolean
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [open, setOpen] = useState(false)
  const active = isIndustriesActive(pathname)

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      clearCloseTimer()
    }
  }, [])

  const close = () => {
    clearCloseTimer()
    setOpen(false)
    onNavigate?.()
  }

  const handleMouseEnter = () => {
    clearCloseTimer()
    setOpen(true)
  }

  const handleMouseLeave = () => {
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => setOpen(false), 220)
  }

  return (
    <div
      ref={rootRef}
      className={`uniNavDropdown${open ? ' uniNavDropdown--open' : ''}${active ? ' uniNavDropdown--active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`uniNavLink uniNavDropdownToggle${active ? ' uniNavLink--active' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((current) => !current)}
      >
        {label}
        <span className="uniNavDropdownChevron" aria-hidden />
      </button>

      <div className={`uniNavDropdownMenu${light ? ' uniNavDropdownMenu--light' : ''}`}>
        {sectors.map((sector) => (
          <Link
            key={sector.slug}
            href={`/sectors/${sector.slug}`}
            className={`uniNavDropdownItem${pathname === `/sectors/${sector.slug}` ? ' uniNavDropdownItem--active' : ''}`}
            onClick={close}
          >
            {sector.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

function MobileIndustriesGroup({
  label,
  pathname,
  onNavigate,
}: {
  label: string
  pathname: string
  onNavigate?: () => void
}) {
  const [open, setOpen] = useState(isIndustriesActive(pathname))

  return (
    <div className={`uniMobileNavGroup${open ? ' uniMobileNavGroup--open' : ''}`}>
      <button
        type="button"
        className={`uniMobileNavGroupToggle${isIndustriesActive(pathname) ? ' uniNavLink--active' : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {label}
        <span className="uniNavDropdownChevron" aria-hidden />
      </button>
      <div className="uniMobileNavSubmenu">
        {sectors.map((sector) => (
          <Link
            key={sector.slug}
            href={`/sectors/${sector.slug}`}
            className={`uniMobileNavSublink${pathname === `/sectors/${sector.slug}` ? ' uniNavLink--active' : ''}`}
            onClick={onNavigate}
          >
            {sector.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export function UniNavbar({ lightMode = false }: { lightMode?: boolean; glass?: boolean }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroNavWhiteLogo, setHeroNavWhiteLogo] = useState(true)
  const showSolid = lightMode || scrolled || !isHome
  const isLight = lightMode || scrolled || !isHome
  const logoVariant = heroNavWhiteLogo && !isLight ? 'white' : 'default'

  useEffect(() => {
    if (lightMode || !isHome) return

    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome, lightMode])

  useEffect(() => {
    let cancelled = false

    fetch('/api/site-settings')
      .then((response) => response.json())
      .then((data: { settings?: { heroNavWhiteLogo?: boolean } }) => {
        if (cancelled) return
        if (typeof data.settings?.heroNavWhiteLogo === 'boolean') {
          setHeroNavWhiteLogo(data.settings.heroNavWhiteLogo)
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleBrochureClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === BROCHURE_PAGE_PATH) {
      event.preventDefault()
      document.getElementById('download')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    closeMenu()
  }

  return (
    <header
      className={`uniSiteHeader${showSolid ? ' uniSiteHeader--scrolled' : ''}${menuOpen ? ' uniSiteHeader--open' : ''}`}
    >
      <div className={`uniNav${showSolid ? ' uniNav--scrolled' : ''}${menuOpen ? ' uniNav--open' : ''}`}>
        <div className="uniNavInner">
          <Link href="/" className="uniLogo" onClick={closeMenu}>
            <KvsLogo size="nav" priority variant={logoVariant} />
          </Link>

          <UniNavSearch light={isLight} onNavigate={closeMenu} />

          <div className="uniNavRight">
            <nav className="uniNavLinks" aria-label="Main navigation">
              {navItems.map((item) =>
                item.type === 'industries' ? (
                  <IndustriesDropdown
                    key={item.label}
                    label={item.label}
                    pathname={pathname}
                    onNavigate={closeMenu}
                    light={isLight}
                  />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`uniNavLink${isNavActive(pathname, item.href) ? ' uniNavLink--active' : ''}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="uniNavEnd">
              <a href={`tel:${PHONE_E164}`} className="uniNavCall">
                <PhoneIcon size={16} color="#fff" />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <Link href={BROCHURE_DOWNLOAD_HREF} className="uniNavBrochure" onClick={handleBrochureClick}>
                <DownloadIcon size={16} />
                Download Brochure
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
          <UniNavSearch light onNavigate={closeMenu} className="uniNavSearchWrap--mobile" />
          {navItems.map((item) =>
            item.type === 'industries' ? (
              <MobileIndustriesGroup
                key={item.label}
                label={item.label}
                pathname={pathname}
                onNavigate={closeMenu}
              />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`uniNavLink${isNavActive(pathname, item.href) ? ' uniNavLink--active' : ''}`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ),
          )}
          <a href={`tel:${PHONE_E164}`} className="uniNavCall uniNavCall--mobile" onClick={closeMenu}>
            <PhoneIcon size={18} color="#fff" />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <Link href={BROCHURE_DOWNLOAD_HREF} className="uniNavBrochure uniNavBrochure--mobile" onClick={handleBrochureClick}>
            <DownloadIcon size={18} />
            Download Product Brochure
          </Link>
        </nav>
      </div>
    </header>
  )
}
