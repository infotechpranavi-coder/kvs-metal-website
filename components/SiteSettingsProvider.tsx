'use client'

import { createContext, useContext } from 'react'
import { defaultSiteSettings, type SiteSettingsDto } from '@/lib/site-settings'

const SiteSettingsContext = createContext<SiteSettingsDto>(defaultSiteSettings)

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettingsDto
  children: React.ReactNode
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
