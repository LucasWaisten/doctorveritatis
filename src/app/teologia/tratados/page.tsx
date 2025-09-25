import ComingSoonPage from '@/components/pages/ComingSoonPage';

export default function TratadosPage() {
  return (
    <ComingSoonPage
      title="Tratados Teológicos"
      description="Colección de tratados teológicos específicos de Santo Tomás de Aquino, incluyendo sus comentarios sobre temas doctrinales fundamentales."
      expectedDate="Diciembre 2026"
      relatedLinks={[
        { label: "Summa Theologica", href: "/obras/summa-theologica" },
        { label: "Cuestiones Disputadas", href: "/teologia/cuestiones" },
        { label: "Opúsculos", href: "/teologia/opusculos" }
      ]}
    />
  );
}
