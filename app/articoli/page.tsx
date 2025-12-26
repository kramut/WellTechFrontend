import Link from 'next/link';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Badge } from '@/components/ui/Badge';
import { mockArticles, getArticlesByCategory } from '@/lib/mockData';

export default function ArticlesPage() {
  const allArticles = mockArticles;
  const categories = ['Wellbeing', 'Nutrition', 'Fitness', 'Mindset', 'Productivity', 'Wealth'];
  
  return (
    <div className="min-h-screen bg-[var(--off-white)] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tutti gli Articoli
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Esplora i nostri contenuti curati su benessere, performance e crescita personale
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <Link
            href="/articoli"
            className="px-4 py-2 rounded-lg bg-[var(--sage-500)] text-white font-medium hover:bg-[var(--sage-600)] transition-colors"
          >
            Tutti
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/articoli?categoria=${category.toLowerCase()}`}
              className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[var(--sage-50)] dark:hover:bg-gray-700 transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p>{allArticles.length} articoli pubblicati</p>
        </div>
      </div>
    </div>
  );
}





