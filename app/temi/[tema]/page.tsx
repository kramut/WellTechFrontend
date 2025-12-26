'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { getArticlesByCategory, getProductsByCategory, mockArticles, mockProducts } from '@/lib/mockData';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ProductCard } from '@/components/products/ProductCard';
import { Badge } from '@/components/ui/Badge';

const validThemes = ['wellbeing', 'nutrition', 'fitness', 'mindset', 'productivity', 'wealth'];

const themeNames: Record<string, string> = {
  wellbeing: 'Wellbeing',
  nutrition: 'Nutrition',
  fitness: 'Fitness',
  mindset: 'Mindset',
  productivity: 'Productivity',
  wealth: 'Wealth',
};

const themeDescriptions: Record<string, string> = {
  wellbeing: 'Benessere olistico, lifestyle sano e equilibrio tra corpo e mente',
  nutrition: 'Alimentazione consapevole, superfood e integratori per la salute',
  fitness: 'Performance fisica, allenamento e movimento per il benessere',
  mindset: 'Crescita personale, mentalità positiva e gestione dello stress',
  productivity: 'Efficienza, organizzazione e ottimizzazione del tempo',
  wealth: 'Crescita finanziaria, investimenti e indipendenza economica',
};

export default function ThemePage({ params }: { params: Promise<{ tema: string }> }) {
  const resolvedParams = use(params);
  const theme = resolvedParams.tema.toLowerCase();
  
  if (!validThemes.includes(theme)) {
    notFound();
  }

  const categoryName = themeNames[theme];
  const articles = getArticlesByCategory(categoryName);
  const products = getProductsByCategory(categoryName);

  return (
    <div className="min-h-screen bg-[var(--off-white)] dark:bg-gray-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--sage-500)] to-[var(--teal-500)] py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {categoryName}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {themeDescriptions[theme]}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Articles Section */}
        {articles.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Articoli su {categoryName}
              </h2>
              <Badge variant="category">{articles.length} articoli</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Products Section */}
        {products.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Prodotti per {categoryName}
              </h2>
              <Badge variant="category">{products.length} prodotti</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} featured={index < 2} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {articles.length === 0 && products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Nessun contenuto disponibile per questo tema
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

