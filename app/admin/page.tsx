'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface DashboardStats {
  candidates: { total: number; pending: number; approved: number; rejected: number; content_generated: number; analyzed: number };
  articles: { total: number; published: number; draft: number; totalViews: number };
  videos: { total: number; withUrl: number; totalTiktokViews: number };
  products: { total: number };
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function AdminOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [candidatesRaw, articlesRaw, videosRaw, productsRaw] = await Promise.allSettled([
          fetchJson<any[]>(`${API_BASE_URL}/api/product-candidates`),
          fetchJson<any[]>(`${API_BASE_URL}/api/articles`),
          fetchJson<any[]>(`${API_BASE_URL}/api/videos`),
          fetchJson<any[]>(`${API_BASE_URL}/api/products`),
        ]);

        const candidates = candidatesRaw.status === 'fulfilled' ? candidatesRaw.value : [];
        const articles = articlesRaw.status === 'fulfilled' ? articlesRaw.value : [];
        const videos = videosRaw.status === 'fulfilled' ? videosRaw.value : [];
        const products = productsRaw.status === 'fulfilled' ? productsRaw.value : [];

        // Ensure arrays
        const cArr = Array.isArray(candidates) ? candidates : [];
        const aArr = Array.isArray(articles) ? articles : [];
        const vArr = Array.isArray(videos) ? videos : [];
        const pArr = Array.isArray(products) ? products : [];

        setStats({
          candidates: {
            total: cArr.length,
            pending: cArr.filter((c: any) => c.status === 'pending').length,
            approved: cArr.filter((c: any) => c.status === 'approved').length,
            rejected: cArr.filter((c: any) => c.status === 'rejected').length,
            content_generated: cArr.filter((c: any) => c.status === 'content_generated').length,
            analyzed: cArr.filter((c: any) => c.analysisStatus === 'completed').length,
          },
          articles: {
            total: aArr.length,
            published: aArr.filter((a: any) => a.publishedAt).length,
            draft: aArr.filter((a: any) => !a.publishedAt).length,
            totalViews: aArr.reduce((sum: number, a: any) => sum + (a.views || 0), 0),
          },
          videos: {
            total: vArr.length,
            withUrl: vArr.filter((v: any) => v.videoUrl).length,
            totalTiktokViews: vArr.reduce((sum: number, v: any) => sum + (v.tiktokViews || 0), 0),
          },
          products: {
            total: pArr.length,
          },
        });
      } catch {
        // fallback empty stats
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div
          className="inline-block w-8 h-8 border-3 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: 'var(--sage-300)', borderTopColor: 'transparent' }}
        />
        <p className="mt-3 text-sm" style={{ color: 'var(--gray-400)' }}>Caricamento dashboard...</p>
      </div>
    );
  }

  const s = stats;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--gray-800)' }}>
          Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--gray-400)' }}>
          Panoramica del sistema WellTech
        </p>
      </div>

      {/* Pipeline Overview */}
      <div
        className="rounded-xl border p-5 mb-8"
        style={{ background: 'var(--white)', borderColor: 'var(--gray-100)' }}
      >
        <h2 className="font-semibold mb-4" style={{ color: 'var(--gray-700)' }}>
          Pipeline Contenuti
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <PipelineStep
            label="Link inseriti"
            count={s?.candidates.total ?? 0}
            color="var(--gray-500)"
            bg="var(--gray-50)"
          />
          <Arrow />
          <PipelineStep
            label="Analizzati AI"
            count={s?.candidates.analyzed ?? 0}
            color="var(--teal-700)"
            bg="var(--teal-50)"
          />
          <Arrow />
          <PipelineStep
            label="Contenuti generati"
            count={s?.candidates.content_generated ?? 0}
            color="var(--orange-700)"
            bg="var(--orange-50)"
          />
          <Arrow />
          <PipelineStep
            label="Approvati"
            count={s?.candidates.approved ?? 0}
            color="var(--sage-700)"
            bg="var(--sage-50)"
          />
          <Arrow />
          <PipelineStep
            label="Articoli"
            count={s?.articles.total ?? 0}
            color="var(--sage-700)"
            bg="var(--sage-100)"
          />
          <Arrow />
          <PipelineStep
            label="Video"
            count={s?.videos.total ?? 0}
            color="var(--teal-700)"
            bg="var(--teal-100)"
          />
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Candidati Prodotto"
          value={s?.candidates.total ?? 0}
          subtitle={`${s?.candidates.pending ?? 0} in attesa`}
          color="var(--gold-600)"
          bg="var(--gold-50)"
          href="/admin/candidates"
        />
        <StatCard
          title="Articoli"
          value={s?.articles.total ?? 0}
          subtitle={`${s?.articles.published ?? 0} pubblicati, ${s?.articles.draft ?? 0} bozze`}
          color="var(--sage-600)"
          bg="var(--sage-50)"
          href="/admin/articles"
        />
        <StatCard
          title="Video Script"
          value={s?.videos.total ?? 0}
          subtitle={`${s?.videos.withUrl ?? 0} con video`}
          color="var(--teal-600)"
          bg="var(--teal-50)"
          href="/admin/videos"
        />
        <StatCard
          title="Prodotti Catalogo"
          value={s?.products.total ?? 0}
          subtitle="prodotti approvati"
          color="var(--orange-600)"
          bg="var(--orange-50)"
          href="/admin/candidates"
        />
      </div>

      {/* Performance row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <MiniStat label="Views Articoli" value={formatNumber(s?.articles.totalViews ?? 0)} icon="eye" />
        <MiniStat label="TikTok Views" value={formatNumber(s?.videos.totalTiktokViews ?? 0)} icon="play" />
        <MiniStat label="Rifiutati" value={String(s?.candidates.rejected ?? 0)} icon="x" />
      </div>

      {/* Quick Actions */}
      <div
        className="rounded-xl border p-5"
        style={{ background: 'var(--white)', borderColor: 'var(--gray-100)' }}
      >
        <h2 className="font-semibold mb-4" style={{ color: 'var(--gray-700)' }}>
          Azioni Rapide
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/candidates"
            className="text-sm px-4 py-2.5 rounded-lg font-medium no-underline"
            style={{ background: 'var(--sage-500)', color: 'var(--white)' }}
          >
            + Aggiungi Prodotti
          </Link>
          <Link
            href="/admin/articles"
            className="text-sm px-4 py-2.5 rounded-lg font-medium no-underline"
            style={{ background: 'var(--teal-100)', color: 'var(--teal-700)' }}
          >
            Gestisci Articoli
          </Link>
          <Link
            href="/admin/videos"
            className="text-sm px-4 py-2.5 rounded-lg font-medium no-underline"
            style={{ background: 'var(--orange-100)', color: 'var(--orange-700)' }}
          >
            Gestisci Video
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ---- Sub-components ---- */

