export function getProductEnquiryHref(product: {
  title: string
  sku: string
}): string {
  const params = new URLSearchParams({
    type: 'product-enquiry',
    product: product.title,
    sku: product.sku,
  })
  return `/contact?${params.toString()}`
}

export function buildProductEnquirySubject(productTitle: string): string {
  return `Product Enquiry: ${productTitle}`
}

export function buildProductEnquiryMessage(productTitle: string, sku: string): string {
  return `I would like to request a quote for ${productTitle} (SKU: ${sku}). Please share pricing, specifications, and delivery timelines.`
}
