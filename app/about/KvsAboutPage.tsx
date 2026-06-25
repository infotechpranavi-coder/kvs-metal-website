'use client'

import Link from 'next/link'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import { ScrollReveal } from '@/components/ScrollReveal'
import { aboutPage } from '@/lib/content'

const HERO_IMG =
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85&auto=format&fit=crop'
const STORY_IMG =
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=85&auto=format&fit=crop'

export default function KvsAboutPage() {
  return (
    <div className="uniPage">
      <UniNavbar lightMode />
      <main className="kvsAbout">
        <section className="kvsAboutHero">
          <div className="uniContainer kvsAboutHeroGrid">
            <ScrollReveal className="kvsAboutHeroCopy">
              <p className="kvsAboutEyebrow">{aboutPage.eyebrow}</p>
              <h1>{aboutPage.title}</h1>
              <p className="kvsAboutLead uniSectionText">{aboutPage.lead}</p>
              <div className="kvsAboutHeroActions">
                <Link href="/products" className="uniHeroBtn">Explore products</Link>
                <Link href="/contact" className="kvsAboutHeroGhost">Contact us</Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1} className="kvsAboutHeroMedia">
              <img src={HERO_IMG} alt="Steel construction and industrial metalwork in Dubai" />
              <div className="kvsAboutHeroBadge">
                <strong>25+</strong>
                <span>Years of excellence</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <ScrollReveal as="section" className="kvsAboutStats">
          <div className="uniContainer kvsAboutStatsGrid">
            {aboutPage.stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={index * 0.08} className="kvsAboutStat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="kvsAboutStory">
          <div className="uniContainer kvsAboutStoryGrid">
            <div className="kvsAboutStoryMedia">
              <img src={STORY_IMG} alt="Steel sheets and metal stock at KVS Metals" />
            </div>
            <div className="kvsAboutStoryContent">
              <div className="uniEyebrow">{aboutPage.eyebrow}</div>
              <h2>{aboutPage.title}</h2>
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
              <div className="uniEyebrow">Why choose us</div>
              <h2>{aboutPage.whyChooseTitle}</h2>
            </div>
            <div className="kvsAboutValuesGrid">
              {aboutPage.whyChoose.map((item, index) => (
                <article key={item.title} className="kvsAboutValueCard">
                  <span className="kvsAboutValueNum">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p className="uniSectionText">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="kvsAboutMission kvsAboutCoreValues">
          <div className="uniContainer kvsAboutMissionInner kvsAboutCoreValuesInner">
            <p className="kvsAboutMissionLabel">{aboutPage.valuesTitle}</p>
            <h2>{aboutPage.valuesTagline}</h2>
            <div className="kvsAboutStoryCopy">
              {aboutPage.valuesIntro.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="uniSectionText kvsAboutMissionText">
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="uniSectionText kvsAboutMissionText kvsAboutValuesLead">
              Our brand stands for values we are driven by:
            </p>
            <ul className="kvsAboutValuesList">
              {aboutPage.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="kvsAboutCta">
          <div className="uniContainer kvsAboutCtaInner">
            <div>
              <h2>{aboutPage.ctaTitle}</h2>
              <p className="uniSectionText">{aboutPage.ctaText}</p>
            </div>
            <Link href="/contact" className="uniHeroBtn">
              {aboutPage.ctaLabel}
            </Link>
          </div>
        </ScrollReveal>
      </main>
      <UniFooter />
      <UniWidgets />
    </div>
  )
}
