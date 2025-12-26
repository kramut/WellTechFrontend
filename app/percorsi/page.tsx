'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PathCard } from '@/components/pathfinder/PathCard';
import { GoalInputForm } from '@/components/pathfinder/GoalInputForm';
import { PathfinderResults } from '@/components/pathfinder/PathfinderResults';
import { goalOptions, getPathForGoal, UserGoal } from '@/lib/pathfinder';
import { PersonalizedPath } from '@/lib/pathfinder';
import { PathfinderModal } from '@/components/pathfinder/PathfinderModal';
import { Button } from '@/components/ui/Button';

function PercorsiContent() {
  const searchParams = useSearchParams();
  const goalParam = searchParams.get('goal') as UserGoal | null;
  
  const [selectedPath, setSelectedPath] = useState<PersonalizedPath | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<UserGoal | null>(goalParam);

  useEffect(() => {
    if (goalParam) {
      const path = getPathForGoal(goalParam);
      setSelectedPath(path);
      setSelectedGoal(goalParam);
    }
  }, [goalParam]);

  const handlePathSelect = (goal: UserGoal) => {
    const path = getPathForGoal(goal);
    setSelectedPath(path);
    setSelectedGoal(goal);
    // Scroll to results
    setTimeout(() => {
      document.getElementById('path-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCustomPath = (path: PersonalizedPath) => {
    setSelectedPath(path);
    setTimeout(() => {
      document.getElementById('path-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[var(--off-white)] dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--sage-50)] via-white to-[var(--teal-50)] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[var(--sage-600)] via-[var(--teal-600)] to-[var(--sage-600)] bg-clip-text text-transparent">
              I Tuoi Percorsi Personalizzati
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Scegli un percorso predefinito o descrivi il tuo obiettivo. 
              Ti guideremo passo dopo passo verso il tuo benessere.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Goal Input */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <GoalInputForm onPathSelected={handleCustomPath} />
        </div>
      </section>

      {/* All Paths Grid */}
      <section className="py-16 bg-[var(--off-white)] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Percorsi Predefiniti
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Esplora i nostri percorsi curati, ognuno progettato per un obiettivo specifico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goalOptions.map((goal) => (
              <PathCard
                key={goal.id}
                goal={goal.id}
                onClick={() => handlePathSelect(goal.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Selected Path Results */}
      {selectedPath && (
        <section id="path-results" className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Il Tuo Percorso
              </h2>
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setSelectedPath(null);
                  setSelectedGoal(null);
                }}
              >
                Scegli un Altro Percorso
              </Button>
            </div>
            <PathfinderResults path={selectedPath} />
          </div>
        </section>
      )}

      {/* Modal for quick selection */}
      <PathfinderModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default function PercorsiPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--off-white)] dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--sage-500)] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Caricamento percorsi...</p>
        </div>
      </div>
    }>
      <PercorsiContent />
    </Suspense>
  );
}

