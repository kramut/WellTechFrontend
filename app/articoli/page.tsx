import Link from 'next/link';
import { ArticleCard } from '@/components/articles/ArticleCard';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  seoMetaDescription: string | null;
  featuredImageUrl: string | null;
  publishedAt: string | null;
  views: number;
}

async function getPublishedArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/articles`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    if (!res.ok) return [];
    const articles: Article[] = await res.json();
    // Filter only published articles
    return articles.filter((a) => a.publishedAt);
  } catch {
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();
  const categories = [...new Set(articles.map((a) => a.category))];

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
        {categories.length > 1 && (
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
        )}

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-gray-500">Nessun articolo pubblicato ancora.</p>
            <p className="text-sm text-gray-400 mt-2">Torna presto per nuovi contenuti!</p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p>{articles.length} articoli pubblicati</p>
        </div>
      </div>
    </div>
  );
}
