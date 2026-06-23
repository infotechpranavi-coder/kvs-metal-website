'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CloseIcon, MenuIcon } from './Icons'
import { KvsLogo } from './KvsLogo'

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

export function UniNavbar({ lightMode = false }: { lightMode?: boolean }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isLight = lightMode || scrolled

  useEffect(() => {
    if (lightMode) return
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lightMode])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className={`uniNav${isLight ? ' uniNav--scrolled' : ''}${menuOpen ? ' uniNav--open' : ''}`}>
      <div className="uniNavInner">
        <Link href="/" className="uniLogo" onClick={() => setMenuOpen(false)}>
          <KvsLogo size="nav" priority />
        </Link>

        <nav className="uniNavLinks" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`uniNavLink${isNavActive(pathname, item.href) ? ' uniNavLink--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="uniNavEnd">
          <Link href="/contact" className="uniNavCta" onClick={() => setMenuOpen(false)}>
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

      <nav className={`uniMobileNav${menuOpen ? ' uniMobileNav--open' : ''}`} aria-label="Mobile navigation">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`uniNavLink${isNavActive(pathname, item.href) ? ' uniNavLink--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="uniNavCta" onClick={() => setMenuOpen(false)}>
          Get in Touch
        </Link>
      </nav>
    </header>
  )
}
