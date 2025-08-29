'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { WorkLayout } from '../../../../../components/layout/WorkLayout';
import { loadSummaData, findQuestion, findPart, SummaStructure, Part, Question, Article } from '../../../../../services/summaService';
import Link from 'next/link';

export default function QuestionPage() {
  const params = useParams();
  const partId = params.partId as string;
  const questionId = parseInt(params.questionId as string);
  
  const [structure, setStructure] = useState<SummaStructure | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
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
        
        const foundQuestion = findQuestion(data, partId, questionId);
        if (!foundQuestion) {
          setError('Cuestión no encontrada');
          return;
        }
        setQuestion(foundQuestion);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [partId, questionId]);

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

  if (error || !structure || !question || !part) {
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
              <Link href={`/obras/summa-theologica/${partId}`} className="hover:text-blue-600">
                Parte {part.id}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Cuestión {question.id}</span>
            </nav>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Cuestión {question.id}: {question.title}
            </h1>
            <p className="text-gray-700 leading-relaxed">
              Esta cuestión contiene {question.articles?.length || 0} artículos que abordan diferentes aspectos del tema.
            </p>
          </div>

          {/* Articles */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Artículos ({question.articles?.length || 0})
            </h2>
            
            <div className="grid gap-4">
              {question.articles?.map((article: Article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Artículo {article.id}: {article.title}
                      </h3>
                      
                      {/* Content preview */}
                      {article.content?.es && (
                        <div className="space-y-3">
                          {/* Objections preview */}
                          {article.content.es.objections && article.content.es.objections.length > 0 && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Objeciones:</span> {article.content.es.objections.length} objeciones presentadas
                            </div>
                          )}
                          
                          {/* Sed contra preview */}
                          {article.content.es.sed_contra && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Sed Contra:</span> Presentado
                            </div>
                          )}
                          
                          {/* Corpus preview */}
                          {article.content.es.corpus && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Respuesta:</span> Disponible
                            </div>
                          )}
                          
                          {/* Replies preview */}
                          {article.content.es.replies && article.content.es.replies.length > 0 && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Respuestas a objeciones:</span> {article.content.es.replies.length} respuestas
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <Link
                      href={`/obras/summa-theologica/${partId}/${questionId}/${article.id}`}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      Leer artículo
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <div>
              {question.id > 1 && (
                <Link
                  href={`/obras/summa-theologica/${partId}/${question.id - 1}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  ← Cuestión anterior
                </Link>
              )}
            </div>
            <div>
              {question.id < part.questions.length && (
                <Link
                  href={`/obras/summa-theologica/${partId}/${question.id + 1}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Cuestión siguiente →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </WorkLayout>
  );
}
