'use client';

import Link from 'next/link';
import { useState } from 'react';

const themes = [
  { name: 'Wellbeing', href: '/temi/wellbeing' },
  { name: 'Nutrition', href: '/temi/nutrition' },
  { name: 'Fitness', href: '/temi/fitness' },
  { name: 'Mindset', href: '/temi/mindset' },
  { name: 'Productivity', href: '/temi/productivity' },
  { name: 'Wealth', href: '/temi/wealth' },
];

export function Navbar() {
  const [showThemes, setShowThemes] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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
              onClick={() => setShowSearch(!showSearch)}
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

      {/* Search Bar (when active) */}
      {showSearch && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <input
            type="search"
            placeholder="Cerca articoli, prodotti..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--sage-500)] dark:bg-gray-800 dark:text-white"
            autoFocus
          />
        </div>
      )}
    </header>
  );
}

