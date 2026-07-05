import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose'

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    phone: { type: String, default: '' },
    type: { type: String, default: 'general' },
    subject: { type: String, default: '' },
    message: { type: String, required: true },
    productSku: { type: String, default: '' },
    cvUrl: { type: String, default: '' },
    cvPublicId: { type: String, default: '' },
    cvFilename: { type: String, default: '' },
    cvMimeType: { type: String, default: '' },
    status: { type: String, enum: ['new', 'read', 'closed'], default: 'new' },
  },
  { timestamps: true },
)

export type EnquiryDocument = InferSchemaType<typeof EnquirySchema> & {
  _id: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export const EnquiryModel =
  (mongoose.models.Enquiry as Model<EnquiryDocument>) ||
  mongoose.model<EnquiryDocument>('Enquiry', EnquirySchema)
