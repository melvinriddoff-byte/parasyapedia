import { useEffect, type RefObject } from 'react';
import { lerp } from '@/utils/math';
import { getPointer } from './pointerStore';
import { useFinePointer } from './useFinePointer';
import { useReducedMotion } from './useReducedMotion';

/** Gentle drift that follows the pointer (used for the artwork in page headers). */
export function useParallax(ref: RefObject<HTMLElement>, strength = { x: 16, y: 12 }): void {
  const fine = useFinePointer();
  const reduce = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || !fine || reduce) return;
    const pointer = getPointer();
    let cx = 0;
    let cy = 0;
    let frame = 0;

    const loop = () => {
      cx = lerp(cx, pointer.x, 0.08);
      cy = lerp(cy, pointer.y, 0.08);
      if (window.scrollY < window.innerHeight * 1.2) {
        element.style.transform = `translate3d(${cx * strength.x}px, ${cy * strength.y}px, 0)`;
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      element.style.transform = '';
    };
  }, [ref, fine, reduce, strength.x, strength.y]);
}
