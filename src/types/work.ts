// Tipos genéricos para cualquier obra de Santo Tomás

export interface WorkMetadata {
  totalQuestions?: number;
  totalArticles?: number;
  totalChapters?: number;
  lastUpdated: string;
}

export interface WorkStructure {
  title: string;
  author: string;
  subtitle: string;
  languages: string[];
  metadata: WorkMetadata;
}

// Para obras con estructura de partes/cuestiones/artículos (como Summa Theologica)
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

export interface QuestionGroup {
  id: string;
  title: string;
  startQuestion: number;
  endQuestion: number;
  questions: Question[];
}

// Para obras con estructura de libros/capítulos (como Summa Contra Gentiles)
export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: number;
  title: string;
  content: {
    en: string;
    es?: string;
    la?: string;
  };
}

// Tipos específicos para cada obra
export interface SummaTheologicaStructure extends WorkStructure {
  structure: {
    parts: Part[];
  };
  metadata: {
    totalQuestions: number;
    totalArticles: number;
    lastUpdated: string;
  };
}

export interface ContraGentilesStructure extends WorkStructure {
  structure: {
    books: Book[];
  };
  metadata: {
    totalChapters: number;
    lastUpdated: string;
  };
}

// Tipo unión para todas las obras
export type WorkStructureUnion = SummaTheologicaStructure | ContraGentilesStructure;

// Enums para tipos de obra
export enum WorkType {
  SUMMA_THEOLOGICA = 'summa-theologica',
  SUMMA_CONTRA_GENTILES = 'summa-contra-gentiles',
  COMMENTARIES = 'commentaries',
  OTHER = 'other'
}

// Configuración de cada obra
export interface WorkConfig {
  type: WorkType;
  id: string;
  title: string;
  author: string;
  subtitle: string;
  description: string;
  hasParts: boolean;
  hasBooks: boolean;
  hasQuestions: boolean;
  hasChapters: boolean;
  hasArticles: boolean;
  defaultLanguage: string;
  availableLanguages: string[];
}
