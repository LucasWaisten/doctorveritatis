'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { GenericSidebar } from './GenericSidebar';
import Header from './Header';
import { WorkStructureUnion, WorkConfig } from '../../types/work';
import { getWorkConfig } from '../../services/workService';
import { useSidebar } from '../../hooks/useSidebar';

interface GenericWorkLayoutProps {
  children: React.ReactNode;
  structure: WorkStructureUnion;
  workId: string;
}

export const GenericWorkLayout = ({ children, structure, workId }: GenericWorkLayoutProps) => {
  const { isOpen: isSidebarOpen, isMobile, toggle: toggleSidebar } = useSidebar({
    defaultOpen: true,
    mobileDefaultOpen: false,
    breakpoint: 768
  });
  
  const [workConfig, setWorkConfig] = useState<WorkConfig | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Get work configuration
  useEffect(() => {
    const config = getWorkConfig(workId);
    setWorkConfig(config);
  }, [workId]);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (!workConfig) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Layout */}
      <div className="flex pt-32"> {/* pt-32 para dar espacio al header fijo */}
        {/* Sidebar */}
        <GenericSidebar
          structure={structure}
          workConfig={workConfig}
          currentPath={pathname}
          onNavigate={handleNavigate}
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-12 md:ml-0' : 'ml-12 md:ml-0'
        }`}>
          <div className="min-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && isMobile && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleSidebar}
          />
        )}
      </div>
    </div>
  );
};
