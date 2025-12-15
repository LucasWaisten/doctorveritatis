import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { works } from '@/data/works';
import { workCategories, getCategoriesWithWorks } from '@/data/categories';
import { WorkMatch } from '@/hooks/useLibrarySearch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface LibrarySidebarProps {
  workMatches: Map<string, WorkMatch>;
  hasSearched: boolean;
  onWorkClick?: (slug: string) => void;
}

export const LibrarySidebar = ({ workMatches, hasSearched, onWorkClick }: LibrarySidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(workCategories.map(c => c.id))
  );

  const categoriesWithWorks = getCategoriesWithWorks(works);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  // Calculate total matches per category
  const getCategoryMatchCount = (workSlugs: string[]) => {
    return workSlugs.reduce((total, slug) => {
      const match = workMatches.get(slug);
      return total + (match?.matchCount || 0);
    }, 0);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-1">
        <h2 className="font-reading text-lg font-semibold text-foreground mb-4 px-2">
          Índice de obras
        </h2>
        
        {categoriesWithWorks.map((category) => {
          const isExpanded = expandedCategories.has(category.id);
          const categoryMatchCount = getCategoryMatchCount(category.workSlugs);
          const hasMatches = categoryMatchCount > 0;
          const hasWorks = category.works.length > 0;
          
          return (
            <div key={category.id} className="mb-1">
              {/* Category header */}
              <button
                onClick={() => hasWorks && toggleCategory(category.id)}
                disabled={!hasWorks}
                className={cn(
                  "w-full flex items-center justify-between px-2 py-2 rounded-md text-sm font-medium transition-colors",
                  hasWorks 
                    ? "hover:bg-muted cursor-pointer" 
                    : "text-muted-foreground/50 cursor-default",
                  hasSearched && hasMatches && "bg-primary/5 text-primary"
                )}
              >
                <div className="flex items-center gap-2">
                  {hasWorks && (
                    isExpanded 
                      ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      : <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  {!hasWorks && <div className="w-4" />}
                  <span className={cn(
                    hasSearched && !hasMatches && hasWorks && "text-muted-foreground/60"
                  )}>
                    {category.label}
                  </span>
                </div>
                
                {hasSearched && hasMatches && (
                  <Badge 
                    variant="secondary" 
                    className="bg-primary/10 text-primary hover:bg-primary/10 text-xs"
                  >
                    {categoryMatchCount}
                  </Badge>
                )}
              </button>
              
              {/* Works list */}
              {hasWorks && isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {category.works.map((work) => {
                    const match = workMatches.get(work.slug);
                    const workHasMatches = (match?.matchCount || 0) > 0;
                    
                    return (
                      <Link
                        key={work.slug}
                        href={`/works/${work.slug}`}
                        onClick={() => onWorkClick?.(work.slug)}
                        className={cn(
                          "flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors",
                          "hover:bg-muted",
                          hasSearched && workHasMatches && "bg-accent/50 text-accent-foreground font-medium",
                          hasSearched && !workHasMatches && "text-muted-foreground/60"
                        )}
                      >
                        <span className="truncate">{work.title}</span>
                        
                        {hasSearched && workHasMatches && match && (
                          <Badge 
                            variant="outline" 
                            className="ml-2 text-xs border-primary/30 text-primary bg-primary/5"
                          >
                            {match.matchCount}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        
        {/* Empty categories notice */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground px-2">
            Algunas categorías se mostrarán cuando se agregue más contenido.
          </p>
        </div>
      </div>
    </ScrollArea>
  );
};
