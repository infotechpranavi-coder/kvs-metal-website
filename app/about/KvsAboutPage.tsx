'use client'

import Link from 'next/link'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import { ScrollReveal } from '@/components/ScrollReveal'

const HERO_IMG =
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85&auto=format&fit=crop'
const STORY_IMG =
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=85&auto=format&fit=crop'
const MISSION_IMG =
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=85&auto=format&fit=crop'

const aboutParagraphs = [
  'KVS Metal is a trusted name in the metal products industry, supplying high-quality steel, pipes, sheets, and fabricated components to clients across the region. Our mission is to provide durable, certified metal products at competitive prices.',
  'Founded with a commitment to quality and service, KVS Metal has grown into a reliable partner for contractors, builders, and industries. We source from leading mills and maintain strict quality checks on every batch we deliver.',
  'From construction and infrastructure to marine, oil & gas, and manufacturing, we support projects with dependable logistics, technical guidance, and a product range tailored to real-world site requirements.',
]

const stats = [
  { value: '15+', label: 'Years in industry' },
  { value: '500+', label: 'Projects supplied' },
  { value: '98%', label: 'On-time delivery' },
  { value: '2K+', label: 'Active clients' },
]

const values = [
  {
    title: 'Quality assured',
    desc: 'Every batch is checked against grade, dimension, and finish standards before dispatch.',
  },
  {
    title: 'Reliable supply',
    desc: 'Consistent stock, competitive pricing, and delivery schedules you can plan around.',
  },
  {
    title: 'Custom fabrication',
    desc: 'Cut-to-size sheets, bent sections, and fabricated assemblies built to your drawings.',
  },
  {
    title: 'Partnership approach',
    desc: 'We work alongside contractors and procurement teams from enquiry through delivery.',
  },
]

const milestones = [
  { year: '2010', title: 'Company founded', desc: 'Started as a regional steel trading and supply business.' },
  { year: '2015', title: 'Expanded catalog', desc: 'Added pipes, structural longs, and roofing product lines.' },
  { year: '2020', title: 'Fabrication unit', desc: 'Launched cut-to-size and custom fabrication services.' },
  { year: 'Today', title: 'Pan-India supply', desc: 'Serving contractors, OEMs, and industrial clients nationwide.' },
]

export default function KvsAboutPage() {
  return (
    <div className="uniPage">
      <UniNavbar lightMode />
      <main className="kvsAbout">
        <section className="kvsAboutHero">
          <div className="uniContainer kvsAboutHeroGrid">
            <ScrollReveal className="kvsAboutHeroCopy">
              <p className="kvsAboutEyebrow">About KVS Metal</p>
              <h1>From ground to greatness</h1>
              <p className="kvsAboutLead uniSectionText">
                A leading supplier of premium metal products for construction, manufacturing,
                and industrial projects across India — built on trust, strength, and service.
              </p>
              <div className="kvsAboutHeroActions">
                <Link href="/products" className="uniHeroBtn">Explore products</Link>
                <Link href="/contact" className="kvsAboutHeroGhost">Contact us</Link>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.1} className="kvsAboutHeroMedia">
              <img src={HERO_IMG} alt="Steel construction and industrial metalwork" />
              <div className="kvsAboutHeroBadge">
                <strong>15+</strong>
                <span>Years of excellence</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <ScrollReveal as="section" className="kvsAboutStats">
          <div className="uniContainer kvsAboutStatsGrid">
            {stats.map((stat, index) => (
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
              <img src={STORY_IMG} alt="Steel sheets and metal stock at KVS Metal" />
            </div>
            <div className="kvsAboutStoryContent">
              <div className="uniEyebrow">Our story</div>
              <h2>Built on trust, strength, and service</h2>
              <div className="kvsAboutStoryCopy">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="uniSectionText">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="kvsAboutMission">
          <div className="kvsAboutMissionBg" style={{ backgroundImage: `url(${MISSION_IMG})` }} aria-hidden />
          <div className="kvsAboutMissionOverlay" aria-hidden />
          <div className="uniContainer kvsAboutMissionInner">
            <p className="kvsAboutMissionLabel">Our mission</p>
            <h2>Delivering metal solutions that build lasting infrastructure</h2>
            <p className="uniSectionText kvsAboutMissionText">
              We combine mill partnerships, rigorous quality control, and responsive logistics
              so your team gets the right material — on spec, on time, every time.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="kvsAboutValues">
          <div className="uniContainer">
            <div className="kvsAboutValuesHead">
              <div className="uniEyebrow">What we stand for</div>
              <h2>Why teams choose KVS Metal</h2>
            </div>
            <div className="kvsAboutValuesGrid">
              {values.map((item, index) => (
                <article key={item.title} className="kvsAboutValueCard">
                  <span className="kvsAboutValueNum">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p className="uniSectionText">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="kvsAboutTimeline">
          <div className="uniContainer">
            <div className="kvsAboutTimelineHead">
              <div className="uniEyebrow">Our journey</div>
              <h2>Growing with India&apos;s builders</h2>
            </div>
            <div className="kvsAboutTimelineGrid">
              {milestones.map((item) => (
                <article key={item.year} className="kvsAboutTimelineCard">
                  <span className="kvsAboutTimelineYear">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p className="uniSectionText">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal as="section" className="kvsAboutCta">
          <div className="uniContainer kvsAboutCtaInner">
            <div>
              <h2>Ready to discuss your metal requirements?</h2>
              <p className="uniSectionText">
                Share grade, quantity, and delivery location — our team will respond with a tailored quote.
              </p>
            </div>
            <Link href="/contact" className="uniHeroBtn">
              Get in touch
            </Link>
          </div>
        </ScrollReveal>
      </main>
      <UniFooter />
      <UniWidgets />
    </div>
  )
}
