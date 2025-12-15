import { Work, WorkNode, NodeContent, Language, SearchResult } from '@/types';
import workJson from './work.json';
import { generatedSummaTheologiaeIndex } from './summa-index.generated';

export const works: Work[] = [
  {
    id: 'summa-theologiae',
    slug: 'summa-theologiae',
    title: 'Summa Theologiae',
    titleLatin: 'Summa Theologiae',
    description: 'La obra maestra de Santo Tomás, un compendio sistemático de teología cristiana estructurado en tres partes que abordan a Dios, la moral y Cristo.',
    type: 'summa',
    availableLanguages: ['la', 'es', 'en', 'fr'],
    structure: 'part-question-article',
    nodeCount: 3125,
    featured: true,
  },
  {
    id: 'summa-contra-gentiles',
    slug: 'summa-contra-gentiles',
    title: 'Suma contra los gentiles',
    titleLatin: 'Summa contra Gentiles',
    description: 'Una defensa filosófica y teológica de la fe cristiana, dirigida a quienes no aceptan la autoridad de las Escrituras.',
    type: 'contra-gentiles',
    availableLanguages: ['la', 'es', 'en'],
    structure: 'book-chapter',
    nodeCount: 464,
    featured: true,
  },
  {
    id: 'quaestiones-disputatae-de-veritate',
    slug: 'quaestiones-disputatae-de-veritate',
    title: 'Cuestiones disputadas sobre la verdad',
    titleLatin: 'Quaestiones Disputatae de Veritate',
    description: 'Veintitrés cuestiones sobre la naturaleza de la verdad, el conocimiento, las ideas divinas y temas relacionados.',
    type: 'quaestiones',
    availableLanguages: ['la', 'es'],
    structure: 'question-article',
    nodeCount: 253,
    featured: true,
  },
  {
    id: 'quaestiones-disputatae-de-potentia',
    slug: 'quaestiones-disputatae-de-potentia',
    title: 'Cuestiones disputadas sobre el poder de Dios',
    titleLatin: 'Quaestiones Disputatae de Potentia Dei',
    description: 'Diez cuestiones sobre el poder divino, la creación y la Trinidad.',
    type: 'quaestiones',
    availableLanguages: ['la'],
    structure: 'question-article',
    nodeCount: 83,
  },
  {
    id: 'de-ente-et-essentia',
    slug: 'de-ente-et-essentia',
    title: 'El ente y la esencia',
    titleLatin: 'De Ente et Essentia',
    description: 'Tratado fundamental sobre metafísica que distingue entre esencia y existencia.',
    type: 'opusculum',
    availableLanguages: ['la', 'es', 'en', 'fr', 'de'],
    structure: 'chapter',
    nodeCount: 6,
  },
];

// Summa Theologiae structure (generated from JSON shards)
export const summaTheologiaeIndex: WorkNode = generatedSummaTheologiaeIndex;

