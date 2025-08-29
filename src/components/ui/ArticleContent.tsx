import { Article, Objection, Reply } from '../../services/summaService';

interface ArticleContentProps {
  article: Article;
  language?: 'es' | 'la' | 'en';
}

export const ArticleContent = ({ article, language = 'es' }: ArticleContentProps) => {
  const content = article.content[language];

  if (!content) {
    return (
      <div className="p-6 text-center text-gray-500">
        Contenido no disponible en {language}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Article Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Artículo {article.id}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          {article.title}
        </p>
      </div>

      {/* Objections */}
      {content.objections && content.objections.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Objeciones</h2>
          <div className="space-y-4">
            {content.objections.map((objection: Objection) => (
              <div key={objection.id} className="bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-600 font-semibold text-sm">
                      {objection.id}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 leading-relaxed">
                      {objection.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sed Contra */}
      {content.sed_contra && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Sed Contra</h2>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                  SC
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 leading-relaxed" 
                   dangerouslySetInnerHTML={{ __html: content.sed_contra }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Corpus */}
      {content.corpus && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Respuesta</h2>
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600 font-semibold text-sm">
                  R
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700 leading-relaxed" 
                   dangerouslySetInnerHTML={{ __html: content.corpus }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Replies */}
      {content.replies && content.replies.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Respuestas a las objeciones</h2>
          <div className="space-y-4">
            {content.replies.map((reply: Reply) => (
              <div key={reply.to_objection} className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 text-yellow-600 font-semibold text-sm">
                      {reply.to_objection}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 leading-relaxed" 
                       dangerouslySetInnerHTML={{ __html: reply.text }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
