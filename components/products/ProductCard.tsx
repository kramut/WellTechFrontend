import Link from 'next/link';
import { Card, CardImage, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    affiliateLink?: string;
  };
  featured?: boolean;
  compact?: boolean;
}

export function ProductCard({ product, featured = false, compact = false }: ProductCardProps) {
  const imageUrl = product.imageUrl || '/placeholder-product.jpg';
  const description = product.description?.substring(0, 80) || '';
  
  if (compact) {
    return (
      <Card href={`/prodotti/${product.id}`} className="h-full">
        <CardImage src={imageUrl} alt={product.name} className="aspect-square h-32" />
        <CardContent className="p-3">
          <Badge variant="category" className="mb-1 text-xs">{product.category}</Badge>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            {product.price && (
              <span className="text-base font-bold text-[var(--sage-600)] dark:text-[var(--sage-400)]">
                €{Number(product.price).toFixed(2)}
              </span>
            )}
            <Button
              variant="affiliate"
              size="sm"
              href={product.affiliateLink}
              onClick={(e) => {
                if (product.affiliateLink) {
                  e.preventDefault();
                  window.open(product.affiliateLink, '_blank');
                }
              }}
              className="text-xs px-2 py-1"
            >
              Vedi
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card href={`/prodotti/${product.id}`}>
      <CardImage src={imageUrl} alt={product.name} className="aspect-square" />
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="category">{product.category}</Badge>
          {featured && <Badge variant="top-rated">Top Rated</Badge>}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
          {product.name}
        </h3>
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between">
          {product.price && (
            <span className="text-xl font-bold text-[var(--sage-600)] dark:text-[var(--sage-400)]">
              €{Number(product.price).toFixed(2)}
            </span>
          )}
          <Button
            variant="affiliate"
            size="sm"
            href={product.affiliateLink}
            onClick={(e) => {
              if (product.affiliateLink) {
                e.preventDefault();
                window.open(product.affiliateLink, '_blank');
              }
            }}
          >
            Vedi offerta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

