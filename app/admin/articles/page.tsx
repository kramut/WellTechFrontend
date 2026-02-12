'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

interface Article {
  id: number;
  title: string;
  slug: string;
  category: string;
  content: string;
  seoMetaTitle: string | null;
  seoMetaDescription: string | null;
  featuredImageUrl: string | null;
  productIds: number[];
  publishedAt: string | null;
  createdAt: string;
  views: number;
}

type Filter = 'all' | 'published' | 'draft';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.articles.getAll() as Article[];
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handlePublish = async (id: number) => {
    try {
      await api.articles.update(id, { publishedAt: new Date().toISOString() });
      showToast('Articolo pubblicato!');
      fetchArticles();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Errore', 'error');
    }
  };

  const handleUnpublish = async (id: number) => {
    try {
      await api.articles.update(id, { publishedAt: null });
      showToast('Articolo rimesso in bozza');
      fetchArticles();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Errore', 'error');
    }
  };

  const handleStartEdit = (article: Article) => {
    setEditingId(article.id);
    setEditTitle(article.title);
    setEditContent(article.content);
    setExpandedId(article.id);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await api.articles.update(editingId, { title: editTitle, content: editContent });
      showToast('Articolo aggiornato!');
      setEditingId(null);
      fetchArticles();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Errore salvataggio', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Eliminare questo articolo?')) return;
    try {
      await api.articles.delete(id);
      showToast('Articolo eliminato');
      fetchArticles();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Errore', 'error');
    }
  };

  const filteredArticles = articles.filter((a) => {
    if (filter === 'published') return a.publishedAt;
    if (filter === 'draft') return !a.publishedAt;
    return true;
  });

  const counts = {
    all: articles.length,
    published: articles.filter((a) => a.publishedAt).length,
    draft: articles.filter((a) => !a.publishedAt).length,
  };

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: `Tutti (${counts.all})` },
    { key: 'published', label: `Pubblicati (${counts.published})` },
    { key: 'draft', label: `Bozze (${counts.draft})` },
  ];

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium"
          style={{
            background: toast.type === 'success' ? 'var(--sage-600)' : '#DC2626',
            color: 'white',
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--gray-800)' }}>Articoli</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-400)' }}>
            Gestisci gli articoli SEO generati dall&apos;AI
          </p>
        </div>
        <button
          onClick={fetchArticles}
          className="text-sm px-4 py-2 rounded-lg font-medium cursor-pointer"
          style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}
        >
          Aggiorna
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-1 p-1 rounded-lg mb-6 w-fit" style={{ background: 'var(--gray-100)' }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="text-sm px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer"
            style={{
              background: filter === f.key ? 'var(--white)' : 'transparent',
              color: filter === f.key ? 'var(--gray-800)' : 'var(--gray-400)',
              boxShadow: filter === f.key ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
          <div
            className="inline-block w-8 h-8 border-3 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: 'var(--sage-300)', borderTopColor: 'transparent' }}
          />
          <p className="mt-3 text-sm" style={{ color: 'var(--gray-400)' }}>Caricamento articoli...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 rounded-xl" style={{ background: '#FEF2F2', color: '#991B1B' }}>
          <p className="font-medium">Errore</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center py-20 rounded-xl" style={{ background: 'var(--gray-50)' }}>
          <p className="text-lg font-medium" style={{ color: 'var(--gray-500)' }}>
            Nessun articolo{filter !== 'all' ? ` ${filter === 'published' ? 'pubblicato' : 'in bozza'}` : ''}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-400)' }}>
            Gli articoli vengono generati dall&apos;AI nella sezione Candidati Prodotto
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="rounded-xl border transition-shadow hover:shadow-md"
              style={{ background: 'var(--white)', borderColor: 'var(--gray-100)' }}
            >
              {/* Article header */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    {editingId === article.id ? (
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="text-lg font-semibold w-full px-2 py-1 rounded border"
                        style={{ borderColor: 'var(--sage-300)', color: 'var(--gray-800)' }}
                      />
                    ) : (
                      <h3
                        className="font-semibold text-lg cursor-pointer hover:underline"
                        style={{ color: 'var(--gray-800)' }}
                        onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                      >
                        {article.title}
                      </h3>
                    )}
                    <p className="text-sm mt-0.5" style={{ color: 'var(--gray-400)' }}>
                      {article.category} &middot; /{article.slug} &middot; {article.views} views
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: article.publishedAt ? 'var(--sage-100)' : 'var(--gold-100)',
                        color: article.publishedAt ? 'var(--sage-700)' : 'var(--gold-700)',
                      }}
                    >
                      {article.publishedAt ? 'Pubblicato' : 'Bozza'}
                    </span>
                  </div>
                </div>

                {/* SEO info */}
                {article.seoMetaDescription && (
                  <p className="text-sm line-clamp-2" style={{ color: 'var(--gray-500)' }}>
                    {article.seoMetaDescription}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 flex-wrap pt-3 mt-3 border-t" style={{ borderColor: 'var(--gray-100)' }}>
                  <button
                    onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                    className="text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer"
                    style={{ background: 'var(--gray-50)', color: 'var(--gray-600)' }}
                  >
                    {expandedId === article.id ? 'Chiudi' : 'Anteprima'}
                  </button>

                  {editingId === article.id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="text-xs px-3 py-1.5 rounded-lg font-semibold cursor-pointer"
                        style={{ background: 'var(--sage-500)', color: 'var(--white)' }}
                      >
                        Salva
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-xs px-3 py-1.5 rounded-lg cursor-pointer"
                        style={{ color: 'var(--gray-400)' }}
                      >
                        Annulla
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleStartEdit(article)}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer"
                      style={{ background: 'var(--teal-50)', color: 'var(--teal-700)' }}
                    >
                      Modifica
                    </button>
                  )}

                  <div className="flex-1" />

                  {article.publishedAt ? (
                    <button
                      onClick={() => handleUnpublish(article.id)}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer"
                      style={{ background: 'var(--gold-100)', color: 'var(--gold-700)' }}
                    >
                      Torna a Bozza
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePublish(article.id)}
                      className="text-xs px-4 py-1.5 rounded-lg font-semibold cursor-pointer"
                      style={{ background: 'var(--sage-500)', color: 'var(--white)' }}
                    >
                      Pubblica
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer"
                    style={{ background: '#FEE2E2', color: '#991B1B' }}
                  >
                    Elimina
                  </button>
                </div>
              </div>

              {/* Expanded content */}
              {expandedId === article.id && (
                <div className="border-t px-5 py-4" style={{ borderColor: 'var(--gray-100)' }}>
                  {editingId === article.id ? (
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full text-sm p-3 rounded-lg border font-mono resize-y min-h-[400px]"
                      style={{ borderColor: 'var(--sage-200)', color: 'var(--gray-700)' }}
                    />
                  ) : (
                    <div className="prose prose-sm max-w-none" style={{ color: 'var(--gray-600)' }}>
                      <div
                        className="text-sm leading-relaxed whitespace-pre-wrap"
                        style={{ maxHeight: '500px', overflowY: 'auto' }}
                      >
                        {article.content}
                      </div>
                    </div>
                  )}

                  {/* SEO details */}
                  <div className="mt-4 pt-4 border-t space-y-2" style={{ borderColor: 'var(--gray-100)' }}>
                    <div className="text-xs">
                      <span className="font-medium" style={{ color: 'var(--gray-500)' }}>Meta Title: </span>
                      <span style={{ color: 'var(--gray-400)' }}>{article.seoMetaTitle || '—'}</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-medium" style={{ color: 'var(--gray-500)' }}>Meta Description: </span>
                      <span style={{ color: 'var(--gray-400)' }}>{article.seoMetaDescription || '—'}</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-medium" style={{ color: 'var(--gray-500)' }}>Slug: </span>
                      <span style={{ color: 'var(--gray-400)' }}>/{article.slug}</span>
                    </div>
                    <div className="text-xs">
                      <span className="font-medium" style={{ color: 'var(--gray-500)' }}>Creato il: </span>
                      <span style={{ color: 'var(--gray-400)' }}>
                        {new Date(article.createdAt).toLocaleDateString('it-IT', { dateStyle: 'long' })}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
