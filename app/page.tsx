'use client';

import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { works } from '@/data/works';
import { WorkCard } from '@/components/WorkCard';
import { BookOpen, Search, Globe, Layers, ArrowRight } from 'lucide-react';

const featuredWorks = works.filter((w) => w.featured).slice(0, 3);

const features = [
  {
    icon: BookOpen,
    title: 'Lectura cómoda',
    description:
      'Tipografía optimizada, múltiples temas y controles de lectura personalizables.',
  },
  {
    icon: Globe,
    title: 'Multilenguaje',
    description:
      'Textos en latín original y traducciones en español, inglés, francés y más.',
  },
  {
    icon: Layers,
    title: 'Navegación estructurada',
    description:
      'Índice jerárquico, deep links y referencias precisas a cada sección.',
  },
  {
    icon: Search,
    title: 'Búsqueda avanzada',
    description:
      'Encuentra cualquier pasaje y navega directamente al contexto completo.',
  },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-reading text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Las obras de Santo Tomás de Aquino
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Una biblioteca digital dedicada a la lectura y estudio de las obras del Doctor Angélico,
              con navegación estructurada y traducciones en múltiples idiomas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/library">
                  <BookOpen className="h-5 w-5" />
                  Explorar obras
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/read/summa-theologiae/I/q2/a3">
                  Comenzar a leer
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-reading text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Una experiencia de lectura diseñada para el estudio
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Herramientas pensadas para estudiantes, académicos y todos aquellos que buscan
              profundizar en el pensamiento tomista.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 bg-card border border-border rounded-lg"
                >
                  <div className="p-3 w-fit rounded-md bg-primary/10 text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-reading text-2xl md:text-3xl font-semibold text-foreground mb-2">
                Obras destacadas
              </h2>
              <p className="text-muted-foreground">
                Comienza por las obras más importantes del Aquinate.
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-2 hidden sm:flex">
              <Link href="/library">
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredWorks.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>

          <div className="mt-6 text-center sm:hidden">
            <Button asChild variant="outline" className="gap-2">
              <Link href="/library">
                Ver todas las obras
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reader Preview Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-reading text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Un lector diseñado para textos clásicos
              </h2>
              <p className="text-muted-foreground">
                Controles de lectura, temas visuales y navegación precisa.
              </p>
            </div>

            {/* Mock reader preview */}
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
              {/* Toolbar preview */}
              <div className="flex items-center gap-4 p-4 border-b border-border bg-muted/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>S.Th.</span>
                  <span>→</span>
                  <span>I</span>
                  <span>→</span>
                  <span>q.2</span>
                  <span>→</span>
                  <span className="font-medium text-foreground">a.3</span>
                </div>
              </div>

              {/* Content preview */}
              <div className="p-8 md:p-12">
                <div className="max-w-xl mx-auto font-reading">
                  <p className="text-sm text-muted-foreground font-ui mb-2">Artículo 3</p>
                  <h3 className="text-xl md:text-2xl font-semibold mb-6">Si Dios existe</h3>

                  <p className="section-label">Respondo</p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    La existencia de Dios puede ser probada de cinco maneras.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    La primera y más clara es la que se deduce del movimiento. Es cierto, y lo perciben los
                    sentidos, que en este mundo hay movimiento. Y todo lo que se mueve es movido por otro...
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button asChild size="lg" className="gap-2">
                <Link href="/read/summa-theologiae/I/q2/a3">
                  Probar el lector
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

