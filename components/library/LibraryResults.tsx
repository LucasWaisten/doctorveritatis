import Link from 'next/link';
import { ArrowRight, BookOpen, Search } from 'lucide-react';
import { WorkMatch } from '@/hooks/useLibrarySearch';
import { works } from '@/data/works';
import { WorkCard } from '@/components/WorkCard';
import { cn } from '@/lib/utils';

interface LibraryResultsProps {
  query: string;
  workMatches: Map<string, WorkMatch>;
  totalMatches: number;
  hasSearched: boolean;
}

// Highlight matching text in snippet
const HighlightedSnippet = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <span>{text}</span>;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-accent text-accent-foreground px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export const LibraryResults = ({ query, workMatches, totalMatches, hasSearched }: LibraryResultsProps) => {
  const featuredWorks = works.filter(w => w.featured).slice(0, 6);

  // Empty state - no search yet
  if (!hasSearched) {
    return (
      <div className="space-y-8">
        {/* Suggestions */}
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-reading text-xl font-semibold text-foreground mb-2">
            Explora la biblioteca
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Usa el buscador para encontrar pasajes específicos, o explora las obras 
            en el índice de la izquierda.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="text-muted-foreground">Prueba buscar:</span>
            <button className="px-2 py-1 rounded bg-muted hover:bg-muted/80 text-foreground transition-colors">
              "cinco vías"
            </button>
            <button className="px-2 py-1 rounded bg-muted hover:bg-muted/80 text-foreground transition-colors">
              "existencia de Dios"
            </button>
            <button className="px-2 py-1 rounded bg-muted hover:bg-muted/80 text-foreground transition-colors">
              "verdad"
            </button>
          </div>
        </div>

        {/* Featured works */}
        <div>
          <h3 className="font-reading text-lg font-semibold text-foreground mb-4">
            Obras destacadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredWorks.map((work) => (
              <WorkCard key={work.id} work={work} compact />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // No results
  if (totalMatches === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-reading text-xl font-semibold text-foreground mb-2">
          No se encontraron coincidencias
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-4">
          No hay resultados para "{query}". Intenta con términos más generales o revisa la ortografía.
        </p>
        <div className="text-sm text-muted-foreground">
          <p className="mb-2">Sugerencias:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Usa menos palabras o términos más comunes</li>
            <li>Prueba con sinónimos o términos relacionados</li>
            <li>Revisa que no haya errores de escritura</li>
          </ul>
        </div>
      </div>
    );
  }

  // Results grouped by work
  const sortedMatches = Array.from(workMatches.values()).sort(
    (a, b) => b.matchCount - a.matchCount
  );

  return (
    <div className="space-y-6">
      {/* Results summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {totalMatches} {totalMatches === 1 ? 'resultado' : 'resultados'} en {workMatches.size} {workMatches.size === 1 ? 'obra' : 'obras'}
        </p>
      </div>

      {/* Results by work */}
      {sortedMatches.map(({ work, matchCount, results }) => (
        <div 
          key={work.slug}
          className="border border-border rounded-lg overflow-hidden bg-card"
        >
          {/* Work header */}
          <div className="flex items-center justify-between p-4 bg-muted/30 border-b border-border">
            <div>
              <Link 
                href={`/works/${work.slug}`}
                className="font-reading font-semibold text-foreground hover:text-primary transition-colors"
              >
                {work.title}
              </Link>
              <p className="text-xs text-muted-foreground mt-0.5">
                {matchCount} {matchCount === 1 ? 'coincidencia' : 'coincidencias'}
              </p>
            </div>
            <Link
              href={`/works/${work.slug}`}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Ver obra
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Results list */}
          <div className="divide-y divide-border">
            {results.slice(0, 5).map((result) => (
              <Link
                key={result.id}
                href={`/read/${result.workSlug}/${result.path.join('/')}`}
                className="block p-4 hover:bg-muted/50 transition-colors"
              >
                <p className="text-sm font-medium text-primary mb-1">
                  {result.reference}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  <HighlightedSnippet text={result.snippet} query={query} />
                </p>
              </Link>
            ))}
            
            {results.length > 5 && (
              <div className="p-3 text-center">
                <Link 
                  href={`/works/${work.slug}`}
                  className="text-sm text-primary hover:underline"
                >
                  Ver {results.length - 5} resultados más en esta obra
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
