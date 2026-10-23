import { STAR_PATH } from '@/components/ui/Icons/Icons';
import { Shapes } from '@/components/ui/Shapes/Shapes';
import type { Shape } from '@/types';
import { box } from '@/utils/shapes';
import { WAVE } from './wave';
import './DirectorViewfinder.css';

/** What the camera is looking at. Units are cqw of the viewfinder. */
const SCENE: Shape[] = [
  box(0, 0, 100, 56, 'ember', '0'),
  box(56, 6, 38, 38, 'saffron', '50%', 'pu'),
  box(14, 40, 34, 3, 'midnight', '3cqw'),
  box(24, 14, 18, 24, 'midnight', '3cqw'),
  box(27, 24, 12, 8, 'parchment', '1cqw'),
  box(26, 10, 14, 4.5, 'midnight', '1.5cqw'),
  box(8, 6, 6, 6, 'parchment', '50%'),
];

const TIMECODES = Array.from({ length: 13 }, (_, i) => `00:00:${String(i % 12).padStart(2, '0')}`);
const TICKS = Array.from({ length: 24 }, (_, i) => ({ left: 34 + i * 18, major: i % 5 === 0 }));
const CLIPS = [
  { left: 34, width: 118, color: 'ember', anim: 'g1' },
  { left: 156, width: 92, color: 'saffron', anim: 'g2' },
  { left: 252, width: 112, color: 'parchment', anim: 'g3' },
  { left: 368, width: 84, color: 'sand', anim: 'g4' },
] as const;
const CAPTIONS = [
  { left: 34, width: 60 },
  { left: 108, width: 96 },
  { left: 218, width: 48 },
  { left: 280, width: 80 },
  { left: 374, width: 72 },
];

/** Positions are written in design pixels (448 wide) and scale with the panel through --p. */
const px = (n: number) => `calc(var(--p) * ${n})`;

/**
 * Director's viewfinder: a camera view with REC, a rolling timecode and an AI focus box that
 * tracks the subject, above an edit timeline with clips, a waveform, captions and a playhead.
 */
export function DirectorViewfinder() {
  return (
    <div className="vf" aria-hidden="true">
      <div className="vf-in">
        <div className="vf-screen">
          <div className="vf-scene">
            <Shapes list={SCENE} />
          </div>
          <i className="vf-grid vf-grid-v1" />
          <i className="vf-grid vf-grid-v2" />
          <i className="vf-grid vf-grid-h1" />
          <i className="vf-grid vf-grid-h2" />
          <i className="vf-safe" />
          <i className="vf-corner vf-c-tl" />
          <i className="vf-corner vf-c-tr" />
          <i className="vf-corner vf-c-bl" />
          <i className="vf-corner vf-c-br" />
          <div className="vf-rec">
            <i />
            REC
          </div>
          <div className="vf-tc">
            <div>
              {TIMECODES.map((code, index) => (
                <div key={index}>{code}</div>
              ))}
            </div>
          </div>
          <div className="vf-focus">
            <span>AI focus</span>
          </div>
        </div>

        <div className="vf-line">
          {TICKS.map((tick) => (
            <i
              key={tick.left}
              className="vf-tick"
              style={{ left: px(tick.left), top: px(tick.major ? 8 : 14), height: px(tick.major ? 12 : 6) }}
            />
          ))}
          <span className="vf-lab" style={{ top: px(44) }}>
            V1
          </span>
          <span className="vf-lab" style={{ top: px(98) }}>
            A1
          </span>
          <span className="vf-lab" style={{ top: px(136) }}>
            CC
          </span>
          {CLIPS.map((clip) => (
            <div
              key={clip.anim}
              className="vf-clip"
              style={{ left: px(clip.left), width: px(clip.width), background: `var(--${clip.color})` }}
            >
              <div className={`vf-dim vf-${clip.anim}`} />
            </div>
          ))}
          {WAVE.map(([left, top, height, duration, delay], index) => (
            <i
              key={index}
              className="vf-bar"
              style={{
                left: px(left),
                top: px(top),
                height: px(height),
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          ))}
          {CAPTIONS.map((caption) => (
            <i key={caption.left} className="vf-cap" style={{ left: px(caption.left), width: px(caption.width) }} />
          ))}
          <div className="vf-play">
            <i />
          </div>
        </div>

        <svg className="vf-spark" viewBox="0 0 40 40" focusable="false">
          <path fill="currentColor" d={STAR_PATH} />
        </svg>
      </div>
    </div>
  );
}
