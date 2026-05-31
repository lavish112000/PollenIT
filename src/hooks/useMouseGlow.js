import { useCallback } from 'react';
import { useMotionPreference } from './useMotionPreference.jsx';

export function useMouseGlow() {
  const { isReducedMotion } = useMotionPreference();

  return useCallback(
    (event) => {
      if (isReducedMotion) {
        return;
      }

      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      target.style.setProperty('--glow-x', `${x}%`);
      target.style.setProperty('--glow-y', `${y}%`);
    },
    [isReducedMotion],
  );
}
