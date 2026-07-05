'use client'

import { useState } from 'react'
import { UniNavbar } from '@/components/UniNavbar'
import { UniFooter } from '@/components/UniFooter'
import { UniWidgets } from '@/components/UniWidgets'
import { careersPage } from '@/lib/content'

export default function KvsCareersPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [cvFileName, setCvFileName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formData,
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        setSubmitError(data.error || 'Could not submit your application. Please try again.')
        return
      }

      setSubmitSuccess(true)
      setFirstName('')
      setLastName('')
      setEmail('')
      setMessage('')
      setCvFileName('')
      form.reset()
    } catch {
      setSubmitError('Could not submit your application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="uniPage">
      <UniNavbar />
      <main className="kvsContact kvsCareers">
        <section className="sectorDetailHero kvsCareersHero">
          <div className="kvsCareersHeroMedia">
            <img
              src={careersPage.heroImage}
              alt={careersPage.heroImageAlt}
              className="kvsCareersHeroImg"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              width={1920}
              height={720}
            />
          </div>
          <div className="kvsCareersHeroOverlay" aria-hidden />
          <div className="kvsCareersHeroFade" aria-hidden />

          <div className="uniContainer productCatalogHeroContainer sectorDetailHeroContent">
            <header className="sectorDetailPageTitle">
              <div className="sectorDetailAccent" aria-hidden>
                <span className="sectorDetailAccentBadge" />
                <span className="sectorDetailAccentRail">
                  <span className="sectorDetailAccentRailLine sectorDetailAccentRailLine--black" />
                  <span className="sectorDetailAccentRailLine sectorDetailAccentRailLine--orange" />
                </span>
                <span className="sectorDetailAccentFoot">
                  <span className="sectorDetailAccentFootBar" />
                  <span className="sectorDetailAccentFootCap" />
                </span>
              </div>
              <div className="productCatalogHeroCopy">
                <p className="kvsContactEyebrow">{careersPage.eyebrow}</p>
                <h1>{careersPage.title}</h1>
                <p className="productCatalogHeroLead">{careersPage.subheading}</p>
              </div>
            </header>
          </div>
        </section>

        <section className="kvsContactBody">
          <div className="uniContainer">
            <div className="kvsContactPanel kvsContactPanel--contentForm">
              <div className="kvsContactPageHead kvsCareersIntro">
                {careersPage.intro.map((paragraph) => (
                  <p key={paragraph} className="kvsContactLead">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="kvsContactFormCard">
                <div className="kvsContactFormCardHead">
                  <h2>{careersPage.formTitle}</h2>
                  <p>{careersPage.formDescription}</p>
                </div>

                {submitSuccess ? (
                  <div className="kvsCareersSuccess">
                    <p className="kvsCareersSuccessTitle">{careersPage.successTitle}</p>
                    <p>{careersPage.successMessage}</p>
                  </div>
                ) : (
                  <form className="kvsContactForm" onSubmit={handleSubmit}>
                    <div className="kvsContactFormRow">
                      <div className="kvsContactField">
                        <label htmlFor="careerFirstName">{careersPage.firstNameLabel}</label>
                        <input
                          id="careerFirstName"
                          name="firstName"
                          type="text"
                          placeholder="First name"
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                          required
                        />
                      </div>
                      <div className="kvsContactField">
                        <label htmlFor="careerLastName">{careersPage.lastNameLabel}</label>
                        <input
                          id="careerLastName"
                          name="lastName"
                          type="text"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="kvsContactField">
                      <label htmlFor="careerEmail">{careersPage.emailLabel}</label>
                      <input
                        id="careerEmail"
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </div>

                    <div className="kvsContactField">
                      <label htmlFor="careerCv">{careersPage.cvLabel}</label>
                      <div className="kvsCareersFileField">
                        <label htmlFor="careerCv" className="kvsCareersFileBtn">
                          Choose file
                        </label>
                        <input
                          id="careerCv"
                          name="cv"
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="kvsCareersFileInput"
                          onChange={(event) => {
                            const file = event.target.files?.[0]
                            setCvFileName(file?.name ?? '')
                          }}
                          required
                        />
                        <span className="kvsCareersFileName">{cvFileName || 'No file chosen'}</span>
                      </div>
                      <p className="kvsCareersFieldHint">{careersPage.cvHint}</p>
                    </div>

                    <div className="kvsContactField">
                      <label htmlFor="careerMessage">{careersPage.messageLabel}</label>
                      <textarea
                        id="careerMessage"
                        name="message"
                        rows={6}
                        maxLength={careersPage.messageLimit}
                        placeholder="Tell us about your experience and the role you are interested in..."
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                      />
                      <p className="kvsCareersFieldHint">
                        {message.length}/{careersPage.messageLimit} characters
                      </p>
                    </div>

                    {submitError ? (
                      <p className="kvsContactFormError" role="alert">
                        {submitError}
                      </p>
                    ) : null}

                    <button type="submit" className="kvsContactSubmit" disabled={submitting}>
                      {submitting ? 'Submitting…' : careersPage.submitLabel}
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
