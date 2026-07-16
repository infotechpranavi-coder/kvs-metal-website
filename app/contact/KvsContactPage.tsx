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

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('general')
  const [subjectLine, setSubjectLine] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    if (isProductEnquiry) {
      setSubject('product-enquiry')
      setSubjectLine(buildProductEnquirySubject(productName))
      setMessage(buildProductEnquiryMessage(productName, productSku))
    }
  }, [isProductEnquiry, productName, productSku])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          type: subject,
          subject: subjectLine.trim(),
          message: message.trim(),
          productSku: isProductEnquiry ? productSku || undefined : undefined,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        setSubmitError(
          typeof data.error === 'string'
            ? data.error
            : 'Could not send your enquiry. Please try again or email us directly.',
        )
        return
      }

      await response.json()
      setSubmitSuccess(true)
      if (!isProductEnquiry) {
        setName('')
        setEmail('')
        setPhone('')
        setSubject('general')
        setSubjectLine('')
        setMessage('')
      }
    } catch {
      setSubmitError('Could not send your enquiry. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="uniPage">
      <UniNavbar />
      <main className="kvsContact">
        <section className="kvsContactBody">
          <div className="uniContainer">
            <header className="kvsContactPageHead">
              <p className="kvsContactEyebrow">Contact us</p>
              <h1>{isProductEnquiry ? 'Product enquiry' : 'Reach KVS Metals'}</h1>
              <p className="kvsContactLead">
                {isProductEnquiry
                  ? `Send your requirements for ${productName}. Our team will respond with pricing and supply details.`
                  : 'Tell us about your project, quantity, and delivery needs. We will get back to you shortly.'}
              </p>
            </header>

            <div className="kvsContactPanel">
              <aside className="kvsContactAside" aria-label="Contact details">
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
                      <address>
                        <a
                          href={footerContent.addressHref}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {footerContent.address}
                        </a>
                      </address>
                    </div>
                  </li>
                </ul>
              </aside>

              <div className="kvsContactFormCard">
                <div className="kvsContactFormCardHead">
                  <h2>Send a message</h2>
                  <p>Fill in the details below and we will respond within one business day.</p>
                </div>
                <form className="kvsContactForm" onSubmit={handleSubmit}>
                  <div className="kvsContactFormRow">
                    <div className="kvsContactField">
                      <label htmlFor="contactName">Full name</label>
                      <input
                        id="contactName"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                      />
                    </div>
                    <div className="kvsContactField">
                      <label htmlFor="contactEmail">Email</label>
                      <input
                        id="contactEmail"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="kvsContactFormRow">
                    <div className="kvsContactField">
                      <label htmlFor="contactPhone">Phone</label>
                      <input
                        id="contactPhone"
                        type="tel"
                        placeholder="+971"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                      />
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

                  {submitError ? (
                    <p className="kvsContactFormError" role="alert">
                      {submitError}
                    </p>
                  ) : null}
                  {submitSuccess ? (
                    <p className="kvsContactFormSuccess" role="status">
                      Thank you — your enquiry has been received. Our team will respond within one
                      business day.
                    </p>
                  ) : null}

                  <button type="submit" className="kvsContactSubmit" disabled={submitting}>
                    {submitting ? 'Sending enquiry…' : 'Send enquiry'}
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
