import Layout from '@/components/layout/Layout';
import NavigationCard from '@/components/ui/NavigationCard';
import Icon from '@/components/ui/Icon';
import { works, categories, getWorksByCategory } from '@/data/works';

export default function ObrasPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Obras de Santo Tomás de Aquino</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explora la vasta obra del Doctor Angélico, desde sus tratados teológicos 
              hasta sus comentarios filosóficos, organizados por categorías para facilitar 
              su estudio y comprensión.
            </p>
          </div>
        </div>
      </section>

      {/* Works by Category */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const categoryWorks = getWorksByCategory(category);
            if (categoryWorks.length === 0) return null;

            return (
              <div key={category} className="mb-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryWorks.map((work) => (
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
            );
          })}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              El Legado del Doctor Angélico
            </h2>
            <p className="text-lg text-slate-600">
              Una obra monumental que ha influenciado el pensamiento occidental durante siglos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{works.length}</div>
              <div className="text-slate-600">Obras Principales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">3</div>
              <div className="text-slate-600">Summas Teológicas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-slate-600">Comentarios Bíblicos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">100+</div>
              <div className="text-slate-600">Tratados Menores</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