function StatCard({ title, value, subtitle, color, bg, href }: {
  title: string; value: number; subtitle: string; color: string; bg: string; href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border p-5 transition-shadow hover:shadow-md no-underline block"
      style={{ background: 'var(--white)', borderColor: 'var(--gray-100)' }}
    >
      <p className="text-sm font-medium mb-1" style={{ color: 'var(--gray-400)' }}>{title}</p>
      <p className="text-3xl font-bold" style={{ color }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: 'var(--gray-300)' }}>{subtitle}</p>
    </Link>
  );
}

function PipelineStep({ label, count, color, bg }: { label: string; count: number; color: string; bg: string }) {
  return (
    <div className="flex flex-col items-center text-center min-w-[90px] px-3 py-2 rounded-lg" style={{ background: bg }}>
      <span className="text-xl font-bold" style={{ color }}>{count}</span>
      <span className="text-xs mt-0.5" style={{ color: 'var(--gray-400)' }}>{label}</span>
    </div>
  );
}

function Arrow() {
  return (
    <span className="text-lg flex-shrink-0" style={{ color: 'var(--gray-300)' }}>→</span>
  );
}

function MiniStat({ label, value, icon }: { label: string; value: string; icon: string }) {
  const icons: Record<string, string> = { eye: '👁', play: '▶', x: '✕' };
  return (
    <div
      className="rounded-xl border p-4 flex items-center gap-3"
      style={{ background: 'var(--white)', borderColor: 'var(--gray-100)' }}
    >
      <span className="text-xl">{icons[icon] || '•'}</span>
      <div>
        <p className="text-lg font-bold" style={{ color: 'var(--gray-700)' }}>{value}</p>
        <p className="text-xs" style={{ color: 'var(--gray-400)' }}>{label}</p>
      </div>
    </div>
  );
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}
