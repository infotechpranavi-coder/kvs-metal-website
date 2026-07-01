import Link from 'next/link'
import { FooterMainGrid } from './FooterMainGrid'
import { EMAIL, footerContent, PHONE_DISPLAY, PHONE_E164 } from '@/lib/content'

export function UniFooter() {
  return (
    <footer className="uniFooter">
      <div className="uniFooterTopbar">
        <p>
          Anything in steel is just a call away —{' '}
          <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
          {' | '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
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
          <p>&copy; {new Date().getFullYear()} KVS Metals. All Rights Reserved.</p>
          <div className="uniFooterLegal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
