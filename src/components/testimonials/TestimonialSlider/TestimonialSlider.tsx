import { useRef, useState } from 'react';
import { PauseIcon, PlayIcon, ArrowIcon } from '@/components/ui/Icons/Icons';
import { RoundButton } from '@/components/ui/Button/RoundButton';
import { siteConfig } from '@/config/site';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Testimonial } from '@/types';
import { cx } from '@/utils/cx';
import './TestimonialSlider.css';

const PANEL_COLOURS = ['ember', 'saffron', 'parchment', 'sand'] as const;

interface TestimonialSliderProps {
  items: Testimonial[];
}

/**
 * Large quote slider. Autoplays while visible (7 seconds per quote), pauses on hover,
 * focus or with the pause button, and never autoplays when reduced motion is on.
 */
export function TestimonialSlider({ items }: TestimonialSliderProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const visible = useInView(hostRef, { threshold: 0.35 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hover, setHover] = useState(false);

  const paused = userPaused || hover || !visible;
  const show = (next: number) => setIndex((next + items.length) % items.length);

  return (
    <div
      ref={hostRef}
      className={cx('qs', paused && 'paused')}
      data-c={PANEL_COLOURS[index % PANEL_COLOURS.length]}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <div className="qs-stage">
        {items.map((item, i) => (
          <figure key={i} className={cx('slide', i === index && 'on')} aria-hidden={i !== index}>
            <span className="qm" aria-hidden="true">
              “
            </span>
            <blockquote>{item.quote}</blockquote>
            <figcaption>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
              <em>{item.category}</em>
            </figcaption>
            {siteConfig.sampleTestimonials && <b className="sample">Sample</b>}
          </figure>
        ))}
      </div>

      <div className="qs-ctrl">
        <div className="dots">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show testimonial ${i + 1} of ${items.length}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => show(i)}
            />
          ))}
        </div>
        <div className="arrows">
          <RoundButton aria-label="Previous testimonial" onClick={() => show(index - 1)}>
            <ArrowIcon style={{ transform: 'scaleX(-1)' }} />
          </RoundButton>
          {!reduce && (
            <RoundButton
              aria-label={userPaused ? 'Resume autoplay' : 'Pause autoplay'}
              onClick={() => setUserPaused((value) => !value)}
            >
              {userPaused ? <PlayIcon /> : <PauseIcon />}
            </RoundButton>
          )}
          <RoundButton aria-label="Next testimonial" onClick={() => show(index + 1)}>
            <ArrowIcon />
          </RoundButton>
        </div>
      </div>

      {/* The bar's animation end moves to the next quote; changing the key restarts it. */}
      {!reduce && <i key={index} className="qs-prog run" onAnimationEnd={() => show(index + 1)} />}
    </div>
  );
}
