import ComingSoonPage from '@/components/pages/ComingSoonPage';

export default function ComentariosBiblicosPage() {
  return (
    <ComingSoonPage
      title="Comentarios Bíblicos"
      description="Los comentarios bíblicos de Santo Tomás de Aquino, incluyendo sus comentarios sobre los Evangelios, las Epístolas de San Pablo y otros libros de la Sagrada Escritura."
      expectedDate="Septiembre 2025"
      relatedLinks={[
        { label: "Summa Theologica", href: "/obras/summa-theologica" },
        { label: "Summa Contra Gentiles", href: "/obras/summa-contra-gentiles" },
        { label: "Obras Principales", href: "/obras" }
      ]}
    />
  );
}
