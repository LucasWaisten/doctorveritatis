'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { WorkLayout } from '../../../../../../components/layout/WorkLayout';
import { loadSummaData, findArticle, findQuestion, findPart, SummaStructure, Part, Question, Article } from '../../../../../../services/summaService';
import { ArticleContent } from '../../../../../../components/ui/ArticleContent';
import Link from 'next/link';

export default function ArticlePage() {
  const params = useParams();
  const partId = params.partId as string;
  const questionId = parseInt(params.questionId as string);
  const articleId = parseInt(params.articleId as string);
  
  const [structure, setStructure] = useState<SummaStructure | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
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
        
        const foundArticle = findArticle(data, partId, questionId, articleId);
        if (!foundArticle) {
          setError('Artículo no encontrado');
          return;
        }
        setArticle(foundArticle);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [partId, questionId, articleId]);

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

  if (error || !structure || !article || !question || !part) {
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

  // Find current article index for navigation
  const currentArticleIndex = question.articles.findIndex((a: Article) => a.id === articleId);
  const prevArticle = currentArticleIndex > 0 ? question.articles[currentArticleIndex - 1] : null;
  const nextArticle = currentArticleIndex < question.articles.length - 1 ? question.articles[currentArticleIndex + 1] : null;

  return (
    <WorkLayout structure={structure}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/obras/summa-theologica" className="hover:text-blue-600">
              Suma de Teología
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/obras/summa-theologica/${partId}`} className="hover:text-blue-600">
              Parte {part.id}
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/obras/summa-theologica/${partId}/${questionId}`} className="hover:text-blue-600">
              Cuestión {question.id}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Artículo {article.id}</span>
          </nav>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Artículo {article.id}
              </h1>
              <p className="text-lg text-gray-700">
                {article.title}
              </p>
            </div>
            
            {/* Language selector could go here */}
            <div className="text-sm text-gray-500">
              Idioma: Español
            </div>
          </div>
        </div>

        {/* Article Content */}
        <ArticleContent article={article} language="es" />

        {/* Navigation */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              {prevArticle ? (
                <Link
                  href={`/obras/summa-theologica/${partId}/${questionId}/${prevArticle.id}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <span className="mr-2">←</span>
                  <div>
                    <div className="text-sm text-gray-500">Artículo anterior</div>
                    <div className="font-medium">Artículo {prevArticle.id}</div>
                  </div>
                </Link>
              ) : (
                <div className="text-gray-400">
                  <div className="text-sm">Primer artículo</div>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <Link
                href={`/obras/summa-theologica/${partId}/${questionId}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Ver todos los artículos
              </Link>
            </div>
            
            <div className="text-right">
              {nextArticle ? (
                <Link
                  href={`/obras/summa-theologica/${partId}/${questionId}/${nextArticle.id}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 hover:underline"
                >
                  <div>
                    <div className="text-sm text-gray-500">Artículo siguiente</div>
                    <div className="font-medium">Artículo {nextArticle.id}</div>
                  </div>
                  <span className="ml-2">→</span>
                </Link>
              ) : (
                <div className="text-gray-400">
                  <div className="text-sm">Último artículo</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </WorkLayout>
  );
}
