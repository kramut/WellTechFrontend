'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const themes = [
  { name: 'Wellbeing', href: '/temi/wellbeing' },
  { name: 'Nutrition', href: '/temi/nutrition' },
  { name: 'Fitness', href: '/temi/fitness' },
  { name: 'Mindset', href: '/temi/mindset' },
  { name: 'Productivity', href: '/temi/productivity' },
  { name: 'Wealth', href: '/temi/wealth' },
];

interface SearchResult {
  type: 'article' | 'product';
  id: number;
  title: string;
  slug?: string;
  category: string;
  excerpt: string;
  href: string;
}

export function Navbar() {
  const [showThemes, setShowThemes] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  // Debounced search
  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }

    setSearching(true);
    try {
      const [articlesRes, productsRes] = await Promise.allSettled([
        fetch(`${API_BASE_URL}/api/articles`),
        fetch(`${API_BASE_URL}/api/products`),
      ]);

      const articles = articlesRes.status === 'fulfilled' && articlesRes.value.ok
        ? await articlesRes.value.json()
        : [];
      const products = productsRes.status === 'fulfilled' && productsRes.value.ok
        ? await productsRes.value.json()
        : [];

      const lower = q.toLowerCase();

      const articleResults: SearchResult[] = (Array.isArray(articles) ? articles : [])
        .filter((a: any) => a.publishedAt) // Only published
        .filter((a: any) =>
          a.title.toLowerCase().includes(lower) ||
          a.category.toLowerCase().includes(lower) ||
          (a.seoMetaDescription || '').toLowerCase().includes(lower) ||
          (a.content || '').toLowerCase().includes(lower)
        )
        .slice(0, 5)
        .map((a: any) => ({
          type: 'article' as const,
          id: a.id,
          title: a.title,
          slug: a.slug,
          category: a.category,
          excerpt: a.seoMetaDescription || a.content?.substring(0, 100) || '',
          href: `/articoli/${a.slug}`,
        }));

      const productResults: SearchResult[] = (Array.isArray(products) ? products : [])
        .filter((p: any) =>
          p.name.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower) ||
          (p.description || '').toLowerCase().includes(lower)
        )
        .slice(0, 5)
        .map((p: any) => ({
          type: 'product' as const,
          id: p.id,
          title: p.name,
          category: p.category,
          excerpt: p.description || '',
          href: `/prodotti/${p.id}`,
        }));

      setResults([...articleResults, ...productResults]);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-[var(--sage-500)] to-[var(--teal-500)] bg-clip-text text-transparent">
              WellTech Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/articoli"
              className="text-gray-700 dark:text-gray-300 hover:text-[var(--sage-600)] dark:hover:text-[var(--sage-400)] transition-colors"
            >
              Articoli
            </Link>
            <Link
              href="/prodotti"
              className="text-gray-700 dark:text-gray-300 hover:text-[var(--sage-600)] dark:hover:text-[var(--sage-400)] transition-colors"
            >
              Prodotti
            </Link>
            <Link
              href="/guide"
              className="text-gray-700 dark:text-gray-300 hover:text-[var(--sage-600)] dark:hover:text-[var(--sage-400)] transition-colors"
            >
              Guide
            </Link>
            <Link
              href="/percorsi"
              className="text-gray-700 dark:text-gray-300 hover:text-[var(--sage-600)] dark:hover:text-[var(--sage-400)] transition-colors font-medium"
            >
              Percorsi
            </Link>
            
            {/* Themes Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowThemes(!showThemes)}
                className="text-gray-700 dark:text-gray-300 hover:text-[var(--sage-600)] dark:hover:text-[var(--sage-400)] transition-colors flex items-center gap-1"
              >
                Temi
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showThemes && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
                  {themes.map((theme) => (
                    <Link
                      key={theme.href}
                      href={theme.href}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setShowThemes(false)}
                    >
                      {theme.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Search */}
            <button
              onClick={() => { setShowSearch(!showSearch); setQuery(''); setResults([]); }}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-[var(--sage-600)] dark:hover:text-[var(--sage-400)] transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Newsletter CTA */}
            <Link
              href="/newsletter"
              className="px-4 py-2 text-sm font-medium text-[var(--sage-600)] dark:text-[var(--sage-400)] hover:text-[var(--sage-700)] dark:hover:text-[var(--sage-300)] transition-colors"
            >
              Newsletter
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 dark:text-gray-300"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Search Bar + Results */}
      {showSearch && (
        <div ref={searchRef} className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto p-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') setShowSearch(false); }}
                placeholder="Cerca articoli, prodotti, temi..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sage-500)] dark:bg-gray-800 dark:text-white text-base"
              />
              {searching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Results */}
            {query.length >= 2 && (
              <div className="mt-2 max-h-80 overflow-y-auto">
                {results.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {results.map((r) => (
                      <Link
                        key={`${r.type}-${r.id}`}
                        href={r.href}
                        onClick={() => { setShowSearch(false); setQuery(''); }}
                        className="flex items-start gap-3 px-3 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors no-underline"
                      >
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0 uppercase"
                          style={{
                            background: r.type === 'article' ? 'var(--sage-100)' : 'var(--teal-100)',
                            color: r.type === 'article' ? 'var(--sage-700)' : 'var(--teal-700)',
                          }}
                        >
                          {r.type === 'article' ? 'Articolo' : 'Prodotto'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {r.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {r.category} · {r.excerpt.substring(0, 80)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : !searching ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
                    Nessun risultato per &quot;{query}&quot;
                  </p>
                ) : null}
              </div>
            )}

            {query.length === 0 && (
              <p className="text-xs text-gray-400 mt-2 text-center">
                Digita almeno 2 caratteri per cercare
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
