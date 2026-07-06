import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose'

const SiteSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: 'global' },
    heroNavWhiteLogo: { type: Boolean, default: true },
    showHomePartnersSlider: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export type SiteSettingsDocument = InferSchemaType<typeof SiteSettingsSchema> & {
  _id: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export const SiteSettingsModel =
  (mongoose.models.SiteSettings as Model<SiteSettingsDocument>) ||
  mongoose.model<SiteSettingsDocument>('SiteSettings', SiteSettingsSchema)
