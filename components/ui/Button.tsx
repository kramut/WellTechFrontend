import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'affiliate';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-[var(--sage-500)] text-white hover:bg-[var(--sage-600)] focus:ring-[var(--sage-500)]',
    secondary: 'border-2 border-[var(--sage-500)] text-[var(--sage-500)] hover:bg-[var(--sage-50)] focus:ring-[var(--sage-500)]',
    tertiary: 'text-[var(--sage-500)] hover:text-[var(--sage-600)] hover:bg-[var(--sage-50)] focus:ring-[var(--sage-500)]',
    affiliate: 'bg-[var(--gold-500)] text-white hover:bg-[var(--gold-600)] focus:ring-[var(--gold-500)] shadow-md hover:shadow-lg',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}





