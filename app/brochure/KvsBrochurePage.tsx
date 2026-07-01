'use client'

import { useState } from 'react'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import { DownloadIcon } from '@/components/Icons'
import { brochurePage, PHONE_DISPLAY, WHATSAPP_URL } from '@/lib/content'
import { BROCHURE_FILENAME, BROCHURE_URL } from '@/lib/site'

function triggerBrochureDownload() {
  const link = document.createElement('a')
  link.href = BROCHURE_URL
  link.download = BROCHURE_FILENAME
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function KvsBrochurePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [sentEmail, setSentEmail] = useState('')
  const [emailDelivered, setEmailDelivered] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    const trimmedEmail = email.trim()

    try {
      const response = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: trimmedEmail,
          phone: phone.trim(),
          company: company.trim() || undefined,
        }),
      })

      const data = (await response.json()) as { error?: string; emailSent?: boolean }

      if (!response.ok) {
        setSubmitError(data.error || 'Could not process your request. Please try again.')
        return
      }

      triggerBrochureDownload()
      setSentEmail(trimmedEmail)
      setEmailDelivered(Boolean(data.emailSent))
      setSubmitSuccess(true)
      setName('')
      setEmail('')
      setPhone('')
      setCompany('')
    } catch {
      setSubmitError('Could not process your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="uniPage">
      <UniNavbar />
      <main className="kvsContact kvsBrochure">
        <section className="kvsContactBody">
          <div className="uniContainer">
            <div className="kvsContactPanel kvsContactPanel--contentForm">
              <div className="kvsContactPageHead">
                <p className="kvsContactEyebrow">{brochurePage.eyebrow}</p>
                <h1>{brochurePage.title}</h1>
                <p className="kvsContactLead kvsContactLead--strong">{brochurePage.lead}</p>
                <p className="kvsContactLead">
                  Complete the form to download the brochure. If you add your email, we will send you
                  a copy as well.
                </p>
              </div>

              <div className="kvsContactFormCard" id="download">
                <div className="kvsContactFormCardHead">
                  <h2>{brochurePage.formTitle}</h2>
                  <p>{brochurePage.formDescription}</p>
                </div>

                {submitSuccess ? (
                  <div className="kvsBrochureSuccess">
                    <p className="kvsBrochureSuccessTitle">{brochurePage.successTitle}</p>
                    {emailDelivered && sentEmail ? (
                      <p className="kvsBrochureSuccessEmail">
                        {brochurePage.successEmailNote} <strong>{sentEmail}</strong>
                      </p>
                    ) : null}
                    <p className="kvsBrochureSuccessHint">{brochurePage.successDownloadHint}</p>
                    <a
                      href={BROCHURE_URL}
                      className="kvsBrochureSuccessDownload"
                      download={BROCHURE_FILENAME}
                    >
                      <DownloadIcon size={16} />
                      {brochurePage.downloadLabel}
                    </a>
                    <p className="kvsBrochureSuccessWhatsapp">
                      {brochurePage.successWhatsappPrefix}{' '}
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                        {PHONE_DISPLAY}
                      </a>
                    </p>
                    <button
                      type="button"
                      className="kvsBrochureSuccessAgain"
                      onClick={() => setSubmitSuccess(false)}
                    >
                      {brochurePage.successAgainLabel}
                    </button>
                  </div>
                ) : (
                  <form className="kvsContactForm" onSubmit={handleSubmit}>
                    <div className="kvsContactField">
                      <label htmlFor="brochureName">
                        {brochurePage.nameLabel}
                        <span className="kvsFormRequired">*</span>
                      </label>
                      <input
                        id="brochureName"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                      />
                    </div>

                    <div className="kvsContactField">
                      <label htmlFor="brochureCompany">{brochurePage.companyLabel}</label>
                      <input
                        id="brochureCompany"
                        type="text"
                        placeholder="Your company"
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                      />
                    </div>

                    <div className="kvsContactField">
                      <label htmlFor="brochureEmail">{brochurePage.emailLabel}</label>
                      <input
                        id="brochureEmail"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <p className="kvsCareersFieldHint">{brochurePage.emailHint}</p>
                    </div>

                    <div className="kvsContactField">
                      <label htmlFor="brochurePhone">
                        {brochurePage.phoneLabel}
                        <span className="kvsFormRequired">*</span>
                      </label>
                      <input
                        id="brochurePhone"
                        type="tel"
                        placeholder="+971 50 364 6193"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        required
                      />
                    </div>

                    {submitError ? (
                      <p className="kvsContactFormError" role="alert">
                        {submitError}
                      </p>
                    ) : null}

                    <button type="submit" className="kvsContactSubmit kvsContactSubmit--icon" disabled={submitting}>
                      <DownloadIcon size={18} />
                      {submitting ? 'Processing…' : brochurePage.submitLabel}
                    </button>
                  </form>
                )}
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
