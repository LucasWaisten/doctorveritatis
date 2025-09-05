import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';

interface ComingSoonPageProps {
  title?: string;
  description?: string;
  expectedDate?: string;
  relatedLinks?: Array<{
    label: string;
    href: string;
  }>;
}

export default function ComingSoonPage({ 
  title = "Próximamente",
  description = "Esta sección está en desarrollo",
  expectedDate,
  relatedLinks = []
}: ComingSoonPageProps) {
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

          {/* Icono de construcción */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          </div>

          {/* Título principal */}
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            {title}
          </h1>
          
          {/* Subtítulo */}
          <h2 className="text-2xl font-semibold text-slate-700 mb-6">
            En Desarrollo
          </h2>

          {/* Mensaje descriptivo */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-slate-200 mb-8">
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              <em>&ldquo;Omne quod movetur ab alio movetur&rdquo;</em>
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Todo lo que se mueve es movido por otro. Esta sección está siendo desarrollada 
              con el mismo rigor y dedicación que Santo Tomás aplicaba a sus obras.
            </p>
            <p className="text-slate-600">
              {description}
            </p>
            
            {expectedDate && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-medium">
                  <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Disponible aproximadamente: {expectedDate}
                </p>
              </div>
            )}
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
              Explorar Obras Disponibles
            </Button>
          </div>

          {/* Enlaces relacionados */}
          {relatedLinks.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-slate-700 mb-4">
                Contenido Relacionado Disponible
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {relatedLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Progreso de desarrollo */}
          <div className="mt-12 max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200">
              <h4 className="text-lg font-semibold text-slate-700 mb-3">
                Progreso de Desarrollo
              </h4>
              <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '65%'}}></div>
              </div>
              <p className="text-sm text-slate-600">
                Trabajando en la estructura y contenido...
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
