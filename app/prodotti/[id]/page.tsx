'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProductById, getArticlesByProductId, mockArticles, mockProducts } from '@/lib/mockData';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ProductCard } from '@/components/products/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = getProductById(parseInt(resolvedParams.id));
  
  if (!product) {
    notFound();
  }

  const relatedArticles = getArticlesByProductId(product.id);
  const relatedProducts = mockArticles
    .filter(article => article.productIds?.includes(product.id))
    .flatMap(article => article.productIds || [])
    .filter(id => id !== product.id)
    .slice(0, 4)
    .map(id => mockArticles.find(a => a.productIds?.includes(id)))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--sage-50)] to-[var(--teal-50)] dark:from-gray-800 dark:to-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl bg-white dark:bg-gray-700">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="category">{product.category}</Badge>
                <Badge variant="top-rated">Top Rated</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              {product.price && (
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[var(--sage-600)] dark:text-[var(--sage-400)]">
                    €{Number(product.price).toFixed(2)}
                  </span>
                </div>
              )}
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {product.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="affiliate"
                  size="lg"
                  href={product.affiliateLink}
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(product.affiliateLink, '_blank');
                  }}
                  className="flex-1"
                >
                  Vai all'Offerta →
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                >
                  Salva per dopo
                </Button>
              </div>
              {product.affiliateProgram && (
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Programma affiliato: {product.affiliateProgram}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Descrizione Completa
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            {product.description}
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Benefici Principali
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>Supporta il benessere generale e la vitalità</li>
            <li>Formula studiata per massimizzare l'efficacia</li>
            <li>Ingredienti di alta qualità e provenienza controllata</li>
            <li>Facile da integrare nella routine quotidiana</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
            Modalità d'Uso
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Segui le indicazioni riportate sulla confezione. In genere si consiglia di assumere 
            il prodotto durante i pasti principali o come indicato dal tuo professionista della salute.
          </p>

          <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              ⚠️ Avvertenze
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Consulta sempre un professionista della salute prima di iniziare l'assunzione di integratori, 
              specialmente se stai assumendo altri farmaci o hai condizioni mediche preesistenti.
            </p>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-[var(--off-white)] dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Articoli che Menzionano Questo Prodotto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Similar Products */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Prodotti Simili
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((similarProduct) => (
                <ProductCard key={similarProduct.id} product={similarProduct} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

