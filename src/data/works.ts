export interface Work {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  iconBgColor: string;
  linkColor: string;
  linkHoverColor: string;
  content?: string;
  sections?: WorkSection[];
}

export interface WorkSection {
  id: string;
  title: string;
  content: string;
  subsections?: WorkSubsection[];
}

export interface WorkSubsection {
  id: string;
  title: string;
  content: string;
}

export const works: Work[] = [
  {
    id: 'summa-theologica',
    title: 'Summa Theologica',
    description: 'La obra magna de la teología católica, síntesis completa de la doctrina cristiana.',
    category: 'Obras Principales',
    href: '/obras/summa-theologica',
    icon: 'book',
    gradientFrom: 'amber-50',
    gradientTo: 'amber-100',
    iconBgColor: 'bg-amber-500',
    linkColor: 'text-amber-700',
    linkHoverColor: 'text-amber-800',
    content: 'La Summa Theologica es la obra más importante de Santo Tomás de Aquino...',
    sections: [
      {
        id: 'prima-pars',
        title: 'Prima Pars',
        content: 'Trata sobre Dios y la creación...',
        subsections: [
          {
            id: 'de-deo',
            title: 'De Deo',
            content: 'Sobre la existencia y naturaleza de Dios...'
          },
          {
            id: 'de-trinitate',
            title: 'De Trinitate',
            content: 'Sobre la Santísima Trinidad...'
          }
        ]
      },
      {
        id: 'prima-secundae',
        title: 'Prima Secundae',
        content: 'Trata sobre el fin del hombre y los actos humanos...'
      },
      {
        id: 'secunda-secundae',
        title: 'Secunda Secundae',
        content: 'Trata sobre las virtudes teologales y cardinales...'
      },
      {
        id: 'tertia-pars',
        title: 'Tertia Pars',
        content: 'Trata sobre Cristo y los sacramentos...'
      }
    ]
  },
  {
    id: 'summa-contra-gentiles',
    title: 'Summa Contra Gentiles',
    description: 'Tratado apologético para la conversión de infieles y herejes.',
    category: 'Obras Principales',
    href: '/obras/summa-contra-gentiles',
    icon: 'users',
    gradientFrom: 'blue-50',
    gradientTo: 'blue-100',
    iconBgColor: 'bg-blue-500',
    linkColor: 'text-blue-700',
    linkHoverColor: 'text-blue-800',
    content: 'La Summa Contra Gentiles es un tratado apologético...'
  },
  {
    id: 'comentarios-biblicos',
    title: 'Comentarios Bíblicos',
    description: 'Exégesis profunda de las Sagradas Escrituras y los Evangelios.',
    category: 'Obras Principales',
    href: '/obras/comentarios-biblicos',
    icon: 'document',
    gradientFrom: 'green-50',
    gradientTo: 'green-100',
    iconBgColor: 'bg-green-500',
    linkColor: 'text-green-700',
    linkHoverColor: 'text-green-800',
    content: 'Los comentarios bíblicos de Santo Tomás...'
  },
  {
    id: 'aristoteles',
    title: 'Comentarios a Aristóteles',
    description: 'Comentarios a las obras de Aristóteles y síntesis filosófica.',
    category: 'Filosofía',
    href: '/filosofia/aristoteles',
    icon: 'lightbulb',
    gradientFrom: 'purple-50',
    gradientTo: 'purple-100',
    iconBgColor: 'bg-purple-500',
    linkColor: 'text-purple-700',
    linkHoverColor: 'text-purple-800',
    content: 'Los comentarios a Aristóteles representan...'
  },
  {
    id: 'tratados-teologicos',
    title: 'Tratados Teológicos',
    description: 'Obras menores sobre temas específicos de teología y espiritualidad.',
    category: 'Teología',
    href: '/teologia/tratados',
    icon: 'heart',
    gradientFrom: 'red-50',
    gradientTo: 'red-100',
    iconBgColor: 'bg-red-500',
    linkColor: 'text-red-700',
    linkHoverColor: 'text-red-800',
    content: 'Los tratados teológicos incluyen...'
  },
  {
    id: 'biografia',
    title: 'Biografía',
    description: 'Vida, obra y legado del Doctor Angélico en la Iglesia y la cultura.',
    category: 'Biografía',
    href: '/biografia',
    icon: 'user',
    gradientFrom: 'indigo-50',
    gradientTo: 'indigo-100',
    iconBgColor: 'bg-indigo-500',
    linkColor: 'text-indigo-700',
    linkHoverColor: 'text-indigo-800',
    content: 'Santo Tomás de Aquino nació en 1225...'
  }
];

export const getWorkById = (id: string): Work | undefined => {
  return works.find(work => work.id === id);
};

export const getWorksByCategory = (category: string): Work[] => {
  return works.filter(work => work.category === category);
};

export const categories = [
  'Obras Principales',
  'Teología',
  'Filosofía',
  'Biografía'
];
