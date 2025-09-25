import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function Container({
  children,
  size = 'lg',
  padding = 'md',
  className = '',
  as: Component = 'div',
  ...props
}: ContainerProps) {
  const baseClasses = 'mx-auto w-full';
  
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
    xl: 'px-8 sm:px-12 lg:px-16'
  };

  const classes = [
    baseClasses,
    sizeClasses[size],
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
