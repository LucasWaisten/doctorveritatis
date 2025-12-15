'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { LanguageContext, useLanguageState } from '@/hooks/useLanguage';

interface ProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  const languageState = useLanguageState();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageContext.Provider value={languageState}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </LanguageContext.Provider>
    </QueryClientProvider>
  );
}

