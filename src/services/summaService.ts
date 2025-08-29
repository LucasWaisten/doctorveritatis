export interface SummaStructure {
  title: string;
  author: string;
  subtitle: string;
  languages: string[];
  structure: {
    parts: Part[];
  };
  metadata: {
    totalQuestions: number;
    totalArticles: number;
    lastUpdated: string;
  };
}

export interface QuestionGroup {
  id: string;
  title: string;
  startQuestion: number;
  endQuestion: number;
  questions: Question[];
}

export interface Part {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  questions: Question[];
  groups?: QuestionGroup[];
}

export interface Question {
  id: number;
  title: string;
  articles: Article[];
}

export interface Article {
  id: number;
  title: string;
  content: {
    es: {
      objections: Objection[];
      sed_contra: string;
      corpus: string;
      replies: Reply[];
    };
    la?: {
      objections: Objection[];
      sed_contra: string;
      corpus: string;
      replies: Reply[];
    };
    en?: {
      objections: Objection[];
      sed_contra: string;
      corpus: string;
      replies: Reply[];
    };
  };
}

export interface Objection {
  id: number;
  text: string;
}

export interface Reply {
  to_objection: number;
  text: string;
}

export async function loadSummaData(): Promise<SummaStructure> {
  try {
    const response = await fetch('/sumaDeTeologia.json');
    if (!response.ok) {
      throw new Error('Failed to load Summa data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading Summa data:', error);
    throw error;
  }
}

export function findArticle(
  structure: SummaStructure,
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

export function findQuestion(
  structure: SummaStructure,
  partId: string,
  questionId: number
): Question | null {
  const part = structure.structure.parts.find(p => p.id === partId);
  if (!part) return null;

  const question = part.questions.find(q => q.id === questionId);
  return question || null;
}

export function findPart(
  structure: SummaStructure,
  partId: string
): Part | null {
  const part = structure.structure.parts.find(p => p.id === partId);
  if (!part) return null;
  
  // Crear agrupaciones basadas en la descripción
  const groups = createQuestionGroups(part);
  return { ...part, groups };
}

export function createQuestionGroups(part: Part): QuestionGroup[] {
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
