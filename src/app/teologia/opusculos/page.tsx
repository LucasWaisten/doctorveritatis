import ComingSoonPage from '@/components/pages/ComingSoonPage';

export default function OpusculosPage() {
  return (
    <ComingSoonPage
      title="Opúsculos"
      description="Los opúsculos de Santo Tomás de Aquino, obras menores pero de gran importancia teológica y filosófica, incluyendo tratados específicos y comentarios."
      expectedDate="Junio 2025"
      relatedLinks={[
        { label: "Summa Theologica", href: "/obras/summa-theologica" },
        { label: "Tratados Teológicos", href: "/teologia/tratados" },
        { label: "Cuestiones Disputadas", href: "/teologia/cuestiones" }
      ]}
    />
  );
}
