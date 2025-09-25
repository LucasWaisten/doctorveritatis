import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  hover?: boolean;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  hover = false,
  as: Component = 'div',
  ...props
}: CardProps) {
  const baseClasses = 'rounded-lg transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-transparent border-2 border-gray-200',
    elevated: 'bg-white shadow-lg',
    flat: 'bg-gray-50'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const hoverClasses = hover ? 'hover:shadow-md hover:scale-[1.02] cursor-pointer' : '';

  const classes = [
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    hoverClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

// Subcomponentes para estructura
export function CardHeader({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) {
  return (
    <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) {
  return (
    <p className={`text-sm text-gray-600 mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) {
  return (
    <div className={`${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: unknown }) {
  return (
    <div className={`border-t border-gray-200 pt-4 mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
