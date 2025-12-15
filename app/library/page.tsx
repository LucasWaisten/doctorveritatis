'use client';

import { Layout } from '@/components/layout/Layout';
import { LibrarySidebar } from '@/components/library/LibrarySidebar';
import { LibraryResults } from '@/components/library/LibraryResults';
import { useLibrarySearch } from '@/hooks/useLibrarySearch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Search, Menu, X } from 'lucide-react';

export default function LibraryPage() {
  const {
    query,
    setQuery,
    workMatches,
    totalMatches,
    hasSearched,
    search,
    clearSearch,
  } = useLibrarySearch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      clearSearch();
    }
  };

  return (
    <Layout>
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 xl:w-80 border-r border-border bg-card/50 flex-shrink-0">
          <div className="sticky top-16 h-[calc(100vh-4rem)]">
            <LibrarySidebar workMatches={workMatches} hasSearched={hasSearched} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="container py-8 max-w-4xl">
            {/* Header with mobile menu */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                {/* Mobile sidebar trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Abrir índice</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <SheetHeader className="sr-only">
                      <SheetTitle>Índice de obras</SheetTitle>
                    </SheetHeader>
                    <LibrarySidebar workMatches={workMatches} hasSearched={hasSearched} />
                  </SheetContent>
                </Sheet>

                <div className="flex-1">
                  <h1 className="font-reading text-2xl md:text-3xl font-semibold text-foreground">
                    Biblioteca
                  </h1>
                </div>
              </div>

              <p className="text-muted-foreground">
                Explora las obras de Santo Tomás de Aquino. Busca por texto, referencia o título.
              </p>
            </header>

            {/* Search bar */}
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Buscar por texto, referencia, título…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="pl-12 pr-12 py-6 text-lg bg-card border-border"
                />
                {query && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Limpiar búsqueda</span>
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Button type="submit" className="gap-2">
                  <Search className="h-4 w-4" />
                  Buscar
                </Button>
                {hasSearched && (
                  <Button type="button" variant="ghost" onClick={clearSearch}>
                    Limpiar
                  </Button>
                )}
              </div>
            </form>

            {/* Results */}
            <LibraryResults
              query={query}
              workMatches={workMatches}
              totalMatches={totalMatches}
              hasSearched={hasSearched}
            />
          </div>
        </main>
      </div>
    </Layout>
  );
}

