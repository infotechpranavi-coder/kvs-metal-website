'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import { MailIcon, MapPinIcon, PhoneIcon } from '@/components/Icons'
import {
  buildProductEnquiryMessage,
  buildProductEnquirySubject,
} from '@/lib/contact'
import { EMAIL, footerContent, PHONE_DISPLAY, PHONE_E164 } from '@/lib/content'

export default function KvsContactPage() {
  const searchParams = useSearchParams()
  const enquiryType = searchParams.get('type')
  const productName = searchParams.get('product') ?? ''
  const productSku = searchParams.get('sku') ?? ''
  const isProductEnquiry = enquiryType === 'product-enquiry' && Boolean(productName)

  const [subject, setSubject] = useState('general')
  const [subjectLine, setSubjectLine] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (isProductEnquiry) {
      setSubject('product-enquiry')
      setSubjectLine(buildProductEnquirySubject(productName))
      setMessage(buildProductEnquiryMessage(productName, productSku))
    }
  }, [isProductEnquiry, productName, productSku])

  return (
    <div className="uniPage">
      <UniNavbar lightMode />
      <main className="kvsContact">
        <section className="kvsContactHero">
          <div className="uniContainer kvsContactHeroInner">
            <div className="kvsContactHeroCopy">
              <p className="kvsContactEyebrow">Contact us</p>
              <h1>{isProductEnquiry ? 'Product enquiry' : 'Get in touch'}</h1>
              <p className="kvsContactLead">
                {isProductEnquiry
                  ? `Send your requirements for ${productName}. Our team will respond with pricing and supply details.`
                  : 'Tell us about your project, quantity, and delivery needs. We will get back to you shortly.'}
              </p>
            </div>
          </div>
        </section>

        <section className="kvsContactBody">
          <div className="kvsContactBodyPattern" aria-hidden />
          <div className="uniContainer">
            <div className="kvsContactPanel">
              <aside className="kvsContactAside">
                <h2>Reach KVS Metals</h2>
                <p className="kvsContactAsideLead">
                  Speak with our team for quotes, bulk supply, and steel procurement coordination.
                </p>
                <ul className="kvsContactMethods">
                  <li className="kvsContactMethodCard">
                    <span className="kvsContactMethodIcon" aria-hidden>
                      <PhoneIcon size={20} color="currentColor" />
                    </span>
                    <div>
                      <span className="kvsContactMethodLabel">Phone</span>
                      <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
                    </div>
                  </li>
                  <li className="kvsContactMethodCard">
                    <span className="kvsContactMethodIcon" aria-hidden>
                      <MailIcon />
                    </span>
                    <div>
                      <span className="kvsContactMethodLabel">Email</span>
                      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    </div>
                  </li>
                  <li className="kvsContactMethodCard">
                    <span className="kvsContactMethodIcon" aria-hidden>
                      <MapPinIcon />
                    </span>
                    <div>
                      <span className="kvsContactMethodLabel">Location</span>
                      <address>{footerContent.address}</address>
                    </div>
                  </li>
                </ul>
              </aside>

              <div className="kvsContactFormCard">
                <div className="kvsContactFormCardHead">
                  <h2>Send a message</h2>
                  <p>Fill in the details below and we will respond within one business day.</p>
                </div>
                <form
                  className="kvsContactForm"
                  onSubmit={(event) => event.preventDefault()}
                >
                  <div className="kvsContactFormRow">
                    <div className="kvsContactField">
                      <label htmlFor="contactName">Full name</label>
                      <input id="contactName" type="text" placeholder="Your name" required />
                    </div>
                    <div className="kvsContactField">
                      <label htmlFor="contactEmail">Email</label>
                      <input id="contactEmail" type="email" placeholder="you@company.com" required />
                    </div>
                  </div>

                  <div className="kvsContactFormRow">
                    <div className="kvsContactField">
                      <label htmlFor="contactPhone">Phone</label>
                      <input id="contactPhone" type="tel" placeholder="+971" />
                    </div>
                    <div className="kvsContactField">
                      <label htmlFor="contactSubject">Enquiry type</label>
                      <select
                        id="contactSubject"
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}
                      >
                        <option value="general">General inquiry</option>
                        <option value="product-enquiry">Product enquiry</option>
                        <option value="bulk">Bulk / project supply</option>
                        <option value="fabrication">Custom fabrication</option>
                      </select>
                    </div>
                  </div>

                  <div className="kvsContactField">
                    <label htmlFor="contactSubjectLine">Subject</label>
                    <input
                      id="contactSubjectLine"
                      type="text"
                      value={subjectLine}
                      onChange={(event) => setSubjectLine(event.target.value)}
                      placeholder="Subject of your message"
                      required
                    />
                  </div>

                  <div className="kvsContactField">
                    <label htmlFor="contactMessage">Message</label>
                    <textarea
                      id="contactMessage"
                      rows={6}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Share grade, quantity, delivery location, and timeline..."
                      required
                    />
                  </div>

                  <button type="submit" className="kvsContactSubmit">
                    Send enquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <UniFooter />
      <UniWidgets />
    </div>
  )
}
