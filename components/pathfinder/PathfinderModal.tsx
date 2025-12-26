'use client';

import { useState } from 'react';
import { UserGoal, goalOptions, getPathForGoal } from '@/lib/pathfinder';
import { PathfinderResults } from './PathfinderResults';

interface PathfinderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PathfinderModal({ isOpen, onClose }: PathfinderModalProps) {
  const [selectedGoal, setSelectedGoal] = useState<UserGoal | null>(null);
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const handleGoalSelect = (goal: UserGoal) => {
    setSelectedGoal(goal);
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedGoal(null);
    setShowResults(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {showResults ? 'Il Tuo Percorso WellTech' : 'Qual è il tuo obiettivo?'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {showResults
                ? 'Abbiamo creato un percorso personalizzato per te'
                : 'Scegli l\'obiettivo che ti sta più a cuore'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            aria-label="Chiudi"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showResults ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goalOptions.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalSelect(goal.id)}
                  className="group relative p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-[var(--sage-500)] dark:hover:border-[var(--sage-400)] transition-all duration-200 text-left bg-white dark:bg-gray-800 hover:shadow-lg hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{goal.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[var(--sage-600)] dark:group-hover:text-[var(--sage-400)] transition-colors">
                        {goal.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {goal.description}
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-[var(--sage-500)] transition-colors">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : selectedGoal ? (
            <PathfinderResults
              path={getPathForGoal(selectedGoal)}
              onReset={handleReset}
            />
          ) : null}
        </div>

        {/* Footer */}
        {!showResults && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              💡 Puoi cambiare obiettivo in qualsiasi momento
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

