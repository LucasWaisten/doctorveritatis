import ComingSoonPage from '@/components/pages/ComingSoonPage';

export default function CuestionesPage() {
  return (
    <ComingSoonPage
      title="Cuestiones Disputadas"
      description="Las Cuestiones Disputadas de Santo Tomás de Aquino, donde se abordan temas teológicos y filosóficos de manera dialéctica y sistemática."
      expectedDate="Diciembre 2026"
      relatedLinks={[
        { label: "Summa Theologica", href: "/obras/summa-theologica" },
        { label: "Tratados Teológicos", href: "/teologia/tratados" },
        { label: "Opúsculos", href: "/teologia/opusculos" }
      ]}
    />
  );
}
