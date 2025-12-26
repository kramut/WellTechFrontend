import Link from 'next/link';
import { UserGoal, goalOptions, getPathForGoal } from '@/lib/pathfinder';
import { Badge } from '@/components/ui/Badge';

interface PathCardProps {
  goal: UserGoal;
  onClick?: () => void;
}

export function PathCard({ goal, onClick }: PathCardProps) {
  const goalOption = goalOptions.find(g => g.id === goal);
  const path = getPathForGoal(goal);

  if (!goalOption) return null;

  const colorClasses = {
    sage: 'from-[var(--sage-500)] to-[var(--sage-600)] border-[var(--sage-200)] hover:border-[var(--sage-400)]',
    gold: 'from-[var(--gold-500)] to-[var(--gold-600)] border-[var(--gold-200)] hover:border-[var(--gold-400)]',
    orange: 'from-[var(--orange-500)] to-[var(--orange-600)] border-[var(--orange-200)] hover:border-[var(--orange-400)]',
    teal: 'from-[var(--teal-500)] to-[var(--teal-600)] border-[var(--teal-200)] hover:border-[var(--teal-400)]',
  };

  const bgColorClasses = {
    sage: 'bg-[var(--sage-50)] dark:bg-[var(--sage-900)]/20',
    gold: 'bg-[var(--gold-50)] dark:bg-[var(--gold-900)]/20',
    orange: 'bg-[var(--orange-50)] dark:bg-[var(--orange-900)]/20',
    teal: 'bg-[var(--teal-50)] dark:bg-[var(--teal-900)]/20',
  };

  const color = goalOption.color as keyof typeof colorClasses;
  const borderClass = colorClasses[color]?.split(' ')[2] || 'border-[var(--sage-200)]';
  const hoverBorderClass = colorClasses[color]?.split(' ')[3] || 'hover:border-[var(--sage-400)]';
  const bgClass = bgColorClasses[color] || bgColorClasses.sage;

  const content = (
    <div className={`group relative p-6 rounded-xl border-2 ${borderClass} ${hoverBorderClass} transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer h-full flex flex-col ${bgClass}`}>
      {/* Icon */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-5xl">{goalOption.icon}</span>
        <span className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
          →
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[var(--sage-600)] dark:group-hover:text-[var(--sage-400)] transition-colors">
        {goalOption.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
        {goalOption.description}
      </p>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="flex items-center gap-1">
          <span>⏱️</span>
          <span>{path.estimatedDuration}</span>
        </span>
        <span className="flex items-center gap-1">
          <span>📚</span>
          <span>{path.steps.length} step</span>
        </span>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick}>
        {content}
      </div>
    );
  }

  return (
    <Link href={`/percorsi?goal=${goal}`}>
      {content}
    </Link>
  );
}

