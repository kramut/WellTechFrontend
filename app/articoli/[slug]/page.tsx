'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getArticleBySlug, getRelatedArticles, mockProducts } from '@/lib/mockData';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 15+ params è una Promise
  const resolvedParams = use(params);
  const article = getArticleBySlug(resolvedParams.slug);
  
  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.id);
  const recommendedProducts = article.productIds
    ? article.productIds.map(id => mockProducts.find(p => p.id === id)).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--sage-50)] to-[var(--teal-50)] dark:from-gray-800 dark:to-gray-900 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="category">{article.category}</Badge>
            <Badge variant="editors-pick">Editor's Pick</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {article.publishedAt && (
              <span>{new Date(article.publishedAt).toLocaleDateString('it-IT', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            )}
            <span>•</span>
            <span>{Math.ceil((article.content?.length || 0) / 200)} min di lettura</span>
            <span>•</span>
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
        {/* Intro */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
            {article.content?.substring(0, 200)}...
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {article.content}
          </p>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
            Perché è Importante
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Questo argomento è fondamentale per il tuo benessere perché tocca aspetti essenziali della vita quotidiana. 
            Implementare queste strategie può portare a miglioramenti significativi nella qualità della vita, 
            nell'energia e nella soddisfazione personale.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
            Come Iniziare
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Iniziare è più semplice di quanto pensi. Basta seguire questi passaggi pratici:
          </p>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
            <li>Identifica le tue esigenze specifiche e i tuoi obiettivi</li>
            <li>Inizia con piccoli cambiamenti sostenibili</li>
            <li>Monitora i progressi e adatta l'approccio se necessario</li>
            <li>Mantieni la costanza e sii paziente con te stesso</li>
          </ol>

          {/* Product Recommendations */}
          {recommendedProducts.length > 0 && (
            <div className="mt-16 p-8 bg-[var(--sage-50)] dark:bg-gray-800 rounded-lg border border-[var(--sage-200)] dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Prodotti Consigliati
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Per supportare questo percorso, consigliamo questi prodotti selezionati:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedProducts.map((product: any) => (
                  <div key={product.id} className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex gap-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          {product.price && (
                            <span className="text-lg font-bold text-[var(--sage-600)] dark:text-[var(--sage-400)]">
                              €{Number(product.price).toFixed(2)}
                            </span>
                          )}
                          <Button
                            variant="affiliate"
                            size="sm"
                            href={product.affiliateLink}
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(product.affiliateLink, '_blank');
                            }}
                          >
                            Vedi offerta
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Condividi:</span>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm">Facebook</Button>
              <Button variant="secondary" size="sm">Twitter</Button>
              <Button variant="secondary" size="sm">LinkedIn</Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-[var(--off-white)] dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Articoli Correlati
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

