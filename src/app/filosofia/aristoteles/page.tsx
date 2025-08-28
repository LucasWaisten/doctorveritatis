import Layout from '@/components/layout/Layout';
import { getWorkById } from '@/data/works';
import Link from 'next/link';

export default function AristotelesPage() {
  const work = getWorkById('aristoteles');

  if (!work) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Obra no encontrada</h1>
        </div>
      </Layout>
    );
  }

  const aristotelianWorks = [
    {
      id: 'metafisica',
      title: 'Comentario a la Metafísica',
      description: 'Exégesis profunda de la obra fundamental de Aristóteles sobre el ser y la realidad.',
      href: '/filosofia/aristoteles/metafisica',
      icon: 'lightbulb',
      color: 'purple'
    },
    {
      id: 'etica-nicomaco',
      title: 'Comentario a la Ética a Nicómaco',
      description: 'Análisis de la ética aristotélica y su aplicación al pensamiento cristiano.',
      href: '/filosofia/aristoteles/etica-nicomaco',
      icon: 'heart',
      color: 'green'
    },
    {
      id: 'fisica',
      title: 'Comentario a la Física',
      description: 'Estudio de los principios naturales y el movimiento según Aristóteles.',
      href: '/filosofia/aristoteles/fisica',
      icon: 'lightbulb',
      color: 'blue'
    },
    {
      id: 'de-anima',
      title: 'Comentario al De Anima',
      description: 'Análisis del alma y las facultades cognoscitivas según Aristóteles.',
      href: '/filosofia/aristoteles/de-anima',
      icon: 'user',
      color: 'indigo'
    },
    {
      id: 'politica',
      title: 'Comentario a la Política',
      description: 'Exégesis de la filosofía política aristotélica y su relación con la teología.',
      href: '/filosofia/aristoteles/politica',
      icon: 'users',
      color: 'red'
    },
    {
      id: 'organon',
      title: 'Comentarios al Órganon',
      description: 'Análisis de la lógica aristotélica y su aplicación al método teológico.',
      href: '/filosofia/aristoteles/organon',
      icon: 'book',
      color: 'amber'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Comentarios a Aristóteles</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              La síntesis magistral entre la filosofía aristotélica y la teología cristiana. 
              Santo Tomás demuestra cómo la razón natural puede preparar el camino para la fe.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">La Síntesis Tomista</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Los comentarios de Santo Tomás a las obras de Aristóteles representan uno de los 
              logros más importantes de la filosofía medieval. En estos comentarios, el Doctor 
              Angélico no solo expone el pensamiento del Estagirita, sino que lo integra 
              armoniosamente con la doctrina cristiana.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Esta síntesis entre fe y razón, entre filosofía griega y teología cristiana, 
              constituye el fundamento del tomismo y ha influenciado profundamente el 
              pensamiento occidental hasta nuestros días.
            </p>
          </div>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Comentarios Principales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aristotelianWorks.map((work) => (
              <div key={work.id} className={`bg-gradient-to-br from-${work.color}-50 to-${work.color}-100 p-8 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer`}>
                <div className={`w-16 h-16 bg-${work.color}-500 rounded-lg flex items-center justify-center mb-6`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{work.title}</h3>
                <p className="text-slate-600 mb-4">
                  {work.description}
                </p>
                <Link 
                  href={work.href}
                  className={`text-${work.color}-700 font-semibold hover:text-${work.color}-800 transition-colors`}
                >
                  Leer comentario →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Principios Fundamentales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-purple-900 mb-3">Armonía Fe-Razón</h3>
              <p className="text-purple-800">
                Santo Tomás demuestra que no hay contradicción entre la fe cristiana y la 
                filosofía aristotélica, sino que ambas se complementan en la búsqueda de la verdad.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-3">Método Escolástico</h3>
              <p className="text-blue-800">
                Aplica el método dialéctico de Aristóteles al estudio de la teología, 
                estableciendo un sistema de argumentación riguroso y sistemático.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-900 mb-3">Teología Natural</h3>
              <p className="text-green-800">
                Utiliza la filosofía aristotélica como fundamento para la teología natural, 
                mostrando que la razón puede llegar a conocer verdades sobre Dios.
              </p>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-amber-900 mb-3">Antropología Integral</h3>
              <p className="text-amber-800">
                Integra la concepción aristotélica del hombre con la visión cristiana, 
                creando una antropología que respeta tanto la naturaleza como la gracia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Context */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Contexto Histórico
          </h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              En el siglo XIII, las obras de Aristóteles llegaron a Occidente a través de 
              traducciones árabes y judías. Santo Tomás fue uno de los primeros en estudiar 
              estas obras de manera sistemática y en integrarlas con la tradición cristiana.
            </p>
            <p className="text-lg leading-relaxed">
              Su trabajo de comentarista no solo expone el pensamiento aristotélico, sino que 
              lo purifica de interpretaciones incompatibles con la fe cristiana, creando así 
              una síntesis que ha perdurado como fundamento del pensamiento católico.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Continuar Explorando
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/filosofia"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Ver Filosofía
            </Link>
            <Link 
              href="/obras/summa-theologica"
              className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Summa Theologica
            </Link>
            <Link 
              href="/obras"
              className="bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
            >
              Ver Todas las Obras
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
