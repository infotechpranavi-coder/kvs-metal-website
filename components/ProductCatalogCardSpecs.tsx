import { getProductCardSpecs, type ProductSpecSource } from '@/lib/product-specs'

export function ProductCatalogCardSpecs({ product }: { product: ProductSpecSource }) {
  const specs = getProductCardSpecs(product)
  if (specs.length === 0) return null

  return (
    <dl className="productCatalogCardSpecs">
      {specs.map((spec) => (
        <div key={spec.label}>
          <dt>{spec.label}</dt>
          <dd>{spec.value}</dd>
        </div>
      ))}
    </dl>
  )
}
