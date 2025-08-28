'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    label: 'Obras Principales',
    href: '/obras',
    children: [
      { label: 'Summa Theologica', href: '/obras/summa-theologica' },
      { label: 'Summa Contra Gentiles', href: '/obras/summa-contra-gentiles' },
      { label: 'Comentarios Bíblicos', href: '/obras/comentarios-biblicos' },
    ]
  },
  {
    label: 'Teología',
    href: '/teologia',
    children: [
      { label: 'Tratados Teológicos', href: '/teologia/tratados' },
      { label: 'Cuestiones Disputadas', href: '/teologia/cuestiones' },
      { label: 'Opúsculos', href: '/teologia/opusculos' },
    ]
  },
  {
    label: 'Filosofía',
    href: '/filosofia',
    children: [
      { label: 'Comentarios a Aristóteles', href: '/filosofia/aristoteles' },
      { label: 'Metafísica', href: '/filosofia/metafisica' },
      { label: 'Ética', href: '/filosofia/etica' },
    ]
  },
  {
    label: 'Biografía',
    href: '/biografia'
  }
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = useCallback(() => {
    if (isScrolling) return;

    setIsScrolling(true);
    
    const currentScrollY = window.scrollY;
    const scrollThreshold = 10; // Umbral mínimo para considerar el scroll
    
    // Solo cambiar visibilidad si el scroll es significativo
    if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll hacia abajo y no estamos en la parte superior
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scroll hacia arriba
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    }
    
    // Reset del flag después de un breve delay
    setTimeout(() => setIsScrolling(false), 100);
  }, [lastScrollY, isScrolling]);

  useEffect(() => {
    // Agregar el event listener con throttling
    let ticking = false;
    
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header 
      className={`bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
            <Image
              src="/santotomas.jpg"
              alt="Santo Tomás de Aquino"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Doctor Veritatis</h1>
              <p className="text-sm text-slate-600">Santo Tomás de Aquino</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigationItems.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="text-slate-700 hover:text-slate-900 font-medium py-2 flex items-center space-x-1 transition-colors"
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {item.children && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100">
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 animate-slideDown">
            {navigationItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center justify-between transition-colors"
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <svg className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                
                {item.children && activeDropdown === item.label && (
                  <div className="bg-slate-50 animate-slideDown">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-8 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