// Summa contra Gentiles structure
export const contraGentilesIndex: WorkNode = {
  id: 'scg-root',
  type: 'book',
  number: '',
  title: 'Summa contra Gentiles',
  path: [],
  children: [
    {
      id: 'scg-l1',
      type: 'book',
      number: 'I',
      title: 'Libro Primero: Sobre Dios',
      path: ['L1'],
      children: [
        { id: 'scg-l1-c1', type: 'chapter', number: '1', title: 'Cuál es el oficio del sabio', path: ['L1', 'c1'], hasContent: true },
        { id: 'scg-l1-c2', type: 'chapter', number: '2', title: 'Cuál es la intención del autor', path: ['L1', 'c2'], hasContent: true },
        { id: 'scg-l1-c3', type: 'chapter', number: '3', title: 'De qué modo es posible manifestar la verdad divina', path: ['L1', 'c3'], hasContent: true },
        { id: 'scg-l1-c4', type: 'chapter', number: '4', title: 'Que la verdad sobre Dios a la que llega la razón natural conviene proponerla para ser creída', path: ['L1', 'c4'], hasContent: true },
        { id: 'scg-l1-c5', type: 'chapter', number: '5', title: 'Que las cosas que no pueden ser investigadas por la razón conviene proponerlas para ser creídas', path: ['L1', 'c5'], hasContent: true },
      ],
    },
    {
      id: 'scg-l2',
      type: 'book',
      number: 'II',
      title: 'Libro Segundo: Sobre la creación',
      path: ['L2'],
      children: [
        { id: 'scg-l2-c1', type: 'chapter', number: '1', title: 'Conexión de lo que sigue con lo precedente', path: ['L2', 'c1'], hasContent: true },
        { id: 'scg-l2-c2', type: 'chapter', number: '2', title: 'Que la consideración de las criaturas es útil para la instrucción de la fe', path: ['L2', 'c2'], hasContent: true },
      ],
    },
    {
      id: 'scg-l3',
      type: 'book',
      number: 'III',
      title: 'Libro Tercero: Sobre la providencia',
      path: ['L3'],
      children: [
        { id: 'scg-l3-c1', type: 'chapter', number: '1', title: 'Proemio', path: ['L3', 'c1'], hasContent: true },
      ],
    },
    {
      id: 'scg-l4',
      type: 'book',
      number: 'IV',
      title: 'Libro Cuarto: Sobre la salvación',
      path: ['L4'],
      children: [
        { id: 'scg-l4-c1', type: 'chapter', number: '1', title: 'Proemio sobre lo que ha de tratarse', path: ['L4', 'c1'], hasContent: true },
      ],
    },
  ],
};

// De Veritate structure
export const deVeritateIndex: WorkNode = {
  id: 'dv-root',
  type: 'question',
  number: '',
  title: 'Quaestiones Disputatae de Veritate',
  path: [],
  children: [
    {
      id: 'dv-q1',
      type: 'question',
      number: '1',
      title: 'Sobre la verdad',
      titleLatin: 'De Veritate',
      path: ['q1'],
      children: [
        { id: 'dv-q1-a1', type: 'article', number: '1', title: 'Qué es la verdad', path: ['q1', 'a1'], hasContent: true },
        { id: 'dv-q1-a2', type: 'article', number: '2', title: 'Si la verdad se encuentra principalmente en el intelecto o en las cosas', path: ['q1', 'a2'], hasContent: true },
        { id: 'dv-q1-a3', type: 'article', number: '3', title: 'Si la verdad está solo en el intelecto que compone y divide', path: ['q1', 'a3'], hasContent: true },
      ],
    },
    {
      id: 'dv-q2',
      type: 'question',
      number: '2',
      title: 'Sobre el conocimiento de Dios',
      titleLatin: 'De Scientia Dei',
      path: ['q2'],
      children: [
        { id: 'dv-q2-a1', type: 'article', number: '1', title: 'Si hay ciencia en Dios', path: ['q2', 'a1'], hasContent: true },
        { id: 'dv-q2-a2', type: 'article', number: '2', title: 'Si Dios se conoce a sí mismo', path: ['q2', 'a2'], hasContent: true },
      ],
    },
  ],
};

export const workIndexes: Record<string, WorkNode> = {
  'summa-theologiae': summaTheologiaeIndex,
  'summa-contra-gentiles': contraGentilesIndex,
  'quaestiones-disputatae-de-veritate': deVeritateIndex,
};

// Contenidos de ejemplo (work.json) que se usan para el buscador de la biblioteca
export const sampleContents: Record<string, NodeContent> =
  (workJson as { contents?: Record<string, NodeContent> }).contents || {};

// Sharded content manifest
type ShardRule =
  | { kind: 'range'; section: string; unit: 'q' | 'd'; from: number; to: number; shardId: string }
  | { kind: 'book'; book: string; shardId: string };

type WorkContentManifest = Record<string, ShardRule[]>;

