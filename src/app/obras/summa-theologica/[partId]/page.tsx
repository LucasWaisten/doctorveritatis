'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { WorkLayout } from '../../../../components/layout/WorkLayout';
import { loadSummaData, findPart, SummaStructure, Part, Question, Article } from '../../../../services/summaService';
import Link from 'next/link';

export default function PartPage() {
  const params = useParams();
  const partId = params.partId as string;
  
  const [structure, setStructure] = useState<SummaStructure | null>(null);
  const [part, setPart] = useState<Part | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadSummaData();
        setStructure(data);
        
        const foundPart = findPart(data, partId);
        if (!foundPart) {
          setError('Parte no encontrada');
          return;
        }
        setPart(foundPart);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [partId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !structure || !part) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Error desconocido'}</p>
          <Link 
            href="/obras/summa-theologica"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <WorkLayout structure={structure}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-6">
            <nav className="text-sm text-gray-500 mb-4">
              <Link href="/obras/summa-theologica" className="hover:text-blue-600">
                Suma de Teología
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Parte {part.id}</span>
            </nav>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Parte {part.id}: {part.title}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {part.subtitle}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {part.description}
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Cuestiones ({part.questions.length})
            </h2>
            
            <div className="grid gap-4">
              {part.questions.map((question: Question) => (
                <div key={question.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Cuestión {question.id}: {question.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {question.articles?.length || 0} artículos
                      </p>
                      
                      {/* Articles preview */}
                      <div className="space-y-2">
                                                 {question.articles?.slice(0, 3).map((article: Article) => (
                          <Link
                            key={article.id}
                            href={`/obras/summa-theologica/${partId}/${question.id}/${article.id}`}
                            className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Artículo {article.id}: {article.title}
                          </Link>
                        ))}
                        {question.articles?.length > 3 && (
                          <p className="text-xs text-gray-500">
                            ... y {question.articles.length - 3} artículos más
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Link
                      href={`/obras/summa-theologica/${partId}/${question.id}`}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Ver cuestión
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WorkLayout>
  );
}
