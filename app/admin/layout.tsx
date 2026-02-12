export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: 'var(--off-white)' }}>
      <header
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{ background: 'var(--white)', borderColor: 'var(--gray-100)' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold" style={{ color: 'var(--gray-800)' }}>
            WellTech Admin
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: 'var(--sage-100)', color: 'var(--sage-700)' }}
          >
            Dashboard
          </span>
        </div>
        <nav className="flex gap-4 text-sm">
          <a
            href="/admin/candidates"
            className="font-medium hover:underline"
            style={{ color: 'var(--sage-600)' }}
          >
            Candidati Prodotto
          </a>
          <a
            href="/"
            className="hover:underline"
            style={{ color: 'var(--gray-400)' }}
          >
            Torna al sito
          </a>
        </nav>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}
