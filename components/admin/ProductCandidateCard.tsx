'use client';

import { useState } from 'react';

interface ProductCandidate {
  id: number;
  name: string;
  category: string;
  description: string | null;
  affiliateLink: string;
  affiliateProgram: string;
  source: string;
  status: string;
  analysisStatus: string | null;
  landingPageData: any | null;
  analyzedAt: string | null;
  createdAt: string;
  metadata: any | null;
}

interface Props {
  candidate: ProductCandidate;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number, reason: string) => Promise<void>;
  onAnalyze: (id: number) => Promise<void>;
  onGenerateContent: (id: number) => Promise<void>;
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'var(--gold-100)', text: 'var(--gold-700)', label: 'In Attesa' },
  approved: { bg: 'var(--sage-100)', text: 'var(--sage-700)', label: 'Approvato' },
  rejected: { bg: '#FEE2E2', text: '#991B1B', label: 'Rifiutato' },
  content_generated: { bg: 'var(--teal-100)', text: 'var(--teal-700)', label: 'Contenuto Generato' },
};

const analysisColors: Record<string, { bg: string; text: string; label: string }> = {
  completed: { bg: 'var(--sage-100)', text: 'var(--sage-700)', label: 'Analizzato' },
  analyzing: { bg: 'var(--gold-100)', text: 'var(--gold-700)', label: 'In Analisi...' },
  failed: { bg: '#FEE2E2', text: '#991B1B', label: 'Analisi Fallita' },
  pending: { bg: 'var(--gray-100)', text: 'var(--gray-500)', label: 'Non Analizzato' },
};

