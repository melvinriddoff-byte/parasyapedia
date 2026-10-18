import { useEffect, useRef, useState } from 'react';
import { ArrowIcon } from '@/components/ui/Icons/Icons';
import { RoundButton } from '@/components/ui/Button/RoundButton';
import { Shapes } from '@/components/ui/Shapes/Shapes';
import { useProjectModal } from '@/context/ProjectModalContext';
import { offerings } from '@/data/offerings';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cx } from '@/utils/cx';
import './StretchCards.css';

/**
 * One tall card that cycles through the services with a "stretch" transition (from the
 * Image-Stretch-Transition reference): the old art squashes up towards the top edge while the
 * new art stretches up from the bottom edge, so the two always fill the card between them.
 * Autoplays while in view, pauses on hover or focus, and swaps instantly with reduced motion.
 * Click the card to open the service.
 */

const COUNT = offerings.length;
const HOLD_MS = 3200;
const STRETCH_MS = 900;

export function StretchCards() {
  const { openProject } = useProjectModal();
  const hostRef = useRef<HTMLDivElement>(null);
  const visible = useInView(hostRef, { threshold: 0.4 });
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [hold, setHold] = useState(false);

  const go = (next: number) => {
    const target = (next + COUNT) % COUNT;
    if (target === current) return;
    setLeaving(reduce ? null : current);
    setCurrent(target);
  };

  // The leaving card is removed once its animation has finished.
  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setLeaving(null), STRETCH_MS + 50);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  // Autoplay.
  useEffect(() => {
    if (reduce || hold || !visible) return;
    const timer = window.setTimeout(() => go(current + 1), HOLD_MS);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, reduce, hold, visible]);

  const offering = offerings[current];

  return (
    <div
      ref={hostRef}
      className="sc"
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHold(true)}
      onPointerLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <button
        type="button"
        className="sc-card"
        aria-label={`View service: ${offering.title}`}
        onClick={(event) => openProject(current, event.currentTarget)}
      >
        {offerings.map((item, index) => {
          const state = index === current ? 'in' : index === leaving ? 'out' : '';
          if (!state) return null;
          return (
            <span
              key={item.id}
              className={cx('sc-art', state === 'in' && leaving !== null && 'enter', state === 'out' && 'leave')}
              style={{ background: `var(--${item.background})` }}
              aria-hidden={state === 'out'}
            >
              <Shapes list={item.shapes} />
            </span>
          );
        })}
        <span className="sc-label" aria-hidden="true">
          <span>{offering.tag}</span>
          <span>
            {String(current + 1).padStart(2, '0')} / {String(COUNT).padStart(2, '0')}
          </span>
        </span>
      </button>

      <div className="sc-info" aria-live="polite">
        <strong key={offering.id}>{offering.title}</strong>
        <span className="sc-time">From {offering.duration}</span>
      </div>

      <div className="sc-ctrl">
        <div className="sc-dots">
          {offerings.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-current={index === current ? 'true' : undefined}
              onClick={() => go(index)}
            />
          ))}
        </div>
        <div className="sc-arrows">
          <RoundButton aria-label="Previous service" onClick={() => go(current - 1)}>
            <ArrowIcon style={{ transform: 'scaleX(-1)' }} />
          </RoundButton>
          <RoundButton aria-label="Next service" onClick={() => go(current + 1)}>
            <ArrowIcon />
          </RoundButton>
        </div>
      </div>
    </div>
  );
}
