'use client';

import { Layout } from '@/components/layout/Layout';
import { BookOpen, Users, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <Layout>
      <div className="container py-12 max-w-3xl">
        <header className="mb-10">
          <h1 className="font-reading text-3xl md:text-4xl font-semibold mb-4">Sobre el proyecto</h1>
          <p className="text-lg text-muted-foreground">
            Thomistica es una biblioteca digital dedicada a facilitar el acceso y estudio
            de las obras de Santo Tomás de Aquino.
          </p>
        </header>

        <div className="prose prose-lg max-w-none font-reading space-y-8">
          <section>
            <h2 className="font-reading text-xl font-semibold mb-3">Nuestra misión</h2>
            <p className="text-muted-foreground leading-relaxed">
              Proporcionar una experiencia de lectura moderna y accesible para los textos del Doctor Angélico,
              respetando la estructura original de sus obras y ofreciendo herramientas que faciliten el estudio académico.
            </p>
          </section>

          <section className="grid md:grid-cols-3 gap-6 not-prose">
            {[
              { icon: BookOpen, title: 'Lectura óptima', desc: 'Tipografía y diseño pensados para textos filosóficos.' },
              { icon: Globe, title: 'Multilenguaje', desc: 'Textos en latín original y traducciones verificadas.' },
              { icon: Users, title: 'Accesibilidad', desc: 'Diseño inclusivo para todo tipo de lectores.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-4 bg-muted/30 rounded-lg">
                <Icon className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </section>

          <section>
            <h2 className="font-reading text-xl font-semibold mb-3">Contacto</h2>
            <p className="text-muted-foreground">
              Para sugerencias, correcciones o colaboraciones, escríbenos a contacto@thomistica.app
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}

