import { z } from 'zod'

export const categoryInputSchema = z.object({
  slug: z.string().min(1).max(120).optional(),
  title: z.string().min(1).max(200),
  img: z.string().min(1),
  heroImg: z.string().optional(),
  description: z.string().optional(),
  headline: z.string().optional(),
  paragraphs: z.array(z.string()).optional(),
  productSlugs: z.array(z.string()).optional(),
  sortOrder: z.number().int().optional(),
  showOnHomepage: z.boolean().optional(),
  materialId: z.union([z.string(), z.null()]).optional(),
})

export const materialInputSchema = z.object({
  slug: z.string().min(1).max(120).optional(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  img: z.string().min(1),
  categoryIds: z.array(z.string()).optional(),
  sortOrder: z.number().int().optional(),
})

export const partnerInputSchema = z.object({
  name: z.string().min(1).max(120),
  img: z.string().optional(),
  sortOrder: z.number().int().optional(),
})

export const siteSettingsInputSchema = z.object({
  heroNavWhiteLogo: z.boolean().optional(),
  showHomePartnersSlider: z.boolean().optional(),
})

export const enquiryInputSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(40).optional(),
  type: z.string().min(1).max(40).optional(),
  subject: z.string().max(300).optional(),
  message: z.string().min(1).max(5000),
  productSku: z.string().max(80).optional(),
})

export const enquiryResendSchema = z.object({
  target: z.enum(['admin', 'customer']),
})

export const enquiryStatusSchema = z.object({
  status: z.enum(['new', 'read', 'closed']),
})

export const loginSchema = z.object({
  username: z.string().min(1).optional().default('admin'),
  password: z.string().min(1),
})

export const productInputSchema = z.object({
  slug: z.string().min(1).max(120).optional(),
  title: z.string().min(1).max(200),
  sku: z.string().max(40).optional(),
  category: z.string().min(1).max(200),
  categoryId: z.string().optional().nullable(),
  img: z.string().min(1),
  images: z.array(z.string()).optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  standard: z.string().optional(),
  schedule: z.string().optional(),
  thickness: z.string().optional(),
  colors: z.string().optional(),
  warranty: z.string().optional(),
  badge: z.string().optional(),
  price: z.string().optional(),
  rating: z.string().optional(),
  reviewCount: z.number().int().optional(),
  inStock: z.boolean().optional(),
  showInFooter: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
})

export const brochureRequestSchema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().min(1).max(40),
  email: z
    .string()
    .max(200)
    .optional()
    .transform((value) => value?.trim() || '')
    .refine((value) => !value || z.string().email().safeParse(value).success, {
      message: 'Invalid email address',
    }),
  company: z.string().max(200).optional(),
})

const careerCvMimeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

export const careerApplicationSchema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().max(200),
  message: z.string().max(500).optional().default(''),
})

export function isAllowedCareerCv(file: { type: string; size: number }) {
  return careerCvMimeTypes.has(file.type) && file.size > 0 && file.size <= 5 * 1024 * 1024
}
