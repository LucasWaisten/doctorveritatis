import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and tagline */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-5 w-5" />
            <span className="font-reading text-lg">Thomistica</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground" aria-label="Enlaces del pie de página">
            <Link href="/works" className="hover:text-foreground transition-colors">
              Obras
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              Proyecto
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            Ad maiorem Dei gloriam
          </p>
        </div>
      </div>
    </footer>
  );
};
