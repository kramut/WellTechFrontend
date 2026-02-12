'use client';

import { useState } from 'react';

interface Props {
  onSuccess: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const CATEGORIES = [
  { value: 'wellness', label: 'Wellness' },
  { value: 'beauty', label: 'Beauty' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'sexual-wellbeing', label: 'Sexual Wellbeing' },
  { value: 'sustainability', label: 'Sustainability' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'mental-health', label: 'Mental Health' },
  { value: 'unknown', label: 'Da classificare (AI)' },
];

const PROGRAMS = [
  { value: 'clickbank', label: 'ClickBank' },
  { value: 'awin', label: 'Awin' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'other', label: 'Altro' },
];

interface CandidateRow {
  name: string;
  affiliateLink: string;
  category: string;
  affiliateProgram: string;
}

export default function AddCandidatesForm({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<CandidateRow[]>([
    { name: '', affiliateLink: '', category: 'unknown', affiliateProgram: 'clickbank' },
  ]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const addRow = () => {
    setRows([...rows, { name: '', affiliateLink: '', category: 'unknown', affiliateProgram: 'clickbank' }]);
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const updateRow = (index: number, field: keyof CandidateRow, value: string) => {
    const updated = [...rows];
    const row = updated[index];
    if (row) {
      updated[index] = { ...row, [field]: value };
      setRows(updated);
    }
  };

  const handleSubmit = async () => {
    // Validate
    const valid = rows.filter((r) => r.affiliateLink.trim());
    if (valid.length === 0) {
      setResult({ success: false, message: 'Inserisci almeno un link affiliate.' });
      return;
    }

    // Auto-fill names from URL if empty
    const items = valid.map((r) => ({
      name: r.name.trim() || extractNameFromUrl(r.affiliateLink),
      affiliateLink: r.affiliateLink.trim(),
      category: r.category,
      affiliateProgram: r.affiliateProgram,
      source: r.affiliateProgram,
    }));

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/product-candidates/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          success: true,
          message: `${data.summary.created} candidati inseriti con successo!`,
        });
        // Reset form
        setRows([{ name: '', affiliateLink: '', category: 'unknown', affiliateProgram: 'clickbank' }]);
        onSuccess();
      } else {
        setResult({ success: false, message: data.error || 'Errore nell\'inserimento.' });
      }
    } catch (err) {
      setResult({
        success: false,
        message: err instanceof Error ? err.message : 'Errore di connessione.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-sm px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
        style={{ background: 'var(--sage-500)', color: 'var(--white)' }}
      >
        + Aggiungi Prodotti
      </button>
    );
  }

  return (
    <div
      className="rounded-xl border p-5 mb-6"
      style={{ background: 'var(--white)', borderColor: 'var(--sage-200)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--gray-800)' }}>
          Aggiungi Prodotti Affiliate
        </h2>
        <button
          onClick={() => { setOpen(false); setResult(null); }}
          className="text-sm cursor-pointer"
          style={{ color: 'var(--gray-400)' }}
        >
          Chiudi
        </button>
      </div>

      <p className="text-sm mb-4" style={{ color: 'var(--gray-400)' }}>
        Incolla i link affiliate. Il nome e' opzionale (verra' estratto dall&apos;URL). La categoria &quot;Da classificare&quot; verra' determinata dall&apos;AI durante l&apos;analisi.
      </p>

      {/* Rows */}
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Nome prodotto (opzionale)"
                value={row.name}
                onChange={(e) => updateRow(i, 'name', e.target.value)}
                className="text-sm px-3 py-2 rounded-lg border w-full"
                style={{ borderColor: 'var(--gray-200)' }}
              />
              <input
                type="url"
                placeholder="Link affiliate *"
                value={row.affiliateLink}
                onChange={(e) => updateRow(i, 'affiliateLink', e.target.value)}
                className="text-sm px-3 py-2 rounded-lg border w-full sm:col-span-1"
                style={{ borderColor: 'var(--gray-200)' }}
              />
              <select
                value={row.category}
                onChange={(e) => updateRow(i, 'category', e.target.value)}
                className="text-sm px-3 py-2 rounded-lg border w-full"
                style={{ borderColor: 'var(--gray-200)', color: 'var(--gray-600)' }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <select
                value={row.affiliateProgram}
                onChange={(e) => updateRow(i, 'affiliateProgram', e.target.value)}
                className="text-sm px-3 py-2 rounded-lg border w-full"
                style={{ borderColor: 'var(--gray-200)', color: 'var(--gray-600)' }}
              >
                {PROGRAMS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            {rows.length > 1 && (
              <button
                onClick={() => removeRow(i)}
                className="text-sm px-2 py-2 rounded-lg cursor-pointer flex-shrink-0"
                style={{ color: '#DC2626' }}
                title="Rimuovi"
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-4 pt-4 border-t" style={{ borderColor: 'var(--gray-100)' }}>
        <button
          onClick={addRow}
          className="text-sm px-3 py-1.5 rounded-lg font-medium cursor-pointer"
          style={{ background: 'var(--gray-50)', color: 'var(--gray-600)' }}
        >
          + Aggiungi riga
        </button>
        <div className="flex-1" />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="text-sm px-5 py-2 rounded-lg font-semibold cursor-pointer disabled:opacity-50"
          style={{ background: 'var(--sage-500)', color: 'var(--white)' }}
        >
          {loading ? 'Inserimento...' : `Inserisci ${rows.filter((r) => r.affiliateLink.trim()).length} prodotti`}
        </button>
      </div>

      {/* Result message */}
      {result && (
        <div
          className="mt-3 px-4 py-2 rounded-lg text-sm font-medium"
          style={{
            background: result.success ? 'var(--sage-50)' : '#FEF2F2',
            color: result.success ? 'var(--sage-700)' : '#991B1B',
          }}
        >
          {result.message}
        </div>
      )}
    </div>
  );
}

function extractNameFromUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace('www.', '').split('.')[0] || 'Prodotto';
    return hostname.charAt(0).toUpperCase() + hostname.slice(1);
  } catch {
    return 'Prodotto';
  }
}
