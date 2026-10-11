import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Smooth filtering: when `target` changes, the list fades out, the visible set swaps,
 * then it fades back in. Use `shown` to decide what to display and `fading` for the CSS class.
 */
export function useFadeFilter<T extends string>(target: T, delay = 220): { shown: T; fading: boolean } {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState<T>(target);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (target === shown) return;
    if (reduce) {
      setShown(target);
      return;
    }
    setFading(true);
    const timer = window.setTimeout(() => {
      setShown(target);
      setFading(false);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [target, shown, reduce, delay]);

  return { shown, fading };
}
