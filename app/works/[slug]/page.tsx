'use client';

import { use } from 'react';
import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { WorkIndex } from '@/components/WorkIndex';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getWork, getWorkIndex } from '@/data/works';
import { getLanguageName } from '@/data/languages';
import { ArrowRight, BookOpen, ChevronLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { language, setLanguage } = useLanguage();

  const work = slug ? getWork(slug) : undefined;
  const workIndex = slug ? getWorkIndex(slug) : undefined;

  if (!work || !workIndex) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-reading text-2xl font-semibold mb-4">Obra no encontrada</h1>
          <p className="text-muted-foreground mb-6">
            La obra que buscas no existe o no está disponible.
          </p>
          <Button asChild>
            <Link href="/works">Ver catálogo de obras</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const isLanguageAvailable = work.availableLanguages.includes(language);
  const defaultLanguage = work.availableLanguages[0];

  // Find first readable content
  const findFirstContent = (node: typeof workIndex): string | null => {
    if (node.hasContent) {
      return `/read/${work.slug}/${node.path.join('/')}`;
    }
    if (node.children) {
      for (const child of node.children) {
        const result = findFirstContent(child);
        if (result) return result;
      }
    }
    return null;
  };

  const firstContentPath = findFirstContent(workIndex) || `/read/${work.slug}`;

  return (
    <Layout>
      <div className="container py-12">
        {/* Back link */}
        <Link
          href="/works"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Volver al catálogo
        </Link>

        {/* Header */}
        <header className="mb-10 pb-8 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <h1 className="font-reading text-3xl md:text-4xl font-semibold text-foreground mb-2">
                {work.title}
              </h1>
              <p className="text-lg text-muted-foreground italic mb-4">{work.titleLatin}</p>
              <p className="text-muted-foreground max-w-2xl mb-4">{work.description}</p>
              <div className="flex flex-wrap gap-2">
                {work.availableLanguages.map((lang) => (
                  <Badge key={lang} variant="secondary">
                    {getLanguageName(lang)}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              {/* Language selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Idioma:</span>
                <Select
                  value={isLanguageAvailable ? language : defaultLanguage}
                  onValueChange={(val) => setLanguage(val as typeof language)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {work.availableLanguages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {getLanguageName(lang)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* CTA */}
              <Button asChild size="lg" className="gap-2">
                <Link href={firstContentPath}>
                  <BookOpen className="h-5 w-5" />
                  Leer desde el inicio
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Index */}
        <section>
          <h2 className="font-semibold text-lg mb-4">Índice de la obra</h2>
          <div className="bg-card border border-border rounded-lg p-4 max-h-[600px] overflow-y-auto">
            <WorkIndex workSlug={work.slug} index={workIndex} />
          </div>
        </section>
      </div>
    </Layout>
  );
}

