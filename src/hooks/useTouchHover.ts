import { useEffect } from 'react';

/** Elements whose hover effect should also play on touch screens. */
const SELECTOR = '.svc a, .card';

/**
 * Touch screens have no hover, so hover-only effects (colour changes, lifts) never showed on phones.
 * On touch devices this adds `.is-hover` to the matching elements that are in the middle band of
 * the screen, and the stylesheets give `.is-hover` the same look as `:hover`.
 * Call it with a value that changes on navigation (the pathname) so new pages get picked up.
 */
export function useTouchHover(key: string): void {
  useEffect(() => {
    if (!window.matchMedia('(hover: none)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('is-hover', entry.isIntersecting)),
      { rootMargin: '-40% 0px -40% 0px' },
    );
    const timer = window.setTimeout(() => {
      document.querySelectorAll(SELECTOR).forEach((element) => observer.observe(element));
    }, 150);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [key]);
}
