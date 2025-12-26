import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'editors-pick' | 'top-rated' | 'new' | 'category';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    'editors-pick': 'bg-[var(--gold-100)] text-[var(--gold-700)] dark:bg-[var(--gold-900)] dark:text-[var(--gold-200)]',
    'top-rated': 'bg-[var(--sage-100)] text-[var(--sage-700)] dark:bg-[var(--sage-900)] dark:text-[var(--sage-200)]',
    new: 'bg-[var(--teal-100)] text-[var(--teal-700)] dark:bg-[var(--teal-900)] dark:text-[var(--teal-200)]',
    category: 'border border-[var(--sage-300)] text-[var(--sage-600)] dark:border-[var(--sage-600)] dark:text-[var(--sage-300)]',
  };
  
  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}





