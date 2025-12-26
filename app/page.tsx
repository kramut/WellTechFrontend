import Link from 'next/link';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryCard } from '@/components/home/CategoryCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockArticles, mockProducts } from '@/lib/mockData';
import { PathfinderWidget } from '@/components/pathfinder/PathfinderWidget';

const categories = [
  {
    name: 'Wellbeing',
    slug: 'wellbeing',
    description: 'Benessere olistico e lifestyle sano',
    icon: '🌿',
  },
  {
    name: 'Nutrition',
    slug: 'nutrition',
    description: 'Alimentazione consapevole e integratori',
    icon: '🥗',
  },
  {
    name: 'Fitness',
    slug: 'fitness',
    description: 'Performance fisica e movimento',
    icon: '💪',
  },
  {
    name: 'Mindset',
    slug: 'mindset',
    description: 'Crescita personale e mentalità',
    icon: '🧠',
  },
  {
    name: 'Productivity',
    slug: 'productivity',
    description: 'Efficienza e ottimizzazione',
    icon: '⚡',
  },
  {
    name: 'Wealth',
    slug: 'wealth',
    description: 'Crescita finanziaria e indipendenza',
    icon: '💰',
  },
];

export default function Home() {
  // Usa mock data per preview
  const featuredArticles = mockArticles.slice(0, 3);
  const latestArticles = mockArticles.slice(3, 9);
  const featuredProducts = mockProducts.slice(0, 6);
  
  // Stats mock
  const stats = {
    overview: {
      products: { total: mockProducts.length },
      articles: { total: mockArticles.length },
      videos: { total: 0 },
      earnings: { totalRevenue: 0 },
    },
  };

  return (
    <div className="min-h-screen bg-[var(--off-white)] dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--sage-50)] via-white to-[var(--teal-50)] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[var(--sage-600)] via-[var(--teal-600)] to-[var(--sage-600)] bg-clip-text text-transparent">
              WellTech Hub
          </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Il tuo percorso verso benessere, performance e crescita personale.
              <br />
              <span className="text-lg text-gray-600 dark:text-gray-400">
                Contenuti curati, prodotti selezionati, guide pratiche.
              </span>
            </p>
            
            {/* Pathfinder Widget */}
            <PathfinderWidget />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <Button variant="primary" size="lg" href="/articoli">
                Esplora Articoli
              </Button>
              <Button variant="secondary" size="lg" href="/prodotti">
                Scopri Prodotti
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Articoli in Evidenza
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Contenuti selezionati dalla redazione
                </p>
              </div>
              <Link
                href="/articoli"
                className="text-[var(--sage-600)] dark:text-[var(--sage-400)] hover:underline font-medium"
              >
                Vedi tutti →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} featured={index === 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="py-16 bg-[var(--off-white)] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Esplora per Tema
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Naviga tra i nostri temi principali e scopri contenuti e prodotti
              selezionati per il tuo percorso
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Prodotti Curati
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Selezione di prodotti testati e consigliati
                </p>
              </div>
              <Link
                href="/prodotti"
                className="text-[var(--sage-600)] dark:text-[var(--sage-400)] hover:underline font-medium"
              >
                Vedi tutti →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} featured={index < 2} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section className="py-16 bg-[var(--off-white)] dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Articoli Recenti
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Gli ultimi contenuti pubblicati
                </p>
              </div>
              <Link
                href="/articoli"
                className="text-[var(--sage-600)] dark:text-[var(--sage-400)] hover:underline font-medium"
              >
                Vedi tutti →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-[var(--sage-500)] to-[var(--teal-500)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Resta Aggiornato
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Ricevi i migliori contenuti e le ultime novità direttamente nella
            tua inbox
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="La tua email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900"
            />
            <Button variant="affiliate" size="lg" type="submit">
              Iscriviti
            </Button>
          </form>
        </div>
      </section>

    </div>
  );
}
