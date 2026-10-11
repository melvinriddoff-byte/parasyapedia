import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cx } from '@/utils/cx';
import { useSoloMascot } from './mascotStore';
import './Mascot.css';

/**
 * The studio mascot. Same two-sheet format as the `page-mascot` package (3x3 head directions,
 * 3x3 reactions), but it also works on touch screens and in any placement. Each page gives it
 * a small job through the `role` prop; the placement for each role lives in Mascot.css.
 */
const DIRECTIONS = ['up-left', 'up', 'up-right', 'left', 'center', 'right', 'down-left', 'down', 'down-right'] as const;
const REACTIONS = ['blink', 'heart', 'sparkle', 'surprised', 'wink', 'bashful', 'sleepy', 'dizzy', 'delighted'] as const;
// Clockwise from the right, matching atan2 with y pointing down.
const CLOCKWISE = ['right', 'down-right', 'down', 'down-left', 'left', 'up-left', 'up', 'up-right'] as const;
const SECTOR = (Math.PI * 2) / CLOCKWISE.length;
const HYSTERESIS = 0.12;
const PAYOFFS = ['heart', 'sparkle', 'delighted'] as const;
const IDLE_MS = 14000;
const LOST_LOOK = ['left', 'up-left', 'up', 'up-right', 'right', 'down-right', 'down', 'down-left'] as const;

type Direction = (typeof DIRECTIONS)[number];
type Reaction = (typeof REACTIONS)[number];

export type MascotRole =
  | 'hero' // steps out of the film card
  | 'peek' // peeks over the filter bar
  | 'art' // sits on the animated art in the About and Testimonials headers
  | 'contact' // waves beside the form
  | 'transition' // rides the scene-cut panel
  | 'lost'; // 404

const PRIORITY: Record<MascotRole, number> = {
  transition: 0,
  hero: 1,
  peek: 1,
  art: 1,
  contact: 1,
  lost: 1,
};

interface MascotProps {
  role: MascotRole;
  /** Small saffron speech pill. */
  pill?: string;
  /** `data-depth` for the hero card's pointer parallax. */
  depth?: number;
  className?: string;
}

