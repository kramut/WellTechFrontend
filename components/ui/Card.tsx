import { ReactNode } from 'react';
import Link from 'next/link';

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
  hover?: boolean;
}

export function Card({ children, href, className = '', hover = true }: CardProps) {
  const baseStyles = 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden';
  const hoverStyles = hover ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1' : '';
  const classes = `${baseStyles} ${hoverStyles} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <div className={classes}>
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CardImage({ src, alt, className = '' }: CardImageProps) {
  return (
    <div className={`relative w-full aspect-video overflow-hidden bg-gray-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}





