// Core types for the Thomas Aquinas reading platform

export interface Work {
  id: string;
  slug: string;
  title: string;
  titleLatin: string;
  description: string;
  type: WorkType;
  availableLanguages: Language[];
  structure: StructureType;
  nodeCount: number;
  featured?: boolean;
}

export type WorkType = 
  | 'summa'
  | 'contra-gentiles'
  | 'quaestiones'
  | 'commentary'
  | 'opusculum';

export type StructureType = 
  | 'part-question-article'
  | 'book-chapter'
  | 'question-article'
  | 'chapter';

export type Language = 'la' | 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
}

export interface WorkNode {
  id: string;
  type: NodeType;
  number: string;
  title: string;
  titleLatin?: string;
  path: string[];
  children?: WorkNode[];
  hasContent?: boolean;
}

export type NodeType = 
  | 'part'
  | 'treatise'
  | 'question'
  | 'article'
  | 'book'
  | 'chapter'
  | 'section'
  | 'prologue';

export interface NodeContent {
  id: string;
  workSlug: string;
  path: string[];
  language: Language;
  title: string;
  number?: string;
  sections: ContentSection[];
  availableLanguages: Language[];
}

export interface ContentSection {
  type: SectionType;
  label?: string;
  content: string;
  number?: number;
}

export type SectionType = 
  | 'title'
  | 'prooemium'
  | 'objectiones'
  | 'sed-contra'
  | 'respondeo'
  | 'ad-primum'
  | 'ad-secundum'
  | 'ad-tertium'
  | 'corpus'
  | 'paragraph';

export interface SearchResult {
  id: string;
  workSlug: string;
  workTitle: string;
  path: string[];
  reference: string;
  snippet: string;
  language: Language;
}

export interface ReadingPreferences {
  fontSize: number;
  lineHeight: number;
  columnWidth: 'narrow' | 'medium' | 'wide';
  theme: 'light' | 'dark' | 'sepia';
  showNumbers: boolean;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}
