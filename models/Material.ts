import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose'

const MaterialSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    img: { type: String, required: true },
    categoryIds: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export type MaterialDocument = InferSchemaType<typeof MaterialSchema> & {
  _id: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export const MaterialModel =
  (mongoose.models.Material as Model<MaterialDocument>) ||
  mongoose.model<MaterialDocument>('Material', MaterialSchema)
