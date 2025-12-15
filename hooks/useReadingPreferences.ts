import { useState, useEffect } from 'react';
import { ReadingPreferences } from '@/types';

const STORAGE_KEY = 'thomistica-reading-preferences';

const defaultPreferences: ReadingPreferences = {
  fontSize: 18,
  lineHeight: 1.8,
  columnWidth: 'medium',
  theme: 'light',
  showNumbers: true,
};

export const useReadingPreferences = () => {
  // Usamos los valores por defecto tanto en el servidor como en el primer render del cliente
  const [preferences, setPreferences] = useState<ReadingPreferences>(defaultPreferences);

  // Una vez montado en el cliente, cargamos las preferencias persistidas y
  // actualizamos el estado (esto evita desajustes de hidratación).
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<ReadingPreferences>;
        setPreferences(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error('Failed to load reading preferences:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.error('Failed to save reading preferences:', e);
    }
  }, [preferences]);

  const updatePreference = <K extends keyof ReadingPreferences>(
    key: K,
    value: ReadingPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return {
    preferences,
    updatePreference,
    resetPreferences,
  };
};