// Naming scheme:
// - Summa Theologiae (summa-theologiae): "<SECTION>-q<from>-<to>"
// - Comentario a las Sentencias (commentary-sentences): "<SECTION>-d<from>-<to>"
// - Summa contra Gentiles (summa-contra-gentiles): "L<numero>"
export const contentManifest: WorkContentManifest = {
  'summa-theologiae': [
    { kind: 'range', section: 'I', unit: 'q', from: 1, to: 49, shardId: 'I-q1-49' },
    { kind: 'range', section: 'I', unit: 'q', from: 50, to: 119, shardId: 'I-q50-119' },
    { kind: 'range', section: 'I-II', unit: 'q', from: 1, to: 70, shardId: 'I-II-q1-70' },
    { kind: 'range', section: 'I-II', unit: 'q', from: 71, to: 114, shardId: 'I-II-q71-114' },
    { kind: 'range', section: 'II-II', unit: 'q', from: 1, to: 91, shardId: 'II-II-q1-91' },
    { kind: 'range', section: 'II-II', unit: 'q', from: 92, to: 189, shardId: 'II-II-q92-189' },
    { kind: 'range', section: 'III', unit: 'q', from: 1, to: 59, shardId: 'III-q1-59' },
    { kind: 'range', section: 'III', unit: 'q', from: 60, to: 90, shardId: 'III-q60-90' },
    { kind: 'range', section: 'suple', unit: 'q', from: 1, to: 68, shardId: 'suple-q1-68' },
    { kind: 'range', section: 'suple', unit: 'q', from: 69, to: 99, shardId: 'suple-q69-99' },
  ],
  // Comentario a las Sentencias (slug orientativo; se puede ajustar al slug real)
  'commentary-sentences': [
    { kind: 'range', section: 'I', unit: 'd', from: 1, to: 20, shardId: 'I-d1-20' },
    { kind: 'range', section: 'I', unit: 'd', from: 21, to: 48, shardId: 'I-d21-48' },
    { kind: 'range', section: 'II', unit: 'd', from: 1, to: 20, shardId: 'II-d1-20' },
    { kind: 'range', section: 'II', unit: 'd', from: 21, to: 44, shardId: 'II-d21-44' },
    { kind: 'range', section: 'III', unit: 'd', from: 1, to: 22, shardId: 'III-d1-22' },
    { kind: 'range', section: 'III', unit: 'd', from: 23, to: 40, shardId: 'III-d23-40' },
    { kind: 'range', section: 'IV', unit: 'd', from: 1, to: 13, shardId: 'IV-d1-13' },
    { kind: 'range', section: 'IV', unit: 'd', from: 14, to: 25, shardId: 'IV-d14-25' },
    { kind: 'range', section: 'IV', unit: 'd', from: 26, to: 42, shardId: 'IV-d26-42' },
    { kind: 'range', section: 'IV', unit: 'd', from: 43, to: 50, shardId: 'IV-d43-50' },
  ],
  'summa-contra-gentiles': [
    { kind: 'book', book: 'L1', shardId: 'L1' },
    { kind: 'book', book: 'L2', shardId: 'L2' },
    { kind: 'book', book: 'L3', shardId: 'L3' },
    { kind: 'book', book: 'L4', shardId: 'L4' },
  ],
};

// Shard index helpers (for UI)
export interface ShardIndexItem {
  id: string;
  label: string;
  section: string;
  from?: number;
  to?: number;
}

export const getShardIndex = (workSlug: string): ShardIndexItem[] => {
  const rules = contentManifest[workSlug] ?? [];

  return rules.map(rule => {
    if (rule.kind === 'range') {
      const rangeLabel =
        rule.unit === 'q'
          ? `${rule.section}-q${rule.from}-${rule.to}`
          : `${rule.section}-d${rule.from}-${rule.to}`;

      return {
        id: rule.shardId,
        label: rangeLabel,
        section: rule.section,
        from: rule.from,
        to: rule.to,
      };
    }

    // book-based shards (e.g. Summa contra Gentiles)
    return {
      id: rule.shardId,
      label: rule.book,
      section: rule.book,
    };
  });
};

// Simple in-memory cache for shard contents
const shardCache = new Map<string, Record<string, NodeContent>>();

const SHARD_CACHE_PREFIX = 'work-shard';

