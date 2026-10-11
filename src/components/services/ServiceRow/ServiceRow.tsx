import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react';
import { ServiceCard } from '@/components/services/ServiceCard/ServiceCard';
import { ArrowIcon } from '@/components/ui/Icons/Icons';
import { RoundButton } from '@/components/ui/Button/RoundButton';
import { offerings } from '@/data/offerings';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { clamp } from '@/utils/math';
import './ServiceRow.css';

/** Swipeable row of project cards with drag-to-scroll, arrow buttons and a progress bar. */
export function ServiceRow() {
  const rowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const moved = useRef(0);
  const reduce = useReducedMotion();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const max = row.scrollWidth - row.clientWidth;
    const progress = max > 0 ? row.scrollLeft / max : 0;
    if (barRef.current) barRef.current.style.transform = `scaleX(${clamp(0.1 + 0.9 * progress, 0, 1)})`;
    setAtStart(row.scrollLeft < 4);
    setAtEnd(row.scrollLeft > max - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scrollByCard = (direction: 1 | -1) => {
    const row = rowRef.current;
    const card = row?.querySelector<HTMLElement>('.card');
    if (!row || !card) return;
    row.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: reduce ? 'auto' : 'smooth' });
  };

  // Mouse drag-to-scroll (touch devices already swipe natively).
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const row = rowRef.current;
    if (event.pointerType !== 'mouse' || !row) return;
    const startX = event.clientX;
    const startLeft = row.scrollLeft;
    moved.current = 0;
    row.style.scrollSnapType = 'none';

    const onMove = (move: globalThis.PointerEvent) => {
      const dx = move.clientX - startX;
      moved.current = Math.max(moved.current, Math.abs(dx));
      row.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      row.style.scrollSnapType = '';
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  // A drag should not count as a click on a card.
  const onClickCapture = (event: MouseEvent) => {
    if (moved.current > 6) {
      event.stopPropagation();
      event.preventDefault();
      moved.current = 0;
    }
  };

  return (
    <div className="service-row-wrap">
      <div
        className="service-row"
        ref={rowRef}
        data-cursor="Drag"
        onScroll={update}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
      >
        <div className="service-row-track">
          {offerings.map((offering, index) => (
            <ServiceCard key={offering.id} offering={offering} index={index} />
          ))}
        </div>
      </div>
      <div className="service-row-foot">
        <div className="row-bar" aria-hidden="true">
          <i ref={barRef} />
        </div>
        <div className="ctrls">
          <RoundButton aria-label="Previous services" aria-disabled={atStart} onClick={() => scrollByCard(-1)}>
            <ArrowIcon style={{ transform: 'scaleX(-1)' }} />
          </RoundButton>
          <RoundButton aria-label="Next services" aria-disabled={atEnd} onClick={() => scrollByCard(1)}>
            <ArrowIcon />
          </RoundButton>
        </div>
      </div>
    </div>
  );
}
