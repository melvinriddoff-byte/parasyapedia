import { useState } from 'react';
import { cx } from '@/utils/cx';
import './FlipCard.css';

interface FlipCardProps {
  /** The Sanskrit word on the front. */
  word: string;
  /** Its English meaning on the back. */
  meaning: string;
  hint: string;
  tone?: 'one' | 'two';
}

/** A card that flips over on click or tap to reveal what a word means. */
export function FlipCard({ word, meaning, hint, tone = 'one' }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      className={cx('flip', tone === 'two' && 'two')}
      aria-pressed={flipped}
      aria-label={`${word}. Tap to ${flipped ? 'flip back' : 'reveal its meaning'}`}
      onClick={() => setFlipped((value) => !value)}
    >
      <span className="flip-in">
        <span className="face f">
          <small>Sanskrit</small>
          <span className="w">{word}</span>
          <span className="serif">Tap to flip</span>
        </span>
        <span className="face b">
          <small>Means</small>
          <span className="w">{meaning}</span>
          <span className="serif">{hint}</span>
        </span>
      </span>
    </button>
  );
}