// Dynamic JSON import helpers for large static shards (evitamos problemas de fetch/json en dev)
const summaShardImporters: Record<string, () => Promise<any>> = {
  'I-q1-49': () => import('../public/works/summa-theologiae/I-q1-49.json'),
  'I-q50-119': () => import('../public/works/summa-theologiae/I-q50-119.json'),
  'I-II-q1-70': () => import('../public/works/summa-theologiae/I-II-q1-70.json'),
  'I-II-q71-114': () => import('../public/works/summa-theologiae/I-II-q71-114.json'),
  'II-II-q1-91': () => import('../public/works/summa-theologiae/II-II-q1-91.json'),
  'II-II-q92-189': () => import('../public/works/summa-theologiae/II-II-q92-189.json'),
  'III-q1-59': () => import('../public/works/summa-theologiae/III-q1-59.json'),
  'III-q60-90': () => import('../public/works/summa-theologiae/III-q60-90.json'),
};

async function loadShardContents(
  workSlug: string,
  shardId: string
): Promise<Record<string, NodeContent>> {
  const cacheKey = `${SHARD_CACHE_PREFIX}:${workSlug}:${shardId}`;
  const cached = shardCache.get(cacheKey);
  if (cached) {
    // Si el caché está vacío, intentamos recargar (puede venir de una versión anterior del loader)
    if (Object.keys(cached).length > 0) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('[loadShardContents] returning cached contents', {
          cacheKey,
          totalKeys: Object.keys(cached).length,
        });
      }
      return cached;
    }
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[loadShardContents] cached contents empty, refetching', { cacheKey });
    }
  }

  // Para la Summa Theologiae usamos imports dinámicos de JSON en vez de fetch,
  // lo que evita problemas de parsing en dev con archivos muy grandes.
  if (workSlug === 'summa-theologiae') {
    const importer = summaShardImporters[shardId];
    if (importer) {
      try {
        const mod = await importer();
        const raw = (mod && 'default' in mod ? (mod as any).default : mod) as any;
        const contents: Record<string, NodeContent> =
          raw && typeof raw === 'object' && 'contents' in raw ? (raw.contents as Record<string, NodeContent>) : (raw as Record<string, NodeContent>);

        if (process.env.NODE_ENV !== 'production') {
          console.log('[loadShardContents] loaded via import', {
            workSlug,
            shardId,
            totalKeys: Object.keys(contents).length,
            sample: Object.keys(contents).slice(0, 10),
          });
        }

        shardCache.set(cacheKey, contents);
        return contents;
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[loadShardContents] error loading shard via import', {
            workSlug,
            shardId,
            error,
          });
        }
        // Si falla el import, como fallback intentamos el fetch estándar
      }
    }
  }

  try {
    const res = await fetch(`/works/${workSlug}/${shardId}.json`, {
      // El contenido es completamente estático, se puede cachear agresivamente
      cache: 'force-cache',
    });
    if (!res.ok) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[loadShardContents] failed fetch', {
          url: `/works/${workSlug}/${shardId}.json`,
          status: res.status,
          statusText: res.statusText,
        });
      }
      // Si el shard no existe, devolvemos un objeto vacío
      return {};
    }

    const raw = await res.json();
    const contents: Record<string, NodeContent> =
      raw && typeof raw === 'object' && 'contents' in (raw as any) && (raw as any).contents
        ? (raw as any).contents
        : (raw as Record<string, NodeContent>);

    if (process.env.NODE_ENV !== 'production') {
      console.log('[loadShardContents] parsed contents keys', {
        url: `/works/${workSlug}/${shardId}.json`,
        totalKeys: Object.keys(contents).length,
        sample: Object.keys(contents).slice(0, 10),
      });
    }

    shardCache.set(cacheKey, contents);
    return contents;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[loadShardContents] error loading shard', {
        workSlug,
        shardId,
        error,
      });
    }
    // En caso de error de red u otro problema, devolvemos un objeto vacío
    return {};
  }
}

