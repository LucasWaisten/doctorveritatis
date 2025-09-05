import ComingSoonPage from '@/components/pages/ComingSoonPage';

export default function ContraGentilesPage() {
  return (
    <ComingSoonPage
      title="Summa Contra Gentiles"
      description="La Summa Contra Gentiles de Santo Tomás de Aquino está siendo preparada para su presentación digital. Esta obra fundamental de apologética cristiana será disponible próximamente con navegación completa por libros y capítulos."
      expectedDate="Diciembre 2024"
      relatedLinks={[
        { label: "Summa Theologica", href: "/obras/summa-theologica" },
        { label: "Comentarios a Aristóteles", href: "/filosofia/aristoteles" },
        { label: "Obras Principales", href: "/obras" }
      ]}
    />
  );
}
