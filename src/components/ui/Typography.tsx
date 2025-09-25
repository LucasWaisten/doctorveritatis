import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-sm' | 'caption' | 'lead';
  color?: 'primary' | 'secondary' | 'muted' | 'white' | 'error' | 'success' | 'warning';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Typography({
  children,
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  className = '',
  as,
  ...props
}: TypographyProps) {
  const baseClasses = 'transition-colors';
  
  const variantClasses = {
    h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight break-words',
    h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight break-words',
    h3: 'text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight break-words',
    h4: 'text-lg sm:text-xl lg:text-2xl font-semibold leading-snug break-words',
    h5: 'text-base sm:text-lg lg:text-xl font-medium leading-snug break-words',
    h6: 'text-sm sm:text-base lg:text-lg font-medium leading-snug break-words',
    body: 'text-base leading-relaxed',
    'body-sm': 'text-sm leading-relaxed',
    caption: 'text-xs leading-normal',
    lead: 'text-lg sm:text-xl lg:text-2xl leading-relaxed break-words'
  };

  const colorClasses = {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    muted: 'text-gray-500',
    white: 'text-white',
    error: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-yellow-600'
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    colorClasses[color],
    weightClasses[weight],
    alignClasses[align],
    className
  ].filter(Boolean).join(' ');

  const Component = as || getDefaultElement(variant);

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

function getDefaultElement(variant: string): keyof React.JSX.IntrinsicElements {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'lead':
      return 'p';
    default:
      return 'p';
  }
}
