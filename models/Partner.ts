import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose'

const PartnerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    img: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export type PartnerDocument = InferSchemaType<typeof PartnerSchema> & {
  _id: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export const PartnerModel =
  (mongoose.models.Partner as Model<PartnerDocument>) ||
  mongoose.model<PartnerDocument>('Partner', PartnerSchema)
