'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Mock guides as fallback
const mockGuides = [
  {
    id: 10001,
    title: 'Migliora il Sonno in 7 Giorni',
    slug: 'migliora-sonno-7-giorni',
    description: 'Un percorso guidato per ottimizzare la qualità del sonno attraverso abitudini, ambiente e integratori naturali.',
    duration: '7 giorni',
    difficulty: 'Facile',
    category: 'Wellbeing',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop',
    productIds: [4, 5],
    articleIds: [3],
  },
  {
    id: 10002,
    title: 'Alimentazione Consapevole: 30 Giorni',
    slug: 'alimentazione-consapevole-30-giorni',
    description: 'Trasforma la tua relazione con il cibo e scopri come nutrirti in modo consapevole per energia e benessere ottimali.',
    duration: '30 giorni',
    difficulty: 'Media',
    category: 'Nutrition',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
    productIds: [1, 6, 10],
    articleIds: [4, 6],
  },
  {
    id: 10003,
    title: 'Home Fitness: Costruisci il Tuo Corpo',
    slug: 'home-fitness-costruisci-corpo',
    description: 'Programma completo di 12 settimane per allenarsi efficacemente a casa, senza attrezzi costosi.',
    duration: '12 settimane',
    difficulty: 'Media',
    category: 'Fitness',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    productIds: [2, 11, 12],
    articleIds: [7, 8, 9],
  },
  {
    id: 10004,
    title: 'Mindfulness Quotidiana',
    slug: 'mindfulness-quotidiana',
    description: 'Impara la meditazione mindfulness con sessioni giornaliere progressive. Perfetto per principianti.',
    duration: '21 giorni',
    difficulty: 'Facile',
    category: 'Mindset',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    productIds: [3, 17, 18],
    articleIds: [2, 11],
  },
  {
    id: 10005,
    title: 'Sistema di Produttività Personale',
    slug: 'sistema-produttivita-personale',
    description: 'Costruisci il tuo sistema di produttività con time blocking, deep work e gestione delle priorità.',
    duration: '14 giorni',
    difficulty: 'Media',
    category: 'Productivity',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    productIds: [19, 20, 21],
    articleIds: [12, 13, 14],
  },
  {
    id: 10006,
    title: 'Primi Passi negli Investimenti',
    slug: 'primi-passi-investimenti',
    description: 'Guida pratica per iniziare a investire. Dalle basi alla creazione del tuo primo portafoglio.',
    duration: '4 settimane',
    difficulty: 'Media',
    category: 'Wealth',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    productIds: [23, 24, 25],
    articleIds: [16, 17, 18],
  },
];

interface Guide {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: string | null;
  difficulty: string | null;
  category: string;
  imageUrl: string | null;
  productIds: number[];
  articleIds: number[];
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGuides() {
      let apiGuides: Guide[] = [];
      try {
        const res = await fetch(`${API_BASE_URL}/api/guides`);
        if (res.ok) {
          apiGuides = await res.json();
        }
      } catch {
        // API not available
      }

      // Merge real guides with mock (avoid duplicates by category)
      const apiCategories = new Set(apiGuides.map((g) => g.category));
      const filteredMock = mockGuides.filter((m) => !apiCategories.has(m.category));

      setGuides([...apiGuides, ...filteredMock] as Guide[]);
      setLoading(false);
    }
    loadGuides();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="inline-block w-8 h-8 border-3 border-t-transparent rounded-full animate-spin"
          style={{ borderColor: 'var(--sage-300)', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--off-white)] dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Guide Pratiche
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Percorsi guidati step-by-step per raggiungere i tuoi obiettivi di benessere e crescita
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Card key={guide.id} href={`/guide/${guide.slug}`}>
              <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                {guide.imageUrl && (
                  <img
                    src={guide.imageUrl}
                    alt={guide.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="category">{guide.category}</Badge>
                  {guide.difficulty && <Badge variant="default">{guide.difficulty}</Badge>}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {guide.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {guide.duration && `⏱️ ${guide.duration}`}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    {guide.productIds.length > 0 && (
                      <span>{guide.productIds.length} prodotti</span>
                    )}
                    {guide.articleIds.length > 0 && (
                      <span>· {guide.articleIds.length} articoli</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
