import ComingSoonPage from '@/components/pages/ComingSoonPage';

export default function FilosofiaPage() {
  return (
    <ComingSoonPage
      title="Sección de Filosofía"
      description="Esta sección incluirá los comentarios filosóficos de Santo Tomás de Aquino, especialmente sus comentarios a Aristóteles, tratados de metafísica y ética."
      expectedDate="Diciembre 2026"
      relatedLinks={[
        { label: "Comentarios a Aristóteles", href: "/filosofia/aristoteles" },
        { label: "Metafísica", href: "/filosofia/metafisica" },
        { label: "Ética", href: "/filosofia/etica" }
      ]}
    />
  );
}
