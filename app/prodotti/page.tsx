'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockProducts, getProductsByCategory } from '@/lib/mockData';

const categories = ['Wellbeing', 'Nutrition', 'Fitness', 'Mindset', 'Productivity', 'Wealth'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredProducts = selectedCategory
    ? getProductsByCategory(selectedCategory)
    : mockProducts;

  return (
    <div className="min-h-screen bg-[var(--off-white)] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Prodotti Curati
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Selezione di prodotti testati e consigliati per supportare il tuo percorso di benessere e crescita
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-[var(--sage-500)] text-white'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[var(--sage-50)] dark:hover:bg-gray-700'
              }`}
            >
              Tutti
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[var(--sage-500)] text-white'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[var(--sage-50)] dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600 dark:text-gray-400">
          <p>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'prodotto' : 'prodotti'}
            {selectedCategory && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} featured={index < 4} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Nessun prodotto trovato in questa categoria
            </p>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => setSelectedCategory(null)}
            >
              Mostra tutti i prodotti
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}





