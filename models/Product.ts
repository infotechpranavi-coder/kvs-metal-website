import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const ProductSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    sku: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    materialId: { type: Schema.Types.ObjectId, ref: 'Material', default: null },
    img: { type: String, required: true },
    images: { type: [String], default: [] },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    features: { type: [String], default: [] },
    material: { type: String, default: '' },
    dimensions: { type: String, default: '' },
    standard: { type: String, default: '' },
    schedule: { type: String, default: '' },
    thickness: { type: String, default: '' },
    colors: { type: String, default: '' },
    warranty: { type: String, default: '' },
    badge: { type: String, default: '' },
    price: { type: String, default: '' },
    rating: { type: String, default: '4.8' },
    reviewCount: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    showInFooter: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
)

ProductSchema.index({ categoryId: 1 })
ProductSchema.index({ materialId: 1 })
ProductSchema.index({ showInFooter: 1, sortOrder: 1 })
ProductSchema.index({ sortOrder: 1, title: 1 })

export type ProductDocument = InferSchemaType<typeof ProductSchema> & {
  _id: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

if (mongoose.models.Product) {
  mongoose.deleteModel('Product')
}

export const ProductModel = mongoose.model<ProductDocument>('Product', ProductSchema)
