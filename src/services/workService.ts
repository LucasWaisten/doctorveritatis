import { 
  WorkType, 
  WorkConfig, 
  WorkStructureUnion, 
  SummaTheologicaStructure, 
  ContraGentilesStructure,
  Part,
  Question,
  Article,
  Book,
  Chapter,
  QuestionGroup
} from '../types/work';

// Configuración de todas las obras
export const WORK_CONFIGS: Record<string, WorkConfig> = {
  'summa-theologica': {
    type: WorkType.SUMMA_THEOLOGICA,
    id: 'summa-theologica',
    title: 'Suma de Teología',
    author: 'Santo Tomás de Aquino (1225-1274)',
    subtitle: 'Doctor de la Iglesia Católica',
    description: 'La obra magna de la teología católica, síntesis completa de la doctrina cristiana.',
    hasParts: true,
    hasBooks: false,
    hasQuestions: true,
    hasChapters: false,
    hasArticles: true,
    defaultLanguage: 'es',
    availableLanguages: ['es', 'la', 'en']
  },
  'summa-contra-gentiles': {
    type: WorkType.SUMMA_CONTRA_GENTILES,
    id: 'summa-contra-gentiles',
    title: 'Suma Contra Gentiles',
    author: 'Saint Thomas Aquinas',
    subtitle: 'On the Truth of the Catholic Faith',
    description: 'A systematic exposition of Catholic doctrine for non-Christians.',
    hasParts: false,
    hasBooks: true,
    hasQuestions: false,
    hasChapters: true,
    hasArticles: false,
    defaultLanguage: 'en',
    availableLanguages: ['en', 'es', 'la']
  }
};

// Mapeo de workId a nombres de archivo
const FILE_NAME_MAP: Record<string, string> = {
  'summa-theologica': 'sumaDeTeologia',
  'summa-contra-gentiles': 'contraGentiles'
};

// Función genérica para cargar cualquier obra
export async function loadWorkData(workId: string): Promise<WorkStructureUnion | null> {
  try {
    const config = WORK_CONFIGS[workId];
    if (!config) {
      throw new Error(`Work configuration not found for: ${workId}`);
    }

    const fileName = FILE_NAME_MAP[workId];
    if (!fileName) {
      throw new Error(`File mapping not found for: ${workId}`);
    }

    const response = await fetch(`/${fileName}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${workId} data`);
    }

    const data = await response.json();
    return data as WorkStructureUnion;
  } catch (error) {
    console.error(`Error loading ${workId} data:`, error);
    return null;
  }
}

// Función para obtener la configuración de una obra
export function getWorkConfig(workId: string): WorkConfig | null {
  return WORK_CONFIGS[workId] || null;
}

// Funciones específicas para Summa Theologica
export function findPart(
  structure: SummaTheologicaStructure,
  partId: string
): Part | null {
  const part = structure.structure.parts.find(p => p.id === partId);
  if (!part) return null;
  
  // Crear agrupaciones basadas en la descripción
  const groups = createQuestionGroups(part);
  return { ...part, groups };
}

export function findQuestion(
  structure: SummaTheologicaStructure,
  partId: string,
  questionId: number
): Question | null {
  const part = structure.structure.parts.find(p => p.id === partId);
  if (!part) return null;

  const question = part.questions.find(q => q.id === questionId);
  return question || null;
}

export function findArticle(
  structure: SummaTheologicaStructure,
  partId: string,
  questionId: number,
  articleId: number
): Article | null {
  const part = structure.structure.parts.find(p => p.id === partId);
  if (!part) return null;

  const question = part.questions.find(q => q.id === questionId);
  if (!question) return null;

  const article = question.articles.find(a => a.id === articleId);
  return article || null;
}

