import { NodeContent, ReadingPreferences } from '@/types';
import { cn } from '@/lib/utils';

interface ReaderContentProps {
  content: NodeContent;
  preferences: ReadingPreferences;
}

export const ReaderContent = ({ content, preferences }: ReaderContentProps) => {
  const widthClass = {
    narrow: 'reading-width-narrow',
    medium: 'reading-width-medium',
    wide: 'reading-width-wide',
  }[preferences.columnWidth];

  const themeClasses = {
    // Fondo pergamino claro por defecto
    light: 'bg-[hsl(40_30%_96%)] text-[hsl(30_15%_15%)]',
    // Sepia más cálido para descansar la vista
    sepia: 'bg-[hsl(38_40%_88%)] text-[hsl(30_25%_18%)]',
    // Tema oscuro tipo manuscrito
    dark: 'bg-[hsl(30_15%_10%)] text-[hsl(35_20%_88%)]',
  }[preferences.theme];

  return (
    <div className={cn("min-h-screen py-8 px-4 transition-reading", themeClasses)}>
      <article 
        className={cn("mx-auto reading-content animate-fade-in", widthClass)}
        style={{ 
          fontSize: `${preferences.fontSize}px`,
          lineHeight: preferences.lineHeight,
        }}
      >
        {/* Article header */}
        <header className="mb-8 pb-6 border-b border-border">
          {preferences.showNumbers && content.number && (
            <p className="text-sm text-muted-foreground font-ui mb-2">
              {content.number}
            </p>
          )}
          <h1 className="text-2xl md:text-3xl font-semibold leading-tight">
            {content.title}
          </h1>
        </header>

        {/* Sections */}
        <div className="space-y-8">
          {content.sections.map((section, index) => {
            if (section.type === 'title') return null;

            return (
              <section key={index} className="space-y-3">
                {section.label && (
                  <h2 className="section-label">
                    {section.label}
                    {preferences.showNumbers && section.number && (
                      <span className="ml-2">({section.number})</span>
                    )}
                  </h2>
                )}
                <div className="whitespace-pre-wrap">
                  {section.content}
                </div>
              </section>
            );
          })}
        </div>
      </article>
    </div>
  );
};