export default function ProductCandidateCard({
  candidate,
  onApprove,
  onReject,
  onAnalyze,
  onGenerateContent,
}: Props) {
  const [showDetails, setShowDetails] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [loading, setLoading] = useState<string | null>(null);

  const status = statusColors[candidate.status] || statusColors.pending;
  const analysis = analysisColors[candidate.analysisStatus || 'pending'] || analysisColors.pending;
  const lpData = candidate.landingPageData;

  const handleAction = async (action: string, fn: () => Promise<void>) => {
    setLoading(action);
    try {
      await fn();
    } finally {
      setLoading(null);
    }
  };

  return (
    <div
      className="rounded-xl border p-5 transition-shadow hover:shadow-md"
      style={{ background: 'var(--white)', borderColor: 'var(--gray-100)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate" style={{ color: 'var(--gray-800)' }}>
            {candidate.name}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: 'var(--gray-400)' }}>
            {candidate.affiliateProgram} &middot; {candidate.category}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: status.bg, color: status.text }}
          >
            {status.label}
          </span>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: analysis.bg, color: analysis.text }}
          >
            {analysis.label}
          </span>
        </div>
      </div>

      {/* Description */}
      {candidate.description && (
        <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--gray-500)' }}>
          {candidate.description}
        </p>
      )}

      {/* AI Analysis Summary */}
      {lpData && (
        <div
          className="rounded-lg p-3 mb-3 text-sm space-y-2"
          style={{ background: 'var(--gray-50)' }}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium" style={{ color: 'var(--gray-600)' }}>
              Quality Score
            </span>
            <span
              className="font-bold text-base"
              style={{
                color:
                  lpData.overallQuality >= 7
                    ? 'var(--sage-600)'
                    : lpData.overallQuality >= 4
                      ? 'var(--gold-600)'
                      : '#DC2626',
              }}
            >
              {lpData.overallQuality}/10
            </span>
          </div>
          <div>
            <span className="font-medium" style={{ color: 'var(--gray-600)' }}>Target: </span>
            <span style={{ color: 'var(--gray-500)' }}>{lpData.targetAudience}</span>
          </div>
          <div>
            <span className="font-medium" style={{ color: 'var(--gray-600)' }}>Problema: </span>
            <span style={{ color: 'var(--gray-500)' }}>{lpData.problemSolved}</span>
          </div>
          {lpData.warnings && lpData.warnings.length > 0 && (
            <div className="pt-1">
              <span className="font-medium" style={{ color: '#DC2626' }}>
                Warnings ({lpData.warnings.length}):
              </span>
              <ul className="list-disc list-inside mt-1" style={{ color: '#DC2626' }}>
                {lpData.warnings.slice(0, 2).map((w: string, i: number) => (
                  <li key={i} className="text-xs">{w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Expandable details */}
      {lpData && showDetails && (
        <div
          className="rounded-lg p-3 mb-3 text-sm space-y-2"
          style={{ background: 'var(--sage-50)', border: '1px solid var(--sage-100)' }}
        >
          <div>
            <span className="font-medium" style={{ color: 'var(--sage-700)' }}>Claims: </span>
            <span style={{ color: 'var(--gray-600)' }}>{lpData.mainClaims?.join(' | ')}</span>
          </div>
          <div>
            <span className="font-medium" style={{ color: 'var(--sage-700)' }}>Benefici: </span>
            <span style={{ color: 'var(--gray-600)' }}>{lpData.benefits?.join(', ')}</span>
          </div>
          <div>
            <span className="font-medium" style={{ color: 'var(--sage-700)' }}>Keywords SEO: </span>
            <span style={{ color: 'var(--gray-600)' }}>{lpData.keywordsForSEO?.join(', ')}</span>
          </div>
          <div>
            <span className="font-medium" style={{ color: 'var(--sage-700)' }}>Hook Video: </span>
            <span style={{ color: 'var(--gray-600)' }}>{lpData.videoScriptHook}</span>
          </div>
          <div>
            <span className="font-medium" style={{ color: 'var(--sage-700)' }}>Angolo Articolo: </span>
            <span style={{ color: 'var(--gray-600)' }}>{lpData.articleAngle}</span>
          </div>
          <div>
            <span className="font-medium" style={{ color: 'var(--sage-700)' }}>Tono: </span>
            <span style={{ color: 'var(--gray-600)' }}>{lpData.tone}</span>
          </div>
          <a
            href={candidate.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 text-xs underline"
            style={{ color: 'var(--teal-600)' }}
          >
            Apri landing page
          </a>
        </div>
      )}

      {/* Content generated info */}
      {candidate.metadata?.articleId && (
        <div
          className="rounded-lg p-2 mb-3 text-xs flex items-center gap-2"
          style={{ background: 'var(--teal-50)', border: '1px solid var(--teal-100)' }}
        >
          <span style={{ color: 'var(--teal-700)' }}>
            Articolo #{candidate.metadata.articleId} e Video #{candidate.metadata.videoId} generati
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap pt-2 border-t" style={{ borderColor: 'var(--gray-100)' }}>
        {lpData && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer"
            style={{ background: 'var(--gray-50)', color: 'var(--gray-600)' }}
          >
            {showDetails ? 'Nascondi' : 'Dettagli'}
          </button>
        )}

        {!candidate.analysisStatus || candidate.analysisStatus === 'failed' ? (
          <button
            onClick={() => handleAction('analyze', () => onAnalyze(candidate.id))}
            disabled={loading === 'analyze'}
            className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50"
            style={{ background: 'var(--teal-100)', color: 'var(--teal-700)' }}
          >
            {loading === 'analyze' ? 'Analizzando...' : 'Analizza Landing'}
          </button>
        ) : null}

        {candidate.analysisStatus === 'completed' && candidate.status !== 'content_generated' && (
          <button
            onClick={() => handleAction('generate', () => onGenerateContent(candidate.id))}
            disabled={loading === 'generate'}
            className="text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50"
            style={{ background: 'var(--orange-100)', color: 'var(--orange-700)' }}
          >
            {loading === 'generate' ? 'Generando...' : 'Genera Contenuti'}
          </button>
        )}

        <div className="flex-1" />

        {candidate.status === 'pending' && (
          <>
            <button
              onClick={() => handleAction('approve', () => onApprove(candidate.id))}
              disabled={loading === 'approve'}
              className="text-xs px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer disabled:opacity-50"
              style={{ background: 'var(--sage-500)', color: 'var(--white)' }}
            >
              {loading === 'approve' ? '...' : 'Approva'}
            </button>
            <button
              onClick={() => setShowRejectModal(true)}
              className="text-xs px-4 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer"
              style={{ background: '#FEE2E2', color: '#991B1B' }}
            >
              Rifiuta
            </button>
          </>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="mt-3 p-3 rounded-lg" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Motivo del rifiuto..."
            className="w-full text-sm p-2 rounded border mb-2 resize-none"
            style={{ borderColor: '#FECACA' }}
            rows={2}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => { setShowRejectModal(false); setRejectReason(''); }}
              className="text-xs px-3 py-1.5 rounded-lg cursor-pointer"
              style={{ color: 'var(--gray-500)' }}
            >
              Annulla
            </button>
            <button
              onClick={() =>
                handleAction('reject', async () => {
                  await onReject(candidate.id, rejectReason);
                  setShowRejectModal(false);
                  setRejectReason('');
                })
              }
              disabled={!rejectReason.trim() || loading === 'reject'}
              className="text-xs px-4 py-1.5 rounded-lg font-semibold cursor-pointer disabled:opacity-50"
              style={{ background: '#DC2626', color: 'white' }}
            >
              {loading === 'reject' ? '...' : 'Conferma Rifiuto'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
