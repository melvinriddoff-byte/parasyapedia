import { useEffect } from 'react';

let locks = 0;

/** Stops the page from scrolling while `active` is true (menu, modal). Safe to use in several places at once. */
export function useBodyLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    locks += 1;
    document.documentElement.classList.add('lock');
    return () => {
      locks = Math.max(0, locks - 1);
      if (locks === 0) document.documentElement.classList.remove('lock');
    };
  }, [active]);
}
