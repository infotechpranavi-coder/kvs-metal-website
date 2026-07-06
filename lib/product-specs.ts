export type ProductSpecSource = {
  material?: string
  dimensions?: string
  schedule?: string
  standard?: string
  thickness?: string
  colors?: string
  warranty?: string
  category?: string
  inStock?: boolean
}

export type ProductSpecField = { label: string; value: string }

export function getProductCardSpecs(product: ProductSpecSource): ProductSpecField[] {
  return [
    product.material ? { label: 'Type / Grade', value: product.material } : null,
    product.dimensions ? { label: 'Size', value: product.dimensions } : null,
    product.schedule ? { label: 'Schedule', value: product.schedule } : null,
    product.standard ? { label: 'Standard', value: product.standard } : null,
    product.thickness ? { label: 'Thickness', value: product.thickness } : null,
    product.colors ? { label: 'Colors', value: product.colors } : null,
  ].filter(Boolean) as ProductSpecField[]
}

export function getProductDetailSpecs(product: ProductSpecSource): ProductSpecField[] {
  return [
    product.category ? { label: 'Category', value: product.category } : null,
    product.material ? { label: 'Type / Grade', value: product.material } : null,
    product.dimensions ? { label: 'Size', value: product.dimensions } : null,
    product.schedule ? { label: 'Schedule', value: product.schedule } : null,
    product.standard ? { label: 'Standard', value: product.standard } : null,
    product.thickness ? { label: 'Thickness', value: product.thickness } : null,
    product.colors ? { label: 'Colors', value: product.colors } : null,
    product.warranty ? { label: 'Warranty', value: product.warranty } : null,
    {
      label: 'Availability',
      value: product.inStock !== false ? 'In stock — ready to supply' : 'Made to order',
    },
  ].filter(Boolean) as ProductSpecField[]
}
