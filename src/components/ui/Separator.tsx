import React from 'react';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  decorative?: boolean;
}

export default function Separator({
  orientation = 'horizontal',
  className = '',
  decorative = true
}: SeparatorProps) {
  const baseClasses = 'bg-gray-200';
  
  const orientationClasses = {
    horizontal: 'h-px w-full',
    vertical: 'w-px h-full'
  };

  const classes = [
    baseClasses,
    orientationClasses[orientation],
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={orientation}
      className={classes}
    />
  );
}
