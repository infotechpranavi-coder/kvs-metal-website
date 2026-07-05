import Link from 'next/link'
import { PHONE_DISPLAY, PHONE_E164 } from '@/lib/content'

type HomeCtaSectionProps = {
  title: string
  titleEmphasis?: string
  ctaLabel: string
  ctaHref: string
  image: string
  imageAlt: string
  phoneLabel?: string
  showPhone?: boolean
}

export function HomeCtaSection({
  title,
  titleEmphasis,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  phoneLabel = 'Call Us',
  showPhone = false,
}: HomeCtaSectionProps) {
  const ctaIsPhoneLink = ctaHref.startsWith('tel:')

  return (
    <section className="uniHomeCta">
      <div className="uniContainer">
        <div className="uniHomeCtaInner">
          <div className="uniHomeCtaContent">
            <div className="uniHomeCtaRow">
              <h2 className="uniHomeCtaTitle">
                <span className="uniHomeCtaTitleLead">{title}</span>
                {titleEmphasis ? (
                  <>
                    {' '}
                    <span className="uniHomeCtaTitleEmphasis">{titleEmphasis}</span>
                  </>
                ) : null}
              </h2>
              <div className="uniHomeCtaEnd">
                {showPhone && (
                  <p className="uniHomeCtaPhone">
                    {phoneLabel}:{' '}
                    <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
                  </p>
                )}
                {ctaIsPhoneLink ? (
                  <a href={ctaHref} className="uniHomeCtaBtn">
                    {ctaLabel}
                  </a>
                ) : (
                  <Link href={ctaHref} className="uniHomeCtaBtn">
                    {ctaLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="uniHomeCtaMedia">
            <img src={image} alt={imageAlt} loading="lazy" />
            <span className="uniHomeCtaMediaOverlay" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  )
}
