'use client'

import { useEffect, useState } from 'react'
import type { SiteSettingsDto } from '@/lib/site-settings'

export default function SuperAdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettingsDto>({ heroNavWhiteLogo: true })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/site-settings')
        const data = (await response.json()) as { settings?: SiteSettingsDto; error?: string }
        if (!response.ok) {
          setError(data.error || 'Failed to load settings')
          return
        }
        if (data.settings) {
          setSettings(data.settings)
        }
      } catch {
        setError('Failed to load settings')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleToggle = async (heroNavWhiteLogo: boolean) => {
    setSaving(true)
    setError('')
    setSaved(false)

    try {
      const response = await fetch('/api/site-settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroNavWhiteLogo }),
      })
      const data = (await response.json()) as { settings?: SiteSettingsDto; error?: string }

      if (!response.ok) {
        setError(data.error || 'Failed to save settings')
        return
      }

      if (data.settings) {
        setSettings(data.settings)
      }
      setSaved(true)
    } catch {
      setError('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="dashPage">
      <header className="dashPageHead">
        <div>
          <h1>Settings</h1>
          <p className="dashPageLead">
            Control how the website navbar behaves on the homepage hero section.
          </p>
        </div>
      </header>

      <section className="dashCard dashForm">
        <h2>Homepage navbar logo</h2>
        <p className="dashHint" style={{ marginTop: 0 }}>
          When visitors land on the homepage hero, the navbar sits over the video background.
          Use this toggle to choose which logo version appears there before the user scrolls.
        </p>

        {loading ? (
          <p className="dashHint">Loading settings…</p>
        ) : (
          <label className="dashCheckboxLabel dashSettingsToggle">
            <input
              type="checkbox"
              checked={settings.heroNavWhiteLogo}
              disabled={saving}
              onChange={(event) => handleToggle(event.target.checked)}
            />
            <span>
              <strong>White logo on homepage hero</strong>
              <small>
                {settings.heroNavWhiteLogo
                  ? 'Enabled — white logo shows over the hero video. Colored logo appears after scroll.'
                  : 'Disabled — colored logo always shows in the navbar, including on the hero.'}
              </small>
            </span>
          </label>
        )}

        {error ? <p className="dashError">{error}</p> : null}
        {saved && !error ? <p className="dashSuccess">Settings saved.</p> : null}
      </section>
    </div>
  )
}
