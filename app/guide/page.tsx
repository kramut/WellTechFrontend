import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const guides = [
  {
    id: 1,
    title: 'Migliora il Sonno in 7 Giorni',
    description: 'Un percorso guidato per ottimizzare la qualità del sonno attraverso abitudini, ambiente e integratori naturali.',
    duration: '7 giorni',
    difficulty: 'Facile',
    category: 'Wellbeing',
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    title: 'Alimentazione Consapevole: 30 Giorni',
    description: 'Trasforma la tua relazione con il cibo e scopri come nutrirti in modo consapevole per energia e benessere ottimali.',
    duration: '30 giorni',
    difficulty: 'Media',
    category: 'Nutrition',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    title: 'Home Fitness: Costruisci il Tuo Corpo',
    description: 'Programma completo di 12 settimane per allenarsi efficacemente a casa, senza attrezzi costosi.',
    duration: '12 settimane',
    difficulty: 'Media',
    category: 'Fitness',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    title: 'Mindfulness Quotidiana',
    description: 'Impara la meditazione mindfulness con sessioni giornaliere progressive. Perfetto per principianti.',
    duration: '21 giorni',
    difficulty: 'Facile',
    category: 'Mindset',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    title: 'Sistema di Produttività Personale',
    description: 'Costruisci il tuo sistema di produttività con time blocking, deep work e gestione delle priorità.',
    duration: '14 giorni',
    difficulty: 'Media',
    category: 'Productivity',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    title: 'Primi Passi negli Investimenti',
    description: 'Guida pratica per iniziare a investire. Dalle basi alla creazione del tuo primo portafoglio.',
    duration: '4 settimane',
    difficulty: 'Media',
    category: 'Wealth',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
];

export default function GuidesPage() {
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
            <Card key={guide.id} href={`/guide/${guide.id}`}>
              <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                <img
                  src={guide.imageUrl}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="category">{guide.category}</Badge>
                  <Badge variant="default">{guide.difficulty}</Badge>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {guide.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {guide.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ⏱️ {guide.duration}
                  </span>
                  <Button variant="tertiary" size="sm">
                    Inizia →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}





