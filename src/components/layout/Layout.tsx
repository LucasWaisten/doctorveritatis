import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      {/* Espaciador para compensar el header fijo */}
      <div className="header-spacer"></div>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
