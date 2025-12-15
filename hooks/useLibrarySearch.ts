import { useState, useMemo, useCallback } from 'react';
import { works, sampleContents, workIndexes } from '@/data/works';
import { Work, WorkNode, SearchResult } from '@/types';

export interface WorkMatch {
  work: Work;
  matchCount: number;
  results: SearchResult[];
}

export interface LibrarySearchState {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  workMatches: Map<string, WorkMatch>;
  totalMatches: number;
  hasSearched: boolean;
  search: (searchQuery: string) => void;
  clearSearch: () => void;
}

// Flatten tree to get all nodes with content
const flattenNodes = (node: WorkNode, workSlug: string, workTitle: string): { node: WorkNode; workSlug: string; workTitle: string }[] => {
  const results: { node: WorkNode; workSlug: string; workTitle: string }[] = [];
  
  if (node.hasContent) {
    results.push({ node, workSlug, workTitle });
  }
  
  if (node.children) {
    for (const child of node.children) {
      results.push(...flattenNodes(child, workSlug, workTitle));
    }
  }
  
  return results;
};

// Get all searchable content
const getAllSearchableContent = () => {
  const searchableItems: {
    workSlug: string;
    workTitle: string;
    path: string[];
    reference: string;
    content: string;
    nodeTitle: string;
  }[] = [];

  // Get content from sampleContents
  for (const [key, content] of Object.entries(sampleContents)) {
    const work = works.find(w => w.slug === content.workSlug);
    if (!work) continue;

    const fullContent = content.sections.map(s => s.content).join(' ');
    const reference = generateReference(content.workSlug, content.path);
    
    searchableItems.push({
      workSlug: content.workSlug,
      workTitle: work.title,
      path: content.path,
      reference,
      content: fullContent,
      nodeTitle: content.title,
    });
  }

  // Add nodes from indexes that don't have content in sampleContents
  for (const [workSlug, index] of Object.entries(workIndexes)) {
    const work = works.find(w => w.slug === workSlug);
    if (!work) continue;

    const nodes = flattenNodes(index, workSlug, work.title);
    for (const { node, workTitle } of nodes) {
      const contentKey = `${workSlug}/${node.path.join('/')}/es`;
      if (!sampleContents[contentKey]) {
        searchableItems.push({
          workSlug,
          workTitle,
          path: node.path,
          reference: generateReference(workSlug, node.path),
          content: node.title + ' ' + (node.titleLatin || ''),
          nodeTitle: node.title,
        });
      }
    }
  }

  return searchableItems;
};

// Generate reference string
const generateReference = (workSlug: string, path: string[]): string => {
  const prefixes: Record<string, string> = {
    'summa-theologiae': 'S.Th.',
    'summa-contra-gentiles': 'SCG',
    'quaestiones-disputatae-de-veritate': 'De Ver.',
    'quaestiones-disputatae-de-potentia': 'De Pot.',
    'de-ente-et-essentia': 'De Ente',
  };

  const prefix = prefixes[workSlug] || workSlug;
  return `${prefix} ${path.join(', ')}`;
};

// Extract snippet with highlighted term
const extractSnippet = (content: string, query: string, maxLength: number = 150): string => {
  const lowerContent = content.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerContent.indexOf(lowerQuery);
  
  if (index === -1) {
    return content.slice(0, maxLength) + (content.length > maxLength ? '...' : '');
  }

  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + query.length + 100);
  
  let snippet = '';
  if (start > 0) snippet += '...';
  snippet += content.slice(start, end);
  if (end < content.length) snippet += '...';
  
  return snippet;
};

export const useLibrarySearch = (): LibrarySearchState => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const searchableContent = useMemo(() => getAllSearchableContent(), []);

  const search = useCallback((searchQuery: string) => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    setHasSearched(true);
    
    if (!trimmedQuery) {
      setResults([]);
      return;
    }

    const matchedResults: SearchResult[] = [];
    let idCounter = 0;

    for (const item of searchableContent) {
      // Search in title, content, and reference
      const searchableText = `${item.nodeTitle} ${item.content} ${item.reference}`.toLowerCase();
      
      if (searchableText.includes(trimmedQuery)) {
        matchedResults.push({
          id: `sr-${idCounter++}`,
          workSlug: item.workSlug,
          workTitle: item.workTitle,
          path: item.path,
          reference: item.reference,
          snippet: extractSnippet(item.content || item.nodeTitle, searchQuery),
          language: 'es',
        });
      }
    }

    setResults(matchedResults);
  }, [searchableContent]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
  }, []);

  // Group results by work
  const workMatches = useMemo(() => {
    const matches = new Map<string, WorkMatch>();
    
    for (const result of results) {
      const existing = matches.get(result.workSlug);
      const work = works.find(w => w.slug === result.workSlug);
      
      if (!work) continue;
      
      if (existing) {
        existing.matchCount++;
        existing.results.push(result);
      } else {
        matches.set(result.workSlug, {
          work,
          matchCount: 1,
          results: [result],
        });
      }
    }
    
    return matches;
  }, [results]);

  const totalMatches = results.length;

  return {
    query,
    setQuery,
    results,
    workMatches,
    totalMatches,
    hasSearched,
    search,
    clearSearch,
  };
};
