import Link from 'next/link'
import { FooterMainGrid } from './FooterMainGrid'
import { EMAIL, footerContent, PHONE_DISPLAY, PHONE_E164 } from '@/lib/content'

export function UniFooter() {
  return (
    <footer className="uniFooter">
      <div className="uniFooterTopbar">
        <p className="uniFooterTopbarText">
          <span className="uniFooterTopbarMessage">{footerContent.topbarMessage}</span>
          <span className="uniFooterTopbarContact">
            <a className="uniFooterTopbarLink" href={`tel:${PHONE_E164}`}>
              {PHONE_DISPLAY}
            </a>
            <span className="uniFooterTopbarSep" aria-hidden>
              |
            </span>
            <a className="uniFooterTopbarLink" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </span>
        </p>
      </div>

      <div className="uniContainer uniFooterMain">
        <FooterMainGrid />

        <div className="uniFooterStandardsBand">
          <h4>{footerContent.standardsTitle}</h4>
          <ul className="uniFooterStandardsList">
            {footerContent.standards.map((standard) => (
              <li key={standard}>{standard}</li>
            ))}
          </ul>
        </div>

        <div className="uniFooterBottom">
          <div className="uniFooterBottomRow">
            <p>&copy; {new Date().getFullYear()} KVS Metals. All Rights Reserved.</p>
            <div className="uniFooterLegal">
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-and-conditions">Terms & Conditions</Link>
            </div>
          </div>
          <div className="uniFooterCredits">
            <p className="uniFooterCredit">
              {footerContent.creditLeft.prefix}{' '}
              <a
                href={footerContent.creditLeft.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {footerContent.creditLeft.label}
              </a>
            </p>
            <p className="uniFooterCredit uniFooterCredit--right">
              {footerContent.creditRight.prefix}{' '}
              <a
                href={footerContent.creditRight.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {footerContent.creditRight.label}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
