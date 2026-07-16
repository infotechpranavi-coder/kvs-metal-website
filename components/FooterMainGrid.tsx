'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { FooterProductsColumn } from './FooterProductsColumn'
import {
  EMAIL,
  footerContent,
  PHONE_DISPLAY,
  PHONE_E164,
} from '@/lib/content'
import { sectors } from '@/lib/sectors'
import { KvsLogo } from './KvsLogo'

const pageLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Product Brochure', href: '/brochure' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
]

function FooterContactIcon({ children }: { children: ReactNode }) {
  return <span className="uniFooterContactIcon" aria-hidden>{children}</span>
}

export function FooterMainGrid() {
  const [hasProducts, setHasProducts] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const pathname = usePathname()

  const handlePageLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const pathOnly = href.split('#')[0] || '/'
    if (pathOnly === pathname) {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div
      className={`uniFooterGrid${hasProducts ? ' uniFooterGrid--withProducts' : ' uniFooterGrid--noProducts'}`}
    >
      <div className="uniFooterBrand">
        <Link href="/" className="uniFooterLogo">
          <KvsLogo size="footer" />
        </Link>
        <p>{footerContent.tagline}</p>
      </div>

      <div className="uniFooterCol">
        <h4>Links</h4>
        <ul>
          {pageLinks.slice(0, 2).map((item) => (
            <li key={item.label}>
              <Link href={item.href} onClick={(event) => handlePageLinkClick(event, item.href)}>
                {item.label}
              </Link>
            </li>
          ))}

          <li className={`uniFooterDropdown${industriesOpen ? ' uniFooterDropdown--open' : ''}`}>
            <button
              type="button"
              className="uniFooterDropdownToggle"
              aria-expanded={industriesOpen}
              onClick={() => setIndustriesOpen((open) => !open)}
            >
              Industries We Serve
              <span className="uniFooterDropdownChevron" aria-hidden />
            </button>
            {industriesOpen ? (
              <ul className="uniFooterDropdownMenu">
                {sectors.map((sector) => (
                  <li key={sector.slug}>
                    <Link
                      href={`/sectors/${sector.slug}`}
                      className={
                        pathname === `/sectors/${sector.slug}`
                          ? 'uniFooterDropdownLink--active'
                          : undefined
                      }
                      onClick={() => setIndustriesOpen(false)}
                    >
                      {sector.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>

          {pageLinks.slice(2).map((item) => (
            <li key={item.label}>
              <Link href={item.href} onClick={(event) => handlePageLinkClick(event, item.href)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <FooterProductsColumn onVisibilityChange={setHasProducts} />

      <div className="uniFooterCol uniFooterCol--materials">
        <h4>Materials</h4>
        <ul>
          {footerContent.materials.map((material) => (
            <li key={material.label}>
              <Link href={material.href}>{material.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="uniFooterCol uniFooterCol--contact">
        <h4>Contact</h4>
        <div className="uniFooterContactCards">
          <a href={`tel:${PHONE_E164}`} className="uniFooterContactCard">
            <FooterContactIcon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </FooterContactIcon>
            <span className="uniFooterContactLabel">Phone</span>
            <span className="uniFooterContactValue">{PHONE_DISPLAY}</span>
          </a>
          <a href={`mailto:${EMAIL}`} className="uniFooterContactCard">
            <FooterContactIcon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v16H4z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </FooterContactIcon>
            <span className="uniFooterContactLabel">Email</span>
            <span className="uniFooterContactValue">{EMAIL}</span>
          </a>
          <a
            href={footerContent.addressHref}
            target="_blank"
            rel="noopener noreferrer"
            className="uniFooterContactCard"
          >
            <FooterContactIcon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </FooterContactIcon>
            <span className="uniFooterContactLabel">Location</span>
            <span className="uniFooterContactValue">{footerContent.address}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
