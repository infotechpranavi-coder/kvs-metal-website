'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { getAllCatalogProducts, type Product } from '@/lib/products'
import { getFooterProducts, subscribeDashboardStore } from '@/lib/dashboard-store'

function splitFooterColumns<T>(items: T[]) {
  const midpoint = Math.ceil(items.length / 2)
  return [items.slice(0, midpoint), items.slice(midpoint)]
}

type FooterProductsColumnProps = {
  onVisibilityChange?: (visible: boolean) => void
}

export function FooterProductsColumn({ onVisibilityChange }: FooterProductsColumnProps) {
  const catalogProducts = useMemo(() => getAllCatalogProducts(), [])
  const [footerProducts, setFooterProducts] = useState<Product[]>([])

  useEffect(() => {
    const refresh = () => setFooterProducts(getFooterProducts(catalogProducts))
    refresh()
    return subscribeDashboardStore(refresh)
  }, [catalogProducts])

  useEffect(() => {
    onVisibilityChange?.(footerProducts.length > 0)
  }, [footerProducts, onVisibilityChange])

  if (footerProducts.length === 0) return null

  const columns = splitFooterColumns(footerProducts)

  return (
    <div className="uniFooterCol uniFooterCol--products">
      <h4>Products</h4>
      <div className="uniFooterProductsSplit">
        {columns.map((column, columnIndex) => (
          <ul key={columnIndex}>
            {column.map((product) => (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`}>{product.title}</Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
