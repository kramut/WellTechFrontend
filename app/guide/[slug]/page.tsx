'use client';

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { mockProducts, mockArticles } from '@/lib/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Guide {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: string | null;
  difficulty: string | null;
  category: string;
  imageUrl: string | null;
  productIds: number[];
  articleIds: number[];
  products?: any[];
  articles?: any[];
}

export default function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [guide, setGuide] = useState<Guide | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    async function load() {
      // Try API first
      try {
        const res = await fetch(`${API_BASE_URL}/api/guides/slug/${resolvedParams.slug}`);
        if (res.ok) {
          const data = await res.json();
          setGuide(data);
          if (data.products) setProducts(data.products);
          if (data.articles) setArticles(data.articles);
          setLoading(false);
          return;
        }
      } catch {
        // Fall through to mock
      }

      // Fallback: check if it's a mock guide slug - match by slug pattern
      // Mock guides use productIds and articleIds that reference mock data
      const mockGuideData = getMockGuideBySlug(resolvedParams.slug);
      if (mockGuideData) {
        setGuide(mockGuideData.guide);
        setProducts(mockGuideData.products);
        setArticles(mockGuideData.articles);
      } else {
        setNotFoundState(true);
      }
      setLoading(false);
    }
    load();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="inline-block w-8 h-8 border-3 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: 'var(--sage-300)', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  if (notFoundState || !guide) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[var(--sage-50)] to-[var(--teal-50)] dark:from-gray-800 dark:to-gray-900 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="category">{guide.category}</Badge>
            {guide.difficulty && <Badge variant="default">{guide.difficulty}</Badge>}
            {guide.duration && (
              <span className="text-sm text-gray-500">⏱️ {guide.duration}</span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {guide.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            {guide.description}
          </p>
        </div>
      </section>

      {/* Featured Image */}
      {guide.imageUrl && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl">
            <img src={guide.imageUrl} alt={guide.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Articles Section */}
        {articles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Articoli Correlati
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {articles.map((article: any) => (
                <Link
                  key={article.id}
                  href={`/articoli/${article.slug}`}
                  className="flex gap-4 p-4 bg-[var(--sage-50)] dark:bg-gray-800 rounded-lg border border-[var(--sage-200)] dark:border-gray-700 hover:border-[var(--sage-400)] transition-colors"
                >
                  {article.featuredImageUrl && (
                    <img
                      src={article.featuredImageUrl}
                      alt={article.title}
                      className="w-20 h-20 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{article.title}</h3>
                    <Badge variant="category" className="text-xs">{article.category}</Badge>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Products Section */}
        {products.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Prodotti Consigliati
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
                >
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-32 rounded object-cover mb-3"
                    />
                  )}
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                    {product.name}
                  </h4>
                  {product.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    {product.price != null && (
                      <span className="font-bold text-[var(--sage-600)]">
                        €{typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                      </span>
                    )}
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded text-xs font-semibold text-white transition-colors"
                      style={{ background: 'var(--sage-500)' }}
                    >
                      Scopri →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/guide"
            className="text-[var(--sage-600)] hover:text-[var(--sage-700)] font-medium"
          >
            ← Torna alle guide
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper to get mock guide data by slug
function getMockGuideBySlug(slug: string) {
  const mockGuideSlugMap: Record<string, { productIds: number[]; articleIds: number[]; title: string; description: string; category: string; duration: string; difficulty: string; imageUrl: string }> = {
    'migliora-sonno-7-giorni': { productIds: [4, 5], articleIds: [3], title: 'Migliora il Sonno in 7 Giorni', description: 'Un percorso guidato per ottimizzare la qualità del sonno.', category: 'Wellbeing', duration: '7 giorni', difficulty: 'Facile', imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop' },
    'alimentazione-consapevole-30-giorni': { productIds: [1, 6, 10], articleIds: [4, 6], title: 'Alimentazione Consapevole: 30 Giorni', description: 'Trasforma la tua relazione con il cibo.', category: 'Nutrition', duration: '30 giorni', difficulty: 'Media', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop' },
    'home-fitness-costruisci-corpo': { productIds: [2, 11, 12], articleIds: [7, 8, 9], title: 'Home Fitness: Costruisci il Tuo Corpo', description: 'Programma completo per allenarsi a casa.', category: 'Fitness', duration: '12 settimane', difficulty: 'Media', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop' },
    'mindfulness-quotidiana': { productIds: [3, 17, 18], articleIds: [2, 11], title: 'Mindfulness Quotidiana', description: 'Impara la meditazione mindfulness.', category: 'Mindset', duration: '21 giorni', difficulty: 'Facile', imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop' },
    'sistema-produttivita-personale': { productIds: [19, 20, 21], articleIds: [12, 13, 14], title: 'Sistema di Produttività Personale', description: 'Costruisci il tuo sistema di produttività.', category: 'Productivity', duration: '14 giorni', difficulty: 'Media', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop' },
    'primi-passi-investimenti': { productIds: [23, 24, 25], articleIds: [16, 17, 18], title: 'Primi Passi negli Investimenti', description: 'Guida pratica per iniziare a investire.', category: 'Wealth', duration: '4 settimane', difficulty: 'Media', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop' },
  };

  const data = mockGuideSlugMap[slug];
  if (!data) return null;

  const guide = {
    id: 10000,
    title: data.title,
    slug,
    description: data.description,
    category: data.category,
    duration: data.duration,
    difficulty: data.difficulty,
    imageUrl: data.imageUrl,
    productIds: data.productIds,
    articleIds: data.articleIds,
  };

  const products = mockProducts.filter((p) => data.productIds.includes(p.id));
  const articles = mockArticles
    .filter((a) => data.articleIds.includes(a.id))
    .map((a) => ({ id: a.id, title: a.title, slug: a.slug, category: a.category, featuredImageUrl: a.featuredImageUrl }));

  return { guide, products, articles };
}
