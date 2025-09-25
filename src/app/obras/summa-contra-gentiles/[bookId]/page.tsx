import ComingSoonPage from '@/components/pages/ComingSoonPage';

export default function BookPage() {
  return (
    <ComingSoonPage
      title="Summa Contra Gentiles - Libros"
      description="Los libros individuales de la Summa Contra Gentiles están siendo preparados para su presentación digital. Cada libro será disponible con navegación completa por capítulos."
      expectedDate="Diciembre 2026"
      relatedLinks={[
        { label: "Summa Contra Gentiles", href: "/obras/summa-contra-gentiles" },
        { label: "Summa Theologica", href: "/obras/summa-theologica" },
        { label: "Obras Principales", href: "/obras" }
      ]}
    />
  );
}
