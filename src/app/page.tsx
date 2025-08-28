import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import NavigationCard from '@/components/ui/NavigationCard';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { works } from '@/data/works';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Santo Tomás de Aquino
              </h2>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                El Doctor Angélico, maestro de la teología y la filosofía escolástica. 
                Su obra monumental sigue siendo fundamento de la doctrina católica y 
                referencia esencial en el pensamiento occidental.
              </p>
              <div className="flex space-x-4">
                <Button href="/obras" variant="primary" size="lg">
                  Explorar Obras
                </Button>
                <Button href="/biografia" variant="outline" size="lg">
                  Leer Biografía
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/santotomas.jpg"
                alt="Santo Tomás de Aquino"
                width={400}
                height={500}
                className="rounded-lg shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Navigation Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Explorar el Legado del Doctor Angélico
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work) => (
              <NavigationCard
                key={work.id}
                title={work.title}
                description={work.description}
                href={work.href}
                icon={<Icon name={work.icon} />}
                gradientFrom={work.gradientFrom}
                gradientTo={work.gradientTo}
                iconBgColor={work.iconBgColor}
                linkColor={work.linkColor}
                linkHoverColor={work.linkHoverColor}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
