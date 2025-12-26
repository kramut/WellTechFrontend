import Link from 'next/link';
import { PathStep as PathStepType } from '@/lib/pathfinder';
import { mockArticles, mockProducts } from '@/lib/mockData';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ProductCard } from '@/components/products/ProductCard';

interface PathStepProps {
  step: PathStepType;
  stepNumber: number;
  totalSteps: number;
}

export function PathStep({ step, stepNumber, totalSteps }: PathStepProps) {
  const articles = step.articles
    .map((id) => mockArticles.find((a) => a.id === id))
    .filter((article): article is NonNullable<typeof article> => article !== undefined);

  const products = step.products
    .map((id) => mockProducts.find((p) => p.id === id))
    .filter((product): product is NonNullable<typeof product> => product !== undefined);

  return (
    <div className="relative">
      {/* Connector Line */}
      {stepNumber < totalSteps && (
        <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-[var(--sage-300)] to-transparent dark:from-[var(--sage-600)]" />
      )}

      <div className="flex gap-6 pb-12">
        {/* Step Number Circle */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--sage-500)] to-[var(--teal-500)] flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {stepNumber}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 pt-2">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{step.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {step.description}
              </p>
            </div>
          </div>

          {/* Articles */}
          {articles.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                Articoli Consigliati
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    compact
                  />
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          {products.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                Prodotti Consigliati
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    compact
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

