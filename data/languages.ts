import { Language, LanguageInfo } from '@/types';

export const languages: LanguageInfo[] = [
  { code: 'la', name: 'Latin', nativeName: 'Latina' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
];

export const getLanguageInfo = (code: Language): LanguageInfo => {
  return languages.find(l => l.code === code) || languages[0];
};

export const getLanguageName = (code: Language): string => {
  return getLanguageInfo(code).nativeName;
};
