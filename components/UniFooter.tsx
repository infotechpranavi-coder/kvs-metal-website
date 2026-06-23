import Link from 'next/link'
import type { ReactNode } from 'react'
import { homepageProductCategories, getCategoryHref } from '@/lib/products'
import { KvsLogo } from './KvsLogo'

const pageLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Market Sectors', href: '/#sectors' },
  { label: 'Products', href: '/products' },
  { label: 'Contact Us', href: '/contact' },
]

function SocialIcon({ children, label }: { children: ReactNode; label: string }) {
  return (
    <a href="#" className="uniFooterSocial" aria-label={label}>
      {children}
    </a>
  )
}

export function UniFooter() {
  return (
    <footer className="uniFooter">
      <div className="uniFooterTopbar">
        <p>
          Anything in steel is just a call away —{' '}
          <a href="tel:+911234567890">+91 123 456 7890</a>
          {' | '}
          <a href="mailto:info@kvsmetal.com">info@kvsmetal.com</a>
        </p>
      </div>

      <div className="uniFooterPattern" aria-hidden />

      <div className="uniContainer uniFooterMain">
        <div className="uniFooterGrid">
          <div className="uniFooterBrand">
            <Link href="/" className="uniFooterLogo">
              <KvsLogo size="footer" />
            </Link>
            <p>
              Premium steel, pipes, sheets, and fabricated metal products for construction,
              marine, oil &amp; gas, and industrial projects across India.
            </p>
            <div className="uniFooterSocials">
              <SocialIcon label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div className="uniFooterCol">
            <h4>Links</h4>
            <ul>
              {pageLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="uniFooterCol">
            <h4>Products</h4>
            <ul className="uniFooterColList uniFooterColList--grid">
              {homepageProductCategories.map((category) => (
                <li key={category.slug}>
                  <Link href={getCategoryHref(category)}>
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="uniFooterCol uniFooterCol--contact">
            <h4>Contact</h4>
            <ul className="uniFooterContactList">
              <li>
                <a href="mailto:info@kvsmetal.com">info@kvsmetal.com</a>
              </li>
              <li>
                <a href="tel:+911234567890">+91 123 456 7890</a>
              </li>
              <li>
                <address>
                  Industrial Estate, Mumbai,
                  <br />
                  Maharashtra, India
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="uniFooterBottom">
          <p>&copy; {new Date().getFullYear()} KVS Metal. All Rights Reserved.</p>
          <div className="uniFooterLegal">
            <Link href="/contact">Privacy Policy</Link>
            <Link href="/contact">Terms of Service</Link>
            <Link href="/contact">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
