'use client';

import { useEffect, useState } from 'react';
import { WorkLayout } from '../../../components/layout/WorkLayout';
import { loadSummaData, SummaStructure } from '../../../services/summaService';

export default function SummaTheologicaPage() {
  const [structure, setStructure] = useState<SummaStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await loadSummaData();
        setStructure(data);
      } catch (err) {
        setError('Error al cargar los datos de la Suma de Teología');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando Suma de Teología...</p>
        </div>
      </div>
    );
  }

  if (error || !structure) {
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
    <WorkLayout structure={structure}>
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

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Estructura de la Obra
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Total de Cuestiones:</span> {structure.metadata.totalQuestions}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Total de Artículos:</span> {structure.metadata.totalArticles}
                </p>
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
              Partes de la Obra
            </h2>
            <div className="space-y-4">
              {structure.structure.parts.map((part) => (
                <div key={part.id} className="border-l-4 border-blue-500 pl-4">
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
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              ¿Cómo navegar?
            </h2>
            <p className="text-blue-800">
              Usa el índice lateral para navegar por las diferentes partes, cuestiones y artículos de la obra. 
              Puedes expandir y contraer las secciones haciendo clic en ellas.
            </p>
          </div>
        </div>
      </div>
    </WorkLayout>
  );
}
