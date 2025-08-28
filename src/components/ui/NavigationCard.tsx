import Link from 'next/link';

interface NavigationCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  iconBgColor: string;
  linkColor: string;
  linkHoverColor: string;
}

export default function NavigationCard({
  title,
  description,
  href,
  icon,
  gradientFrom,
  gradientTo,
  iconBgColor,
  linkColor,
  linkHoverColor
}: NavigationCardProps) {
  return (
    <Link href={href} className="block">
      <div className={`bg-gradient-to-br from-${gradientFrom} to-${gradientTo} p-8 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer`}>
        <div className={`w-16 h-16 ${iconBgColor} rounded-lg flex items-center justify-center mb-6`}>
          {icon}
        </div>
        <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
        <p className="text-slate-600 mb-4">
          {description}
        </p>
        <span className={`${linkColor} font-semibold hover:${linkHoverColor} transition-colors`}>
          Leer más →
        </span>
      </div>
    </Link>
  );
}
