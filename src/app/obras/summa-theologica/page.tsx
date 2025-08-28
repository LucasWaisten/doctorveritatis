import Layout from '@/components/layout/Layout';
import { getWorkById } from '@/data/works';
import Link from 'next/link';

export default function SummaTheologicaPage() {
  const work = getWorkById('summa-theologica');

  if (!work) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Obra no encontrada</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-amber-900 via-amber-800 to-yellow-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Summa Theologica</h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              La obra magna de la teología católica, síntesis completa de la doctrina cristiana. 
              Una obra monumental que representa el culmen del pensamiento escolástico.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Introducción</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              La Summa Theologica es la obra más importante de Santo Tomás de Aquino, 
              escrita entre 1265 y 1274. Esta obra monumental representa la síntesis 
              más completa de la teología católica, combinando la fe cristiana con la 
              filosofía aristotélica.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              La Summa está estructurada en tres partes principales, cada una dividida 
              en cuestiones y artículos. Esta organización sistemática permite un estudio 
              profundo y ordenado de todos los aspectos de la doctrina cristiana.
            </p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Estructura de la Summa Theologica
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {work.sections?.map((section, index) => (
              <div key={section.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-amber-600 mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {section.title}
                </h3>
                <p className="text-slate-600 mb-4">
                  {section.content}
                </p>
                
                {section.subsections && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-800">Subsecciones:</h4>
                    <ul className="space-y-1">
                      {section.subsections.map((subsection) => (
                        <li key={subsection.id} className="text-sm text-slate-600">
                          • {subsection.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Link 
                  href={`/obras/summa-theologica/${section.id}`}
                  className="inline-block mt-4 text-amber-700 font-semibold hover:text-amber-800 transition-colors"
                >
                  Leer sección →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Themes */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Temas Principales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-amber-900 mb-3">Dios y la Trinidad</h3>
              <p className="text-amber-800">
                Estudio profundo de la naturaleza divina, la existencia de Dios y el misterio de la Santísima Trinidad.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Antropología Teológica</h3>
              <p className="text-blue-800">
                Análisis del ser humano, su naturaleza, sus actos y su fin último en relación con Dios.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-900 mb-3">Virtudes y Moral</h3>
              <p className="text-green-800">
                Exposición sistemática de las virtudes teologales y cardinales, y su aplicación en la vida moral.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-purple-900 mb-3">Cristología y Sacramentos</h3>
              <p className="text-purple-800">
                Estudio de la persona y obra de Cristo, y de los sacramentos como medios de gracia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">
            Continuar Explorando
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/obras"
              className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Ver Todas las Obras
            </Link>
            <Link 
              href="/obras/summa-contra-gentiles"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Summa Contra Gentiles
            </Link>
            <Link 
              href="/filosofia/aristoteles"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Comentarios a Aristóteles
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
