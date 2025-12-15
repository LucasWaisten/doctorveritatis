import { useState, useEffect, createContext, useContext } from 'react';
import { Language } from '@/types';

const STORAGE_KEY = 'thomistica-language';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context;
};

export const useLanguageState = () => {
  // Para evitar hydration mismatches, siempre arrancamos con 'es' tanto en
  // servidor como en cliente, y luego sincronizamos con localStorage en un efecto.
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    // Cargar preferencia almacenada después del montaje
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (stored && ['la', 'es', 'en', 'fr', 'de', 'it', 'pt'].includes(stored)) {
        setLanguageState(stored as Language);
      }
    } catch (e) {
      console.error('Failed to load language preference:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (e) {
      console.error('Failed to save language preference:', e);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return { language, setLanguage };
};
