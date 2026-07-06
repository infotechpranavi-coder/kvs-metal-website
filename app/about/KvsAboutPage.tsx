'use client'

import Link from 'next/link'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import { ScrollReveal } from '@/components/ScrollReveal'
import {
  CompetitivePricingIcon,
  CustomerServiceIcon,
  GlobalSourcingIcon,
  IndustryUnderstandingIcon,
  ReliableAvailabilityIcon,
  TimelyDeliveryIcon,
} from '@/components/UniIcons'
import { HomeCtaSection } from '@/components/HomeCtaSection'
import { aboutPage } from '@/lib/content'

const WHY_CHOOSE_ICONS = [
  ReliableAvailabilityIcon,
  CompetitivePricingIcon,
  TimelyDeliveryIcon,
  GlobalSourcingIcon,
  CustomerServiceIcon,
  IndustryUnderstandingIcon,
] as const

export default function KvsAboutPage() {
  return (
    <div className="uniPage">
      <UniNavbar />
      <main className="kvsAbout">
        <section className="kvsAboutHero">
          <div className="uniContainer kvsAboutHeroGrid">
            <div className="kvsAboutHeroCopy">
              <p className="kvsAboutEyebrow">{aboutPage.eyebrow}</p>
              <h1>{aboutPage.title}</h1>
              <p className="kvsAboutLead uniSectionText">{aboutPage.lead}</p>
              <div className="kvsAboutHeroActions">
                <Link href="/products" className="kvsAboutHeroBtn">Explore products</Link>
                <Link href="/contact" className="kvsAboutHeroBtn kvsAboutHeroBtn--navy">Contact us</Link>
              </div>
            </div>
            <div className="kvsAboutHeroMedia">
              <div className="kvsAboutHeroMediaFrame">
                <img
                  src={aboutPage.heroImage}
                  alt={aboutPage.heroImageAlt}
                  fetchPriority="high"
                />
                <div className="kvsAboutHeroBadge">
                  <strong>25+</strong>
                  <span>Years of excellence</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="kvsAboutStats">
          <div className="uniContainer kvsAboutStatsGrid">
            {aboutPage.stats.map((stat) => (
              <div key={stat.label} className="kvsAboutStat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <ScrollReveal as="section" className="kvsAboutStory">
          <div className="uniContainer kvsAboutStoryGrid">
            <div className="kvsAboutStoryMedia">
              <img src={aboutPage.storyImage} alt={aboutPage.storyImageAlt} loading="lazy" />
            </div>
            <div className="kvsAboutStoryContent">
              <h2 className="kvsAboutStoryTitle">{aboutPage.storyTitle}</h2>
              <div className="kvsAboutStoryCopy">
                {aboutPage.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="uniSectionText">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="kvsAboutValues">
          <div className="uniContainer">
            <div className="kvsAboutValuesHead">
              <h2>{aboutPage.whyChooseTitle}</h2>
            </div>
            <div className="kvsAboutValuesGrid">
              {aboutPage.whyChoose.map((item, index) => {
                const Icon = WHY_CHOOSE_ICONS[index] ?? ReliableAvailabilityIcon
                return (
                  <article key={item.title} className="kvsAboutValueCard">
                    <span className="kvsAboutValueWatermark" aria-hidden>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="kvsAboutValueCardTop">
                      <div className="kvsAboutValueIcon" aria-hidden>
                        <Icon />
                      </div>
                      <span className="kvsAboutValueNum">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p className="uniSectionText">{item.desc}</p>
                    <span className="kvsAboutValueAccent" aria-hidden />
                  </article>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="kvsAboutCoreValues">
          <div className="uniContainer">
            <div className="kvsAboutCoreValuesHead">
              <h2 className="kvsAboutCoreValuesTitle">{aboutPage.valuesTitle}</h2>
              <p className="kvsAboutCoreValuesTagline">{aboutPage.valuesTagline}</p>
            </div>

            <div className="kvsAboutCoreValuesGrid">
              <div className="uniProductDescription kvsAboutCoreValuesOverview">
                <div className="uniProductOverviewHead">
                  <span className="uniProductOverviewEyebrow">{aboutPage.valuesOverviewEyebrow}</span>
                  <h2 className="uniProductSectionTitle">{aboutPage.valuesOverviewTitle}</h2>
                </div>
                <div className="kvsAboutCoreValuesOverviewCopy">
                  {aboutPage.valuesIntro.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="kvsAboutCoreValuesPanel">
                <p className="kvsAboutCoreValuesPanelLead">{aboutPage.valuesLead}</p>
                <ul className="kvsAboutCoreValuesPoints">
                  {aboutPage.values.map((value) => (
                    <li key={value} className="kvsAboutCoreValuePoint">
                      <span className="kvsAboutCoreValueBullet" aria-hidden />
                      <span className="kvsAboutCoreValueLabel">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="div">
          <HomeCtaSection
            title={`${aboutPage.ctaTitle} ${aboutPage.ctaText}`}
            ctaLabel={aboutPage.ctaLabel}
            ctaHref={aboutPage.ctaHref}
            image={aboutPage.ctaImage}
            imageAlt={aboutPage.ctaImageAlt}
            phoneLabel={aboutPage.ctaPhoneLabel}
            showPhone
          />
        </ScrollReveal>
      </main>
      <UniFooter />
      <UniWidgets />
    </div>
  )
}
