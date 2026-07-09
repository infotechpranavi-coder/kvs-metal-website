'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { CloseIcon, DownloadIcon, MenuIcon, PhoneIcon } from './Icons'
import { KvsLogo } from './KvsLogo'
import { UniNavSearch } from './UniNavSearch'
import { BROCHURE_DOWNLOAD_HREF, BROCHURE_PAGE_PATH } from '@/lib/site'
import { PHONE_DISPLAY, PHONE_E164 } from '@/lib/content'
import { useSiteSettings } from '@/components/SiteSettingsProvider'
import { getProductsPageHref } from '@/lib/products'
import { sectors } from '@/lib/sectors'

type NavCategory = {
  slug: string
  title: string
}

type NavLinkItem = {
  type: 'link'
  label: string
  href: string
}

type NavIndustriesItem = {
  type: 'industries'
  label: string
}

type NavProductsItem = {
  type: 'products'
  label: string
}

type NavItem = NavLinkItem | NavIndustriesItem | NavProductsItem

type MobileNavGroupId = 'products' | 'industries'

const navItems: NavItem[] = [
  { type: 'link', label: 'Home', href: '/' },
  { type: 'link', label: 'About Us', href: '/about' },
  { type: 'products', label: 'Products' },
  { type: 'industries', label: 'Industries We Serve' },
  { type: 'link', label: 'Contact Us', href: '/contact' },
]

function isNavActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  if (href === '/about') return pathname === '/about'
  if (href === '/contact') return pathname === '/contact'
  return false
}

function isProductsActive(pathname: string) {
  return pathname === '/products' || pathname.startsWith('/products/')
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

function ProductsDropdown({
  label,
  categories,
  pathname,
  activeCategorySlug,
  onNavigate,
  light,
}: {
  label: string
  categories: NavCategory[]
  pathname: string
  activeCategorySlug: string | null
  onNavigate?: () => void
  light: boolean
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [open, setOpen] = useState(false)
  const active = isProductsActive(pathname)

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
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={getProductsPageHref(category.slug)}
            className={`uniNavDropdownItem${
              pathname === '/products' && activeCategorySlug === category.slug
                ? ' uniNavDropdownItem--active'
                : ''
            }`}
            onClick={close}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

function MobileProductsGroup({
  label,
  categories,
  pathname,
  activeCategorySlug,
  open,
  onToggle,
  onNavigate,
}: {
  label: string
  categories: NavCategory[]
  pathname: string
  activeCategorySlug: string | null
  open: boolean
  onToggle: () => void
  onNavigate?: () => void
}) {
  return (
    <div className={`uniMobileNavGroup${open ? ' uniMobileNavGroup--open' : ''}`}>
      <button
        type="button"
        className={`uniMobileNavGroupToggle${isProductsActive(pathname) ? ' uniNavLink--active' : ''}`}
        aria-expanded={open}
        onClick={onToggle}
      >
        {label}
        <span className="uniNavDropdownChevron" aria-hidden />
      </button>
      <div className="uniMobileNavSubmenu">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={getProductsPageHref(category.slug)}
            className={`uniMobileNavSublink${
              pathname === '/products' && activeCategorySlug === category.slug ? ' uniNavLink--active' : ''
            }`}
            onClick={onNavigate}
          >
            {category.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

function MobileIndustriesGroup({
  label,
  pathname,
  open,
  onToggle,
  onNavigate,
}: {
  label: string
  pathname: string
  open: boolean
  onToggle: () => void
  onNavigate?: () => void
}) {
  return (
    <div className={`uniMobileNavGroup${open ? ' uniMobileNavGroup--open' : ''}`}>
      <button
        type="button"
        className={`uniMobileNavGroupToggle${isIndustriesActive(pathname) ? ' uniNavLink--active' : ''}`}
        aria-expanded={open}
        onClick={onToggle}
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

function UniNavbarInner({
  lightMode = false,
  activeCategorySlug,
}: {
  lightMode?: boolean
  glass?: boolean
  activeCategorySlug: string | null
}) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { heroNavWhiteLogo } = useSiteSettings()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<MobileNavGroupId | null>(null)
  const [productCategories, setProductCategories] = useState<NavCategory[]>([])
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

    fetch('/api/categories')
      .then((response) => response.json())
      .then((data: { categories?: Array<{ slug: string; title: string }> }) => {
        if (cancelled) return
        const categories = Array.isArray(data.categories) ? data.categories : []
        setProductCategories(
          categories.map((category) => ({
            slug: category.slug,
            title: category.title,
          })),
        )
      })
      .catch(() => {
        if (!cancelled) setProductCategories([])
      })

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

  useEffect(() => {
    if (!menuOpen) {
      setMobileExpandedGroup(null)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const toggleMobileGroup = (group: MobileNavGroupId) => {
    setMobileExpandedGroup((current) => (current === group ? null : group))
  }

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
                ) : item.type === 'products' ? (
                  productCategories.length > 0 ? (
                    <ProductsDropdown
                      key={item.label}
                      label={item.label}
                      categories={productCategories}
                      pathname={pathname}
                      activeCategorySlug={activeCategorySlug}
                      onNavigate={closeMenu}
                      light={isLight}
                    />
                  ) : (
                    <Link
                      key={item.label}
                      href="/products"
                      className={`uniNavLink${isProductsActive(pathname) ? ' uniNavLink--active' : ''}`}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  )
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
                open={mobileExpandedGroup === 'industries'}
                onToggle={() => toggleMobileGroup('industries')}
                onNavigate={closeMenu}
              />
            ) : item.type === 'products' ? (
              productCategories.length > 0 ? (
                <MobileProductsGroup
                  key={item.label}
                  label={item.label}
                  categories={productCategories}
                  pathname={pathname}
                  activeCategorySlug={activeCategorySlug}
                  open={mobileExpandedGroup === 'products'}
                  onToggle={() => toggleMobileGroup('products')}
                  onNavigate={closeMenu}
                />
              ) : (
                <Link
                  key={item.label}
                  href="/products"
                  className={`uniNavLink${isProductsActive(pathname) ? ' uniNavLink--active' : ''}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              )
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

function UniNavbarWithSearchParams({ lightMode = false }: { lightMode?: boolean; glass?: boolean }) {
  const activeCategorySlug = useSearchParams().get('category')
  return <UniNavbarInner lightMode={lightMode} activeCategorySlug={activeCategorySlug} />
}

export function UniNavbar({ lightMode = false }: { lightMode?: boolean; glass?: boolean }) {
  return (
    <Suspense fallback={<UniNavbarInner lightMode={lightMode} activeCategorySlug={null} />}>
      <UniNavbarWithSearchParams lightMode={lightMode} />
    </Suspense>
  )
}
