import Link from 'next/link';
import { Work } from '@/types';
import { getLanguageName } from '@/data/languages';
import { ChevronRight, Book, FileText, ScrollText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WorkCardProps {
  work: Work;
  compact?: boolean;
}

const getWorkIcon = (type: Work['type']) => {
  switch (type) {
    case 'summa':
      return Book;
    case 'contra-gentiles':
      return ScrollText;
    default:
      return FileText;
  }
};

const getStructureLabel = (structure: Work['structure']) => {
  switch (structure) {
    case 'part-question-article':
      return 'Parte → Cuestión → Artículo';
    case 'book-chapter':
      return 'Libro → Capítulo';
    case 'question-article':
      return 'Cuestión → Artículo';
    case 'chapter':
      return 'Capítulos';
    default:
      return '';
  }
};

export const WorkCard = ({ work, compact = false }: WorkCardProps) => {
  const Icon = getWorkIcon(work.type);

  if (compact) {
    return (
      <Link
        href={`/works/${work.slug}`}
        className="group flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors"
      >
        <div className="p-2 rounded-md bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-reading font-medium text-foreground group-hover:text-primary transition-colors truncate">
            {work.title}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {work.titleLatin}
          </p>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </Link>
    );
  }

  return (
    <Link
      href={`/works/${work.slug}`}
      className="group block work-card bg-card border border-border rounded-lg p-6 h-full"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-md bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-reading text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
            {work.title}
          </h3>
          <p className="text-sm text-muted-foreground italic mb-3">
            {work.titleLatin}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {work.description}
          </p>
          
          {/* Structure info */}
          <p className="text-xs text-muted-foreground mb-3">
            <span className="font-medium">Estructura:</span> {getStructureLabel(work.structure)}
          </p>

          {/* Languages */}
          <div className="flex flex-wrap gap-1.5">
            {work.availableLanguages.map((lang) => (
              <Badge key={lang} variant="secondary" className="text-xs font-normal">
                {getLanguageName(lang)}
              </Badge>
            ))}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
      </div>
    </Link>
  );
};