// Resuelve el shardId correspondiente a un path concreto dentro de una obra
export function resolveShard(workSlug: string, path: string[]): string | null {
  const rules = contentManifest[workSlug];
  if (!rules || path.length === 0) return null;

  if (process.env.NODE_ENV !== 'production') {
    console.log('[resolveShard] called', { workSlug, path });
  }

  for (const rule of rules) {
    if (rule.kind === 'range') {
      const section = path[0];
      const unitSegment = path[1];
      if (!unitSegment || section !== rule.section) continue;

      const match = new RegExp(`^${rule.unit}(\\d+)$`).exec(unitSegment);
      if (!match) continue;

      const num = Number(match[1]);
      if (num >= rule.from && num <= rule.to) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('[resolveShard] matched range rule', {
            rule,
            shardId: rule.shardId,
          });
        }
        return rule.shardId;
      }
    } else {
      const bookSegment = path[0];
      if (bookSegment === rule.book) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('[resolveShard] matched book rule', {
            rule,
            shardId: rule.shardId,
          });
        }
        return rule.shardId;
      }
    }
  }

  return null;
}

// Helper function to get content
export async function getContent(
  workSlug: string,
  path: string[],
  language: Language
): Promise<NodeContent | null> {
  const shardId = resolveShard(workSlug, path);
  if (!shardId) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[getContent] no shardId resolved', { workSlug, path, language });
    }
    return null;
  }

  const key = `${workSlug}/${path.join('/')}/${language}`;
  const contents = await loadShardContents(workSlug, shardId);

  if (process.env.NODE_ENV !== 'production') {
    console.log('[getContent] loaded shard', {
      workSlug,
      path,
      language,
      shardId,
      key,
      availableKeysSample: Object.keys(contents).slice(0, 10),
      hasKey: Object.prototype.hasOwnProperty.call(contents, key),
    });
  }

  return contents[key] || null;
}

// Get work by slug
export const getWork = (slug: string): Work | undefined => {
  return works.find(w => w.slug === slug);
};

// Get work index
export const getWorkIndex = (slug: string): WorkNode | undefined => {
  return workIndexes[slug];
};

// Find node in tree
export const findNode = (root: WorkNode, path: string[]): WorkNode | null => {
  if (path.length === 0) return root;
  
  const findInChildren = (node: WorkNode, remainingPath: string[]): WorkNode | null => {
    if (remainingPath.length === 0) return node;
    
    const [current, ...rest] = remainingPath;
    const child = node.children?.find(c => {
      const nodePath = c.path[c.path.length - 1];
      return nodePath === current;
    });
    
    if (child) {
      return rest.length === 0 ? child : findInChildren(child, rest);
    }
    return null;
  };
  
  return findInChildren(root, path);
};

// Mock search results
export const mockSearchResults: SearchResult[] = [
  {
    id: 'sr-1',
    workSlug: 'summa-theologiae',
    workTitle: 'Summa Theologiae',
    path: ['I', 'q2', 'a3'],
    reference: 'S.Th. I, q.2, a.3',
    snippet: 'La existencia de Dios puede ser probada de cinco maneras. La primera y más clara es la que se deduce del movimiento...',
    language: 'es'
  },
  {
    id: 'sr-2',
    workSlug: 'summa-theologiae',
    workTitle: 'Summa Theologiae',
    path: ['I', 'q1', 'a1'],
    reference: 'S.Th. I, q.1, a.1',
    snippet: 'Fue necesario para la salvación del hombre que, además de las ciencias filosóficas, hubiera otra ciencia inspirada por la revelación divina...',
    language: 'es'
  },
  {
    id: 'sr-3',
    workSlug: 'summa-contra-gentiles',
    workTitle: 'Suma contra los gentiles',
    path: ['L1', 'c1'],
    reference: 'SCG I, c.1',
    snippet: 'Pertenece al sabio ordenar. La regla del gobierno y del orden de todo cuanto se ordena a un fin ha de tomarse del mismo fin...',
    language: 'es'
  },
  {
    id: 'sr-4',
    workSlug: 'quaestiones-disputatae-de-veritate',
    workTitle: 'Cuestiones disputadas sobre la verdad',
    path: ['q1', 'a1'],
    reference: 'De Ver. q.1, a.1',
    snippet: 'La verdad se encuentra principalmente en el intelecto. Toda cosa es verdadera en cuanto tiene la forma propia de su naturaleza...',
    language: 'es'
  }
];

export const searchWorks = (query: string): SearchResult[] => {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return mockSearchResults.filter(r => 
    r.snippet.toLowerCase().includes(lowerQuery) ||
    r.reference.toLowerCase().includes(lowerQuery)
  );
};
