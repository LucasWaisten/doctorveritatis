import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="text-lg font-semibold mb-4">Doctor Veritatis</h5>
            <p className="text-slate-300 text-sm">
              Portal digital dedicado a preservar y difundir el legado teológico y filosófico de Santo Tomás de Aquino.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Enlaces</h5>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/obras" className="hover:text-white transition-colors">Obras Completas</Link></li>
              <li><Link href="/bibliografia" className="hover:text-white transition-colors">Bibliografía</Link></li>
              <li><Link href="/recursos" className="hover:text-white transition-colors">Recursos</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Cita del Doctor</h5>
            <blockquote className="text-slate-300 text-sm italic">
              "La fe y la razón son como las dos alas con las cuales el espíritu humano se eleva hacia la contemplación de la verdad."
            </blockquote>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; 2024 Doctor Veritatis. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
