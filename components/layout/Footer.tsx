import Link from 'next/link';

const categories = [
  { name: 'Wellbeing', href: '/temi/wellbeing' },
  { name: 'Nutrition', href: '/temi/nutrition' },
  { name: 'Fitness', href: '/temi/fitness' },
  { name: 'Mindset', href: '/temi/mindset' },
  { name: 'Productivity', href: '/temi/productivity' },
  { name: 'Wealth', href: '/temi/wealth' },
];

const legal = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' },
  { name: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-[var(--sage-500)] to-[var(--teal-500)] bg-clip-text text-transparent mb-4">
              WellTech Hub
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Piattaforma curata per benessere, performance e crescita personale.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Temi</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--sage-600)] dark:hover:text-[var(--sage-400)] transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Link Utili</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/articoli"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--sage-600)] dark:hover:text-[var(--sage-400)] transition-colors"
                >
                  Articoli
                </Link>
              </li>
              <li>
                <Link
                  href="/prodotti"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--sage-600)] dark:hover:text-[var(--sage-400)] transition-colors"
                >
                  Prodotti
                </Link>
              </li>
              <li>
                <Link
                  href="/guide"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--sage-600)] dark:hover:text-[var(--sage-400)] transition-colors"
                >
                  Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--sage-600)] dark:hover:text-[var(--sage-400)] transition-colors"
                >
                  Chi Siamo
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Legale</h4>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--sage-600)] dark:hover:text-[var(--sage-400)] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} WellTech Hub. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}





