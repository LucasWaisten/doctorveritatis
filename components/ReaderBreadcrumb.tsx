import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '@/types';

interface ReaderBreadcrumbProps {
  items: BreadcrumbItem[];
}

export const ReaderBreadcrumb = ({ items }: ReaderBreadcrumbProps) => {
  return (
    <nav 
      className="flex items-center flex-wrap gap-1 text-sm" 
      aria-label="Navegación de la obra"
    >
      <Link 
        href="/" 
        className="breadcrumb-link p-1 hover:bg-muted rounded-sm"
        aria-label="Ir a inicio"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <span key={item.path} className="flex items-center">
          <ChevronRight className="h-4 w-4 text-border mx-1" aria-hidden="true" />
          {index === items.length - 1 ? (
            <span className="text-foreground font-medium px-1">
              {item.label}
            </span>
          ) : (
            <Link 
              href={item.path} 
              className="breadcrumb-link px-1 hover:bg-muted rounded-sm"
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};
