import ComingSoonPage from '@/components/pages/ComingSoonPage';

export default function TeologiaPage() {
  return (
    <ComingSoonPage
      title="Sección de Teología"
      description="Esta sección incluirá los tratados teológicos, cuestiones disputadas y opúsculos de Santo Tomás de Aquino, organizados de manera sistemática para facilitar el estudio."
      expectedDate="Marzo 2025"
      relatedLinks={[
        { label: "Summa Theologica", href: "/obras/summa-theologica" },
        { label: "Summa Contra Gentiles", href: "/obras/summa-contra-gentiles" },
        { label: "Obras Principales", href: "/obras" }
      ]}
    />
  );
}
