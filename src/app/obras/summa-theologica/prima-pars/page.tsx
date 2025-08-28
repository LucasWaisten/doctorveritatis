import Layout from '@/components/layout/Layout';
import { getWorkById } from '@/data/works';
import Link from 'next/link';

export default function PrimaParsPage() {
  const work = getWorkById('summa-theologica');
  const section = work?.sections?.find(s => s.id === 'prima-pars');

  if (!section) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Sección no encontrada</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-4 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 text-sm">
            <Link href="/" className="text-slate-600 hover:text-slate-900">Inicio</Link>
            <span className="text-slate-400">/</span>
            <Link href="/obras" className="text-slate-600 hover:text-slate-900">Obras</Link>
            <span className="text-slate-400">/</span>
            <Link href="/obras/summa-theologica" className="text-slate-600 hover:text-slate-900">Summa Theologica</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-medium">Prima Pars</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-amber-900 via-amber-800 to-yellow-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Prima Pars</h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Trata sobre Dios y la creación. Esta primera parte de la Summa Theologica 
              explora la naturaleza divina, la Trinidad, la creación y los ángeles.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Contenido de la Prima Pars</h2>
            
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              La Prima Pars de la Summa Theologica es la primera de las tres partes principales 
              de esta obra monumental. En esta sección, Santo Tomás aborda los temas fundamentales 
              de la teología natural y revelada, estableciendo las bases para el resto de su 
              sistema teológico.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mb-4">Estructura de la Prima Pars</h3>
            
            <div className="bg-amber-50 p-6 rounded-lg mb-8">
              <h4 className="text-xl font-bold text-amber-900 mb-3">Cuestiones Principales:</h4>
              <ol className="list-decimal list-inside space-y-2 text-amber-800">
                <li><strong>De Deo (Cuestiones 1-26):</strong> Sobre la existencia y naturaleza de Dios</li>
                <li><strong>De Trinitate (Cuestiones 27-43):</strong> Sobre la Santísima Trinidad</li>
                <li><strong>De Deo Creatore (Cuestiones 44-49):</strong> Sobre Dios como creador</li>
                <li><strong>De Angelis (Cuestiones 50-64):</strong> Sobre los ángeles</li>
                <li><strong>De Opere Sex Dierum (Cuestiones 65-74):</strong> Sobre la obra de los seis días</li>
                <li><strong>De Homine (Cuestiones 75-102):</strong> Sobre el hombre</li>
                <li><strong>De Gubernatione Rerum (Cuestiones 103-119):</strong> Sobre el gobierno divino</li>
              </ol>
            </div>

            {section.subsections && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Subsecciones Principales</h3>
                
                {section.subsections.map((subsection) => (
                  <div key={subsection.id} className="border-l-4 border-amber-500 pl-6">
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{subsection.title}</h4>
                    <p className="text-slate-700 leading-relaxed">{subsection.content}</p>
                    <Link 
                      href={`/obras/summa-theologica/prima-pars/${subsection.id}`}
                      className="inline-block mt-3 text-amber-700 font-semibold hover:text-amber-800 transition-colors"
                    >
                      Leer más →
                    </Link>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-blue-50 p-6 rounded-lg mt-8">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Importancia Teológica</h3>
              <p className="text-blue-800">
                La Prima Pars establece los fundamentos metafísicos y teológicos que sustentan 
                todo el sistema de Santo Tomás. Aquí se demuestra la armonía entre fe y razón, 
                mostrando cómo la filosofía natural puede preparar el camino para la teología 
                revelada, y cómo ambas se complementan en la búsqueda de la verdad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Navegación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/obras/summa-theologica"
              className="bg-amber-600 text-white p-4 rounded-lg text-center font-semibold hover:bg-amber-700 transition-colors"
            >
              ← Volver a Summa Theologica
            </Link>
            <Link 
              href="/obras/summa-theologica/prima-secundae"
              className="bg-blue-600 text-white p-4 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors"
            >
              Prima Secundae →
            </Link>
            <Link 
              href="/obras"
              className="bg-slate-600 text-white p-4 rounded-lg text-center font-semibold hover:bg-slate-700 transition-colors"
            >
              Ver Todas las Obras
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
