'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import ProductCandidateCard from '@/components/admin/ProductCandidateCard';
import AddCandidatesForm from '@/components/admin/AddCandidatesForm';

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'content_generated';

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = filter !== 'all' ? { status: filter } : undefined;
      const data = await api.candidates.getAll(params);
      setCandidates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleApprove = async (id: number) => {
    try {
      await api.candidates.approve(id);
      showToast('Candidato approvato!');
      fetchCandidates();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Errore', 'error');
    }
  };

  const handleReject = async (id: number, reason: string) => {
    try {
      await api.candidates.reject(id, reason);
      showToast('Candidato rifiutato');
      fetchCandidates();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Errore', 'error');
    }
  };

  const handleAnalyze = async (id: number) => {
    try {
      showToast('Analisi avviata...');
      await api.candidates.analyze(id);
      showToast('Analisi completata!');
      fetchCandidates();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Errore analisi', 'error');
    }
  };

  const handleGenerateContent = async (id: number) => {
    try {
      showToast('Generazione contenuti in corso...');
      const result = await api.candidates.generateContent(id);
      if (result.success) {
        showToast('Articolo e video generati!');
      } else {
        showToast('Generazione parziale: ' + (result.errors?.join(', ') || ''), 'error');
      }
      fetchCandidates();
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Errore generazione', 'error');
    }
  };

  const handleAnalyzeAll = async () => {
    try {
      showToast('Analisi batch avviata...');
      await api.candidates.analyzeAll();
      showToast('Analisi batch in corso in background. Ricarica tra qualche minuto.');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Errore', 'error');
    }
  };

  const counts = {
    all: candidates.length,
    pending: candidates.filter((c) => c.status === 'pending').length,
    approved: candidates.filter((c) => c.status === 'approved').length,
    rejected: candidates.filter((c) => c.status === 'rejected').length,
    content_generated: candidates.filter((c) => c.status === 'content_generated').length,
  };

  const filters: { key: FilterStatus; label: string }[] = [
    { key: 'all', label: `Tutti (${counts.all})` },
    { key: 'pending', label: `In Attesa (${counts.pending})` },
    { key: 'approved', label: `Approvati (${counts.approved})` },
    { key: 'content_generated', label: `Con Contenuto (${counts.content_generated})` },
    { key: 'rejected', label: `Rifiutati (${counts.rejected})` },
  ];

  const filteredCandidates =
    filter === 'all' ? candidates : candidates.filter((c) => c.status === filter);

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-in"
          style={{
            background: toast.type === 'success' ? 'var(--sage-600)' : '#DC2626',
            color: 'white',
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--gray-800)' }}>
            Candidati Prodotto
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-400)' }}>
            Rivedi, approva e genera contenuti per i prodotti affiliate
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAnalyzeAll}
            className="text-sm px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            style={{ background: 'var(--teal-100)', color: 'var(--teal-700)' }}
          >
            Analizza Tutti
          </button>
          <button
            onClick={fetchCandidates}
            className="text-sm px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            style={{ background: 'var(--gray-100)', color: 'var(--gray-600)' }}
          >
            Aggiorna
          </button>
        </div>
      </div>

      {/* Add Candidates Form */}
      <AddCandidatesForm onSuccess={fetchCandidates} />

      {/* Filters */}
      <div
        className="flex gap-1 p-1 rounded-lg mb-6 w-fit"
        style={{ background: 'var(--gray-100)' }}
      >
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
          <p className="mt-3 text-sm" style={{ color: 'var(--gray-400)' }}>
            Caricamento candidati...
          </p>
        </div>
      ) : error ? (
        <div
          className="text-center py-20 rounded-xl"
          style={{ background: '#FEF2F2', color: '#991B1B' }}
        >
          <p className="font-medium">Errore</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={fetchCandidates}
            className="mt-3 text-sm underline cursor-pointer"
          >
            Riprova
          </button>
        </div>
      ) : filteredCandidates.length === 0 ? (
        <div
          className="text-center py-20 rounded-xl"
          style={{ background: 'var(--gray-50)' }}
        >
          <p className="text-lg font-medium" style={{ color: 'var(--gray-500)' }}>
            Nessun candidato{filter !== 'all' ? ` con stato "${filter}"` : ''}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-400)' }}>
            Usa il pulsante &quot;Aggiungi Prodotti&quot; qui sopra per inserire nuovi link affiliate
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCandidates.map((candidate) => (
            <ProductCandidateCard
              key={candidate.id}
              candidate={candidate}
              onApprove={handleApprove}
              onReject={handleReject}
              onAnalyze={handleAnalyze}
              onGenerateContent={handleGenerateContent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
