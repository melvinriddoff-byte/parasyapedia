import { STAR_PATH } from '@/components/ui/Icons/Icons';
import { Shapes } from '@/components/ui/Shapes/Shapes';
import type { Shape } from '@/types';
import { box, star } from '@/utils/shapes';
import { TILES } from './tiles';
import './PromptToFrame.css';

/** The still the mosaic reveals: a brass spice jar in golden light. Units are cqw of the frame. */
const FRAME_ART: Shape[] = [
  box(0, 0, 100, 56, 'saffron', '0'),
  box(52, 6, 40, 40, 'ember', '50%', 'pu'),
  box(14, 38, 26, 3, 'midnight', '3cqw'),
  box(30, 12, 20, 24, 'midnight', '3cqw'),
  box(33, 23, 14, 8, 'parchment', '1cqw'),
  box(32.5, 8, 15, 4.5, 'midnight', '1.5cqw'),
  box(64, 22, 5, 5, 'parchment', '50%'),
  box(72, 30, 4, 4, 'midnight', '50%'),
  box(80, 16, 6, 6, 'parchment', '50%'),
  star(84, 4, 8, 'midnight', 'sp'),
];

function Spark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <path fill="currentColor" d={STAR_PATH} />
    </svg>
  );
}

/**
 * Hero animation, one 14 second loop: a prompt types itself, the progress bar fills while a
 * mosaic "develops", then the finished frame slowly pushes in and the loop starts again.
 */
export function PromptToFrame() {
  return (
    <div className="pf" aria-hidden="true">
      <div className="pf-in">
        <div className="pf-prompt">
          <div className="pf-label">
            <Spark />
            Prompt
          </div>
          <div className="pf-line pf-line-1">A brass spice jar on a banana leaf,</div>
          <div className="pf-line pf-line-2">golden hour, slow dolly-in, 9:16</div>
        </div>

        <div className="pf-status">
          <span className="pf-gen">
            <Spark className="pf-spin" />
            Generating
          </span>
          <span className="pf-ready">
            <Spark />
            Ready
          </span>
        </div>

        <div className="pf-bar">
          <i />
        </div>

        <div className="pf-frame">
          <div className="pf-art">
            <Shapes list={FRAME_ART} />
          </div>
          {TILES.map(([color, delay], index) => (
            <span
              key={index}
              className="pf-tile"
              style={{
                left: `${(index % 9) * (100 / 9)}%`,
                top: `${Math.floor(index / 9) * 20}%`,
                background: `var(--${color})`,
                animationDelay: `${delay}s`,
              }}
            />
          ))}
          <span className="pf-badge">16:9 · 8s</span>
          <div className="pf-cover">
            <Spark />
          </div>
        </div>
      </div>
    </div>
  );
}
