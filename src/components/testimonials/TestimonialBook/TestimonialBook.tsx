import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cx } from '@/utils/cx';
import type { Testimonial } from '@/types';
import './TestimonialBook.css';

/**
 * A notebook of testimonials. Every testimonial is one spread: the left page has the client's ticket,
 * tape and stamp, the right page holds the quote on ruled paper. Click a page, use the arrows or the arrow keys to turn it.
 *
 * The page turn works the way a real book does. One page (the "flap") is rotated 180 degrees
 * around the spine with CSS 3D. Its front is the page being lifted and its back is the page that
 * lands on the other side, while the pages underneath cross-fade to the next spread.
 */

type Direction = 'next' | 'prev';

interface Turn {
  id: number;
  dir: Direction;
  from: number;
  to: number;
}

interface TestimonialBookProps {
  items: Testimonial[];
}

/** Each spread gets its own tape colour, stamp colour and tilt, like a scrapbooked notebook. */
const TAPES = ['saffron', 'ember', 'sand', 'saffron', 'ember', 'sand'] as const;
const STAMPS = ['ember', 'ink', 'ember', 'ink', 'ink', 'ember'] as const;
const TILTS = [-2.2, 1.6, -1.2, 2.2, -1.8, 1.2];

type Side = 'left' | 'right';

/** One page of a spread. The left page is the client (ticket, tape and stamp), the right page is the quote on ruled paper. */
function Page({ item, index, total, side }: { item: Testimonial; index: number; total: number; side: Side }) {
  const number = String(index + 1).padStart(2, '0');
  if (side === 'left') {
    return (
      <div className="tb-page left">
        <span className="tb-no">
          no. {number} / {String(total).padStart(2, '0')}
        </span>
        <span className="tb-mark" aria-hidden="true">
          “
        </span>
        <div className={cx('tb-stamp', `stamp-${STAMPS[index % STAMPS.length]}`)} style={{ rotate: `${-TILTS[index % 6] * 6}deg` }}>
          <span>{item.category}</span>
          <small>Kerala</small>
        </div>
        <div className="tb-ticket" style={{ rotate: `${TILTS[index % 6]}deg` }}>
          <i className={cx('tb-tape tl', `tape-${TAPES[index % TAPES.length]}`)} />
          <i className={cx('tb-tape tr', `tape-${TAPES[index % TAPES.length]}`)} />
          <span className="tb-kicker">Client</span>
          <strong>{item.name}</strong>
          <span>
            {item.role}, {item.brand}
          </span>
          <span className="tb-place">{item.place}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="tb-page right">
      <blockquote>{item.quote}</blockquote>
      <span className="tb-folio">&mdash; {number}</span>
    </div>
  );
}

export function TestimonialBook({ items }: TestimonialBookProps) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const turnId = useRef(0);
  const total = items.length;

  const go = (dir: Direction) => {
    if (total < 2) return;
    const base = turn ? turn.to : current;
    const to = dir === 'next' ? (base + 1) % total : (base - 1 + total) % total;
    if (reduce) {
      setCurrent(to);
      return;
    }
    if (turn) setCurrent(turn.to);
    turnId.current += 1;
    setTurn({ id: turnId.current, dir, from: base, to });
  };

  // Arrow keys turn the page while the book is on screen.
  const rootRef = useRef<HTMLDivElement>(null);
  const goRef = useRef(go);
  goRef.current = go;
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
      const box = rootRef.current?.getBoundingClientRect();
      if (!box || box.bottom < 0 || box.top > window.innerHeight) return;
      goRef.current(event.key === 'ArrowRight' ? 'next' : 'prev');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (total === 0) return null;

  const shownIndex = turn ? turn.to : current;
  const shown = items[shownIndex];

  const finishTurn = () => {
    if (!turn) return;
    setCurrent(turn.to);
    setTurn(null);
  };

  const page = (index: number, side: Side) => (
    <Page item={items[index]} index={index} total={total} side={side} />
  );

  return (
    <div className="tb" ref={rootRef}>
      <div className="tb-stage">
        <button type="button" className="tb-arrow left" onClick={() => go('prev')} aria-label="Previous testimonial">
          <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
            <polyline points="11,3 3,22 11,41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="tb-book">
          {!turn && (
            <div className="tb-full">
              <div className="tb-half left">{page(current, 'left')}</div>
              <div className="tb-half right">{page(current, 'right')}</div>
            </div>
          )}

          {turn && (
            <div className="tb-turn" key={turn.id}>
              <div className={cx('tb-half left', turn.dir === 'next' ? 'out' : 'in')}>
                {page(turn.dir === 'next' ? turn.from : turn.to, 'left')}
              </div>
              <div className={cx('tb-half right', turn.dir === 'next' ? 'in' : 'out')}>
                {page(turn.dir === 'next' ? turn.to : turn.from, 'right')}
              </div>
              <div
                className={cx('tb-flap', turn.dir)}
                onAnimationEnd={(event) => {
                  if (event.target === event.currentTarget) finishTurn();
                }}
              >
                <div className="tb-face front">{page(turn.from, turn.dir === 'next' ? 'right' : 'left')}</div>
                <div className="tb-face back">{page(turn.to, turn.dir === 'next' ? 'left' : 'right')}</div>
              </div>
            </div>
          )}

          <i className="tb-spine" aria-hidden="true" />
          <button type="button" className="tb-zone prev" onClick={() => go('prev')} tabIndex={-1} aria-hidden="true" />
          <button type="button" className="tb-zone next" onClick={() => go('next')} tabIndex={-1} aria-hidden="true" />
        </div>

        <button type="button" className="tb-arrow right" onClick={() => go('next')} aria-label="Next testimonial">
          <svg viewBox="0 0 14 44" width="14" height="44" fill="none" aria-hidden="true">
            <polyline points="3,3 11,22 3,41" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <p className="tb-caption" key={shownIndex} aria-live="polite">
        {shown.name} &middot; {shown.brand}
      </p>
    </div>
  );
}
