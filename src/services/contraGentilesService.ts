import fs from 'fs';
import path from 'path';

export interface ContraGentilesStructure {
  title: string;
  author: string;
  subtitle: string;
  languages: string[];
  structure: {
    books: Book[];
  };
  metadata: {
    totalChapters: number;
    lastUpdated: string;
  };
}

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

export async function loadContraGentilesData(): Promise<ContraGentilesStructure> {
  try {
    // Try to load directly from file system
    const filePath = path.join(process.cwd(), 'public', 'contraGentiles.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading Contra Gentiles data:', error);
    // Return a minimal structure if the file can't be loaded
    return {
      title: "Summa Contra Gentiles",
      author: "Saint Thomas Aquinas",
      subtitle: "On the Truth of the Catholic Faith",
      languages: ["en"],
      structure: {
        books: []
      },
      metadata: {
        totalChapters: 0,
        lastUpdated: new Date().toISOString()
      }
    };
  }
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

export function findBook(
  structure: ContraGentilesStructure,
  bookId: string
): Book | null {
  const book = structure.structure.books.find(b => b.id === bookId);
  return book || null;
}

export function getAllBooks(structure: ContraGentilesStructure): Book[] {
  return structure.structure.books;
}

export function getBookChapters(structure: ContraGentilesStructure, bookId: string): Chapter[] {
  const book = findBook(structure, bookId);
  return book ? book.chapters : [];
}
