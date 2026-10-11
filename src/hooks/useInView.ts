import { useEffect, useState, type RefObject } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
  /** When true, stays true after the first time the element is seen. */
  once?: boolean;
}

/** Returns whether the referenced element is visible in the viewport. */
export function useInView<T extends Element>(
  ref: RefObject<T>,
  { threshold = 0.2, rootMargin, once = false }: Options = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, once]);

  return inView;
}
