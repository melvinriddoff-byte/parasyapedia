import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowIcon } from '@/components/ui/Icons/Icons';
import { Shapes } from '@/components/ui/Shapes/Shapes';
import { useProjectModal } from '@/context/ProjectModalContext';
import { offerings } from '@/data/offerings';
import './ServiceStack.css';

/**
 * A pile of service cards. Resting, the cards sit in a loose stack, each nudged and tilted a
 * little (a fixed pseudo-random jitter, so it looks hand-placed but never changes between renders).
 * Hover the pile and the cards fan out; on a touch screen they fan out when the pile scrolls into
 * view. Click or tap a card to open it.
 * Each card's art and colour come from data/offerings.ts.
 */

const COUNT = offerings.length;

/** Stable "random" in -1..1 from a seed. No state needed, so server and client always agree. */
const jitter = (seed: number): number => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return (value - Math.floor(value)) * 2 - 1;
};

export function ServiceStack() {
  const { openProject } = useProjectModal();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // On touch screens there is no hover, so the pile fans out by itself once it scrolls into view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.matchMedia('(hover: none)').matches) return;
    const observer = new IntersectionObserver(([entry]) => setOpen(entry.isIntersecting), { threshold: 0.6 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  // On touch screens, tapping outside folds the pile back up.
  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`sk${open ? ' open' : ''}`}
      style={{ '--n': COUNT } as CSSProperties}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className="sk-stage">
        {offerings.map((offering, index) => {
          const style = {
            '--i': index,
            '--jx': `${(jitter(index + 1) * 18).toFixed(1)}px`,
            '--jy': `${(jitter(index + 40) * 12).toFixed(1)}px`,
            '--jr': `${(jitter(index + 80) * 6).toFixed(1)}deg`,
          } as CSSProperties;
          return (
            <button
              key={offering.id}
              type="button"
              className="sk-card"
              style={style}
              onClick={(event) => {
                // First tap on a touch screen only unfolds the pile.
                if (!open && window.matchMedia('(hover: none)').matches) {
                  setOpen(true);
                  return;
                }
                openProject(index, event.currentTarget);
              }}
            >
              <span className="sk-art" style={{ background: `var(--${offering.background})` }}>
                <Shapes list={offering.shapes} />
              </span>
              <span className="sk-info">
                <span className="sk-tag">{offering.tag}</span>
                <strong>{offering.title}</strong>
                <span className="sk-foot">
                  <span className="sk-time">From {offering.duration}</span>
                  <span className="sk-cta">
                    <span className="sk-cta-label">View service</span>
                    <ArrowIcon />
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
