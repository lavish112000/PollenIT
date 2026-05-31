import { Accessibility, Sparkles } from 'lucide-react';
import { cn } from '../utils/cn.js';
import { useMotionPreference } from '../hooks/useMotionPreference.jsx';

export default function MotionToggle({ compact = false }) {
  const { isReducedMotion, toggleMotion } = useMotionPreference();
  const Icon = isReducedMotion ? Accessibility : Sparkles;

  return (
    <button
      type="button"
      onClick={toggleMotion}
      aria-pressed={isReducedMotion}
      aria-label={
        isReducedMotion
          ? 'Enable full motion effects'
          : 'Reduce motion effects'
      }
      title={isReducedMotion ? 'Enable motion' : 'Reduce motion'}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] text-sm font-semibold text-white/82 shadow-glow backdrop-blur-md transition hover:border-plasma/45 hover:text-white',
        compact ? 'w-10 px-0' : 'px-4',
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {!compact && (
        <span>{isReducedMotion ? 'Reduced Motion' : 'Motion On'}</span>
      )}
    </button>
  );
}
