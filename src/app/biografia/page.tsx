import ComingSoonPage from '@/components/pages/ComingSoonPage';

export default function BiografiaPage() {
  return (
    <ComingSoonPage
      title="Biografía de Santo Tomás"
      description="Estamos preparando una biografía completa del Doctor Angélico, incluyendo su vida, formación, obras principales y legado teológico y filosófico."
      expectedDate="Diciembre 2026"
      relatedLinks={[
        { label: "Summa Theologica", href: "/obras/summa-theologica" },
        { label: "Summa Contra Gentiles", href: "/obras/summa-contra-gentiles" },
        { label: "Comentarios a Aristóteles", href: "/filosofia/aristoteles" }
      ]}
    />
  );
}
