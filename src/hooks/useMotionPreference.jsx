import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const MotionPreferenceContext = createContext(null);

function readInitialPreference() {
  if (typeof window === 'undefined') {
    return false;
  }

  const stored = window.localStorage.getItem('pollenit-reduced-motion');
  if (stored !== null) {
    return stored === 'true';
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function MotionPreferenceProvider({ children }) {
  const [isReducedMotion, setIsReducedMotion] = useState(readInitialPreference);

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(isReducedMotion);
    window.localStorage.setItem(
      'pollenit-reduced-motion',
      String(isReducedMotion),
    );
  }, [isReducedMotion]);

  const toggleMotion = useCallback(() => {
    setIsReducedMotion((current) => !current);
  }, []);

  const value = useMemo(
    () => ({ isReducedMotion, setIsReducedMotion, toggleMotion }),
    [isReducedMotion, toggleMotion],
  );

  return (
    <MotionPreferenceContext.Provider value={value}>
      {children}
    </MotionPreferenceContext.Provider>
  );
}

export function useMotionPreference() {
  const context = useContext(MotionPreferenceContext);
  if (!context) {
    throw new Error(
      'useMotionPreference must be used inside MotionPreferenceProvider',
    );
  }

  return context;
}
