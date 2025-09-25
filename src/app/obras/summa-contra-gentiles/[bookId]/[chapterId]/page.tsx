import ComingSoonPage from '@/components/pages/ComingSoonPage';

export default function ChapterPage() {
  return (
    <ComingSoonPage
      title="Summa Contra Gentiles - Capítulos"
      description="Los capítulos individuales de la Summa Contra Gentiles están siendo preparados para su presentación digital. Cada capítulo será disponible con el texto completo y navegación entre capítulos."
      expectedDate="Diciembre 2026"
      relatedLinks={[
        { label: "Summa Contra Gentiles", href: "/obras/summa-contra-gentiles" },
        { label: "Summa Theologica", href: "/obras/summa-theologica" },
        { label: "Obras Principales", href: "/obras" }
      ]}
    />
  );
}
