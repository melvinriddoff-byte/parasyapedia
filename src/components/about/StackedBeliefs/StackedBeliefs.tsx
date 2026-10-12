import type { CSSProperties } from 'react';
import { Shapes } from '@/components/ui/Shapes/Shapes';
import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import { principles } from '@/data/principles';
import './StackedBeliefs.css';

/**
 * "What we believe": a sticky heading on the left and a stack of principle cards on the right.
 * Each card is sticky with a slightly lower top offset than the one before, so as you scroll the
 * cards pile up on top of each other. Every card has its own small tilt and lifts, straightens and
 * springs on hover or tap. (Same idea as the Stacked Feature Cards pattern.)
 */

const TONES = ['ink', 'ember', 'sand', 'ink'] as const;
const TILTS = [-1.2, 1, -0.8, 1.4];

export function StackedBeliefs() {
  return (
    <div className="sb">
      <div className="sb-hero">
        <TitleReveal lines={['What we', 'believe.']} className="h2" />
      </div>

      <div className="sb-stack">
        {principles.map((principle, index) => (
          <article
            key={principle.title}
            className={`sb-card tone-${TONES[index % TONES.length]}`}
            style={{ '--i': index, '--tilt': `${TILTS[index % TILTS.length]}deg` } as CSSProperties}
          >
            <div className="sb-top">
              <div className="sb-ico" aria-hidden="true">
                <Shapes list={principle.icon} />
              </div>
              <span className="sb-no" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3>{principle.title}</h3>
            <p>{principle.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
