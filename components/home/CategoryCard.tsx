import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';

interface CategoryCardProps {
  category: {
    name: string;
    slug: string;
    description: string;
    icon?: string;
  };
}

const categoryColors: Record<string, string> = {
  wellbeing: 'from-[var(--sage-500)] to-[var(--sage-400)]',
  nutrition: 'from-[var(--teal-500)] to-[var(--teal-400)]',
  fitness: 'from-[var(--orange-500)] to-[var(--orange-400)]',
  mindset: 'from-[var(--sage-600)] to-[var(--teal-500)]',
  productivity: 'from-[var(--teal-500)] to-[var(--sage-500)]',
  wealth: 'from-[var(--gold-500)] to-[var(--orange-500)]',
};

export function CategoryCard({ category }: CategoryCardProps) {
  const gradient = categoryColors[category.slug.toLowerCase()] || 'from-gray-500 to-gray-400';
  
  return (
    <Card href={`/temi/${category.slug}`} className="text-center">
      <CardContent className="p-8">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-bold`}>
          {category.icon || category.name.charAt(0)}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {category.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {category.description}
        </p>
      </CardContent>
    </Card>
  );
}





