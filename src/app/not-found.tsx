import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Imagen de Santo Tomás */}
          <div className="mb-8">
            <Image
              src="/santotomas.jpg"
              alt="Santo Tomás de Aquino"
              width={200}
              height={250}
              className="mx-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Título principal */}
          <h1 className="text-6xl font-bold text-slate-900 mb-4">
            404
          </h1>
          
          {/* Subtítulo */}
          <h2 className="text-3xl font-semibold text-slate-700 mb-6">
            Página No Encontrada
          </h2>

          {/* Mensaje descriptivo */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-slate-200 mb-8">
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              <em>&ldquo;Veritas est adaequatio rei et intellectus&rdquo;</em>
            </p>
            <p className="text-slate-700 leading-relaxed">
              La verdad es la adecuación entre la cosa y el entendimiento. 
              Sin embargo, la página que buscas no se encuentra en nuestro conocimiento.
            </p>
            <p className="text-slate-600 mt-4">
              Es posible que hayas seguido un enlace incorrecto o que la página haya sido movida.
            </p>
          </div>

          {/* Botones de navegación */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/" variant="primary" size="lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Volver al Inicio
            </Button>
            
            <Button href="/obras" variant="secondary" size="lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Explorar Obras
            </Button>
          </div>

          {/* Enlaces útiles */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">
              Enlaces Útiles
            </h3>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link 
                href="/obras/summa-theologica" 
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Summa Theologica
              </Link>
              <span className="text-slate-400">•</span>
              <Link 
                href="/obras/summa-contra-gentiles" 
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Summa Contra Gentiles
              </Link>
              <span className="text-slate-400">•</span>
              <Link 
                href="/filosofia/aristoteles" 
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Comentarios a Aristóteles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
