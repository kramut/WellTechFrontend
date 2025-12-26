'use client';

import { PersonalizedPath } from '@/lib/pathfinder';
import { PathStep } from './PathStep';
import { Button } from '@/components/ui/Button';

interface PathfinderResultsProps {
  path: PersonalizedPath;
  onReset?: () => void;
}

export function PathfinderResults({ path, onReset }: PathfinderResultsProps) {
  const colorClasses = {
    sage: 'from-[var(--sage-500)] to-[var(--sage-600)]',
    gold: 'from-[var(--gold-500)] to-[var(--gold-600)]',
    orange: 'from-[var(--orange-500)] to-[var(--orange-600)]',
    teal: 'from-[var(--teal-500)] to-[var(--teal-600)]',
  };

  const bgColorClasses = {
    sage: 'bg-[var(--sage-50)] dark:bg-[var(--sage-900)]/20',
    gold: 'bg-[var(--gold-50)] dark:bg-[var(--gold-900)]/20',
    orange: 'bg-[var(--orange-50)] dark:bg-[var(--orange-900)]/20',
    teal: 'bg-[var(--teal-50)] dark:bg-[var(--teal-900)]/20',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`rounded-xl p-6 ${bgColorClasses[path.color as keyof typeof bgColorClasses]}`}>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {path.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {path.description}
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>⏱️</span>
            <span>Durata stimata: <strong>{path.estimatedDuration}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>📚</span>
            <span><strong>{path.steps.length}</strong> step nel percorso</span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-0">
        {path.steps.map((step, index) => (
          <PathStep
            key={step.order}
            step={step}
            stepNumber={step.order}
            totalSteps={path.steps.length}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            💡 Inizia dal primo step e procedi in ordine per massimizzare i risultati
          </p>
          {onReset && (
            <Button
              variant="secondary"
              size="md"
              onClick={onReset}
            >
              Scegli un Altro Obiettivo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}





