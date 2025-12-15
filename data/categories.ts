import { Work } from '@/types';

export interface WorkCategory {
  id: string;
  label: string;
  workSlugs: string[];
}

// Categories for the library sidebar, matching the user's requirements
export const workCategories: WorkCategory[] = [
  {
    id: 'commentary-sentences',
    label: 'Comentario a las Sentencias',
    workSlugs: [], // To be populated with actual works
  },
  {
    id: 'contra-gentiles',
    label: 'Suma contra Gentiles',
    workSlugs: ['summa-contra-gentiles'],
  },
  {
    id: 'summa-theologiae',
    label: 'Suma de Teología',
    workSlugs: ['summa-theologiae'],
  },
  {
    id: 'quaestiones-disputatae',
    label: 'Cuestiones disputadas',
    workSlugs: ['quaestiones-disputatae-de-veritate', 'quaestiones-disputatae-de-potentia'],
  },
  {
    id: 'commentary-ot',
    label: 'Comentario al AT',
    workSlugs: [],
  },
  {
    id: 'commentary-gospels',
    label: 'Comentario a los Evangelios',
    workSlugs: [],
  },
  {
    id: 'commentary-pauline',
    label: 'Comentario a las cartas paulinas',
    workSlugs: [],
  },
  {
    id: 'catena-aurea',
    label: 'Catena Aurea',
    workSlugs: [],
  },
  {
    id: 'commentary-aristotle',
    label: 'Comentario a Aristóteles',
    workSlugs: [],
  },
  {
    id: 'other-commentaries',
    label: 'Otros comentarios',
    workSlugs: [],
  },
  {
    id: 'opuscula',
    label: 'Opúsculos',
    workSlugs: ['de-ente-et-essentia'],
  },
];

// Get categories with their works populated
export const getCategoriesWithWorks = (works: Work[]) => {
  return workCategories.map(category => ({
    ...category,
    works: works.filter(work => category.workSlugs.includes(work.slug)),
  })).filter(category => category.works.length > 0 || category.workSlugs.length === 0);
};
