import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cx } from '@/utils/cx';
import './Marquee.css';

interface MarqueeProps {
  children: ReactNode;
  /** Milliseconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * An endless horizontal ticker. It repeats its children until they fill the screen,
 * and speeds up while the page is being scrolled.
 */
export function Marquee({ children, duration = 30000, reverse = false, className }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [repeat, setRepeat] = useState(1);

  // Repeat the content enough times to be wider than the screen.
  useLayoutEffect(() => {
    if (reduce) return;
    const fit = () => {
      const group = groupRef.current;
      if (!group || group.scrollWidth === 0) return;
      const single = group.scrollWidth / repeat;
      const needed = Math.max(1, Math.ceil((window.innerWidth * 1.15) / single));
      if (needed !== repeat) setRepeat(needed);
    };
    fit();
    window.addEventListener('resize', fit);
    void document.fonts?.ready.then(fit);
    return () => window.removeEventListener('resize', fit);
  }, [repeat, reduce]);

  // Run the loop and tie its speed to scroll velocity.
  useEffect(() => {
    const track = trackRef.current;
    if (reduce || !track || typeof track.animate !== 'function') return;
    const animation = track.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-50%)' }],
      { duration, iterations: Infinity, direction: reverse ? 'reverse' : 'normal' },
    );
    let lastY = window.scrollY;
    let velocity = 0;
    let frame = 0;
    const loop = () => {
      const y = window.scrollY;
      velocity += (y - lastY - velocity) * 0.12;
      lastY = y;
      animation.playbackRate = 1 + Math.min(Math.abs(velocity) * 0.4, 7);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      animation.cancel();
    };
  }, [reduce, duration, reverse]);

  const copies = Array.from({ length: repeat }, (_, index) => (
    <div className="mq-copy" key={index} aria-hidden={index > 0 ? true : undefined}>
      {children}
    </div>
  ));

  return (
    <div className={cx('marquee', reduce && 'static', className)}>
      <div className="mq-track" ref={trackRef}>
        <div className="mq-group" ref={groupRef}>
          {copies}
        </div>
        {!reduce && (
          <div className="mq-group" aria-hidden="true">
            {copies}
          </div>
        )}
      </div>
    </div>
  );
}
