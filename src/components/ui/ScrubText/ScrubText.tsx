import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { clamp } from '@/utils/math';
import { cx } from '@/utils/cx';
import './ScrubText.css';

interface ScrubTextProps {
  text: string;
  className?: string;
}

/** A paragraph whose words light up one by one as it scrolls through the screen. */
export function ScrubText({ text, className }: ScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const words = text.trim().split(/\s+/);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const spans = Array.from(element.querySelectorAll<HTMLElement>('.scrub-w'));
    if (reduce) {
      spans.forEach((span) => span.classList.add('on'));
      return;
    }

    let frame = 0;
    let running = false;
    const tick = () => {
      const rect = element.getBoundingClientRect();
      const progress = clamp(
        (window.innerHeight * 0.82 - rect.top) / (rect.height + window.innerHeight * 0.28),
        0,
        1,
      );
      const lit = Math.round(progress * spans.length);
      spans.forEach((span, index) => span.classList.toggle('on', index < lit));
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <p ref={ref} className={cx('scrub', className)} aria-label={text}>
      {words.map((word, index) => (
        <span key={index} className="scrub-w" aria-hidden="true">
          {word}{' '}
        </span>
      ))}
    </p>
  );
}
