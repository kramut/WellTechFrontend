'use client';

import { use, useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { mockArticles, mockProducts } from '@/lib/mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  seoMetaTitle?: string | null;
  seoMetaDescription?: string | null;
  featuredImageUrl?: string | null;
  productIds?: number[];
  publishedAt?: string | null;
  createdAt?: string;
  views?: number;
  videos?: { id: number; title: string; videoUrl: string | null }[];
}

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string | number | null;
  affiliateLink: string;
  imageUrl: string | null;
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    async function load() {
      // Try real API first
      try {
        const res = await fetch(`${API_BASE_URL}/api/articles/slug/${resolvedParams.slug}`);
        if (res.ok) {
          const data = await res.json();
          setArticle(data);

          // Load recommended products from API
          if (data.productIds && data.productIds.length > 0) {
            const productPromises = data.productIds.map((id: number) =>
              fetch(`${API_BASE_URL}/api/products/${id}`).then((r) => r.ok ? r.json() : null)
            );
            const loadedProducts = (await Promise.all(productPromises)).filter(Boolean);
            setProducts(loadedProducts);
          }
          setLoading(false);
          return;
        }
      } catch {
        // API failed, fall through to mock
      }

      // Fallback: try mock data
      const mockArticle = mockArticles.find((a) => a.slug === resolvedParams.slug);
      if (mockArticle) {
        setArticle(mockArticle as Article);
        // Load mock products
        if (mockArticle.productIds && mockArticle.productIds.length > 0) {
          const relatedProducts = mockProducts
            .filter((p) => mockArticle.productIds.includes(p.id))
            .map((p) => ({
              ...p,
              description: p.description || null,
              price: p.price,
              imageUrl: p.imageUrl || null,
            }));
          setProducts(relatedProducts);
        }
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

  if (notFoundState || !article) {
    notFound();
  }

  // Render markdown-like content (simple: ## headings, **bold**, - lists)
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      const trimmed = line.trim();

      // Skip word count markers
      if (trimmed.startsWith('(Parole:') || trimmed.startsWith('(Totale parole:')) return null;

      // ## Heading
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }
      // ### Heading
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      // List item
      if (trimmed.startsWith('- ')) {
        return (
          <li key={i} className="text-gray-700 dark:text-gray-300 ml-4 mb-2">
            {renderInline(trimmed.replace('- ', ''))}
          </li>
        );
      }
      // Empty line
      if (trimmed === '') return <br key={i} />;
      // Normal paragraph
      return (
        <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {renderInline(trimmed)}
        </p>
      );
    });
  };

  // Render inline formatting: **bold**, [link](url)
  const renderInline = (text: string) => {
    // Replace **bold** with <strong>
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      // [text](url)
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        return (
          <a
            key={i}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--sage-600)] hover:text-[var(--sage-700)] underline"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--sage-50)] to-[var(--teal-50)] dark:from-gray-800 dark:to-gray-900 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="category">{article.category}</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {article.publishedAt && (
              <span>{new Date(article.publishedAt).toLocaleDateString('it-IT', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            )}
            <span>·</span>
            <span>{Math.ceil((article.content?.length || 0) / 1000)} min di lettura</span>
            <span>·</span>
            <span>{article.views} views</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.featuredImageUrl && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl">
            <img
              src={article.featuredImageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {renderContent(article.content)}
        </div>

        {/* Product Recommendations */}
        {products.length > 0 && (
          <div className="mt-16 p-8 bg-[var(--sage-50)] dark:bg-gray-800 rounded-lg border border-[var(--sage-200)] dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Prodotti Consigliati
            </h3>
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h4>
                  {product.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {product.description}
                    </p>
                  )}
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2.5 rounded-lg text-sm font-semibold no-underline transition-colors"
                    style={{ background: 'var(--sage-500)', color: 'white' }}
                  >
                    Scopri di piu
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/articoli"
            className="text-[var(--sage-600)] hover:text-[var(--sage-700)] font-medium"
          >
            ← Torna agli articoli
          </Link>
        </div>
      </article>
    </div>
  );
}
