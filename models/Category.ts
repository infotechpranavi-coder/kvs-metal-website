import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const CategorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    img: { type: String, required: true },
    heroImg: { type: String, default: '' },
    description: { type: String, default: '' },
    headline: { type: String, default: '' },
    paragraphs: { type: [String], default: [] },
    productSlugs: { type: [String], default: [] },
    sortOrder: { type: Number, default: 0 },
    showOnHomepage: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export type CategoryDocument = InferSchemaType<typeof CategorySchema> & {
  _id: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

if (mongoose.models.Category) {
  mongoose.deleteModel('Category')
}

export const CategoryModel = mongoose.model<CategoryDocument>('Category', CategorySchema)
