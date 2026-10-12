import { useEffect } from 'react';

let locks = 0;
let savedY = 0;

/**
 * Stops the page from scrolling while `active` is true (menu, modal). Safe to use in several places
 * at once. `overflow: hidden` alone does not stop iOS Safari from scrolling the page behind a menu,
 * so the page is also pinned in place and its scroll position restored afterwards.
 */
export function useBodyLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    if (locks === 0) {
      savedY = window.scrollY;
      root.classList.add('lock');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
    }
    locks += 1;
    return () => {
      locks = Math.max(0, locks - 1);
      if (locks === 0) {
        root.classList.remove('lock');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        window.scrollTo({ top: savedY, left: 0, behavior: 'instant' });
      }
    };
  }, [active]);
}