const cell = (index: number): CSSProperties => ({
  backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`,
});

const wrapAngle = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));

const HOVER_TARGET = 'a.btn[href="/contact"]';

export function Mascot({ role, pill, depth, className }: MascotProps) {
  const id = useId();
  const reduce = useReducedMotion();
  const decorative = role === 'transition';
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const squashRef = useRef<HTMLSpanElement>(null);
  const timers = useRef<number[]>([]);
  const boops = useRef({ count: 0, at: 0 });
  const active = useSoloMascot(id, PRIORITY[role], wrapRef);
  const [direction, setDirection] = useState<Direction>(role === 'transition' ? 'down' : 'center');
  const [reaction, setReaction] = useState<Reaction | null>(role === 'lost' ? 'surprised' : null);
  const [asleep, setAsleep] = useState(false);
  const reactionRef = useRef(reaction);
  reactionRef.current = reaction;

  // Follow the pointer, look at the "Start a project" button when it is hovered, doze off when idle.
  useEffect(() => {
    if (reduce || role === 'lost' || role === 'transition' || !active) return;
    let sector = -1;
    let pointer: { x: number; y: number } | null = null;
    let locked = false;
    let idleTimer = 0;

    const wake = () => {
      setAsleep(false);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setAsleep(true), IDLE_MS);
    };

    const aim = () => {
      const button = buttonRef.current;
      if (!button || !pointer) return;
      const box = button.getBoundingClientRect();
      const dx = pointer.x - (box.left + box.width / 2);
      const dy = pointer.y - (box.top + box.height / 2);
      // The dead zone follows the mascot's size, so it behaves the same at any screen size.
      if (Math.hypot(dx, dy) < box.width * 0.5) {
        sector = -1;
        setDirection('center');
        return;
      }
      const angle = Math.atan2(dy, dx);
      if (sector !== -1 && Math.abs(wrapAngle(angle - sector * SECTOR)) < SECTOR / 2 + HYSTERESIS) return;
      sector = (Math.round(angle / SECTOR) + CLOCKWISE.length) % CLOCKWISE.length;
      setDirection(CLOCKWISE[sector]);
    };

    const onPointer = (event: PointerEvent) => {
      wake();
      if (locked) return;
      pointer = { x: event.clientX, y: event.clientY };
      aim();
    };
    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.(HOVER_TARGET);
      if (!target) return;
      const box = target.getBoundingClientRect();
      locked = true;
      pointer = { x: box.left + box.width / 2, y: box.top + box.height / 2 };
      aim();
    };
    const onOut = (event: PointerEvent) => {
      if (!(event.target as Element | null)?.closest?.(HOVER_TARGET)) return;
      locked = false;
      pointer = { x: event.clientX, y: event.clientY };
      aim();
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerdown', onPointer, { passive: true });
    window.addEventListener('keydown', wake);
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', aim);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    wake();
    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('keydown', wake);
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', aim);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
    };
  }, [reduce, role, active]);

  // Blink now and then.
  useEffect(() => {
    if (reduce || role === 'lost' || role === 'transition' || !active || asleep) return;
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(
        () => {
          if (!reactionRef.current) {
            setReaction('blink');
            timers.current.push(window.setTimeout(() => setReaction((r) => (r === 'blink' ? null : r)), 170));
          }
          schedule();
        },
        3500 + Math.random() * 3500,
      );
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [reduce, role, active, asleep]);

  // 404: look around, lost.
  useEffect(() => {
    if (role !== 'lost' || reduce || !active) return;
    let step = 0;
    const timer = window.setInterval(() => {
      step = (step + 1) % LOST_LOOK.length;
      setDirection(LOST_LOOK[step]);
    }, 650);
    return () => window.clearInterval(timer);
  }, [role, reduce, active]);

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout);
    },
    [],
  );

  const boop = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setAsleep(false);
    const later = (ms: number, next: Reaction | null) => {
      timers.current.push(window.setTimeout(() => setReaction(next), ms));
    };

    const now = Date.now();
    const state = boops.current;
    state.count = now - state.at < 1600 ? state.count + 1 : 1;
    state.at = now;
    const resting: Reaction | null = role === 'lost' ? 'surprised' : null;

    if (state.count >= 4) {
      state.count = 0;
      setReaction('dizzy');
      later(1100, resting);
    } else {
      setReaction('blink');
      later(120, PAYOFFS[(state.count - 1) % PAYOFFS.length]);
      later(560, resting);
    }

    if (reduce) return;
    squashRef.current?.animate(
      [
        { transform: 'scale(1, 1)', easing: 'ease-in' },
        { transform: 'scale(1.10, 0.86)', offset: 0.18, easing: 'ease-out' },
        { transform: 'scale(0.95, 1.08)', offset: 0.45, easing: 'ease-in-out' },
        { transform: 'scale(1.03, 0.97)', offset: 0.72, easing: 'ease-in-out' },
        { transform: 'scale(1, 1)' },
      ],
      { duration: 420, easing: 'linear' },
    );
  };

  const shown: Reaction | null = reaction ?? (asleep ? 'sleepy' : null);

  return (
    <div
      ref={wrapRef}
      className={cx('mascot-wrap', `mascot-${role}`, className)}
      data-solo={active ? 'on' : 'off'}
      data-depth={depth}
      aria-hidden={decorative || undefined}
    >
      {pill && (
        <span className="mascot-pill" aria-hidden="true">
          {pill}
        </span>
      )}
      {role === 'contact' && <span className="mascot-hand" aria-hidden="true" />}
      <div className="mascot-bob">
        <button
          ref={buttonRef}
          type="button"
          className="mascot"
          aria-label="Boop the Parasya Pedia mascot"
          tabIndex={decorative ? -1 : undefined}
          onClick={boop}
        >
          <span ref={squashRef} className="mascot-squash">
            <span
              className="mascot-layer"
              style={{
                backgroundImage: 'url(/mascots/crt-directions.webp)',
                ...cell(DIRECTIONS.indexOf(direction)),
                opacity: shown ? 0 : 1,
              }}
            />
            <span
              className="mascot-layer"
              style={{
                backgroundImage: 'url(/mascots/crt-reactions.webp)',
                ...cell(REACTIONS.indexOf(shown ?? 'blink')),
                opacity: shown ? 1 : 0,
              }}
            />
          </span>
        </button>
      </div>
      <span className="mascot-shadow" aria-hidden="true" />
    </div>
  );
}
