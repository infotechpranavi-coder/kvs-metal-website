export const SITE_SETTINGS_KEY = 'global'

export type SiteSettingsDto = {
  heroNavWhiteLogo: boolean
}

export const defaultSiteSettings: SiteSettingsDto = {
  heroNavWhiteLogo: true,
}
