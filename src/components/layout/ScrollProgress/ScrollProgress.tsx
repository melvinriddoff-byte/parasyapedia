import { useEffect, useRef } from 'react';
import { clamp } from '@/utils/math';
import './ScrollProgress.css';

/** Thin saffron bar at the top of the screen that fills as you scroll. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (ref.current) ref.current.style.transform = `scaleX(${clamp(window.scrollY / max, 0, 1)})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return <div className="progress" ref={ref} aria-hidden="true" />;
}
