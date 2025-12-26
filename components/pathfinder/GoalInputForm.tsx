'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { suggestPathFromText } from '@/lib/pathfinderAnalyzer';
import { PersonalizedPath } from '@/lib/pathfinder';
import { PathfinderResults } from './PathfinderResults';

interface GoalInputFormProps {
  onPathSelected?: (path: PersonalizedPath) => void;
}

export function GoalInputForm({ onPathSelected }: GoalInputFormProps) {
  const [userText, setUserText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestedPath, setSuggestedPath] = useState<PersonalizedPath | null>(null);
  const [suggestionReason, setSuggestionReason] = useState('');
  const [confidence, setConfidence] = useState(0);

  const handleAnalyze = useCallback(async () => {
    if (!userText.trim()) return;

    setIsAnalyzing(true);
    
    // Simula un piccolo delay per UX migliore
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = suggestPathFromText(userText);
    setSuggestedPath(result.path);
    setSuggestionReason(result.reason);
    setConfidence(result.confidence);
    setIsAnalyzing(false);

    if (onPathSelected) {
      onPathSelected(result.path);
    }
  }, [userText, onPathSelected]);

  const handleReset = () => {
    setUserText('');
    setSuggestedPath(null);
    setSuggestionReason('');
    setConfidence(0);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[var(--sage-50)] via-white to-[var(--teal-50)] dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl p-8 border-2 border-[var(--sage-200)] dark:border-[var(--sage-700)]">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🎯 Raccontami il Tuo Obiettivo
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Descrivi cosa vorresti raggiungere e ti suggeriremo il percorso più adatto per te
          </p>
        </div>

        <div className="space-y-4">
          <textarea
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            placeholder="Esempio: 'Vorrei riconquistare la fiducia in me stesso e tornare con la mia ragazza' o 'Voglio avere più energia durante la giornata'..."
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-[var(--sage-500)] focus:outline-none focus:ring-2 focus:ring-[var(--sage-500)]/20 dark:bg-gray-800 dark:text-white resize-none"
            rows={4}
            disabled={isAnalyzing}
          />

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {userText.length} caratteri
            </p>
            <div className="flex gap-2">
              {suggestedPath && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              )}
              <Button
                variant="primary"
                size="lg"
                onClick={handleAnalyze}
                disabled={!userText.trim() || isAnalyzing}
              >
                {isAnalyzing ? 'Analizzando...' : 'Trova il Mio Percorso'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestion Result */}
      {suggestedPath && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Percorso Suggerito
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {suggestionReason}
                </p>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400">Confidenza:</span>
                    <div className="flex-1 bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {Math.round(confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <PathfinderResults path={suggestedPath} />
        </div>
      )}
    </div>
  );
}