export function createQuestionGroups(part: Part) {
  const groups: QuestionGroup[] = [];
  
  // Agrupaciones específicas para cada parte
  if (part.id === 'I') {
    groups.push(
      { id: 'teologia', title: 'Teología', startQuestion: 1, endQuestion: 1, questions: [] },
      { id: 'dios-uno', title: 'Dios uno', startQuestion: 2, endQuestion: 26, questions: [] },
      { id: 'dios-trino', title: 'Dios trino', startQuestion: 27, endQuestion: 43, questions: [] },
      { id: 'dios-creador', title: 'Dios creador', startQuestion: 44, endQuestion: 74, questions: [] },
      { id: 'angeles', title: 'Ángeles', startQuestion: 50, endQuestion: 64, questions: [] },
      { id: 'hombre', title: 'Hombre', startQuestion: 75, endQuestion: 102, questions: [] },
      { id: 'cosmos', title: 'Cosmos', startQuestion: 103, endQuestion: 119, questions: [] }
    );
  } else if (part.id === 'I-II') {
    groups.push(
      { id: 'bienaventuranza', title: 'Bienaventuranza, fin del hombre', startQuestion: 1, endQuestion: 5, questions: [] },
      { id: 'actos-humanos', title: 'Actos humanos', startQuestion: 7, endQuestion: 21, questions: [] },
      { id: 'pasiones', title: 'Pasiones', startQuestion: 22, endQuestion: 48, questions: [] },
      { id: 'habitos', title: 'Hábitos', startQuestion: 49, endQuestion: 54, questions: [] },
      { id: 'virtud', title: 'Virtud', startQuestion: 55, endQuestion: 67, questions: [] },
      { id: 'dones', title: 'Dones', startQuestion: 68, endQuestion: 70, questions: [] },
      { id: 'vicio-pecado', title: 'Vicio y pecado', startQuestion: 71, endQuestion: 89, questions: [] },
      { id: 'ley-general', title: 'Ley en general', startQuestion: 90, endQuestion: 97, questions: [] },
      { id: 'ley-antigua', title: 'Ley antigua', startQuestion: 98, endQuestion: 105, questions: [] },
      { id: 'ley-nueva', title: 'Ley nueva', startQuestion: 106, endQuestion: 108, questions: [] },
      { id: 'gracia', title: 'Gracia', startQuestion: 109, endQuestion: 113, questions: [] },
      { id: 'merito', title: 'Mérito', startQuestion: 114, endQuestion: 114, questions: [] }
    );
  } else if (part.id === 'II-II') {
    groups.push(
      { id: 'fe', title: 'Fe', startQuestion: 1, endQuestion: 16, questions: [] },
      { id: 'esperanza', title: 'Esperanza', startQuestion: 17, endQuestion: 22, questions: [] },
      { id: 'caridad', title: 'Caridad', startQuestion: 23, endQuestion: 46, questions: [] },
      { id: 'prudencia', title: 'Prudencia', startQuestion: 47, endQuestion: 56, questions: [] },
      { id: 'justicia', title: 'Justicia', startQuestion: 57, endQuestion: 122, questions: [] },
      { id: 'fortaleza', title: 'Fortaleza', startQuestion: 123, endQuestion: 140, questions: [] },
      { id: 'templanza', title: 'Templanza', startQuestion: 141, endQuestion: 170, questions: [] },
      { id: 'carismas', title: 'Carismas', startQuestion: 171, endQuestion: 178, questions: [] },
      { id: 'estados-vida', title: 'Estados de vida', startQuestion: 179, endQuestion: 189, questions: [] }
    );
  } else if (part.id === 'III') {
    groups.push(
      { id: 'encarnacion', title: 'Encarnación', startQuestion: 1, endQuestion: 6, questions: [] },
      { id: 'cualidades', title: 'Cualidades de Cristo', startQuestion: 7, endQuestion: 26, questions: [] },
      { id: 'vida-cristo', title: 'Vida de Cristo', startQuestion: 27, endQuestion: 59, questions: [] },
      { id: 'sacramentos-general', title: 'Sacramentos en general', startQuestion: 60, endQuestion: 65, questions: [] },
      { id: 'bautismo', title: 'Bautismo', startQuestion: 66, endQuestion: 71, questions: [] },
      { id: 'confirmacion', title: 'Confirmación', startQuestion: 72, endQuestion: 72, questions: [] },
      { id: 'eucaristia', title: 'Eucaristía', startQuestion: 73, endQuestion: 83, questions: [] },
      { id: 'penitencia', title: 'Penitencia', startQuestion: 84, endQuestion: 90, questions: [] }
    );
  }
  
  // Asignar las cuestiones a sus grupos correspondientes
  groups.forEach(group => {
    group.questions = part.questions.filter(q => 
      q.id >= group.startQuestion && q.id <= group.endQuestion
    );
  });
  
  return groups;
}

// Funciones específicas para Summa Contra Gentiles
export function findBook(
  structure: ContraGentilesStructure,
  bookId: string
): Book | null {
  const book = structure.structure.books.find(b => b.id === bookId);
  return book || null;
}

export function findChapter(
  structure: ContraGentilesStructure,
  bookId: string,
  chapterId: number
): Chapter | null {
  const book = structure.structure.books.find(b => b.id === bookId);
  if (!book) return null;

  const chapter = book.chapters.find(c => c.id === chapterId);
  return chapter || null;
}
