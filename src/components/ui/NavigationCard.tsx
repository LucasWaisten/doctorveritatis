import Link from 'next/link';

interface NavigationCardProps {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  iconBgColor?: string;
  linkColor?: string;
  linkHoverColor?: string;
  chapterCount?: number;
}

export default function NavigationCard({
  title,
  subtitle,
  description,
  href,
  icon,
  gradientFrom = 'gray-50',
  gradientTo = 'gray-100',
  iconBgColor = 'bg-gray-500',
  linkColor = 'text-gray-700',
  linkHoverColor = 'text-gray-800',
  chapterCount
}: NavigationCardProps) {
  return (
    <Link href={href} className="block">
      <div className={`bg-gradient-to-br from-${gradientFrom} to-${gradientTo} p-6 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer`}>
        {icon && (
          <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center mb-4`}>
            {icon}
          </div>
        )}
        <h4 className="text-lg font-bold text-slate-900 mb-2">{title}</h4>
        {subtitle && (
          <p className="text-sm text-slate-500 mb-2">{subtitle}</p>
        )}
        <p className="text-slate-600 mb-3 text-sm">
          {description}
        </p>
        {chapterCount && (
          <p className="text-xs text-slate-500 mb-3">{chapterCount} chapters</p>
        )}
        <span className={`${linkColor} font-semibold hover:${linkHoverColor} transition-colors text-sm`}>
          View →
        </span>
      </div>
    </Link>
  );
}
