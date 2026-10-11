import { useEffect, useRef, useState } from 'react';
import { StarIcon } from '@/components/ui/Icons/Icons';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { clamp } from '@/utils/math';
import { cx } from '@/utils/cx';
import './Loader.css';

interface LoaderProps {
  /** Called when the title card starts to lift. The hero animation waits for this. */
  onDone: () => void;
}

const DURATION = 1500;

/** Opening title card with a 00 to 100 counter. Skipped when reduced motion is on. */
export function Loader({ onDone }: LoaderProps) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(reduce);
  const countRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce) {
      onDone();
      return;
    }
    const timers: number[] = [];
    const start = performance.now();
    let frame = 0;
    let fontsReady = false;
    let finished = false;

    void Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((resolve) => setTimeout(resolve, 1800)),
    ]).then(() => {
      fontsReady = true;
    });

    const finish = () => {
      if (finished) return;
      finished = true;
      setDone(true);
      onDone();
      timers.push(window.setTimeout(() => setGone(true), 1200));
    };
    timers.push(window.setTimeout(finish, 5200));

    const tick = (now: number) => {
      const progress = clamp((now - start) / DURATION, 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (countRef.current) countRef.current.textContent = String(Math.round(eased * 100)).padStart(2, '0');
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (progress < 1 || !fontsReady) {
        frame = requestAnimationFrame(tick);
      } else {
        timers.push(window.setTimeout(finish, 120));
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduce, onDone]);

  if (gone) return null;

  return (
    <div className={cx('loader', done && 'done')} aria-hidden="true">
      <div className="slate">
        <span>Parasya Pedia</span>
      </div>
      <StarIcon className="lstar" />
      <div>
        <div className="count-up" ref={countRef}>
          00
        </div>
        <div className="lbar">
          <i ref={barRef} />
        </div>
      </div>
    </div>
  );
}
