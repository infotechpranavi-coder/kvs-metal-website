import { unstable_noStore as noStore } from 'next/cache'
import { connectDB } from '@/lib/mongodb'
import { SiteSettingsModel } from '@/models/SiteSettings'
import {
  SITE_SETTINGS_KEY,
  defaultSiteSettings,
  type SiteSettingsDto,
} from '@/lib/site-settings'

export async function getSiteSettings(): Promise<SiteSettingsDto> {
  noStore()
  await connectDB()
  const doc = await SiteSettingsModel.findOne({ key: SITE_SETTINGS_KEY }).lean()

  if (!doc) {
    return defaultSiteSettings
  }

  return {
    heroNavWhiteLogo: doc.heroNavWhiteLogo ?? defaultSiteSettings.heroNavWhiteLogo,
    showHomePartnersSlider:
      doc.showHomePartnersSlider ?? defaultSiteSettings.showHomePartnersSlider,
  }
}

export async function updateSiteSettings(
  partial: Partial<SiteSettingsDto>,
): Promise<SiteSettingsDto> {
  await connectDB()
  const doc = await SiteSettingsModel.findOneAndUpdate(
    { key: SITE_SETTINGS_KEY },
    { $set: { key: SITE_SETTINGS_KEY, ...partial } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  ).lean()

  return {
    heroNavWhiteLogo: doc?.heroNavWhiteLogo ?? defaultSiteSettings.heroNavWhiteLogo,
    showHomePartnersSlider:
      doc?.showHomePartnersSlider ?? defaultSiteSettings.showHomePartnersSlider,
  }
}
