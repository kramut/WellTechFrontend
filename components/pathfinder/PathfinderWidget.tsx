'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PathfinderModal } from './PathfinderModal';

export function PathfinderWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mt-8 mb-6">
        <Button
          variant="affiliate"
          size="lg"
          onClick={() => setIsModalOpen(true)}
          className="group relative overflow-hidden bg-gradient-to-r from-[var(--sage-500)] via-[var(--teal-500)] to-[var(--sage-500)] hover:from-[var(--sage-600)] hover:via-[var(--teal-600)] hover:to-[var(--sage-600)] text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-2xl">🧭</span>
            <span>Scopri il Tuo Percorso WellTech</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </Button>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center">
          Rispondi a 2 domande e ricevi un percorso personalizzato
        </p>
      </div>

      <PathfinderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}





