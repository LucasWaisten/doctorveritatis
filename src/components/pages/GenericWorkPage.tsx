'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GenericWorkLayout } from '../layout/GenericWorkLayout';
import { loadWorkData, getWorkConfig } from '../../services/workService';
import { WorkStructureUnion, WorkConfig } from '../../types/work';

interface GenericWorkPageProps {
  workId: string;
}

export const GenericWorkPage = ({ workId }: GenericWorkPageProps) => {
  const [structure, setStructure] = useState<WorkStructureUnion | null>(null);
  const [workConfig, setWorkConfig] = useState<WorkConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const config = getWorkConfig(workId);
        if (!config) {
          setError('Configuración de obra no encontrada');
          return;
        }
        setWorkConfig(config);

        const data = await loadWorkData(workId);
        if (!data) {
          setError(`Error al cargar los datos de ${config.title}`);
          return;
        }
        setStructure(data);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [workId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando {workConfig?.title || 'obra'}...</p>
        </div>
      </div>
    );
  }

  if (error || !structure || !workConfig) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Error desconocido'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <GenericWorkLayout structure={structure} workId={workId}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              {structure.title}
            </h1>
            <p className="text-xl text-gray-600">
              {structure.author}
            </p>
            <p className="text-lg text-gray-500">
              {structure.subtitle}
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              💡 Usa el índice lateral para navegar por las diferentes secciones de la obra. 
              Puedes expandir y contraer las secciones haciendo clic en ellas.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Estructura de la Obra
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                {workConfig.hasQuestions && 'totalQuestions' in structure.metadata && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Total de Cuestiones:</span> {structure.metadata.totalQuestions}
                  </p>
                )}
                {workConfig.hasArticles && 'totalArticles' in structure.metadata && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Total de Artículos:</span> {structure.metadata.totalArticles}
                  </p>
                )}
                {workConfig.hasChapters && 'totalChapters' in structure.metadata && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Total de Capítulos:</span> {structure.metadata.totalChapters}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Idiomas disponibles:</span> {structure.languages.join(', ')}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Última actualización:</span> {new Date(structure.metadata.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {workConfig.hasParts ? 'Partes de la Obra' : 'Libros de la Obra'}
            </h2>
            <div className="space-y-4">
              {/* Render Parts */}
              {workConfig.hasParts && 'parts' in structure.structure && (
                structure.structure.parts.map((part) => (
                  <div key={part.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Parte {part.id}: {part.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {part.subtitle}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {part.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {part.questions.length} cuestiones
                        </p>
                      </div>
                      <Link
                        href={`/obras/${workId}/${part.id}`}
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        Ver parte
                      </Link>
                    </div>
                  </div>
                ))
              )}

              {/* Render Books */}
              {workConfig.hasBooks && 'books' in structure.structure && (
                structure.structure.books.map((book) => (
                  <div key={book.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Libro {book.id}: {book.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {book.subtitle}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          {book.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {book.chapters.length} capítulos
                        </p>
                      </div>
                      <Link
                        href={`/obras/${workId}/${book.id}`}
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        Ver libro
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </GenericWorkLayout>
  );
};
