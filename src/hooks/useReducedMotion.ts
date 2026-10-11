import { useMediaQuery } from './useMediaQuery';

/** True when the visitor asks the OS for reduced motion. */
export const useReducedMotion = (): boolean => useMediaQuery('(prefers-reduced-motion: reduce)');
