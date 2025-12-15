'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ReaderToolbar } from '@/components/ReaderToolbar';
import { ReaderContent } from '@/components/ReaderContent';
import { ReaderBreadcrumb } from '@/components/ReaderBreadcrumb';
import { WorkIndex } from '@/components/WorkIndex';
import { useReadingPreferences } from '@/hooks/useReadingPreferences';
import { useLanguage } from '@/hooks/useLanguage';
import { getWork, getWorkIndex, getContent, findNode, getShardIndex, resolveShard } from '@/data/works';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronLeft, Menu, Copy, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function ReaderPage() {
  const params = useParams<{ workSlug: string; path?: string[] }>();
  const workSlug = params.workSlug;
  const rawPath = params.path;
  const path = Array.isArray(rawPath) ? rawPath : rawPath ? [rawPath] : [];
  const { language } = useLanguage();
  const { preferences, updatePreference, resetPreferences } = useReadingPreferences();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [content, setContent] = useState<Awaited<ReturnType<typeof getContent>>>(null);

  const work = workSlug ? getWork(workSlug) : undefined;
  const workIndex = workSlug ? getWorkIndex(workSlug) : undefined;
  const shardIndex = workSlug ? getShardIndex(workSlug) : [];
  const activeShardId = workSlug ? resolveShard(workSlug, path) : null;
  
  // Cargar contenido de forma explícita en el cliente cuando cambia la ruta o el idioma
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!workSlug) {
        setContent(null);
        return;
      }

      const result = await getContent(workSlug, path, language);
      if (!cancelled) {
        setContent(result);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [workSlug, path.join('/'), language]);
  const currentNode = workIndex ? findNode(workIndex, path) : null;

  if (!work || !workIndex) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h1 className="font-reading text-2xl font-semibold mb-4">Obra no encontrada</h1>
          <Button asChild>
            <Link href="/works">Ver catálogo</Link>
          </Button>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: work.title, path: `/works/${work.slug}` },
    ...path.map((segment, i) => ({
      label: segment,
      path: `/read/${work.slug}/${path.slice(0, i + 1).join('/')}`,
    })),
  ];

  const copyReference = () => {
    const ref = `${work.title}, ${path.join(', ')}`;
    navigator.clipboard.writeText(ref);
    toast.success('Referencia copiada');
  };

  const copyLink = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    toast.success('Enlace copiado');
  };

  const themeClass =
    preferences.theme === 'dark' ? 'dark' : preferences.theme === 'sepia' ? 'theme-sepia' : '';

  return (
    <div className={cn('min-h-screen', themeClass)}>
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
        <div className="flex items-center gap-2 p-3">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold">{work.title}</h2>
              </div>
              <div className="overflow-y-auto h-full pb-20">
                <WorkIndex
                  workSlug={work.slug}
                  index={workIndex}
                  currentPath={path}
                  onSelect={() => setSidebarOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex-1 min-w-0">
            <ReaderBreadcrumb items={breadcrumbItems} />
          </div>

          <Button variant="ghost" size="icon" onClick={copyReference} title="Copiar referencia">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={copyLink} title="Copiar enlace">
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Shard index (e.g. I-q1-49, I-q50-119, ...) */}
        {shardIndex.length > 0 && (
          <div className="px-3 pb-3">
            <div className="flex flex-wrap gap-2 text-xs">
              {shardIndex.map(item => (
                <span
                  key={item.id}
                  className={cn(
                    'px-2 py-1 rounded-full border',
                    item.id === activeShardId
                      ? 'bg-primary/10 border-primary text-primary font-medium'
                      : 'bg-background border-muted-foreground/30 text-muted-foreground'
                  )}
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="px-3 pb-3">
          <ReaderToolbar
            preferences={preferences}
            onUpdatePreference={updatePreference}
            onReset={resetPreferences}
          />
        </div>
      </header>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-72 border-r border-border h-[calc(100vh-140px)] sticky top-[140px] overflow-y-auto bg-card">
          <WorkIndex workSlug={work.slug} index={workIndex} currentPath={path} />
        </aside>

        {/* Content */}
        <div className="flex-1">
          {content ? (
            <ReaderContent content={content} preferences={preferences} />
          ) : (
            <div className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-reading text-xl font-semibold mb-2">Contenido no disponible</h2>
              <p className="text-muted-foreground mb-4">
                Esta sección no está disponible en {language === 'la' ? 'latín' : language === 'es' ? 'español' : language}.
              </p>
              <Button asChild variant="outline">
                <Link href={`/works/${work.slug}`}>Ver índice de la obra</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

