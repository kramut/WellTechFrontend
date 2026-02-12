'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/candidates', label: 'Candidati', exact: false },
  { href: '/admin/articles', label: 'Articoli', exact: false },
  { href: '/admin/videos', label: 'Video', exact: false },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (item: { href: string; exact: boolean }) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="min-h-screen" style={{ background: 'var(--off-white)' }}>
      <header
        className="border-b px-6 py-0 flex items-center justify-between"
        style={{ background: 'var(--white)', borderColor: 'var(--gray-100)' }}
      >
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="flex items-center gap-2 py-4 no-underline"
          >
            <span className="text-xl font-bold" style={{ color: 'var(--gray-800)' }}>
              WellTech
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'var(--sage-100)', color: 'var(--sage-700)' }}
            >
              Admin
            </span>
          </Link>

          <nav className="flex h-full">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium px-3 py-4 no-underline transition-colors"
                style={{
                  color: isActive(item) ? 'var(--sage-700)' : 'var(--gray-400)',
                }}
              >
                {item.label}
                {isActive(item) && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ background: 'var(--sage-500)' }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          href="/"
          className="text-sm no-underline"
          style={{ color: 'var(--gray-400)' }}
        >
          Torna al sito
        </Link>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}
