'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { CategoryDto } from '@/lib/serializers'
import { buildNavSearchSuggestions } from '@/lib/nav-search'
import type { Product } from '@/lib/products'
import { fetchProducts } from '@/lib/product-api'
import { sectors } from '@/lib/sectors'

type UniNavSearchProps = {
  light?: boolean
  onNavigate?: () => void
  className?: string
}

const SUGGESTION_TYPE_LABEL = {
  product: 'Product',
  category: 'Category',
  industry: 'Industry',
} as const

export function UniNavSearch({ light = false, onNavigate, className = '' }: UniNavSearchProps) {
  const router = useRouter()
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<CategoryDto[]>([])

  useEffect(() => {
    let cancelled = false

    Promise.all([
      fetchProducts(),
      fetch('/api/categories').then((response) => response.json()),
    ])
      .then(([nextProducts, categoryData]) => {
        if (cancelled) return
        setProducts(nextProducts)
        setCategories(Array.isArray(categoryData.categories) ? categoryData.categories : [])
      })
      .catch(() => {
        if (!cancelled) {
          setProducts([])
          setCategories([])
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const trimmed = query.trim()
  const suggestions = useMemo(
    () =>
      trimmed.length >= 2
        ? buildNavSearchSuggestions(
            trimmed,
            {
              products,
              categories: categories.map((category) => ({
                slug: category.slug,
                title: category.title,
                description: category.description,
                headline: category.headline,
              })),
              sectors,
            },
            3,
          )
        : [],
    [trimmed, products, categories],
  )
  const hasResults = suggestions.length > 0

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const close = () => {
    setOpen(false)
    onNavigate?.()
  }

  const submitSearch = () => {
    if (!trimmed) return
    const topProduct = suggestions.find((item) => item.type === 'product')
    if (suggestions.length === 1 && topProduct) {
      router.push(topProduct.href)
      setQuery('')
      close()
      return
    }
    router.push(`/products?q=${encodeURIComponent(trimmed)}`)
    setQuery('')
    close()
  }

  return (
    <div
      ref={rootRef}
      className={`uniNavSearchWrap${className ? ` ${className}` : ''}`}
    >
      <form
        className={`uniNavSearch${light ? ' uniNavSearch--light' : ''}`}
        role="search"
        onSubmit={(event) => {
          event.preventDefault()
          submitSearch()
        }}
      >
        <label htmlFor={`${listId}-input`} className="uniNavSearchLabel">
          Search products
        </label>
        <input
          id={`${listId}-input`}
          type="text"
          value={query}
          placeholder="Search products..."
          autoComplete="off"
          enterKeyHint="search"
          aria-expanded={open && hasResults}
          aria-controls={hasResults ? `${listId}-results` : undefined}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
        />
        <button type="submit" className="uniNavSearchSubmit" aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </form>

      {open && trimmed.length >= 2 && hasResults ? (
        <div id={`${listId}-results`} className="uniNavSearchResults" role="listbox">
          {suggestions.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="uniNavSearchResult"
              role="option"
              onClick={() => {
                setQuery('')
                close()
              }}
            >
              <span className="uniNavSearchResultType">{SUGGESTION_TYPE_LABEL[item.type]}</span>
              <span className="uniNavSearchResultTitle">{item.title}</span>
              <span className="uniNavSearchResultMeta">{item.meta}</span>
            </Link>
          ))}
        </div>
      ) : null}

      {open && trimmed.length >= 2 && !hasResults ? (
        <div className="uniNavSearchResults uniNavSearchResults--empty">
          <p>No matches found. Click the search icon to browse the catalog.</p>
        </div>
      ) : null}
    </div>
  )
}
