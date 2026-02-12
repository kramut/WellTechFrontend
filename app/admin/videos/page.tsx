'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

interface Video {
  id: number;
  title: string;
  articleId: number | null;
  script: string;
  videoUrl: string | null;
  tiktokUrl: string | null;
  tiktokViews: number;
  createdAt: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editScript, setEditScript] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.videos.getAll() as Video[];
      setVideos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleStartEdit = (video: Video) => {
    setEditingId(video.id);
    setEditTitle(video.title);
    setEditScript(video.script);
    setExpandedId(video.id);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await api.videos.update(editingId, { title: editTitle, script: editScript });
      showToast('Script aggiornato!');
      setEditingId(null);
      fetchVideos();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Errore salvataggio', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Eliminare questo video script?')) return;
    try {
      await api.videos.delete(id);
      showToast('Video eliminato');
      fetchVideos();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Errore', 'error');
    }
  };

  // Try to extract structured data from the script (JSON)
  const parseScript = (script: string): { hook?: string; hashtags?: string[]; caption?: string; sections?: any[]; estimatedDuration?: string; raw: string } => {
    try {
      const parsed = JSON.parse(script);
      return { ...parsed, raw: script };
    } catch {
      return { raw: script };
    }
  };

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
          <h1 className="text-2xl font-bold" style={{ color: 'var(--gray-800)' }}>Video Script</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-400)' }}>
            Gestisci gli script video generati dall&apos;AI per TikTok e Reels
          </p>
        </div>
        <button
          onClick={fetchVideos}
          className="text-sm px-4 py-2 rounded-lg font-medium cursor-pointer"
          style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}
        >
          Aggiorna
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-6">
        <div className="rounded-lg px-4 py-2" style={{ background: 'var(--teal-50)' }}>
          <span className="text-sm font-medium" style={{ color: 'var(--teal-700)' }}>
            {videos.length} script totali
          </span>
        </div>
        <div className="rounded-lg px-4 py-2" style={{ background: 'var(--orange-50)' }}>
          <span className="text-sm font-medium" style={{ color: 'var(--orange-700)' }}>
            {videos.filter(v => v.videoUrl).length} con video generato
          </span>
        </div>
        <div className="rounded-lg px-4 py-2" style={{ background: 'var(--sage-50)' }}>
          <span className="text-sm font-medium" style={{ color: 'var(--sage-700)' }}>
            {videos.filter(v => v.tiktokUrl).length} su TikTok
          </span>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
          <div
            className="inline-block w-8 h-8 border-3 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: 'var(--teal-300)', borderTopColor: 'transparent' }}
          />
          <p className="mt-3 text-sm" style={{ color: 'var(--gray-400)' }}>Caricamento video...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 rounded-xl" style={{ background: '#FEF2F2', color: '#991B1B' }}>
          <p className="font-medium">Errore</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20 rounded-xl" style={{ background: 'var(--gray-50)' }}>
          <p className="text-lg font-medium" style={{ color: 'var(--gray-500)' }}>Nessun video script</p>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-400)' }}>
            Gli script vengono generati dall&apos;AI nella sezione Candidati Prodotto
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {videos.map((video) => {
            const scriptData = parseScript(video.script);
            return (
              <div
                key={video.id}
                className="rounded-xl border transition-shadow hover:shadow-md"
                style={{ background: 'var(--white)', borderColor: 'var(--gray-100)' }}
              >
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      {editingId === video.id ? (
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="text-lg font-semibold w-full px-2 py-1 rounded border"
                          style={{ borderColor: 'var(--teal-300)', color: 'var(--gray-800)' }}
                        />
                      ) : (
                        <h3
                          className="font-semibold text-lg cursor-pointer hover:underline"
                          style={{ color: 'var(--gray-800)' }}
                          onClick={() => setExpandedId(expandedId === video.id ? null : video.id)}
                        >
                          {video.title}
                        </h3>
                      )}
                      <p className="text-sm mt-0.5" style={{ color: 'var(--gray-400)' }}>
                        {video.articleId ? `Articolo #${video.articleId}` : 'Standalone'}
                        {' '}&middot;{' '}
                        {scriptData.estimatedDuration || '60-90s'}
                        {video.tiktokViews > 0 && ` · ${video.tiktokViews} TikTok views`}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {video.tiktokUrl && (
                        <a
                          href={video.tiktokUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2.5 py-1 rounded-full font-medium no-underline"
                          style={{ background: '#000', color: '#fff' }}
                        >
                          TikTok
                        </a>
                      )}
                      {video.videoUrl ? (
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ background: 'var(--sage-100)', color: 'var(--sage-700)' }}
                        >
                          Video Pronto
                        </span>
                      ) : (
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{ background: 'var(--gold-100)', color: 'var(--gold-700)' }}
                        >
                          Solo Script
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hook preview */}
                  {scriptData.hook && !editingId && (
                    <div
                      className="rounded-lg p-3 mb-3 text-sm"
                      style={{ background: 'var(--orange-50)', border: '1px solid var(--orange-100)' }}
                    >
                      <span className="font-medium" style={{ color: 'var(--orange-700)' }}>Hook: </span>
                      <span style={{ color: 'var(--gray-600)' }}>{scriptData.hook}</span>
                    </div>
                  )}

                  {/* Hashtags */}
                  {scriptData.hashtags && scriptData.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {scriptData.hashtags.slice(0, 8).map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--teal-50)', color: 'var(--teal-600)' }}
                        >
                          {tag.startsWith('#') ? tag : `#${tag}`}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap pt-3 mt-1 border-t" style={{ borderColor: 'var(--gray-100)' }}>
                    <button
                      onClick={() => setExpandedId(expandedId === video.id ? null : video.id)}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer"
                      style={{ background: 'var(--gray-50)', color: 'var(--gray-600)' }}
                    >
                      {expandedId === video.id ? 'Chiudi' : 'Leggi Script'}
                    </button>

                    {editingId === video.id ? (
                      <>
                        <button
                          onClick={handleSaveEdit}
                          className="text-xs px-3 py-1.5 rounded-lg font-semibold cursor-pointer"
                          style={{ background: 'var(--teal-500)', color: 'var(--white)' }}
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
                        onClick={() => handleStartEdit(video)}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer"
                        style={{ background: 'var(--teal-50)', color: 'var(--teal-700)' }}
                      >
                        Modifica
                      </button>
                    )}

                    <div className="flex-1" />

                    <button
                      onClick={() => handleDelete(video.id)}
                      className="text-xs px-3 py-1.5 rounded-lg font-medium cursor-pointer"
                      style={{ background: '#FEE2E2', color: '#991B1B' }}
                    >
                      Elimina
                    </button>
                  </div>
                </div>

                {/* Expanded script */}
                {expandedId === video.id && (
                  <div className="border-t px-5 py-4" style={{ borderColor: 'var(--gray-100)' }}>
                    {editingId === video.id ? (
                      <textarea
                        value={editScript}
                        onChange={(e) => setEditScript(e.target.value)}
                        className="w-full text-sm p-3 rounded-lg border font-mono resize-y min-h-[300px]"
                        style={{ borderColor: 'var(--teal-200)', color: 'var(--gray-700)' }}
                      />
                    ) : scriptData.sections ? (
                      <div className="space-y-3">
                        {scriptData.sections.map((section: any, i: number) => (
                          <div key={i} className="rounded-lg p-3" style={{ background: 'var(--gray-50)' }}>
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className="text-xs font-bold px-2 py-0.5 rounded"
                                style={{ background: 'var(--teal-100)', color: 'var(--teal-700)' }}
                              >
                                {section.timing || `${i + 1}`}
                              </span>
                              {section.visualDirection && (
                                <span className="text-xs" style={{ color: 'var(--gray-400)' }}>
                                  {section.visualDirection}
                                </span>
                              )}
                            </div>
                            <p className="text-sm" style={{ color: 'var(--gray-700)' }}>
                              {section.text || section.voiceover || JSON.stringify(section)}
                            </p>
                          </div>
                        ))}

                        {scriptData.caption && (
                          <div className="pt-3 border-t" style={{ borderColor: 'var(--gray-100)' }}>
                            <span className="text-xs font-medium" style={{ color: 'var(--gray-500)' }}>Caption: </span>
                            <span className="text-sm" style={{ color: 'var(--gray-600)' }}>{scriptData.caption}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className="text-sm leading-relaxed whitespace-pre-wrap"
                        style={{ color: 'var(--gray-600)', maxHeight: '400px', overflowY: 'auto' }}
                      >
                        {video.script}
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t text-xs" style={{ borderColor: 'var(--gray-100)', color: 'var(--gray-400)' }}>
                      Creato il {new Date(video.createdAt).toLocaleDateString('it-IT', { dateStyle: 'long' })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
