import Link from 'next/link';
import { Card, CardImage, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    slug: string;
    category: string;
    content?: string;
    featuredImageUrl?: string;
    views?: number;
    publishedAt?: string;
  };
  featured?: boolean;
  compact?: boolean;
}

export function ArticleCard({ article, featured = false, compact = false }: ArticleCardProps) {
  const excerpt = article.content?.substring(0, 120) || '';
  const imageUrl = article.featuredImageUrl || '/placeholder-article.jpg';
  
  if (compact) {
    return (
      <Card
        href={`/articoli/${article.slug}`}
        className="h-full"
      >
        <CardImage src={imageUrl} alt={article.title} className="h-32" />
        <CardContent className="p-4">
          <Badge variant="category" className="mb-2 text-xs">{article.category}</Badge>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-base line-clamp-2">
            {article.title}
          </h3>
          {excerpt && (
            <p className="text-gray-600 dark:text-gray-400 text-xs mb-2 line-clamp-2">
              {excerpt}...
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      href={`/articoli/${article.slug}`}
      className={featured ? 'md:col-span-2' : ''}
    >
      <CardImage src={imageUrl} alt={article.title} />
      <CardContent>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="category">{article.category}</Badge>
          {featured && <Badge variant="editors-pick">Editor's Pick</Badge>}
        </div>
        <h3 className={`font-semibold text-gray-900 dark:text-white mb-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
          {article.title}
        </h3>
        {excerpt && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {excerpt}...
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          {article.publishedAt && (
            <span>{new Date(article.publishedAt).toLocaleDateString('it-IT')}</span>
          )}
          {article.views !== undefined && (
            <span>{article.views} views</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

