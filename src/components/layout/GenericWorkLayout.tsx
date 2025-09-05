'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { GenericSidebar } from './GenericSidebar';
import Header from './Header';
import { WorkStructureUnion, WorkConfig } from '../../types/work';
import { getWorkConfig } from '../../services/workService';

interface GenericWorkLayoutProps {
  children: React.ReactNode;
  structure: WorkStructureUnion;
  workId: string;
}

export const GenericWorkLayout = ({ children, structure, workId }: GenericWorkLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [workConfig, setWorkConfig] = useState<WorkConfig | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Get work configuration
  useEffect(() => {
    const config = getWorkConfig(workId);
    setWorkConfig(config);
  }, [workId]);

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <div className="flex pt-24"> {/* pt-24 para dar espacio al header fijo */}
        {/* Sidebar */}
        <GenericSidebar
          structure={structure}
          workConfig={workConfig}
          currentPath={pathname}
          onNavigate={handleNavigate}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-0' : 'ml-0'
        }`}>
          <div className="min-h-[calc(100vh-8rem)] overflow-y-auto">
            {children}
          </div>
        </div>

        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};
