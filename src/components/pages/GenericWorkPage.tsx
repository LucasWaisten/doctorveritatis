'use client';

import { useEffect, useState } from 'react';
import { GenericWorkLayout } from '../layout/GenericWorkLayout';
import { loadWorkData, getWorkConfig } from '../../services/workService';
import { WorkStructureUnion, WorkConfig } from '../../types/work';
import Typography from '../ui/Typography';
import Container from '../ui/Container';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Separator from '../ui/Separator';

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
      <Container size="lg" padding="none">
        <div className="text-center space-y-8 pt-8">
          {/* Header Section */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <Typography 
              variant="h1" 
              className="title-safe"
            >
              {structure.title}
            </Typography>
            <Typography variant="lead" color="secondary">
              {structure.author}
            </Typography>
            <Typography variant="body" color="muted">
              {structure.subtitle}
            </Typography>
          </div>

          {/* Info Card */}
          <Card variant="elevated" className="bg-blue-50 border-blue-200">
            <CardContent>
              <Typography variant="body-sm" color="primary" className="flex items-center gap-2">
                💡 Usa el índice lateral para navegar por las diferentes secciones de la obra. 
                Puedes expandir y contraer las secciones haciendo clic en ellas.
              </Typography>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          {/* Structure Info */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Estructura de la Obra</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {workConfig.hasQuestions && 'totalQuestions' in structure.metadata && (
                    <div className="flex items-center gap-2">
                      <Typography variant="body-sm" className="font-semibold">
                        Total de Cuestiones:
                      </Typography>
                      <Badge variant="primary" size="sm">
                        {structure.metadata.totalQuestions}
                      </Badge>
                    </div>
                  )}
                  {workConfig.hasArticles && 'totalArticles' in structure.metadata && (
                    <div className="flex items-center gap-2">
                      <Typography variant="body-sm" className="font-semibold">
                        Total de Artículos:
                      </Typography>
                      <Badge variant="primary" size="sm">
                        {structure.metadata.totalArticles}
                      </Badge>
                    </div>
                  )}
                  {workConfig.hasChapters && 'totalChapters' in structure.metadata && (
                    <div className="flex items-center gap-2">
                      <Typography variant="body-sm" className="font-semibold">
                        Total de Capítulos:
                      </Typography>
                      <Badge variant="primary" size="sm">
                        {structure.metadata.totalChapters}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Typography variant="body-sm" className="font-semibold">
                      Idiomas disponibles:
                    </Typography>
                    <div className="flex gap-1">
                      {structure.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" size="sm">
                          {lang.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Typography variant="body-sm">
                    <span className="font-semibold">Última actualización:</span> {new Date(structure.metadata.lastUpdated).toLocaleDateString()}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          {/* Parts/Books Section */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>
                {workConfig.hasParts ? 'Partes de la Obra' : 'Libros de la Obra'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Render Parts */}
                {workConfig.hasParts && 'parts' in structure.structure && (
                  structure.structure.parts.map((part) => (
                    <div key={part.id} className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Typography variant="h4" className="mb-2">
                            Parte {part.id}: {part.title}
                          </Typography>
                          <Typography variant="body-sm" color="secondary" className="mb-2">
                            {part.subtitle}
                          </Typography>
                          <Typography variant="body-sm" color="muted" className="mb-2">
                            {part.description}
                          </Typography>
                          <Typography variant="caption" color="muted">
                            {part.questions.length} cuestiones
                          </Typography>
                        </div>
                        <Button
                          href={`/obras/${workId}/${part.id}`}
                          variant="primary"
                          size="sm"
                          className="ml-4"
                        >
                          Ver parte
                        </Button>
                      </div>
                    </div>
                  ))
                )}

                {/* Render Books */}
                {workConfig.hasBooks && 'books' in structure.structure && (
                  structure.structure.books.map((book) => (
                    <div key={book.id} className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Typography variant="h4" className="mb-2">
                            Libro {book.id}: {book.title}
                          </Typography>
                          <Typography variant="body-sm" color="secondary" className="mb-2">
                            {book.subtitle}
                          </Typography>
                          <Typography variant="body-sm" color="muted" className="mb-2">
                            {book.description}
                          </Typography>
                          <Typography variant="caption" color="muted">
                            {book.chapters.length} capítulos
                          </Typography>
                        </div>
                        <Button
                          href={`/obras/${workId}/${book.id}`}
                          variant="primary"
                          size="sm"
                          className="ml-4"
                        >
                          Ver libro
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </GenericWorkLayout>
  );
};
