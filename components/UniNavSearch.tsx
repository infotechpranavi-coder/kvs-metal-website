'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { searchCatalog } from '@/lib/products'
import { searchSectors } from '@/lib/sectors'

type UniNavSearchProps = {
  light?: boolean
  onNavigate?: () => void
  className?: string
}

export function UniNavSearch({ light = false, onNavigate, className = '' }: UniNavSearchProps) {
  const router = useRouter()
  const listId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const trimmed = query.trim()
  const products = trimmed.length >= 2 ? searchCatalog(trimmed, 5) : []
  const industries = trimmed.length >= 2 ? searchSectors(trimmed, 3) : []
  const hasResults = products.length > 0 || industries.length > 0

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
    if (products.length === 1 && industries.length === 0) {
      router.push(`/products/${products[0].slug}`)
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
        <span className="uniNavSearchIcon" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
        <input
          id={`${listId}-input`}
          type="search"
          value={query}
          placeholder="Search..."
          autoComplete="off"
          aria-expanded={open && hasResults}
          aria-controls={hasResults ? `${listId}-results` : undefined}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
        />
        {trimmed ? (
          <button type="submit" className="uniNavSearchSubmit">
            Search
          </button>
        ) : null}
      </form>

      {open && trimmed.length >= 2 && hasResults ? (
        <div id={`${listId}-results`} className="uniNavSearchResults" role="listbox">
          {industries.length > 0 ? (
            <div className="uniNavSearchGroup">
              <p className="uniNavSearchGroupLabel">Industries</p>
              {industries.map((sector) => (
                <Link
                  key={sector.slug}
                  href={`/sectors/${sector.slug}`}
                  className="uniNavSearchResult"
                  role="option"
                  onClick={() => {
                    setQuery('')
                    close()
                  }}
                >
                  <span className="uniNavSearchResultTitle">{sector.name}</span>
                  <span className="uniNavSearchResultMeta">{sector.tagline}</span>
                </Link>
              ))}
            </div>
          ) : null}
          {products.length > 0 ? (
            <div className="uniNavSearchGroup">
              <p className="uniNavSearchGroupLabel">Products</p>
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="uniNavSearchResult"
                  role="option"
                  onClick={() => {
                    setQuery('')
                    close()
                  }}
                >
                  <span className="uniNavSearchResultTitle">{product.title}</span>
                  <span className="uniNavSearchResultMeta">{product.category}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {open && trimmed.length >= 2 && !hasResults ? (
        <div className="uniNavSearchResults uniNavSearchResults--empty">
          <p>No matches found. Press Search to browse the catalog.</p>
        </div>
      ) : null}
    </div>
  )
}
