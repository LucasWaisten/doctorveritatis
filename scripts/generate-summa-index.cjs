// Node script to generate a full Summa Theologiae index (WorkNode tree)
// from the sharded JSON contents in /public/works/summa-theologiae.
//
// Usage (from project root):
//   node scripts/generate-summa-index.cjs
//
// This will write data/summa-index.generated.ts which is then imported
// by data/works.ts.

/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const shardsDir = path.join(rootDir, 'public', 'works', 'summa-theologiae');

// Shard files we know about for the Summa
const shardFiles = [
  'I-q1-49.json',
  'I-q50-119.json',
  'I-II-q1-70.json',
  'I-II-q71-114.json',
  'II-II-q1-91.json',
  'II-II-q92-189.json',
  'III-q1-59.json',
  'III-q60-90.json',
];

/** @typedef {{ id: string; type: string; number: string; title: string; titleLatin?: string; path: string[]; children?: WorkNode[]; hasContent?: boolean }} WorkNode */

/**
 * Load and merge all shard contents into a single { key -> NodeContent } map.
 */
function loadAllContents() {
  /** @type {Record<string, any>} */
  const all = {};

  for (const file of shardFiles) {
    const fullPath = path.join(shardsDir, file);
    if (!fs.existsSync(fullPath)) {
      console.warn('[generate-summa-index] Shard file missing:', fullPath);
      continue;
    }
    const rawText = fs.readFileSync(fullPath, 'utf8');
    const json = JSON.parse(rawText);
    const contents = json && typeof json === 'object' && json.contents ? json.contents : json;
    Object.assign(all, contents);
  }

  return all;
}

/**
 * Build the WorkNode tree from a contents map.
 * @param {Record<string, any>} contents
 * @returns {WorkNode}
 */
function buildIndex(contents) {
  /** @type {WorkNode} */
  const root = {
    id: 'st-root',
    type: 'part',
    number: '',
    title: 'Summa Theologiae',
    path: [],
    children: [],
  };

  const partMeta = {
    'I': { id: 'st-prima-pars', title: 'Primera Parte', titleLatin: 'Prima Pars' },
    'I-II': { id: 'st-prima-secundae', title: 'Primera parte de la Segunda Parte', titleLatin: 'Prima Secundae' },
    'II-II': { id: 'st-secunda-secundae', title: 'Segunda parte de la Segunda Parte', titleLatin: 'Secunda Secundae' },
    'III': { id: 'st-tertia-pars', title: 'Tercera Parte', titleLatin: 'Tertia Pars' },
    suple: { id: 'st-supplementum', title: 'Suplemento', titleLatin: 'Supplementum' },
  };

  /** @type {Record<string, WorkNode>} */
  const partNodes = {};
  /** @type {Record<string, WorkNode>} */
  const questionNodes = {};

  /**
   * Get or create part node.
   * @param {string} section
   * @returns {WorkNode}
   */
  function getPart(section) {
    if (partNodes[section]) return partNodes[section];
    const meta = partMeta[section] || {
      id: `st-part-${section}`,
      title: section,
      titleLatin: section,
    };
    const node = {
      id: meta.id,
      type: 'part',
      number: section,
      title: meta.title,
      titleLatin: meta.titleLatin,
      path: [section],
      children: [],
    };
    partNodes[section] = node;
    root.children.push(node);
    return node;
  }

  /**
   * Get or create question node.
   * @param {string} section
   * @param {string} qSeg e.g. "q1"
   * @returns {WorkNode}
   */
  function getQuestion(section, qSeg) {
    const key = `${section}/${qSeg}`;
    if (questionNodes[key]) return questionNodes[key];

    const qNumber = qSeg.replace(/^q/, '');
    const id = `st-${section.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-q${qNumber}`;

    const node = {
      id,
      type: 'question',
      number: qNumber,
      title: `Cuestión ${qNumber}`,
      path: [section, qSeg],
      children: [],
    };
    questionNodes[key] = node;
    const part = getPart(section);
    part.children.push(node);
    return node;
  }

  // First pass: use question-level entries to set nicer titles
  for (const value of Object.values(contents)) {
    if (!value || typeof value !== 'object') continue;
    const pathArr = value.path;
    if (!Array.isArray(pathArr) || pathArr.length !== 2) continue;
    const [section, qSeg] = pathArr;
    if (!partMeta[section] && section !== 'suple') continue;
    const qNode = getQuestion(section, qSeg);
    if (typeof value.title === 'string' && value.title.trim()) {
      qNode.title = value.title.trim();
    }
  }

  // Second pass: articles
  for (const value of Object.values(contents)) {
    if (!value || typeof value !== 'object') continue;
    const pathArr = value.path;
    if (!Array.isArray(pathArr) || pathArr.length < 3) continue;
    const [section, qSeg, aSeg] = pathArr;
    if (!partMeta[section] && section !== 'suple') continue;
    if (!String(aSeg).startsWith('a')) continue;

    const qNode = getQuestion(section, qSeg);
    const aNumber = String(aSeg).replace(/^a/, '');
    const id = `${qNode.id}-a${aNumber}`;

    /** @type {WorkNode} */
    const aNode = {
      id,
      type: 'article',
      number: aNumber,
      title: typeof value.title === 'string' ? value.title.trim() : `Artículo ${aNumber}`,
      path: [section, qSeg, aSeg],
      hasContent: true,
    };

    qNode.children.push(aNode);
  }

  // Sort parts, questions, and articles numerically
  const partOrder = ['I', 'I-II', 'II-II', 'III', 'suple'];

  root.children.sort((a, b) => partOrder.indexOf(a.number) - partOrder.indexOf(b.number));

  for (const part of root.children) {
    if (!part.children) continue;
    part.children.sort((a, b) => Number(a.number) - Number(b.number));
    for (const q of part.children) {
      if (!q.children) continue;
      q.children.sort((a, b) => Number(a.number) - Number(b.number));
    }
  }

  return root;
}

function main() {
  console.log('[generate-summa-index] Loading shard contents...');
  const contents = loadAllContents();
  console.log('[generate-summa-index] Total entries:', Object.keys(contents).length);

  console.log('[generate-summa-index] Building index...');
  const index = buildIndex(contents);

  const outPath = path.join(rootDir, 'data', 'summa-index.generated.ts');
  const fileContents =
    "import type { WorkNode } from '@/types';\n\n" +
    'export const generatedSummaTheologiaeIndex: WorkNode = ' +
    JSON.stringify(index, null, 2) +
    ';\n';

  fs.writeFileSync(outPath, fileContents, 'utf8');
  console.log('[generate-summa-index] Wrote', outPath);
}

main();


