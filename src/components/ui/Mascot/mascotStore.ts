import { useEffect, useSyncExternalStore, type RefObject } from 'react';

/**
 * Only one mascot is shown on screen at a time. Every mascot reports whether it is in view;
 * the visible one with the lowest priority number wins (page transition first, then the page's own mascot).
 */
interface Entry {
  visible: boolean;
  priority: number;
}

const entries = new Map<string, Entry>();
const listeners = new Set<() => void>();
let version = 0;

const emit = () => {
  version += 1;
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const isActive = (id: string): boolean => {
  const mine = entries.get(id);
  if (!mine?.visible) return false;
  for (const [otherId, other] of entries) {
    if (otherId !== id && other.visible && other.priority < mine.priority) return false;
  }
  return true;
};

/** Returns true when this mascot is the one that should be drawn. */
export function useSoloMascot(id: string, priority: number, ref: RefObject<Element>): boolean {
  useEffect(() => {
    const element = ref.current;
    entries.set(id, { visible: false, priority });
    if (!element || typeof IntersectionObserver === 'undefined') {
      entries.set(id, { visible: true, priority });
      emit();
      return () => {
        entries.delete(id);
        emit();
      };
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        entries.set(id, { visible: entry.isIntersecting, priority });
        emit();
      },
      { threshold: 0.35 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      entries.delete(id);
      emit();
    };
  }, [id, priority, ref]);

  useSyncExternalStore(subscribe, () => version);
  return isActive(id);
}
