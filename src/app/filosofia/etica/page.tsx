import ComingSoonPage from '@/components/pages/ComingSoonPage';

export default function EticaPage() {
  return (
    <ComingSoonPage
      title="Ética"
      description="Los tratados éticos de Santo Tomás de Aquino, incluyendo sus comentarios sobre la ética nicomáquea de Aristóteles y sus propias reflexiones sobre la virtud y la felicidad."
      expectedDate="Diciembre 2026"
      relatedLinks={[
        { label: "Comentarios a Aristóteles", href: "/filosofia/aristoteles" },
        { label: "Metafísica", href: "/filosofia/metafisica" },
        { label: "Summa Theologica", href: "/obras/summa-theologica" }
      ]}
    />
  );
}
