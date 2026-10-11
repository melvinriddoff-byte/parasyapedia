import { useLayoutEffect, type RefObject } from 'react';

/**
 * Shrinks a heading's font size if any of its words are wider than the container.
 * Words are measured with `wordSelector` (they must be inline-block and nowrap).
 */
export function useShrinkToFit(
  textRef: RefObject<HTMLElement>,
  containerRef: RefObject<HTMLElement>,
  wordSelector: string,
): void {
  useLayoutEffect(() => {
    const text = textRef.current;
    const container = containerRef.current;
    if (!text || !container) return;

    const run = () => {
      text.style.fontSize = '';
      const available = container.clientWidth;
      if (available <= 0) return;
      let widest = 0;
      text.querySelectorAll<HTMLElement>(wordSelector).forEach((word) => {
        widest = Math.max(widest, word.offsetWidth);
      });
      if (widest > available) {
        const current = parseFloat(getComputedStyle(text).fontSize);
        text.style.fontSize = `${(current * available * 0.97) / widest}px`;
      }
    };

    run();
    window.addEventListener('resize', run);
    void document.fonts?.ready.then(run);
    return () => window.removeEventListener('resize', run);
  }, [textRef, containerRef, wordSelector]);
}

/** Sizes a single-line wordmark so it exactly spans its parent's content width. */
export function useFitWidth(ref: RefObject<HTMLElement>): void {
  useLayoutEffect(() => {
    const element = ref.current;
    const parent = element?.parentElement;
    if (!element || !parent) return;

    const run = () => {
      const style = getComputedStyle(parent);
      const available =
        parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      element.style.fontSize = '100px';
      const natural = element.offsetWidth;
      if (natural > 0 && available > 0) {
        element.style.fontSize = `${(100 * available * 0.995) / natural}px`;
      }
    };

    run();
    window.addEventListener('resize', run);
    void document.fonts?.ready.then(run);
    return () => window.removeEventListener('resize', run);
  }, [ref]);
}
