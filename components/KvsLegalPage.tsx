import Link from 'next/link'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import type { LegalPageContent } from '@/lib/legal'

type KvsLegalPageProps = {
  content: LegalPageContent
}

export function KvsLegalPage({ content }: KvsLegalPageProps) {
  return (
    <div className="uniPage">
      <UniNavbar />
      <main className="kvsLegal">
        <section className="kvsLegalHero">
          <div className="uniContainer kvsLegalHeroInner">
            <p className="kvsLegalEyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="kvsLegalLead">{content.lead}</p>
            <p className="kvsLegalUpdated">Last updated: {content.updated}</p>
          </div>
        </section>

        <section className="kvsLegalBody">
          <div className="uniContainer kvsLegalBodyInner">
            {content.sections.map((section) => (
              <article key={section.heading} className="kvsLegalSection">
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}

            <div className="kvsLegalBack">
              <Link href="/">Back to homepage</Link>
              <Link href="/contact">Contact us</Link>
            </div>
          </div>
        </section>
      </main>
      <UniFooter />
      <UniWidgets />
    </div>
  )
}
