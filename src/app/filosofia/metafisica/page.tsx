import ComingSoonPage from '@/components/pages/ComingSoonPage';

export default function MetafisicaPage() {
  return (
    <ComingSoonPage
      title="Metafísica"
      description="Los tratados metafísicos de Santo Tomás de Aquino, incluyendo sus comentarios sobre el ser, la sustancia, la causalidad y otros conceptos fundamentales de la metafísica."
      expectedDate="Julio 2025"
      relatedLinks={[
        { label: "Comentarios a Aristóteles", href: "/filosofia/aristoteles" },
        { label: "Ética", href: "/filosofia/etica" },
        { label: "Summa Theologica", href: "/obras/summa-theologica" }
      ]}
    />
  );
}
